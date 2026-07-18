from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from app.services.proof_service import generate_proof_card

router = APIRouter()


class Evaluation(BaseModel):
    score: int


class ProofRequest(BaseModel):
    candidateName: str
    skills: List[str]
    evaluation: Evaluation


@router.post("/generate-proof")
def proof(request: ProofRequest):

    return generate_proof_card(
        request.candidateName,
        request.skills,
        request.evaluation.model_dump()
    )