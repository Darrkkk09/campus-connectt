from fastapi import APIRouter, HTTPException, UploadFile, Form
from typing import Optional, List
from services.pdf_parse import extract_text_from_pdf
import google.generativeai as genai
from dotenv import load_dotenv
import os
import shutil
from pathlib import Path

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_model = os.getenv("GEMINI_MODEL")

genai.configure(api_key=gemini_api_key)
router = APIRouter()

questions_from_llm = []
parsed_text = ""

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/get_interview_questions")
async def get_interview_questions(
    resume: UploadFile,
    role: str = Form(...),
    company_name: Optional[str] = Form(None),
    job_description: Optional[str] = Form(None),
):
    """Generate 10 interview questions based on resume + job details"""
    global questions_from_llm, parsed_text

    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF resumes allowed.")

    content = await resume.read()
    parsed_text = extract_text_from_pdf(content)

    if not parsed_text:
        raise HTTPException(status_code=400, detail="Failed to parse resume text.")

    model = genai.GenerativeModel(gemini_model)
    prompt = f"""
    You are an AI interviewer. Based on the resume, role, and job description,
    generate exactly 10 technical and HR interview questions. Avoid greetings or explanations.

    Resume:
    {parsed_text}

    Role: {role}
    Company: {company_name or "Tech Company"}
    Job Description: {job_description or "General developer position"}

    Format: Only one question per line, no numbering or bullets.
    """

    try:
        response = model.generate_content(prompt)
        questions = [q.strip() for q in response.text.split("\n") if q.strip()]
        questions_from_llm = [{"id": i + 1, "question": q} for i, q in enumerate(questions)]
        return {"questions": questions_from_llm}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini error: {str(e)}")


@router.get("/get_parsed_text")
def get_parsed_text():
    """Return last parsed resume text (for debug/demo)"""
    if not parsed_text:
        raise HTTPException(status_code=404, detail="No parsed resume text found.")
    return {"parsed_text": parsed_text}


@router.post("/upload_answers")
async def upload_answers(files: List[UploadFile]):
    """Save uploaded video/audio responses"""
    saved_files = []
    for file in files:
        file_path = UPLOAD_DIR / file.filename
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        saved_files.append(str(file_path))
    return {"message": " Videos uploaded successfully", "files": saved_files}

