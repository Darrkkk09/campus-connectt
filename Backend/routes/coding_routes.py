from fastapi import APIRouter, HTTPException
import google.generativeai as genai
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import json

load_dotenv()
router = APIRouter()

class CodingQuestionRequest(BaseModel):
    job_title: str
    difficulty: str
    job_description: Optional[str] = ""

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")

genai.configure(api_key=GEMINI_API_KEY)

@router.post("/coding_questions")
def get_coding_questions(req: CodingQuestionRequest):
    prompt = f"""

            Generate 10 {req.difficulty} coding interview questions for a {req.job_title} position
            {f"based on the following job description: {req.job_description}." if req.job_description else ""}
            Each question should have two fields:
            1. "question_title": a clear and concise title of the coding problem.
            2. "question_link": a realistic placeholder link (e.g., "https://leetcode.com/problems/<slug>") that matches the question title.

            Return the output strictly as a JSON array of 5 objects in this format:
            
            {{
                "question_title": "Two Sum Problem",
                "topics":"Arrays, hashtable",
                "question_link": "https://leetcode.com/problems/two-sum"
            }},
            {{
                "question_title": "Two Sum Problem",
                "topics":"Arrays, hashtable",
                "question_link": "https://leetcode.com/problems/two-sum"
            }},
            ...
            

            Do not include any explanation, notes, or text outside the JSON array.
            """

    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
        response = model.generate_content(prompt)

        text = response.text.strip()

        if text.startswith("```"):
            text = text.strip("`")
            text = text.replace("json", "", 1).strip()
        
        questions = json.loads(text)

        return {"questions": questions}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")