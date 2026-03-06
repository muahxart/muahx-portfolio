"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { projects, categories, CategoryKey, digitalArtPage } from "../../data/projects";




export default function DigitalArtPage() {
  const PAGE_SIZE = 8;

  const categoriesList = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique] as const;
  }, []);

  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  

useEffect(() => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");

  if (cat) {
    setActive(cat);
  }
}, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active);

    return [...list].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [active]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [active]);

  const visibleProjects = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

const title =
  active === "All"
    ? digitalArtPage.title
    : categories[active as CategoryKey]?.title ?? active;

const description =
  active === "All"
    ? digitalArtPage.description
    : categories[active as CategoryKey]?.description ?? null;

  return (
    <main className="w-full pt-6">
      {/* HERO */}
      <div className="w-full h-[220px] md:h-[300px] overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Hero banner"
          className="w-full h-full object-cover"
        />
      </div>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        {/* TITLE */}
        <div className="text-center mb-16">
          <h1
            className={`text-6xl md:text-8xl font-extralight tracking-[-0.02em] transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            {title}
          </h1>

          {/* CATEGORY DESCRIPTION */}
          {description && (
            <p className="max-w-2xl mx-auto mt-6 text-base text-black leading-relaxed">
              {description}
            </p>
          )}

          <p className="text-sm md:text-base text-black mt-8">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* CATEGORIES */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categoriesList.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`cursor-pointer rounded-[24px] border px-6 py-2 text-sm transition duration-300 ${
                  active === c
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black border-gray-300 hover:border-black"
                }`}
              >
              {c === "All" ? "All" : categories[c as CategoryKey]?.title}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {visibleProjects.map((p) => (
            <Link
              key={p.slug}
              href={`/digital-art/${p.slug}`}
              className="group min-w-0"
            >
              <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-[260px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
            </Link>
          ))}
        </div>

        {/* LOAD MORE */}
        {canLoadMore && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-2xl border border-black px-12 py-4 text-sm text-black hover:bg-black hover:text-white hover:border-black transition duration-300"
            >
              More works
            </button>
          </div>
        )}
      </section>

      <div className="h-24" />
    </main>
  );
}