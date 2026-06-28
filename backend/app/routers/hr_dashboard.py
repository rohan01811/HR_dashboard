# backend/app/routers/hr_dashboard.py

from fastapi import APIRouter, HTTPException, Header
from config.supabase_client import supabase
from pydantic import BaseModel

router = APIRouter(prefix="/hr", tags=["HR Dashboard"])


class UpdateStatusRequest(BaseModel):
    report_id: str
    candidate_id: str
    status: str  # selected / rejected


# ============================================================
# Get Candidates
# ============================================================

@router.get("/candidates")
async def get_candidates(authorization: str = Header(...)):
    try:
        # -------------------------------------------------
        # Authenticate HR
        # -------------------------------------------------

        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(
                status_code=401,
                detail="Unauthorized"
            )

        hr_id = user_resp.user.id

        # -------------------------------------------------
        # Fetch jobs posted by this HR only
        # -------------------------------------------------

        jobs_res = (
            supabase.table("jobs")
            .select("id,title")
            .eq("hr_id", hr_id)
            .execute()
        )

        jobs = jobs_res.data or []

        job_ids = [job["id"] for job in jobs]

        if not job_ids:
            return []

        job_map = {
            job["id"]: job
            for job in jobs
        }

        # -------------------------------------------------
        # Fetch reports only for this HR's jobs
        # -------------------------------------------------

        reports_res = (
            supabase.table("reports")
            .select("""
                id,
                candidate_id,
                job_id,
                overall_score,
                status,
                total_violations
            """)
            .in_("job_id", job_ids)
            .execute()
        )

        reports = reports_res.data or []

        # -------------------------------------------------
        # Candidate IDs
        # -------------------------------------------------

        candidate_ids = list(
            set(
                [
                    r["candidate_id"]
                    for r in reports
                    if r.get("candidate_id")
                ]
            )
        )

        if not candidate_ids:
            return []

        # -------------------------------------------------
        # Fetch candidate details
        # -------------------------------------------------

        users_res = (
            supabase.table("users")
            .select("id,name")
            .in_("id", candidate_ids)
            .execute()
        )

        users = users_res.data or []

        user_map = {
            u["id"]: u
            for u in users
        }

        # -------------------------------------------------
        # Build response
        # -------------------------------------------------

        result = []

        for r in reports:

            user = user_map.get(
                r["candidate_id"],
                {}
            )

            result.append({

                "id": r["id"],

                "candidateId": r["candidate_id"],

                "jobId": r["job_id"],

                "name": user.get(
                    "name",
                    "Unknown"
                ),

                "jobTitle": job_map.get(
                    r["job_id"],
                    {}
                ).get(
                    "title",
                    "Unknown"
                ),

                "interviewScore": r.get(
                    "overall_score",
                    0
                ),

                "violations": r.get(
                    "total_violations",
                    0
                ),

                "status": r.get(
                    "status",
                    "pending"
                )
            })

        return result

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
# ============================================================
# Update Candidate Status
# ============================================================

@router.patch("/update-status")
async def update_candidate_status(
    data: UpdateStatusRequest,
    authorization: str = Header(...)
):
    try:

        # 🔐 Authenticate HR
        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        hr_id = user_resp.user.id
        # Validate
        if data.status not in ["selected", "rejected"]:
            raise HTTPException(status_code=400, detail="Invalid status")

        # -------------------------------------------------
        # Fetch current status
        # -------------------------------------------------

        
        report = (
            supabase.table("reports")
            .select("id,job_id,status")
            .eq("id", data.report_id)
            .single()
            .execute()
        )

        if not report.data:
            raise HTTPException(
                status_code=404,
               detail="Candidate report not found"
            )

        job_res = (
            supabase.table("jobs")
            .select("hr_id")
            .eq("id", report.data["job_id"])
            .single()
            .execute()
        )

        if not job_res.data:        
            raise HTTPException(
                status_code=404,
                detail="Job not found"
            )

        if job_res.data["hr_id"] != hr_id:      
            raise HTTPException(
                status_code=403,
                detail="You are not authorized to update this candidate."
            )

        old_status = report.data.get(       
            "status",
            "pending"
        )
        # -------------------------------------------------
        # No change -> Don't update or notify
        # -------------------------------------------------

        if old_status == data.status:
            return {
                "message": f"Candidate is already {data.status}. No changes made."
            }

        # -------------------------------------------------
        # Update Report Status
        # -------------------------------------------------

        response = (
            supabase.table("reports")
            .update({"status": data.status})
            .eq("id", data.report_id)
            .execute()
        )

        # -------------------------------------------------
        # Prepare Notification
        # -------------------------------------------------

        if data.status == "selected":

            title = "Congratulations! 🎉"

            message = (
                "Congratulations! You have been selected for the next stage "
                "of the recruitment process. Our HR team will contact you "
                "shortly with further details."
            )

            notif_type = "success"

        else:

            title = "Application Update"

            message = (
                "Thank you for participating in the interview process. "
                "After careful evaluation, we have decided to move forward "
                "with another candidate. We encourage you to apply again "
                "for future opportunities."
            )

            notif_type = "warning"

        # -------------------------------------------------
        # Insert Notification
        # -------------------------------------------------

        supabase.table("notifications").insert(
            {
                "candidate_id": data.candidate_id,
                "title": title,
                "message": message,
                "type": notif_type,
                "read": False,
                "interview_id": None,
            }
        ).execute()

        return {
            "message": f"Candidate {data.status} successfully 🎯",
            "data": response.data,
        }

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=400, detail=str(e))


