import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Stock Predictor',
  description: 'Predict stock prices using AI and news sentiment',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-100 min-h-screen flex flex-col`}>
        <Navbar />

        <main className="flex-grow py-24 px-6 bg-gray-900">
          {children}
        </main>

        <footer className="bg-gray-900 text-center text-sm text-gray-500 py-4">
          <p>&copy; 2025 Stock Predictor</p>
        </footer>
      </body>
    </html>
  );
}