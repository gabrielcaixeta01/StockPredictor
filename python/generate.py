import sys
import json
from model import train_model
from news_model import train_model_news
from news_scraper import get_news_articles
from technicals import generate_technical_chart  # certifique-se que o arquivo se chame technicals.py

def main():
    if len(sys.argv) < 2:
        print("Error: No ticker provided", file=sys.stderr)
        sys.exit(1)

    ticker = sys.argv[1]

    try:
        # Rodar modelos
        today_price, next_price, image_price = train_model(ticker)
        news_prediction, news_image = train_model_news(ticker)
        technical_image = generate_technical_chart(ticker)

        # Coletar notícias com sentimento
        news_articles = get_news_articles(ticker)

        # Empacotar tudo
        result = {
            "ticker": ticker,
            "today": today_price,
            "next": next_price,
            "prediction": news_prediction,
            "imagePrice": f"/images/{ticker}_price.png",
            "imageNews": f"/images/{ticker}_news.png",
            "imageTechnical": f"/images/{ticker}_technical.png",
            "news": news_articles
        }

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()