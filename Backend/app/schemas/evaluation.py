from pydantic import BaseModel
from typing import List, Optional


class EvaluationResult(BaseModel):
    score: int
    feedback: str
    strengths: List[str]
    improvements: List[str]
    summary: Optional[str] = None
