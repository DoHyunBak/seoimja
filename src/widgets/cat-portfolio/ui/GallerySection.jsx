import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import MotionSection from "./MotionSection";

function Lightbox({ items, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const item = items[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
        onClick={onClose}
        aria-label="닫기"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      {items.length > 1 && (
        <button
          className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="이전 사진"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <div
        className="mx-16 flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
        />
        <div className="text-center">
          <p className="text-base font-black text-white">{item.title}</p>
          <p className="mt-1 text-sm text-white/70">{item.caption}</p>
        </div>
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="다음 사진"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/50">
        {index + 1} / {items.length}
      </p>
    </div>
  );
}

export default function GallerySection({ gallery }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <MotionSection
        id="cat-gallery"
        kicker="Gallery"
        title="사진 아카이브"
        description="찍히기 싫다고 했지만 다 찍혔어요."
        className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 lg:px-10"
      >
        <div className="grid grid-flow-dense auto-rows-[220px] gap-4 sm:auto-rows-[240px] sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4">
          {gallery.map((item, idx) => (
            <figure
              key={item.id}
              tabIndex={0}
              role="button"
              aria-label={`${item.title} 사진 확대`}
              onClick={() => setLightboxIndex(idx)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setLightboxIndex(idx)}
              className={`group relative cursor-zoom-in overflow-hidden rounded-[28px] bg-[#e8e2da] shadow-[0_20px_50px_rgba(71,61,52,0.14)] outline-none ring-[#bda895]/45 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(71,61,52,0.18)] focus:ring-4 ${
                item.featured ? "sm:col-span-2 sm:row-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2" : ""
              }`}
            >
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211813]/80 via-[#211813]/16 to-transparent opacity-65 transition group-hover:opacity-90 group-focus:opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/18 backdrop-blur">
                  <Camera className="h-4 w-4" />
                </div>
                <p className="text-lg font-black">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-white/82">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </MotionSection>

      {lightboxIndex !== null && (
        <Lightbox
          items={gallery}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
