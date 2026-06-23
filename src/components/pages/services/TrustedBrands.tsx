"use client";

import { motion, type Variants } from "framer-motion";

import { Image } from "@/components/shared/Image";

type Logo = { name: string; src: string };

type TrustedBrandsProps = {
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  logos: Logo[];
};

const headerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TrustedBrands({
  eyebrow,
  titleGradient,
  titleWhite,
  logos,
}: TrustedBrandsProps) {
  if (logos.length === 0) return null;

  const loop = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="app-container">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <motion.p
            variants={headerItemVariants}
            className="font-syne text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec]"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="mt-3 font-syne text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-[1.15] tracking-tight"
          >
            <span className="text-gradient-brand">{titleGradient}</span>{" "}
            <span className="text-white">{titleWhite}</span>
          </motion.h2>
        </motion.div>
      </div>

      <div className="brands-marquee-wrap relative mt-8 space-y-3 md:mt-10 md:space-y-4">
        <style>{`
          @keyframes brands-marquee-left {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes brands-marquee-right {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .brands-marquee-track {
            will-change: transform;
            backface-visibility: hidden;
          }
          .brands-marquee-track-a { animation: brands-marquee-left  48s linear infinite; }
          .brands-marquee-track-b { animation: brands-marquee-right 56s linear infinite; }
          .brands-marquee-track-c { animation: brands-marquee-left  64s linear infinite; }
          .brands-marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-black to-transparent md:w-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-black to-transparent md:w-40"
        />

        {([
          "brands-marquee-track-a",
          "brands-marquee-track-b",
          "brands-marquee-track-c",
        ] as const).map((trackClass) => (
          <div
            key={trackClass}
            className={`brands-marquee-track ${trackClass} flex w-max items-center gap-3 md:gap-4`}
          >
            {loop.map((logo, idx) => (
              <div
                key={`${trackClass}-${logo.name}-${idx}`}
                className="group flex h-20 w-44 shrink-0 items-center justify-center px-4 md:h-24 md:w-52"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={40}
                  className="h-7 w-auto max-w-full object-contain opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:h-9"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
