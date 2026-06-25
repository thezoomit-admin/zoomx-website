import type { Metadata } from "next";

import { BenefitsCadence } from "@/components/pages/benefits/BenefitsCadence";
import { BenefitsCompare } from "@/components/pages/benefits/BenefitsCompare";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Benefits — ZOOMX",
  description:
    "What clients actually get from ZOOMX — a predictable weekly cadence, one flat monthly price, strategy that adapts to your channel, and senior editors only.",
};

export default function BenefitsPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        name="Benefits"
        videoSrc="/video/intro_video.mp4"
        description="Beyond the deliverables, working with ZOOMX means a steady weekly rhythm, a predictable monthly cost, and a senior team that compounds with you instead of restarting every quarter. You stop renegotiating scope, stop chasing freelancers, stop firefighting deadlines. What you get back is a publishing engine that runs the same week you're traveling as the week you're at your desk — and a cost line you can plan a year around."
      />

      <BenefitsCadence />
      <BenefitsCompare />

      <section className="relative pt-8 pb-10 md:pt-10 md:pb-12">
        <div className="app-container">
          <CtaSection
            eyebrow="See The Fit"
            titleGradient="Want To See How"
            titleWhite="It Looks For You?"
            description="Tell us the channel, the offer, and the cadence. We'll send back exactly what next month would look like — deliverables, schedule, and price."
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
