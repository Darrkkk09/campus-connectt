import os
import requests
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

load_dotenv()
router = APIRouter(prefix="/internships", tags=["Internships"])

TAVILY_API_URL = "https://api.tavily.com/search"
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")


@router.get("/")
def get_latest_internships():
    if not TAVILY_API_KEY:
        raise HTTPException(status_code=500, detail="Tavily API key missing")

    query = (
        """
        Extract 12 latest software engineering job or internship openings from the top 15 global or high-impact tech companies (Google, Microsoft, Amazon, Meta, Apple, Tesla, Nvidia, Adobe, Salesforce, IBM, Intel, Oracle, SAP, Twitter/X, LinkedIn). 
        Ensure postings are today. Include verified sources and avoid duplicates or expired jobs.
        """
    )

    payload = {
        "query": query,
        "limit": 12,
        "include_domains": [
            "ziprecruiter.com",
            "wellfound.com",
            "monsterindia.com",
            "smartinternz.com",
            "simplyhired.com",
            "careers.google.com",
            "careers.microsoft.com",
            "amazon.jobs",
            "careers.meta.com",
            "careers.openai.com"
        ],
        "filters": {
            "posted_date": "today",
            "type": ["job", "internship"]
        }
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TAVILY_API_KEY}"
    }

    try:
        response = requests.post(TAVILY_API_URL, json=payload, headers=headers, timeout=20)
        response.raise_for_status()
        data = response.json()

        results = [
            {"title": r.get("title"), "url": r.get("url"), "snippet": r.get("content")}
            for r in data.get("results", [])[:12]
        ]

        if not results:
            raise HTTPException(status_code=404, detail="No internships found")

        return {"count": len(results), "internships": results}

    except requests.exceptions.RequestException as e:
        print(" Tavily API Exception:", str(e))
        raise HTTPException(status_code=500, detail="Tavily API request failed")
