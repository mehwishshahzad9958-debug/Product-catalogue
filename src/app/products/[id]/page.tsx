import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PackagingGallery from "@/components/PackagingGallery";
import { company, enquiryMailto } from "@/data/company";
import { getCategory, getProduct, products } from "@/data/products";

/** Build one static page per product at build time. */
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

/** Any id not in the product list shows the 404 page. */
export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline ?? `${product.name} from RASAM Spices.`,
  };
}

export default async function ProductPage(props: PageProps<"/products/[id]">) {
  const { id } = await props.params;
  const product = getProduct(id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const sizes = product.packSizes?.join(", ");
  const format = product.packFormat?.toLowerCase();
  const packLine = sizes && format ? `${sizes} ${format}` : sizes ?? product.packFormat;

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-10 lg:pb-24">
        <nav aria-label="Breadcrumb" className="text-sm text-earth-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/products" className="underline-offset-4 hover:text-spice hover:underline">
                Products
              </Link>
              <span aria-hidden="true" className="ml-2">/</span>
            </li>
            <li>
              <Link
                href={`/products#${category.id}`}
                className="underline-offset-4 hover:text-spice hover:underline"
              >
                {category.name}
              </Link>
              <span aria-hidden="true" className="ml-2">/</span>
            </li>
            <li aria-current="page" className="text-earth">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-16">
          {/* Packaging images scroll vertically: front first, then back */}
          <PackagingGallery product={product} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <h1 className="font-serif text-4xl text-earth sm:text-5xl">{product.name}</h1>
            {product.tagline && (
              <p className="mt-3 text-lg font-medium text-spice">{product.tagline}</p>
            )}
            {product.description && (
              <p className="mt-6 max-w-xl text-lg leading-8 text-earth-muted">
                {product.description}
              </p>
            )}

            <dl className="mt-8 max-w-xl divide-y divide-earth/10 border-y border-earth/10">
              <div className="flex gap-4 py-3">
                <dt className="w-28 shrink-0 text-sm font-semibold text-earth">Category</dt>
                <dd className="text-sm text-earth-muted">{category.name}</dd>
              </div>
              {packLine && (
                <div className="flex gap-4 py-3">
                  <dt className="w-28 shrink-0 text-sm font-semibold text-earth">Pack</dt>
                  <dd className="text-sm text-earth-muted">{packLine}</dd>
                </div>
              )}
            </dl>

            {product.pendingNote && (
              <p className="mt-6 max-w-xl rounded-md bg-ivory-deep px-4 py-3 text-sm leading-6 text-earth-muted">
                <span className="font-semibold text-earth">To be confirmed: </span>
                {product.pendingNote}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={enquiryMailto}
                className="inline-flex min-h-12 items-center rounded-full bg-spice px-7 text-[15px] font-semibold text-white transition-colors hover:bg-spice-dark"
              >
                Email an enquiry
              </a>
              <a
                href={company.phone.href}
                className="inline-flex min-h-12 items-center rounded-full border-2 border-green px-7 text-[15px] font-semibold text-green transition-colors hover:bg-green hover:text-ivory"
              >
                Call {company.phone.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
