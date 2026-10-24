import ProductImage from "@/components/ProductImage";
import type { Product } from "@/data/products";

/**
 * Front packaging first, then the genuine back packaging directly below it
 * (only when a back photo exists). Each image is labelled so visitors can
 * scroll down and inspect both sides.
 */
export default function PackagingGallery({ product }: { product: Product }) {
  const sides = product.backImage ? (["front", "back"] as const) : (["front"] as const);

  return (
    <div className="flex flex-col gap-6">
      {sides.map((side) => (
        <figure key={side} className="rounded-lg bg-ivory-deep p-4 sm:p-6">
          <ProductImage
            product={product}
            side={side}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 80vw, 100vw"
          />
          {/* Only label real photos; the placeholder carries its own label. */}
          {(side === "back" || product.image) && (
            <figcaption className="mt-4 text-center text-sm font-semibold text-earth">
              {side === "front" ? "Front packaging" : "Back packaging"}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
