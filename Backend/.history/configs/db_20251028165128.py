from fastapi import FastAPI
from pymongo import MongoClient
import os

app = FastAPI()

MONGO_URL = "mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/"
DB_NAME = "campus_connect_db"

client = MongoClient(MONGO_URL)
db = client[DB_NAME]

@app.on_event("startup")
def startup_db():
    print("✅ Connected to MongoDB")

@app.on_event("shutdown")
def shutdown_db():
    client.close()
    print("❌ MongoDB connection closed")

