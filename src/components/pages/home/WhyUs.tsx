"use client";

import { ArrowUpRight, Check, X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { PROCESS_GLOW_BG } from "./Process";

const ours = [
  "In house team of 40+ Experts",
  "Results oriented",
  "Experience with 500+ Clients",
  "Proven DFY Content Funnel",
  "Personalised CRM",
  "24/7 Support, Anytime You Need Us",
];

const bonuses = ["Free Go High Level Subscription", "Free 1-on-1 Consultancy"];

const others = [
  "Unreliable Freelancers with slow turnarounds",
  "Edits that fail to convert or perform.",
  "Weak thumbnails and titles with no CTR strategy.",
  "Lack of proper distribution systems",
  "No expertise in funnels or lead capture systems.",
  "Limited revisions with no client-focused approach.",
  "Guesswork instead of data-driven decisions.",
  "Delayed responses and poor communication.",
];

function AnimatedGradientCard({
  children,
  className,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <div
      className={cn(
        "why-us-card-border",
        variant === "secondary" && "why-us-card-border--secondary",
      )}
    >
      <div className={cn("relative h-full overflow-hidden rounded-[23px]", className)}>
        {children}
      </div>
    </div>
  );
}

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden py-8 md:py-10">
      <div className="container mx-auto max-w-[1100px] px-6 md:px-8">
        <div className="section-heading">
          <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] font-syne text-white">
            Why Choose Us
          </p>
          <h2 className="mt-4 text-center font-syne text-[clamp(1.7rem,4.4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
            <span className="block text-gradient-brand">Know What</span>
            <span className="block text-white">We Do Differently</span>
          </h2>
        </div>

        <div className="relative z-0 mt-14 md:mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[420px] w-[min(100%,520px)] -translate-x-1/2 rounded-full opacity-90 lg:-top-1/4"
            style={{
              background: PROCESS_GLOW_BG,
              filter: "blur(28px)",
            }}
          />

          <div className="relative z-10 grid gap-6 md:grid-cols-2 md:gap-7">
            <AnimatedGradientCard
              variant="primary"
              className="bg-[radial-gradient(circle_farthest-corner_at_50%_0%,#1c0e31,var(--primary-black)_62%)] p-7 md:p-9"
            >
              <div className="flex items-center gap-3">
                <img src="/dark logo.png" alt="ZOOMX" className="h-[35px] w-auto" />
              </div>

              <ul className="mt-7 space-y-4">
                {ours.map((o) => (
                  <li key={o} className="flex items-start gap-4">
                    <Check
                      className="relative top-0.5 h-4 w-4 shrink-0 text-white"
                      strokeWidth={3}
                    />
                    <span className="text-sm leading-relaxed text-white">{o}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border border-white/[0.06] bg-[#100918]/90 p-5 backdrop-blur-sm">
                <p className="text-[12px] font-medium text-white/80">Bonuses you get with us:</p>
                <ul className="mt-3 space-y-2.5">
                  {bonuses.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7c499d] p-1 shadow-[0_2px_10px_3px_#5c2e9d91]">
                        <Check className="text-white" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-white">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedGradientCard>

            <AnimatedGradientCard
              variant="secondary"
              className="bg-[radial-gradient(circle_farthest-corner_at_50%_0%,#1a1f2e,var(--primary-black)_62%)] p-7 md:p-9"
            >
              <h3 className="font-syne text-2xl font-semibold tracking-tight text-white">
                Other Agencies
              </h3>
              <ul className="mt-7 space-y-4">
                {others.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/4">
                      <X
                        className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 text-[#ffffff8a]"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-[#ffffff8a]">{o}</span>
                  </li>
                ))}
              </ul>
            </AnimatedGradientCard>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <a
            href="#book-a-call"
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#5c2e9d] to-[#7c499d] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_-4px_rgba(124,73,157,0.45)] transition-all duration-200 hover:from-[#4c2583] hover:to-[#6c3e89]"
          >
            Book A 30-Min Call
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
