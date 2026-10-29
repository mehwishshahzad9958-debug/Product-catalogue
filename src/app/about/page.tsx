import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <section className="text-earth">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10 lg:py-24">
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
          <h1 className="display-heading mt-4 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Spices are the heart of Indian cuisine.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-earth-muted">
            Launched on {company.launchDate}, RASAM Spices was founded with a simple vision: to
            bring the authentic taste of India to every home through spices that make everyday
            cooking more delicious and memorable.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              Explore products
            </Link>
            <Link href="/contact" className="btn btn-ghost-dark">
              Business enquiries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
