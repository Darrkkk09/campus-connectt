from fastapi import APIRouter, HTTPException,FastAPI




router = APIRouter()

@router.get("/upload_resume")
def upload_resume(resume: Upload  ):

