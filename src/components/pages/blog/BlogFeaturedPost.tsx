import { ArrowUpRight } from "lucide-react";

import type { BlogPost } from "@/components/card/BlogCard";
import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";

export function BlogFeaturedPost({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
      <a
        href={post.href}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#121213] lg:w-3/5"
      >
        <Image
          src={post.cover}
          alt={post.title}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="transition-transform duration-500 ease-out hover:scale-105"
        />
      </a>

      <div className="flex w-full flex-col lg:w-2/5">
        <a href={post.href}>
          <h2 className="font-syne text-[28px] font-bold leading-[1.2] text-white transition-colors hover:text-[#c9b3ec] md:text-[36px]">
            {post.title}
          </h2>
        </a>

        <div className="mt-4 flex items-center gap-2 text-[14px] font-medium text-[#c9b3ec]">
          <span>By {post.author}</span>
          <span className="text-white/30">|</span>
          <span className="text-white/60">{post.date}</span>
        </div>

        <p className="mt-5 text-[16px] leading-[1.6] text-white/60">
          {post.subtitle}
        </p>

        <div className="mt-8">
          <Button href={post.href} variant="brand" size="cta">
            Read More
            <ArrowUpRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
