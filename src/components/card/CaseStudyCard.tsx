"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";

export type CaseStudy = {
  index: string;
  quote: { lead: string; punch: string };
  author: { name: string; role: string; avatar: string };
  stats: { value: string; label: string }[];
  file_type: "video" | "image";
  video_url?: string;
  image_url?: string;
};


function CaseStudyMedia({
  fileType,
  videoUrl,
  imageUrl,
  title,
}: {
  fileType: CaseStudy["file_type"];
  videoUrl?: string;
  imageUrl?: string;
  title: string;
}) {

  // This component renders either a video or an image based on the provided file type. It ensures that the media is displayed in a responsive and visually appealing manner, with appropriate styling and accessibility features.
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-[#202020] to-[#121213] rounded-(--20px-img-border-all)">
      {fileType === "video" && videoUrl ? (
        <>
          <video
            src={videoUrl}
            title={title}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full rounded-(--15px-img-border-all) object-cover"
          />
        </>
      ) : imageUrl ? (
        <>
          <Image src={imageUrl} alt={title} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/85 via-black/40 to-transparent"
          />
        </>
      ) : null}
    </div>
  );
}

export function CaseStudyCard({ caseStudy: c }: { caseStudy: CaseStudy }) {
  return (
    <article className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_farthest-corner_at_50%_0%,#5c2e9d50,var(--primary-black)_58%)] p-7 md:mt-16 md:p-10 lg:p-12">
      <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
        <p className="inline-block font-syne text-[14px] font-semibold uppercase leading-[1.8] tracking-[0.07em] text-white">
          {c.index}
          <span className="inline-block w-8" />
          Case study
        </p>
        <h3 className="mt-5 mb-2.5 font-syne text-[clamp(1.5rem,3.2vw,2.125rem)] font-semibold leading-[1.4] text-white">
          <span className="text-white/50">&ldquo;{c.quote.lead}</span>{" "}
          <span>{c.quote.punch}&rdquo;</span>
        </h3>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image src={c.author.avatar} alt={c.author.name} sizes="44px" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">{c.author.name}</p>
            <p className="text-xs text-(--gray-text)">{c.author.role}</p>
          </div>
        </div>

        <Button href="#book-a-call" variant="brand" size="cta">
          Book A Call
          <ArrowUpRight />
        </Button>
      </div>

      <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-12 md:items-end">
        <div className="flex items-end gap-6 md:gap-8">
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 280, damping: 14, mass: 0.8 }}
            >
              <p className="font-syne text-3xl font-bold text-white md:text-4xl">
                {c.stats[0].value}
              </p>
              <p className="mt-1 text-sm text-(--gray-text)">{c.stats[0].label}</p>
            </motion.div>
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="h-60 w-25 rounded-lg bg-[#5c2e9d] shadow-[0_2px_20px_3px_#5c2e9d91]"
            />
          </div>
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 14,
                mass: 0.8,
                delay: 0.12,
              }}
            >
              <p className="font-syne text-3xl font-bold text-white md:text-4xl">
                {c.stats[1].value}
              </p>
              <p className="mt-1 text-sm text-(--gray-text)">{c.stats[1].label}</p>
            </motion.div>
            <motion.div
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="h-40 w-20 rounded-lg bg-[#7c499d] shadow-[0_2px_20px_3px_#5c2e9d91]"
            />
          </div>
        </div>

        <CaseStudyMedia
          fileType={c.file_type}
          videoUrl={c.video_url}
          imageUrl={c.image_url}
          title={`${c.author.name} testimonial`}
        />
      </div>
    </article>
  );
}
