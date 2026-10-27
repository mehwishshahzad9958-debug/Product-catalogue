import { getProduct } from "@/data/products";

/**
 * Slides for the Products page hero slider (src/components/ProductHeroSlider.tsx).
 *
 * HOW TO ADD YOUR OWN IMAGES LATER
 * 1. Put the file in `public/images/` (for example `public/images/hero-slide-masala.webp`).
 *    WebP or a compressed JPG under ~300 KB is ideal; the site resizes it automatically.
 * 2. Add an entry to `heroSlides` below:
 *      {
 *        id: "masala-lifestyle",
 *        label: "Blended masalas",            // short name, used by the pagination dots
 *        images: [{ src: "/images/hero-slide-masala.webp", alt: "Describe what the photo shows" }],
 *        fit: "cover",                          // "cover" for wide photos, "contain" for packs and cut-outs
 *        objectPosition: "75% center",          // optional: which part to keep when "cover" crops
 *      }
 * 3. List 2 or 3 images in `images` to show them side by side (pack shots).
 * Slides appear in the order listed. Every path must exist in `public/`.
 */

export type HeroSlideImage = { src: string; alt: string };

export type HeroSlide = {
  id: string;
  /** Short name for the pagination dot and screen readers. */
  label: string;
  /** One image fills the frame; 2–3 are shown side by side. */
  images: HeroSlideImage[];
  /** "contain" never crops (use for packs and cut-outs). "cover" suits wide photographs. */
  fit?: "contain" | "cover";
  /** CSS object-position, only used with fit "cover". */
  objectPosition?: string;
};

/** Front-pack photos for the given product IDs. Products without a photo are skipped. */
function packs(ids: string[]): HeroSlideImage[] {
  return ids.flatMap((id) => {
    const photo = getProduct(id)?.image;
    return photo ? [photo] : [];
  });
}

const allSlides: HeroSlide[] = [
  {
    id: "spice-bowls",
    label: "Whole and ground spices",
    images: [
      {
        src: "/images/hero-spices.png",
        alt: "Wooden bowls of turmeric, red chilli powder, peppercorns and coriander seeds with cinnamon, star anise and dried chillies",
      },
    ],
    fit: "cover",
    objectPosition: "78% center",
  },
  {
    id: "collection",
    label: "The RASAM range",
    images: [
      { src: "/images/home-hero.webp", alt: "RASAM spice pouches and boxes arranged with fresh spices" },
    ],
    fit: "contain",
  },
  {
    id: "ground-spices",
    label: "Ground spices",
    images: packs(["turmeric-powder", "coriander-powder", "pili-mirch-powder"]),
    fit: "contain",
  },
  {
    id: "blended-masalas",
    label: "Blended masalas",
    images: packs(["garam-masala-powder", "pao-bhaji-masala", "chole-masala"]),
    fit: "contain",
  },
  {
    id: "seasonings",
    label: "Seasonings",
    images: packs(["kashmiri-mirch", "kasuri-methi", "pink-salt"]),
    fit: "contain",
  },
];

/** A slide whose images are all missing is dropped rather than shown empty. */
export const heroSlides: HeroSlide[] = allSlides.filter((slide) => slide.images.length > 0);
