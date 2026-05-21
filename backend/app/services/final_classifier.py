def final_prediction(url_score, semantic_score, similarity_score):

    final_score = (
        0.3 * url_score +
        0.4 * semantic_score +
        0.3 * similarity_score
    )

    if final_score >= 40:
        prediction = "PHISHING"
    else:
        prediction = "LEGITIMATE"

    return {
        "final_score": round(final_score, 2),
        "prediction": prediction
    }