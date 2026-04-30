from fastapi import APIRouter, HTTPException, Header
from config.supabase_client import supabase
from pydantic import BaseModel


router = APIRouter(prefix="/hr", tags=["HR Dashboard"])

class UpdateStatusRequest(BaseModel):
    candidate_id: str
    status: str   # selected / rejected




@router.get("/candidates")
async def get_candidates(authorization: str = Header(...)):
    try:
        # 🔐 Auth check
        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(status_code=401, detail="Unauthorized")

        # 🔹 Fetch reports
        reports_res = supabase.table("reports") \
            .select("candidate_id, overall_score, recommendation, status") \
            .execute()

        reports = reports_res.data or []

        candidate_ids = list(set([
            r["candidate_id"]
            for r in reports
            if r.get("candidate_id")
        ]))

        # 🔹 Fetch candidate details (users)
        users_res = supabase.table("users") \
            .select("id, name, role") \
            .in_("id", candidate_ids) \
            .execute()

        users = users_res.data or []

        user_map = {u["id"]: u for u in users}

        # 🔹 Final merge
        result = []
        for r in reports:
            user = user_map.get(r["candidate_id"], {})

            score = r.get("overall_score", 0)

            result.append({
                "id": r["candidate_id"],
                "name": user.get("name", "Unknown"),
                "role": user.get("role", "Candidate"),
                "skills": [],
                "atsScore": score,
                "summary": r.get("recommendation", "No feedback"),
                "status": r.get("status", "pending")
            })

        return result

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=400, detail=str(e))
    

@router.patch("/update-status")
async def update_candidate_status(data: UpdateStatusRequest, authorization: str = Header(...)):
    try:
        # 🔐 Auth
        token = authorization.replace("Bearer ", "")
        user_resp = supabase.auth.get_user(token)

        if not user_resp or not getattr(user_resp, "user", None):
            raise HTTPException(status_code=401, detail="Unauthorized")

        # ✅ Validate status
        if data.status not in ["selected", "rejected"]:
            raise HTTPException(status_code=400, detail="Invalid status")

        # 🔹 Update in DB (you can store in reports table)
        response = supabase.table("reports") \
            .update({"status": data.status}) \
            .eq("candidate_id", data.candidate_id) \
            .execute()

        return {
            "message": f"Candidate {data.status} successfully 🎯",
            "data": response.data
        }

    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=400, detail=str(e))    