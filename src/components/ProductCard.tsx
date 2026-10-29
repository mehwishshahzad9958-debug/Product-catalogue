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
 * RASAM spice-inspired card palette:
 * Cream       - product image background
 * Turmeric    - information background and borders
 * Chilli red  - links and interactive accents
 * Cinnamon    - headings
 */
const cardColors = {
  border: "border-[#C58A1B]",
  image: "bg-[#FFF7E3]",
  imageHover: "group-hover:bg-[#FFFDF6]",
  info: "bg-[#F3D58A]",
  title: "text-[#713B25]",
  description: "text-[#8B3024]",
  muted: "text-[#684B35]",
  divider: "border-[#C58A1B]/60",
  focus: "focus-visible:outline-[#B9452D]",
  hoverTitle: "group-hover:text-[#B9452D]",
  underline: "decoration-[#8B3024]/30",
  underlineHover: "group-hover:decoration-[#8B3024]",
};

export default function ProductCard({
  product,
  variant = "compact",
  className = "",
}: ProductCardProps) {
  const detailed = variant === "detailed";

  const sizes = product.packSizes?.join(", ");
  const format = product.packFormat?.toLowerCase();

  const packLine =
    sizes && format
      ? `${sizes} ${format}`
      : sizes ?? product.packFormat ?? "";

  // Horizontal product carousel cards
  if (variant === "carousel") {
    return (
      <article
        className={`group flex h-full w-full flex-col overflow-hidden rounded-xl border ${cardColors.border} ${cardColors.info} shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${className}`}
      >
        <Link
          href={`/products/${product.id}`}
          className={`flex h-full flex-col focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 ${cardColors.focus}`}
          aria-label={`View details for ${product.name}`}
        >
          {/* Product image */}
          <div
            className={`flex w-full items-center justify-center overflow-hidden rounded-t-xl ${cardColors.image} ${cardColors.imageHover} p-5 transition-colors duration-200`}
          >
            <ProductImage
              product={product}
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 260px, 230px"
            />
          </div>

          {/* Product information */}
          <div className={`flex flex-1 flex-col p-5 ${cardColors.info}`}>
            {packLine && (
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider ${cardColors.muted}`}
              >
                {packLine}
              </span>
            )}

            <h4
              className={`mt-1 line-clamp-1 font-serif text-xl font-medium ${cardColors.title} transition-colors ${cardColors.hoverTitle}`}
            >
              {product.name}
            </h4>

            {product.tagline ? (
              <p
                className={`mt-1.5 line-clamp-2 text-xs font-medium sm:text-sm ${cardColors.description}`}
              >
                {product.tagline}
              </p>
            ) : product.description ? (
              <p
                className={`mt-1.5 line-clamp-2 text-xs sm:text-sm ${cardColors.muted}`}
              >
                {product.description}
              </p>
            ) : null}

            {/* Product navigation */}
            <div
              className={`mt-auto flex items-center justify-between border-t ${cardColors.divider} pt-4 text-xs font-semibold ${cardColors.description}`}
            >
              <span
                className={`underline ${cardColors.underline} underline-offset-4 ${cardColors.underlineHover}`}
              >
                View product
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

  // Standard and detailed product cards
  return (
    <article
      id={detailed ? product.id : undefined}
      className={`flex h-full flex-col overflow-hidden rounded-xl border ${cardColors.border} ${cardColors.info} shadow-sm transition-shadow duration-200 hover:shadow-md ${className}`}
    >
      {/* Product image */}
      <div className={`${cardColors.image} p-6`}>
        <ProductImage
          product={product}
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        />
      </div>

      {/* Product information */}
      <div className={`flex flex-1 flex-col p-6 ${cardColors.info}`}>
        {!detailed && (
          <p className={`text-sm ${cardColors.muted}`}>
            {getCategory(product.category).name}
          </p>
        )}

        <h3
          className={`mt-1 font-serif text-2xl ${cardColors.title}`}
        >
          {product.name}
        </h3>

        {product.tagline && (
          <p className={`mt-2 text-sm font-medium ${cardColors.description}`}>
            {product.tagline}
          </p>
        )}

        {detailed && product.description && (
          <p className={`mt-4 text-[15px] leading-7 ${cardColors.muted}`}>
            {product.description}
          </p>
        )}

        {detailed && packLine && (
          <p className={`mt-4 text-sm ${cardColors.title}`}>
            <span className="font-semibold">Pack: </span>
            {packLine}
          </p>
        )}

        {detailed && product.pendingNote && (
          <p
            className={`mt-4 rounded-md border ${cardColors.border} ${cardColors.image} px-3 py-2 text-sm leading-6 ${cardColors.muted}`}
          >
            <span className={`font-semibold ${cardColors.title}`}>
              To be confirmed:{" "}
            </span>
            {product.pendingNote}
          </p>
        )}

        {/* Product navigation */}
        <div className="mt-auto flex flex-col items-start gap-3 pt-6">
          <Link
            href={`/products/${product.id}`}
            className={`text-sm font-semibold ${cardColors.description} underline ${cardColors.underline} underline-offset-4 hover:decoration-[#8B3024]`}
          >
            View product details
          </Link>

          {detailed && (
            <Link
              href="/contact"
              className={`text-sm font-semibold ${cardColors.muted} underline decoration-[#684B35]/30 underline-offset-4 hover:text-[#B9452D] hover:decoration-[#B9452D]`}
            >
              Enquire about {product.name}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}