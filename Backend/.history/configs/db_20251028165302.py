from fastapi import FastAPI
from pymongo import MongoClient
import os

app = FastAPI()

MONGO_URL = "mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/"
DB_NAME = "campus_connect_db"

client = MongoClient(MONGO_URL)
db = client[DB_NAME]

def get_db)

