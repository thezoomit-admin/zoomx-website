import type { Metadata } from "next";
import { CheckSquare, Eye, Palette, Type } from "lucide-react";

import { FeaturePage } from "@/components/pages/feature/FeaturePage";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { Footer } from "@/components/pages/home/Footer";
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
        videoSrc="/video/intro_video.mp4"
        eyebrow="Quality"
        titleGradient="Three Review Passes,"
        titleWhite="Before You See It"
        description="Every cut goes through a brand check, a senior review, and a delivery QC before it ever hits your inbox."
      />

      <FeaturePage
        intro={{
          eyebrow: "Our Quality Bar",
          titleGradient: "Built To Pass",
          titleWhite: "A Founder's Final Look",
          body: "We optimize for the version of you that's tired, half-distracted, and ready to ship — your final review should be a yes, not another round of notes.",
        }}
        pillars={[
          {
            icon: Palette,
            title: "Brand-Kit Calibration",
            description:
              "Type, color, motion, sound — your brand kit lives on the timeline, applied before the first hand-off.",
          },
          {
            icon: Eye,
            title: "Three-Pass Review Loop",
            description:
              "Editor → senior lead → producer. Each pass has a checklist, so problems get caught before they reach you.",
          },
          {
            icon: Type,
            title: "Captions & Accessibility",
            description:
              "Burned-in or sidecar SRT captions, brand-styled, audited for accuracy — never an afterthought.",
          },
          {
            icon: CheckSquare,
            title: "Delivery QC Checklist",
            description:
              "Codec, aspect ratio, loudness, file size, platform spec — verified against the brief on every export.",
          },
        ]}
        stats={[
          { value: "3", label: "Review Passes" },
          { value: "−66%", label: "Revision Rounds" },
          { value: "100%", label: "Brand-Kit Coverage" },
          { value: "<24h", label: "Average Turnaround" },
        ]}
      />

      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20">
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

      <Footer />
    </main>
  );
}
