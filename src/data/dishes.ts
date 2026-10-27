import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Dish photographs for the rotating platter (src/components/RotatingDishSection.tsx).
 *
 * HOW TO ADD YOUR PHOTOS
 * 1. Put each photo in public/images/dishes/ using the file names below (dish-1.webp ... dish-6.webp).
 *    Transparent-background cut-outs (WebP or PNG) work best; keep them roughly square, 800-1200px.
 * 2. That's it: any file that exists is picked up automatically and arranged evenly around the platter.
 *    Slots whose file is missing are skipped once at least one photo exists, so the ring stays balanced.
 * 3. Need a different name, a PNG, or more dishes? Edit the list below (add or change entries).
 *    Set `alt` to describe the dish, or leave it empty to treat the photo as decoration.
 *
 * Until the first photo is added, empty plate placeholders are shown so the layout can be reviewed.
 */
export const DISH_DIRECTORY = "/images/dishes";

export type DishSlot = {
  /** File name inside public/images/dishes/ */
  file: string;
  /** Describes the dish for screen readers. Leave "" to mark the photo as decorative. */
  alt: string;
};

export const dishSlots: DishSlot[] = [
  { file: "dish-1.webp", alt: "" },
  { file: "dish-2.webp", alt: "" },
  { file: "dish-3.webp", alt: "" },
  { file: "dish-4.webp", alt: "" },
  { file: "dish-5.webp", alt: "" },
  { file: "dish-6.webp", alt: "" },
];

export type PlatterDish = {
  key: string;
  /** Public URL of the photo, or null for an empty placeholder plate. */
  src: string | null;
  alt: string;
};

/** Resolves the slots against the files that actually exist (runs on the server at build/render time). */
export function getPlatterDishes(): PlatterDish[] {
  const publicDir = path.join(process.cwd(), "public", DISH_DIRECTORY);
  const present = dishSlots.filter((slot) => existsSync(path.join(publicDir, slot.file)));

  if (present.length > 0) {
    return present.map((slot) => ({ key: slot.file, src: `${DISH_DIRECTORY}/${slot.file}`, alt: slot.alt }));
  }
  return dishSlots.map((slot) => ({ key: slot.file, src: null, alt: "" }));
}
