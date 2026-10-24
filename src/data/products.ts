/**
 * RASAM Spices product catalogue.
 *
 * Every name, description and tagline comes from
 * `inventories/Rasam Catalog Print File.pdf`. Pack details come from the
 * brochure or from the pack photographs in `inventories/`.
 *
 * Rules for editing this file:
 * - Leave a field out when it has not been confirmed. Never guess.
 * - Images live in `public/images/products/`. A product with no `image`
 *   shows a clearly marked placeholder on the site.
 * - No prices, stock levels or ingredient lists are stored here.
 */

export type CategoryId = "ground-spices" | "blended-masalas" | "spices-seasonings";

export type Category = {
  id: CategoryId;
  name: string;
  /** Short neutral summary of what the category contains. */
  summary: string;
};

export type Product = {
  /** Stable ID, also used as the page anchor on /products. */
  id: string;
  name: string;
  category: CategoryId;
  /** Path under /public, only when an authentic pack photo exists. */
  image?: { src: string; alt: string };
  /** Brochure description (English). */
  description?: string;
  /** Brochure tagline. */
  tagline?: string;
  /** Only sizes confirmed by the brochure or the pack itself. */
  packSizes?: string[];
  /** Pack type shown in the brochure, when confirmed. */
  packFormat?: "Box" | "Pouch";
  /** Anything about this listing still waiting for client confirmation. */
  pendingNote?: string;
  /** Shown in the homepage "featured" section. */
  featured?: boolean;
};

export const categories: Category[] = [
  {
    id: "ground-spices",
    name: "Ground Spices",
    summary: "Single-spice powders for everyday Indian cooking.",
  },
  {
    id: "blended-masalas",
    name: "Blended Masalas",
    summary: "Ready spice blends for classic dishes from across India.",
  },
  {
    id: "spices-seasonings",
    name: "Individual Spices & Seasonings",
    summary: "Jeera, kasuri methi and pink salt.",
  },
];

const img = (file: string, name: string, format: "box" | "pouch") => ({
  src: `/images/products/${file}.webp`,
  alt: `RASAM ${name} ${format === "box" ? "box" : "pouch"} pack`,
});

