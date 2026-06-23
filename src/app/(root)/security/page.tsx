import type { Metadata } from "next";
import { HardDrive, Lock, Shield, Users } from "lucide-react";

import { FeaturePage } from "@/components/pages/feature/FeaturePage";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { Footer } from "@/components/pages/home/Footer";
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

      <FeaturePage
        intro={{
          eyebrow: "How We Handle Your Assets",
          titleGradient: "Built For Brands",
          titleWhite: "That Cannot Leak",
          body: "We work with founders, agencies, and studios who treat unreleased footage like financial data — and we built our pipeline to match that bar.",
        }}
        pillars={[
          {
            icon: Lock,
            title: "Signed NDAs On Every Team",
            description:
              "Every editor, motion designer, and reviewer signs before a single frame arrives — no exceptions, no shortcuts.",
          },
          {
            icon: Shield,
            title: "Encrypted Transfer & Storage",
            description:
              "Frame.io for review, private S3 for masters, with rotated tokens and HTTPS-only delivery from end to end.",
          },
          {
            icon: Users,
            title: "Role-Based Access Control",
            description:
              "Editors only see the projects they touch. Producers see everything. Nothing leaks across client lines.",
          },
          {
            icon: HardDrive,
            title: "Triple-Redundant Backups",
            description:
              "Working copies, hot archive, and cold storage across three regions — retained for 12 months minimum.",
          },
        ]}
        stats={[
          { value: "0", label: "Asset Incidents (5 Years)" },
          { value: "AES-256", label: "Encryption At Rest" },
          { value: "12mo", label: "Backup Retention" },
          { value: "100%", label: "NDA Coverage" },
        ]}
      />

      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20">
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

      <Footer />
    </main>
  );
}
