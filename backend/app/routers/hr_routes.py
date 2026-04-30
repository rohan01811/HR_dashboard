# backend/app/routers/hr_routes.py
from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from config.supabase_client import supabase
from collections import defaultdict

router = APIRouter(prefix="/hr", tags=["HR"])

class JobCreate(BaseModel):
    company: str
    title: str
    role: str
    description: str
    experience: float
    job_type: str
    interview_type: str
    skills: list[str]


@router.post("/create-job")
async def create_job(data: JobCreate, authorization: str = Header(...)):
    try:
        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        print("TOKEN:", token)
        print("USER:", user_resp)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(status_code=401, detail="Unauthorized")

        hr_id = user_resp.user.id

        response = supabase.table("jobs").insert({
            "hr_id": hr_id,
            "company": data.company,
            "title": data.title,
            "role": data.role,
            "description": data.description,
            "experience": data.experience,
            "job_type": data.job_type,
            "interview_type": data.interview_type,
            "skills": data.skills
        }).execute()

        return {
            "message": "Job created successfully 🚀",
            "data": response.data
        }

    except Exception as e:
        if "expired" in str(e).lower():
            raise HTTPException(status_code=401, detail="Token expired, please login again")
        raise HTTPException(status_code=400, detail=str(e))
    

@router.get("/jobs-with-stats")
async def get_jobs_with_stats(authorization: str = Header(...)):
    try:
        # 🔐 Extract user from token
        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(status_code=401, detail="Unauthorized")

        hr_id = user_resp.user.id

        # 🔹 Fetch only this HR's jobs
        jobs_res = supabase.table("jobs") \
            .select("*") \
            .eq("hr_id", hr_id) \
            .order("uploaded_at", desc=True) \
            .execute()

        jobs = jobs_res.data or []

        # 🔹 Fetch applications for these jobs only
        job_ids = [job["id"] for job in jobs]

        applications = []
        if job_ids:
            apps_res = supabase.table("applications") \
                .select("job_id") \
                .in_("job_id", job_ids) \
                .execute()

            applications = apps_res.data or []

        # 🔹 Count applicants per job
        applicant_count = defaultdict(int)

        for app in applications:
            applicant_count[app["job_id"]] += 1

        # 🔹 Merge data
        result = []
        for job in jobs:
            result.append({
                "id": job["id"],
                "title": job.get("title"),
                "company": job.get("company"),
                "status": job.get("status", "active"),
                "createdAt": job.get("uploaded_at"),
                "applicants": applicant_count[job["id"]]
            })

        return result

    except Exception as e:
        print("ERROR:", str(e))  # debug log

        if "expired" in str(e).lower():
            raise HTTPException(status_code=401, detail="Token expired")

        raise HTTPException(status_code=400, detail=str(e))


@router.get("/reports")
async def get_reports(authorization: str = Header(...)):
    try:
        # 🔐 Auth
        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(status_code=401, detail="Unauthorized")

        # 🔹 Fetch reports
        reports_res = supabase.table("reports") \
            .select("candidate_id, overall_score, recommendation") \
            .execute()

        reports = reports_res.data or []

        # 🔹 Get candidate IDs
        candidate_ids = list(set([
               r["candidate_id"]
               for r in reports
               if r.get("candidate_id") and isinstance(r["candidate_id"], str)
            ]))

        # 🔹 Fetch users (candidates)
        users_res = supabase.table("users") \
            .select("id, name") \
            .in_("id", candidate_ids) \
            .execute()

        users = users_res.data or []

        # 🔹 Map user id → name
        user_map = {u["id"]: u["name"] for u in users}

        # 🔹 Merge data
        result = []
        for r in reports:
            result.append({
                "id": r["candidate_id"],
                "name": user_map.get(r["candidate_id"], "Unknown"),
                "atsScore": r.get("overall_score", 0),
                "summary": r.get("recommendation", "No feedback"),
                "status": "reviewed"  # static for now
            })

        return result

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=400, detail=str(e))