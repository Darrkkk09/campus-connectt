from fastapi import FastAPI
from pymongo import MongoClient
import os

uri = "mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/"

app = FastAPI()

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]

@app.on_event("startup")
def startup_db():
    print("✅ Connected to MongoDB")

@app.on_event("shutdown")
def shutdown_db():
    client.close()
    print("❌ MongoDB connection closed")

