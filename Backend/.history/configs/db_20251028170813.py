from pymongo import MongoClient


MONGO_URL = 
DB_NAME = 

client = MongoClient(MONGO_URL)
db = client[DB_NAME]


def connect_db():
    global client, db,MONGO_URL,DB_NAME
    client = MongoClient(MONGO_URL)
    db = client[DB_NAME]
    return db

def close_db():
    global client
    if client:
        client.close()


from pymongo import MongoClient, errors

client = None
db = None

def connect_db():
    global client, db
    try:
        client = MongoClient("mongodb+srv://campus-connect_db_user:Campus-connect123@campus-connect.9agasb1.mongodb.net/")
        client.admin.command('ping')  # ✅ test connection
        print("✅ MongoDB connected successfully!")
        db = client["AI-Powered-Campus-Connect"]
    except errors.ConnectionFailure as e:
        print("❌ MongoDB connection failed:", e)
        db = None
    return db

def get_db():
    return db

def close_db():
    global client
    if client:
        client.close()
