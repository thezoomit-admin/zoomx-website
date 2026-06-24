"use client";

import { motion, type Variants } from "framer-motion";
import { Activity, CheckCircle2, KeyRound, ScrollText } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
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

const LOG = [
  { time: "00:12", event: "ndas.verified", target: "team:editor-09", status: "ok" },
  { time: "00:08", event: "backup.snapshot", target: "us-east-2", status: "ok" },
  { time: "00:04", event: "access.granted", target: "project:atlas-q3", status: "ok" },
  { time: "00:01", event: "token.rotated", target: "frameio.review", status: "ok" },
];

export function SecurityMonitor() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0612]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-5 py-3 md:px-7">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                zoomx · vault · monitor
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/90">
                Live
              </span>
            </div>
          </div>

          <div className="relative grid gap-5 p-5 md:grid-cols-12 md:gap-6 md:p-8">
            <motion.div
              variants={itemVariants}
              className="md:col-span-7 rounded-xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl md:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  {"// recent_events"}
                </p>
                <ScrollText className="h-4 w-4 text-white/30" />
              </div>

              <ul className="mt-5 space-y-3">
                {LOG.map((row, i) => (
                  <motion.li
                    key={row.event}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/30 px-3 py-2.5 font-mono text-[12px]"
                  >
                    <span className="text-white/30">[{row.time}]</span>
                    <span className="text-[#c9b3ec]">{row.event}</span>
                    <span className="ml-auto truncate text-white/40">{row.target}</span>
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="grid gap-4 md:col-span-5 md:gap-5">
              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <Activity className="h-4 w-4 text-emerald-300" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/80">
                    Operational
                  </span>
                </div>
                <p className="mt-4 font-syne text-[2rem] font-bold leading-none text-white">
                  100%
                </p>
                <p className="mt-1.5 text-[12.5px] text-white/55">
                  Uptime across pipeline this quarter
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <KeyRound className="h-4 w-4 text-[#c9b3ec]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    Last Rotation
                  </span>
                </div>
                <p className="mt-4 font-mono text-[20px] font-semibold text-white">
                  2h 14m
                </p>
                <p className="mt-1.5 text-[12.5px] text-white/55">
                  Access tokens auto-cycle every 4 hours
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-3"
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                    Backup
                  </p>
                  <p className="mt-1 font-mono text-sm text-white">12mo</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                    Cipher
                  </p>
                  <p className="mt-1 font-mono text-sm text-white">AES-256</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
