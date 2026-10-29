import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import ProductHeroSlider from "@/components/ProductHeroSlider";
import { heroSlides } from "@/data/productHeroSlides";
import { categories, featuredProducts, getProductsByCategory, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The RASAM Spices range: ground spices, blended masalas and individual spices & seasonings.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-turmeric/40">
        {/* Slider on top, same width as the framed hero box on the home page. Slides: src/data/productHeroSlides.ts */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-8 lg:px-10 lg:pt-10">
          <ProductHeroSlider slides={heroSlides} aspectClassName="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2/1]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
          <p className="eyebrow">The catalogue</p>
          <h1 className="display-heading mt-4 text-5xl text-earth sm:text-7xl">Our products</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-earth-muted">
            {products.length} spices and masalas in three categories. For orders and trade
            terms, please{" "}
            <Link href="/contact" className="font-semibold text-spice underline underline-offset-4">
              send an enquiry
            </Link>
            .
          </p>

          <nav aria-label="Product categories" className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-turmeric/70 px-5 text-xs font-semibold uppercase tracking-[0.14em] text-green transition-colors hover:border-green hover:bg-green hover:text-ivory"
                  >
                    {category.name} ({getProductsByCategory(category.id).length})
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Featured slider: real products flagged `featured` in src/data/products.ts */}
      {featuredProducts.length > 0 && (
        <section id="featured" aria-label="Featured products" className="border-b border-turmeric/40 bg-parchment">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <ProductCarousel
              category={{ id: "featured", name: "Featured products" }}
              products={featuredProducts}
            />
          </div>
        </section>
      )}

      {categories.map((category, index) => {
        const items = getProductsByCategory(category.id);
        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className={`relative overflow-hidden ${index % 2 === 1 ? "bg-ivory-deep/50" : ""}`}
          >
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
              <h2 id={`${category.id}-heading`} className="display-heading text-5xl text-earth">
                {category.name}
              </h2>
              <p className="mt-3 text-lg text-earth-muted">{category.summary}</p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} variant="detailed" />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
