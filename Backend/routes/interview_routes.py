from fastapi import APIRouter, HTTPException, UploadFile, File
import os
import requests
import shutil
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai
import time

load_dotenv()

router = APIRouter()
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# API keys
ASSEMBLYAI_API_KEY = os.getenv("ASSEMBLYAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

genai.configure(api_key=GEMINI_API_KEY)

def transcribe_audio(file_path: str) -> str:
    headers = {"authorization": ASSEMBLYAI_API_KEY}

    with open(file_path, "rb") as f:
        upload_res = requests.post("https://api.assemblyai.com/v2/upload", headers=headers, data=f)
    if upload_res.status_code != 200:
        raise HTTPException(status_code=500, detail="Audio upload to AssemblyAI failed.")
    audio_url = upload_res.json()["upload_url"]

    transcribe_req = {"audio_url": audio_url}
    transcribe_res = requests.post("https://api.assemblyai.com/v2/transcript", headers=headers, json=transcribe_req)
    transcript_id = transcribe_res.json()["id"]

    # Poll for completion
    while True:
        poll_res = requests.get(f"https://api.assemblyai.com/v2/transcript/{transcript_id}", headers=headers)
        status = poll_res.json()["status"]
        if status == "completed":
            return poll_res.json()["text"]
        elif status == "error":
            raise HTTPException(status_code=500, detail="Transcription failed.")
        time.sleep(3)


last_feedback = None
last_transcript = None

@router.post("/analyze_feedback")
async def analyze_feedback(audio_feedback: UploadFile = File(...)):
    """Analyze candidate interview responses and generate motivational structured feedback"""
    global last_feedback, last_transcript

    if not audio_feedback:
        raise HTTPException(status_code=400, detail="No audio file uploaded.")

    file_path = UPLOAD_DIR / audio_feedback.filename
    with open(file_path, "wb") as f:
        shutil.copyfileobj(audio_feedback.file, f)

    try:
        # Step 1: Transcribe audio
        transcript_text = transcribe_audio(str(file_path))
        last_transcript = transcript_text

        # Step 2: Gemini prompt for *motivating structured feedback*
        prompt = f"""
        You are an encouraging AI interview coach. The goal is to help the candidate grow and improve, not just criticize.

        Analyze the following interview transcript and provide feedback in a friendly, motivating, and structured format.

        Transcript:
        {transcript_text}

        Respond ONLY in this JSON structure:

        {{
          "summary": "A brief summary of the overall impression (2-3 lines).",
          "strengths": [
            "Highlight 2-3 specific strengths in a positive, friendly tone."
          ],
          "areas_to_improve": [
            "List 2-3 improvement points with clear, constructive advice."
          ],
          "practice_tips": [
            "Suggest 2-3 practical steps or exercises the candidate can do to improve."
          ],
          "final_rating": "X / 10 (include a short one-line justification)"
        }}

        Make sure your tone feels *supportive, motivational, and confidence-boosting*.
        """

        # Step 3: Generate AI feedback
        model = genai.GenerativeModel(GEMINI_MODEL)
        feedback = model.generate_content(prompt)
        feedback_text = feedback.text.strip()

        last_feedback = feedback_text

        return {
            "transcript": transcript_text,
            "feedback": feedback_text
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {str(e)}")


@router.get("/analyze_feedback")
async def get_feedback():
    """Return last feedback result (for feedback page)"""
    if not last_feedback:
        raise HTTPException(status_code=404, detail="No feedback available yet.")
    return {"feedback": last_feedback, "transcript": last_transcript}
