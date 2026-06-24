"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  titleGradient: string;
  titleWhite: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  tableOfContents?: boolean;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalPage({
  titleGradient,
  titleWhite,
  intro,
  lastUpdated,
  sections,
  tableOfContents = true,
}: LegalPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124,73,157,0.18), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[#5c2e9d]/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-[420px] -z-10 h-[360px] w-[360px] rounded-full bg-[#7c499d]/20 blur-[120px]"
      />

      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[820px] text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="font-syne text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-tight"
          >
            <span className="block text-gradient-brand">{titleGradient}</span>
            <span className="block text-white">{titleWhite}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-5 max-w-[62ch] text-[15px] leading-[1.75] text-white/65 md:text-[16px]"
          >
            {intro}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45"
          >
            Last updated · {lastUpdated}
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-[1100px] gap-10 md:mt-16 lg:grid-cols-[260px_1fr] lg:gap-14">
          {tableOfContents && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                  On this page
                </p>
                <ol className="mt-5 space-y-0.5">
                  {sections.map((s, i) => (
                    <li key={s.heading} className="relative">
                      <a
                        href={`#${slugify(s.heading)}`}
                        className="group flex items-start gap-3 rounded-md py-2 pr-3 text-[13.5px] leading-snug text-white/60 transition-all duration-200 hover:translate-x-0.5 hover:text-white"
                      >
                        <span className="font-mono text-[10.5px] font-medium tracking-wider text-white/30 transition-colors group-hover:text-[#c9b3ec]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="pt-px">{s.heading}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          )}

          <article className="min-w-0">
            <div className="space-y-10 md:space-y-12">
              {sections.map((section, i) => (
                <motion.section
                  key={section.heading}
                  id={slugify(section.heading)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="scroll-mt-32"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#c9b3ec]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-syne text-[clamp(1.25rem,2.2vw,1.55rem)] font-semibold leading-tight text-white">
                      {section.heading}
                    </h2>
                  </div>

                  {section.paragraphs?.map((p, idx) => (
                    <p
                      key={idx}
                      className="mt-4 text-[14.5px] leading-[1.75] text-white/70 md:text-[15px]"
                    >
                      {p}
                    </p>
                  ))}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((b, idx) => (
                        <li
                          key={idx}
                          className="relative pl-6 text-[14.5px] leading-[1.7] text-white/70 md:text-[15px]"
                        >
                          <span
                            aria-hidden
                            className="absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full bg-[#a888c8]"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.section>
              ))}
            </div>

            <div className="mt-14 flex flex-col items-start gap-4 md:mt-16 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-syne text-[16px] font-semibold text-white md:text-[17px]">
                  Questions about this policy?
                </p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-white/60 md:text-[14px]">
                  Send us a note — we&apos;ll respond within one business day.
                </p>
              </div>
              <Button href="/#contact" variant="brand" size="cta">
                Contact Us
                <ArrowUpRight />
              </Button>
            </div>

            <p className="mt-10 text-[12.5px] text-white/40">
              Need a printable copy?{" "}
              <Link
                href="/#contact"
                className="font-medium text-[#c9b3ec] underline-offset-2 hover:text-white hover:underline"
              >
                Get in touch
              </Link>{" "}
              and we&apos;ll email you a signed PDF.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
