"use client";

import { useEffect, useRef } from "react";

import { Image } from "@/components/shared/Image";

const GLOW_IMG = "/images/22.png";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/thezoomitltd/new-meeting?hide_event_type_details=1&hide_gdpr_banner=1";

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
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#090909_0%,transparent_42%,#090909_100%)]" />
            <Image
              src={GLOW_IMG}
              loading="lazy"
              sizes="(max-width: 1919px) 100vw, 1920px"
              alt=""
              className="relative z-0 h-full w-full max-w-[110%] object-cover opacity-90 blur-[5px]"
            />
          </div>

          <div className="relative z-10">
            <div className="section-heading py-10">
              <p className="text-center font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
                Work With Us
              </p>
              <h2 className="mt-4 flex flex-col items-center gap-2 text-center font-syne text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
                <span className="text-gradient-brand">Let&apos;s Level Up</span>
                <span className="text-white">Your Business!</span>
              </h2>
            </div>

            <CalendlyInlineWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
