import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User } from "lucide-react";
import Link from "next/link";

import { Image } from "@/components/shared/Image";
import blogContent from "@/data/blog.json";
import { CtaSection } from "@/components/shared/CtaSection";
import { BlogLeadForm } from "@/components/pages/blog/BlogLeadForm";
import { BlogCommentForm } from "@/components/pages/blog/BlogCommentForm";
import { BlogShare } from "@/components/pages/blog/BlogShare";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const post = blogContent.posts.find((p) => p.id === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — ZOOMX Blog`,
    description: post.subtitle,
  };
}

export function generateStaticParams() {
  return blogContent.posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogDetailsPage(props: Props) {
  const params = await props.params;
  const post = blogContent.posts.find((p) => p.id === params.slug);

  if (!post) {
    notFound();
  }

  const recentPosts = blogContent.posts
    .filter((p) => p.id !== params.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen pb-0">
      {/* Top spacing for fixed header */}
      <div className="pt-32 md:pt-[140px] pb-3 md:pb-5 app-container">
        {/* Hero Header Section */}
        <section className="mb-12">
          <div className="mb-6 flex">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#121213] aspect-[16/9] md:aspect-[2.5/1] lg:aspect-[3/1] flex items-end shadow-2xl border border-white/5">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <Image
                src={post.cover}
                alt={post.title}
                sizes="100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />

            <div className="relative z-10 p-5 md:p-8 lg:p-8 max-w-3xl w-full">
              <h1 className="font-syne text-[20px] font-bold leading-tight text-white md:text-[28px] mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-[13px] font-medium text-white/80">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#c9b3ec]" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#c9b3ec]" />
                  {post.date}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content & Sidebar Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column (Content) */}
            <div className="lg:col-span-8 flex flex-col gap-8 text-[16px] md:text-[18px] leading-[1.8] text-white/80">
              {/* Rich Text Content */}
              <div
                className="prose prose-invert prose-lg max-w-none prose-headings:font-syne prose-headings:font-bold prose-a:text-[#c9b3ec] prose-a:no-underline hover:prose-a:text-white prose-p:text-white/80 prose-li:text-white/80 marker:text-[#7c499d]"
                dangerouslySetInnerHTML={{
                  __html: `
                  <p>In today's fast-paced digital landscape, keeping audience attention is harder than ever. Brands are constantly looking for ways to stand out, and high-quality video content has proven to be the most effective medium. But what exactly goes into creating a video that not only looks professional but also converts passive viewers into active customers?</p>
                  
                  <h2 class="font-syne text-[24px] md:text-[28px] font-bold text-white mt-6 mb-2">The Blueprint of a Winning Strategy</h2>
                  <p>Before a single frame is shot or a timeline is opened, the foundation of a successful video campaign lies in strategy. We start by understanding the core message, the target audience, and the platform where the video will live. This ensures that every creative decision—from pacing to color grading—serves a specific purpose.</p>
                  
                  <figure class="my-8 overflow-hidden rounded-xl bg-[#121213] border border-white/5">
                    <div class="relative aspect-[16/9] w-full">
                      <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80" alt="Editing Workspace" class="object-cover w-full h-full" />
                    </div>
                    <figcaption class="text-center text-[14px] text-white/50 p-4 bg-white/5 border-t border-white/5">A glimpse into a professional editing setup.</figcaption>
                  </figure>

                  <h2 class="font-syne text-[24px] md:text-[28px] font-bold text-white mt-6 mb-2">Why Sound Design Matters</h2>
                  <p>Many creators underestimate the power of audio. Sound design does more than half the heavy lifting when it comes to emotional impact. A sudden drop in music, a well-placed sound effect, or crisp dialogue can instantly elevate the perceived quality of a video.</p>
                  
                  <ul class="list-disc pl-6 space-y-3 marker:text-[#7c499d]">
                    <li><strong class="text-white">Ambient Noise:</strong> Sets the scene and makes the environment feel real.</li>
                    <li><strong class="text-white">Foley Effects:</strong> Enhances the physical interactions within the frame.</li>
                    <li><strong class="text-white">Musical Score:</strong> Dictates the pacing and emotional resonance of the narrative.</li>
                  </ul>

                  <blockquote class="my-8 italic text-white/90 text-[20px] leading-relaxed pl-8 border-l-2 border-[#5c2e9d]">
                    "People will forgive bad video quality, but they will never forgive bad audio. Sound is what makes an image feel three-dimensional."
                  </blockquote>

                  <h2 class="font-syne text-[24px] md:text-[28px] font-bold text-white mt-6 mb-2">Scaling the Process</h2>
                  <p>Creating one great video is an achievement, but creating them consistently at scale requires a rock-solid pipeline. By implementing clear ingest protocols, standardized project templates, and structured review loops, studios can handle dozens of deliverables a week without compromising on creativity.</p>
                `,
                }}
              />

              {/* Share Article */}
              <BlogShare title={post.title} url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://zoomx.com"}/blog/${post.id}`} />

              {/* Comment Form */}
              <BlogCommentForm />

              {/* Recent Posts */}
              <div className="mt-2 pt-6 border-t border-white/10">
                <h3 className="font-syne text-[24px] font-bold text-white mb-6">
                  Recent Posts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recentPosts.map((recentPost) => (
                    <div
                      key={recentPost.id}
                      className="group flex flex-col rounded-md border border-white/5 bg-[#121213] overflow-hidden transition-colors hover:border-[#5c2e9d]/40 hover:bg-[#1a1b26]"
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={recentPost.cover}
                          alt={recentPost.title}
                          sizes="400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <span className="text-[11px] text-[#c9b3ec] font-medium">
                          {recentPost.date}
                        </span>
                        <Link
                          href={`/blog/${recentPost.id}`}
                          className="line-clamp-2 text-[14px] font-semibold leading-snug text-white transition-colors group-hover:text-[#c9b3ec]"
                        >
                          {recentPost.title}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <aside className="lg:col-span-4 flex flex-col gap-12 mt-12 lg:mt-0">
              <BlogLeadForm />
            </aside>
          </div>
          {/* CTA Section */}
          <div className="mt-12 md:mt-[72px]">
            <CtaSection
              eyebrow="Work With Us"
              titleGradient="Like What"
              titleWhite="You’re Reading?"
              description="Talk to our team about getting a content engine that ships videos consistently — without you touching the timeline."
              primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
              secondaryAction={{ label: "Back To Home", href: "/" }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
