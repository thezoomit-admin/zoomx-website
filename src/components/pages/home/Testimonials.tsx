"use client";

import { motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Image } from "@/components/shared/Image";
import { toEmbedUrl, toVideoPreviewUrl, toWatchUrl } from "@/lib/embed-url";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  /**
   * "video" => `poster` is the source video URL (YouTube share / shorts /
   * watch / embed, or any Vimeo URL). It is normalized into an embed URL at
   * render time. "image" => `poster` is a regular image URL.
   */
  type: "video" | "image";
  poster: string;
};

const FALLBACK_PREVIEW =
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=720&h=1280&fit=crop";

const items: Testimonial[] = [
  {
    quote: "Honestly, they are the best in the game, and I highly recommend",
    name: "Nick Barner",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/120?img=11",
    type: "video",
    poster: "https://youtu.be/d2PuMIIjJo8",
  },
  {
    quote:
      "I have nothing but great things to say. They definitely helped me kickstart everything I've done on YouTube.",
    name: "Spencer Pawliw",
    role: "Skool Games Winner",
    avatar: "https://i.pravatar.cc/120?img=14",
    type: "video",
    poster: "https://www.youtube.com/shorts/6yJ1DN-jgJ8?feature=share",
  },
  {
    quote:
      "ZOOMX is the most reliable editing partner you could ask for your content creation ventures.",
    name: "Josh Faulkner",
    role: "Entrepreneur",
    avatar: "https://i.pravatar.cc/120?img=33",
    type: "video",
    poster: "https://www.youtube.com/shorts/FcSn3qobomc?feature=share",
  },
  {
    quote: "Very quick turnaround and high quality videos. Revisions get done very fast.",
    name: "Tech With Lucy",
    role: "Educator",
    type: "image",
    avatar: "https://i.pravatar.cc/120?img=33",
    poster:
      "https://thumbs.dreamstime.com/b/portrait-happy-indian-man-smiling-friendly-glad-expression-looking-camera-headphones-stands-alone-around-neck-feel-417808683.jpg",
  },
];

const AUTOPLAY_MS = 4000;

type CarouselLayout = "mobile" | "tablet" | "desktop";

const CAROUSEL_LAYOUT = {
  mobile: {
    spread: 94,
    sideScale: 0.74,
    cardClass: "h-[90%] w-[48%] max-w-[218px]",
    dimClass: "bg-black/50",
    playClass: "h-11 w-11 sm:h-12 sm:w-12",
  },
  tablet: {
    spread: 54,
    sideScale: 0.82,
    cardClass: "h-[92%] w-[44%] max-w-[340px]",
    dimClass: "bg-black/40",
    playClass: "h-14 w-14 sm:h-16 sm:w-16",
  },
  desktop: {
    spread: 54,
    sideScale: 0.82,
    cardClass: "h-[92%] w-[44%] max-w-[440px]",
    dimClass: "bg-black/40",
    playClass: "h-14 w-14 sm:h-16 sm:w-16",
  },
} as const;

function useCarouselLayout(): CarouselLayout {
  const [layout, setLayout] = useState<CarouselLayout>("mobile");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setLayout("desktop");
      else if (w >= 768) setLayout("tablet");
      else setLayout("mobile");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}

/** Shortest-path offset on a circular carousel (handles even-length lists). */
function getCarouselOffset(index: number, activeIndex: number, total: number): number {
  let offset = index - activeIndex;
  while (offset > total / 2) offset -= total;
  while (offset < -total / 2) offset += total;
  return offset;
}

function getPreviewSrc(item: Testimonial): string {
  if (item.type === "image") return item.poster;
  return toVideoPreviewUrl(item.poster) ?? FALLBACK_PREVIEW;
}

function preloadPreview(src: string) {
  if (typeof window === "undefined") return;
  const img = new window.Image();
  img.src = src;
}
function ShortsPlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#f03"
        d="M34.6 3.1c-3.8 0-7.1 2.4-8.4 6-1.3-3.6-4.6-6-8.4-6C11.1 3.1 7 7.2 7 12.3v23.4c0 5.1 4.1 9.2 9.2 9.2 3.8 0 7.1-2.4 8.4-6 1.3 3.6 4.6 6 8.4 6 5.1 0 9.2-4.1 9.2-9.2V12.3c0-5.1-4.1-9.2-9.2-9.2Z"
      />
      <path fill="#fff" d="m20 16 12 8-12 8V16Z" />
    </svg>
  );
}

type TestimonialCardProps = {
  item: Testimonial;
  index: number;
  activeIndex: number;
  totalCards: number;
  layout: CarouselLayout;
};

