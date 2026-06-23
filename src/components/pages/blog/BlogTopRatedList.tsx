import type { BlogPost } from "@/components/card/BlogCard";

export function BlogTopRatedList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-[#0a0a0a] p-6 shadow-sm border border-[#ffffff1f] lg:p-8">
      <h3 className="font-syne text-[22px] font-bold text-white mb-2 text-center lg:text-left">
        Top Rated Posts
      </h3>
      
      <div className="flex flex-col gap-6">
        {posts.map((post, index) => (
          <article key={post.id} className="flex items-start gap-4 group">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#121213] text-[18px] font-bold text-white/40 border border-[#ffffff1f] transition-colors group-hover:border-[#7c499d] group-hover:text-[#c9b3ec]">
              {index + 1}
            </div>
            
            <div className="flex flex-col">
              <a href={post.href}>
                <h4 className="line-clamp-2 font-syne text-[16px] font-bold leading-[1.4] text-white transition-colors group-hover:text-[#c9b3ec]">
                  {post.title}
                </h4>
              </a>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-white/50">
                <span>By {post.author}</span>
                <span>|</span>
                <span>{post.date}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
