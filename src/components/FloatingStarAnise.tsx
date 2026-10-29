import { existsSync } from "node:fs";
import path from "node:path";
import FloatingStarAniseLink from "@/components/FloatingStarAniseLink";

/** Photograph supplied by the site owner. If the file is missing, the button is simply not rendered. */
const IMAGE_PATH = "/images/star-anise-floating.png";

/**
 * Floating shortcut to the Products page (rendered once, from the root layout).
 * Server component: it only checks that the image exists, then hands over to the client link.
 */
export default function FloatingStarAnise() {
  const exists = existsSync(path.join(process.cwd(), "public", IMAGE_PATH));
  if (!exists) return null;
  return <FloatingStarAniseLink src={IMAGE_PATH} />;
}
