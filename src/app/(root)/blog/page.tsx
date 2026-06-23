import type { Metadata } from "next";

import type { BlogPost } from "@/components/card/BlogCard";
import { BlogPostsList } from "@/components/pages/blog/BlogPostsList";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { Footer } from "@/components/pages/home/Footer";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
import blogContent from "@/data/blog.json";

const { allPage, posts } = blogContent as {
  allPage: { heading: { eyebrow: string; titleGradient: string; titleWhite: string } };
  posts: BlogPost[];
};

export const metadata: Metadata = {
  title: "Blog — ZOOMX",
  description:
    "Insights, tips, and behind-the-scenes stories from the ZOOMX editing studio — video strategy, short-form storytelling, and creator workflows.",
};

export default function BlogIndexPage() {
  const { heading } = allPage;

  return (
    <main className="min-h-screen">
      <PageHero
        videoSrc="/video/intro_video.mp4"
        eyebrow={heading.eyebrow}
        titleGradient={heading.titleGradient}
        titleWhite={heading.titleWhite}
        description="Everything we’ve written on storytelling, sound design, and the pipeline behind great video — published as we learn it."
      />

      <section id="all-posts" className="relative overflow-hidden pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="app-container">
          <BlogPostsList posts={posts} />
        </div>
      </section>

      <CtaSection
        eyebrow="Work With Us"
        titleGradient="Like What"
        titleWhite="You’re Reading?"
        description="Talk to our team about getting a content engine that ships videos consistently — without you touching the timeline."
        primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
        secondaryAction={{ label: "Back To Home", href: "/" }}
      />

      <ContactForm />

      <Footer />
    </main>
  );
}
