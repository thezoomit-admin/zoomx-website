"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

import {
  type AnimationKit,
  dropSlideKit,
  explosionKit,
  spinKit,
} from "@/lib/animationKits";
import { cn } from "@/lib/utils";

type Item = { title: string; description: string };

export type ChallengesBlock = {
  eyebrow: string;
  title: string;
  summary?: string;
  items: Item[];
};

export type SolutionsBlock = {
  eyebrow: string;
  title: string;
  summary?: string;
  items: Item[];
};

export type GrowthBlock = {
  eyebrow: string;
  title: string;
  summary?: string;
  stats: { value: string; label: string }[];
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

const punchVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -70,
    skewX: 6,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 22,
      mass: 0.6,
      restDelta: 0.001,
    },
  },
};

function SectionGlow({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-1/2 -z-10 h-[300px] w-[300px] -translate-y-1/2 rounded-full opacity-40 blur-[100px]",
        side === "left" ? "-left-24" : "-right-24",
      )}
      style={{
        background:
          "radial-gradient(circle, rgba(124,73,157,0.45), rgba(168,136,200,0) 70%)",
      }}
    />
  );
}

function BlockShell({
  num,
  eyebrow,
  title,
  summary,
  glow,
  kit,
  children,
}: {
  num: string;
  eyebrow: string;
  title: string;
  summary?: string;
  glow: "left" | "right";
  kit: AnimationKit;
  children: React.ReactNode;
}) {
  const numberRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: numberRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <motion.section
      variants={kit.container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
      className="relative isolate perspective-[1000px]"
    >
      <SectionGlow side={glow} />

      <div className="grid gap-6 md:grid-cols-12 md:gap-10 lg:gap-12">
        <div className="relative md:col-span-4">
          <div className="sticky top-24 flex flex-col gap-3">
            <motion.div ref={numberRef} style={{ y: parallaxY }} className="relative">
              <motion.div
                variants={kit.marker}
                style={{ transformOrigin: "left center" }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="select-none font-syne text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #a888c8 0%, #7c499d 50%, #5c2e9d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 6px 24px rgba(124,73,157,0.3))",
                  }}
                >
                  {num}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 select-none font-syne text-[clamp(3.5rem,8vw,6rem)] font-bold leading-none tracking-tight text-white/[0.04]"
                  style={{ transform: "translate(0.18em, 0.06em)" }}
                >
                  {num}
                </span>
              </motion.div>
            </motion.div>
            <motion.p
              variants={kit.text}
              className="font-syne text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec]"
            >
              {eyebrow}
            </motion.p>
          </div>
        </div>

        <div className="md:col-span-8">
          <motion.h2
            variants={kit.text}
            className="font-syne text-[clamp(1.25rem,2.6vw,1.85rem)] font-semibold leading-[1.2] tracking-tight"
          >
            <span
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, #d6c4ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </span>
          </motion.h2>

          {summary && (
            <motion.p
              variants={kit.text}
              className="mt-3 max-w-[60ch] text-[14px] leading-[1.7] text-white/65 md:text-[15px]"
            >
              {summary}
            </motion.p>
          )}

          <motion.div variants={kit.visual} className="mt-6 md:mt-7">
            {children}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function FlowList({ items, tone }: { items: Item[]; tone: "warm" | "cool" }) {
  const accent =
    tone === "warm"
      ? "linear-gradient(180deg, #ff8fa3 0%, #c4748f 100%)"
      : "linear-gradient(180deg, #a888c8 0%, #5c2e9d 100%)";

  return (
    <motion.ol
      variants={listContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
      className="flex flex-col"
    >
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          variants={punchVariants}
          style={{ transformOrigin: "left center" }}
          className="group relative grid grid-cols-[auto_1fr] gap-4 border-t border-white/[0.08] py-4 transition-colors duration-500 first:border-t-0 hover:border-white/15 md:gap-5 md:py-5"
        >
          <div className="relative flex flex-col items-center pt-1">
            <span
              className="font-syne text-[12px] font-semibold tracking-[0.14em] text-white/40 transition-colors duration-500 group-hover:text-white/80"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className="mt-2 h-8 w-px origin-top scale-y-50 rounded-full opacity-50 transition-transform duration-700 group-hover:scale-y-100 group-hover:opacity-100"
              style={{ background: accent }}
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-syne text-[15px] font-semibold leading-snug text-white transition-colors duration-500 group-hover:text-[#e6d6f5] md:text-[16.5px]">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-[1.65] text-white/55 transition-colors duration-500 group-hover:text-white/75 md:text-[14.5px]">
              {item.description}
            </p>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-px scale-y-0 origin-center transition-transform duration-700 group-hover:scale-y-100"
            style={{ background: accent }}
          />
        </motion.li>
      ))}
    </motion.ol>
  );
}

