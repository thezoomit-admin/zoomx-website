"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

/**
 * Hero2 — professional "video-studio" layout:
 *  - Left: huge mixed filled/outlined title, two CTAs, intro copy, quick
 *    contact tiles.
 *  - Right: laptop-mockup video frame.
 * Brand palette (purple) instead of the reference image's orange.
 */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero2() {
  return (
    <section className="relative overflow-hidden pb-12 pt-28 md:pb-16 md:pt-32">
      {/* Base color fallback */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[#0a0612]" />

      {/* Background image */}
      <Image
        src="/hero/hero.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-20 object-cover"
      />

      {/* Soft dark wash so text stays readable on bright spots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-[#0a0612]/55 via-[#0a0612]/35 to-[#0a0612]/70"
      />

      {/* Solid dark mask behind the navbar so the image doesn't bleed through it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-24.5 bg-linear-to-b from-[#0a0612] via-[#0a0612] to-transparent md:h-32"
      />

      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-y-7"
        >
          {/* HEADING (Full Width, Massive) */}
          <div className="w-full">
            <h1
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
              className="text-[clamp(2rem,4.5vw,4.5rem)] font-extrabold uppercase leading-tight tracking-tight"
            >
              <motion.span
                variants={itemVariants}
                className="block text-white lg:whitespace-nowrap"
              >
                Professional Video Editing
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block lg:whitespace-nowrap"
              >
                <span className="hero2-outline">Post-Production</span>
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block text-white lg:whitespace-nowrap"
              >
                Services
              </motion.span>
            </h1>
          </div>

          {/* LOWER SECTION: Paragraph + Laptop */}
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-y-12 lg:gap-x-12 w-full">

            {/* PARAGRAPH AND BUTTONS */}
            <div className="order-2 lg:order-1 flex flex-col">
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3"
              >
                <Button href="/#book-a-call" variant="brand" size="cta">
                  Get Started Now
                  <ArrowUpRight />
                </Button>
                <Button href="/portfolio" variant="brandOutline" size="cta">
                  Portfolio
                </Button>
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="mt-8 max-w-[52ch] text-[14.5px] leading-[1.75] text-white/75 md:text-[15.5px]"
              >
                ZOOMX is a leading video editing and post-production outsourcing
                partner to video content creators and production houses worldwide.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap items-center gap-3"
              >
                {[
                  {
                    label: "Instagram",
                    href: "https://instagram.com/",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    label: "YouTube",
                    href: "https://youtube.com/",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.546 15.568V8.432L15.818 12l-6.273 3.568Z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: "https://linkedin.com/",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.064 2.063 2.063 0 1 1 2.063 2.064Zm1.78 13.019H3.555V9h3.562v11.452ZM22.225 0H1.771C.792 0 0 .775 0 1.729v20.541C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .775 23.2 0 22.222 0h.003Z" />
                      </svg>
                    ),
                  },
                  {
                    label: "WhatsApp",
                    href: "https://wa.me/",
                    icon: <MessageCircle className="h-[18px] w-[18px]" />,
                  },
                  {
                    label: "Email",
                    href: "mailto:hello@zoomx.tv",
                    icon: <Mail className="h-[18px] w-[18px]" />,
                  },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero2-social-btn"
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* LAPTOP VIDEO (Huge) */}
            <motion.div
              variants={itemVariants}
              className="relative w-full order-1 lg:order-2 lg:flex lg:items-center"
            >
              <div className="relative w-full lg:max-w-[760px] lg:ml-auto lg:-mt-20">
                {/* Laptop body */}
                <div className="rounded-xl bg-linear-to-br from-[#7c499d]/45 via-[#a888c8]/20 to-[#5c2e9d]/45 p-[1.5px] shadow-[0_30px_80px_-20px_rgba(124,73,157,0.5)]">
                  <div className="overflow-hidden rounded-xl bg-[#070009] p-2.5 md:p-3.5">
                    {/* Top bar */}
                    <div className="flex items-center gap-1.5 px-1 pb-2">
                      <span className="h-2 w-2 rounded-full bg-red-400/70" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                      <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/35">
                        zoomx · player
                      </span>
                    </div>

                    {/* Video */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
                      <video
                        src="/video/intro_video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Laptop base + monitor stand */}
                <div
                  aria-hidden
                  className="mx-auto mt-1 h-2.5 w-[88%] rounded-b-2xl bg-linear-to-b from-[#1c0f33] to-[#0a0612]"
                />
                <div
                  aria-hidden
                  className="mx-auto h-10 w-[30%] bg-linear-to-b from-[#3b1f63] via-[#2a1647] to-[#1c0f33]"
                  style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }}
                />
                <div
                  aria-hidden
                  className="mx-auto -mt-px h-1.5 w-[55%] rounded-full bg-linear-to-r from-transparent via-[#1c0f33] to-transparent shadow-[0_8px_24px_-4px_rgba(124,73,157,0.45)]"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero2-social-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          color: #fff;
          background: linear-gradient(45deg, #5c2e9d, #7c499d, #a888c8);
          border-radius: 10px;
          cursor: pointer;
          isolation: isolate;
          box-shadow: 0 8px 32px -4px rgba(168, 136, 200, 0.55);
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        .hero2-social-btn svg {
          position: relative;
          z-index: 1;
        }
        .hero2-social-btn::before {
          content: "";
          position: absolute;
          inset: 1px;
          background: #272727;
          border-radius: 9px;
        }
        .hero2-social-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px -4px rgba(168, 136, 200, 0.75);
        }

        .hero2-outline {
          display: inline;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1.5px #a888c8;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 14px rgba(124, 73, 157, 0.55));
          background-image: radial-gradient(
            ellipse at 50% 50%,
            #d6c4ee 0%,
            #a888c8 35%,
            #7c499d 70%,
            #5c2e9d 100%
          );
        }
      `}</style>
    </section>
  );
}
