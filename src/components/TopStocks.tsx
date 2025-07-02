'use client';

import { useEffect, useState } from 'react';

type StockData = {
  symbol: string;
  price: number;
  change: number;
};

const popularStocks = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'META', 'NVDA'];

export default function TopStocks() {
  const [stocks, setStocks] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(`/api/stocks?symbols=${popularStocks.join(',')}`);
        const data = await res.json();
        setStocks(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 15000); // Atualiza a cada 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 py-6 px-4 rounded-xl shadow-lg text-gray-100">
      <h2 className="text-xl mb-4 font-light">Market Watch</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stocks.map(({ symbol, price, change }) => (
          <div
            key={symbol}
            className="bg-gray-800 rounded-md p-4 flex flex-col border border-gray-700 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-white">{symbol}</span>
              <span
                className={
                  change >= 0 ? 'text-green-400 text-sm' : 'text-red-400 text-sm'
                }
              >
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </span>
            </div>
            <p className="text-gray-300 text-sm">${price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}