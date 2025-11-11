import requests

APP_ID = "22d10a31"
APP_KEY = "0ac7a221bd5dc9bc37d40204d3636bd4"

url = f"https://api.adzuna.com/v1/api/jobs/in/search/1"
params = {
    "app_id": APP_ID,
    "app_key": APP_KEY,
    "results_per_page": 10,
    "what": "developer",
    "where": "Bangalore"
}

res = requests.get(url, params=params)
print(res.json())
