import Image from "next/image";

type NewsArticle = {
  title: string;
  url: string;
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
};

type Props = {
  today: number;
  next: number;
  news: NewsArticle[];
  imagePrice: string;
  imageNews: string;
};

export default function StockResult({
  today,
  next,
  news,
  imagePrice,
  imageNews,
}: Props) {
  const ticker = imagePrice.split("/").pop()?.split("_")[0] || "Stock";

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 text-white space-y-10">
      <h2 className="text-3xl font-bold text-center">
        📈 {ticker} Stock Analysis
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <p>💰 <strong>Today’s Price:</strong> ${today}</p>
        <p>🔮 <strong>Next Day Prediction:</strong> ${next}</p>
        <p>📰 <strong>News-based Prediction:</strong> {news.length} articles</p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">🧾 News Overview</h3>
        <div className="space-y-4">
          {news.map((article, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-4 bg-gray-900"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-400 hover:underline"
              >
                {article.title}
              </a>
              <p className="mt-2 text-gray-300 text-sm">
                {article.summary || "No summary available."}
              </p>
              <p className="mt-1 text-sm italic text-gray-500">
                Sentiment: {article.sentiment}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2">📊 Historical Price Graph</h3>
          <Image
            src={imagePrice}
            alt="Historical Price Chart"
            className="rounded-lg w-full"
            width={800}
            height={500}
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">🧠 Sentiment Graph</h3>
          <Image
            src={imageNews}
            alt="Sentiment Chart"
            className="rounded-lg w-full"
            width={800}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}