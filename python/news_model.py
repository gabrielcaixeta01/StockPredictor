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

    base_price = 100
    img_path = f"public/images/{ticker}_news.png"
    os.makedirs(os.path.dirname(img_path), exist_ok=True)

    if not articles:
        predicted_price = base_price

        plt.style.use("dark_background")
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.plot([0, 1], [base_price, predicted_price], marker="o", linestyle="--", color="gray", label="No News Data")
        ax.set_title(f"{ticker} – No News Available", fontsize=12)
        ax.set_ylabel("Predicted Price ($)")
        ax.set_xticks([])
        ax.legend()
        plt.tight_layout()
        plt.savefig(img_path, dpi=300, bbox_inches='tight')
        plt.close()

        return round(predicted_price, 2), f"/images/{ticker}_news.png"

    # Se houver artigos, avalia sentimento
    factors = []
    for article in articles:
        title = article.get("title", "")
        desc = article.get("description", "")
        full_text = f"{title}. {desc}".strip()
        sentiment = analyze_sentiment(full_text)
        factor = sentiment_to_factor(sentiment)
        factors.append(factor)

    avg_factor = sum(factors) / len(factors)
    predicted_price = base_price * avg_factor

    # Gráfico escuro e com visual refinado
    plt.style.use("dark_background")
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.plot([0, 1], [base_price, predicted_price], marker="o", linestyle="--", color="#00BFFF", linewidth=2, label="Sentiment-based Prediction")
    ax.set_title(f"{ticker} – News Sentiment Prediction", fontsize=13)
    ax.set_ylabel("Price ($)")
    ax.set_xticks([])
    ax.legend()
    plt.tight_layout()
    plt.savefig(img_path, dpi=300, bbox_inches='tight')
    plt.close()

    return round(predicted_price, 2), f"/images/{ticker}_news.png"