"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Animated product-collection visual for the home hero.
 *
 * Inspired by the reference (Dribbble "Modern perfume website with hero animation"): the product
 * starts small and slightly low, then is pushed in toward the viewer and settles with soft easing,
 * while a glow and a ground shadow give it depth. After it settles it floats very gently.
 * home-hero.webp is one flattened picture, so it is animated as a single cohesive image; nothing is
 * duplicated or invented, and it is not pretending to be 3D.
 *
 * Interaction (desktop with a mouse only): a tiny pointer parallax, with the glow, shadow and
 * product moving by different amounts, plus a small scroll drift. On touch screens the pointer part
 * is skipped and the scroll drift is halved. Reduced-motion visitors get the finished picture, still.
 *
 * All motion is transform/opacity driven from CSS (see .hero-* in globals.css); this component only
 * writes three CSS variables (--hero-px, --hero-py, --hero-sy) and does no layout work.
 */
export default function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const card = root.closest<HTMLElement>("[data-hero-card]") ?? root;
    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      // 0 when the hero is fully in view, up to 1 as it scrolls out of the top of the screen
      const sy = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1))) * (finePointer ? 1 : 0.5);
      root.style.setProperty("--hero-px", px.toFixed(3));
      root.style.setProperty("--hero-py", py.toFixed(3));
      root.style.setProperty("--hero-sy", sy.toFixed(3));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      schedule();
    };

    // The scroll drift and the endless float only matter while the hero is on screen: outside it the scroll
    // listener is removed (no getBoundingClientRect on every scroll frame) and the float animations pause.
    let listening = false;
    const setLive = (live: boolean) => {
      root.dataset.heroLive = String(live);
      if (live && !listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        listening = true;
        schedule();
      } else if (!live && listening) {
        window.removeEventListener("scroll", schedule);
        listening = false;
      }
    };
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { rootMargin: "100px 0px" });
    observer.observe(card);

    if (finePointer) {
      card.addEventListener("pointermove", onMove, { passive: true });
      card.addEventListener("pointerleave", onLeave);
    }
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-[680px]">
      <div className="relative mt-[4%] aspect-[1679/1318] w-full">
        {/* Soft saffron glow behind the products */}
        <div className="hero-par pointer-events-none absolute inset-[-8%]" style={{ "--par": "-14px", "--drift": "10px" } as React.CSSProperties}>
          <div className="hero-glow-in h-full w-full rounded-full" />
        </div>

        {/* Ground shadow under the products */}
        <div className="hero-par pointer-events-none absolute inset-x-[14%] bottom-[1%] h-[9%]" style={{ "--par": "8px", "--drift": "20px" } as React.CSSProperties}>
          <div className="hero-shadow h-full w-full rounded-[50%]" />
        </div>

        {/* The product collection: parallax > dolly-in > float > image */}
        <div className="hero-par absolute inset-0" style={{ "--par": "10px", "--drift": "28px" } as React.CSSProperties}>
          <div className="hero-product-in h-full w-full">
            <div className="hero-float relative h-full w-full">
              <Image
                src="/images/home-hero.webp"
                alt="RASAM spices product collection"
                fill
                priority
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
