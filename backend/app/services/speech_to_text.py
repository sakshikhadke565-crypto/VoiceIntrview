"""Placeholder for Python module"""
from google import genai

from app.config import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def speech_to_text(audio_file_path: str) -> str:

    audio_file = client.files.upload(
        file=audio_file_path
    )

    prompt = """
Listen to this audio carefully and convert the candidate's speech
into text.

Rules:
- Return only the transcript.
- Do not summarize.
- Do not explain.
- Do not add extra information.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=[
            audio_file,
            prompt
        ]
    )

    return response.text.strip()