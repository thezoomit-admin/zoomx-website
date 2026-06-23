"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FeaturePillar = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type FeatureStat = {
  value: string;
  label: string;
};

export type FeatureSectionProps = {
  intro: {
    eyebrow: string;
    titleGradient: string;
    titleWhite: string;
    body: string;
  };
  pillars: FeaturePillar[];
  stats: FeatureStat[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionGlow({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute top-1/2 -z-10 h-[360px] w-[360px] -translate-y-1/2 rounded-full opacity-50 blur-[110px]",
        side === "left" ? "-left-32" : "-right-32",
      )}
      style={{
        background:
          "radial-gradient(circle, rgba(124,73,157,0.5), rgba(168,136,200,0) 70%)",
      }}
    />
  );
}

function FeatureIntro({ intro }: { intro: FeatureSectionProps["intro"] }) {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-16">
      <SectionGlow side="left" />
      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-[760px] text-center"
        >
          <motion.p
            variants={itemVariants}
            className="font-syne text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec]"
          >
            {intro.eyebrow}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-syne text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-[1.15] tracking-tight"
          >
            <span className="block text-gradient-brand">{intro.titleGradient}</span>
            <span className="block text-white">{intro.titleWhite}</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-[60ch] text-[15px] leading-[1.75] text-white/65 md:text-[16px]"
          >
            {intro.body}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: FeaturePillar; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_farthest-corner_at_50%_0%,#5c2e9d22,var(--primary-black)_70%)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 md:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(168,136,200,0.55), rgba(168,136,200,0) 70%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <span
          aria-hidden
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-[#c9b3ec] transition-all duration-500 group-hover:border-[#a888c8]/40 group-hover:text-white [&_svg]:h-5 [&_svg]:w-5"
          style={{
            background:
              "linear-gradient(135deg, rgba(92,46,157,0.25), rgba(124,73,157,0.08))",
          }}
        >
          {pillar.icon}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-syne text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-1.5 font-syne text-[17px] font-semibold leading-snug text-white md:text-[18px]">
            {pillar.title}
          </h3>
          <p className="mt-2 text-[14px] leading-[1.65] text-white/60 md:text-[14.5px]">
            {pillar.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturePillars({ pillars }: { pillars: FeaturePillar[] }) {
  return (
    <section className="relative overflow-hidden pt-10 md:pt-14">
      <SectionGlow side="right" />
      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 md:gap-6"
        >
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureStats({ stats }: { stats: FeatureStat[] }) {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-16">
      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_farthest-corner_at_50%_0%,#5c2e9d33,var(--primary-black)_72%)] p-7 md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-[#5c2e9d]/30 blur-[80px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-[#7c499d]/25 blur-[80px]"
          />

          <dl className="relative grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-4 md:gap-x-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <dd
                  className="font-syne text-[clamp(1.7rem,3.6vw,2.4rem)] font-bold leading-[0.95] tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #d6c4ee 50%, #a888c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </dd>
                <dt className="mt-2 text-[12.5px] font-medium text-white/55 md:text-[13.5px]">
                  {stat.label}
                </dt>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturePage({ intro, pillars, stats }: FeatureSectionProps) {
  return (
    <>
      <FeatureIntro intro={intro} />
      <FeaturePillars pillars={pillars} />
      <FeatureStats stats={stats} />
    </>
  );
}
