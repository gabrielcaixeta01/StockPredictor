import os
import matplotlib.pyplot as plt
import requests
from textblob import TextBlob

API_KEY = "465c3df16e6c4942be0736eee109fea9" 

def sentiment_to_factor(sentiment: str) -> float:
    if sentiment == "positive":
        return 1.05
    elif sentiment == "negative":
        return 0.95
    return 1.00

def analyze_sentiment(text: str) -> str:
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0.1:
        return "positive"
    elif polarity < -0.1:
        return "negative"
    return "neutral"

def train_model_news(ticker: str):
    url = f"https://newsapi.org/v2/everything?q={ticker}&sortBy=publishedAt&apiKey={API_KEY}&language=en&pageSize=5"
    response = requests.get(url)
    data = response.json()

    articles = data.get("articles", [])

    if not articles:
        # Fallback neutro
        base_price = 100
        predicted_price = base_price

        img_path = f"public/images/{ticker}_news.png"
        os.makedirs(os.path.dirname(img_path), exist_ok=True)

        plt.figure()
        plt.plot([base_price, predicted_price], marker="o", linestyle="--", label="No News Data")
        plt.title(f"{ticker} – No News Available")
        plt.legend()
        plt.tight_layout()
        plt.savefig(img_path)
        plt.close()

        return round(predicted_price, 2), f"/images/{ticker}_news.png"

    # Senão, calcula sentimento real
    factors = []
    for article in articles:
        title = article.get("title", "")
        desc = article.get("description", "")
        full_text = f"{title}. {desc}".strip()
        sentiment = analyze_sentiment(full_text)
        factor = sentiment_to_factor(sentiment)
        factors.append(factor)

    base_price = 100
    avg_factor = sum(factors) / len(factors)
    predicted_price = base_price * avg_factor

    img_path = f"public/images/{ticker}_news.png"
    os.makedirs(os.path.dirname(img_path), exist_ok=True)

    plt.figure()
    plt.plot([base_price, predicted_price], marker="o", linestyle="--", label="Sentiment-based")
    plt.title(f"{ticker} – News Sentiment Prediction")
    plt.legend()
    plt.tight_layout()
    plt.savefig(img_path)
    plt.close()

    return round(predicted_price, 2), f"/images/{ticker}_news.png"