"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";

import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";

const HERO_VIDEO_SRC = "/video/intro_video.mp4";

const GLOW_IMG = "/images/22.png";

const VIDEO_TILT_ROTATE_X = 13.4148;

/** px tolerance for “hero fully in view” (navbar / subpixel). */
const VIEWPORT_EDGE_SLACK = 12;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * 1 = hero should look flat (mockup). 0 = full tilt.
 * Straight when: (a) entire hero fits inside the viewport, or (b) hero is taller than the viewport
 * and currently blankets the full viewport height. Otherwise blend from ~50% viewport fill.
 */
function computeHeroStraightness(section: HTMLElement): number {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;
  if (vh <= 0) return 1;

  const visibleH = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
  const fill = visibleH / vh;

  const entireHeroVisible =
    rect.height <= vh + VIEWPORT_EDGE_SLACK * 2 &&
    rect.top >= -VIEWPORT_EDGE_SLACK &&
    rect.bottom <= vh + VIEWPORT_EDGE_SLACK;

  const heroBlanketsViewport =
    rect.top <= VIEWPORT_EDGE_SLACK && rect.bottom >= vh - VIEWPORT_EDGE_SLACK;

  if (entireHeroVisible || heroBlanketsViewport) return 1;

  // Partial overlap: ramp toward flat once roughly half the screen is hero (per design brief).
  return clamp((fill - 0.28) / 0.42, 0, 1);
}

function useHeroSectionVideoTiltDeg(sectionRef: RefObject<HTMLElement | null>): number {
  const [deg, setDeg] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const straight = computeHeroStraightness(el);
        setDeg(VIDEO_TILT_ROTATE_X * (1 - straight));
      });
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
    const ro = new ResizeObserver(tick);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      ro.disconnect();
    };
  }, [sectionRef]);

  return deg;
}

const teamImages: { src: string; alt: string; sizes?: string }[] = [
  {
    src: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68aab973a7d85a2764438c33_image%201_cmp.avif",
    alt: "",
  },
  {
    src: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af1ab8b6374769d4021_channels4_profile%20(1).avif",
    alt: "",
  },
  {
    src: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/6796419e2d5f0387789624ae_Client%20Photo%201.webp",
    alt: "Client portrait",
    sizes: "(max-width: 600px) 100vw, 600px",
  },
  {
    src: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68039af8dc4ee14f99625623_channels4_profile%20(3).avif",
    alt: "",
    sizes: "(max-width: 900px) 100vw, 900px",
  },
  {
    src: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/68aab97388ee822a62197678_image%203cmp.avif",
    alt: "",
  },
  {
    src: "https://cdn.prod.website-files.com/6796419e2d5f03877896246e/680357673bf2451641c3e59e_49450176611_d46ff738a1.avif",
    alt: "",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoTiltX = useHeroSectionVideoTiltDeg(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip">
      <div className="relative z-10 flex app-container flex-col items-stretch pb-20 pt-44">
        <div className="flex flex-col items-center justify-center">
          <div className="relative z-1 mb-0 flex flex-row items-center justify-center text-center">
            <div className="flex w-full max-w-[1200px] flex-col items-center justify-start gap-[15px] max-md:mb-[60px] max-[479px]:mb-[30px]">
              <div className="flex w-full items-center justify-center">
                <h1 className="m-0 text-center font-syne text-[clamp(2.1rem,5.2vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">
                  <span className="block bg-[linear-gradient(74deg,#898e99,var(--paragraph-text-color))] bg-clip-text text-transparent">
                    Grow Your Business Faster
                  </span>
                  <span className="block text-balance">
                    <span className="bg-[linear-gradient(74deg,#898e99,var(--paragraph-text-color))] bg-clip-text text-transparent">
                      with
                    </span>{" "}
                    <span className="text-white">Engaging Video Content</span>
                  </span>
                </h1>
              </div>

              <div className="flex w-full flex-col items-center justify-center">
                <div className="w-full max-w-[600px] px-1">
                  <p className="mx-auto max-w-[600px] text-balance text-center text-base font-normal text-[#8b8e97] max-md:text-sm">
                    We help entrepreneurs and businesses with Done-For-You organic content systems
                    that generate leads on autopilot.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col items-center justify-center">
                <div className="mt-2.5 flex w-full max-w-full lg:flex-row flex-col items-center justify-center gap-3 sm:gap-6 md:gap-[25px]">
                  <div className="flex shrink-0 items-center justify-center">
                    {teamImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative -mr-2.5 h-9 w-9 max-w-9 overflow-hidden rounded-full sm:-mr-4 sm:h-[45px] sm:w-[45px] sm:max-w-[45px]"
                      >
                        <Image
                          src={img.src}
                          sizes={img.sizes ?? "45px"}
                          alt={img.alt}
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex w-fit flex-col items-center text-center sm:max-w-none lg:items-start lg:text-left">
                    <span className="text-balance text-xs leading-snug text-white sm:text-sm">
                      Loved by 500+ Businesses worldwide.
                    </span>
                    <span className="text-balance text-[12px] text-(--gray-text) sm:text-[13px]">
                      Our Clients Speak for Us
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col items-center justify-center">
                <div className="flex w-full justify-center gap-[15px] pt-10 pb-8 max-md:pb-[15px] max-md:pt-5">
                  <Button href="#book-a-call" variant="brand" size="cta">
                    Book A Call
                    <ArrowUpRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex w-full flex-row items-center justify-center perspective-[1300px]">
            <div
              className="relative w-full max-w-[960px] overflow-hidden will-change-transform max-md:rounded-[10px] transform-3d transition-[transform] duration-300 ease-out"
              style={{
                transform: `translate3d(0,0,0) scale3d(1,1,1) rotateX(${videoTiltX}deg) rotateY(0deg) rotateZ(0deg) skew(0deg,0deg)`,
              }}
            >
              <div className="w-full">
                <div className="relative pt-[56.25%]">
                  <video
                    src={HERO_VIDEO_SRC}
                    title="ZOOMX web VSL Final"
                    controls
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full rounded-(--20px-img-border-all) object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-row items-start justify-center overflow-hidden opacity-100 transform-[translate3d(0px,0px,0px)_scale3d(1,1,1)_rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)_skew(0deg,0deg)] transform-3d">
        <div className="absolute inset-0 z-3 bg-[linear-gradient(90deg,#090909_17%,#090909e6_35%,transparent)]" />
        <div className="pointer-events-none absolute right-0 top-[61%] z-2 hidden h-[300px] w-[300px] rounded-full bg-(--light-grey) mix-blend-overlay opacity-[0.96] blur-[20px] md:block" />
        <Image
          src={GLOW_IMG}
          loading="lazy"
          sizes="(max-width: 1919px) 100vw, 1920px"
          alt=""
          className="relative top-[7%] z-1 h-full w-full max-w-[110%] object-cover blur-[20px] max-md:object-contain"
        />
      </div>
    </section>
  );
}
