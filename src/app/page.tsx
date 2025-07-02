'use client';

import { useState } from 'react';
import StockResult from '@/components/StockResult';

type NewsArticle = {
  title: string;
  url: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
};

type StockResultData = {
  prediction: number;
  ticker: string;
  today: number;
  next: number;
  news: NewsArticle[];
  imagePrice: string;
  imageNews: string;
};

export default function HomePage() {
  const [ticker, setTicker] = useState('');
  const [data, setData] = useState<StockResultData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setData(null);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Prediction failed');
      }

      const json = await res.json();

      setData({
        prediction: json.prediction,
        ticker: json.ticker,
        today: Number(json.today),
        next: Number(json.next),
        news: json.news,
        imagePrice: json.imagePrice,
        imageNews: json.imageNews,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="w-full max-w-[60%] bg-gray-900 p-4 rounded-xl shadow-lg">
      <h2 className="text-2xl  mb-6 text-center">Stock Price Predictor</h2>

      <div className="w-full flex mb-6 justify-center text-center">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-w-[75%]">
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            list="tickers"
            placeholder="Enter ticker (e.g. AAPL)"
            className="bg-gray-800 border border-blue-600 text-white rounded-md p-3 placeholder-gray-400"
          />
          <datalist id="tickers">
            <option value="AAPL" />
            <option value="GOOGL" />
            <option value="AMZN" />
            <option value="MSFT" />
            <option value="TSLA" />
            <option value="META" />
            <option value="NFLX" />
            <option value="NVDA" />
            <option value="BRK-B" />
            <option value="JPM" />
          </datalist>
          <button
            type="submit"
            className="bg-gray-800 hover:bg-blue-700 transition duration-500 ease-in-out text-white font-semibold py-3 rounded-md"
          >
            Predict
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>

      

      {data && <StockResult {...data} />}
    </div>
  );
}