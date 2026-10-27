"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps children and reports when they are on screen, for the rotating platter:
 * - data-revealed becomes "true" the first time it scrolls into view (one-off fade/scale-in);
 * - data-inview follows visibility, so the endless rotation can pause while it is off screen.
 * Styling lives in globals.css (.dish-reveal / .dish-spin).
 */
export default function InViewReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`dish-reveal ${className}`} data-revealed={revealed} data-inview={inView}>
      {children}
    </div>
  );
}
