'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const [ticker, setTicker] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker) {
      router.push(`/result/${ticker.toUpperCase()}`);
    }
  };

  return (
    <div id="home" className="min-h-screen">
      <Navbar />

      <section className="h-screen flex flex-col justify-center items-center bg-black text-white px-4">
        <h1 className="text-4xl font-light mb-6">Welcome to Stock Predictor</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            list="tickers"
            placeholder="Enter ticker (e.g. AAPL)"
            className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-3"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Predict
          </button>
        </form>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-900 text-gray-300">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-4 font-light">About</h2>
          <p>
            This project uses machine learning and sentiment analysis to predict stock movements based on historical prices and recent news.
          </p>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-gray-800 text-gray-300">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-4 font-light">Contact</h2>
          <p>
            Developed by Gabriel Caixeta Romero. For inquiries, reach out via LinkedIn or GitHub.
          </p>
        </div>
      </section>
    </div>
  );
}