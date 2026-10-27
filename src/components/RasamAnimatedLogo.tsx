
"use client";

import Image from "next/image";
import { useRef } from "react";
import "./RasamAnimatedLogo.css";

/**
 * A pressure-cooker whistle made with the Web Audio API (no audio file needed): a shrill rising
 * "pheeee" with the flutter of the rattling weight, over a hiss of escaping steam.
 * Browsers only allow sound after the visitor has interacted with the page (a click, tap or key
 * press), so hovering plays it once that has happened, and clicking or tapping the logo always can.
 */
const WHISTLE_SECONDS = 2.2;

function noiseSource(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  return src;
}

function playWhistle(ctx: AudioContext) {
  const now = ctx.currentTime;
  const end = now + WHISTLE_SECONDS;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.1, now + 0.12);
  master.gain.setValueAtTime(0.1, end - 0.7);
  master.gain.exponentialRampToValueAtTime(0.0001, end);
  master.connect(ctx.destination);

  // The weight rattling makes the whistle flutter in loudness
  const body = ctx.createGain();
  body.gain.value = 0.8;
  const rattle = ctx.createOscillator();
  rattle.frequency.value = 9;
  const rattleDepth = ctx.createGain();
  rattleDepth.gain.value = 0.2;
  rattle.connect(rattleDepth).connect(body.gain);
  body.connect(master);

  // Whistle: shoots up to a shrill pitch, wavers, then sags as the steam dies down
  const fundamental = ctx.createOscillator();
  fundamental.type = "triangle";
  fundamental.frequency.setValueAtTime(2300, now);
  fundamental.frequency.exponentialRampToValueAtTime(3350, now + 0.25);
  fundamental.frequency.linearRampToValueAtTime(3150, end - 0.7);
  fundamental.frequency.linearRampToValueAtTime(2750, end);
  const overtone = ctx.createOscillator();
  overtone.type = "sine";
  overtone.frequency.setValueAtTime(4600, now);
  overtone.frequency.exponentialRampToValueAtTime(6700, now + 0.25);
  overtone.frequency.linearRampToValueAtTime(6300, end - 0.7);
  overtone.frequency.linearRampToValueAtTime(5500, end);
  const overtoneGain = ctx.createGain();
  overtoneGain.gain.value = 0.25;

  // Pitch wobble from the turbulent airflow
  const wobble = ctx.createOscillator();
  wobble.frequency.value = 6.5;
  const wobbleDepth = ctx.createGain();
  wobbleDepth.gain.value = 55;
  wobble.connect(wobbleDepth);
  wobbleDepth.connect(fundamental.frequency);
  const wobbleHigh = ctx.createGain();
  wobbleHigh.gain.value = 110;
  wobble.connect(wobbleHigh).connect(overtone.frequency);

  fundamental.connect(body);
  overtone.connect(overtoneGain).connect(body);

  // Air blowing across the whistle, tuned around its pitch
  const breath = noiseSource(ctx, WHISTLE_SECONDS);
  const breathBand = ctx.createBiquadFilter();
  breathBand.type = "bandpass";
  breathBand.frequency.value = 3200;
  breathBand.Q.value = 5;
  const breathGain = ctx.createGain();
  breathGain.gain.value = 0.55;
  breath.connect(breathBand).connect(breathGain).connect(master);

  // Steam hiss underneath
  const steam = noiseSource(ctx, WHISTLE_SECONDS);
  const steamHigh = ctx.createBiquadFilter();
  steamHigh.type = "highpass";
  steamHigh.frequency.value = 4500;
  const steamGain = ctx.createGain();
  steamGain.gain.value = 0.22;
  steam.connect(steamHigh).connect(steamGain).connect(master);

  for (const node of [fundamental, overtone, wobble, rattle, breath, steam]) {
    node.start(now);
    node.stop(end);
  }
}

type RasamAnimatedLogoProps = {
  className?: string;
};

export default function RasamAnimatedLogo({
  className = "",
}: RasamAnimatedLogoProps) {
  const ctxRef = useRef<AudioContext | null>(null);
  const lastPlayedRef = useRef(0);

  const whistle = () => {
    const now = Date.now();
    if (now - lastPlayedRef.current < 2600) return; // one whistle per hover, not a stream
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = (ctxRef.current ??= new Ctor());
      void ctx.resume().then(() => {
        // Still suspended means the browser has not allowed sound yet: stay silent.
        if (ctx.state !== "running") return;
        lastPlayedRef.current = Date.now();
        playWhistle(ctx);
      });
    } catch {
      /* sound is a bonus; never break the logo if audio is unavailable */
    }
  };

  return (
    <div
      onPointerEnter={whistle}
      onClick={whistle}
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
