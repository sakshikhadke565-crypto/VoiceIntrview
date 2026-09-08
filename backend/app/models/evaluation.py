"""Placeholder for Python module"""
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.connection import Base


class Evaluation(Base):
    __tablename__ = "evaluations"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    answer_id: Mapped[int] = mapped_column(
        ForeignKey("answers.id"),
        nullable=False,
        index=True
    )

    score: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    relevance: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    technical_depth: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    clarity: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    feedback: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    answer: Mapped["Answer"] = relationship(
        "Answer",
        back_populates="evaluation"
    )