from fastapi import APIRouter
from app.models.schemas import URLRequest

from app.services.fetcher import fetch_website
from app.services.url_analyzer import analyze_url
from app.services.semantic_detector import semantic_analysis
from app.services.similarity_engine import similarity_check
from app.services.final_classifier import final_prediction

router = APIRouter()

@router.post("/analyze")
def analyze(request: URLRequest):

    print("Received URL:", request.url)

    website_data = fetch_website(request.url)

    print("Website Data:", website_data)

    if "error" in website_data:
        return {
            "prediction": "ERROR",
            "final_score": 0,
            "url_score": 0,
            "semantic_score": 0,
            "similarity_score": 0,
            "reasons": [website_data["error"]]
        }

    url_analysis = analyze_url(request.url)

    semantic_result = semantic_analysis(
        website_data["text"]
    )

    similarity_result = similarity_check(
        website_data["text"]
    )

    final_result = final_prediction(
        url_analysis["url_score"],
        semantic_result["semantic_score"],
        similarity_result["similarity_score"]
    )

    response = {
        "url": request.url,
        "prediction": final_result["prediction"],
        "final_score": final_result["final_score"],
        "url_score": url_analysis["url_score"],
        "semantic_score": semantic_result["semantic_score"],
        "similarity_score": similarity_result["similarity_score"],
        "reasons": url_analysis["reasons"]
    }

    print("FINAL RESPONSE:", response)

    return response