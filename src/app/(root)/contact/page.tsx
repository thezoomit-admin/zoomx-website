import type { Metadata } from "next";

import { ContactForm } from "@/components/pages/home/ContactForm";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Contact Us — ZOOMX",
  description:
    "Talk to ZOOMX about your next video project — send us the brief and we'll come back inside one business day with a plan, a price, and a sample cut on your brand.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        name="Contact Us"
        videoSrc="/video/intro_video.mp4"
        description="Tell us about the channel, the offer, and the bottleneck. We reply inside one business day with a plan that fits the format you publish, the cadence you need, and a price you can put on a calendar — plus a sample cut on your brand so the fit is obvious before you sign anything."
      />

      <ContactForm />

      <section className="relative pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="app-container">
          <CtaSection
            eyebrow="Prefer A Call?"
            titleGradient="Book A 30-Minute"
            titleWhite="Strategy Call"
            description="Skip the form — grab a slot directly and we'll walk through your channel, your goals, and exactly how a ZOOMX engagement would look for your brand."
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </section>
    </main>
  );
}
