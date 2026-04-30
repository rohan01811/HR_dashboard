from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from HR_fro.backend.app.routers import hr_dashboard
from app.routers import auth_routes, hr_routes,hr_dashboard
from app.routers import interview_routes
# from app.routers import job_create


app = FastAPI()

# ✅ ADD THIS BLOCK
origins = [
    "http://localhost:5700",
    "http://127.0.0.1:5700",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routes
app.include_router(auth_routes.router)
app.include_router(hr_routes.router)
app.include_router(interview_routes.router)
app.include_router(hr_dashboard.router)
# app.include_router(job_create.router)
