import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { company, navLinks } from "@/data/company";

export default function Footer() {
  return (
<footer className="spice-footer-bg border-t border-turmeric bg-forest-deep pb-8 pt-16 text-ivory [&_:focus-visible]:outline-turmeric">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.4fr_1fr_1.4fr] lg:px-10">
        <div>
          <BrandMark tone="light" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-ivory/85">
            Authentic Indian spices and masalas for every home. For retail,
            wholesale and distributorship enquiries, get in touch.
          </p>
        </div>

        <div>
          <h2 className="eyebrow eyebrow-light !font-sans">Explore</h2>
          <ul className="mt-6 space-y-3 text-sm text-ivory/85">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-turmeric">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow eyebrow-light !font-sans">Contact</h2>
          <address className="mt-6 space-y-3 text-sm not-italic leading-6 text-ivory/85">
            <p>
              {company.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p>
              <a href={company.phone.href} className="hover:text-turmeric">
                {company.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-turmeric">
                {company.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-2 border-t border-turmeric/30 pt-6 text-xs text-ivory/70 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {company.displayName}
        </p>
        <p>FSSAI Lic. No. {company.fssaiLicence}</p>
        </div>
      </div>
    </footer>
  );
}
