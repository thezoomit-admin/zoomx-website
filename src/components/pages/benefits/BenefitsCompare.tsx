"use client";

import { motion, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type Row = {
  feature: string;
  freelancer: string | boolean;
  agency: string | boolean;
  zoomx: string | boolean;
};

const ROWS: Row[] = [
  { feature: "Senior editors only", freelancer: false, agency: false, zoomx: true },
  { feature: "Flat monthly pricing", freelancer: false, agency: false, zoomx: true },
  { feature: "Weekly publishing cadence", freelancer: false, agency: true, zoomx: true },
  { feature: "Brand-kit calibration", freelancer: false, agency: true, zoomx: true },
  { feature: "<24h reply time", freelancer: true, agency: false, zoomx: true },
  { feature: "Adapts strategy quarterly", freelancer: false, agency: false, zoomx: true },
  { feature: "No hourly creep", freelancer: false, agency: false, zoomx: true },
];

function Cell({ value, highlight = false }: { value: string | boolean; highlight?: boolean }) {
  if (typeof value === "boolean") {
    return (
      <div className="flex items-center justify-center">
        {value ? (
          <span
            className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${
              highlight
                ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300"
                : "border-white/15 bg-white/[0.04] text-white/70"
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        ) : (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/30">
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="text-center font-mono text-[12px] text-white/70">{value}</div>
  );
}

export function BenefitsCompare() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(124,73,157,0.15), transparent 55%)",
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
            variants={rowVariants}
            className="font-syne text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec]"
          >
            How We Compare
          </motion.p>
          <motion.h2
            variants={rowVariants}
            className="mt-4 font-syne text-[clamp(1.9rem,3.8vw,2.7rem)] font-semibold leading-[1.1] tracking-tight"
          >
            <span className="block text-gradient-brand">The Honest Side-By-Side</span>
            <span className="block text-white">No Marketing Spin</span>
          </motion.h2>
          <motion.p
            variants={rowVariants}
            className="mx-auto mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-white/60"
          >
            We sell a system, not deliverables. Here is what you actually get
            compared to a freelancer or a traditional agency.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/4 to-transparent backdrop-blur-xl md:mt-10"
        >
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] items-center gap-3 border-b border-white/10 bg-black/30 px-4 py-4 md:gap-6 md:px-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Feature
            </span>
            <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Freelancer
            </span>
            <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Agency
            </span>
            <div className="text-center">
              <span
                className="inline-block rounded-full bg-gradient-to-r from-[#7c499d] via-[#a888c8] to-[#5c2e9d] px-3 py-1 font-syne text-[11px] font-bold uppercase tracking-[0.15em] text-white"
              >
                ZOOMX
              </span>
            </div>
          </div>

          <div>
            {ROWS.map((row, i) => (
              <motion.div
                key={row.feature}
                variants={rowVariants}
                className={`grid grid-cols-[1.4fr_1fr_1fr_1.2fr] items-center gap-3 px-4 py-4 md:gap-6 md:px-7 ${
                  i !== ROWS.length - 1 ? "border-b border-white/5" : ""
                } transition-colors duration-300 hover:bg-white/[0.02]`}
              >
                <span className="text-[13.5px] text-white/85 md:text-[14.5px]">
                  {row.feature}
                </span>
                <Cell value={row.freelancer} />
                <Cell value={row.agency} />
                <div className="bg-gradient-to-b from-[#7c499d]/[0.08] to-transparent">
                  <Cell value={row.zoomx} highlight />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
