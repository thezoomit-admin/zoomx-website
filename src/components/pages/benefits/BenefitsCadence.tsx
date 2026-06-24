"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, Wallet, Sparkles } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const WEEK = [
  { day: "Mon", task: "Strategy sync", tag: "Plan" },
  { day: "Tue", task: "Capture / sourcing", tag: "Source" },
  { day: "Wed", task: "First cuts land", tag: "Edit" },
  { day: "Thu", task: "Review & polish", tag: "QC" },
  { day: "Fri", task: "Ship & schedule", tag: "Ship" },
];

const PILLARS = [
  {
    icon: Wallet,
    title: "One Flat Price",
    body: "No hourly creep, no surprise invoices. You know exactly what next month costs.",
  },
  {
    icon: Sparkles,
    title: "Senior Editors Only",
    body: "No juniors learning on your timeline. Every edit is shipped by a 4+ year pro.",
  },
];

export function BenefitsCadence() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-20 h-[420px] w-[420px] rounded-full bg-[#5c2e9d]/15 blur-[140px]"
      />

      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-10 lg:grid-cols-12 lg:gap-14"
        >
          <div className="lg:col-span-5">
            <motion.p
              variants={itemVariants}
              className="font-syne text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec]"
            >
              The Engine Behind Velocity
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-4 font-syne text-[clamp(1.9rem,3.8vw,2.7rem)] font-semibold leading-[1.1] tracking-tight"
            >
              <span className="block text-gradient-brand">A Rhythm Your</span>
              <span className="block text-white">Channel Compounds On</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-[52ch] text-[15px] leading-[1.75] text-white/60"
            >
              Most studios sell deliverables. We sell a system that keeps
              shipping — same brand, same standards, same crew — week after
              week, quarter after quarter.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-500 hover:border-white/20"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#c9b3ec] transition-colors duration-500 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="mt-3 font-syne text-[14px] font-semibold leading-snug text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.6] text-white/55">
                      {pillar.body}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl bg-gradient-to-br from-[#7c499d]/60 via-[#a888c8]/30 to-[#5c2e9d]/60 p-[1px]">
              <div className="relative overflow-hidden rounded-2xl bg-[#0a0612] p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="h-4 w-4 text-[#c9b3ec]" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                      this_week.cadence
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/90">
                    On Track
                  </span>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {WEEK.map((day, i) => (
                    <motion.li
                      key={day.day}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.35 + i * 0.08,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                    >
                      <span className="w-10 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-white/40">
                        {day.day}
                      </span>
                      <span className="flex-1 text-[14px] text-white/90">
                        {day.task}
                      </span>
                      <span className="rounded-md border border-[#a888c8]/20 bg-[#7c499d]/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#c9b3ec]">
                        {day.tag}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-7 grid grid-cols-4 gap-3 border-t border-white/10 pt-6">
                  {[
                    { v: "100+", l: "Videos / mo" },
                    { v: "<24h", l: "Reply" },
                    { v: "4yr+", l: "Editor xp" },
                    { v: "1", l: "Flat price" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p
                        className="font-syne text-[1.4rem] font-bold leading-none"
                        style={{
                          background:
                            "linear-gradient(135deg, #ffffff 0%, #d6c4ee 50%, #a888c8 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {s.v}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
