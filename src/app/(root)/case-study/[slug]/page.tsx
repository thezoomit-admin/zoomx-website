import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CaseStudyDetailsBlocks,
  type ChallengesBlock,
  type GrowthBlock,
  type SolutionsBlock,
} from "@/components/pages/case-study/CaseStudyDetailsBlocks";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
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
      <PageHero
        name={`${details.hero.titleGradient} ${details.hero.titleWhite}`.trim()}
        videoSrc={details.hero.videoSrc}
        description={details.hero.description}
      />

      <CaseStudyDetailsBlocks
        challenges={details.challenges}
        solutions={details.solutions}
        growth={details.growth}
      />

      <section className="relative pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="app-container">
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