export const products: Product[] = [
  // ---------------------------------------------------------------- Ground spices
  {
    id: "turmeric-powder",
    name: "Turmeric Powder",
    category: "ground-spices",
    image: img("turmeric-powder", "Turmeric Powder", "pouch"),
    packFormat: "Pouch",
    tagline: "Golden Colour. Earthy Flavour. Everyday Tradition.",
    description:
      "Give your everyday dishes a naturally vibrant golden colour with Rasam Turmeric Powder. A cherished ingredient in Indian kitchens, it adds earthy flavour and a distinctive warmth to dals, curries, vegetables, and countless traditional recipes.",
    featured: true,
  },
  {
    id: "red-chilli-powder",
    name: "Red Chilli Powder",
    category: "ground-spices",
    packFormat: "Pouch",
    tagline: "Bold Heat. Rich Colour. Authentic Flavour.",
    description:
      "Add bold colour and fiery flavour to your meals with Rasam Red Chilli Powder. An essential ingredient for Indian cooking, it enhances curries, sabzis, sauces, and marinades with a rich chilli character and satisfying heat.",
    pendingNote: "Individual pack photograph not yet supplied.",
  },
  {
    id: "coriander-powder",
    name: "Coriander Powder",
    category: "ground-spices",
    image: img("coriander-powder", "Coriander Powder", "pouch"),
    packFormat: "Pouch",
    tagline: "Pure Spice. Authentic Flavour. Everyday Tradition.",
    description:
      "Bring home the authentic taste of Indian kitchens with Rasam Coriander Powder. Made from whole coriander seeds, it delivers a naturally rich aroma and distinctive flavour to your everyday cooking. Perfect for curries, dals, gravies, and traditional Indian recipes, it adds warmth and depth to every dish.",
    featured: true,
  },
  {
    id: "pili-mirch-powder",
    name: "Pili Mirch Powder",
    category: "ground-spices",
    image: img("pili-mirch-powder", "Pili Mirch Powder", "pouch"),
    packFormat: "Pouch",
    tagline: "Vibrant Colour. Balanced Spice. Rich Flavour.",
    description:
      "Bring vibrant colour and a balanced chilli flavour to your favourite recipes with Rasam Pili Mirch Powder. Perfect for curries, gravies, marinades, and traditional preparations, it adds a beautiful golden-red hue and a delightful touch of spice.",
  },
  {
    id: "sonth-powder",
    name: "Sonth Powder",
    category: "ground-spices",
    image: img("sonth-powder", "Sonth Powder", "pouch"),
    packFormat: "Pouch",
    tagline: "Warming Aroma. Distinctive Taste. Traditional Goodness.",
    description:
      "Bring the distinctive warmth of dry ginger to your kitchen with Rasam Sonth Powder. Its aromatic, spicy notes make it a versatile addition to traditional recipes, spice blends, beverages, and selected sweet preparations.",
  },
  {
    id: "kashmiri-mirch",
    name: "Kashmiri Mirch",
    category: "ground-spices",
    image: img("kashmiri-mirch", "Kashmiri Mirch", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Vibrant Colour. Mild Heat. Rich Flavour.",
    description:
      "Add a beautiful red colour and a mild, flavourful touch to your dishes with Rasam Kashmiri Mirch Masala. Perfect for curries, gravies, and marinades, it enhances the appearance of your food while bringing a distinctive chilli flavour to every recipe.",
    featured: true,
  },
  {
    id: "hing-powder",
    name: "Hing Powder",
    category: "ground-spices",
    packSizes: ["25 g", "50 g", "100 g"],
    tagline: "Distinctive Aroma. Rich Flavour. Traditional Goodness.",
    description:
      "Enhance your everyday cooking with Hing Powder, known for its distinctive aroma and strong, savoury flavour. Just a pinch adds depth to dals, curries, vegetables, and traditional Indian dishes, making every meal more aromatic and delicious.",
    pendingNote:
      "The brochure lists “Hing Powder | Strong Hing Powder”. Shown as one listing until the company confirms whether these are separate products. Pack photograph not yet supplied.",
  },

  // ------------------------------------------------------------- Blended masalas
  {
    id: "garam-masala-powder",
    name: "Garam Masala Powder",
    category: "blended-masalas",
    image: img("garam-masala-powder", "Garam Masala Powder", "pouch"),
    packFormat: "Pouch",
    tagline: "Aromatic Spices. Rich Depth. Memorable Meals.",
    description:
      "Bring depth and aromatic richness to your cooking with Rasam Garam Masala. A flavourful blend of warming spices, it complements curries, dals, gravies, and vegetable dishes, adding a delicious finishing touch to everyday meals and special recipes.",
    featured: true,
  },
  {
    id: "pao-bhaji-masala",
    name: "Pao Bhaji Masala",
    category: "blended-masalas",
    image: img("pao-bhaji-masala", "Pao Bhaji Masala", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Street-Style Flavour. Rich Aroma. Mumbai Magic.",
    description:
      "Bring the vibrant taste of Mumbai street food to your kitchen with Rasam Pao Bhaji Masala. Its aromatic blend of spices adds rich flavour and a delightful tang to mashed vegetables, making every serving of pao bhaji delicious and satisfying.",
  },
  {
    id: "chole-masala",
    name: "Chole Masala",
    category: "blended-masalas",
    image: img("chole-masala", "Chole Masala", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Authentic Aroma. Rich Gravy. Classic Taste.",
    description:
      "Give your favourite chickpea dishes an authentic North Indian flavour with Rasam Chole Masala. Its aromatic spice blend adds richness and depth to chole, creating a delicious accompaniment for bhature, kulche, and everyday meals.",
    featured: true,
  },
  {
    id: "biryani-masala",
    name: "Biryani Masala",
    category: "blended-masalas",
    image: img("biryani-masala", "Biryani Masala", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Fragrant Spices. Rich Aroma. Royal Taste.",
    description:
      "Create a memorable biryani experience with Rasam Biryani Masala. A fragrant blend of spices that brings warmth, aroma, and delicious depth to every layer of rice and vegetables or meat, making your special meals truly satisfying.",
  },
  {
    id: "kitchen-king",
    name: "Kitchen King",
    category: "blended-masalas",
    image: img("kitchen-king", "Kitchen King", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "One Blend. Endless Dishes. Delicious Flavour.",
    description:
      "Bring versatility and rich flavour to your everyday cooking with Rasam Kitchen King Masala. A delightful blend for a variety of Indian dishes, it enhances the taste of vegetable curries, gravies, paneer, and everyday sabzis with its inviting aroma.",
  },
  {
    id: "shahi-paneer-masala",
    name: "Shahi Paneer Masala",
    category: "blended-masalas",
    image: img("shahi-paneer-masala", "Shahi Paneer Masala", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Royal Aroma. Creamy Goodness. Shahi Taste.",
    description:
      "Prepare a restaurant-style favourite at home with Rasam Shahi Paneer Masala. Its rich aroma and carefully balanced spices complement creamy gravies and soft paneer, helping you create a delicious dish for family meals and special occasions.",
  },
  {
    id: "sambar-masala",
    name: "Sambar Masala",
    category: "blended-masalas",
    image: img("sambar-masala", "Sambar Masala", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Authentic Aroma. Traditional Taste. South Indian Delight.",
    description:
      "Bring home the authentic taste of South Indian cuisine with Rasam Sambar Masala. Its aromatic blend of spices adds depth and a delicious flavour to lentils and vegetables, making sambar the perfect accompaniment to idli, dosa, rice, and everyday meals.",
    featured: true,
  },
  {
    id: "chaat-masala",
    name: "Chaat Masala",
    category: "blended-masalas",
    image: img("chaat-masala", "Chaat Masala", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Tangy Twist. Zesty Flavour. Instant Delight.",
    description:
      "Add a tangy, savoury twist to your favourite snacks with Rasam Chaat Masala. Perfect for fruit chaat, salads, pakoras, chaats, and everyday treats, it brings a delightful burst of flavour to every bite.",
  },
  {
    id: "paneer-masala",
    name: "Paneer Masala",
    category: "blended-masalas",
    image: img("paneer-masala", "Paneer Masala", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Rich Aroma. Perfectly Spiced. Paneer Perfection.",
    description:
      "Give your paneer dishes a delicious boost with Rasam Paneer Masala. Its aromatic spices complement the soft texture of paneer and add a rich, savoury flavour to paneer curries, gravies, and your favourite homemade recipes.",
  },

  // ------------------------------------------- Individual spices & seasonings
  {
    id: "jeera",
    name: "Jeera",
    category: "spices-seasonings",
    tagline: "Earthy Aroma. Authentic Taste. Everyday Goodness.",
    description:
      "Bring out the authentic taste of Indian cooking with Jeera. Known for its warm aroma and distinctive earthy flavour, cumin adds a delicious touch to curries, dals, vegetables, rice, and everyday dishes, making every meal more flavourful.",
    pendingNote: "Pack photograph and pack format not yet confirmed.",
  },
  {
    id: "kasuri-methi",
    name: "Kasuri Methi",
    category: "spices-seasonings",
    image: img("kasuri-methi", "Kasuri Methi", "box"),
    packFormat: "Box",
    packSizes: ["100 g"],
    tagline: "Rich Aroma. Distinctive Flavour. Indian Tradition.",
    description:
      "Add a touch of authentic Indian flavour to your dishes with Kasuri Methi. Made from dried fenugreek leaves, it brings a distinctive aroma and rich, earthy taste to curries, dals, vegetables, and gravies, making every meal more flavourful.",
  },
  {
    id: "pink-salt",
    name: "Pink Salt",
    category: "spices-seasonings",
    image: img("pink-salt", "Pink Salt", "pouch"),
    packFormat: "Pouch",
    pendingNote:
      "Product description awaiting confirmation (the brochure page repeats the Turmeric Powder text).",
  },
];

export function getProductsByCategory(categoryId: CategoryId): Product[] {
  return products.filter((product) => product.category === categoryId);
}

export function getCategory(categoryId: CategoryId): Category {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) throw new Error(`Unknown category: ${categoryId}`);
  return category;
}

export const featuredProducts = products.filter((product) => product.featured);