function TestimonialCard({ item, index, activeIndex, totalCards, layout }: TestimonialCardProps) {
  const { spread, sideScale, cardClass, dimClass, playClass } = CAROUSEL_LAYOUT[layout];
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const previewSrc = getPreviewSrc(item);

  const isActive = index === activeIndex;
  const offset = getCarouselOffset(index, activeIndex, totalCards);
  const isVisible = isActive || Math.abs(offset) === 1;
  const isVideo = item.type === "video";

  const resetKey = `${isActive}-${item.poster}`;
  const [prevResetKey, setPrevResetKey] = useState(resetKey);
  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey);
    setIsPlaying(false);
    setIframeReady(false);
  }

  const showIframe = isVideo && isActive && isPlaying;
  const showPlayButton = isVideo && isActive && !isPlaying;
  const showDecorativePlay = isVideo && !isActive;

  const handlePlay = () => {
    setIsPlaying(true);
    setIframeReady(false);
  };

  return (
    <motion.div
      className={cn("absolute", cardClass)}
      style={{ transformStyle: "preserve-3d" }}
      animate={{
        x: isActive ? "0%" : `${offset * spread}%`,
        scale: isActive ? 1 : sideScale,
        zIndex: isActive ? totalCards + 10 : totalCards - Math.abs(offset),
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      initial={false}
    >
      <motion.div
        className="relative mx-auto aspect-9/16 h-full w-auto max-w-full overflow-hidden rounded-[20px] border border-[#353333] bg-[#121213] shadow-2xl md:rounded-2xl"
        animate={{ pointerEvents: isActive ? "auto" : "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- needs runtime onError fallback for YouTube CDN 404s */}
        <img
          src={previewSrc}
          alt={`${item.name} testimonial preview`}
          width={240}
          height={427}
          decoding="async"
          fetchPriority={isActive ? "high" : "auto"}
          loading={isVisible ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            const el = e.currentTarget;
            if (el.src !== FALLBACK_PREVIEW) {
              el.src = FALLBACK_PREVIEW;
            }
          }}
        />

        {showIframe && (
          <iframe
            key={`${item.poster}-playing`}
            src={toEmbedUrl(item.poster, {
              autoplay: true,
              origin: typeof window !== "undefined" ? window.location.origin : undefined,
            })}
            title={`${item.name} testimonial`}
            className={cn(
              "absolute inset-0 z-[12] h-full w-full border-0 transition-opacity duration-300",
              iframeReady ? "opacity-100" : "opacity-0",
            )}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setIframeReady(true)}
          />
        )}

        {!isActive && <div className={cn("absolute inset-0 z-10", dimClass)} aria-hidden />}

        {showDecorativePlay && (
          <div className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center">
            <ShortsPlayIcon className={cn("drop-shadow-lg", playClass)} />
          </div>
        )}

        {showPlayButton && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play ${item.name} testimonial video`}
            className="absolute inset-0 z-[15] flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
          >
            <ShortsPlayIcon className={cn("drop-shadow-lg", playClass)} />
          </button>
        )}

        {showIframe && !iframeReady && (
          <div className="pointer-events-none absolute inset-0 z-[14] flex items-center justify-center bg-black/30">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}

        {showIframe && iframeReady && (
          <a
            href={toWatchUrl(item.poster)}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 z-[16] rounded bg-black/70 px-2 py-1 text-[10px] text-white/80 hover:text-white"
          >
            YouTube
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Testimonials() {
  const carouselLayout = useCarouselLayout();
  const [activeIndex, setActiveIndex] = useState(Math.floor(items.length / 2));
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const current = items[activeIndex];

  useEffect(() => {
    for (const item of items) {
      preloadPreview(getPreviewSrc(item));
    }
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, []);

  const changeSlide = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + items.length) % items.length);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
      return;
    }

    autoplayRef.current = setInterval(goToNext, AUTOPLAY_MS);
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [isPaused, activeIndex, goToNext]);

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragThreshold = 75;
    if (info.offset.x > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (info.offset.x < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  return (
    <section id="reviews" className="relative overflow-hidden py-8 md:py-10">
      <div className="app-container">
        <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] font-syne text-white">
          Client Testimonials
        </p>
        <h2 className="mt-4 text-center font-syne text-[38px] font-semibold leading-[1.15] tracking-tight">
          <p className="block text-gradient-brand">Hear What They&rsquo;re</p>
          <p className="block text-white">Saying About Us</p>
        </h2>
      </div>

      <motion.div
        className="relative mx-auto mt-12 w-full max-w-375 px-6 md:mt-16 md:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative -mx-6 flex h-[400px] w-[calc(100%+3rem)] items-center justify-center overflow-hidden md:mx-0 md:h-[480px] md:w-full lg:h-[520px]">
          <motion.div
            className="flex h-full w-full items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
          >
            {items.map((item, index) => (
              <TestimonialCard
                key={item.name}
                item={item}
                index={index}
                activeIndex={activeIndex}
                totalCards={items.length}
                layout={carouselLayout}
              />
            ))}
          </motion.div>
        </div>

        <motion.div className="mt-6 flex items-center justify-center gap-6" initial={false}>
          <button
            type="button"
            onClick={() => changeSlide(activeIndex - 1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/80 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <motion.div className="flex items-center justify-center gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => changeSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-6 bg-white" : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </motion.div>

          <button
            type="button"
            onClick={() => changeSlide(activeIndex + 1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/80 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>

      <div
        key={current.name}
        className="mx-auto mt-10 max-w-[640px] px-6 text-center animate-in fade-in duration-500 md:px-8"
      >
        <p className="font-syne text-[clamp(1.1rem,2.6vw,1.6rem)] font-semibold leading-[1.35] text-white">
          &ldquo;{current.quote}&rdquo;
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Image
            src={current.avatar}
            alt={current.name}
            width={40}
            height={40}
            loading="lazy"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{current.name}</p>
            <p className="text-xs text-(--gray-text)">{current.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
