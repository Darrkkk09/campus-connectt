from fastapi import APIRouter, HTTPException, UploadFile, Form
from typing import Optional
from services.pdf_parse import extract_text_from_pdf
import os
import google.generativeai as genai
from dotenv import load_dotenv
load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")
gemini_model = os.getenv("GEMINI_MODEL")

genai.configure(api_key=gemini_api_key)

router = APIRouter()
parsed_text = ""

@router.get("/get_questions_from_llm")
def get_questions_from_llm(
    role : str = Form(...),
    company_name: Optional[str] = Form(...),
    job_description: Optional[str] = Form(...)
):
    global parsed_text
    if not parsed_text:
        raise HTTPException(status_code=404, detail="No parsed text available. Please upload a resume first.")
    model = genai.GenerativeModel(gemini_model)
    prompt = f"""
    You are an Experienced AI interviewer. Based on the candidate's Role and resume and job details, generate 5 relevant interview questions.

    Resume:
    {parsed_text}

    Role: {role}
    Company: {company_name or "Software Company"}
    Job Description: {job_description or "need a skilled developer to join our team with the user's resume skills ."}

    Output: A numbered list of 5 technical or behavioral interview questions.
    """
    


@router.post("/upload_resume")
async def upload_resume(
    resume: UploadFile,
    role: str = Form(...),
    company_name: Optional[str] = Form(None),
    job_description: Optional[str] = Form(None)
):
    global parsed_text

    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")

    content = await resume.read()
    text = extract_text_from_pdf(content)
    parsed_text = text

    return {
        "resume_parsed_text": text,
        "role": role,
        "company_name": company_name,
        "job_description": job_description
    }

@router.get("/get_parsed_text")
def get_parsed_text():
    global parsed_text
    if not parsed_text:
        raise HTTPException(status_code=404, detail="No parsed text available. Please upload a resume first.")
    return {"parsed_text": parsed_text}


    
