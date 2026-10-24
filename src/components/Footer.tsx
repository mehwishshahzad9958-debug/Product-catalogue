import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#30231D] px-6 py-12 text-[#FAF7F0] lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <Link href="/" className="text-xl font-bold tracking-[0.16em]">
            MASALA CO.
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#FAF7F0]/70">
            A space for your brand story, products, and love of spices.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#FAF7F0]/70">
            <li><Link href="/about" className="hover:text-white">Our Story</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold">Get in touch</h2>
          <p className="mt-4 text-sm leading-7 text-[#FAF7F0]/70">
            Contact details will be added after confirmation from the client.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-6 text-xs text-[#FAF7F0]/60">
        © {new Date().getFullYear()} Masala Co. Replace with the confirmed company name.
      </div>
    </footer>
  );
}