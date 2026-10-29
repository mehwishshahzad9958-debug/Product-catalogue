# RASAM image audit (2026-10-30)

Rendered checks were made at 2x (desktop 1440 px) and 3x (mobile 390 px) device pixel ratios.

## Fixed in code
| Cause | Fix |
|---|---|
| `page.tsx` pointed to `/images/hero%20background.png`; the file is `hero-background.png` -> 404, so the hero background never loaded. | Path corrected. |
| `blur-sd` is not a Tailwind class, so no blur was applied. | Changed to `blur-sm` (8px). Blur is now intentional and applies only to the background outside the hero card. |
| Next.js 16 only serves quality 75 unless `images.qualities` lists more; every pack, hero and dish photo was re-compressed at 75. | `next.config.ts`: `images.qualities: [75, 90]`; `quality={90}` on pack photos (ProductImage), hero collection, dish photos (platter), product hero slider. |
| Catalogue cards asked for `22vw` but render about 384 px wide at desktop. | `sizes` in ProductCard (detailed) corrected. |

## Source images that limit sharpness (not fixable in code)
Next.js never enlarges an image: the browser stretches these, so they look soft on the platter.
Replace with about 1200 x 1200 px photos (JPG or WebP, square, food filling the frame, no pan rim or watermark). Originals were not touched.

| File | Size now | Rendered (CSS px, 2x screens need double) | Note |
|---|---|---|---|
| dishes/Fruit Chart.png | 301 x 275 | about 450 | smallest; also zoomed 1.12x |
| dishes/Sambhar.png | 347 x 335 | about 450 | |
| dishes/Biryani.png | 375 x 447 | about 450 | |
| dishes/Paneer.png | 406 x 446 | about 450 | zoomed 1.3x to hide the pan rim |
| dishes/Shahi Paneer (2).png | 435 x 406 | about 450 | zoomed 1.2x to hide the pan rim |
| dishes/Chole.png | 455 x 360 | about 450 | |

Unused or problem files in dishes/: `Chole.jpg` (iStock watermark, not licensed), `Biryani (2).png` (checkerboard baked in), `Shahi Paneer.png`, `Shahi Paneer (1).png`.

## Checked and fine
- Pack photos: 800 x 1000 (fronts), 1200 x 1500 (backs); shown at most about 380 px wide. Sharp; `object-contain` keeps labels and proportions.
- `home-hero.webp` 1679 x 1318: sharp at 2x in the hero card (about 650 px wide).
- `hero-background.png` 363 KB and `spice-background.jpg` 1621 x 2576: intentionally soft/translucent backgrounds.
- No broken images or 404s; no console errors.

## Housekeeping (not changed)
`public/images` also holds files the site does not use: `blackmirch.png`, four `Screenshot ... .png` files, `star-anise-background.jpg` (still referenced by globals.css), `hero-spices.png` (2.4 MB, used by a product slider).
