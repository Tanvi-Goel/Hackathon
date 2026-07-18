from pydantic import BaseModel
from typing import List, Optional


class ChallengeCreate(BaseModel):
    title: str
    description: str
    requirements: List[str]
    difficulty: Optional[str] = "medium"
    skills: Optional[List[str]] = []
