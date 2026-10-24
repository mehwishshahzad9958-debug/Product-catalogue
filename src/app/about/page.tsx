import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F0] text-[#30231D]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#A63D26]">
          Our Story
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">
          Every spice carries a story.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#65574D]">
          This space will introduce the company, its values, and its journey.
          The final story will be added after the company shares and confirms
          its details.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#F2EBDD] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A63D26]">
              Our Purpose
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              Made for meaningful meals.
            </h2>
            <p className="mt-4 leading-7 text-[#65574D]">
              The company&apos;s mission and purpose will be presented here
              once confirmed.
            </p>
          </div>

          <div className="rounded-2xl border border-[#30231D]/10 p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A63D26]">
              Our Values
            </p>
            <h2 className="mt-4 text-2xl font-semibold">
              A story worth sharing.
            </h2>
            <p className="mt-4 leading-7 text-[#65574D]">
              Confirmed company values, sourcing details, and product
              standards will be added here when provided.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
