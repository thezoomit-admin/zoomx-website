import type { Metadata } from "next";

import type { CaseStudy } from "@/components/card/CaseStudyCard";
import { CaseStudyList } from "@/components/pages/case-study/CaseStudyList";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
import caseStudyContent from "@/data/case-study.json";

const { allPage, cases } = caseStudyContent as unknown as {
  allPage: { heading: { eyebrow: string; titleGradient: string; titleWhite: string } };
  cases: CaseStudy[];
};

export const metadata: Metadata = {
  title: "Case Studies — ZOOMX",
  description:
    "Real brands, real outcomes — see how ZOOMX-built video systems drive revenue, watch time, and reach across coaching, SaaS, e-commerce, and creator brands.",
};

export default function CaseStudyIndexPage() {
  const { heading } = allPage;

  return (
    <main className="min-h-screen">
      <PageHero
        videoSrc="/video/intro_video.mp4"
        eyebrow={heading.eyebrow}
        titleGradient={heading.titleGradient}
        titleWhite={heading.titleWhite}
        description="Six teams. Six different goals. Here's what shipping the right video, consistently, looked like in practice."
      />

      <section id="all-cases" className="relative overflow-hidden pb-8 md:pb-10">
        <div className="app-container">
          <CaseStudyList cases={cases} />
        </div>
      </section>

      <section className="relative pt-5 md:pt-10 pb-16 md:pb-20">
        <div className="app-container">
          <CtaSection
            eyebrow="Work With Us"
            titleGradient="Want Outcomes"
            titleWhite="Like These?"
            description="Tell us the channel, the offer, and the bottleneck. We'll show you exactly how we'd build it."
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
