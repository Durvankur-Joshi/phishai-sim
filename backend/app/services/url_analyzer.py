import re

def analyze_url(url):

    score = 0
    reasons = []

    suspicious_keywords = [
        "login",
        "verify",
        "bank",
        "secure",
        "update",
        "account",
        "free",
        "bonus"
    ]

    if len(url) > 75:
        score += 20
        reasons.append("Long URL detected")

    if "@" in url:
        score += 30
        reasons.append("@ symbol found")

    if re.search(r"\d+\.\d+\.\d+\.\d+", url):
        score += 40
        reasons.append("IP address used instead of domain")

    for word in suspicious_keywords:
        if word in url.lower():
            score += 10
            reasons.append(f"Suspicious keyword: {word}")

    return {
        "url_score": min(score, 100),
        "reasons": reasons
    }