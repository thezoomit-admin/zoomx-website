import { CaseStudyCard, type CaseStudy } from "@/components/card/CaseStudyCard";

const CASES: CaseStudy[] = [
  {
    index: "01",
    slug: "spencer-pawliw-coaching",
    quote: {
      lead: "With just 5,000 subscribers,",
      punch: "Spencer now generates $350K per month",
    },
    author: {
      name: "Neel Nafis",
      role: "Founder",
      avatar: "https://i.pravatar.cc/80?img=8",
    },
    stats: [
      { value: "250%", label: "Revenue Growth" },
      { value: "200%", label: "Saved on Ads" },
    ],
    file_type: "video",
    video_url: "/video/intro_video.mp4",
  },
];

export function CaseStudy() {
  return (
    <section id="case-study" className="relative overflow-hidden py-8 md:py-10">
      <div className="container">
        <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] font-syne text-white">
          Case Studies
        </p>
        <h2 className="mt-4 text-center font-syne text-[clamp(1.7rem,4.4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
          <p className="block text-gradient-brand">Some Solid</p>
          <p className="block text-white">Case Studies</p>
        </h2>

        {CASES.map((c) => (
          <CaseStudyCard key={c.index} caseStudy={c} />
        ))}
      </div>
    </section>
  );
}
