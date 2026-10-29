"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Fixed circular link to /products. Hidden on the Products pages themselves, where it would point
 * at the page the visitor is already on.
 */
export default function FloatingStarAniseLink({ src }: { src: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/products")) return null;

  return (
    <div
      className="star-fab fixed z-40 right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6"
    >
      <Link
        href="/products"
        aria-label="Explore our spices: view products"
        className="star-fab-link group relative block h-14 w-14 rounded-full border-2 border-turmeric bg-charcoal shadow-lift outline-none transition-[transform,box-shadow] duration-300 ease-premium hover:scale-105 hover:shadow-[0_0_0_4px_rgba(200,154,69,0.25),0_10px_28px_-6px_rgba(23,23,19,0.55)] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-turmeric sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <Image src={src} alt="" fill sizes="64px" quality={90} className="object-cover" />
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-turmeric/60 bg-charcoal px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-parchment opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          Explore our spices
        </span>
      </Link>
    </div>
  );
}
