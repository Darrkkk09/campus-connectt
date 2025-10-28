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
    You are an Experienced AI interviewer. Based on the candidate's Role and resume and job details, generate 8-10 relevant interview questions.

    Resume:
    {parsed_text}

    Role: {role}
    Company: {company_name or "Software Company"}
    Job Description: {job_description or "need a skilled developer to join our team with the user's resume skills ."}

    Output:  A  list of 10 technical Questions relevant to the role without question numbers and  Give only the questions without any other text.
    """

    try:
        response = model.generate_content(prompt)
        questions = response.text.strip()
        result = []
        for i in questions.split('\n'):
            question = i.strip()
            if question:
                result.append(question)

        questions_from_llm = result
        return {"questions": {result}}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating questions: {str(e)}")




@router.get("/get_parsed_text")
def get_parsed_text():
    global parsed_text
    if not parsed_text:
        raise HTTPException(status_code=404, detail="No parsed text available. Please upload a resume first.")
    return {"parsed_text": parsed_text}


    
