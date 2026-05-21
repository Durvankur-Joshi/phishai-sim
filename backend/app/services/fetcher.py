import requests
from bs4 import BeautifulSoup

def fetch_website(url):

    try:

        headers = {
            "User-Agent": (
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            )
        }

        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        text = soup.get_text(separator=" ")

        return {
            "html": response.text,
            "text": text[:5000],
            "status": response.status_code
        }

    except Exception as e:

        print("FETCH ERROR:", str(e))

        return {
            "error": str(e)
        }