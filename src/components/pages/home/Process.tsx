"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import { PostConfetti } from "@/components/pages/home/PostConfetti";
import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";
import { ANIMATION_KITS, type AnimationKit } from "@/lib/animationKits";
import { cn } from "@/lib/utils";

// const GLOW = "/67b5dd36b3452df31baf9345_Glow.avif";
const GLOW = "/images/glow.png";

/** Viewport center = stacked; ±20vh band; spread toward top (Webflow) */
const THUMB_GROUP_X_CENTER = 1;
const THUMB_GROUP_X_SPREAD = 55.392;
const THUMB_SCROLL_BAND_VH = 0.2;

const THUMB_TRANSFORM_BASE =
  "scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

type ThumbKeyframe = {
  groupX: number;
  backY: number;
  frontX: number;
  frontY: number;
  frontRotate: number;
  iconLeft: number;
  iconY: number;
};

/** Bottom = stacked center; top = spread (Webflow end) */
const THUMB_KEYFRAMES: ThumbKeyframe[] = [
  { groupX: 1, backY: 0, frontX: 0, frontY: 0, frontRotate: 0, iconLeft: 44, iconY: 28 },
  {
    groupX: 8,
    backY: -12,
    frontX: 10,
    frontY: -10,
    frontRotate: -4,
    iconLeft: 45,
    iconY: 10,
  },
  {
    groupX: 12,
    backY: -23.1977,
    frontX: 18.0386,
    frontY: -19.5669,
    frontRotate: -7,
    iconLeft: 47,
    iconY: -8,
  },
  {
    groupX: 17,
    backY: -28,
    frontX: 20,
    frontY: -21,
    frontRotate: -10,
    iconLeft: 49,
    iconY: -28,
  },
  {
    groupX: 21.3253,
    backY: -33.1977,
    frontX: 23.0386,
    frontY: -24.5669,
    frontRotate: -12,
    iconLeft: 52,
    iconY: -56,
  },
];

/** 0 → 1 as the viewport center scrolls from the top of `el` to its bottom. */
function computeLineFillProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  if (vh <= 0 || rect.height <= 0) return 0;
  const viewportCenter = vh * 0.45;
  const scrolled = viewportCenter - rect.top;
  return clamp01(scrolled / rect.height);
}

/** Visual box center vs viewport center (+ = below center / scroll toward top) */
function computeThumbnailViewportOffset(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  if (vh <= 0) return 0;
  return rect.top + rect.height / 2 - vh / 2;
}

function clampThumbOffsetT(offsetPx: number, bandPx: number): number {
  if (bandPx <= 0) return 0;
  return Math.min(1, Math.max(-1, offsetPx / bandPx));
}

/** Center 1%; scroll toward top → 55.392%; toward bottom → 1% (stacked) */
function mapThumbnailGroupX(offsetPx: number, bandPx: number): number {
  const t = clampThumbOffsetT(offsetPx, bandPx);
  if (t >= 0) return lerp(THUMB_GROUP_X_CENTER, THUMB_GROUP_X_SPREAD, t);
  return THUMB_GROUP_X_CENTER;
}

/** 0 = bottom/stacked, 0.5 = center, 1 = top/spread */
function mapThumbnailScrubFromOffset(offsetPx: number, bandPx: number): number {
  const t = clampThumbOffsetT(offsetPx, bandPx);
  return (t + 1) / 2;
}

function interpolateThumbKeyframes(t: number): ThumbKeyframe {
  const n = THUMB_KEYFRAMES.length - 1;
  const pos = clamp01(t) * n;
  const i = Math.min(Math.floor(pos), n - 1);
  const u = pos - i;
  const a = THUMB_KEYFRAMES[i];
  const b = THUMB_KEYFRAMES[i + 1];

  return {
    groupX: lerp(a.groupX, b.groupX, u),
    backY: lerp(a.backY, b.backY, u),
    frontX: lerp(a.frontX, b.frontX, u),
    frontY: lerp(a.frontY, b.frontY, u),
    frontRotate: lerp(a.frontRotate, b.frontRotate, u),
    iconLeft: lerp(a.iconLeft, b.iconLeft, u),
    iconY: lerp(a.iconY, b.iconY, u),
  };
}

