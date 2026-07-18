from pydantic import BaseModel
from typing import Optional, Dict, Any


class SubmissionModel(BaseModel):
    user_id: Optional[str] = None
    challenge_id: Optional[str] = None
    content: Dict[str, Any]
    status: Optional[str] = "submitted"
