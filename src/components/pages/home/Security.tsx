"use client";

import { motion, useInView } from "framer-motion";
import {
  Database,
  EyeOff,
  FileCheck,
  KeyRound,
  Lock,
  Server,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const featureCards = [
  {
    Icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All files in transit are protected with AES-256 — your raw footage never leaves an unencrypted channel.",
  },
  {
    Icon: KeyRound,
    title: "Role-Based Access",
    description:
      "Granular permissions per editor, manager, and client. Revoke access in one click when projects wrap.",
  },
  {
    Icon: FileCheck,
    title: "Full Audit Trail",
    description:
      "Every download, edit, and approval is timestamped and logged — so you always know who touched what.",
  },
] as const;

const trustBadges = [
  { label: "AES-256", sub: "Encryption" },
  { label: "NDA", sub: "Standard" },
  { label: "SOC 2", sub: "Aligned" },
] as const;

function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(168,136,200,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,136,200,0.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(124,73,157,0.12) 0%, rgba(2,6,17,0) 70%)",
        }}
      />
    </div>
  );
}

function HeroCard() {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#080d1c]/70 p-8 backdrop-blur-sm md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,73,157,0.5), rgba(168,136,200,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 100% 100%, rgba(168,136,200,0.18), transparent 60%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#a888c8]/30 bg-[#a888c8]/8 px-3 py-1 font-syne text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9b3e6]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Trusted Process
        </span>

        <h3 className="mt-6 font-syne text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-tight text-white">
          Your footage stays{" "}
          <span className="text-gradient-brand">private, end to end.</span>
        </h3>

        <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[#ffffffb3]">
          Every brand we work with signs a mutual NDA before a single file moves.
          From upload to delivery, your raw assets stay sealed inside an
          access-controlled vault — never indexed, never reused.
        </p>

        <div className="relative mt-8 flex-1">
          <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center md:h-[300px] md:w-[300px]">
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full border border-dashed border-[#a888c8]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-6 rounded-full border border-[#7c499d]/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-12 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,73,157,0.35), rgba(2,6,17,0) 70%)",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.95, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {[0, 1, 2, 3].map((i) => {
              const angle = (i * Math.PI) / 2 + Math.PI / 4;
              const r = 130;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              const icons = [Lock, EyeOff, Server, Database];
              const Icon = icons[i];
              return (
                <motion.div
                  key={i}
                  className="absolute flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0d1224]/80 text-[#c9b3e6] backdrop-blur-sm"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4 + i * 0.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
              );
            })}

            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-2xl text-white shadow-[0_20px_60px_-10px_rgba(124,73,157,0.6)] md:h-28 md:w-28"
              style={{
                background:
                  "linear-gradient(135deg, #5c2e9d 0%, #7c499d 55%, #a888c8 100%)",
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="h-12 w-12 md:h-14 md:w-14" strokeWidth={1.6} />
            </motion.div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="text-center">
              <p
                className="font-syne text-[18px] font-bold leading-none md:text-[20px]"
                style={{
                  background:
                    "linear-gradient(135deg, #c9b3e6, #a888c8 60%, #7c499d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {badge.label}
              </p>
              <p className="mt-1.5 font-syne text-[10px] font-semibold uppercase tracking-[0.12em] text-[#ffffff80]">
                {badge.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type FeatureCardProps = (typeof featureCards)[number] & { delay: number };

function FeatureCard({ Icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#080d1c]/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#a888c8]/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(124,73,157,0.25), transparent 70%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div className="relative shrink-0">
          <div
            aria-hidden
            className="absolute inset-0 rounded-lg opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(135deg, rgba(92,46,157,0.6), rgba(168,136,200,0.4))",
            }}
          />
          <div
            className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-[#c9b3e6] transition-colors duration-300 group-hover:text-white"
            style={{
              background:
                "linear-gradient(135deg, rgba(92,46,157,0.22), rgba(124,73,157,0.08))",
            }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="font-syne text-[16px] font-semibold leading-tight text-white">
            {title}
          </h4>
          <p className="mt-2 text-[13px] leading-relaxed text-[#ffffff99]">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Security() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="security"
      className={cn(
        "relative overflow-hidden bg-[#020611] py-20 md:py-28",
      )}
    >
      <GridBackdrop />

      <div
        ref={ref}
        className="relative z-10 app-container"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="section-heading mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a888c8]/30 bg-[#a888c8]/8 px-3 py-1 font-syne text-[12px] font-semibold uppercase tracking-[0.14em] text-[#c9b3e6]">
            <Shield className="h-3.5 w-3.5" />
            Security
          </span>
          <h2 className="mt-5 font-syne text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
            <span className="text-white">Built on </span>
            <span className="text-gradient-brand">trust by default.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#ffffffb3]">
            We treat your assets the way we&apos;d treat our own — protected at
            every step, accessible only to the people who need them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 grid gap-5 lg:grid-cols-5 lg:gap-6"
        >
          <div className="lg:col-span-3">
            <HeroCard />
          </div>

          <div className="flex flex-col gap-5 lg:col-span-2 lg:gap-6">
            {featureCards.map((card, idx) => (
              <FeatureCard key={card.title} {...card} delay={0.2 + idx * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
