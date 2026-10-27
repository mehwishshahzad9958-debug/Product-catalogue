import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { getCategory, type Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  /** "compact" for standard cards, "detailed" for the catalogue, "carousel" for horizontal carousels. */
  variant?: "compact" | "detailed" | "carousel";
  className?: string;
};

export default function ProductCard({
  product,
  variant = "compact",
  className = "",
}: ProductCardProps) {
  const detailed = variant === "detailed";
  const sizes = product.packSizes?.join(", ");
  const format = product.packFormat?.toLowerCase();
  // e.g. "100 g box", "25 g, 50 g, 100 g" or "Pouch"
  const packLine =
    sizes && format ? `${sizes} ${format}` : sizes ?? product.packFormat ?? "";

  if (variant === "carousel") {
    return (
      <article
        className={`group flex h-full w-full flex-col rounded-xl border border-turmeric/40 bg-ivory-deep shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-turmeric hover:shadow-md ${className}`}
      >
        <Link
          href={`/products/${product.id}`}
          className="flex h-full flex-col focus-visible:rounded-xl focus-visible:outline-spice"
          aria-label={`View details for ${product.name}`}
        >
          <div className="flex w-full items-center justify-center overflow-hidden rounded-t-xl bg-ivory/70 p-5 transition-colors group-hover:bg-ivory/90">
            <ProductImage
              product={product}
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 230px"
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            {packLine && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-earth-muted/80">
                {packLine}
              </span>
            )}

            <h4 className="mt-1 font-serif text-xl font-medium text-earth transition-colors group-hover:text-spice line-clamp-1">
              {product.name}
            </h4>

            {product.tagline ? (
              <p className="mt-1.5 text-xs font-medium text-spice line-clamp-2 sm:text-sm">
                {product.tagline}
              </p>
            ) : product.description ? (
              <p className="mt-1.5 text-xs text-earth-muted line-clamp-2 sm:text-sm">
                {product.description}
              </p>
            ) : null}

            <div className="mt-auto flex items-center justify-between border-t border-turmeric/30 pt-4 text-xs font-semibold text-spice">
              <span className="underline decoration-spice/30 underline-offset-4 group-hover:decoration-spice">
                {product.backImage ? "View packaging" : "View product"}
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      id={detailed ? product.id : undefined}
      className={`flex h-full flex-col rounded-lg border border-turmeric/40 bg-ivory-deep ${className}`}
    >
      <div className="rounded-t-lg bg-ivory/70 p-6">
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
          <p className="mt-4 rounded-md bg-ivory px-3 py-2 text-sm leading-6 text-earth-muted">
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
