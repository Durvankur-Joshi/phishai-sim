from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

known_phishing_templates = [
    "login verify password bank secure payment account",
    "urgent account verification required",
    "your payment has failed login immediately"
]

def similarity_check(text):

    documents = known_phishing_templates + [text]

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity_scores = cosine_similarity(
        tfidf_matrix[-1],
        tfidf_matrix[:-1]
    )

    max_score = similarity_scores.max()

    return {
        "similarity_score": float(max_score * 100)
    }