'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (sectionId: string) => {
    if (pathname === '/') {
      // Scroll suave se já estiver na landing page
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Redireciona para landing e scrolla para a seção
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav className="bg-black text-gray-300 shadow-md px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50">
      <Link href="/" className="text-xl font-light">Gabriel Predictor</Link>
      <ul className="flex space-x-6 text-sm font-light">
        <li className="cursor-pointer hover:text-white" onClick={() => handleNavClick('home')}>Home</li>
        <li className="cursor-pointer hover:text-white" onClick={() => handleNavClick('about')}>About</li>
        <li className="cursor-pointer hover:text-white" onClick={() => handleNavClick('contact')}>Contact</li>
      </ul>
    </nav>
  );
}