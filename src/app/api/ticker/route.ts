import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    { symbol: 'AAPL', price: 212.32, change: -0.42 },
    { symbol: 'GOOGL', price: 2801.12, change: 1.03 },
    { symbol: 'TSLA', price: 703.17, change: -2.13 },
    { symbol: 'AMZN', price: 3512.89, change: 0.85 },
    { symbol: 'MSFT', price: 295.44, change: -0.12 },
    { symbol: 'NVDA', price: 123.45, change: 1.91 },
  ];

  return NextResponse.json(data);
}