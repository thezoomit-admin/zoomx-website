"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/shared/PageHero";
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
  /** Image shown in the page hero's media card. Falls back to the default video. */
  imageSrc?: string;
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
  imageSrc,
}: LegalPageProps) {
  const pageName = `${titleGradient} ${titleWhite}`.trim();

  return (
    <main className="relative min-h-screen overflow-hidden pb-16 md:pb-24">
      <PageHero
        name={pageName}
        videoSrc={imageSrc ? undefined : "/video/intro_video.mp4"}
        imageSrc={imageSrc}
        description={intro}
      />

      <div className="app-container">
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c9b3ec]">
          Last updated · {lastUpdated}
        </p>

        <div className="mt-8 w-full md:mt-10">
          {tableOfContents && (
            <nav aria-label="On this page" className="mb-12 md:mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                On this page
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slugify(s.heading)}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-white/70 transition-all duration-200 hover:border-[#a888c8]/40 hover:bg-[#7c499d]/15 hover:text-white"
                    >
                      <span className="font-mono text-[10.5px] font-medium tracking-wider text-white/35 transition-colors group-hover:text-[#c9b3ec]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s.heading}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
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
