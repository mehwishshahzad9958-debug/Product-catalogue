import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { company } from "@/data/company";
import {
  categories,
  featuredProducts,
  getProductsByCategory,
  products,
  type CategoryId,
} from "@/data/products";

/** Packs standing on the hero "shelf", left to right. Paths are verified pack photos. */
const heroPacks = [
  { src: "/images/products/chole-masala.webp", alt: "RASAM Chole Masala box" },
  { src: "/images/products/turmeric-powder.webp", alt: "RASAM Turmeric Powder pouch", main: true },
  { src: "/images/products/sambar-masala.webp", alt: "RASAM Sambar Masala box" },
];

/** One representative pack photo per category card. */
const categoryCover: Record<CategoryId, string> = {
  "ground-spices": "turmeric-powder",
  "blended-masalas": "pao-bhaji-masala",
  "spices-seasonings": "kasuri-methi",
};

const primaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-spice px-7 text-[15px] font-semibold text-ivory transition-colors hover:bg-spice-dark";
const secondaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full border border-earth/25 px-7 text-[15px] font-semibold text-earth transition-colors hover:border-spice hover:text-spice";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-12 md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:px-10 lg:pb-24">
          <div>
            <p className="font-serif text-xl italic text-spice">{company.brandLine}</p>
            <h1 className="mt-5 max-w-xl font-serif text-[2.75rem] leading-[1.08] text-earth sm:text-6xl">
              The authentic taste of India, for every home.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-earth-muted">
              Turmeric and coriander, garam masala and sambar masala. RASAM Spices brings{" "}
              {products.length} ground spices, blended masalas and seasonings to everyday
              Indian cooking.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className={primaryButton}>
                Explore products
              </Link>
              <Link href="/contact" className={secondaryButton}>
                Business enquiries
              </Link>
            </div>
          </div>

          {/* Packs on a shelf, echoing the shelf pages of the RASAM brochure */}
          <div className="relative">
            <div className="absolute inset-x-[4%] bottom-0 top-[10%] rounded-t-[999px] bg-ivory-deep" />
            {/* The negative bottom margin offsets the transparent padding in the pack images */}
            <div className="relative -mb-[2.5%] flex items-end justify-center px-2 pt-6">
              {heroPacks.map((pack) => (
                <div
                  key={pack.src}
                  className={`relative -mx-[3%] aspect-[4/5] ${
                    pack.main ? "z-10 w-[46%]" : "w-[34%]"
                  }`}
                >
                  <Image
                    src={pack.src}
                    alt={pack.alt}
                    fill
                    sizes="(min-width: 1024px) 26vw, 46vw"
                    className="object-contain object-bottom"
                    {...(pack.main ? { fetchPriority: "high" as const, loading: "eager" as const } : {})}
                  />
                </div>
              ))}
            </div>
            <div className="relative h-3 rounded-sm bg-earth shadow-[0_10px_18px_-8px_rgb(48_35_29/0.6)]" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-earth/10 bg-ivory-deep">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl text-earth sm:text-5xl">Our range</h2>
            <p className="mt-4 text-lg leading-8 text-earth-muted">
              Three families of spices, from single-spice powders to ready blends for
              classic dishes.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {categories.map((category) => {
              const count = getProductsByCategory(category.id).length;
              return (
                <li key={category.id}>
                  <Link
                    href={`/products#${category.id}`}
                    className="group flex h-full flex-col rounded-lg border border-earth/10 bg-ivory p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="relative mx-auto aspect-[4/5] w-2/3">
                      <Image
                        src={`/images/products/${categoryCover[category.id]}.webp`}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 20vw, 60vw"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="mt-6 font-serif text-2xl text-earth group-hover:text-spice">
                      {category.name}
                    </h3>
                    <p className="mt-2 leading-7 text-earth-muted">{category.summary}</p>
                    <p className="mt-auto pt-5 text-sm font-semibold text-spice">
                      {count} products
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl text-earth sm:text-5xl">Kitchen favourites</h2>
              <p className="mt-4 text-lg leading-8 text-earth-muted">
                A few of the spices and masalas in the RASAM range.
              </p>
            </div>
            <Link
              href="/products"
              className="text-[15px] font-semibold text-spice underline decoration-spice/30 underline-offset-4 hover:decoration-spice"
            >
              See all {products.length} products
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-t border-earth/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-10 lg:py-24">
          <h2 className="font-serif text-4xl leading-tight text-earth sm:text-5xl">
            Spices are the heart of Indian cuisine.
          </h2>
          <div className="max-w-2xl text-lg leading-8 text-earth-muted">
            <p>
              Launched on {company.launchDate}, RASAM Spices was founded with a simple
              vision: to bring the authentic taste of India to every home through spices
              that make everyday cooking more delicious and memorable.
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
      <section className="bg-spice-dark text-ivory [&_:focus-visible]:outline-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.3fr_1fr] lg:px-10 lg:py-20">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl">Let&apos;s grow together.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ivory/85">
              We invite retailers, distributors, wholesalers and business partners to join
              us in bringing authentic Indian flavours to every corner of the country.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full bg-ivory px-7 text-[15px] font-semibold text-spice-dark transition-colors hover:bg-ivory-deep"
            >
              Send a business enquiry
            </Link>
            <a
              href={company.phone.href}
              className="inline-flex min-h-12 items-center rounded-full border border-ivory/40 px-7 text-[15px] font-semibold text-ivory transition-colors hover:border-ivory"
            >
              Call {company.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
