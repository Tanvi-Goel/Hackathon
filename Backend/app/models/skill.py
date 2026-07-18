from pydantic import BaseModel
from typing import List


class SkillModel(BaseModel):
    name: str
    category: str
    confidence: float = 0.0
