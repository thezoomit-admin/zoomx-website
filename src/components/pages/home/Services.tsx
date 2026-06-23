"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

/* ============================================================
 * OLD DESIGN — Marquee row of service cards. Kept for reference.
 *
 * import { Image } from "@/components/shared/Image";
 * import { PROCESS_GLOW_BG } from "@/components/pages/home/Process";
 *
 * const services = [
 *   {
 *     icon: "/6797946e86829c0a07eb3d6f_14b.avif",
 *     title: "Short Form Videos",
 *     desc: "Byte sized top of the funnel videos for Instagram Reels and Tiktok",
 *   },
 *   {
 *     icon: "/6797946d852423e898d8cad9_1b.avif",
 *     title: "SAAS Videos",
 *     desc: "Organic podcasts to build trust and create credibility among your audience.",
 *   },
 *   {
 *     icon: "/6797946d7d95b7ff012094ce_2b.avif",
 *     title: "Ad Creatives & VSLs",
 *     desc: "Create dynamic content and convert more leads with paid ads.",
 *   },
 *   {
 *     icon: "/6797946e86829c0a07eb3d6f_14b.avif",
 *     title: "Launch Videos",
 *     desc: "Grow a personal brand in any niche with our trendy edits.",
 *   },
 * ] as const;
 *
 * function ServiceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
 *   return (
 *     <article className="flex w-[min(360px,88vw)] shrink-0 flex-col items-center rounded-[20px] border border-white/[0.08] bg-[#050505] px-8 pb-10 pt-9 text-center sm:w-[380px]">
 *       <div className="relative flex h-[160px] w-full items-center justify-center">
 *         <div
 *           aria-hidden
 *           className="pointer-events-none absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
 *           style={{ background: PROCESS_GLOW_BG, filter: "blur(24px)" }}
 *         />
 *         <Image
 *           src={icon}
 *           alt=""
 *           width={140}
 *           height={100}
 *           className="relative z-10 h-[100px] w-auto max-w-[85%] object-contain"
 *         />
 *       </div>
 *       <h3 className="mt-5 font-syne text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold leading-tight text-white">
 *         {title}
 *       </h3>
 *       <p className="mt-3 max-w-[300px] font-syne text-[15px] leading-[1.47] text-[#ffffff8a]">
 *         {desc}
 *       </p>
 *     </article>
 *   );
 * }
 *
 * Old <Services /> JSX:
 *   <div className="container">
 *     <div className="marquee-mask space-y-6 overflow-hidden md:space-y-7">
 *       <div className="marquee-track flex w-max gap-6 md:gap-7">
 *         {[...services, ...services].map((service, i) => (
 *           <ServiceCard key={`row-a-${service.title}-${i}`} {...service} />
 *         ))}
 *       </div>
 *       <div className="marquee-track-reverse flex w-max gap-6 md:gap-7">
 *         {[...services, ...services].map((service, i) => (
 *           <ServiceCard key={`row-b-${service.title}-${i}`} {...service} />
 *         ))}
 *       </div>
 *     </div>
 *   </div>
 * ============================================================ */

const GALLERY_IMAGES = [
  "/images/02.png",
  "/images/03.png",
  "/images/04.png",
  "/images/05.png",
  "/images/06.png",
  "/images/07.png",
  "/images/08.png",
  "/images/09.png",
  "/images/10.png",
  "/images/11.png",
  "/images/12.png",
  "/images/13.png",
  "/images/14.png",
  "/images/15.png",
  "/images/16.png",
  "/images/17.png",
  "/images/18.png",
  "/images/19.png",
  "/images/20.png",
  "/images/21.png",
  "/images/22.png",
];

const MIN_IMAGE_DURATION = 3.5;
const MAX_CYCLE_DURATION = 72;

type FlowDirection = "up" | "down" | "left" | "right";

type FlowCardProps = {
  direction: FlowDirection;
  flowPosition: number;
  cardHeight: number;
  gapSize: number;
  images: string[];
  className?: string;
  style?: CSSProperties;
};

