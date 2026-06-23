"use client";

import { ArrowUpRight } from "lucide-react";

import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";

export type BlogPost = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  author: string;
  date: string;
  href: string;
};

type BlogCardProps = {
  post: BlogPost;
  variant?: "dark" | "light";
  layout?: "vertical" | "horizontal";
  showSubtitle?: boolean;
  showButton?: boolean;
};

export function BlogCard({ 
  post, 
  variant = "dark", 
  layout = "vertical",
  showSubtitle = true,
  showButton = true
}: BlogCardProps) {
  const isLight = variant === "light";
  const isHorizontal = layout === "horizontal";

  const cardClasses = isHorizontal
    ? `group flex items-center gap-6 overflow-hidden rounded-xl transition-colors duration-300 ${
        isLight ? "bg-white border-transparent shadow-sm hover:shadow-md" : "border-[#ffffff1f] bg-[#0a0a0a] hover:border-[#ffffff33]"
      }`
    : `group flex h-full flex-col overflow-hidden rounded-xl transition-colors duration-300 ${
        isLight ? "bg-white border border-gray-100 shadow-sm hover:border-gray-300 hover:shadow-md" : "border border-[#ffffff1f] bg-[#0a0a0a] hover:border-[#ffffff33]"
      }`;

  const imageContainerClasses = isHorizontal
    ? "relative block aspect-[4/3] w-[140px] shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-[180px]"
    : `relative block aspect-[16/10] w-full overflow-hidden ${isLight ? "bg-gray-100" : "bg-[#121213]"}`;

  const contentContainerClasses = isHorizontal
    ? "flex flex-1 flex-col py-2 pr-4"
    : "flex flex-1 flex-col px-6 pt-6 pb-7 sm:px-7";

  return (
    <article className={cardClasses}>
      <a
        href={post.href}
        className={imageContainerClasses}
        aria-label={post.title}
      >
        <Image
          src={post.cover}
          alt={post.title}
          sizes={isHorizontal ? "180px" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </a>

      <div className={contentContainerClasses}>
        <p className={`flex items-center gap-2 text-[13px] ${isLight ? "text-[#7c499d]" : "text-[#c9b3ec]"}`}>
          <span>By {post.author}</span>
          <span className={isLight ? "text-gray-300" : "text-white/30"}>|</span>
          <span className={isLight ? "text-gray-500" : ""}>{post.date}</span>
        </p>

        <a href={post.href} className="mt-3 block">
          <h3 className={`line-clamp-2 font-syne font-semibold leading-[1.35] tracking-tight transition-colors duration-200 ${
            isHorizontal ? "text-[16px] sm:text-[18px]" : "text-[18px] sm:text-[20px]"
          } ${
            isLight ? "text-gray-900 group-hover:text-[#7c499d]" : "text-white group-hover:text-[#c9b3ec]"
          }`}>
            {post.title}
          </h3>
        </a>

        {showSubtitle && (
          <p className={`mt-3 line-clamp-2 text-[14px] leading-[1.55] ${isLight ? "text-gray-600" : "text-white/60"}`}>
            {post.subtitle}
          </p>
        )}

        {showButton && !isHorizontal && (
          <>
            <div className={`my-6 h-px w-full ${isLight ? "bg-gray-100" : "bg-white/8"}`} />
            <div className="mt-auto">
              <Button
                href={post.href}
                variant="brand"
                size="cta"
                className={isLight ? "bg-[#5c2e9d] from-[#5c2e9d] to-[#5c2e9d] hover:from-[#4c2583] hover:to-[#4c2583]" : undefined}
              >
                Read More
                <ArrowUpRight />
              </Button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
