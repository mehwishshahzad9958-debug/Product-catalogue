import DishDiscovery, { type DishStageItem } from "@/components/DishDiscovery";
import { dishes } from "@/data/dishes";
import { getProduct } from "@/data/products";

/**
 * Interactive dish platter, between the hero and "Our range".
 *
 * Server component: it pairs every dish in src/data/dishes.ts with its real product from
 * src/data/products.ts, then hands plain data to the client component that handles the interaction.
 * A dish whose product ID is not found gets `product: null` (the panel says so; nothing is invented).
 */
export default function RotatingDishSection() {
  const items: DishStageItem[] = dishes.map((dish) => ({
    dish,
    product: getProduct(dish.productId) ?? null,
  }));

  return <DishDiscovery items={items} />;
}
