# backend/app/routers/interview_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from config.supabase_client import supabase

router = APIRouter(prefix="/api/interview", tags=["Interview"])

# ------------------ MODEL ------------------

class InterviewCreate(BaseModel):
    role: str
    job_description: str
    jobType: str
    experience: str
    interview_type: str


# ------------------ CREATE INTERVIEW SESSION ------------------

@router.post("/create")
async def create_interview(data: InterviewCreate):
    try:
        response = supabase.table("interviews").insert({
            "job_id": data.job_id,   # 👈 IMPORTANT (add this)
            "status": "started"
        }).execute()

        session_id = response.data[0]["id"]

        return {
            "session_id": session_id
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))