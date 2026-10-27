import Image from "next/image";

/**
 * Decorative spice-photo background layer. Place it as the FIRST child of a `relative` container
 * with `overflow-hidden`; content goes in a later sibling with `relative z-10`.
 *
 * It is absolutely positioned, so it never affects layout, and it is hidden from assistive tech.
 * The warm ivory overlay (see `.spice-overlay*` in globals.css) keeps text readable.
 *
 * Photo: Marion Botella on Unsplash (https://unsplash.com/photos/uaHShoIDGeo).
 * Original kept untouched at public/images/backgrounds/spices-bg.jpg;
 * this component uses the 2400px WebP optimised from it.
 */
export default function SpiceBackdrop({ variant = "hero" }: { variant?: "hero" | "intro" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#F7EBD4]">
      <div className="spice-fade absolute inset-0">
        <Image
          src="/images/backgrounds/spices-bg.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1536px) 1480px, 100vw"
          loading="eager"
          fetchPriority="high"
          // Portrait photo in a wide frame: keep the full vertical composition centred on mobile,
          // and on larger screens crop to the turmeric / star-anise middle of the picture.
          className="object-cover object-center brightness-[1.06] saturate-[1.05] md:object-[50%_38%]"
        />
      </div>
      <div className={variant === "hero" ? "spice-overlay absolute inset-0" : "spice-overlay-intro absolute inset-0"} />
    </div>
  );
}