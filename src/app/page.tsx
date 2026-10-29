
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

const primaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-spice px-7 text-[15px] font-semibold text-white transition-colors hover:bg-spice-dark";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full border-2 border-green px-7 text-[15px] font-semibold text-green transition-colors hover:bg-green hover:text-ivory";

export default function Home() {
  return (
    <>
      {/* HERO SECTION: blurred image outside, original ivory card inside */}
      <section className="relative isolate overflow-hidden px-6 pb-12 pt-8 lg:px-10 lg:pb-16 lg:pt-10">
        {/* Blurred spice photograph behind the hero card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 scale-110 bg-cover bg-center bg-no-repeat blur-sm"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
          }}
        />

        {/* Soft overlay for a warm, subtle background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[#FAF8F2]/45"
        />

        {/* Original hero card: the interior stays plain ivory */}
        <div
          data-hero-card
          className="relative z-10 mx-auto max-w-[1480px] overflow-hidden rounded-2xl border border-green/70 bg-ivory"
        >
          <div className="relative z-10 grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:px-12 lg:py-14">
            {/* Logo, tagline, heading and buttons */}
            <div className="flex flex-col items-center text-center">
              <div className="hero-in w-[200px] sm:w-[250px]">
                <RasamAnimatedLogo />
              </div>

              <p
                className="rasam-tagline hero-in mt-4"
                style={{ "--hero-delay": "0.3s" } as CSSProperties}
              >
                {company.brandLine}
              </p>

              <div
                className="hero-in"
                style={{ "--hero-delay": "0.4s" } as CSSProperties}
              >
                <OrnamentDivider className="mt-3" />
              </div>

              <h1
                className="hero-in mt-4 font-serif text-2xl text-green sm:text-3xl"
                style={{ "--hero-delay": "0.5s" } as CSSProperties}
              >
                Rich aroma. Authentic flavours.
              </h1>

              <div
                className="hero-in mt-7 flex flex-wrap justify-center gap-3"
                style={{ "--hero-delay": "0.75s" } as CSSProperties}
              >
                <Link href="/products" className={primaryButton}>
                  Explore products
                </Link>

                <Link href="/contact" className={secondaryButton}>
                  Business enquiries
                </Link>
              </div>
            </div>

            {/* Existing animated product collection */}
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Spice-photo backdrop for the main content below the hero */}
      <div className="relative isolate overflow-x-clip">
        <SpiceBackdrop />

        {/* Rotating dish platter */}
        <RotatingDishSection />

        {/* Product catalogue */}
        <section
          id="our-range"
          className="border-y border-turmeric/40 py-16 lg:py-24"
        >
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

        {/* About section */}
        <section className="relative overflow-hidden">
          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10 lg:py-24">
            <h2 className="font-serif text-4xl leading-tight text-earth sm:text-5xl">
              Spices are the heart of Indian cuisine.
            </h2>

            <div className="max-w-2xl text-lg leading-8 text-earth-muted">
              <p>
                Launched on {company.launchDate}, RASAM Spices was founded
                with a simple vision: to bring the authentic taste of India
                to every home through spices that make everyday cooking more
                delicious and memorable.
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
      </div>

      {/* Business enquiries */}
      <section className="relative overflow-hidden border-t-2 border-turmeric bg-forest text-ivory [&_:focus-visible]:outline-turmeric">
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
