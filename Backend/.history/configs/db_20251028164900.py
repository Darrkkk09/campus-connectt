from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

# ✅ Create MongoDB Client
client = MongoClient(MONGO_URL)
db = client[DB_NAME]

@app.on_event("startup")
def startup_db():
    print("✅ Connected to MongoDB")

@app.on_event("shutdown")
def shutdown_db():
    client.close()
    print("❌ MongoDB connection closed")

@app.get("/")
def home():
    data = list(db.users.find({}, {"_id": 0}))
    return {"users": data}

@app.post("/add")
def add_user():
    new_user = {"name": "ranjit", "role": "developer"}
    db.users.insert_one(new_user)
    return {"message": "User added!"}
