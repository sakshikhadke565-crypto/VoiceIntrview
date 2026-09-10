from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.interview import Interview
from app.models.question import Question
from app.schemas.interview import InterviewCreate, InterviewResponse
from app.ai.question_generator import generate_question

TOTAL_QUESTIONS = 10

router = APIRouter(
    prefix="/interviews",
    tags=["Interviews"]
)


@router.post("/", response_model=InterviewResponse)
def create_interview(
    interview_data: InterviewCreate,
    db: Session = Depends(get_db)
):
    # Create interview record
    interview = Interview(
        role=interview_data.role,
        experience=interview_data.experience,
        difficulty=interview_data.difficulty,
        interview_type=interview_data.interview_type,
        status="started"
    )

    db.add(interview)
    db.commit()
    db.refresh(interview)

    # Generate 10 unique questions sequentially, passing previous questions
    # to the generator so it avoids repetition
    previous_questions: list[str] = []

    for i in range(1, TOTAL_QUESTIONS + 1):
        question_text = generate_question(
            role=interview.role,
            experience=interview.experience,
            difficulty=interview.difficulty,
            interview_type=interview.interview_type,
            question_number=i,
            previous_questions=previous_questions if previous_questions else None
        )

        question = Question(
            interview_id=interview.id,
            question_text=question_text,
            question_number=i,
            difficulty=interview.difficulty
        )

        db.add(question)
        db.commit()

        previous_questions.append(question_text)

    return interview