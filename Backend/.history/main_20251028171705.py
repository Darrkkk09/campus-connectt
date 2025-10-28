import uvicorn
from fastapi import FastAPI
from routes.resume import router as resume_router
from configs.db import connect_db, close_db, get_db

app = FastAPI()

@app.on_event("startup")
def startup():
    connect_db()
    print("✅ MongoDB connection established")

@app.on_event("shutdown")
def shutdown():
    close_db()
    print("❌ MongoDB connection closed")

@app.get("/")
def home():
    db = get_db()
    return {"users": "hi" if db is not None else "Database not connected"}

app.include_router()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

