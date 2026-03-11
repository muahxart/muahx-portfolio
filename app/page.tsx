"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/projects";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  // slider ref
  const worksRef = useRef<HTMLDivElement | null>(null);

  // arrows enable/disable
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // drag state (ref così non re-rendera durante drag)
  const drag = useRef({
    isDown: false,
    startX: 0,
    startLeft: 0,
    moved: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Latest project (by date)
  const latestProject = useMemo(() => {
    return [...projects].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, []);

  // Latest 6 (by date)
  const latestSix = useMemo(() => {
    return [...projects]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, []);

  // compute card step (1 card + gap)
  const getStep = () => {
    const el = worksRef.current;
    if (!el) return 0;

    const card = el.querySelector<HTMLElement>("[data-work-card='true']");
    if (!card) return Math.round(el.clientWidth * 0.8);

    // GAP: stai usando gap-6 => 1.5rem => 24px
    // (se cambi gap, cambia anche questo valore)
    const GAP = 24;
    return card.offsetWidth + GAP;
  };

  const scrollWorks = (dir: "left" | "right") => {
    const el = worksRef.current;
    if (!el) return;

    const step = getStep();
    if (!step) return;

    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  };

  // Enable/disable arrows (also runs on scroll/resize)
  useEffect(() => {
    const el = worksRef.current;
    if (!el) return;

    const update = () => {
      const left = el.scrollLeft;
      const max = el.scrollWidth - el.clientWidth;

      setCanLeft(left > 2);
      setCanRight(left < max - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Drag handlers (mouse + touch via pointer events)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = worksRef.current;
    if (!el) return;

    drag.current.isDown = true;
    drag.current.moved = false;

    el.setPointerCapture(e.pointerId);
    drag.current.startX = e.clientX;
    drag.current.startLeft = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = worksRef.current;
    if (!el) return;
    if (!drag.current.isDown) return;

    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;

    el.scrollLeft = drag.current.startLeft - dx;
  };

  const onPointerUpOrCancel = () => {
    drag.current.isDown = false;
  };

  // Prevent opening a card when user dragged
  const onCardClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <main className="w-full pt-0">
      {/* =========================
          SECTION 1 — HERO COMPOSITO
         ========================= */}
      <section className="w-full">
        <div className="relative w-full bg-white">
          <div className="relative mx-auto max-w-7xl px-6 pt-10 md:pt-0 pb-8 md:pb-0">
            <img
              src="/images/home/left.png"
              alt="Left subject"
              className="hero-float-a absolute left-4 md:left-10 top-1/2 -translate-y-1/2 h-[140px] md:h-[380px] w-auto select-none pointer-events-none"
            />
            <img
              src="/images/home/right.png"
              alt="Right subject"
              className="hero-float-b absolute right-4 md:right-10 top-1/2 -translate-y-1/2 h-[140px] md:h-[380px] w-auto select-none pointer-events-none"
            />
            <div className="flex items-center justify-center">
              <img
                src="/images/home/logo.png"
                alt="Muahx logo"
                className="h-[140px] md:h-[380px] w-auto select-none pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[150px] md:h-[300px] overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Hero artwork"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </section>

      {/* =========================
          SECTION 2 — FRASE ANIMATA
         ========================= */}
      <section
        className={`w-full bg-white transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
<h2 className="group relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-relaxed tracking-tight text-black/80">

  {/* LATINO */}
  <span className="block transition-opacity duration-500 group-hover:opacity-0">
    “Scientia nos liberos facit…
    <br className="hidden md:block" />
    …ingenium libertati alas dat!”
  </span>

  {/* INGLESE */}
  <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
    “Knowledge makes us free…
    <br className="hidden md:block" />
    …creativity gives wings to freedom!”
  </span>

</h2>
        </div>
      </section>

      {/* =========================
          SECTION 3 — LATEST PROJECT
         ========================= */}
      <section className="w-full bg-[#F3F3F9]">
        <div
          className={`mx-auto max-w-7xl px-6 py-16 md:py-20 transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {latestProject?.title}
              </h2>

              <p className="mt-6 text-sm md:text-base text-black/70 leading-relaxed">
                {latestProject?.shortDescription}
              </p>

              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href={`/digital-art/${latestProject?.slug}`}
                  className="rounded-2xl bg-[#3BDF00] px-8 py-3 text-sm text-white hover:brightness-95 transition duration-300"
                >
                  View work
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Link
                href={`/digital-art/${latestProject?.slug}`}
                className="group block cursor-pointer"
                aria-label={`Open project: ${latestProject?.title ?? "Project"}`}
              >
                <div className="w-[260px] md:w-[340px] aspect-square overflow-hidden rounded-[28px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                  <img
                    src={latestProject?.images?.[0]}
                    alt={latestProject?.title ?? "Project image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SECTION 3 — TITOLO PROGETTO
         ========================= */}
      <section
        className={`w-full bg-white transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight leading-relaxed tracking-tight text-black/80">
            “Wings of Creativity… Or maybe fins!”
          </h2>
        </div>
      </section>

      {/* =========================
          SECTION 5 — MY WORKS (ELEGANT SLIDER)
         ========================= */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 md:py-10">
          <div className="flex items-center justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-extralight">My works</h2>

            <Link
              href="/digital-art"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm text-white hover:bg-blue-700 transition"
            >
              View all works
            </Link>
          </div>

          <div className="mt-12">
            <div
            ref={worksRef}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 pr-10"
            >
              {latestSix.map((p) => (
                <Link
                  key={p.slug}
                  href={`/digital-art/${p.slug}`}
                  className="group flex-none snap-start"
                  data-work-card="true"
                  onClickCapture={onCardClickCapture}
                >
                  <div className="w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px]">
                    <div className="aspect-square overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <div className="text-sm font-light tracking-[0.08em] text-black">
                        {p.title}
                      </div>

                      <div className="mt-4 flex justify-center">
                        <span className="inline-flex items-center justify-center rounded-2xl bg-[#3BDF00] px-6 py-4 text-xs text-white transition duration-300 hover:brightness-95">
                          View work
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* arrows right */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => scrollWorks("left")}
                disabled={!canLeft}
                className={`w-10 h-10 rounded-full bg-white shadow ring-1 ring-black/5 transition ${
                  canLeft
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-40 cursor-not-allowed"
                }`}
                aria-label="Scroll left"
              >
                ‹
              </button>

              <button
                onClick={() => scrollWorks("right")}
                disabled={!canRight}
                className={`w-10 h-10 rounded-full bg-white shadow ring-1 ring-black/5 transition ${
                  canRight
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-40 cursor-not-allowed"
                }`}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

{/* =========================
    SECTION 6 — ABOUT + DONATE
   ========================= */}
<section className="w-full bg-white">
  <div className="max-w-7xl mx-auto px-6 py-2">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* CARD ABOUT */}
      <div className="bg-gray-100 rounded-3xl p-5 text-center">
        <h2 className="text-4xl font-extralight">About Me</h2>

        <p className="mt-6 text-sm md:text-base text-black/90 leading-relaxed">
   I am an Italian artist drawn to the meeting point between knowledge and creativity.
Under the pseudonym Muahx, born in the early days of the Internet, I explore the freedom of imagination through collages that blend pop art, surrealism, abstraction, and naïve art.
Images, fragments, and colors meet with irony to create free and unpredictable compositions..
        </p>

        <div className="mt-4">
          <Link
            href="/about-me"
            className="text-blue-600 text-sm hover:text-blue-700 transition"
          >
            Read more →
          </Link>
        </div>

        {/* FOTO ABOUT (3:2, arrotondata, pulita) */}
        <div className="mt-8 overflow-hidden rounded-2xl aspect-[3/2] ring-1 ring-black/5">
          <img
            src="/images/about-photo.jpg"
            alt="About Muahx"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CARD DONATE */}
      <div className="bg-gray-100 rounded-3xl p-5 text-center">
        <h2 className="text-4xl font-extralight">Cheers!</h2>       
        <p className="mt-6 text-sm md:text-base text-black/90 leading-relaxed">
          Enjoying my projects?
          <br />
          I’m always happy to hear your feedback…
          <br />
          preferably with a good glass of rum!
        </p>

        <div className="mt-6">
<a
  href="https://paypal.me/ArtMuahx?country.x=IT&locale.x=it_IT"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center rounded-2xl bg-[#3BDF00] px-10 py-3 text-sm text-white transition hover:brightness-95"
>
  donate
</a>
        </div>

        {/* ILLUSTRAZIONE DONATE (non cover: deve restare intera) */}
<div className="mt-8 overflow-hidden rounded-2xl aspect-[3/2]">
  <img
    src="/images/home/donate.png"
    alt="Donate illustration"
    className="w-full h-full object-contain"
  />
</div>
      </div>
    </div>
  </div>
</section>

      <div className="h-10" />
    </main>
  );
}