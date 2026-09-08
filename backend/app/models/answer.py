from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.connection import Base


class Answer(Base):
    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    question_id: Mapped[int] = mapped_column(
        ForeignKey("questions.id"),
        nullable=False,
        index=True
    )

    answer_text: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    audio_path: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # Question relationship
    question: Mapped["Question"] = relationship(
        "Question",
        back_populates="answers"
    )

    # Evaluation relationship
    evaluation: Mapped["Evaluation | None"] = relationship(
        "Evaluation",
        back_populates="answer",
        uselist=False
    )