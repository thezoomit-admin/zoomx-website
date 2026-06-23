"use client";

import { motion, type Variants } from "framer-motion";
import { Palette } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const SWATCHES = [
  { hex: "#5C2E9D", label: "Primary" },
  { hex: "#7C499D", label: "Secondary" },
  { hex: "#A888C8", label: "Accent" },
  { hex: "#12091D", label: "Surface" },
  { hex: "#FFFFFF", label: "Text" },
];

export function QualityShowcase() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      {/* Background Glow */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(124,73,157,.20), transparent 35%),
            radial-gradient(circle at 85% 70%, rgba(92,46,157,.25), transparent 40%),
            #08040D
          `,
        }}
      />

      {/* Blur Glow */}
      <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#7C499D]/20 blur-[150px] -z-10" />
      <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#5C2E9D]/20 blur-[150px] -z-10" />

      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid items-start gap-10 md:grid-cols-12"
        >
          {/* LEFT CONTENT */}
          <div className="md:col-span-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <Palette className="h-4 w-4 text-[#c9b3ec]" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#c9b3ec]">
                Pillar 01
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mt-8 font-syne text-[clamp(2.2rem,4vw,4rem)] font-bold leading-[1.05]"
            >
              <span className="bg-gradient-to-r from-white via-[#d6c4ee] to-[#a888c8] bg-clip-text text-transparent">
                Your Brand System
                <br />
                Built For Scale
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-[600px] text-[15px] leading-[1.9] text-white/65"
            >
              Every project starts with a verified brand system.
              Typography, color palettes, motion principles, and
              content guidelines are applied before the first cut,
              ensuring consistency across every creative asset.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-3 gap-4"
            >
              {[
                {
                  title: "Typeface",
                  value: "Syne / Inter",
                },
                {
                  title: "Motion",
                  value: "0.42s Spring",
                },
                {
                  title: "Loudness",
                  value: "-14 LUFS",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    backdrop-blur-xl
                    p-4
                    transition-all
                    duration-300
                    hover:border-[#A888C8]/40
                  "
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT CARD */}
          <motion.div
            variants={itemVariants}
            className="relative md:col-span-6"
          >
            {/* Gradient Border */}
            <div className="rounded-[34px] bg-gradient-to-br from-[#7C499D] via-[#A888C8] to-[#5C2E9D] p-[1px]">
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-white/10
                  bg-[#12091D]
                  p-8
                  backdrop-blur-xl
                  shadow-[0_0_80px_rgba(124,73,157,0.18)]
                "
              >
                {/* Shine Animation */}
                <motion.div
                  animate={{
                    x: ["-150%", "250%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "linear",
                  }}
                  className="
                    absolute
                    inset-y-0
                    w-32
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                    skew-x-12
                  "
                />

                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/40">
                    brand_kit.json
                  </p>

                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/70" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                    <span className="h-3 w-3 rounded-full bg-green-400/70" />
                  </div>
                </div>

                {/* Color Palette */}
                <div className="mt-8 grid grid-cols-5 gap-3">
                  {SWATCHES.map((s, i) => (
                    <motion.div
                      key={s.hex}
                      initial={{
                        opacity: 0,
                        y: 15,
                        scale: 0.9,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: i * 0.08,
                        type: "spring",
                        stiffness: 300,
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className="h-20 rounded-xl ring-1 ring-white/10"
                        style={{
                          background: s.hex,
                        }}
                      />

                      <p className="mt-2 truncate font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                        {s.label}
                      </p>

                      <p className="truncate font-mono text-[10px] text-white/30">
                        {s.hex}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Typography Cards */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                      Heading Font
                    </p>

                    <p className="mt-3 font-syne text-4xl font-bold text-white">
                      Aa
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                      Body Font
                    </p>

                    <p className="mt-3 text-xl text-white">
                      Aa Bb Cc
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

