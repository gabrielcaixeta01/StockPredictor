type Props = {
  today: number;
  next: number;
  news: {
    title: string;
    url: string;
    summary: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  imagePrice: string;
  imageNews: string;
};

export default function StockResult({ today, next, news, imagePrice, imageNews }: Props) {
  return (
    <div className="space-y-6 mt-8 text-white">
      <p className="text-lg">📊 Today’s Price: <strong>${today}</strong></p>
      <p className="text-lg">🔮 Next Day Prediction: <strong>${next}</strong></p>
      <p className="text-lg">
        📰 News-based Prediction: <strong>{news.length} articles</strong>
      </p>

      <div>
        <h3 className="font-bold mb-2">📈 Historical Price Graph</h3>
        <img
          src={imagePrice}
          alt="Price chart"
          className="rounded w-full max-w-lg mx-auto border border-gray-600"
        />
      </div>

      <div>
        <h3 className="font-bold mb-2">🧠 Sentiment Graph</h3>
        <img
          src={imageNews}
          alt="News chart"
          className="rounded w-full max-w-lg mx-auto border border-gray-600"
        />
      </div>
    </div>
  );
}