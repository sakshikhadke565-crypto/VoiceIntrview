"""Placeholder for Python module"""
from pydantic import BaseModel, ConfigDict


class AnswerCreate(BaseModel):
    question_id: int
    answer_text: str
    audio_path: str | None = None


class AnswerResponse(BaseModel):
    id: int
    question_id: int
    answer_text: str
    audio_path: str | None

    model_config = ConfigDict(from_attributes=True)