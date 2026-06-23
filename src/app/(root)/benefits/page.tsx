import type { Metadata } from "next";
import { Calendar, Map, Sparkles, Wallet } from "lucide-react";

import { FeaturePage } from "@/components/pages/feature/FeaturePage";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { Footer } from "@/components/pages/home/Footer";
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

      <FeaturePage
        intro={{
          eyebrow: "Why Brands Stick Around",
          titleGradient: "The Engine Behind",
          titleWhite: "Real Content Velocity",
          body: "Most studios sell deliverables. We sell a system that keeps shipping — same brand, same standards, same crew — week after week, quarter after quarter.",
        }}
        pillars={[
          {
            icon: Calendar,
            title: "Predictable Weekly Cadence",
            description:
              "A locked publishing rhythm — never a sprint, never silent — so the algorithm and your audience both learn the channel.",
          },
          {
            icon: Wallet,
            title: "One Flat Monthly Price",
            description:
              "No hourly creep, no surprise invoices. You know exactly what next month costs before you commit to it.",
          },
          {
            icon: Map,
            title: "Strategy That Adapts",
            description:
              "We tune format, hook style, and channel mix as your offer and audience change — never running on auto-pilot.",
          },
          {
            icon: Sparkles,
            title: "Senior Editors Only",
            description:
              "No juniors learning on your timeline. Every edit is shipped by someone with 4+ years of post-production credits.",
          },
        ]}
        stats={[
          { value: "100+", label: "Videos / Month" },
          { value: "<24h", label: "Reply Time" },
          { value: "4yr+", label: "Editor Experience" },
          { value: "1 Price", label: "Flat Monthly" },
        ]}
      />

      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20">
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

      <Footer />
    </main>
  );
}
