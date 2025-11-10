from fastapi import HTTPException, Depends, status, Request, APIRouter
import os
import requests
from middlewares.Authfirebase import verify_token
from configs.db import firebase_auth
from dotenv import load_dotenv

load_dotenv() 

FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")

router = APIRouter()

@router.get("/profile")
def protect(user = Depends(verify_token)):
    return {"message": "This is a protected route", "user": user}   

@router.post("/signup")
async def signup(req: Request):
    data = await req.json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    if not name or not email or not password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=" name and Email and password are required")
    try:
        user = firebase_auth.create_user(display_name = name,email=email, password=password)
        return {"message": "User created", 
                "name" : user.display_name,
                "uid": user.uid,
                "email": user.email
                }
    except Exception as e:
        return {"error": str(e)}

@router.post("/login")
async def login(req: Request):
    data = await req.json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email and password are required")

    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"
    payload = {"email": email, "password": password, "returnSecureToken": True}

    response = requests.post(url, json=payload)
    if response.status_code == 200:
        res = response.json()
        return {
            "message": "Login successful",
            "idToken": res.get("idToken"),
            "refreshToken": res.get("refreshToken"),
            "uid": res.get("localId"),
            "expiresIn": res.get("expiresIn")
        }
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid email or password")