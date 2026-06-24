"use client";

import { useEffect, useRef } from "react";

import { Image } from "@/components/shared/Image";

const GLOW_IMG = "/images/22.png";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

// Calendly accepts `background_color`, `text_color`, and `primary_color` params
// to theme the inline embed (hex without the leading #).
const CALENDLY_THEME_PARAMS =
  "background_color=0a0612&text_color=ffffff&primary_color=a888c8";

const DEFAULT_CALENDLY_URL =
  `https://calendly.com/thezoomitltd/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1&${CALENDLY_THEME_PARAMS}`;

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || DEFAULT_CALENDLY_URL;

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

function loadCalendlyScript(): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${CALENDLY_SCRIPT_SRC}"]`,
  );
  if (existing) {
    return existing.dataset.loaded === "true"
      ? Promise.resolve()
      : new Promise((resolve) => {
          existing.addEventListener("load", () => resolve(), { once: true });
        });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Calendly widget script"));
    document.body.appendChild(script);
  });
}

function CalendlyInlineWidget() {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;

    let cancelled = false;

    loadCalendlyScript()
      .then(() => {
        if (cancelled || !parentRef.current) return;
        window.Calendly?.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: parentRef.current,
        });
      })
      .catch(() => {
        /* script blocked or offline */
      });

    return () => {
      cancelled = true;
      parent.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={parentRef}
      className="calendly-inline-widget w-full"
      data-url={CALENDLY_URL}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

export function CTASection() {
  return (
    <section id="book-a-call" className="relative py-8 md:py-10">
      <div className="app-container">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070009]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#070009_0%,transparent_42%,#070009_100%)]" />
            <Image
              src={GLOW_IMG}
              loading="lazy"
              sizes="(max-width: 1919px) 100vw, 1920px"
              alt=""
              className="relative z-0 h-full w-full max-w-[110%] object-cover opacity-70 blur-[6px]"
            />
          </div>

          {/* Ambient purple bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-90"
            style={{
              background:
                "radial-gradient(circle, rgba(124,73,157,0.55) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10 px-5 pb-10 pt-12 md:px-10 md:pb-14 md:pt-14">
            <div className="section-heading">
              <p className="text-center font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
                Work With Us
              </p>
              <h2 className="mt-4 flex flex-col items-center gap-2 text-center font-syne text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
                <span className="text-gradient-brand">Let&apos;s Level Up</span>
                <span className="text-white">Your Business!</span>
              </h2>
              <p className="mx-auto mt-5 max-w-[58ch] text-center text-[14px] leading-[1.7] text-white/60 md:text-[15px]">
                Pick a time that works for you — we&apos;ll walk through your offer,
                your channel, and exactly what next month would look like.
              </p>
            </div>

            <div className="mx-auto mt-10 w-full max-w-[1080px] md:mt-12">
              <div className="rounded-2xl bg-linear-to-br from-[#7c499d]/55 via-[#a888c8]/25 to-[#5c2e9d]/55 p-[1px]">
                <div className="relative overflow-hidden rounded-2xl bg-[#0a0612] p-2 md:p-4">
                  {/* Top status bar */}
                  <div className="flex items-center justify-between px-3 py-2.5 md:px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/90">
                        Live · 30-min slot
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      zoomx · book
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/8 bg-[#0a0612]">
                    <CalendlyInlineWidget />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
