"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center">
        
        {/* LEFT LOGO */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/signature.png"
              alt="Muahx signature"
              width={60}
              height={60}
              priority
            />
            <span className="logo-text text-3xl md:text-[42px] text-black leading-none">
              Muahx
            </span>
          </Link>
        </div>

        {/* CENTER MENU (desktop) */}
        <nav className="hidden md:flex flex-1 justify-center gap-14 text-sm tracking-[0.08em] text-black font-light">
          <Link className="hover:text-black transition whitespace-nowrap" href="/">Home</Link>
          <Link className="hover:text-black transition whitespace-nowrap" href="/about-me">Aboute Me</Link>
          <Link className="hover:text-black transition whitespace-nowrap" href="/digital-art">Digital Art</Link>
          <Link className="hover:text-black transition whitespace-nowrap" href="/contact">Contact</Link>
        </nav>

        {/* RIGHT SOCIAL + HAMBURGER */}
        <div className="flex flex-1 justify-end items-center gap-5 text-lg text-black">
<a className="hover:text-black transition" href="https://x.com/ArtMuahx" aria-label="X">
  <i className="fa-brands fa-x-twitter"></i>
</a>
<a className="hover:text-black transition" href="https://www.instagram.com/muahx.art/" aria-label="Instagram">
  <i className="fa-brands fa-instagram"></i>
</a>
<a className="hover:text-black transition" href="#" aria-label="YouTube">
  <i className="fa-brands fa-youtube"></i>
</a>

          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 flex flex-col gap-4 text-sm">
          <Link href="/">HOME</Link>
          <Link href="/about-me">ABOUT ME</Link>
          <Link href="/digital-art">DIGITAL ART</Link>
          <Link href="/contact">CONTACT</Link>
        </div>
      )}
    </header>
  );
}