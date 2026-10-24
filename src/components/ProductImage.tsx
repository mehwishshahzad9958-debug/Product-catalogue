import Image from "next/image";
import type { Product } from "@/data/products";

type ProductImageProps = {
  product: Product;
  /** Tells the browser how wide the image is drawn, so it can pick a smaller file. */
  sizes: string;
  className?: string;
};

/**
 * Shows the authentic pack photo inside a fixed 4:5 frame, or a clearly
 * marked placeholder when no photo has been supplied yet. The fixed frame
 * means a real photo can replace the placeholder without moving the layout.
 */
export default function ProductImage({ product, sizes, className = "" }: ProductImageProps) {
  return (
    <div className={`relative aspect-[4/5] w-full ${className}`}>
      {product.image ? (
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={sizes}
          className="object-contain"
        />
      ) : (
        <div className="absolute inset-[12%] flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-earth/30 text-center">
          <span className="text-sm font-medium text-earth-muted">[Product Image]</span>
          <span className="px-3 text-xs text-earth-muted">
            Photo of {product.name} to be added
          </span>
        </div>
      )}
    </div>
  );
}
