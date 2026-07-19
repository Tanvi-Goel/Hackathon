from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.resume import router as resume_router
from app.routes.challenge import router as challenge_router
from app.routes.evaluation import router as evaluation_router
from app.routes.proof import router as proof_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    # We'll add the frontend URL after deploying to Vercel
]

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