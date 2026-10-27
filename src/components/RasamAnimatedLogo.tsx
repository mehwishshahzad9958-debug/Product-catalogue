
"use client";

import Image from "next/image";
import "./RasamAnimatedLogo.css";

type RasamAnimatedLogoProps = {
  className?: string;
};

export default function RasamAnimatedLogo({
  className = "",
}: RasamAnimatedLogoProps) {
  return (
    <div
      className={`rasam-animation ${className}`}
      role="img"
      aria-label="Rasam Spices pot logo with a whistling, opening lid"
    >
      {/* Lower pot: keeps the original wordmark stationary */}
      <Image
        src="/images/rasam-logo.png"
        alt=""
        width={428}
        height={235}
        priority
        className="rasam-animation__base"
      />

      {/* Steam rises as the pot whistles */}
      <div className="rasam-animation__steam" aria-hidden="true">
        <span className="steam steam--one" />
        <span className="steam steam--two" />
        <span className="steam steam--three" />
      </div>

      {/* Cropped from the original logo so its lid moves independently */}
      <Image
        src="/images/rasam-logo.png"
        alt=""
        width={428}
        height={235}
        priority
        className="rasam-animation__lid"
      />
    </div>
  );
}
