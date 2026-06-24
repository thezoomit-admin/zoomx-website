"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type Action = { label: string; href: string };

type ServiceHeroProps = {
  videoSrc: string;
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

export function ServiceHero({
  videoSrc,
  eyebrow,
  titleGradient,
  titleWhite,
  description,
  primaryAction,
  secondaryAction,
}: ServiceHeroProps) {
  return (
    <section className="relative pt-28 pb-8 md:pt-32 md:pb-12">
      <div className="app-container">
        <div className="relative aspect-21/9 overflow-hidden rounded-xl border border-white/10 bg-[#070009]">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,0,9,0.78) 0%, rgba(7,0,9,0.55) 45%, rgba(7,0,9,0.85) 100%)",
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center md:px-10"
          >
            <motion.p
              variants={itemVariants}
              className="font-syne text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec] md:text-[13px]"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="mt-4 max-w-[20ch] font-syne text-[clamp(1.9rem,5.4vw,3.6rem)] font-semibold leading-[1.05] tracking-tight"
            >
              <span className="block text-gradient-brand">{titleGradient}</span>
              <span className="block text-white">{titleWhite}</span>
            </motion.h1>
            {description && (
              <motion.p
                variants={itemVariants}
                className="mt-5 max-w-[60ch] text-[14px] leading-[1.7] text-white/75 md:text-[15.5px]"
              >
                {description}
              </motion.p>
            )}
            {(primaryAction || secondaryAction) && (
              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-wrap items-center justify-center gap-3"
              >
                {primaryAction && (
                  <Button href={primaryAction.href} variant="brand" size="cta">
                    {primaryAction.label}
                    <ArrowUpRight />
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    href={secondaryAction.href}
                    variant="brandOutline"
                    size="cta"
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
