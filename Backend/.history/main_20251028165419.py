import uvicorn
from configs.db import get_db
from fastapi import FastAPI

app = FastAPI()
db = get_db()


@app.on_event("startup")
def startup():
    print("✅ MongoDB connection established")

@app.on_event("shutdown")
def shutdown():
    print("❌ MongoDB connection closed")

    