import type { Metadata } from "next";

import { SecurityMonitor } from "@/components/pages/security/SecurityMonitor";
import { SecurityStack } from "@/components/pages/security/SecurityStack";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Security — ZOOMX",
  description:
    "How ZOOMX keeps your raw footage, brand assets, and unreleased work locked down — NDAs, encrypted delivery, role-based access, and a triple-redundant backup pipeline.",
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        name="Security"
        videoSrc="/video/intro_video.mp4"
        description="Every project is wrapped in an NDA before a single frame moves. Raw footage travels over encrypted transfer only — no public links, no shared drives. Access is role-based, time-bound, and revoked the moment the project closes. Backups run on a triple-redundant pipeline across two regions, so nothing is ever a single drive failure away from gone. You ship the work; we handle the locks, the keys, and the audit trail underneath it."
      />

      <SecurityStack />
      <SecurityMonitor />

      <section className="relative pt-8 pb-10 md:pt-10 md:pb-12">
        <div className="app-container">
          <CtaSection
            eyebrow="Talk Security First"
            titleGradient="Need A Tighter"
            titleWhite="Handling Brief?"
            description="Send us your security checklist — we'll match it line for line and show you exactly where everything lives."
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
