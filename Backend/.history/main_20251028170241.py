import uvicorn
from fastapi import FastAPI
from configs.db import connect_db, close_db

app = FastAPI()
db = connect_db()

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
    return {"users": "hi"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
