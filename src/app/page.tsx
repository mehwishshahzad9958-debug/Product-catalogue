
import Image from "next/image";
import Link from "next/link";
import OrnamentDivider from "@/components/OrnamentDivider";
import ProductCarousel from "@/components/ProductCarousel";
import RasamAnimatedLogo from "@/components/RasamAnimatedLogo";
import { company } from "@/data/company";
import {
  categories,
  getProductsByCategory,
  products,
} from "@/data/products";

const primaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-spice px-7 text-[15px] font-semibold text-white transition-colors hover:bg-spice-dark";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full border-2 border-green px-7 text-[15px] font-semibold text-green transition-colors hover:bg-green hover:text-ivory";

export default function Home() {
  return (
    <>
      {/* Hero: framed card, as in the approved reference */}
      <section className="px-6 pb-12 pt-8 lg:px-10 lg:pb-16 lg:pt-10">
        <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-2xl border border-green/70">
          {/* Faint botanical sketches in the corners, behind the content */}
          <span aria-hidden="true" className="ornament ornament-sprig -left-2 top-4 w-[70px] -rotate-12 text-olive opacity-[0.14] lg:w-[110px]" />
          <span aria-hidden="true" className="ornament ornament-sprig -bottom-4 left-6 hidden w-[80px] rotate-6 text-olive opacity-[0.12] lg:block lg:w-[100px]" />
          <span aria-hidden="true" className="ornament ornament-sprig -right-2 top-2 hidden w-[90px] rotate-12 text-olive opacity-[0.12] lg:block" />

          <div className="relative z-10 grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:px-12 lg:py-14">
            {/* Hero content, centred over the left column */}
            <div className="flex flex-col items-center text-center">
              {/* Large animated logo (same component as the header; lid animation stops for reduced-motion) */}
              <div className="w-[200px] sm:w-[250px]">
                <RasamAnimatedLogo />
              </div>

              <p className="rasam-tagline mt-4">{company.brandLine}</p>

              <OrnamentDivider className="mt-3" />

              <h1 className="mt-4 font-serif text-2xl text-green sm:text-3xl">
                Rich aroma. Authentic flavours.
              </h1>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/products" className={primaryButton}>
                  Explore products
                </Link>
                <Link href="/contact" className={secondaryButton}>
                  Business enquiries
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative mx-auto w-full max-w-[600px]">
              <div className="relative aspect-[417/381] w-full">
                <Image
                  src="/images/home-hero.webp"
                  alt="RASAM spices product collection"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our range */}
      <section id="our-range" className="border-y border-turmeric/40 bg-ivory py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl text-earth sm:text-5xl">
              Our range
            </h2>
            <p className="mt-4 text-lg leading-8 text-earth-muted">
              Three families of spices, from single-spice powders to ready
              blends for classic dishes.
            </p>
          </div>

          <div className="mt-14 space-y-16 lg:space-y-20">
            {categories.map((category) => (
              <ProductCarousel
                key={category.id}
                category={category}
                products={getProductsByCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>
      {/* About */}
      <section className="relative overflow-hidden">
        <span aria-hidden="true" className="ornament ornament-sprig -right-4 bottom-0 hidden w-[120px] text-olive opacity-[0.16] md:block lg:right-6 lg:w-[150px]" />
        <span aria-hidden="true" className="ornament ornament-mandala bottom-0 left-0 w-[180px] text-turmeric opacity-[0.16] lg:w-[240px]" style={{ transform: "scale(-1,-1)" }} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10 lg:py-24">
          <h2 className="font-serif text-4xl leading-tight text-earth sm:text-5xl">
            Spices are the heart of Indian cuisine.
          </h2>

          <div className="max-w-2xl text-lg leading-8 text-earth-muted">
            <p>
              Launched on {company.launchDate}, RASAM Spices was founded with a
              simple vision: to bring the authentic taste of India to every
              home through spices that make everyday cooking more delicious
              and memorable.
            </p>

            <Link
              href="/about"
              className="mt-6 inline-block text-[15px] font-semibold text-spice underline decoration-spice/30 underline-offset-4 hover:decoration-spice"
            >
              About RASAM Spices
            </Link>
          </div>
        </div>
      </section>

      {/* Business enquiries */}
      <section className="relative overflow-hidden border-t-2 border-turmeric bg-forest text-ivory [&_:focus-visible]:outline-turmeric">
        <span aria-hidden="true" className="ornament ornament-mandala right-0 top-0 w-[260px] text-turmeric opacity-[0.14] lg:w-[340px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.3fr_1fr] lg:px-10 lg:py-20">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">
              Let&apos;s grow together.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ivory/90">
              We invite retailers, distributors, wholesalers and business
              partners to join us in bringing authentic Indian flavours to
              every corner of the country.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full bg-ivory px-7 text-[15px] font-semibold text-forest transition-colors hover:bg-ivory-deep"
            >
              Send a business enquiry
            </Link>

            <a
              href={company.phone.href}
              className="inline-flex min-h-12 items-center rounded-full border border-ivory/50 px-7 text-[15px] font-semibold text-ivory transition-colors hover:border-ivory"
            >
              Call {company.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
