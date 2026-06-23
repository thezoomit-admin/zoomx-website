"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type CtaAction = { label: string; href: string };

type CtaSectionProps = {
  eyebrow?: string;
  titleGradient: string;
  titleWhite?: string;
  description?: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function CtaSection({
  eyebrow,
  titleGradient,
  titleWhite,
  description,
  primaryAction,
  secondaryAction,
}: CtaSectionProps) {
  return (
    <section className="relative pt-8 md:pt-10 pb-16 md:pb-20">
      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: [0.55, 0.95, 0.55] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(124,73,157,0.45) 0%, transparent 60%)",
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-[#5c2e9d]/45 blur-3xl"
            animate={{ x: [0, 36, 0], y: [0, 22, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-4 h-72 w-72 rounded-full bg-[#7c499d]/45 blur-3xl"
            animate={{ x: [0, -36, 0], y: [0, -22, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 60px -10px rgba(124,73,157,0.25)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center md:px-10 md:py-24">
            {eyebrow && (
              <motion.p
                variants={itemVariants}
                className="font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white/80"
              >
                {eyebrow}
              </motion.p>
            )}

            <motion.h2
              variants={itemVariants}
              className="mt-4 font-syne text-[clamp(1.8rem,4.6vw,3rem)] font-semibold leading-[1.1] tracking-tight"
            >
              <span className="block text-gradient-brand">{titleGradient}</span>
              {titleWhite && <span className="block text-white">{titleWhite}</span>}
            </motion.h2>

            {description && (
              <motion.p
                variants={itemVariants}
                className="mt-5 max-w-160 text-[15px] leading-[1.6] text-white/65"
              >
                {description}
              </motion.p>
            )}

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Button href={primaryAction.href} variant="brand" size="cta">
                {primaryAction.label}
                <ArrowUpRight />
              </Button>

              {secondaryAction && (
                <Button href={secondaryAction.href} variant="brandOutline" size="cta">
                  {secondaryAction.label}
                  <ArrowUpRight />
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
