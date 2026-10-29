import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { getCategory, type Product } from "@/data/products";

type ProductCardProps = {
  /** compact: standard cards, detailed: catalogue, carousel: horizontal cards */
  variant?: "compact" | "detailed" | "carousel";
  product: Product;
  className?: string;
};

/**
 * One card language for the whole catalogue (tokens in globals.css):
 * - image panel: warm sand gradient, fixed 4:5 frame, packaging shown whole (object-contain)
 * - info panel: ivory, serif title, terracotta tagline, gold hairline before the link
 * - hover: small lift and a stronger gold border
 */
const card =
  "group flex h-full w-full flex-col overflow-hidden rounded-card border border-turmeric/35 bg-ivory shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-premium hover:-translate-y-1 hover:border-turmeric/80 hover:shadow-lift";
const imagePanel =
  "bg-[linear-gradient(180deg,#f4eada_0%,#eadcc3_100%)] transition-colors duration-300";
const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-text";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spice";

export default function ProductCard({
  variant = "compact",
  product,
  className = "",
}: ProductCardProps) {
  const detailed = variant === "detailed";
  const sizes = product.packSizes?.join(", ");
  const format = product.packFormat?.toLowerCase();
  // e.g. "100 g box", "25 g, 50 g, 100 g" or "Pouch"
  const packLine = sizes && format ? `${sizes} ${format}` : sizes ?? product.packFormat ?? "";

  // Horizontal product carousel cards
  if (variant === "carousel") {
    return (
      <article className={`${card} ${className}`}>
        <Link href={`/products/${product.id}`} className={`flex h-full flex-col focus-visible:rounded-card ${focusRing}`}>
          <div className={`flex w-full items-center justify-center p-5 ${imagePanel}`}>
            <ProductImage
              product={product}
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 230px"
              className="transition-transform duration-500 ease-premium group-hover:scale-[1.04]"
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            {packLine && <span className={eyebrow}>{packLine}</span>}
            <h4 className="mt-1.5 line-clamp-1 font-serif text-2xl font-semibold text-earth transition-colors group-hover:text-spice">
              {product.name}
            </h4>
            {product.tagline && (
              <p className="mt-1.5 line-clamp-2 text-sm text-earth-muted">{product.tagline}</p>
            )}
            <div className="mt-auto flex items-center justify-between border-t border-turmeric/30 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-spice">
              <span>View product</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Standard and detailed product cards
  return (
    <article id={detailed ? product.id : undefined} className={`${card} ${className}`}>
      <div className={`p-6 ${imagePanel}`}>
        <ProductImage
          product={product}
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="transition-transform duration-500 ease-premium group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {!detailed && <p className={eyebrow}>{getCategory(product.category).name}</p>}

        <h3 className="mt-1 font-serif text-3xl font-semibold text-earth">{product.name}</h3>

        {product.tagline && <p className="mt-2 text-sm font-medium text-spice">{product.tagline}</p>}

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
          <p className="mt-4 rounded-md border border-turmeric/40 bg-parchment px-3 py-2 text-sm leading-6 text-earth-muted">
            <span className="font-semibold text-earth">To be confirmed: </span>
            {product.pendingNote}
          </p>
        )}

        <div className="mt-auto flex flex-col items-start gap-3 border-t border-turmeric/30 pt-5">
          <Link
            href={`/products/${product.id}`}
            className={`text-xs font-semibold uppercase tracking-[0.14em] text-spice underline decoration-spice/30 underline-offset-4 hover:decoration-spice ${focusRing}`}
          >
            View product details
          </Link>

          {detailed && (
            <Link
              href="/contact"
              className={`text-xs font-semibold uppercase tracking-[0.14em] text-earth-muted underline decoration-earth/20 underline-offset-4 hover:text-spice hover:decoration-spice ${focusRing}`}
            >
              Enquire about {product.name}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
