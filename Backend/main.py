from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes.resume import router as resume_router
from app.routes.challenge import router as challenge_router
from app.routes.evaluation import router as evaluation_router
from app.routes.proof import router as proof_router

app = FastAPI()


def _get_allowed_origins():
    # Read comma-separated origins from environment variable FRONTEND_URLS
    env = os.getenv("FRONTEND_URLS")
    defaults = [
        "http://localhost:5173",
        "https://hackathon-eiti.vercel.app",
    ]
    if not env:
        return defaults
    parts = [p.strip() for p in env.split(",") if p.strip()]
    # merge defaults and env-provided, preserving unique values
    origins = []
    for u in parts + defaults:
        if u not in origins:
            origins.append(u)
    return origins


origins = _get_allowed_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(challenge_router)
app.include_router(evaluation_router)
app.include_router(proof_router)

@app.get("/")
def home():
    return {"message": "SkillProof Backend Running 🚀"}