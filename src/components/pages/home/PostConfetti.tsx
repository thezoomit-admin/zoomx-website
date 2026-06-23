"use client";

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";

const CONFETTI_SRC = "/lottie/confetti.json";

/** Brand purples — matches Navbar / Process badges */
const BRAND_DARK: [number, number, number] = [0x5c / 255, 0x2e / 255, 0x9d / 255];
const BRAND_LIGHT: [number, number, number] = [0x7c / 255, 0x49 / 255, 0x9d / 255];

function isLottieRgba(k: unknown): k is [number, number, number, number] {
  return (
    Array.isArray(k) && k.length === 4 && k.every((v) => typeof v === "number" && v >= 0 && v <= 1)
  );
}

function toBrandRgba(k: [number, number, number, number]): [number, number, number, number] {
  const [r, g, b, a] = k;
  const lum = (r + g + b) / 3;
  const brand = lum < 0.35 ? BRAND_DARK : BRAND_LIGHT;
  return [brand[0], brand[1], brand[2], a];
}

function recolorConfetti(data: unknown): unknown {
  if (Array.isArray(data)) return data.map(recolorConfetti);
  if (!data || typeof data !== "object") return data;

  const obj = data as Record<string, unknown>;
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === "c" && value && typeof value === "object" && "k" in value) {
      const color = value as { a?: number; k?: unknown };
      if (isLottieRgba(color.k)) {
        out[key] = { ...color, k: toBrandRgba(color.k) };
        continue;
      }
    }
    out[key] = recolorConfetti(value);
  }

  return out;
}

export function PostConfetti() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    fetch(CONFETTI_SRC)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(recolorConfetti(data) as object);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !animationData || reducedMotion) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [animationData, reducedMotion]);

  useEffect(() => {
    if (!animationData || reducedMotion) return;
    if (inView) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  }, [inView, animationData, reducedMotion]);

  if (reducedMotion || !animationData) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none  absolute inset-0 z-[5] h-full w-full overflow-visible"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={inView}
        className="h-full w-full scale-[1.18] relative bottom-[-40px] left-[-100px] sm:scale-100"
      />
    </div>
  );
}
