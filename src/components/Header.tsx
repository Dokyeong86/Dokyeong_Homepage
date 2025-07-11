// file: frontend/src/components/Header.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const menu = [
  { name: "About", path: "/about" },
  { name: "Works", path: "/works" },
  { name: "Blog", path: "/blog" },
  { name: "Labs", path: "/labs" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 flex justify-between items-center px-8 py-6 transition-colors duration-500
        ${scrolled ? "bg-white/90 shadow border-b border-gray-200 backdrop-blur-md" : "bg-transparent"}
      `}
      style={{
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.04)" : "none",
        transition: "background 0.5s, box-shadow 0.5s"
      }}
    >
      <Link href="/" className={`text-lg font-bold tracking-widest ${scrolled ? "text-black" : "text-white"}`}>DOKYEONG</Link>
      <nav className="flex space-x-8">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`transition relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300
              ${scrolled ? "text-black/80 hover:text-black" : "text-white/80 hover:text-white"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
