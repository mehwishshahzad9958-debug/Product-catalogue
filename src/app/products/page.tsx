import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories, getProductsByCategory, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The RASAM Spices range: ground spices, blended masalas and individual spices & seasonings.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-earth/10">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-14 lg:px-10 lg:pt-20">
          <h1 className="font-serif text-5xl text-earth sm:text-6xl">Our products</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-earth-muted">
            {products.length} spices and masalas across three categories. This is a
            product catalogue: for orders, stock and trade terms, please{" "}
            <Link href="/contact" className="font-semibold text-spice underline underline-offset-4">
              send us an enquiry
            </Link>
            .
          </p>

          <nav aria-label="Product categories" className="mt-8">
            <ul className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-earth/20 px-5 text-sm font-medium text-earth transition-colors hover:border-spice hover:text-spice"
                  >
                    {category.name} ({getProductsByCategory(category.id).length})
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {categories.map((category, index) => {
        const items = getProductsByCategory(category.id);
        return (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className={index % 2 === 1 ? "bg-ivory-deep/60" : undefined}
          >
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
              <h2 id={`${category.id}-heading`} className="font-serif text-4xl text-earth">
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
