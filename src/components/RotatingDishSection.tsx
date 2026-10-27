import Image from "next/image";
import InViewReveal from "@/components/InViewReveal";
import { getPlatterDishes } from "@/data/dishes";

/**
 * Rotating food platter, placed between the home hero and "Our range".
 *
 * Behaviour matches the reference (callories.com): one composition that turns clockwise on its own,
 * at a constant speed, with a gentle fade and scale-in the first time it comes into view. The platter
 * and all its dishes are one rotating layer, so they turn together; nothing spins independently.
 * Rotation is a plain CSS transform animation (see .dish-spin in globals.css); it pauses off screen
 * and is switched off for visitors who prefer reduced motion.
 *
 * The dishes come from src/data/dishes.ts: drop photos into public/images/dishes/ (see that file).
 */
/** Points of a pie wedge (in % of its square box, centre 50,50, radius 50) for clip-path. */
function wedgePolygon(centreDeg: number, spanDeg: number) {
  const steps = Math.max(4, Math.ceil(spanDeg / 3));
  const points = ["50% 50%"];
  for (let i = 0; i <= steps; i++) {
    const a = ((centreDeg - spanDeg / 2 + (spanDeg * i) / steps) * Math.PI) / 180;
    points.push(`${(50 + 50 * Math.cos(a)).toFixed(2)}% ${(50 + 50 * Math.sin(a)).toFixed(2)}%`);
  }
  return `polygon(${points.join(", ")})`;
}

export default function RotatingDishSection() {
  const dishes = getPlatterDishes();
  const count = dishes.length;
  const span = 360 / count;
  // First wedge is centred at the top; each following wedge is one step clockwise.
  const centreOf = (index: number) => -90 + index * span;

  // How much of the platter a dish photo covers (it is clipped to its wedge), by wedge size.
  const photoSize = count <= 4 ? 78 : count <= 6 ? 68 : 60;
  const photoReach = count <= 2 ? 24 : 27; // distance of the photo's centre from the plate centre, % of the plate

  return (
    <section aria-label="A platter of Indian dishes" className="relative overflow-x-clip px-6 py-14 sm:py-16 lg:py-24">
      {/* Soft ivory glow behind the platter: separates it from the photo and keeps it bright */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_75%_at_50%_50%,rgba(252,249,240,0.92)_0%,rgba(252,249,240,0.6)_55%,rgba(252,249,240,0)_100%)]"
      />
      <InViewReveal className="relative mx-auto w-[min(86vw,540px)] sm:w-[min(70vw,560px)] lg:w-[min(46vw,600px)]">
        <div className="dish-spin relative aspect-square w-full">
          {/* Platter: wooden rim, soft shadow for depth */}
          <div className="dish-platter absolute inset-0 rounded-full" />

          {/* Plate surface, divided into one wedge per dish */}
          <div className="dish-platter-inner absolute inset-[6%] overflow-hidden rounded-full">
            {dishes.map((dish, index) => {
              const centre = centreOf(index);
              const rad = (centre * Math.PI) / 180;
              const left = 50 + photoReach * Math.cos(rad);
              const top = 50 + photoReach * Math.sin(rad);
              return (
                <div
                  key={dish.key}
                  className="absolute inset-0"
                  style={count > 1 ? { clipPath: wedgePolygon(centre, span) } : undefined}
                >
                  {dish.src ? (
                    <div
                      className="absolute"
                      style={{
                        width: `${photoSize}%`,
                        height: `${photoSize}%`,
                        left: `${left}%`,
                        top: `${top}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Image
                        src={dish.src}
                        alt={dish.alt}
                        fill
                        sizes="(min-width: 1024px) 380px, 60vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div aria-hidden="true" className={index % 2 === 0 ? "absolute inset-0 bg-[#fff3dc]/10" : "absolute inset-0 bg-[#2b1708]/15"} />
                  )}
                </div>
              );
            })}

            {/* Dotted white dividers between the wedges */}
            {count > 1 && (
              <svg aria-hidden="true" viewBox="0 0 100 100" className="dish-dividers pointer-events-none absolute inset-0 h-full w-full">
                {dishes.map((dish, index) => {
                  const a = ((centreOf(index) - span / 2) * Math.PI) / 180;
                  return (
                    <line
                      key={dish.key}
                      x1="50"
                      y1="50"
                      x2={50 + 50 * Math.cos(a)}
                      y2={50 + 50 * Math.sin(a)}
                      stroke="#fff"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeDasharray="0.01 2.4"
                    />
                  );
                })}
                <circle cx="50" cy="50" r="2" fill="#fff" />
              </svg>
            )}
          </div>
        </div>
      </InViewReveal>
    </section>
  );
}
