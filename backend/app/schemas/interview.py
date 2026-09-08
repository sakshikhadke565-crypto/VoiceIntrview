"""Placeholder for Python module"""
from pydantic import BaseModel, ConfigDict


class InterviewCreate(BaseModel):
    role: str
    experience: str
    difficulty: str
    interview_type: str


class InterviewResponse(BaseModel):
    id: int
    role: str
    experience: str
    difficulty: str
    interview_type: str
    status: str

    model_config = ConfigDict(from_attributes=True)