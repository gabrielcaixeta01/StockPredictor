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
    <nav className="bg-black/80 backdrop-blur-md text-gray-200 shadow-lg px-8 py-4 fixed top-0 w-full z-50 flex justify-between items-center">
        {/* Branding */}
        <Link href="/" className="text-xl tracking-wide font-extralight text-white hover:text-blue-400 transition-colors duration-300">
            Quantum Alpha
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-8 text-sm font-light">
            <li
            className="cursor-pointer hover:text-blue-400 transition-colors duration-300"
            onClick={() => handleNavClick('home')}
            >
            Home
            </li>
            <li
            className="cursor-pointer hover:text-blue-400 transition-colors duration-300"
            onClick={() => handleNavClick('about')}
            >
            About
            </li>
            <li
            className="cursor-pointer hover:text-blue-400 transition-colors duration-300"
            onClick={() => handleNavClick('contact')}
            >
            Contact
            </li>
        </ul>
    </nav>
  );
}