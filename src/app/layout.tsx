import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stock Predictor',
  description: 'Predict stock prices using AI and news sentiment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-100 min-h-screen flex flex-col`}>
        <header className="bg-gray-900 text-center py-6 shadow-md">
          <h1 className="text-2xl font-semibold text-white">Stock Predictor</h1>
        </header>

        <main className="flex-grow flex items-center justify-center py-10 bg-gray-800 px-4">
          {children}
        </main>

        <footer className="bg-gray-900 text-center text-sm text-gray-500 py-4">
          <p>&copy; 2025 Stock Predictor</p>
        </footer>
      </body>
    </html>
  );
}