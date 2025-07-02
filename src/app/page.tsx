'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import TopStocks from '@/components/TopStocks';
import StockTickerWidget from '@/components/StockTickerWidget';

export default function HomePage() {
  const [ticker, setTicker] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      router.push(`/result/${ticker.toUpperCase()}`);
    }
  };

  return (
    <div className="bg-black text-white">
      <Navbar />
      <StockTickerWidget />

      {/* HERO */}
      <section id="home" className="min-h-[80vh] pt-16 flex flex-col justify-center items-center px-4 bg-black">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-light">Stock Predictor</h1>
          <p className="text-gray-400 text-lg">
            Predict short-term stock trends using AI and sentiment analysis from real-world news.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Predict
            </button>
          </form>
        </div>
      </section>

      {/* STOCK LIST */}
      <TopStocks />

      {/* ABOUT */}
      <section id="about" className="min-h-[80vh] py-24 px-6 bg-gray-900 text-gray-200 flex items-center">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-light border-b border-gray-700 pb-4">
            About the Project
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            <span className="text-white">Stock Predictor</span> is a modern financial analytics platform that combines
            <span className="text-blue-400"> machine learning</span> with
            <span className="text-green-400"> real-time news sentiment analysis</span>. It analyzes historical price data and media signals to help investors make smarter decisions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-md shadow-md">
              <h3 className="text-lg font-medium text-white mb-2">Objective</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Provide actionable predictions based on financial data and media coverage to simulate investment decisions.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-md shadow-md">
              <h3 className="text-lg font-medium text-white mb-2">How it works</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The system uses a Random Forest model trained on stock prices and a sentiment-based model that evaluates recent news headlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-[60vh] py-24 px-6 bg-gray-950 text-gray-200 flex items-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-light border-b border-gray-700 pb-4">Contact</h2>
          <p className="text-lg text-gray-400">Want to connect, ask questions, or collaborate?</p>
          <div className="space-y-4 text-sm text-gray-400">
            <p>
              Email:{" "}
              <a href="mailto:gabrielcaixetaromero@gmail.com" className="text-blue-400 hover:underline">
                gabrielcaixetaromero@gmail.com
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/gabriel-caixeta-romero"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Gabriel Caixeta Romero
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/gabrielcaixeta01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                gabrielcaixeta01
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}