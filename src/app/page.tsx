
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import HeroVisual from "@/components/HeroVisual";
import OrnamentDivider from "@/components/OrnamentDivider";
import ProductCarousel from "@/components/ProductCarousel";
import RotatingDishSection from "@/components/RotatingDishSection";
import SpiceBackdrop from "@/components/SpiceBackdrop";
import RasamAnimatedLogo from "@/components/RasamAnimatedLogo";

import { company } from "@/data/company";
import { categories, getProductsByCategory } from "@/data/products";


export default function Home() {
  return (
    <>
      {/* HERO: spice photograph (blurred, visible around the card) + solid charcoal card with a gold border */}
      <section className="relative isolate overflow-hidden px-4 pb-12 pt-8 sm:px-6 lg:px-10 lg:pb-20 lg:pt-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 scale-110 blur-sm">
          <Image src="/images/hero-background.png" alt="" fill priority sizes="100vw" quality={75} className="object-cover object-center" />
        </div>
        {/* Light tint only, so the photograph stays visible around the card */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-charcoal/30" />
        {/* Fades the photo into the ivory "Our range" section instead of ending in a hard edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-20 bg-linear-to-b from-transparent to-parchment lg:h-28"
        />

        <div
          data-hero-card
          className="relative z-10 mx-auto max-w-[1480px] overflow-hidden rounded-[1.25rem] border border-turmeric/80 bg-charcoal shadow-lift"
        >
          {/* Warm light behind the products, hairline gold inset */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_55%,rgba(200,154,69,0.14),transparent_70%)]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[0.9rem] border border-turmeric/20" />

          <div className="relative z-10 grid items-center gap-6 px-6 py-12 sm:px-12 lg:grid-cols-[1fr_1.1fr] lg:gap-4 lg:px-16 lg:py-20">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Official logo, lightened slightly so the green pot reads on charcoal */}
              <div className="hero-in w-[190px] [filter:brightness(1.55)_saturate(1.05)] sm:w-[240px]">
                <RasamAnimatedLogo />
              </div>

              <p className="rasam-tagline hero-in mt-5 !mx-0" style={{ "--hero-delay": "0.3s" } as CSSProperties}>
                {company.brandLine}
              </p>

              <div className="hero-in" style={{ "--hero-delay": "0.4s" } as CSSProperties}>
                <OrnamentDivider className="mt-3" />
              </div>

              <h1
                className="hero-in display-heading mt-6 text-[2.75rem] text-parchment sm:text-6xl lg:text-7xl"
                style={{ "--hero-delay": "0.5s" } as CSSProperties}
              >
                Rich aroma.
                <br />
                <span className="text-turmeric">Authentic flavours.</span>
              </h1>

              <div className="hero-in mt-9 flex flex-wrap justify-center gap-3 lg:justify-start" style={{ "--hero-delay": "0.75s" } as CSSProperties}>
                <Link href="/products" className="btn btn-primary">
                  Explore products
                </Link>
                <Link href="/contact" className="btn btn-ghost-light">
                  Business enquiries
                </Link>
              </div>
            </div>

            {/* Animated product collection (client component: entrance, float, light parallax) */}
            <HeroVisual />
          </div>
        </div>
      </section>

  
      {/* OUR RANGE: quiet ivory */}
      <section id="our-range" className="bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow">The collection</p>
            <h2 className="display-heading mt-4 text-5xl text-earth sm:text-6xl">Our range</h2>
            <p className="mt-5 text-lg leading-8 text-earth-muted">
              Three families of spices, from single-spice powders to ready
              blends for classic dishes.
            </p>
          </div>

          <div className="mt-16 space-y-20 lg:space-y-24">
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
         {/* DISH PLATTER: charcoal band with the spice photograph sunk into it */}
      <div className="relative isolate overflow-hidden border-y border-turmeric/40">
        <SpiceBackdrop tone="dark" />
        <RotatingDishSection />
      </div>


      {/* ABOUT: image-led panel beside the story */}
      <section className="bg-ivory-deep/60 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
          <div className="image-frame relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none">
            <Image
              src="/images/spice-background.jpg"
              alt="Whole spices: turmeric, star anise and chillies"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              quality={90}
              className="object-cover object-[50%_35%]"
            />
          </div>

          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="display-heading mt-4 text-5xl leading-[1.05] text-earth sm:text-6xl">
              Spices are the heart of Indian cuisine.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-earth-muted">
              Launched on {company.launchDate}, RASAM Spices was founded with a
              simple vision: to bring the authentic taste of India to every
              home through spices that make everyday cooking more delicious
              and memorable.
            </p>
            <Link href="/about" className="btn btn-ghost-dark mt-9">
              About RASAM Spices
            </Link>
          </div>
        </div>
      </section>

      {/* BUSINESS ENQUIRIES */}
      <section className="relative isolate overflow-hidden border-t border-turmeric bg-forest text-ivory [&_:focus-visible]:outline-turmeric">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_85%_40%,rgba(200,154,69,0.16),transparent_65%),linear-gradient(135deg,#354638,#2b3a2e)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.3fr_1fr] lg:px-10 lg:py-24">
          <div>
            <p className="eyebrow eyebrow-light">Business enquiries</p>
            <h2 className="display-heading mt-4 text-5xl sm:text-6xl">Let&apos;s grow together.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/85">
              We invite retailers, distributors, wholesalers and business
              partners to join us in bringing authentic Indian flavours to
              every corner of the country.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact" className="btn btn-light">
              Send a business enquiry
            </Link>
            <a href={company.phone.href} className="btn btn-ghost-light">
              Call {company.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
