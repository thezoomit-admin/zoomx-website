import type { Metadata } from "next";

import { ContactForm } from "@/components/pages/home/ContactForm";
import { Work } from "@/components/pages/home/Work";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Portfolio — ZOOMX",
  description:
    "Selected work from the ZOOMX studio — long-form YouTube edits, Shorts, SaaS demo videos, ad creatives, and VSLs.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        videoSrc="/video/intro_video.mp4"
        eyebrow="Portfolio"
        titleGradient="Selected Work"
        titleWhite="From The Studio"
        description="Long-form YouTube edits, Shorts, SaaS demos, ad creatives, and VSLs — sorted by format so you can find what looks closest to your channel."
      />

      <Work />

      <section className="relative pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="app-container">
          <CtaSection
            eyebrow="Like What You See?"
            titleGradient="Want A Sample"
            titleWhite="On Your Brand?"
            description="Send over a recent project and we'll cut a 30-second sample in your format — no commitment, just a quick look at fit."
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </section>

      <ContactForm />

    
    </main>
  );
}
