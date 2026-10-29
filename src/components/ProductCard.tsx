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
 * - surface: charcoal with a fine gold border and hairline inset, like the homepage hero (.rasam-card)
 * - image panel: fixed 4:5 frame with a warm glow, packaging shown whole (object-contain)
 * - info panel: ivory serif title, muted gold tagline, terracotta primary button
 * - hover: small lift and a stronger gold border
 */
const card = "rasam-card group h-full w-full";
const imagePanel = "rasam-card-media";
const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.18em] text-turmeric";
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric";

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
          onDark
              product={product}
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 230px"
              className="transition-transform duration-500 ease-premium group-hover:scale-[1.04]"
            />
          </div>

          <div className="flex flex-1 flex-col p-5">
            {packLine && <span className={eyebrow}>{packLine}</span>}
            <h4 className="mt-1.5 line-clamp-1 font-serif text-2xl font-semibold text-parchment transition-colors group-hover:text-turmeric">
              {product.name}
            </h4>
            {product.tagline && (
              <p className="mb-4 mt-1.5 line-clamp-2 text-sm text-parchment/70">{product.tagline}</p>
            )}
            <div className="mt-auto flex items-center justify-between border-t border-turmeric/30 pt-4 text-xs font-semibold uppercase tracking-[0.14em] text-turmeric transition-colors group-hover:text-parchment">
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
          onDark
          product={product}
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="transition-transform duration-500 ease-premium group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {!detailed && <p className={eyebrow}>{getCategory(product.category).name}</p>}

        <h3 className="mt-1 font-serif text-3xl font-semibold text-parchment">{product.name}</h3>

        {product.tagline && <p className="mt-2 text-sm font-medium text-turmeric">{product.tagline}</p>}

        {detailed && product.description && (
          <p className="mt-4 text-[15px] leading-7 text-parchment/75">{product.description}</p>
        )}

        {detailed && packLine && (
          <p className="mb-6 mt-4 text-sm text-parchment/90">
            <span className="font-semibold">Pack: </span>
            {packLine}
          </p>
        )}

        {detailed && product.pendingNote && (
          <p className="mt-4 rounded-md border border-turmeric/30 bg-parchment/5 px-3 py-2 text-sm leading-6 text-parchment/75">
            <span className="font-semibold text-parchment">To be confirmed: </span>
            {product.pendingNote}
          </p>
        )}

        <div className="mt-auto flex flex-col items-start gap-3 border-t border-turmeric/30 pt-5">
          <Link
            href={`/products/${product.id}`}
            className={`btn btn-primary !min-h-10 !px-5 !text-xs ${focusRing}`}
          >
            View product details
          </Link>

          {detailed && (
            <Link
              href="/contact"
              className={`text-xs font-semibold uppercase tracking-[0.14em] text-parchment/70 underline decoration-turmeric/40 underline-offset-4 transition-colors hover:text-turmeric hover:decoration-turmeric ${focusRing}`}
            >
              Enquire about {product.name}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
