import Link from "next/link";

type BrandMarkProps = {
  /** "dark" text for light backgrounds, "light" text for the footer. */
  tone?: "dark" | "light";
};

/**
 * Text wordmark used in the header and footer.
 * Replace the contents with the official logo file once the client supplies
 * one (an SVG in /public). The link and sizing can stay the same.
 */
export default function BrandMark({ tone = "dark" }: BrandMarkProps) {
  const main = tone === "dark" ? "text-earth" : "text-ivory";

  return (
    <Link href="/" className="inline-flex items-baseline gap-2" aria-label="RASAM Spices home">
      <span className={`font-serif text-3xl font-semibold tracking-[0.14em] ${main}`}>RASAM</span>
    </Link>
  );
}
