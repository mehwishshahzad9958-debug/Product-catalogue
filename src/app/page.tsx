
const categories = [
  {
    number: "01",
    name: "Whole Spices",
    description:
      "The authentic aroma of carefully selected whole spices.",
    image: "/images/whole-spices.png",
    imageAlt: "Whole spices including cinnamon, cardamom and peppercorns",
  },
  {
    number: "02",
    name: "Ground Spices",
    description:
      "Rich, vibrant flavours for everyday cooking.",
    image: "/images/ground-spices.png",
    imageAlt: "Bowls of vibrant red chilli and golden turmeric powder",
  },
  {
    number: "03",
    name: "Blended Masalas",
    description:
      "Thoughtfully balanced blends for memorable meals.",
    image: "/images/blended-masalas.png",
    imageAlt: "An aromatic blend of spices in a rustic bowl",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#FAF7F0] text-[#30231D]">
      {/* Hero */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-10 px-6 py-12 sm:px-10 md:grid-cols-2 md:gap-8 md:py-16 lg:px-16 lg:py-20">
        <div className="relative z-10 py-4 md:py-8">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#A63D26]">
            The art of Indian flavour
          </p>

          <h1 className="max-w-2xl font-serif text-5xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-8xl">
            Every spice
            <br />
            has a story.
            <br />
            <span className="mt-2 block text-[#A63D26] italic">
              Every meal,
              <br className="hidden lg:block" /> a memory.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-[#65574D] sm:text-lg sm:leading-8">
            Discover the colours, aromas and traditions that make Indian
            cooking extraordinary. Crafted for kitchens where flavour matters.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/products"
              className="inline-flex items-center gap-3 rounded-full bg-[#A63D26] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#812D1C]"
            >
              Discover our range <span aria-hidden="true">↗</span>
            </a>

            <a
              href="/about"
              className="inline-flex items-center rounded-full border border-[#30231D]/30 px-6 py-4 text-sm font-semibold transition duration-300 hover:border-[#A63D26] hover:bg-white"
            >
              Our story
            </a>
          </div>

          <div className="mt-9 flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-[#786A60] sm:text-[10px]">
            <span className="h-px w-10 bg-[#C79A53]" />
            Rooted in tradition
            <span className="text-[#C79A53]">•</span>
            Made for every kitchen
          </div>
        </div>

        {/* Hero image */}
        <div className="relative min-h-[380px] overflow-hidden rounded-t-[48%] rounded-b-2xl bg-[#E9D8B9] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[650px]">
          <img
            src="/images/hero-spices.png"
            alt="An assortment of Indian spices arranged in rustic bowls"
            className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#30231D]/30 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-5 rounded-full border border-white/50 bg-[#FAF7F0]/95 px-5 py-3 text-xs font-medium text-[#30231D] shadow-lg sm:bottom-8 sm:left-8">
            A world of authentic spices
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="border-t border-[#30231D]/10 bg-[#F2EBDD]">
        <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 md:mb-12">
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A63D26]">
                Explore our collection
              </p>

              <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl">
                A flavour for every table.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-[#65574D] sm:text-base">
                Explore the colours and character of spices that inspire
                everyday cooking.
              </p>
            </div>

            <a
              href="/products"
              className="mb-1 inline-flex items-center gap-2 border-b border-[#A63D26]/40 pb-2 text-sm font-semibold text-[#A63D26] transition hover:border-[#A63D26]"
            >
              View all products <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <a
                key={category.number}
                href="/products"
                className="group overflow-hidden rounded-xl border border-[#30231D]/10 bg-[#FAF7F0] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden bg-[#E9D8B9] sm:h-60">
                  <img
                    src={category.image}
                    alt={category.imageAlt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-[#FAF7F0]/90 px-3 py-2 text-[10px] font-semibold tracking-[0.16em] text-[#A63D26]">
                    COLLECTION {category.number}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-2xl font-medium sm:text-3xl">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#65574D]">
                    {category.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#30231D]/10 pt-4 text-sm font-medium text-[#A63D26]">
                    <span>Explore collection</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story introduction */}
      <section className="mx-auto grid max-w-[1600px] items-center gap-8 px-6 py-16 sm:px-10 md:grid-cols-2 md:gap-16 md:py-24 lg:px-16">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A63D26]">
            The heart of every kitchen
          </p>

          <h2 className="max-w-xl font-serif text-4xl font-medium leading-tight sm:text-5xl md:text-6xl">
            Little ingredients.
            <span className="block text-[#A63D26] italic">
              Extraordinary moments.
            </span>
          </h2>
        </div>

        <div>
          <p className="text-base leading-8 text-[#65574D]">
            Every kitchen has its own traditions, favourite recipes and
            unforgettable flavours. Discover the world of spices and find
            inspiration for your next meal.
          </p>

          <a
            href="/about"
            className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#A63D26] transition hover:gap-4"
          >
            Discover our story <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
