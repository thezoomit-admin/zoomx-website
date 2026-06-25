import type { Metadata } from "next";

import { DeliverySpec } from "@/components/pages/quality/DeliverySpec";
import { QualityShowcase } from "@/components/pages/quality/QualityShowcase";
import { ReviewPipeline } from "@/components/pages/quality/ReviewPipeline";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Quality — ZOOMX",
  description:
    "How ZOOMX keeps every cut on-brand, on-spec, and audience-ready — brand calibration, three-pass review, captioning, and a delivery checklist that never ships a wrong codec.",
};

export default function QualityPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        name="Quality"
        videoSrc="/video/intro_video.mp4"
        description="Every cut moves through three review passes before it ever lands in your inbox — a brand check against your style guide, a senior creative review on hook and pacing, and a final delivery QC on captions, codec, and aspect. Nothing ships rough. Nothing ships off-brand. Nothing ships with a wrong export. The standard is the same on the first month as the twelfth, and it's the reason our clients stop opening cuts with a held breath."
      />

      <QualityShowcase />
      <ReviewPipeline />
      <DeliverySpec />

      <section className="relative pt-8 pb-10 md:pt-10 md:pb-12">
        <div className="app-container">
          <CtaSection
            eyebrow="See It On Your Brand"
            titleGradient="Want A Test"
            titleWhite="Edit On Us?"
            description="Send over a recent project and we'll cut a 30-second sample — same standards, no commitment."
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
