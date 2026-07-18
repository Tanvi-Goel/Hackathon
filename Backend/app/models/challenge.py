from pydantic import BaseModel
from typing import List, Optional


class ChallengeModel(BaseModel):
    title: str
    description: str
    requirements: List[str]
    difficulty: Optional[str] = "medium"
    skills: Optional[List[str]] = []
