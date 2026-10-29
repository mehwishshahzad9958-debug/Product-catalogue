"use client";

import { useCallback, useEffect, useState } from "react";
import DishPlatter from "@/components/DishPlatter";
import FeaturedMasala from "@/components/FeaturedMasala";
import type { DishEntry } from "@/data/dishes";
import type { Product } from "@/data/products";

export type DishStageItem = { dish: DishEntry; product: Product | null };

/**
 * Holds the one piece of state that keeps food and masala in step: `selected` (an index, or null for
 * the six-dish view). The plate and the featured masala both read it, so they can never disagree.
 */
export default function DishDiscovery({ items }: { items: DishStageItem[] }) {
  const count = items.length;
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [opened, setOpened] = useState(false);

  const select = useCallback((index: number) => {
    setDirection(1);
    setOpened(true);
    setSelected(index);
  }, []);

  const step = useCallback(
    (delta: 1 | -1) => {
      setDirection(delta);
      setOpened(false);
      setSelected((current) => (current === null ? 0 : (current + delta + count) % count));
    },
    [count],
  );

  const reset = useCallback(() => setSelected(null), []);

  // Escape returns to the six-dish view.
  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const isSelected = selected !== null;
  return (
    <section
      aria-label="Dishes and the RASAM masalas that make them"
      className="relative py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="dish-stage relative" data-sel={isSelected ? "true" : "false"}>
          <div className="grid items-center lg:grid-cols-2">
            <div className="dish-slot">
              <DishPlatter
                items={items}
                selected={selected}
                onSelect={select}
                onReset={reset}
              />
            </div>

            <div className="dish-panel" inert={!isSelected}>
              {selected !== null && (
                <FeaturedMasala
                  item={items[selected]}
                  index={selected}
                  count={count}
                  direction={direction}
                  justOpened={opened}
                  previous={items[(selected - 1 + count) % count]}
                  next={items[(selected + 1) % count]}
                  onPrevious={() => step(-1)}
                  onNext={() => step(1)}
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
