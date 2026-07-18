from fastapi import APIRouter
from pydantic import BaseModel

from app.services.evaluation_service import evaluate_solution

router = APIRouter()


class EvaluationRequest(BaseModel):
    challenge: str
    solution: str


@router.post("/evaluate-code")
def evaluate(request: EvaluationRequest):

    result = evaluate_solution(
        request.challenge,
        request.solution
    )

    return result