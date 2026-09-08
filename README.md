# AI Voice Interviewer

## Project Overview
AI-powered adaptive voice interview platform where an AI asks questions, evaluates answers, and dynamically adjusts difficulty based on candidate performance.

## Main Features
- Text-to-Speech (TTS) for AI interviewer
- Speech-to-Text (STT) for candidate responses
- LLM-based answer evaluation
- Dynamic difficulty adjustment
- Comprehensive feedback and scoring

## Technology Stack
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Axios, React Router
- **Backend**: Python, FastAPI, Pydantic, SQLAlchemy, Uvicorn
- **Database**: PostgreSQL
- **AI/Voice**: LLM Integration, STT, TTS

## High-Level Architecture
- Frontend handles user interactions, voice recording, and audio playback.
- Backend serves APIs, manages database interactions, and orchestrates AI/Voice services.
- AI module generates questions and evaluates answers using an LLM.

## Folder Structure
Refer to the project directory for the detailed folder structure.

## Future Features
- Support for multiple languages
- Video interview analysis (body language, eye contact)
- Integration with external ATS systems
