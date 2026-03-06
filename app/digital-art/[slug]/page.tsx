"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, categories } from "../../../data/projects";
import Lightbox from "../../../components/Lightbox";

type Props = {
  params: Promise<{ slug: string }>;
};

type Tab = "video" | "why" | "genesis";

function getYouTubeEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
    return url;
  } catch {
    return url;
  }
}

export default function ProjectPage({ params }: Props) {
  const [mounted, setMounted] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("why");

  const [lightOpen, setLightOpen] = useState(false);
  const [lightImages, setLightImages] = useState<string[]>([]);
  const [lightIndex, setLightIndex] = useState(0);

  // RELATED slider
  const relatedRef = useRef<HTMLDivElement | null>(null);
  const [relCanLeft, setRelCanLeft] = useState(false);
  const [relCanRight, setRelCanRight] = useState(false);

  // drag state for related
  const relDrag = useRef({
    isDown: false,
    startX: 0,
    startLeft: 0,
    moved: false,
  });

  useEffect(() => {
    setMounted(true);
    (async () => {
      const p = await params;
      setSlug(p.slug);
    })();
  }, [params]);

  const project = useMemo(() => {
    if (!slug) return null;
    return projects.find((p) => p.slug === slug) ?? null;
  }, [slug]);

  if (slug && !project) notFound();

  const category = project?.category ?? "Music";
  const categoryTitle = categories[category]?.title ?? category;
  const backHref = project
    ? `/digital-art?cat=${encodeURIComponent(project.category)}`
    : "/digital-art";

  const mainImages = project?.images ?? [];
  const genesisImages = project?.genesisImages ?? [];

  const related = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.category === project.category && p.slug !== project.slug)
      .slice(0, 6);
  }, [project]);

  function openLightbox(images: string[], index: number) {
    setLightImages(images);
    setLightIndex(index);
    setLightOpen(true);
  }

  function prev() {
    setLightIndex((i) => (i - 1 + lightImages.length) % lightImages.length);
  }

  function next() {
    setLightIndex((i) => (i + 1) % lightImages.length);
  }

  // --- Related: step scroll like Home (1 card + gap)
  const getRelatedStep = () => {
    const el = relatedRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-related-card='true']");
    if (!card) return Math.round(el.clientWidth * 0.8);
    const GAP = 24; // gap-6
    return card.offsetWidth + GAP;
  };

  function scrollRelated(dir: "left" | "right") {
    const el = relatedRef.current;
    if (!el) return;
    const step = getRelatedStep();
    if (!step) return;

    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  // Enable/disable related arrows on scroll/resize
  useEffect(() => {
    const el = relatedRef.current;
    if (!el) return;

    const update = () => {
      const left = el.scrollLeft;
      const max = el.scrollWidth - el.clientWidth;
      setRelCanLeft(left > 2);
      setRelCanRight(left < max - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [related.length]);

  // Drag handlers for related (mouse + touch)
  const onRelatedPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = relatedRef.current;
    if (!el) return;

    relDrag.current.isDown = true;
    relDrag.current.moved = false;

    el.setPointerCapture(e.pointerId);
    relDrag.current.startX = e.clientX;
    relDrag.current.startLeft = el.scrollLeft;
  };

  const onRelatedPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = relatedRef.current;
    if (!el) return;
    if (!relDrag.current.isDown) return;

    const dx = e.clientX - relDrag.current.startX;
    if (Math.abs(dx) > 6) relDrag.current.moved = true;

    el.scrollLeft = relDrag.current.startLeft - dx;
  };

  const onRelatedPointerUpOrCancel = () => {
    relDrag.current.isDown = false;
  };

  const onRelatedCardClickCapture = (e: React.MouseEvent) => {
    if (relDrag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <main className="w-full pt-6">
      {/* HERO */}
      <div className="w-full h-[220px] md:h-[300px] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Hero banner"
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* TOP SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* BACK */}
        <div className="mb-6">
          <Link
            href={backHref}
            className="text-sm text-black hover:underline underline-offset-4"
          >
            ← Back to {categoryTitle}
          </Link>
        </div>

        {/* MAIN TITLE */}
        <h1
          className={`mt-8 mb-16 md:mb-24 text-4xl md:text-6xl font-extralight tracking-[-0.01em] text-center max-w-4xl mx-auto transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {project?.title}
        </h1>

        {/* IMAGE + SIDE INFO */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT */}
          <div>
            {mainImages[0] && (
              <div className="overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                <button
                  onClick={() => openLightbox(mainImages, 0)}
                  className="group block w-full cursor-pointer"
                  aria-label="Open image"
                >
                  <img
                    src={mainImages[0]}
                    alt={project?.title}
                    className="w-full h-auto object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
              </div>
            )}

            {mainImages.length > 1 && (
              <div className="mt-6 flex gap-4 overflow-x-auto no-scrollbar">
                {mainImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => openLightbox(mainImages, i)}
                    className="group shrink-0 rounded-[16px] overflow-hidden ring-1 ring-black/10 cursor-pointer"
                    aria-label={`Open thumbnail ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-20 h-20 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-2xl font-semibold tracking-[0.02em]">
              {project?.title}
            </h2>

            <p className="mt-6 text-base leading-relaxed">
              {project?.shortDescription}
            </p>

            <div className="mt-10">
              <button
                disabled
                className="inline-flex items-center justify-center rounded-2xl bg-[#3BDF00] px-8 py-4 text-sm text-white transition duration-300 hover:brightness-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAVIGATION (Video | Why | Genesis) */}
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center gap-4 text-sm">
            {(["why", "genesis", "video"] as Tab[]).map((t, idx) => (
              <div key={t} className="flex items-center gap-4">
                <button
                  onClick={() => setTab(t)}
                  className={`pb-3 border-b cursor-pointer ${
                    tab === t
                      ? "border-black text-black"
                      : "border-transparent text-black opacity-60 hover:opacity-100"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>

                {idx < 2 && <span className="opacity-40">|</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TAB CONTENT FULL WIDTH */}
<section className="w-full bg-[#F3F3F9] mt-4">
  <div className="max-w-6xl mx-auto px-6 py-20">
    {tab === "video" && (
      <>
        {project?.videoUrl ? (
          <div className="overflow-hidden rounded-[24px] bg-black">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={getYouTubeEmbedUrl(project.videoUrl)}
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <p className="text-base leading-relaxed max-w-3xl mx-auto">
            {project?.videoText || "No video available for this project."}
          </p>
        )}
      </>
    )}

    {tab === "why" && (
      <p className="text-base leading-relaxed max-w-3xl mx-auto">
        {project?.whyText}
      </p>
    )}

    {tab === "genesis" && (
      <>
        {genesisImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {genesisImages.map((src, i) => (
              <button
                key={i}
                onClick={() => openLightbox(genesisImages, i)}
                className="group overflow-hidden rounded-[18px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] cursor-pointer"
                aria-label={`Open genesis image ${i + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-40 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-base leading-relaxed max-w-3xl mx-auto">
            {project?.genesisText || "No genesis content available for this project."}
          </p>
        )}
      </>
    )}
  </div>
</section>

      {/* RELATED */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-extralight">Related works</h2>

            <Link
              href={`/digital-art?cat=${encodeURIComponent(category)}`}
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-sm text-white transition duration-300 hover:bg-blue-700 active:scale-[0.98]"
            >
              View all {categoryTitle}
            </Link>
          </div>

          <div className="mt-12">
            {/* Slider like Home */}
 <div
  ref={relatedRef}
  className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 pr-10"
>
  {related.map((p) => (
    <Link
      key={p.slug}
      href={`/digital-art/${p.slug}`}
      className="group flex-none snap-start cursor-pointer"
      data-related-card="true"
    >
      <div className="w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px]">
        <div className="aspect-square overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
          <img
            src={p.images[0]}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] cursor-pointer"
          />
        </div>

        <div className="mt-6 text-center">
          <div className="text-sm font-light tracking-[0.08em]">
            {p.title}
          </div>

          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center justify-center rounded-2xl bg-[#3BDF00] px-6 py-4 text-xs text-white transition duration-300 hover:brightness-95 cursor-pointer">
              View work
            </span>
          </div>
        </div>
      </div>
    </Link>
  ))}
</div>
            {/* Buttons under, right */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => scrollRelated("left")}
                disabled={!relCanLeft}
                className={`w-10 h-10 rounded-full bg-white shadow ring-1 ring-black/5 transition ${
                  relCanLeft
                    ? "cursor-pointer hover:bg-gray-50"
                    : "opacity-40 cursor-not-allowed"
                }`}
                aria-label="Scroll left"
              >
                ‹
              </button>

              <button
                onClick={() => scrollRelated("right")}
                disabled={!relCanRight}
                className={`w-10 h-10 rounded-full bg-white shadow ring-1 ring-black/5 transition ${
                  relCanRight
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

      <Lightbox
        open={lightOpen}
        images={lightImages}
        index={lightIndex}
        onClose={() => setLightOpen(false)}
        onPrev={prev}
        onNext={next}
      />

      <div className="h-24" />
    </main>
  );
}