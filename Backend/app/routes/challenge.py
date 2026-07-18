from fastapi import APIRouter
from pydantic import BaseModel

from app.services.challenge_service import generate_challenge

router = APIRouter()


class Skill(BaseModel):
    name: str
    category: str
    confidence: int


class ChallengeRequest(BaseModel):
    skills: list[Skill]


@router.post("/generate-challenge")
def create_challenge(request: ChallengeRequest):

    challenge = generate_challenge(
        [skill.model_dump() for skill in request.skills]
    )

    return challenge