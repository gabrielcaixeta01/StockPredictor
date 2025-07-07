import yfinance as yf
import matplotlib.pyplot as plt
import os
import numpy as np
from sklearn.ensemble import RandomForestRegressor

def train_model(ticker):
    df = yf.download(ticker, period="90d", auto_adjust=False)
    if df.empty or len(df) < 30:
        raise Exception("Insufficient data for ticker.")

    df = df.reset_index()
    df['Days'] = np.arange(len(df))
    df['MA5'] = df['Close'].rolling(window=5).mean()
    df['MA10'] = df['Close'].rolling(window=10).mean()
    df['Volume'] = df['Volume'] / 1e6
    df = df.dropna()

    X = df[['Days', 'MA5', 'MA10', 'Volume']].values.astype(np.float64)
    y = df['Close'].values.astype(np.float64).ravel()

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)

    last_row = df.iloc[-1]
    next_input = np.array([
        last_row['Days'] + 1,
        last_row['MA5'],
        last_row['MA10'],
        last_row['Volume']
    ], dtype=np.float64).reshape(1, -1)

    next_price = model.predict(next_input)[0]
    today_price = y[-1]

    img_path = f"public/images/{ticker}_price.png"
    os.makedirs(os.path.dirname(img_path), exist_ok=True)

    # Estilo escuro e moderno
    plt.style.use("dark_background")
    fig, ax = plt.subplots(figsize=(12, 6), facecolor='black')
    fig.patch.set_facecolor('black')

    ax.plot(df['Date'], y, label='Real Prices', color='#00BFFF', linewidth=2.5, alpha=0.9)
    ax.plot(df['Date'], model.predict(X), linestyle='--', label='Random Forest Trend', color='orange', linewidth=2.5, alpha=0.9)

    # Ponto da previsão com destaque visual
    ax.scatter(
        df['Date'].iloc[-1], next_price,
        color='red', edgecolor='white',
        label='Next Day Prediction',
        zorder=10, s=100, linewidths=1.5
    )

    ax.set_title(f"{ticker} - Forecast with Random Forest & Features", fontsize=18, color='white', weight='regular', pad=15)
    ax.set_xlabel("Date", fontsize=13, color='white')
    ax.set_ylabel("Price ($)", fontsize=13, color='white')

    ax.tick_params(colors='white', labelsize=10)
    ax.grid(True, linestyle='--', linewidth=0.5, alpha=0.3)

    ax.legend(facecolor='black', edgecolor='white', labelcolor='white', fontsize=10, loc='upper left')

    plt.xticks(rotation=45, color='white', fontsize=10)
    plt.yticks(color='white', fontsize=10)
    plt.tight_layout()
    plt.savefig(img_path, dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()

    return round(float(today_price), 2), round(float(next_price), 2), img_path