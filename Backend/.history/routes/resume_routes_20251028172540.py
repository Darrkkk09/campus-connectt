from fastapi import APIRouter, HTTPException,FastAPI
from fastapi import UploadFile,Form



router = APIRouter()

@router.get("/upload_resume")
def upload_resume(resume: UploadFile , role : str = Form(...)):
    if not resume.filename.endswith(('.pdf', '.doc', '.docx')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and Word documents are allowed.")
    # Here you would typically save the file and process it as needed
    return {"filename": resume.filename, "role": role, "message": "Resume uploaded successfully"}

