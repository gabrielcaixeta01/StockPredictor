// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import StockTickerWidget from '@/components/StockTickerWidget';
import TopStocks from '@/components/TopStocks';

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
    <div className="bg-black text-white">
      <Navbar />

      <div className="relative z-10">
        <StockTickerWidget />
      </div>

      <section id="home" className="h-[80vh] flex flex-col justify-center items-center px-4">
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

      <div className="py-12 px-6 bg-gray-900">
        <TopStocks />
      </div>

      <section id="about" className="min-h-[80vh] py-24 px-6 bg-gray-900 text-gray-200 flex items-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-light border-b border-gray-700 pb-4">
            About the Project
          </h2>
          <p className="text-lg leading-relaxed text-gray-400">
            <span className="text-white">Stock Predictor</span> is a modern financial analytics platform that combines
            <strong className="text-blue-400"> machine learning </strong> with
            <strong className="text-green-400"> real-time news sentiment analysis</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-md shadow-md">
              <h3 className="text-lg font-medium text-white mb-2">Objective</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Provide actionable predictions based on financial data and media coverage.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-md shadow-md">
              <h3 className="text-lg font-medium text-white mb-2">How it works</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The system uses Random Forest and sentiment analysis on recent headlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-[60vh] py-24 px-6 bg-gray-950 text-gray-200 flex items-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-3xl md:text-4xl font-light border-b border-gray-700 pb-4">Contact</h2>
          <p className="text-lg text-gray-400">
            Want to connect, ask questions, or collaborate? Feel free to reach out:
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Email: <a href="mailto:gabrielcaixetaromero@gmail.com" className="text-blue-400 hover:underline">gabrielcaixetaromero@gmail.com</a>
            </p>
            <p className="text-sm text-gray-400">
              LinkedIn: <a href="https://linkedin.com/in/gabriel-caixeta-romero" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Gabriel Caixeta Romero</a>
            </p>
            <p className="text-sm text-gray-400">
              GitHub: <a href="https://github.com/gabrielcaixeta01" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">gabrielcaixeta01</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}