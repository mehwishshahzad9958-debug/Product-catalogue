import Image from "next/image";

/**
 * Decorative spice-photo background layer. Place it as the FIRST child of a `relative isolate`
 * container; the content that follows sits above it automatically (the layer is z-index -1).
 *
 * It is absolutely positioned, so it never affects layout, and it is hidden from assistive tech.
 * The photo itself is translucent (opacity on the image layer only, never on the content) so it
 * tints the warm ivory base; `.spice-overlay` in globals.css adds soft edge fades.
 *
 * Photo: supplied by the site owner, stored locally at public/images/spice-background.jpg and
 * optimised by next/image.
 */
export default function SpiceBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#F7EBD4]">
      <Image
        src="/images/spice-background.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={80}
        // The photo is portrait and this layer is a tall column, so `cover` keeps it unstretched.
        // Centred on mobile; on desktop slightly above centre to keep turmeric and star anise in view.
        className="object-cover object-center opacity-[0.22] md:object-[50%_40%]"
      />
      <div className="spice-overlay absolute inset-0" />
    </div>
  );
}
