import Image from "next/image";

type Props = {
  today: number;
  next: number;
  news: {
    title: string;
    url: string;
    summary: string;
    sentiment: "positive" | "negative" | "neutral";
  }[];
  imagePrice: string;
  imageNews: string;
  ticker: string;
};

export default function StockResult({
  today,
  next,
  news,
  imagePrice,
  imageNews,
  ticker,
}: Props) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4 space-y-10 text-gray-200">
      <h2 className="text-2xl md:text-3xl font-light text-center">
        {ticker} Stock Analysis
      </h2>

      <div className="flex flex-col md:flex-row md:justify-around gap-6 text-base text-center">
        <p><span className="text-gray-400">Today&#39;s Price:</span> ${today.toFixed(2)}</p>
        <p><span className="text-gray-400">Next Day Prediction:</span> ${next.toFixed(2)}</p>
        <p><span className="text-gray-400">News-based Prediction:</span> {news.length} articles</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-light border-b border-gray-700 pb-2">News Overview</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item, index) => (
            <div key={index} className="p-4 border border-gray-700 rounded-lg bg-[#1e1f24]">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-base"
              >
                {item.title}
              </a>
              <p className="text-sm text-gray-300 mt-2">
                {item.summary || "No summary available."}
              </p>
              <p className="text-xs mt-1 italic text-gray-500">
                Sentiment: {item.sentiment || "neutral"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-light border-b border-gray-700 pb-2">Historical Price Graph</h3>
        <Image
          src={imagePrice}
          alt="Price chart"
          className="rounded-lg w-full"
          width={800}
          height={500}
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-light border-b border-gray-700 pb-2">Sentiment Graph</h3>
        <Image
          src={imageNews}
          alt="News chart"
          className="rounded-lg w-full"
          width={800}
          height={500}
        />
      </div>
    </div>
  );
}
