import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Blog } from "@/components/pages/home/Blog";
import { ContactForm } from "@/components/pages/home/ContactForm";
import { ServiceDetails } from "@/components/pages/services/ServiceDetails";
import { ServiceHero } from "@/components/pages/services/ServiceHero";
import { TrustedBrands } from "@/components/pages/services/TrustedBrands";
import { VideoGallery } from "@/components/pages/services/VideoGallery";
import { CtaSection } from "@/components/shared/CtaSection";
import servicesContent from "@/data/services.json";

type Action = { label: string; href: string };

type Hero = {
  videoSrc: string;
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  description?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
};

type Logo = { name: string; src: string };
type TrustedBrandsBlock = {
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  logos: Logo[];
};

type Video = { id: string; title: string; thumbnail: string };
type GalleryBlock = {
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  videos: Video[];
};

type DetailItem = { title: string; description: string };
type DetailStat = { value: string; label: string };
type DetailsBlock = {
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  summary: string;
  image: string;
  items: DetailItem[];
  stats?: DetailStat[];
};

type CtaBlock = {
  eyebrow?: string;
  titleGradient: string;
  titleWhite?: string;
  description?: string;
};

type Service = {
  slug: string;
  hero: Hero;
  trustedBrands: TrustedBrandsBlock;
  details?: DetailsBlock;
  gallery: GalleryBlock;
  cta: CtaBlock;
};

const data = servicesContent as unknown as {
  services: Service[];
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return data.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const service = data.services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.hero.eyebrow} — ZOOMX`,
    description: service.hero.description,
  };
}

export default async function ServiceDetailsPage(props: Props) {
  const { slug } = await props.params;
  const service = data.services.find((s) => s.slug === slug);

  if (!service) notFound();

  const { hero, trustedBrands, details, gallery, cta } = service;

  return (
    <main className="min-h-screen">
      <ServiceHero
        videoSrc={hero.videoSrc}
        eyebrow={hero.eyebrow}
        titleGradient={hero.titleGradient}
        titleWhite={hero.titleWhite}
        description={hero.description}
        primaryAction={hero.primaryAction}
        secondaryAction={hero.secondaryAction}
      />

      <TrustedBrands
        eyebrow={trustedBrands.eyebrow}
        titleGradient={trustedBrands.titleGradient}
        titleWhite={trustedBrands.titleWhite}
        logos={trustedBrands.logos}
      />

      {details && (
        <ServiceDetails
          eyebrow={details.eyebrow}
          titleGradient={details.titleGradient}
          titleWhite={details.titleWhite}
          summary={details.summary}
          image={details.image}
          items={details.items}
          stats={details.stats}
        />
      )}

      <VideoGallery
        eyebrow={gallery.eyebrow}
        titleGradient={gallery.titleGradient}
        titleWhite={gallery.titleWhite}
        videos={gallery.videos}
      />

      <Blog />

      <section className="relative pt-8 pb-10 md:pt-10 md:pb-12">
        <div className="app-container">
          <CtaSection
            eyebrow={cta.eyebrow}
            titleGradient={cta.titleGradient}
            titleWhite={cta.titleWhite}
            description={cta.description}
            primaryAction={{ label: "Book A 30-Min Call", href: "#contact" }}
            secondaryAction={{ label: "Back To Home", href: "/" }}
          />
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
