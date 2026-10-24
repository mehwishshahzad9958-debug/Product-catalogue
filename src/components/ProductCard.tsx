import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { getCategory, type Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  /** "compact" for the homepage, "detailed" for the catalogue. */
  variant?: "compact" | "detailed";
};

export default function ProductCard({ product, variant = "compact" }: ProductCardProps) {
  const detailed = variant === "detailed";
  const sizes = product.packSizes?.join(", ");
  const format = product.packFormat?.toLowerCase();
  // e.g. "100 g box", "25 g, 50 g, 100 g" or "Pouch"
  const packLine =
    sizes && format ? `${sizes} ${format}` : sizes ?? product.packFormat ?? "";

  return (
    <article
      id={detailed ? product.id : undefined}
      className="flex h-full flex-col rounded-lg border border-earth/10 bg-ivory"
    >
      <div className="rounded-t-lg bg-ivory-deep px-6 pt-6">
        <ProductImage
          product={product}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {!detailed && (
          <p className="text-sm text-earth-muted">{getCategory(product.category).name}</p>
        )}

        <h3 className="mt-1 font-serif text-2xl text-earth">{product.name}</h3>

        {product.tagline && (
          <p className="mt-2 text-sm font-medium text-spice">{product.tagline}</p>
        )}

        {detailed && product.description && (
          <p className="mt-4 text-[15px] leading-7 text-earth-muted">{product.description}</p>
        )}

        {detailed && packLine && (
          <p className="mt-4 text-sm text-earth">
            <span className="font-semibold">Pack: </span>
            {packLine}
          </p>
        )}

        {detailed && product.pendingNote && (
          <p className="mt-4 rounded-md bg-ivory-deep px-3 py-2 text-sm leading-6 text-earth-muted">
            <span className="font-semibold text-earth">To be confirmed: </span>
            {product.pendingNote}
          </p>
        )}

        <div className="mt-auto flex flex-col items-start gap-3 pt-6">
          <Link
            href={`/products/${product.id}`}
            className="text-sm font-semibold text-spice underline decoration-spice/30 underline-offset-4 hover:decoration-spice"
          >
            {product.backImage
              ? `View front and back packaging of ${product.name}`
              : `View ${product.name}`}
          </Link>
          {detailed && (
            <Link
              href="/contact"
              className="text-sm font-semibold text-earth-muted underline decoration-earth/20 underline-offset-4 hover:text-spice hover:decoration-spice"
            >
              Enquire about {product.name}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
