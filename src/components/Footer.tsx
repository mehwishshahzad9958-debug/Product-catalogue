import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { company, navLinks } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-earth px-6 pb-8 pt-14 text-ivory lg:px-10 [&_:focus-visible]:outline-turmeric">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <BrandMark tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/75">
            Authentic Indian spices and masalas for every home. For retail,
            wholesale and distributorship enquiries, get in touch.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-ivory/75">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ivory hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg">Contact</h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-6 text-ivory/75">
            <p>
              {company.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <a href={company.phone.href} className="hover:text-ivory hover:underline">
                {company.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-ivory hover:underline">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-ivory/15 pt-6 text-xs text-ivory/60 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {company.displayName}
        </p>
        <p>FSSAI Lic. No. {company.fssaiLicence}</p>
      </div>
    </footer>
  );
}
