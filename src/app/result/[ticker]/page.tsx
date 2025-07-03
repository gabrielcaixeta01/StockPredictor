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

async function getPrediction(ticker: string): Promise<StockResultData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticker }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Prediction failed');
  }

  return res.json();
}

type Props = {
  params: { ticker: string };
};

export default async function ResultPage({ params }: Props) {
  const { ticker } = await Promise.resolve(params);
  const data = await getPrediction(ticker);

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-10">
      <StockResult {...data} />
    </main>
  );
}