/** Process glow — #7c499d (inner) → #5c2e9d (outer) */
export const PROCESS_GLOW_BG = `radial-gradient(circle at center,
  rgba(124, 73, 157, 0.82) 8%,
  rgba(124, 73, 157, 0.58) 32%,
  rgba(110, 46, 157, 0.44) 52%,
  rgba(92, 46, 157, 0.26) 68%,
  rgba(92, 46, 157, 0.09) 78%,
  transparent 100%)`;

function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  compute: (el: HTMLElement) => number,
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const id = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        setProgress(compute(node));
      });
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    document.addEventListener("scroll", tick, { passive: true });
    const ro = new ResizeObserver(tick);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      document.removeEventListener("scroll", tick);
      ro.disconnect();
    };
  }, [ref, compute]);

  return progress;
}

type ProcessStep = {
  num: string;
  badge: string;
  title: string;
  description: string;
  textOnLeft: boolean;
  visual: ReactNode;
};

function ProcessBadge({ children }: { children: string }) {
  return (
    <span className="w-fit inline-flex rounded-[9px] bg-gradient-to-r from-[#5c2e9d] to-[#7c499d] px-3.5 py-2 font-syne text-[13px] font-semibold uppercase tracking-wide text-white shadow-[0_4px_9px_rgba(124, 73, 157,0.12)]">
      {children}
    </span>
  );
}

function ProcessText({
  badge,
  title,
  description,
}: Pick<ProcessStep, "badge" | "title" | "description">) {
  return (
    <div className="relative z-10 flex max-w-[350px] flex-col items-center justify-center lg:items-start gap-5 md:gap-6">
      <ProcessBadge>{badge}</ProcessBadge>
      <h3 className="text-center lg:text-left font-syne text-[clamp(1.35rem,2.8vw,1.75rem)] font-semibold leading-tight text-white">
        {title}
      </h3>
      <p className="max-w-[280px] text-center lg:text-left font-syne text-[15px] leading-[1.47] text-[#ffffff8a] md:text-base">
        {description}
      </p>
    </div>
  );
}

function ProcessGlow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex min-h-[260px] w-full items-center justify-center sm:min-h-[300px] md:min-h-[400px]",
        className,
      )}
    >
      <Image
        src={GLOW}
        alt=""
        width={520}
        height={520}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
        style={{
          background: PROCESS_GLOW_BG,
          filter: "blur(28px)",
        }}
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

function StepMarker({ num }: { num: string }) {
  return (
    <div
      className="relative z-20 flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-linear-to-b from-[#1e0e34] to-[#3b1556] font-syne text-lg font-semibold text-white shadow-[0_0_45px_rgba(124,73,157,0.35)]"
      aria-hidden
    >
      {num}
    </div>
  );
}

function IdeationVisual() {
  return (
    <ProcessGlow>
      <div className="relative mx-auto aspect-[4/3] w-full max-w-[400px]">
        <Image
          alt="coaches"
          src="/images/06.png"
          width={52}
          height={52}
          className="absolute left-[13%] top-[32%] z-[5] h-[52px] w-auto rotate-[9deg] rounded-full shadow-[0_9px_20px_-2px_rgba(102, 39, 107, 0.57)] md:h-[50px]"
        />
        <Image
          src="/images/08.png"
          alt="personal brand"
          width={52}
          height={52}
          className="absolute left-[48%] top-[28%] z-[4] h-[52px] w-auto -rotate-[20deg] rounded-full shadow-[0_9px_20px_-2px_rgba(102, 39, 107, 0.57)] md:h-[50px]"
        />
        <Image
          alt="ecommerce"
          src="/images/07.png"
          width={52}
          height={52}
          className="absolute left-[8%] top-[58%] z-[3] h-[52px] w-auto -rotate-[18deg] rounded-full shadow-[0_9px_20px_-2px_rgba(102, 39, 107, 0.57)] md:h-[50px]"
        />
        <Image
          src="/images/09.png"
          alt="fashion"
          width={52}
          height={52}
          className="absolute left-[50%] top-[56%] z-[1] h-[52px] w-auto rotate-[18deg] rounded-full shadow-[0_9px_20px_-2px_rgba(102, 39, 107, 0.57)] md:h-[50px]"
        />
      </div>
    </ProcessGlow>
  );
}

const SCRIPTING_WORDS = ["Value", "Hook", "Story", "Script", "Angle"] as const;
const SCRIPTING_WORD_CYCLE_MS = 2600;

const scriptingWordVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const scriptingLetterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "tween",
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.35,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(6px)",
    transition: {
      type: "tween",
      ease: [0.4, 0, 0.6, 1],
      duration: 0.3,
    },
  },
};

function ScriptingVisual() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => (prev + 1) % SCRIPTING_WORDS.length);
    }, SCRIPTING_WORD_CYCLE_MS);

    return () => clearInterval(intervalId);
  }, []);

  const currentWord = SCRIPTING_WORDS[index];

  return (
    <ProcessGlow className="md:min-h-[400px]">
      <motion.div
        className="relative mx-auto flex w-full max-w-[440px] flex-col items-center gap-7 px-2 py-4 sm:gap-8 lg:block lg:min-h-[380px] lg:gap-0 lg:px-0 lg:py-0"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
          style={{
            background: PROCESS_GLOW_BG,
            filter: "blur(28px)",
          }}
        />
        <div className="relative z-[4] flex w-full max-w-full flex-row items-start justify-center gap-3 sm:gap-4 lg:contents">
          <div className="relative w-[min(46%,200px)] shrink-0 lg:absolute lg:left-[4%] lg:top-[6%] lg:w-[46%] lg:max-w-[185px]">
            <Image
              src="/67b6daa5744c735ff068b073_input%20box.png"
              alt=""
              width={185}
              height={60}
              className="pointer-events-none w-full select-none"
            />
            <div
              className="absolute left-[6%] top-1/2 flex min-w-[4.5rem] -translate-y-1/2 items-center sm:left-[7%] justify-start gap-4"
              aria-live="polite"
            >
              <div className="bg-white/5 rounded-md p-1.5">
                <FileText />
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWord}
                  variants={scriptingWordVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative inline-flex font-syne text-[14px] font-semibold tracking-tight text-white sm:text-[20px]"
                >
                  {currentWord.split("").map((char, i) => (
                    <motion.span
                      key={`${currentWord}-${i}`}
                      variants={scriptingLetterVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </AnimatePresence>
              <span
                className="relative ml-0.5 inline-block h-[1.05em] w-px shrink-0 animate-pulse bg-white"
                aria-hidden
              />
            </div>
          </div>

          <Image
            src="/images/11.png"
            alt=""
            width={350}
            height={350}
            className="relative min-w-0 flex-1 max-w-[min(54%,280px)] object-contain object-left-top lg:absolute lg:right-0 lg:top-[4%] lg:w-[62%] lg:max-w-[350px] lg:flex-none"
          />
        </div>

        <div className="relative z-[2] w-[min(92%,350px)] lg:absolute lg:bottom-[2%] lg:left-1/2 lg:w-[min(90%,350px)] lg:-translate-x-1/2">
          <div className="relative w-full">
            <Image
              src="/images/05.png"
              alt=""
              width={350}
              height={200}
              className="block w-full shadow-[0_-5px_24px_-12px_rgba(102,39,107,0.5)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute rounded-b-md inset-0 bg-[linear-gradient(180deg,transparent_37%,#090909_100%,#090909)]"
            />
          </div>
        </div>
      </motion.div>
    </ProcessGlow>
  );
}

function EditingVisual() {
  return (
    <ProcessGlow>
      <div className="relative mx-auto aspect-[5/4] w-full  md:max-w-[440px] sm:min-h-[400px] lg:min-h-0">
        <div className="absolute bottom-[-1%] left-1/2 z-[6] w-full md:w-[min(100%,420px)] max-w-[95%] -translate-x-1/2 lg:left-[20%] lg:w-[300px] lg:max-w-[72%] lg:translate-x-0">
          <div className="relative w-full">
            <Image
              src="/images/03.png"
              alt=""
              width={420}
              height={300}
              className="block h-auto w-full max-h-[min(420px,68vh)] object-contain lg:max-h-[300px]"
            />
          </div>
        </div>
        <Image
          src="/images/16.png"
          alt=""
          width={200}
          height={200}
          className="absolute left-[25%] top-[14%] z-[3] h-[200px] w-auto shadow-[0_-5px_24px_-12px_rgba(102,39,107,0.5)]"
        />
        <Image
          src="/images/04.png"
          alt=""
          width={120}
          height={120}
          className="absolute left-[38%] top-[18%] lg:top-[22%] z-[3] w-[38%] max-w-[120px] h-auto"
        />
        <Image
          src="/images/02.png"
          alt=""
          width={80}
          height={80}
          className="absolute right-[20%] top-[30%] lg:top-[44%] z-[3] w-[26%] max-w-[80px] h-auto"
        />
      </div>
    </ProcessGlow>
  );
}

function ThumbnailVisual() {
  const trackRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const offset = useScrollProgress(visualRef, computeThumbnailViewportOffset);
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const bandPx = vh * THUMB_SCROLL_BAND_VH;
  const groupX = mapThumbnailGroupX(offset, bandPx);
  const k = interpolateThumbKeyframes(mapThumbnailScrubFromOffset(offset, bandPx));

  return (
    <div ref={trackRef} className="relative w-full">
      <motion.div
        ref={visualRef}
        className="relative top-[-4%] lg:left-[-11%]  flex h-[500px] lg:w-[min(600px,100%+11%)] items-center justify-center lg:justify-start overflow-hidden"
      >
        <div className="relative top-[8%] flex lg:w-[500px] lg:min-w-[500px] w-[300px] min-w-[300px] items-end justify-center overflow-visible">
          <div
            className="absolute right-[16%] z-10 flex h-full lg:w-[150%] w-[100%] items-center justify-center gap-[42px]"
            style={{
              willChange: "transform",
              transform: `translate3d(${groupX}%, 0px, 0px) ${THUMB_TRANSFORM_BASE}`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/67debd0be7a053c01e6bb522_Iman%20gadzhi.avif"
              loading="lazy"
              alt=""
              width={300}
              height={200}
              className="relative z-[1] h-[200px] max-h-[200px] w-full rounded-[20px] object-cover"
            />

            <Image
              src="/68aab8c5bd9a46b617d22132_image%202_cmp.avif"
              loading="lazy"
              alt=""
              width={300}
              height={200}
              className="relative z-[2] h-[200px] max-h-[200px] w-full rounded-[20px] object-cover -rotate-[12deg]"
            />
          </div>

          <div
            className="absolute top-[18%] z-[4] w-[100px]"
            style={{
              left: `${k.iconLeft}%`,
              willChange: "transform",
              transform: `translate3d(-50%, ${k.iconY}px, 0px) scale3d(1, 1, 1) rotateZ(12deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/67b707fc23c7175ae432a4ca_Thumbnail%20icon.avif"
              loading="lazy"
              alt=""
              width={100}
              height={100}
              className="w-full h-auto"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/3 md:left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
            style={{
              background: PROCESS_GLOW_BG,
              filter: "blur(28px)",
            }}
          />

          <Image
            src={GLOW}
            loading="lazy"
            alt=""
            width={420}
            height={420}
            className="pointer-events-none absolute left-1/3 md:left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-[linear-gradient(90deg,#090909,#d8d8d800_18%,transparent_50%,#e1e1e100_81%,#090909),radial-gradient(circle_farthest-side_at_50%_0%,transparent_56%,#fff0_60%,#09090936_80%,#090909_96%)]"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}

function PostVisual() {
  return (
    <ProcessGlow className="md:min-h-[420px]">
      <div className="relative mx-auto aspect-square w-full max-w-[420px] min-h-[280px] sm:min-h-[320px] md:min-h-[380px]">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full z-[5] opacity-90"
          style={{
            background: PROCESS_GLOW_BG,
            filter: "blur(28px)",
          }}
        />
        <Image
          src="/images/17.png"
          alt="10x View Increased"
          width={280}
          height={280}
          className="absolute left-1/2 top-1/2 z-[6] w-[min(72%,280px)] h-auto -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          src="/images/14.png"
          alt="Instagram"
          width={90}
          height={90}
          className="absolute left-[13%] top-[12%] z-[4] w-[min(22%,90px)] h-auto opacity-70"
        />
        <Image
          src="/images/13.png"
          alt="YouTube"
          width={130}
          height={130}
          className="absolute right-[6%] top-[17%] z-[4] w-[min(35%,130px)] h-auto opacity-70"
        />
        <Image
          src="/images/12.png"
          alt="TikTok"
          width={82}
          height={82}
          className="absolute bottom-[20%] left-[13%] z-[3] w-[min(20%,82px)] h-auto opacity-70 "
        />
        <PostConfetti />
      </div>
    </ProcessGlow>
  );
}

const STEPS: ProcessStep[] = [
  {
    num: "01",
    badge: "Ideation",
    title: "Idea Analysis",
    description:
      "We take your ideas and analyze them thoroughly based on our experience and existing market standards.",
    textOnLeft: true,
    visual: <IdeationVisual />,
  },
  {
    num: "02",
    badge: "Scripting",
    title: "Writing Content",
    description:
      "We will give you proven script frameworks that the biggest creators and companies use.",
    textOnLeft: false,
    visual: <ScriptingVisual />,
  },
  {
    num: "03",
    badge: "Editing",
    title: "Editing The Video",
    description:
      "We make the best quality videos using advanced motion graphics that bring your message to life.",
    textOnLeft: true,
    visual: <EditingVisual />,
  },
  {
    num: "04",
    badge: "Thumbnail",
    title: "Creating Thumbnail",
    description:
      "We analyze other thumbnails in your niche and are able to replicate best performing results.",
    textOnLeft: false,
    visual: <ThumbnailVisual />,
  },
  {
    num: "05",
    badge: "Post",
    title: "Post The Video",
    description:
      "All thats left now is to post the video and start counting the leads that come in.",
    textOnLeft: true,
    visual: <PostVisual />,
  },
];

export function Process() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const fillProgress = useScrollProgress(stepsRef, computeLineFillProgress);

  return (
    <section id="process" className="relative overflow-hidden py-8 md:py-10">
      <div className="container mx-auto px-6 md:px-8">
        <p className="text-center font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
          Our Process
        </p>
        <h2 className="mt-4 text-center font-syne text-[clamp(1.75rem,4.2vw,2.375rem)] font-semibold leading-[1.15] tracking-tight">
          <p className="block text-gradient-brand">Our Strategy To Get You</p>
          <p className="block text-white">Leads With Content</p>
        </h2>

        <div className="relative mx-auto mt-16 max-w-[1100px] md:mt-20">
          <ol ref={stepsRef} className="flex relative flex-col gap-16">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-10 z-0 hidden h-[97%] w-0.5 -translate-x-1/2 bg-white/10 lg:block"
            >
              <div
                className="absolute inset-x-0 top-0 origin-top"
                style={{
                  height: `${fillProgress * 100}%`,
                  background:
                    "linear-gradient(180deg, rgba(168,136,200,0) 0%, #a888c8 12%, #7c499d 50%, #5c2e9d 100%)",
                  boxShadow: "0 0 14px rgba(124, 73, 157, 0.65)",
                  transition: "height 120ms linear",
                }}
              />
              <div
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a888c8] opacity-90 shadow-[0_0_18px_rgba(168,136,200,0.9),0_0_4px_rgba(255,255,255,0.9)]"
                style={{
                  top: `${fillProgress * 100}%`,
                  transition: "top 120ms linear",
                }}
              />
            </div>
            {STEPS.map((step, i) => {
              const kit = ANIMATION_KITS[i % ANIMATION_KITS.length];
              return (
                <motion.li
                  key={step.num}
                  variants={kit.container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.3, margin: "-80px" }}
                  className="relative"
                  style={{ transformPerspective: 1200 }}
                >
                  <motion.div
                    variants={kit.marker}
                    className="relative z-30 mb-10 flex justify-center lg:absolute lg:left-1/2 lg:top-8 lg:mb-0 lg:-translate-x-1/2"
                  >
                    <StepMarker num={step.num} />
                  </motion.div>

                  <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    <motion.div
                      variants={kit.text}
                      style={{ transformPerspective: 1000 }}
                      className={cn(
                        "flex justify-center",
                        step.textOnLeft
                          ? "lg:justify-end lg:pr-8 xl:pr-12"
                          : "lg:order-2 lg:justify-start lg:pl-8 xl:pl-12",
                      )}
                    >
                      <ProcessText
                        badge={step.badge}
                        title={step.title}
                        description={step.description}
                      />
                    </motion.div>
                    <motion.div
                      variants={kit.visual}
                      style={{ transformPerspective: 1000 }}
                      className={cn(!step.textOnLeft && "lg:order-1")}
                    >
                      {step.visual}
                    </motion.div>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-16 flex justify-center md:mt-20">
            <Button href="#book-a-call" variant="brand" size="cta">
              Book A 30-Min Call
              <ArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
