"use client";

import { Image } from "@/components/shared/Image";
import { PROCESS_GLOW_BG } from "@/components/pages/home/Process";

const services = [
  {
    icon: "/6797946e86829c0a07eb3d6f_14b.avif",
    title: "Short Form Videos",
    desc: "Byte sized top of the funnel videos for Instagram Reels and Tiktok",
  },
  {
    icon: "/6797946d852423e898d8cad9_1b.avif",
    title: "SAAS Videos",
    desc: "Organic podcasts to build trust and create credibility among your audience.",
  },
  {
    icon: "/6797946d7d95b7ff012094ce_2b.avif",
    title: "Ad Creatives & VSLs",
    desc: "Create dynamic content and convert more leads with paid ads.",
  },
  {
    icon: "/6797946e86829c0a07eb3d6f_14b.avif",
    title: "Launch Videos",
    desc: "Grow a personal brand in any niche with our trendy edits.",
  },
] as const;

function ServiceCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <article className="flex w-[min(360px,88vw)] shrink-0 flex-col items-center rounded-[20px] border border-white/[0.08] bg-[#050505] px-8 pb-10 pt-9 text-center sm:w-[380px]">
      <div className="relative flex h-[160px] w-full items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
          style={{
            background: PROCESS_GLOW_BG,
            filter: "blur(24px)",
          }}
        />
        <Image
          src={icon}
          alt=""
          width={140}
          height={100}
          className="relative z-10 h-[100px] w-auto max-w-[85%] object-contain"
        />
      </div>
      <h3 className="mt-5 font-syne text-[clamp(1.15rem,2.5vw,1.35rem)] font-semibold leading-tight text-white">
        {title}
      </h3>
      <p className="mt-3 max-w-[300px] font-syne text-[15px] leading-[1.47] text-[#ffffff8a]">
        {desc}
      </p>
    </article>
  );
}

export function Services() {
  const loop = [...services, ...services];

  return (
    <section id="services">
      <div className="container mx-auto px-6 md:px-8">
        <p className="text-center font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
          Core Services
        </p>
        <h2 className="mt-4 text-center font-syne text-[clamp(1.75rem,4.2vw,2.375rem)] font-semibold leading-[1.15] tracking-tight">
          <p className="block text-gradient-brand">Types Of Work</p>
          <p className="block text-white">We Do</p>
        </h2>
      </div>

      <div className="container">
        <div className="marquee-mask space-y-6 overflow-hidden md:space-y-7">
          <div className="marquee-track flex w-max gap-6 md:gap-7">
            {loop.map((service, i) => (
              <ServiceCard key={`row-a-${service.title}-${i}`} {...service} />
            ))}
          </div>
          <div className="marquee-track-reverse flex w-max gap-6 md:gap-7">
            {loop.map((service, i) => (
              <ServiceCard key={`row-b-${service.title}-${i}`} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
