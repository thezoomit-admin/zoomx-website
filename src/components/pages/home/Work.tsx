"use client";

import { useState } from "react";

import { toEmbedUrl } from "@/lib/embed-url";
import { cn } from "@/lib/utils";

type Project = { title: string; videoUrl: string };

type TabConfig = {
  label: string;
  /** Aspect ratio used by every card in this tab. */
  aspect: "16/9" | "9/16";
  /** Columns at lg+. Mobile is always single column, sm/md scales to 2. */
  cols: 2 | 3 | 4;
  projects: Project[];
};

const TABS: TabConfig[] = [
  {
    label: "Youtube Videos",
    aspect: "16/9",
    cols: 2,
    projects: [
      {
        title: "Real Estate Market Analysis",
        videoUrl: "https://youtu.be/PLS2bWoU8E4",
      },
      {
        title: "Why The Wealthiest Do This",
        videoUrl: "https://youtube.com/shorts/TEQ5avCcYZc?feature=share",
      },
    ],
  },
  {
    label: "Shorts",
    aspect: "9/16",
    cols: 4,
    projects: [
      { title: "Short 1", videoUrl: "https://youtube.com/shorts/paFRQH9x8Cw" },
      { title: "Short 2", videoUrl: "https://youtube.com/shorts/TEQ5avCcYZc?feature=share" },
      { title: "Short 3", videoUrl: "https://youtube.com/shorts/rXu_qH7cvi8" },
    ],
  },
  {
    label: "SAAS Videos",
    aspect: "16/9",
    cols: 2,
    projects: [],
  },
  {
    label: "Ad Creatives & VSL",
    aspect: "9/16",
    cols: 4,
    projects: [],
  },
];

function WorkEmptyState({ category }: { category: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center text-center py-10">
      <p className="mt-5 font-syne text-base font-semibold text-white">No projects yet</p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#ffffff8a]">
        {category} will appear here soon. Browse another category above to see our work.
      </p>
    </div>
  );
}

export function Work() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = TABS[activeIdx];

  return (
    <section id="work" className="relative overflow-hidden py-8 md:py-10">
      <div className="app-container">
        <div>
          <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] font-syne text-white">
            Our Work
          </p>
          <h2 className="mt-4 text-center font-syne text-[38px] font-semibold leading-[1.15] tracking-tight">
            <p className="block text-gradient-brand">Some Of Our</p>
            <p className="block text-white">Featured Projects</p>
          </h2>
        </div>
        <div
          role="tablist"
          aria-label="Project categories"
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:mt-12"
        >
          {TABS.map((t, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={t.label}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "font-syne text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "rounded-lg bg-gradient-to-r from-[#5c2e9d] to-[#4b2482] px-3 py-2 text-white shadow-[0_4px_24px_-4px_rgba(124,73,157,0.45)]"
                    : "rounded-lg px-3 py-2 text-white/70 hover:text-white",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {active.projects.length === 0 ? (
          <div className="mt-10 md:mt-14">
            <WorkEmptyState category={active.label} />
          </div>
        ) : (
          <div
            key={active.label}
            className={cn(
              "mt-10 grid gap-5 md:mt-14 md:gap-6",
              active.aspect === "16/9"
                ? "sm:grid-cols-2 lg:grid-cols-2"
                : cn(
                    "grid-cols-2 sm:grid-cols-3",
                    active.cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
                  ),
            )}
          >
            {active.projects.map((p) => (
              <article
                key={`${active.label}-${p.title}`}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-[#353333] bg-linear-to-br from-[#202020] to-[#121213]",
                  active.aspect === "16/9" ? "aspect-video" : "aspect-9/16",
                )}
              >
                <iframe
                  src={toEmbedUrl(p.videoUrl)}
                  title={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
