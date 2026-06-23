"use client";

import { ArrowUpRight } from "lucide-react";

import { Image } from "@/components/shared/Image";

export type BlogPost = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  author: string;
  date: string;
  href: string;
};

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#ffffff1f] bg-[#0a0a0a] transition-colors duration-300 hover:border-[#ffffff33]">
      <a
        href={post.href}
        className="relative block aspect-16/10 w-full overflow-hidden bg-[#121213]"
        aria-label={post.title}
      >
        <Image
          src={post.cover}
          alt={post.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </a>

      <div className="flex flex-1 flex-col px-6 pt-6 pb-7 sm:px-7">
        <p className="flex items-center gap-2 text-[13px] text-[#c9b3ec]">
          <span>By {post.author}</span>
          <span className="text-white/30">|</span>
          <span>{post.date}</span>
        </p>

        <a href={post.href} className="mt-3 block">
          <h3 className="line-clamp-2 font-syne text-[18px] font-semibold leading-[1.35] tracking-tight text-white transition-colors duration-200 group-hover:text-[#c9b3ec] sm:text-[20px]">
            {post.title}
          </h3>
        </a>

        <p className="mt-3 line-clamp-3 text-[14px] leading-[1.55] text-white/60">
          {post.subtitle}
        </p>

        <div className="my-6 h-px w-full bg-white/8" />

        <div className="mt-auto">
          <a
            href={post.href}
            className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#5c2e9d] to-[#7c499d] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_24px_-4px_rgba(124,73,157,0.45)] transition-all duration-200 hover:from-[#4c2583] hover:to-[#6c3e89]"
          >
            Read More
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </article>
  );
}
