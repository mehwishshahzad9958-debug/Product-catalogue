"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/data/productHeroSlides";

const INTERVAL_MS = 4000;

/**
 * Auto-advancing image slider with a fade transition and pagination dots.
 * - Advances every 4 seconds; pauses while the pointer is over it or focus is inside it.
 * - With `prefers-reduced-motion` it does not auto-advance or fade; the dots still work.
 * - Slides are stacked and cross-fade, so the frame never changes size.
 */
type ProductHeroSliderProps = {
  slides: HeroSlide[];
  /** Tailwind aspect-ratio classes for the frame (responsive). */
  aspectClassName?: string;
};

export default function ProductHeroSlider({
  slides,
  aspectClassName = "aspect-[4/3] sm:aspect-[5/4]",
}: ProductHeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const count = slides.length;
  const paused = hovered || focused;
  const autoplay = count > 1 && !paused && !reducedMotion;

  // Follow the visitor's reduced-motion setting, including changes while the page is open.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // One timer per slide; picking a dot restarts the 4 seconds. Cleared on unmount.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, index, count]);

  if (count === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="RASAM Spices product gallery"
      className={`relative w-full overflow-hidden rounded-2xl border border-turmeric/60 bg-ivory-deep/50 ${aspectClassName}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {/* Slides (screen readers are told about changes only when the slider is not auto-rotating) */}
      <div aria-live={autoplay ? "off" : "polite"} className="absolute inset-0">
        {slides.map((slide, i) => {
          const active = i === index;
          const single = slide.images.length === 1;
          const fit = slide.fit ?? "contain";
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${slide.label}`}
              aria-hidden={!active}
              className={`absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                single && fit === "contain" ? "p-6" : single ? "" : "px-6 pb-12 pt-6 sm:gap-6"
              } ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              {slide.images.map((image) => (
                <div key={image.src} className={`relative h-full ${single ? "w-full" : "min-w-0 flex-1"}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    className={fit === "cover" ? "object-cover" : "object-contain"}
                    style={fit === "cover" ? { objectPosition: slide.objectPosition } : undefined}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Pagination dots */}
      {count > 1 && (
        <div
          role="group"
          aria-label="Choose a slide"
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-ivory/85 px-1.5 py-0.5"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1} of ${count}: ${slide.label}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-green"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                  i === index ? "w-5 bg-green" : "w-2 bg-turmeric/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
