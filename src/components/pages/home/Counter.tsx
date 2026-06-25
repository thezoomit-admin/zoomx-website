"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const COUNT_DURATION_MS = 1400;

/** Animates a number from 0 → target once `start` becomes true. */
function useCountUp(target: number, start: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const t = Math.min(1, elapsed / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);

  return value;
}

function CounterValue({
  target,
  suffix,
  start,
}: {
  target: number;
  suffix?: string;
  start: boolean;
}) {
  const value = useCountUp(target, start);
  return (
    <>
      <span className="tabular-nums">{value}</span>
      {suffix}
    </>
  );
}

type CounterItem = {
  value: number;
  suffix?: string;
  label: string;
};

const ITEMS: CounterItem[] = [
  { value: 15, suffix: "+", label: "Years Of Experience" },
  { value: 500, suffix: "+", label: "Satisfied Clients" },
  { value: 120, label: "4K Projects" },
  { value: 400, suffix: "+", label: "Project Done" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 180, damping: 18, mass: 0.9 },
  },
};

/** Corner-bracket frame around each counter. */
function Brackets() {
  const corners = [
    "left-0 top-0 border-l-2 border-t-2",
    "right-0 top-0 border-r-2 border-t-2",
    "left-0 bottom-0 border-l-2 border-b-2",
    "right-0 bottom-0 border-r-2 border-b-2",
  ] as const;

  return (
    <>
      {corners.map((cls) => (
        <span
          key={cls}
          aria-hidden
          className={`pointer-events-none absolute h-5 w-5 border-[#a888c8]/35 transition-colors duration-500 group-hover:border-[#a888c8] md:h-7 md:w-7 ${cls}`}
        />
      ))}
    </>
  );
}

export function Counter() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden pt-10 pb-24 md:pt-14 md:pb-32">
      {/* Ambient brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[260px] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124,73,157,0.18), transparent 65%)",
        }}
      />

      <style>{`
        /* ── Shared outline base — each counter uses a unique animation on top ── */
        .counter-outline {
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1.5px #a888c8;
          -webkit-background-clip: text;
          background-clip: text;
          filter: drop-shadow(0 0 14px rgba(124, 73, 157, 0.55));
        }

        /* 01 — Horizontal shimmer: a soft highlight sweeps left → right */
        @keyframes counter-anim-sweep {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .counter-anim-1 {
          background-image: linear-gradient(
            110deg,
            rgba(168,136,200,0) 0%,
            rgba(168,136,200,0) 35%,
            rgba(216,196,238,0.6) 50%,
            rgba(168,136,200,0) 65%,
            rgba(168,136,200,0) 100%
          );
          background-size: 200% 100%;
          animation: counter-anim-sweep 4.5s linear infinite;
        }

        /* 02 — Vertical fall: a band drifts top → bottom continuously */
        @keyframes counter-anim-fall {
          0%   { background-position: 50% 0%; }
          100% { background-position: 50% 200%; }
        }
        .counter-anim-2 {
          background-image: linear-gradient(
            180deg,
            rgba(168,136,200,0) 0%,
            rgba(168,136,200,0) 30%,
            rgba(216,196,238,0.7) 50%,
            rgba(124,73,157,0.5) 65%,
            rgba(168,136,200,0) 80%,
            rgba(168,136,200,0) 100%
          );
          background-size: 100% 200%;
          animation: counter-anim-fall 5s linear infinite;
        }

        /* 03 — Pulse glow: outline brightens and the drop-shadow breathes */
        @keyframes counter-anim-pulse {
          0%, 100% {
            -webkit-text-stroke-color: #a888c8;
            filter: drop-shadow(0 0 12px rgba(124,73,157,0.4));
          }
          50% {
            -webkit-text-stroke-color: #ffffff;
            filter: drop-shadow(0 0 24px rgba(216,196,238,0.85));
          }
        }
        .counter-anim-3 {
          animation: counter-anim-pulse 2.6s ease-in-out infinite;
        }

        /* 04 — Conic spin: a rotating brand-gradient fills the hollow */
        @keyframes counter-anim-spin {
          0%   { --conic-angle: 0deg; }
          100% { --conic-angle: 360deg; }
        }
        @property --conic-angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        .counter-anim-4 {
          background-image: conic-gradient(
            from var(--conic-angle, 0deg) at 50% 50%,
            #5c2e9d,
            #7c499d,
            #d6c4ee,
            #a888c8,
            #5c2e9d
          );
          animation: counter-anim-spin 6s linear infinite;
        }
        /* Browsers without @property fall back to a tilted gradient sweep */
        @supports not (background: paint(something)) {
          .counter-anim-4 {
            background-image: linear-gradient(
              135deg,
              #5c2e9d,
              #a888c8,
              #d6c4ee,
              #7c499d,
              #5c2e9d
            );
            background-size: 300% 300%;
            animation: counter-anim-sweep 5s linear infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .counter-anim-1,
          .counter-anim-2,
          .counter-anim-3,
          .counter-anim-4 { animation: none; }
        }
      `}</style>

      <div className="app-container">
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 lg:gap-10"
        >
          {ITEMS.map((item, idx) => {
            const animClass = `counter-anim-${(idx % 4) + 1}`;
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                className="group relative flex flex-col items-center px-4 py-6 text-center md:px-6 md:py-8"
              >
                <Brackets />

                <div
                  style={{ fontFamily: "var(--font-lato), sans-serif" }}
                  className={`counter-outline ${animClass} text-[clamp(2.4rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-tight`}
                  aria-label={`${item.value}${item.suffix ?? ""}`}
                >
                  <CounterValue
                    target={item.value}
                    suffix={item.suffix}
                    start={isInView}
                  />
                </div>

                <p className="mt-4 whitespace-nowrap font-syne text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white md:mt-5 md:text-[13.5px]">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
