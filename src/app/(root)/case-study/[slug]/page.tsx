import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  CaseStudyDetailsBlocks,
  type ChallengesBlock,
  type GrowthBlock,
  type SolutionsBlock,
} from "@/components/pages/case-study/CaseStudyDetailsBlocks";
import { CaseStudyDetailsHero } from "@/components/pages/case-study/CaseStudyDetailsHero";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { CtaSection } from "@/components/shared/CtaSection";
import caseStudyContent from "@/data/case-study.json";

type CaseDetails = {
  hero: {
    videoSrc: string;
    eyebrow: string;
    titleGradient: string;
    titleWhite: string;
    description?: string;
  };
  challenges: ChallengesBlock;
  solutions: SolutionsBlock;
  growth: GrowthBlock;
  cta: {
    eyebrow?: string;
    titleGradient: string;
    titleWhite?: string;
    description?: string;
  };
};

type Case = {
  index: string;
  slug: string;
  quote: { lead: string; punch: string };
  author: { name: string; role: string; avatar: string };
  details?: CaseDetails;
};

const cases = caseStudyContent.cases as unknown as Case[];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const study = cases.find((c) => c.slug === slug);
  if (!study) return {};

  return {
    title: `${study.author.name} — Case Study | ZOOMX`,
    description: `${study.quote.lead} ${study.quote.punch}`,
  };
}

export function generateStaticParams() {
  return cases
    .filter((c) => Boolean(c.slug))
    .map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyDetailsPage(props: Props) {
  const { slug } = await props.params;
  const study = cases.find((c) => c.slug === slug);

  if (!study || !study.details) {
    notFound();
  }

  const { details } = study;

  return (
    <main className="min-h-screen">
      <div className="app-container pt-28 md:pt-32">
        <Link
          href="/case-study"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all case studies
        </Link>
      </div>

      <CaseStudyDetailsHero
        videoSrc={details.hero.videoSrc}
        eyebrow={details.hero.eyebrow}
        titleGradient={details.hero.titleGradient}
        titleWhite={details.hero.titleWhite}
        description={details.hero.description}
      />

      <CaseStudyDetailsBlocks
        challenges={details.challenges}
        solutions={details.solutions}
        growth={details.growth}
      />

      <section className="relative pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="app-container">
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-linear-to-b from-[#1e0e34] to-[#3b1556] font-syne text-[13px] font-semibold text-white">
              04
            </span>
            <span className="font-syne text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Next Step
            </span>
          </div>
          <CtaSection
            eyebrow={details.cta.eyebrow}
            titleGradient={details.cta.titleGradient}
            titleWhite={details.cta.titleWhite}
            description={details.cta.description}
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Case Studies", href: "/case-study" }}
          />
        </div>
      </section>

      <ContactForm />

    </main>
  );
}
