"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Play, X } from "lucide-react";

type Video = { id: string; title: string; thumbnail: string };

type VideoGalleryProps = {
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  videos: Video[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
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

export function VideoGallery({
  eyebrow,
  titleGradient,
  titleWhite,
  videos,
}: VideoGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124,73,157,0.16), transparent 55%)",
        }}
      />

      <div className="app-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center"
        >
          <motion.p
            variants={itemVariants}
            className="font-syne text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec]"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-4 font-syne text-[clamp(1.8rem,3.6vw,2.5rem)] font-semibold leading-[1.1] tracking-tight"
          >
            <span className="block text-gradient-brand">{titleGradient}</span>
            <span className="block text-white">{titleWhite}</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-12 md:gap-6 lg:grid-cols-3"
        >
          {videos.map((video) => (
            <motion.button
              key={video.id + video.title}
              variants={itemVariants}
              type="button"
              onClick={() => setActiveId(video.id)}
              className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#0a0612] text-left transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#a888c8]/60 hover:shadow-[0_30px_70px_-15px_rgba(124,73,157,0.65),0_0_0_1px_rgba(168,136,200,0.25)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,6,18,0) 0%, rgba(10,6,18,0.65) 70%, rgba(10,6,18,0.92) 100%)",
                }}
              />

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-xl transition-all duration-500 group-hover:scale-110 group-hover:border-white/50 group-hover:bg-[#7c499d]/40">
                  <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                </span>
              </span>

              <span className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <span className="block font-syne text-[14px] font-semibold leading-snug text-white md:text-[15px]">
                  {video.title}
                </span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {activeId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/90"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1`}
              title="Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
