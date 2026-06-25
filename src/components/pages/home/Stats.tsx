"use client";

import NumberFlow, { useCanAnimate } from "@number-flow/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type RefObject,
} from "react";

import { Image } from "@/components/shared/Image";
import { cn } from "@/lib/utils";

/**
 * Four floating thumbnails sit at the corners of the headline block but are
 * intentionally translated *outward* (large +/- em offsets) so they overflow
 * the central text container, exactly like the reference design.
 *
 * Each badge’s `left` / `right` inset interpolates from start (close, scroll top)
 * to end (outer, scroll down) on mobile, tablet, and desktop.
 */
type CornerInset = { start: number; end: number };
type ViewportTier = "mobile" | "md" | "lg";

const CORNER_IMAGES: {
  src: string;
  alt: string;
  positionClass: string;
  baseDx: string;
  rotateZ: number;
  delayMs: number;
  anchor: "left" | "right";
  inset: Record<ViewportTier, CornerInset>;
}[] = [
  {
    src: "/images/20.png",
    alt: "Podcast Editing",
    positionClass: "top-0",
    baseDx: "-9.2841em",
    rotateZ: 10,
    delayMs: 120,
    anchor: "left",
    inset: {
      mobile: { start: 52, end: 0 },
      md: { start: 88, end: 12 },
      lg: { start: 140, end: 80 },
    },
  },
  {
    src: "/images/19.png",
    alt: "Short Form Content",
    positionClass: "top-0",
    baseDx: "6.1894em",
    rotateZ: -10,
    delayMs: 180,
    anchor: "right",
    inset: {
      mobile: { start: 48, end: 0 },
      md: { start: 82, end: 14 },
      lg: { start: 130, end: 30 },
    },
  },
  {
    src: "/images/18.png",
    alt: "Ad Creatives & VSL",
    positionClass: "top-18",
    baseDx: "-6.1894em",
    rotateZ: -10,
    delayMs: 240,
    anchor: "left",
    inset: {
      mobile: { start: 56, end: 0 },
      md: { start: 96, end: 6 },
      lg: { start: 150, end: 10 },
    },
  },
  {
    src: "/images/21.png",
    alt: "Youtube Videos",
    positionClass: "top-18",
    baseDx: "8.66516em",
    rotateZ: 13,
    delayMs: 300,
    anchor: "right",
    inset: {
      mobile: { start: 56, end: 0 },
      md: { start: 96, end: 18 },
      lg: { start: 150, end: 40 },
    },
  },
];

/** progress 0 = start (close), 1 = end (outer). */
function insetPx({ start, end }: CornerInset, progress: number) {
  return start + (end - start) * clamp01(progress);
}

/**
 * Badge horizontal scrub tied to the stats section (not headline text fade).
 * 0 = section top at enter line (close badges), 1 = scrolled down (outer badges).
 */
function computeCornerImageProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  if (vh <= 0) return 0;

  const enterTop = vh * 0.92;
  const outerTop = vh * 0.2;
  return clamp01((enterTop - rect.top) / (enterTop - outerTop));
}

const HEADLINE_LINES = [
  "Tired of boring video content that",
  "don\u2019t stand out? It\u2019s time to upgrade",
  "the game with us!",
];

const STATS: { value: number; unit: string; label: string; sub: string }[] = [
  { value: 200, unit: "%", label: "More Engagement", sub: "Viral Edits" },
  { value: 5, unit: "X", label: "More Reach", sub: "Strategic Distribution" },
  { value: 50, unit: "%", label: "More Leads", sub: "Automated Systems" },
];

const MUTED_ALPHA = 0.25;
const STRONG_ALPHA = 0.98;

/** Headline vertical travel while scrolling (matches reference scrub). */
const HEADLINE_ENTER_CENTER_Y = 0.9;
const HEADLINE_SETTLED_CENTER_Y = 0.44;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** Hermite smoothstep for soft ramps between scroll thresholds. */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * 0 → 1 as the headline block scrolls from lower viewport into the centered
 * “hero” position (reference recording / Webflow IX scrub).
 */
function computeHeadlineScrollProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  if (vh <= 0) return 0;

  const centerY = rect.top + rect.height / 2;
  const enterY = vh * HEADLINE_ENTER_CENTER_Y;
  const settledY = vh * HEADLINE_SETTLED_CENTER_Y;
  return clamp01((enterY - centerY) / (enterY - settledY));
}

/** Section scrub for stat counters (runs slightly after headline settles). */
function computeSectionScrollProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  if (vh <= 0) return 0;

  const start = vh * 0.82;
  const end = vh * 0.18;
  return clamp01((start - rect.top) / (start - end));
}

function subscribeViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportTierSnapshot(): ViewportTier {
  const w = window.innerWidth;
  if (w >= 1024) return "lg";
  if (w >= 768) return "md";
  return "mobile";
}

function getViewportTierServerSnapshot(): ViewportTier {
  return "mobile";
}

function useViewportTier(): ViewportTier {
  return useSyncExternalStore(
    subscribeViewport,
    getViewportTierSnapshot,
    getViewportTierServerSnapshot,
  );
}

function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  compute: (el: HTMLElement) => number,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setProgress(reduced ? 1 : compute(el)));
    };

    tick();

    if (reduced) {
      return () => cancelAnimationFrame(raf);
    }

    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    const ro = new ResizeObserver(tick);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      ro.disconnect();
    };
  }, [ref, compute]);

  return progress;
}

function useSectionStats(ref: RefObject<HTMLElement | null>): {
  sectionProgress: number;
  maxReveal: number[];
} {
  const [state, setState] = useState(() => ({
    sectionProgress: 0,
    maxReveal: STATS.map(() => 0),
  }));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const progress = reduced ? 1 : computeSectionScrollProgress(el);
        setState((prev) => {
          let changed = prev.sectionProgress !== progress;
          const nextMax = prev.maxReveal.map((m, i) => {
            const r = smoothstep(0.48 + i * 0.07, 0.72 + i * 0.07, progress);
            if (r > m) {
              changed = true;
              return r;
            }
            return m;
          });
          return changed
            ? { sectionProgress: progress, maxReveal: nextMax }
            : prev;
        });
      });
    };

    tick();

    if (reduced) {
      return () => cancelAnimationFrame(raf);
    }

    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    const ro = new ResizeObserver(tick);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      ro.disconnect();
    };
  }, [ref]);

  return state;
}

/** Line-by-line white reveal while scrolling; all lines white once headline is settled. */
function lineWhiteMix(lineIndex: number, p: number): number {
  if (p >= 0.96) return 1;

  if (lineIndex === 0) return smoothstep(0.12, 0.42, p);
  if (lineIndex === 1) return smoothstep(0.34, 0.64, p);
  return smoothstep(0.56, 0.92, p);
}

function lineColorStyle(mix: number): CSSProperties {
  const opacity = MUTED_ALPHA + (STRONG_ALPHA - MUTED_ALPHA) * mix;
  return {
    opacity,
    transition: "opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
  };
}