function GrowthChart({ stats }: { stats: GrowthBlock["stats"] }) {
  // Ascending visual heights — symbolic growth, not literal stat values
  const heights = [42, 58, 76, 95];

  // SVG geometry — viewBox is 400 x 220 (line area sits above bars)
  const points = heights.map((h, i) => {
    const x = 50 + i * 100;
    // Bar tops sit at: chartHeight (200) - (h% of 160) so y = 200 - (h/100 * 160)
    const y = 200 - (h / 100) * 160;
    return { x, y };
  });
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  // Arrowhead angle from last segment
  const dx = last.x - prev.x;
  const dy = last.y - prev.y;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25, margin: "-10% 0px -10% 0px" }}
      variants={listContainerVariants}
      className="relative rounded-2xl border border-white/10 bg-linear-to-br from-[#1a0f2e]/60 via-[#0f0820]/40 to-[#1a0f2e]/60 p-5 backdrop-blur-sm md:p-7"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-5 rounded-xl opacity-[0.12] md:inset-7"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Chart area */}
      <div className="relative h-[240px] w-full md:h-[280px]">
        {/* Horizontal guide lines */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-px w-full bg-white/[0.06]" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-around gap-3 px-2 md:gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={punchVariants}
              className="group relative flex h-full w-1/5 flex-col items-center justify-end"
            >
              {/* Value label above bar */}
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.45 }}
                className="mb-2 font-syne text-[clamp(0.95rem,1.8vw,1.3rem)] font-bold leading-none tracking-tight"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #d6c4ee 50%, #a888c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </motion.span>

              {/* Bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  height: `${heights[i]}%`,
                  transformOrigin: "bottom",
                  background:
                    "linear-gradient(180deg, #a888c8 0%, #7c499d 55%, #3b1f63 100%)",
                  boxShadow:
                    "0 8px 28px -8px rgba(168,136,200,0.55), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                className="relative w-full rounded-t-lg transition-transform duration-500 group-hover:scale-x-105"
              >
                {/* Shine highlight on bar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1/3 rounded-t-lg bg-linear-to-b from-white/25 to-transparent"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trend line + arrow overlay */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 220"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trendStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d6c4ee" />
              <stop offset="100%" stopColor="#a888c8" />
            </linearGradient>
            <filter id="trendGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow trail (thicker, faded) */}
          <motion.polyline
            points={polyline}
            fill="none"
            stroke="#a888c8"
            strokeOpacity={0.35}
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.35 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
          />

          {/* Main trend line */}
          <motion.polyline
            points={polyline}
            fill="none"
            stroke="url(#trendStroke)"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#trendGlow)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
          />

          {/* Point dots */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={5}
              fill="#ffffff"
              stroke="#7c499d"
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                delay: 0.6 + i * 0.18,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          {/* Arrow tip at the end of the line */}
          <motion.g
            transform={`translate(${last.x}, ${last.y}) rotate(${angle})`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ delay: 1.6, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <path
              d="M 0 -8 L 14 0 L 0 8 Z"
              fill="url(#trendStroke)"
              filter="url(#trendGlow)"
            />
          </motion.g>
        </svg>
      </div>

      {/* Bottom labels */}
      <div className="mt-4 flex items-start justify-around gap-3 px-2 md:gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            className="flex w-1/5 flex-col items-center text-center"
          >
            <span className="font-syne text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[11.5px] font-medium leading-tight text-white/60 md:text-[12.5px]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function CaseStudyDetailsBlocks({
  challenges,
  solutions,
  growth,
}: {
  challenges: ChallengesBlock;
  solutions: SolutionsBlock;
  growth: GrowthBlock;
}) {
  return (
    <section
      id="case-study-details"
      className="relative overflow-hidden pt-10 md:pt-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,136,200,0.45), transparent)",
        }}
      />

      <div className="app-container">
        <div className="flex flex-col gap-14 md:gap-20 lg:gap-24">
          <BlockShell
            num="01"
            eyebrow={challenges.eyebrow}
            title={challenges.title}
            summary={challenges.summary}
            glow="left"
            kit={spinKit}
          >
            <FlowList items={challenges.items} tone="warm" />
          </BlockShell>

          <BlockShell
            num="02"
            eyebrow={solutions.eyebrow}
            title={solutions.title}
            summary={solutions.summary}
            glow="right"
            kit={dropSlideKit}
          >
            <FlowList items={solutions.items} tone="cool" />
          </BlockShell>

          <BlockShell
            num="03"
            eyebrow={growth.eyebrow}
            title={growth.title}
            summary={growth.summary}
            glow="left"
            kit={explosionKit}
          >
            <GrowthChart stats={growth.stats} />
          </BlockShell>
        </div>
      </div>
    </section>
  );
}
