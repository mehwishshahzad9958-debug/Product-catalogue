import Link from "next/link";
import HeaderNav from "@/components/HeaderNav";
import { navLinks } from "@/data/company";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-turmeric/40 bg-parchment/90 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex min-h-[80px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10"
      >
        {/* Small company logo (the lid animation stops for reduced-motion visitors). */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/rasam-logo.png"
            alt="RASAM Spices home"
            width={84}
            height={48}
            priority
            className="h-11 w-auto object-contain sm:h-12"
          />
        </Link>
        <HeaderNav links={navLinks} />
      </nav>
    </header>
  );
}