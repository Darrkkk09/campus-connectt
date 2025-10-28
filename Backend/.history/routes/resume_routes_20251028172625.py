from fastapi import APIRouter, HTTPException,FastAPI
from fastapi import UploadFile,Form



router = APIRouter()

@router.get("/upload_resume")
def upload_resume(resume: UploadFile , role : str = Form(...) , company_name : str = Form(...) , job):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")
    return {"filename": resume.filename, "role": role, "company_name": company_name}
    
