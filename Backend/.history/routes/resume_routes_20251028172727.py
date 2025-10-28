from fastapi import APIRouter, HTTPException,FastAPI
from fastapi import UploadFile,Form
from services.pdf_parse import extract_text_from_pdf



router = APIRouter()

@router.get("/upload_resume")
def upload_resume(resume: UploadFile , role : str = Form(...) , company_name : str = Form(...) , job_description : str = Form(...)):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")
    content = 
    
