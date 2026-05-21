def semantic_analysis(text):

    phishing_keywords = {
        "verify": 15,
        "urgent": 20,
        "suspended": 25,
        "password": 20,
        "bank": 15,
        "payment": 20,
        "security alert": 25,
        "login": 10,
        "account": 8,
        "confirm": 15
    }

    score = 0
    found_keywords = []

    text = text.lower()

    for word, value in phishing_keywords.items():

        if word in text:

            score += value
            found_keywords.append(word)

    if score > 100:
        score = 100

    return {
        "semantic_score": score,
        "keywords_found": found_keywords
    }