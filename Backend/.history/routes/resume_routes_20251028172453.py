from fastapi import APIRouter, HTTPException,FastAPI
from fastapi import UploadFile,



router = APIRouter()

@router.get("/upload_resume")
def upload_resume(resume: UploadFile  ):

