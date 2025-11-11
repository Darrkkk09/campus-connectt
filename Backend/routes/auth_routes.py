from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
import os, requests
from middlewares.Authfirebase import verify_token
from configs.db import firebase_auth
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()
FIREBASE_API_KEY = os.getenv("FIREBASE_API_KEY")


# Request body models
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@router.get("/profile", summary="Protected route")
def profile(user=Depends(verify_token)):
    return {"message": "This is a protected route", "user": user}


@router.post("/signup", summary="Register a new user")
def signup(data: SignupRequest):
    try:
        user = firebase_auth.create_user(
            display_name=data.name,
            email=data.email,
            password=data.password,
        )
        return {
            "message": "User created successfully",
            "uid": user.uid,
            "name": user.display_name,
            "email": user.email,
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", summary="Login with email and password")
def login(data: LoginRequest):
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}"
    payload = {
        "email": data.email,
        "password": data.password,
        "returnSecureToken": True,
    }

    response = requests.post(url, json=payload)
    if response.status_code == 200:
        res = response.json()
        return {
            "message": "Login successful",
            "idToken": res.get("idToken"),
            "refreshToken": res.get("refreshToken"),
            "uid": res.get("localId"),
            "expiresIn": res.get("expiresIn"),
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password.",
        )