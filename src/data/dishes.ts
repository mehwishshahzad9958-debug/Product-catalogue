/**
 * Dishes for the interactive platter (src/components/RotatingDishSection.tsx) and the RASAM masala each
 * one is paired with. This is the ONLY place where dish photos and product IDs are listed.
 *
 * The ORDER below is the clockwise order on the platter (starting at the top) AND the order of the
 * previous / next arrows (they wrap around).
 *
 * - `src`     photo in public/images/dishes/ (originals are never modified; crops are done with CSS).
 * - `focus`   CSS object-position: the part of the photo kept in the middle of the slice / plate.
 * - `zoom`    optional >1 scale that crops away dark pan rims or light edges baked into a photo.
 * - `productId` must match an `id` in src/data/products.ts.
 */
export const DISH_SLICE_COUNT = 6;

export type DishEntry = {
  id: string;
  /** Name shown to visitors and used in accessible labels. */
  name: string;
  src: string;
  alt: string;
  focus?: string;
  zoom?: number;
  /** ID of the matching product in src/data/products.ts. */
  productId: string;
};

export const dishes: readonly DishEntry[] = [
  {
    id: "biryani",
    name: "Biryani",
    src: "/images/dishes/Biryani.png",
    alt: "Chicken biryani with saffron rice",
    focus: "50% 50%",
    productId: "biryani-masala",
  },
  {
    id: "shahi-paneer",
    name: "Shahi Paneer",
    src: "/images/dishes/Shahi Paneer (2).png",
    alt: "Shahi paneer in a creamy tomato gravy",
    focus: "50% 50%",
    zoom: 1.2,
    productId: "shahi-paneer-masala",
  },
  {
    id: "paneer-masala",
    name: "Paneer Masala with rice",
    src: "/images/dishes/Paneer.png",
    alt: "Paneer masala with rice in a black pan",
    focus: "50% 58%",
    zoom: 1.3,
    productId: "paneer-masala",
  },
  {
    id: "chole",
    name: "Chole",
    src: "/images/dishes/Chole.png",
    alt: "Chole, chickpea curry garnished with coriander",
    focus: "50% 50%",
    productId: "chole-masala",
  },
  {
    id: "sambar",
    name: "Sambar",
    src: "/images/dishes/Sambhar.png",
    alt: "Sambar with drumstick and vegetables",
    focus: "50% 50%",
    productId: "sambar-masala",
  },
  {
    id: "fruit-chaat",
    name: "Fruit Chaat",
    src: "/images/dishes/Fruit Chart.png",
    alt: "Fruit chaat with banana, mango and pomegranate",
    focus: "50% 50%",
    zoom: 1.12,
    productId: "chaat-masala",
  },
];
