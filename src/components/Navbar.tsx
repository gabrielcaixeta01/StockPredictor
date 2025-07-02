"use client";

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 shadow-md py-4 px-6 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-light tracking-wide">
          Stock Predictor
        </div>
        <ul className="flex space-x-8 text-gray-300 text-sm font-light">
          <li className="hover:text-white transition duration-200">
            <a href="#home">HOME</a>
          </li>
          <li className="hover:text-white transition duration-200">
            <a href="#about">ABOUT</a>
          </li>
          <li className="hover:text-white transition duration-200">
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}