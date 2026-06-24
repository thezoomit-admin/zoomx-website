"use client";

import { motion, type Variants } from "framer-motion";
import { FileSignature, Lock, ShieldCheck, Users, HardDrive } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const layerVariants: Variants = {
  hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const LAYERS = [
  {
    code: "L05",
    icon: <FileSignature />,
    title: "Identity & NDAs",
    detail: "Every collaborator signs before a single asset moves. Zero exceptions.",
    tag: "Legal",
  },
  {
    code: "L04",
    icon: <Lock />,
    title: "Encrypted Transit",
    detail: "HTTPS-only delivery with rotated tokens — assets travel sealed end to end.",
    tag: "TLS 1.3",
  },
  {
    code: "L03",
    icon: <ShieldCheck />,
    title: "At-Rest Encryption",
    detail: "Private S3 vaults with AES-256 envelopes. Keys are scoped per project.",
    tag: "AES-256",
  },
  {
    code: "L02",
    icon: <Users />,
    title: "Role-Based Access",
    detail: "Editors see their slice. Producers see the floor. Nothing crosses lines.",
    tag: "RBAC",
  },
  {
    code: "L01",
    icon: <HardDrive />,
    title: "Triple Redundancy",
    detail: "Working copies, hot archive, cold storage — three regions, twelve months.",
    tag: "3 Regions",
  },
];

export function SecurityStack() {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(circle at 80% 20%, rgba(124,73,157,0.18), transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(92,46,157,0.20), transparent 45%)
          `,
        }}
      />

      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-4">
            <motion.div
              variants={layerVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300/90">
                Stack Online
              </span>
            </motion.div>

            <motion.h2
              variants={layerVariants}
              className="mt-6 font-syne text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-tight"
            >
              <span className="block text-gradient-brand">Five Layers</span>
              <span className="block text-white">Between Your Footage</span>
              <span className="block text-white/70">And The Outside</span>
            </motion.h2>

            <motion.p
              variants={layerVariants}
              className="mt-5 text-[15px] leading-[1.75] text-white/60"
            >
              Each layer fails closed and is audited independently — there is no
              path to your raw assets that skips any of these checks.
            </motion.p>

            <motion.div
              variants={layerVariants}
              className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Audit Snapshot
              </p>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p className="font-syne text-xl font-bold text-white">0</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                    Incidents · 5yr
                  </p>
                </div>
                <div>
                  <p className="font-syne text-xl font-bold text-white">100%</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                    NDA Coverage
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative lg:col-span-8">
            <svg
              aria-hidden
              className="pointer-events-none absolute left-0 top-6 bottom-6 h-[calc(100%-3rem)] w-[68px]"
              viewBox="0 0 68 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="snakeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c499d" stopOpacity="0" />
                  <stop offset="20%" stopColor="#a888c8" stopOpacity="0.7" />
                  <stop offset="80%" stopColor="#7c499d" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#5c2e9d" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 34 30 C 64 130, 4 230, 34 330 C 64 430, 4 530, 34 630 C 64 730, 4 830, 34 970"
                stroke="url(#snakeGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="space-y-4">
              {LAYERS.map((layer) => (
                <motion.li
                  key={layer.code}
                  variants={layerVariants}
                  className="group relative flex items-stretch gap-5"
                >
                  <div className="relative z-10 shrink-0">
                    <div className="relative flex h-[68px] w-[68px] items-center justify-center rounded-xl border border-white/10 bg-[#0d0716] backdrop-blur-xl transition-all duration-500 group-hover:border-[#a888c8]/40">
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 0%, rgba(168,136,200,0.35), transparent 70%)",
                        }}
                      />
                      <span className="relative text-[#c9b3ec] transition-colors duration-500 group-hover:text-white [&_svg]:h-6 [&_svg]:w-6">
                        {layer.icon}
                      </span>
                    </div>
                    <span className="mt-1.5 block text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                      {layer.code}
                    </span>
                  </div>

                  <div className="relative flex-1 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-syne text-[17px] font-semibold text-white md:text-[18px]">
                        {layer.title}
                      </h3>
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/90">
                        {layer.tag}
                      </span>
                    </div>
                    <p className="mt-2.5 text-[14px] leading-[1.65] text-white/60 md:text-[14.5px]">
                      {layer.detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
