import type { Metadata } from "next";
import { company, enquiryMailto } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact RASAM Spices for business enquiries and distributorships. Phone, email and address in Noida, Uttar Pradesh.",
};

const enquiryChecklist = [
  "Your name and business name",
  "Your city or region",
  "Whether you are a retailer, wholesaler or distributor",
  "The products and quantities you are interested in",
];

export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h1 className="display-heading mt-4 text-5xl text-earth sm:text-7xl">Contact us</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-earth-muted">
            For business enquiries and distributorships, call or email the RASAM Spices team.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={enquiryMailto}
              className="btn btn-primary"
            >
              Email a business enquiry
            </a>
            <a
              href={company.phone.href}
              className="btn btn-ghost-dark"
            >
              Call {company.phone.display}
            </a>
          </div>

          <div className="mt-12 max-w-xl rounded-card bg-ivory-deep p-6 sm:p-8">
            <h2 className="font-serif text-2xl text-earth">Helpful to include</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-earth-muted marker:text-turmeric">
              {enquiryChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-card border border-turmeric/40 bg-ivory p-6 shadow-card sm:p-8 lg:self-start">
          <h2 className="font-serif text-2xl text-earth">{company.displayName}</h2>
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="text-sm font-semibold text-earth">Phone</dt>
              <dd className="mt-1">
                <a href={company.phone.href} className="text-lg text-spice underline-offset-4 hover:underline">
                  {company.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-earth">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${company.email}`} className="text-lg text-spice underline-offset-4 hover:underline">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-earth">Address</dt>
              <dd className="mt-1 leading-7 text-earth-muted">
                <address className="not-italic">
                  {company.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-earth">Website</dt>
              <dd className="mt-1">
                <a href={company.website.href} className="text-spice underline-offset-4 hover:underline">
                  {company.website.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-earth">FSSAI Lic. No.</dt>
              <dd className="mt-1 text-earth-muted">{company.fssaiLicence}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
