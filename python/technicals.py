import yfinance as yf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os

def generate_technical_chart(ticker: str):
    df = yf.download(ticker, period="3mo")

    df['MA20'] = df['Close'].rolling(window=20).mean()
    df['STD20'] = df['Close'].rolling(window=20).std()
    df['Upper'] = df['MA20'] + 2 * df['STD20']
    df['Lower'] = df['MA20'] - 2 * df['STD20']

    delta = df['Close'].diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.rolling(window=14).mean()
    avg_loss = loss.rolling(window=14).mean()
    rs = avg_gain / avg_loss
    df['RSI'] = 100 - (100 / (1 + rs))

    img_path = f"public/images/{ticker}_technical.png"
    os.makedirs(os.path.dirname(img_path), exist_ok=True)

    plt.style.use("dark_background")
    fig, ax = plt.subplots(2, 1, figsize=(12, 8), sharex=True)

    ax[0].plot(df.index, df['Close'], label='Close', color="#00BFFF")
    ax[0].plot(df.index, df['MA20'], label='MA20', color="orange", linestyle="--")
    ax[0].fill_between(df.index, df['Upper'], df['Lower'], color="gray", alpha=0.3)
    ax[0].set_title(f"{ticker} - Bollinger Bands")
    ax[0].legend()

    ax[1].plot(df.index, df['RSI'], label='RSI', color="lime")
    ax[1].axhline(70, linestyle="--", color="red")
    ax[1].axhline(30, linestyle="--", color="blue")
    ax[1].set_title("RSI (14)")
    ax[1].set_ylim(0, 100)
    ax[1].legend()

    plt.tight_layout()
    plt.savefig(img_path, dpi=300, bbox_inches="tight")
    plt.close()

    return f"/images/{ticker}_technical.png"