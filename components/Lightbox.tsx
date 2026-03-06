"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  open,
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: Props) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  const src = images[index];

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-label="Close"
      />

      {/* content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full max-w-5xl">
          {/* image */}
          <div className="overflow-hidden rounded-[24px] bg-black">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
          </div>

          {/* close */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white text-sm hover:opacity-80"
          >
            Close ✕
          </button>

          {/* arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Previous"
          >
            ‹
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}