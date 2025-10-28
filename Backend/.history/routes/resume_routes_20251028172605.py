from fastapi import APIRouter, HTTPException,FastAPI
from fastapi import UploadFile,Form



router = APIRouter()

@router.get("/upload_resume")
def upload_resume(resume: UploadFile , role : str = Form(...) , company_name : str = Form()):
    
