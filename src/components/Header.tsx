
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#30231D]/10 bg-[#FAF7F0]/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-12"
      >
        <Link href="/" className="shrink-0">
          <span className="block text-xl font-bold tracking-[0.14em] text-[#30231D]">
            MASALA CO<span className="text-[#A63D26]">.</span>
          </span>
          <span className="mt-1 block text-[9px] uppercase tracking-[0.2em] text-[#65574D]">
            The art of Indian flavour
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#65574D] transition-colors duration-200 hover:text-[#A63D26]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/products"
          className="shrink-0 rounded-full bg-[#A63D26] px-5 py-3 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#812D1C] sm:text-sm"
        >
          Explore spices <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </header>
  );
}
