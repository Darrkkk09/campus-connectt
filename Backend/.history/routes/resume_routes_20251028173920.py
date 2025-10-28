from fastapi import APIRouter, HTTPException
from fastapi import UploadFile,Form
from services.pdf_parse import extract_text_from_pdf



router = APIRouter()


@router.post("/upload_resume")
async def upload_resume(resume: UploadFile , role : str = Form(...) , company_name : str = Form(...) , job_description : str = Form(...)):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")
    content = await resume.read()
    text = extract_text_from_pdf(content)
    # return { "resume_parsed_text" : text , "role" : role , "company_name" : company_name , "job_description" : job_description }
    
