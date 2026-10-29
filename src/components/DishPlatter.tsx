"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { DISH_SLICE_COUNT } from "@/data/dishes";
import type { DishStageItem } from "@/components/DishDiscovery";

/* ---- Circular-sector geometry (unit square, centre at 0.5 / 0.5, radius 0.5) ---------------------
 * Slice i spans 60 degrees: from -90 + 60i to -30 + 60i (slice 0 starts at the top, clockwise).
 * Each slice is: centre -> straight radius -> circular arc along the plate edge -> straight radius -> centre.
 */
const SPAN = 360 / DISH_SLICE_COUNT;
const START = -90;
const rad = (deg: number) => (deg * Math.PI) / 180;
const point = (deg: number, radius: number) => ({
  x: 0.5 + radius * Math.cos(rad(deg)),
  y: 0.5 + radius * Math.sin(rad(deg)),
});

function sectorPath(index: number) {
  const from = point(START + index * SPAN, 0.5);
  const to = point(START + (index + 1) * SPAN, 0.5);
  return `M0.5 0.5 L${from.x.toFixed(5)} ${from.y.toFixed(5)} A0.5 0.5 0 0 1 ${to.x.toFixed(5)} ${to.y.toFixed(5)} Z`;
}

const clipId = (index: number) => `rasam-dish-sector-${index}`;

/** Each photo sits in a square box centred on its slice's middle, so the dish is centred in its wedge. */
const PHOTO_REACH = 31.8; // % of the plate, from the centre along the slice's middle line
const PHOTO_SIZE = 70; // % of the plate

type Props = {
  items: DishStageItem[];
  selected: number | null;
  onSelect: (index: number) => void;
  /** Called when the selected single-dish plate is clicked: back to the six-dish view. */
  onReset: () => void;
};

const WOOD = "url(/images/wood-grain.jpg)";
const DIVIDER = "#35271D"; // thin, dark, natural

/**
 * The wooden platter. The rim, the food and the dividers are ONE rotating body (`spinRef`), so they
 * can never drift apart. Static layers (shadow, lighting) sit outside it so light never spins.
 * Inside the plate:
 *  - the six-slice selector (each slice a real button), shown when nothing is selected;
 *  - the single-dish plate, shown when a dish is selected.
 * On selection the rotation eases to rest upright (see the effect below) while the plate slides left.
 */
