"use client";

import { motion, type Variants } from "framer-motion";
import { Eye, Scissors, Send, type LucideIcon } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type Step = {
  step: string;
  icon: LucideIcon;
  role: string;
  title: string;
  body: string;
  checks: string[];
};

const STEPS: Step[] = [
  {
    step: "PASS 01",
    icon: Scissors,
    role: "Editor",
    title: "First Cut & Brand Lock",
    body: "Your senior editor assembles, color-pulls, and applies the brand kit before the first hand-off.",
    checks: ["Brand-kit applied", "Tone audit", "Story arc"],
  },
  {
    step: "PASS 02",
    icon: Eye,
    role: "Senior Lead",
    title: "Craft Review",
    body: "A senior lead audits pacing, sound design, motion, and copy against the original brief — shot by shot.",
    checks: ["Pacing", "Sound mix", "Motion polish"],
  },
  {
    step: "PASS 03",
    icon: Send,
    role: "Producer",
    title: "Delivery QC",
    body: "The producer verifies codec, loudness, captions, and aspect against the platform spec before it ships.",
    checks: ["Codec & specs", "Loudness", "Captions"],
  },
];

export function ReviewPipeline() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124,73,157,0.18), transparent 55%)",
        }}
      />

      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-[680px] text-center"
        >
          <motion.p
            variants={stepVariants}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c9b3ec]"
          >
            ./review_pipeline
          </motion.p>
          <motion.h2
            variants={stepVariants}
            className="mt-4 font-syne text-[clamp(1.9rem,3.8vw,2.7rem)] font-semibold leading-[1.1] tracking-tight"
          >
            <span className="block text-gradient-brand">Three Passes</span>
            <span className="block text-white">Before You See A Frame</span>
          </motion.h2>
          <motion.p
            variants={stepVariants}
            className="mx-auto mt-5 max-w-[60ch] text-[15px] leading-[1.75] text-white/60"
          >
            Each pass has a named owner and a checklist they cannot skip — so the
            cut that lands in your inbox is already a yes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-9 hidden md:block"
          >
            <div className="mx-auto h-px w-[78%] bg-gradient-to-r from-transparent via-[#7c499d]/60 to-transparent" />
          </div>

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                variants={stepVariants}
                className="group relative"
              >
                <div className="relative z-10 mx-auto flex h-[72px] w-[72px] items-center justify-center">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[#0a0612]"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c499d] via-[#a888c8] to-[#5c2e9d] p-[1.5px]">
                    <div className="h-full w-full rounded-full bg-[#0a0612]" />
                  </div>
                  <div className="relative flex h-full w-full items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 group-hover:border-[#a888c8]/40 md:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -bottom-24 h-48 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(168,136,200,0.55), rgba(124,73,157,0.18) 45%, transparent 75%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(216,196,238,0.7), transparent)",
                    }}
                  />

                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                      {step.step}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c9b3ec]">
                      {step.role}
                    </span>
                  </div>

                  <h3 className="relative mt-4 font-syne text-[18px] font-semibold leading-snug text-white md:text-[19px]">
                    {step.title}
                  </h3>
                  <p className="relative mt-2.5 line-clamp-3 min-h-[4.95em] text-[13.5px] leading-[1.65] text-white/60 md:text-[14px]">
                    {step.body}
                  </p>

                  <div className="relative mt-5 flex flex-wrap gap-1.5">
                    {step.checks.map((check) => (
                      <span
                        key={check}
                        className="rounded-md border border-emerald-400/15 bg-emerald-400/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-200/80"
                      >
                        ✓ {check}
                      </span>
                    ))}
                  </div>
                </div>

                {i < STEPS.length - 1 && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-3 left-1/2 hidden h-3 w-px -translate-x-1/2 bg-[#7c499d]/40 md:block"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
