"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
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

const numberVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.55,
    rotate: -6,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 1,
      restDelta: 0.001,
    },
  },
};

function SectionGlow({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-60 blur-[120px]",
        side === "left" ? "-left-32" : "-right-32",
      )}
      style={{
        background:
          "radial-gradient(circle, rgba(124,73,157,0.55), rgba(168,136,200,0) 70%)",
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
  children,
}: {
  num: string;
  eyebrow: string;
  title: string;
  summary?: string;
  glow: "left" | "right";
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
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative isolate"
    >
      <SectionGlow side={glow} />

      <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="relative md:col-span-4">
          <div className="sticky top-28 flex flex-col gap-4">
            <motion.div ref={numberRef} style={{ y: parallaxY }} className="relative">
              <motion.div
                variants={numberVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3, margin: "-10% 0px -10% 0px" }}
                style={{ transformOrigin: "left center" }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="select-none font-syne text-[clamp(6rem,14vw,11rem)] font-bold leading-none tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #a888c8 0%, #7c499d 50%, #5c2e9d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 8px 32px rgba(124,73,157,0.35))",
                  }}
                >
                  {num}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 select-none font-syne text-[clamp(6rem,14vw,11rem)] font-bold leading-none tracking-tight text-white/[0.04]"
                  style={{ transform: "translate(0.18em, 0.06em)" }}
                >
                  {num}
                </span>
              </motion.div>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="font-syne text-[12px] font-semibold uppercase tracking-[0.22em] text-[#c9b3ec]"
            >
              {eyebrow}
            </motion.p>
          </div>
        </div>

        <div className="md:col-span-8">
          <motion.h2
            variants={itemVariants}
            className="font-syne text-[clamp(1.5rem,3.6vw,2.5rem)] font-semibold leading-[1.15] tracking-tight"
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
              variants={itemVariants}
              className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-white/65 md:text-[16px]"
            >
              {summary}
            </motion.p>
          )}

          <motion.div variants={itemVariants} className="mt-10">
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
          className="group relative grid grid-cols-[auto_1fr] gap-5 border-t border-white/[0.08] py-6 transition-colors duration-500 first:border-t-0 hover:border-white/15 md:gap-7 md:py-7"
        >
          <div className="relative flex flex-col items-center pt-1">
            <span
              className="font-syne text-[13px] font-semibold tracking-[0.14em] text-white/40 transition-colors duration-500 group-hover:text-white/80"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className="mt-3 h-12 w-px origin-top scale-y-50 rounded-full opacity-50 transition-transform duration-700 group-hover:scale-y-100 group-hover:opacity-100"
              style={{ background: accent }}
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-syne text-[17px] font-semibold leading-snug text-white transition-colors duration-500 group-hover:text-[#e6d6f5] md:text-[19px]">
              {item.title}
            </h3>
            <p className="mt-2 text-[14.5px] leading-[1.7] text-white/55 transition-colors duration-500 group-hover:text-white/75 md:text-[15.5px]">
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

function StatRow({ stats }: { stats: GrowthBlock["stats"] }) {
  return (
    <motion.dl
      variants={listContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
      className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          variants={punchVariants}
          style={{ transformOrigin: "left center" }}
          className="group relative"
        >
          <span
            aria-hidden
            className="absolute -left-3 top-1 h-[42%] w-px scale-y-0 origin-top rounded-full transition-transform duration-700 group-hover:scale-y-100"
            style={{
              background:
                "linear-gradient(180deg, #a888c8 0%, transparent 100%)",
            }}
          />
          <dt className="font-syne text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
            {String(i + 1).padStart(2, "0")}
          </dt>
          <dd
            className="mt-3 font-syne text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[0.95] tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #d6c4ee 50%, #a888c8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {stat.value}
          </dd>
          <p className="mt-2 text-[13px] font-medium text-white/55 md:text-[14px]">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.dl>
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
      className="relative overflow-hidden pt-16 md:pt-24"
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
        <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          <BlockShell
            num="01"
            eyebrow={challenges.eyebrow}
            title={challenges.title}
            summary={challenges.summary}
            glow="left"
          >
            <FlowList items={challenges.items} tone="warm" />
          </BlockShell>

          <BlockShell
            num="02"
            eyebrow={solutions.eyebrow}
            title={solutions.title}
            summary={solutions.summary}
            glow="right"
          >
            <FlowList items={solutions.items} tone="cool" />
          </BlockShell>

          <BlockShell
            num="03"
            eyebrow={growth.eyebrow}
            title={growth.title}
            summary={growth.summary}
            glow="left"
          >
            <StatRow stats={growth.stats} />
          </BlockShell>
        </div>
      </div>
    </section>
  );
}
