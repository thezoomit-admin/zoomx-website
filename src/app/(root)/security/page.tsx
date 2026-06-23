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
        videoSrc="/video/intro_video.mp4"
        eyebrow="Security"
        titleGradient="Your Footage,"
        titleWhite="Locked Down"
        description="Every project is wrapped in NDAs, encrypted transfer, role-based access, and a backup pipeline you never have to think about."
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
