"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const SPECS = [
  { key: "Aspect", value: "9:16 / 1:1 / 16:9" },
  { key: "Codec", value: "H.264 · ProRes 422" },
  { key: "Loudness", value: "−14 LUFS" },
  { key: "Bitrate", value: "10 — 40 Mbps" },
  { key: "Frame Rate", value: "24 / 30 / 60" },
  { key: "Captions", value: "SRT + Burn-In" },
];

const CHECKLIST = [
  "Codec & container verified",
  "Aspect ratio cross-checked",
  "Loudness normalized",
  "Captions audited for accuracy",
  "File size within platform spec",
  "Color space confirmed",
  "Audio peaks under −1 dBTP",
  "Filename matches client schema",
];

const STATS = [
  { value: "3", label: "Review Passes" },
  { value: "−66%", label: "Revision Rounds" },
  { value: "100%", label: "Brand Coverage" },
  { value: "<24h", label: "Turnaround" },
];

export function DeliverySpec() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-12 md:gap-7"
        >
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0612] p-7 backdrop-blur-xl md:col-span-5 md:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#5c2e9d]/30 blur-[80px]"
            />

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              delivery_spec.yaml
            </p>
            <h3 className="mt-3 font-syne text-[1.6rem] font-semibold leading-tight text-white">
              The Sheet Every <br />
              Export Is Audited Against
            </h3>

            <dl className="mt-7 divide-y divide-white/5">
              {SPECS.map((spec) => (
                <motion.div
                  key={spec.key}
                  variants={itemVariants}
                  className="flex items-baseline justify-between py-3"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                    {spec.key}
                  </dt>
                  <dd className="font-mono text-[13px] text-white/90">
                    {spec.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-7 backdrop-blur-xl md:col-span-7 md:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                ./qc_checklist
              </p>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/90">
                8 / 8 Passed
              </span>
            </div>

            <h3 className="mt-3 font-syne text-[1.6rem] font-semibold leading-tight text-white">
              The Final QC <br />
              Before It Hits Your Inbox
            </h3>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {CHECKLIST.map((item) => (
                <motion.li
                  key={item}
                  variants={itemVariants}
                  className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.025] px-3 py-2.5 text-[13px] text-white/75"
                >
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                    <Check className="h-2.5 w-2.5 text-emerald-300" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-7 md:grid-cols-4">
              {STATS.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants}>
                  <p
                    className="font-syne text-[1.6rem] font-bold leading-none"
                    style={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #d6c4ee 50%, #a888c8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
