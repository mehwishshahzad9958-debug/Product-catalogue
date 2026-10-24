import BrandMark from "@/components/BrandMark";
import HeaderNav from "@/components/HeaderNav";
import { navLinks } from "@/data/company";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-earth/10 bg-ivory/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10"
      >
        <BrandMark />
        <HeaderNav links={navLinks} />
      </nav>
    </header>
  );
}
