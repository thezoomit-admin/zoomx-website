import type { Metadata } from "next";

import type { BlogPost } from "@/components/card/BlogCard";
import { BlogCard } from "@/components/card/BlogCard";
import blogContent from "@/data/blog.json";
import { BlogFeaturedPost } from "@/components/pages/blog/BlogFeaturedPost";
import { BlogTopRatedList } from "@/components/pages/blog/BlogTopRatedList";
import { BlogAdBanner } from "@/components/pages/blog/BlogAdBanner";
import { CtaSection } from "@/components/shared/CtaSection";
import { BlogPagination } from "@/components/pages/blog/BlogPagination";

const { posts } = blogContent as { posts: BlogPost[] };

export const metadata: Metadata = {
  title: "Blog — ZOOMX",
  description: "Insights, tips, and behind-the-scenes stories from the ZOOMX editing studio.",
};

export default function BlogIndexPage() {
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);
  const featuredListPosts = posts.slice(4, 7);
  const topRatedPosts = posts.slice(8, 13);
  const popularPosts = posts.slice(13, 17);

  return (
    <main className="min-h-screen pb-0">
      <div className="pt-32 md:pt-[140px] pb-12 app-container">
        {/* 1. Featured Post */}
        <section className="mb-16">
          <BlogFeaturedPost post={featuredPost} />
        </section>

        {/* 2. Recent Posts */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="dark" />
            ))}
          </div>
        </section>

        {/* 3. Pagination */}
        <div className="mb-16">
          <BlogPagination totalPages={5} />
        </div>

        {/* 4. Banner */}
        <section className="mb-16">
          <BlogAdBanner 
            title="Transform Your Vision into Reality!"
            subtitle="Unleash the power of professional video editing today. Contact us now to elevate your content!"
            buttonText="Contact Us"
            buttonHref="#contact"
            variant="dark"
          />
        </section>

        {/* 5. Split Section: Featured Posts & Top Rated Posts */}
        <section className="mb-16">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
            {/* Left side: Featured Posts list */}
            <div className="flex-1 flex flex-col gap-8">
              <h3 className="font-syne text-[26px] font-bold text-white">Featured Posts</h3>
              <div className="flex flex-col gap-6">
                {featuredListPosts.map((post) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    variant="dark" 
                    layout="horizontal" 
                    showSubtitle={false}
                  />
                ))}
              </div>
            </div>

            {/* Right side: Top Rated Posts list */}
            <div className="w-full lg:w-[400px] shrink-0">
              <BlogTopRatedList posts={topRatedPosts} />
            </div>
          </div>
        </section>

        {/* 6. Popular Posts */}
        <section className="mb-16">
          <div className="rounded-2xl border border-white/10 bg-[#121213] p-8 lg:p-12 text-white">
            <h3 className="font-syne text-[26px] font-bold mb-8">Popular Posts</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {popularPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  variant="dark" 
                  layout="horizontal" 
                  showSubtitle={false}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 7. Footer Banner */}
        <div className="">
          <CtaSection
            eyebrow="Work With Us"
            titleGradient="Like What"
            titleWhite="You’re Reading?"
            description="Talk to our team about getting a content engine that ships videos consistently — without you touching the timeline."
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </div>
    </main>
  );
}