export default function DishPlatter({ items, selected, onSelect, onReset }: Props) {
  const isSelected = selected !== null;
  const spinRef = useRef<HTMLDivElement>(null);

  // Smoothly stop the rotation: read the current angle, then ease forward to the next upright position.
  useEffect(() => {
    const el = spinRef.current;
    if (!el) return;
    if (selected === null) {
      el.style.transition = "";
      el.style.transform = "";
      el.style.animation = "";
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    let angle = (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    if (angle < 0.5 || angle > 359.5) return;
    el.style.animation = "none";
    el.style.transform = `rotate(${angle}deg)`;
    void el.offsetWidth; // commit the start angle before easing to the end angle
    const seconds = 0.8 + ((360 - angle) / 360) * 0.9;
    el.style.transition = `transform ${seconds}s cubic-bezier(0.2, 0.7, 0.3, 1)`;
    el.style.transform = "rotate(360deg)";
  }, [selected]);

  return (
    <div className="dish-plate group relative mx-auto aspect-square w-[min(88vw,720px)] lg:w-full lg:max-w-[600px]">
      {/* Clip paths for the six slices (no size, no layout). */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <defs>
          {items.map((item, index) => (
            <clipPath key={item.dish.id} id={clipId(index)} clipPathUnits="objectBoundingBox">
              <path d={sectorPath(index)} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {/* Soft contact shadow (static) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full shadow-[0_28px_44px_-14px_rgba(40,22,8,0.6),0_6px_14px_rgba(40,22,8,0.35)]"
      />

      {/* The rotating wooden body: rim + plate surface + food + dividers */}
      <div
        ref={spinRef}
        className="dish-spin absolute inset-0 animate-[spin_40s_linear_infinite] overflow-hidden rounded-full will-change-transform motion-reduce:animate-none"
        style={{ backgroundImage: WOOD, backgroundSize: "cover", backgroundPosition: "50% 50%" }}
      >
        {/* Inner plate surface: a slightly darker, finer cut of the wood, inside the rim */}
        <div
          className="absolute inset-[6%] overflow-hidden rounded-full"
          style={{ backgroundImage: WOOD, backgroundSize: "170%", backgroundPosition: "30% 70%" }}
        >
          {/* Single-dish plate: the selected food, naturally set on the wood */}
          <div className="dish-single absolute inset-0" aria-hidden={!isSelected}>
            <div
              className="absolute inset-[7%] overflow-hidden rounded-full border-2 shadow-[0_6px_18px_rgba(30,15,5,0.5)]"
              style={{ borderColor: DIVIDER }}
            >
              {items.map(({ dish }, index) => (
                <div key={dish.id} className="dish-photo absolute inset-0" data-active={selected === index}>
                  <Image
                    src={dish.src}
                    alt={selected === index ? dish.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 40vw, 88vw"
                    quality={90}
                    className="object-cover"
                    style={{
                      objectPosition: dish.focus ?? "50% 50%",
                      transform: dish.zoom ? `scale(${dish.zoom})` : undefined,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Six-slice selector */}
          <div className="dish-sectors absolute inset-0" aria-hidden={isSelected}>
            {items.map(({ dish }, index) => {
              const mid = START + index * SPAN + SPAN / 2;
              const centre = point(mid, PHOTO_REACH / 100);
              return (
                <button
                  key={dish.id}
                  type="button"
                  aria-label={`${dish.name}: show its masala`}
                  tabIndex={isSelected ? -1 : 0}
                  onClick={() => onSelect(index)}
                  className="dish-slice absolute inset-0 block cursor-pointer outline-none"
                  style={{ clipPath: `url(#${clipId(index)})` }}
                >
                  <span
                    className="absolute block"
                    style={{
                      width: `${PHOTO_SIZE}%`,
                      height: `${PHOTO_SIZE}%`,
                      left: `${centre.x * 100 - PHOTO_SIZE / 2}%`,
                      top: `${centre.y * 100 - PHOTO_SIZE / 2}%`,
                    }}
                  >
                    <Image
                      src={dish.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 28vw, 60vw"
                      quality={90}
                      className="object-cover"
                      style={{
                        objectPosition: dish.focus ?? "50% 50%",
                        transform: dish.zoom ? `scale(${dish.zoom})` : undefined,
                      }}
                    />
                  </span>
                  {/* Hover / keyboard-focus outline, drawn inside the slice so the clip cannot hide it */}
                  <svg
                    viewBox="0 0 1 1"
                    className="dish-slice-ring pointer-events-none absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <path d={sectorPath(index)} fill="none" stroke="#FFF1D6" strokeWidth="0.03" strokeLinejoin="round" />
                  </svg>
                </button>
              );
            })}

            {/* Thin dark dividers (about 2.6px on the 720px desktop plate), on the same rotating body */}
            <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              {Array.from({ length: DISH_SLICE_COUNT }, (_, index) => {
                const end = point(START + index * SPAN, 0.5);
                return (
                  <line
                    key={`divider-${index}`}
                    x1="50"
                    y1="50"
                    x2={(end.x * 100).toFixed(3)}
                    y2={(end.y * 100).toFixed(3)}
                    stroke={DIVIDER}
                    strokeOpacity="0.92"
                    strokeWidth="0.4"
                  />
                );
              })}
            </svg>

            {/* Subtle centre hub */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border sm:h-4 sm:w-4"
              style={{
                borderColor: DIVIDER,
                background: "radial-gradient(circle at 35% 30%, #b98a52, #6b4423)",
                boxShadow: "0 1px 3px rgba(20,10,3,0.6)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Static lighting and bevels (never rotate, never block clicks) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full dish-sheen-rim" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[6%] rounded-full dish-sheen-well" />

      {/* The selected plate itself is the way back to the six-dish view */}
      <button
        type="button"
        onClick={onReset}
        aria-label={isSelected ? `${items[selected].dish.name} plate: show all six dishes` : "Show all six dishes"}
        tabIndex={isSelected ? 0 : -1}
        aria-hidden={!isSelected}
        className="dish-reset absolute inset-0 rounded-full outline-none focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-turmeric"
        style={{ pointerEvents: isSelected ? "auto" : "none", cursor: isSelected ? "pointer" : "default" }}
      />
    </div>
  );
}
