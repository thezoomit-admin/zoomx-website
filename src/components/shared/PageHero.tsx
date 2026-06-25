"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type PageHeroProps = {
  /** Video shown in the media card. Ignored if `imageSrc` is provided. */
  videoSrc?: string;
  /** If set, an image is shown instead of a video. */
  imageSrc?: string;
  description?: string;
  /** Page name used in breadcrumb + title. Falls back to URL slug if omitted. */
  name?: string;
};

function pathToLabel(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  if (!segment) return "Home";
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
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

export function PageHero({
  videoSrc,
  imageSrc,
  description,
  name,
}: PageHeroProps) {
  const pathname = usePathname() ?? "/";
  const pageName = name ?? pathToLabel(pathname);
  const isImage = Boolean(imageSrc);

  return (
    <section className="relative overflow-hidden pb-12 pt-32.5 md:pb-16 md:pt-40">
      {/* Base color fallback */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[#0a0612]" />

      {/* Background image — fills the whole section */}
      <Image
        src="/banner/page-hero/pagehero4.png"
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
          className="grid items-center gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-x-12"
        >
          {/* LEFT COLUMN — title / desc */}
          <div className="order-2 flex flex-col gap-7 lg:order-1">
            {/* Breadcrumb + Title */}
            <motion.div variants={itemVariants}>
              {/* Breadcrumb (1st line — dynamic) */}
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 font-syne text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[#d6c4ee]"
              >
                <span className="mr-2 inline-block h-[1px] w-8 bg-[#a888c8]/60" />
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#a888c8]/70" />
                <span
                  title={pageName}
                  className="block max-w-[180px] truncate text-white sm:max-w-[240px] md:max-w-[320px]"
                >
                  {pageName}
                </span>
              </nav>

              {/* Title (2nd line — Page Name) */}
              <h1
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
                className="mt-4 text-[clamp(2rem,4.6vw,3.75rem)] font-bold leading-[1.04] tracking-tight"
              >
                <span className="block text-white">{pageName}</span>
              </h1>
            </motion.div>

            {/* Description (desc) */}
            {description && (
              <motion.p
                variants={itemVariants}
                className="max-w-[56ch] text-[15px] leading-[1.7] text-white/80 md:text-[15.5px]"
              >
                {description}
              </motion.p>
            )}

          </div>

          {/* RIGHT COLUMN — animated, glowing media card */}
          <motion.div
            variants={itemVariants}
            className="relative order-1 w-full lg:order-2"
          >
            <div className="group relative">
              <div className="relative">
                {/* Outer gradient ring */}
                <div className="rounded-2xl bg-linear-to-br from-[#7c499d]/65 via-[#a888c8]/30 to-[#5c2e9d]/65 p-[1.5px] shadow-[0_45px_120px_-25px_rgba(124,73,157,0.75)] transition-shadow duration-500 group-hover:shadow-[0_55px_140px_-25px_rgba(168,136,200,0.85)]">
                  {/* Inner frame */}
                  <div className="overflow-hidden rounded-2xl bg-[#070009] p-2.5 md:p-3">
                    {/* Window chrome */}
                    <div className="flex items-center gap-1.5 px-1.5 pb-2">
                      <span className="h-2 w-2 rounded-full bg-red-400/70" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                        zoomx · preview
                      </span>
                    </div>

                    {/* Media (video or image) */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                      {isImage ? (
                        <Image
                          src={imageSrc as string}
                          alt={`${pageName} preview`}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className="h-full w-full object-cover object-center transition-transform duration-1200 ease-out group-hover:scale-[1.04]"
                          priority
                        />
                      ) : videoSrc ? (
                        <video
                          src={videoSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          controlsList="nodownload"
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/30">
                          <ImageIcon className="h-10 w-10" />
                        </div>
                      )}

                      {/* Now Playing badge — videos only */}
                      {!isImage && (
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                          <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                          <span className="font-syne text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/85">
                            Now Playing
                          </span>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              </div>

              {/* Monitor stand */}
              <div
                aria-hidden
                className="mx-auto mt-1 h-2 w-full rounded-b-3xl bg-linear-to-b from-[#7c499d] via-[#5c2e9d] to-[#3b1f63] shadow-[0_6px_22px_-4px_rgba(124,73,157,0.55)]"
              />
              <div
                aria-hidden
                className="mx-auto h-14 w-[55%] bg-linear-to-b from-[#a888c8] via-[#7c499d] to-[#3b1f63] shadow-[0_10px_30px_-8px_rgba(168,136,200,0.45)]"
                style={{ clipPath: "polygon(18% 0, 82% 0, 100% 100%, 0 100%)" }}
              />
              <div
                aria-hidden
                className="mx-auto -mt-px h-3.5 w-[92%] rounded-full bg-linear-to-r from-transparent via-[#5c2e9d] to-transparent shadow-[0_14px_40px_-6px_rgba(168,136,200,0.65)]"
              />
              <div
                aria-hidden
                className="mx-auto mt-1 h-1 w-[65%] rounded-full bg-linear-to-r from-transparent via-[#a888c8]/60 to-transparent blur-sm"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

