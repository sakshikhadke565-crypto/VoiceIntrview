from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.connection import get_db, create_tables

# API Routers
from app.api.interviews import router as interview_router
from app.api.questions import router as question_router
from app.api.answers import router as answer_router
from app.api.evaluations import router as evaluation_router
from app.api.speech import router as speech_router
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="AI Voice Interviewer API",
    description="Backend API for AI-powered voice interviews",
    version="1.0.0",
)
app.mount(
    "/audio",
    StaticFiles(directory="generated_audio"),
    name="audio"
)

# Create database tables
create_tables()


# Include API routers
app.include_router(interview_router)
app.include_router(question_router)
app.include_router(answer_router)
app.include_router(evaluation_router)
app.include_router(speech_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the AI Voice Interviewer API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/health/db")
def health_check_db(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Database connection failed"
        )