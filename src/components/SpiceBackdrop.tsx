import Image from "next/image";

type SpiceBackdropProps = {
  /** "light": translucent photo over warm ivory. "dark": photo sunk into charcoal. */
  tone?: "light" | "dark";
};

/**
 * Decorative spice-photo background layer. Place it as the FIRST child of a `relative isolate`
 * container; the content that follows sits above it automatically (the layer is z-index -1).
 *
 * It is absolutely positioned, so it never affects layout, and it is hidden from assistive tech.
 * The photo is translucent (opacity on the image layer only, never on the content).
 *
 * Photo: supplied by the site owner, stored locally at public/images/spice-background.jpg and
 * optimised by next/image.
 */
export default function SpiceBackdrop({ tone = "light" }: SpiceBackdropProps) {
  const dark = tone === "dark";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${dark ? "bg-charcoal" : "bg-parchment"}`}
    >
      <Image
        src="/images/spice-background.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={75}
        // The photo is portrait and these layers are wide, so `cover` keeps it unstretched.
        className={`object-cover object-center ${dark ? "opacity-[0.22]" : "opacity-[0.12]"}`}
      />
      <div className={dark ? "spice-overlay-dark absolute inset-0" : "spice-overlay absolute inset-0"} />
    </div>
  );
}
