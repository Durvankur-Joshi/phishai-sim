from fastapi import APIRouter

from app.models.schemas import URLRequest

from app.services.fetcher import fetch_website
from app.services.ai_detector import ai_phishing_analysis

router = APIRouter()


@router.post("/analyze")
def analyze(request: URLRequest):

    print("Received URL:", request.url)

    # -----------------------------------
    # Try Fetching Website
    # -----------------------------------

    website_data = fetch_website(
        request.url
    )

    webpage_text = ""

    if "error" not in website_data:

        webpage_text = website_data["text"]

    # -----------------------------------
    # AI Analysis
    # -----------------------------------

    ai_result = ai_phishing_analysis(
        request.url,
        webpage_text
    )

    # -----------------------------------
    # Add Fetch Error Reason
    # -----------------------------------

    if "error" in website_data:

        ai_result["reasons"].append(
            f"Website fetch failed: {website_data['error']}"
        )

    return ai_result