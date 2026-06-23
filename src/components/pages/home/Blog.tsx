"use client";

import { ArrowUpRight } from "lucide-react";

import { BlogCard, type BlogPost } from "@/components/card/BlogCard";
import blogContent from "@/data/blog.json";

const { heading, showMoreLabel, showMoreHref, posts } = blogContent as {
  heading: { eyebrow: string; titleGradient: string; titleWhite: string };
  showMoreLabel: string;
  showMoreHref: string;
  posts: BlogPost[];
};

export function Blog() {
  return (
    <section id="blog" className="relative overflow-hidden py-8 md:py-10">
      <div className="app-container">
        <div className="section-heading">
          <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] font-syne text-white">
            {heading.eyebrow}
          </p>
          <h2 className="mt-4 text-center font-syne text-[clamp(1.7rem,4.4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
            <span className="block text-gradient-brand">{heading.titleGradient}</span>
            <span className="block text-white">{heading.titleWhite}</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <a
            href={showMoreHref}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/4 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10"
          >
            {showMoreLabel}
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}
