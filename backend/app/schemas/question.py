"""Placeholder for Python module"""
from pydantic import BaseModel, ConfigDict


class QuestionCreate(BaseModel):
    interview_id: int
    question_text: str
    question_number: int
    difficulty: str


class QuestionResponse(BaseModel):
    id: int
    interview_id: int
    question_text: str
    question_number: int
    difficulty: str

    model_config = ConfigDict(from_attributes=True)