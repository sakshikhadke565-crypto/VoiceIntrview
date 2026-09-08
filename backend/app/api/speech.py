from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

from app.services.speech_to_text import speech_to_text
from app.services.text_to_speech import text_to_speech

router = APIRouter(
    prefix="/speech",
    tags=["Speech"]
)


@router.post("/to-text")
def convert_speech_to_text(
    audio: UploadFile = File(...)
):
    try:
        os.makedirs("temp_audio", exist_ok=True)

        file_path = os.path.join(
            "temp_audio",
            audio.filename
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                audio.file,
                buffer
            )

        transcript = speech_to_text(file_path)

        os.remove(file_path)

        return {
            "filename": audio.filename,
            "transcript": transcript
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/to-audio")
def convert_text_to_speech(text: str):
    try:
        os.makedirs("generated_audio", exist_ok=True)

        output_path = os.path.join(
            "generated_audio",
            "interview_question.wav"
        )

        text_to_speech(
            text=text,
            output_path=output_path
        )

        return {
            "message": "Audio generated successfully",
            "audio_path": output_path
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )