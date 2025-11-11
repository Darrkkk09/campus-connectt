from fastapi import APIRouter, HTTPException, Query
import requests
import os

router = APIRouter(prefix="/jobs", tags=["Jobs"])

APP_ID = os.getenv("ADZUNA_APP_ID") or "22d10a31"
APP_KEY = os.getenv("ADZUNA_APP_KEY") or "0ac7a221bd5dc9bc37d40204d3636bd4"

@router.get("/")
def get_latest_jobs(
    what: str = Query("developer", description="Job title or keyword"),
    where: str = Query("Bangalore", description="Location"),
    limit: int = Query(10, description="Number of jobs to fetch"),
    page: int = Query(1, description="Page number")
):
    url = f"https://api.adzuna.com/v1/api/jobs/in/search/{page}"
    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "results_per_page": limit,
        "what": what,
        "where": where
    }

    try:
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch jobs: {str(e)}")

    jobs = []
    for job in data.get("results", []):
        jobs.append({
            "role": what,  # keep the search query as role
            "title": job.get("title") or "Untitled Job",
            "company": job.get("company", {}).get("display_name") or "Not specified",
            "location": job.get("location", {}).get("display_name") or where,
            "country": "IN",
            "link": job.get("redirect_url") or ""
        })

    return {"count": len(jobs), "jobs": jobs}