function FlowCard({
  direction,
  flowPosition,
  cardHeight,
  gapSize,
  images,
  className = "",
  style,
}: FlowCardProps) {
  const uniqueId = `svc-flow-${direction}-${flowPosition}`;
  const isVertical = direction === "up" || direction === "down";

  const numImages = images.length;
  const imageDuration = Math.max(
    MIN_IMAGE_DURATION,
    MAX_CYCLE_DURATION / numImages,
  );
  const cycleDuration = imageDuration * numImages;

  const looped = [...images, ...images, ...images];

  const gapPercent = (gapSize / cardHeight) * 100;
  const imageWithGapPercent = 100 + gapPercent;
  const totalHeightPercent = looped.length * imageWithGapPercent;
  const singleImageHeightPercent =
    100 / (looped.length + (looped.length * gapPercent) / 100);

  const delayOffset =
    (cycleDuration - ((flowPosition * imageDuration) % cycleDuration)) %
    cycleDuration;

  const movePercent = 100 / 3;

  const keyframes =
    direction === "up"
      ? `0% { transform: translateY(0%); } 100% { transform: translateY(-${movePercent}%); }`
      : direction === "down"
        ? `0% { transform: translateY(-${movePercent}%); } 100% { transform: translateY(0%); }`
        : direction === "left"
          ? `0% { transform: translateX(0%); } 100% { transform: translateX(-${movePercent}%); }`
          : `0% { transform: translateX(-${movePercent}%); } 100% { transform: translateX(0%); }`;

  return (
    <div
      className={`relative aspect-[2/3] overflow-visible rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.35)] ${className}`}
      style={style}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl border border-white/[0.06]">
        <style>{`
          @keyframes ${uniqueId} { ${keyframes} }
          .container-${uniqueId} {
            animation: ${uniqueId} ${cycleDuration}s linear infinite;
            animation-delay: -${delayOffset}s;
          }
        `}</style>
        <div
          className={`container-${uniqueId} absolute left-0 top-0 ${
            isVertical ? "flex flex-col" : "flex flex-row"
          }`}
          style={{
            width: isVertical ? "100%" : `${totalHeightPercent}%`,
            height: isVertical ? `${totalHeightPercent}%` : "100%",
          }}
        >
          {looped.map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="relative flex-shrink-0"
              style={{
                width: isVertical ? "100%" : `${singleImageHeightPercent}%`,
                height: isVertical ? `${singleImageHeightPercent}%` : "100%",
              }}
            >
              <img
                src={src}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [dimensions, setDimensions] = useState({
    cardWidth: 0,
    gap: 8,
    verticalOffset: 50,
    isMobile: false,
  });

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const isMobile = w < 768;
      const cardWidth = w / 7.5;
      const gap = Math.max(4, (w / 1440) * 8);
      const verticalOffset = isMobile ? 20 : Math.max(20, (w / 1440) * 50);
      setDimensions({ cardWidth, gap, verticalOffset, isMobile });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const images = useMemo(() => GALLERY_IMAGES, []);

  const { cardWidth, gap, verticalOffset, isMobile } = dimensions;
  const gapValue = `${gap}px`;
  const cardStyle: CSSProperties = { width: `${cardWidth}px` };
  const cardHeight = cardWidth * 1.5;
  const paddingTop = Math.max(64, cardHeight * 0.28);
  const bottomBreathing = isMobile ? 28 : 44;
  const galleryHeight = `calc(${verticalOffset}px + ${cardHeight * 2}px + ${gap}px + ${bottomBreathing}px)`;

  if (!cardWidth) {
    return (
      <section id="services" className="py-12">
        <div className="app-container">
          <p className="text-center font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
            Core Services
          </p>
          <h2 className="mt-4 text-center font-syne text-[clamp(1.75rem,4.2vw,2.375rem)] font-semibold leading-[1.15] tracking-tight">
            <span className="block text-gradient-brand">Types Of Work</span>
            <span className="block text-white">We Do</span>
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="relative overflow-hidden">
      <div className="app-container">
        <p className="text-center font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
          Core Services
        </p>
        <h2 className="mt-4 text-center font-syne text-[clamp(1.75rem,4.2vw,2.375rem)] font-semibold leading-[1.15] tracking-tight">
          <span className="block text-gradient-brand">Types Of Work</span>
          <span className="block text-white">We Do</span>
        </h2>
      </div>

      <div
        className="relative mt-10 md:mt-12"
        style={{ paddingTop: isMobile ? undefined : `${paddingTop}px` }}
      >
        <div
          className="flex w-full min-w-max items-start"
          style={{ gap: gapValue, minHeight: galleryHeight }}
        >
          {/* LEFT EDGE — opacity 0.35 */}
          <div
            className="flex flex-col"
            style={{
              opacity: 0.35,
              gap: gapValue,
              marginLeft: `-${cardWidth * 0.5}px`,
              transform: `translateY(-${verticalOffset * 0.2}px)`,
            }}
          >
            <FlowCard direction="down" flowPosition={10} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            <FlowCard direction="down" flowPosition={11} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
          </div>

          {/* LEFT INNER */}
          <div
            className="flex flex-col"
            style={{ gap: gapValue, transform: `translateY(${verticalOffset}px)` }}
          >
            <FlowCard direction="up" flowPosition={9} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            <FlowCard direction="up" flowPosition={8} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
          </div>

          {/* CENTER ROW — 4 horizontal cards */}
          <div
            className="flex items-end justify-center"
            style={{
              gap: gapValue,
              marginTop: `calc(${verticalOffset}px + ${cardHeight}px + ${gap}px)`,
            }}
          >
            <div style={{ transform: `translateY(-${verticalOffset}px)` }}>
              <FlowCard direction="left" flowPosition={7} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            </div>
            <div>
              <FlowCard direction="left" flowPosition={6} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            </div>
            <div style={{ transform: `translateY(-${verticalOffset}px)` }}>
              <FlowCard direction="left" flowPosition={5} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            </div>
            <div>
              <FlowCard direction="left" flowPosition={4} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            </div>
          </div>

          {/* RIGHT INNER */}
          <div
            className="flex flex-col"
            style={{ gap: gapValue, transform: `translateY(${verticalOffset}px)` }}
          >
            <FlowCard direction="down" flowPosition={2} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            <FlowCard direction="down" flowPosition={3} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
          </div>

          {/* RIGHT EDGE — opacity 0.35 */}
          <div
            className="flex flex-col"
            style={{
              opacity: 0.35,
              gap: gapValue,
              marginRight: `-${cardWidth * 0.5}px`,
              transform: `translateY(-${verticalOffset * 0.2}px)`,
            }}
          >
            <FlowCard direction="up" flowPosition={1} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
            <FlowCard direction="up" flowPosition={0} style={cardStyle} cardHeight={cardHeight} gapSize={gap} images={images} />
          </div>
        </div>

        {/* Edge fade overlays so cards dissolve into the page bg */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-black to-transparent"
          style={{ width: `${Math.max(40, cardWidth * 0.4)}px` }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-black to-transparent"
          style={{ width: `${Math.max(40, cardWidth * 0.4)}px` }}
        />
      </div>
    </section>
  );
}
