from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.resume_routes import router as resume_router
from routes.interview_routes import router as interview_router 
from routes.internship_routes import router as internship_router
from routes.coding_routes import router as coding_routes
from routes.auth_routes import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "ok"}

app.include_router(resume_router, prefix="/resume", tags=["Resume"])
app.include_router(interview_router, prefix="/interview", tags=["Interview"])
app.include_router(internship_router)  
app.include_router(coding_routes, prefix="/coding", tags=["Coding Questions"])
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
