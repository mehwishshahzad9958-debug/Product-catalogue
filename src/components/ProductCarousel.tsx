"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

type ProductCarouselProps = {
  /** A catalogue category, or any group (e.g. "featured") that has a matching #id on the page. */
  category: { id: string; name: string; summary?: string };
  products: Product[];
};

export default function ProductCarousel({ category, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(products.length > 3);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    // 2px margin for fractional pixel differences across browser zoom levels
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState, products]);

  // Where the last arrow click is sending the track, so quick repeat clicks build on that target
  // instead of on the half-finished position (which made the movement stop-start).
  const targetRef = useRef<{ left: number; at: number } | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.children;
    if (cards.length < 2) return;

    // Every click lands exactly on a card (a CSS snap position), so the browser's smooth scroll and the
    // scroll snapping agree and nothing has to "settle" afterwards.
    const pitch = (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
    const maxLeft = el.scrollWidth - el.clientWidth;
    const inFlight = targetRef.current !== null && performance.now() - targetRef.current.at < 800;
    const from = inFlight ? targetRef.current!.left : el.scrollLeft;
    const visible = Math.max(1, Math.floor(el.clientWidth / pitch));
    const step = Math.max(1, visible - 1); // keep one card of context; one card at a time on phones
    const index = Math.round(from / pitch) + (direction === "left" ? -step : step);
    const target = Math.min(Math.max(index, 0), cards.length - 1) * pitch;
    const left = Math.min(target, maxLeft);
    if (Math.abs(left - el.scrollLeft) < 1) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    targetRef.current = { left, at: performance.now() };
    el.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Category header with title, summary, view all link, and scroll arrows */}
      <div className="flex flex-col gap-4 border-b border-turmeric/40 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-serif text-3xl font-semibold text-earth transition-colors hover:text-spice sm:text-4xl">
            <Link
              href={`/products#${category.id}`}
              className="focus-visible:rounded-md focus-visible:outline-spice"
            >
              {category.name}
            </Link>
          </h3>
          {category.summary && (
            <p className="mt-1.5 text-sm text-earth-muted sm:text-base">{category.summary}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 shrink-0 sm:justify-end">
          <Link
            href={`/products#${category.id}`}
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-spice underline decoration-spice/30 underline-offset-4 transition-colors hover:text-spice-dark hover:decoration-spice focus-visible:rounded-md focus-visible:outline-spice"
          >
            <span>View all ({products.length})</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>

          <div className="flex items-center gap-2 border-l border-turmeric/40 pl-3">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              aria-label={`Previous ${category.name} products`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-turmeric/60 bg-ivory text-earth shadow-xs transition-colors hover:border-spice hover:bg-ivory-deep hover:text-spice disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-spice"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              aria-label={`Next ${category.name} products`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-turmeric/60 bg-ivory text-earth shadow-xs transition-colors hover:border-spice hover:bg-ivory-deep hover:text-spice disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-spice"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Row */}
      <div className="relative">
        {/* Floating left arrow on desktop */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label={`Scroll ${category.name} backward`}
            className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-turmeric/60 bg-ivory p-2.5 text-earth shadow-md transition-all hover:scale-105 hover:border-spice hover:text-spice md:inline-flex focus-visible:outline-spice"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label={`${category.name} products carousel`}
          className="no-scrollbar -mx-2 flex gap-5 overflow-x-auto overscroll-x-contain scroll-px-2 px-2 py-3 snap-x snap-mandatory focus:outline-none focus-visible:ring-2 focus-visible:ring-spice/50 rounded-xl"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex w-[230px] shrink-0 snap-start sm:w-[250px] md:w-[270px]"
            >
              <ProductCard product={product} variant="carousel" />
            </div>
          ))}
        </div>

        {/* Floating right arrow on desktop */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label={`Scroll ${category.name} forward`}
            className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-turmeric/60 bg-ivory p-2.5 text-earth shadow-md transition-all hover:scale-105 hover:border-spice hover:text-spice md:inline-flex focus-visible:outline-spice"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
