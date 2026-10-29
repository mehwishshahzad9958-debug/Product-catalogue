import type { CSSProperties } from "react";
import ProductImage from "@/components/ProductImage";
import type { DishStageItem } from "@/components/DishDiscovery";

type Props = {
  item: DishStageItem;
  index: number;
  count: number;
  /** 1 when moving forward, -1 backward: sets which way the new pack slides in from. */
  direction: 1 | -1;
  /** True for the first reveal after choosing a dish (the pack pops in after the plate starts moving). */
  justOpened: boolean;
  previous: DishStageItem;
  next: DishStageItem;
  onPrevious: () => void;
  onNext: () => void;
};

const arrowButton =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-turmeric bg-charcoal/40 text-turmeric backdrop-blur-sm transition-[transform,background-color,color] duration-200 hover:bg-turmeric hover:text-charcoal active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-parchment";

/** The matching RASAM masala: the pack, its name and two arrows. Nothing else. */
export default function FeaturedMasala({
  item,
  index,
  count,
  direction,
  justOpened,
  previous,
  next,
  onPrevious,
  onNext,
}: Props) {
  const { dish, product } = item;
  const name = product?.name ?? dish.name;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-2 text-center lg:px-8">
      {/* Remounted on every change (key), which replays the pop-in. */}
      <div
        key={dish.id}
        className="masala-in flex w-full flex-col items-center"
        style={
          {
            "--masala-dx": justOpened ? "0px" : `${direction * 36}px`,
            "--masala-delay": justOpened ? "0.35s" : "0s",
          } as CSSProperties
        }
      >
        {product ? (
          <ProductImage
            product={product}
            sizes="(min-width: 1024px) 420px, 80vw"
            className="max-w-[240px] drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)] sm:max-w-[300px] lg:max-w-[380px]"
          />
        ) : (
          <p className="py-16 text-earth-muted">The matching masala is not available yet.</p>
        )}
        <h3 className="mt-4 display-heading text-4xl text-parchment sm:text-5xl lg:text-6xl">{name}</h3>
      </div>

      <div className="mt-5 flex items-center gap-8">
        <button
          type="button"
          onClick={onPrevious}
          aria-label={`Previous: ${previous.product?.name ?? previous.dish.name}`}
          className={arrowButton}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={`Next: ${next.product?.name ?? next.dish.name}`}
          className={arrowButton}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {name}, {index + 1} of {count}, with {dish.name}.
      </p>

    </div>
  );
}
