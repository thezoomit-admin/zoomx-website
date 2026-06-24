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
        videoSrc="/video/intro_video.mp4"
        eyebrow="Benefits"
        titleGradient="A Content Team"
        titleWhite="That Compounds"
        description="Beyond the deliverables, working with us means a steady weekly rhythm, a predictable monthly cost, and a team that compounds with you instead of restarting every quarter."
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