# ============================================================
# Get Detailed Report
# ============================================================

@router.get("/report/{report_id}")
async def get_candidate_report(
    report_id: str,
    authorization: str = Header(...)
):
    try:
        # -------------------------------------------------
        # Authenticate HR
        # -------------------------------------------------

        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(status_code=401, detail="Unauthorized")

        hr_id = user_resp.user.id

        # -------------------------------------------------
        # Fetch Report
        # -------------------------------------------------

        report_res = (
            supabase.table("reports")
            .select("""
                id,
                candidate_id,
                job_id,
                interview_id,
                technical_score,
                communication_score,
                grammar_score,
                behavior_score,
                confidence_avg,
                overall_score,
                strengths,
                improvements,
                recommendation,
                answered_questions,
                total_questions,
                total_violations,
                status
            """)
            .eq("id", report_id)
            .single()
            .execute()
        )

        if not report_res.data:
            raise HTTPException(status_code=404, detail="Report not found")

        report = report_res.data

        # -------------------------------------------------
        # Security Check
        # Report must belong to this HR
        # -------------------------------------------------

        job_res = (
            supabase.table("jobs")
            .select("id,title,company,hr_id")
            .eq("id", report["job_id"])
            .single()
            .execute()
        )

        if not job_res.data:
            raise HTTPException(status_code=404, detail="Job not found")

        job = job_res.data

        if job["hr_id"] != hr_id:
            raise HTTPException(
                status_code=403,
                detail="You are not authorized to view this report."
            )

        # -------------------------------------------------
        # Candidate Details
        # -------------------------------------------------

        candidate_res = (
            supabase.table("users")
            .select("name,email")
            .eq("id", report["candidate_id"])
            .single()
            .execute()
        )

        candidate = candidate_res.data or {}

        # -------------------------------------------------
        # Final Response
        # -------------------------------------------------

        return {

            "report_id": report["id"],

            "candidate_name": candidate.get("name", "Unknown"),

            "candidate_email": candidate.get("email", ""),

            "job_title": job.get("title", ""),

            "company_name": job.get("company", ""),

            "technical_score": report.get("technical_score", 0),

            "communication_score": report.get("communication_score", 0),

            "grammar_score": report.get("grammar_score", 0),

            "behavior_score": report.get("behavior_score", 0),

            "confidence_avg": report.get("confidence_avg", 0),

            "overall_score": report.get("overall_score", 0),

            "answered_questions": report.get("answered_questions", 0),

            "total_questions": report.get("total_questions", 0),

            # ⭐ New
            "total_violations": report.get("total_violations", 0),

            "strengths": report.get("strengths", ""),

            "improvements": report.get("improvements", ""),

            "recommendation": report.get("recommendation", ""),

            "status": report.get("status", "pending")
        }

    except Exception as e:
        print("REPORT ERROR:", str(e))
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/dashboard-overview")
async def dashboard_overview():
    try:

        # Jobs Posted
        jobs_res = (
            supabase.table("jobs")
            .select("id", count="exact")
            .execute()
        )

        # Applications
        applications_res = (
            supabase.table("applications")
            .select("id", count="exact")
            .execute()
        )

        # Interviews
        interviews_res = (
            supabase.table("interviews")
            .select("id", count="exact")
            .execute()
        )

        # Hired Candidates
        selected_res = (
            supabase.table("reports")
            .select("id", count="exact")
            .eq("status", "selected")
            .execute()
        )

        return {
            "jobsPosted": jobs_res.count or 0,
            "applicationsReceived": applications_res.count or 0,
            "interviewsConducted": interviews_res.count or 0,
            "candidatesHired": selected_res.count or 0,
        }

    except Exception as e:
        print("Dashboard Error:", str(e))
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )