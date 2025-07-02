import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

        <main className="flex-grow bg-gray-900">
          {children}
        </main>

       <Footer />
      </body>
    </html>
  );
}