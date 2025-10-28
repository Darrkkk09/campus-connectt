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
questions_from_llm = []


@router.post("/get_interview_questions")
async def get_interview_questions(
    resume: UploadFile,
    role: str = Form(...),
    company_name: Optional[str] = Form(None),
    job_description: Optional[str] = Form(None)
):
    
    global questions_from_llm

    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")

    content = await resume.read()
    text = extract_text_from_pdf(content)
    parsed_text = text

    if not parsed_text:
        raise HTTPException(status_code=404, detail="No parsed text available. Please upload a resume first.")
    
    model = genai.GenerativeModel(gemini_model)
    prompt = f"""
    You are an expert AI interviewer. Based on the candidate's resume, desired role, and job details,
      generate exactly 10 clear and relevant technical interview questions.

    Resume:
    {parsed_text}

    Role: {role}
    Company: {company_name or "Software Company"}
    Job Description: {job_description or "We are looking for a skilled developer to join our engineering team."}

    Instructions for output:
    - Provide exactly 10 questions.
    - Do NOT number or bullet the questions.
    - Do NOT include any explanations, greetings, or extra text.
    - Each question should appear on a new line.
    - Output should contain only the questions, one per line.
    """

    try:
        response = model.generate_content(prompt)
        questions = response.text.strip()

        result = []
        for i in questions.split('\n'):
            question = i.strip()
            if question:
                result.append(question)
        
        # create list of objects
        questions_from_llm = [{"id": i + 1, "question": q} for i, q in enumerate(result)]
        return {"questions": questions_from_llm}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating questions: {str(e)}")



@router.get("/get_parsed_text")
def get_parsed_text():
    global parsed_text
    if not parsed_text:
        raise HTTPException(status_code=404, detail="No parsed text available. Please upload a resume first.")
    return {"parsed_text": parsed_text}


    
