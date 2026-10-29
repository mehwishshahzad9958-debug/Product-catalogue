import Image from "next/image";
import type { Product } from "@/data/products";

type ProductImageProps = {
  product: Product;
  /** Which face of the pack to show. Defaults to the front. */
  side?: "front" | "back";
  /** Tells the browser how wide the image is drawn, so it can pick a smaller file. */
  sizes: string;
  className?: string;
  /** Set when the image sits on a dark surface, so the placeholder text stays readable. */
  onDark?: boolean;
};

/**
 * Shows an authentic pack photo inside a fixed 4:5 frame, or a clearly
 * marked placeholder when no photo has been supplied yet. The fixed frame
 * means a real photo can replace the placeholder without moving the layout.
 * `object-contain` keeps the whole pack visible: nothing is cropped away.
 */
export default function ProductImage({
  product,
  side = "front",
  sizes,
  className = "",
  onDark = false,
}: ProductImageProps) {
  const photo = side === "back" ? product.backImage : product.image;

  return (
    <div className={`relative aspect-[4/5] w-full ${className}`}>
      {photo ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} quality={90} className="object-contain" />
      ) : (
        <div className={`absolute inset-[12%] flex flex-col items-center justify-center gap-2 rounded-md border border-dashed text-center ${
            onDark ? "border-turmeric/40" : "border-earth/30"
          }`}>
          <span className={`text-sm font-medium ${onDark ? "text-parchment/80" : "text-earth-muted"}`}>[Product Image]</span>
          <span className={`px-3 text-xs ${onDark ? "text-parchment/60" : "text-earth-muted"}`}>
            Photo of {product.name} to be added
          </span>
        </div>
      )}
    </div>
  );
}
