import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F3F3F9]">
      <div className="w-full max-w-7xl mx-auto px-6 pt-14 pb-10">
        {/* TOP ROW */}
        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-3 md:flex-1">
            <Image
              src="/images/signature.png"
              alt="Muahx signature"
              width={60}
              height={60}
            />
            <span className="logo-text text-3xl md:text-[42px] leading-none">Muahx</span>
          </div>

          {/* CENTER: MENU */}
          <nav className="flex flex-col gap-4 md:flex-1 md:flex-row md:justify-center md:gap-14 text-sm tracking-[0.08em] text-black font-light">
            <Link className="hover:text-black transition  whitespace-nowrap" href="/">
              Home
            </Link>
            <Link className="hover:text-black transition  whitespace-nowrap" href="/about-me">
              About Me
            </Link>
            <Link className="hover:text-black transition  whitespace-nowrap" href="/digital-art">
              Digital Art
            </Link>
            <Link className="hover:text-black transition  whitespace-nowrap" href="/contact">
              Contact
            </Link>
          </nav>

          {/* RIGHT: SOCIAL */}
          <div className="flex items-center gap-5 text-lg text-black md:flex-1 md:justify-end">
            <a className="hover:text-black transition" href="https://x.com/ArtMuahx" aria-label="X">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              className="hover:text-black transition"
              href="https://www.instagram.com/muahx.art/"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              className="hover:text-black transition"
              href="#"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="mt-10 border-t border-gray-200" />

        {/* BOTTOM ROW */}
{/* BOTTOM ROW */}
<div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-gray-500 tracking-wide">
  <div>
    © {new Date().getFullYear()} Muahx. All rights reserved.
  </div>

  <div>
      <a
    href="mailto:muahxart@gmail.com"
    className="hover:text-black transition"
    >

    muahxart@gmail.com
    </a>
  </div>
</div>
      </div>
    </footer>
  );
}