export function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const headlineProgress = useScrollProgress(headlineRef, computeHeadlineScrollProgress);
  const cornerProgress = useScrollProgress(sectionRef, computeCornerImageProgress);
  /** sectionProgress + latched 0–1 per stat (counts never run backwards on scroll-up). */
  const { sectionProgress, maxReveal } = useSectionStats(sectionRef);
  const canAnimate = useCanAnimate({ respectMotionPreference: true });

  const viewportTier = useViewportTier();
  const lineMixes = HEADLINE_LINES.map((_, i) => lineWhiteMix(i, headlineProgress));

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-8 md:py-10">
      <div className="relative container mx-auto w-full px-6 md:px-8">
        <div ref={headlineRef} className="z-10 transform-3d text-center -space-y-2.5">
          {HEADLINE_LINES.map((text, i) => (
            <h2
              key={text}
              className="font-lato text-[30px] font-semibold md:text-[38px]"
              style={lineColorStyle(lineMixes[i])}
            >
              {text}
            </h2>
          ))}
        </div>

        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 transform-3d">
          {CORNER_IMAGES.map((img) => {
            const inset = insetPx(img.inset[viewportTier], cornerProgress);
            const anchorStyle: CSSProperties =
              img.anchor === "left" ? { left: inset } : { right: inset };

            const transform = `translate3d(${img.baseDx}, 0, 0) scale3d(1,1,1) rotateX(0deg) rotateY(0deg) rotateZ(${img.rotateZ}deg)`;
            const style: CSSProperties = {
              ...anchorStyle,
              transform,
              opacity: 1,
              transformStyle: "preserve-3d",
              willChange: "transform, left, right",
            };
            return (
              <div
                key={img.src}
                className={cn(
                  "absolute z-1 w-[200px] max-w-[200px] overflow-visible rounded-[20px] bg-transparent motion-reduce:transition-none",
                  "max-md:w-[120px] max-[479px]:w-[88px]",
                  img.positionClass,
                )}
                style={style}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={200}
                  height={200}
                  sizes="(min-width: 1024px) 200px, (min-width: 768px) 120px, 88px"
                  className="h-auto w-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Stats — mobile: stack; tablet (md–lg): 2 + 1 boxed grid like design; lg+: one row */}
        <ul
          className={cn(
            "relative z-10 mx-auto mt-16 grid w-full max-w-[920px] grid-cols-1 gap-6 px-2 md:mt-24 md:grid-cols-2 md:gap-4 md:px-4",
            "lg:grid-cols-3 lg:gap-8 lg:px-2",
          )}
        >
          {STATS.map((stat, i) => {
            const reveal = smoothstep(0.48 + i * 0.07, 0.72 + i * 0.07, sectionProgress);
            const flowValue = canAnimate
              ? Math.round(stat.value * (maxReveal[i] ?? 0))
              : stat.value;
            const isFirst = i === 0;
            const isSecond = i === 1;
            const isThird = i === 2;

            return (
              <li
                key={stat.label}
                className={cn(
                  "flex flex-col gap-3 p-5 md:p-6",
                  "items-center text-center md:items-start md:text-left",
                  isSecond && "md:items-end md:text-right",
                  isThird &&
                    "md:col-span-2 md:items-center md:text-center md:justify-self-center md:w-[calc(50%-0.5rem)]",
                  isSecond &&
                    "lg:col-span-1 lg:items-start lg:text-left lg:justify-self-auto lg:w-auto",
                  isThird && "lg:col-span-1 lg:items-start lg:text-left lg:w-auto",
                )}
                style={{
                  opacity: reveal,
                  transform: `translate3d(0, ${(1 - reveal) * 24}px, 0)`,
                  transition:
                    "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease-out",
                }}
              >
                <div
                  className={cn(
                    "flex items-start gap-3 pb-2",
                    isSecond && "md:flex-row-reverse md:justify-end",
                    isThird && "md:justify-center",
                  )}
                >
                  <div
                    className={cn("mt-1 lg:mt-3", isThird && "md:mt-0")}
                    aria-label={`${stat.value}${stat.unit}`}
                  >
                    <NumberFlow
                      value={flowValue}
                      className={cn(
                        "font-lato text-[44px] font-bold leading-[0.85] tracking-tight text-white md:text-[42px] lg:text-[55px]",
                        "tabular-nums",
                      )}
                    />
                  </div>
                  <div className={cn(isSecond && "md:text-right")}>
                    <p className="font-lato text-2xl font-semibold leading-none text-white md:text-[26px] lg:text-[38px]">
                      {stat.unit}
                    </p>
                    <p className="mt-1 font-lato text-base font-medium text-white">{stat.label}</p>
                  </div>
                </div>

                <p
                  className={cn(
                    "font-lato text-[18px] font-semibold tracking-wide text-[#fff9]",
                    isFirst && "md:self-start",
                    isSecond && "md:self-end",
                    isThird && "md:self-center",
                    "lg:self-start",
                  )}
                >
                  {stat.sub}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
