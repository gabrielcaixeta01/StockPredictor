'use client';

import { useEffect, useState } from 'react';

type Ticker = {
  symbol: string;
  price: number;
  change: number;
};

export default function TopStocks() {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  useEffect(() => {
    fetch('/api/ticker')
      .then((res) => res.json())
      .then((data) => setTickers(data))
      .catch((err) => console.error('Failed to load tickers', err));
  }, []);

  return (
    <div className="overflow-hidden mt-16 py-3 align-bottom bg-[#0b0d17] border-b border-gray-800 text-gray-200">
      <div className="animate-marquee flex flex-row items-center whitespace-nowrap space-x-12 px-6 py-3 text-sm hover:[animation-play-state:paused]">
        {tickers.map(({ symbol, price, change }) => {
          const isUp = change >= 0;
          return (
            <div key={symbol} className="flex-shrink-0 min-w-[140px]">
              <span className="font-medium mr-2 text-white">{symbol}</span>
              <span className="mr-2 text-gray-400">${price.toFixed(2)}</span>
              <span className={isUp ? 'text-green-500' : 'text-red-500'}>
                {isUp ? '+' : ''}
                {change.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}