type CaseStudyDetailsHeroProps = {
  videoSrc: string;
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  description?: string;
};

export function CaseStudyDetailsHero({
  videoSrc,
  eyebrow,
  titleGradient,
  titleWhite,
  description,
}: CaseStudyDetailsHeroProps) {
  return (
    <section className="relative pt-4 md:pt-6">
      <div className="app-container">
        <div className="relative aspect-21/9 overflow-hidden rounded-xl border border-white/10 bg-[#090909]">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.45)_60%,rgba(0,0,0,0.7)_100%)]"
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center sm:px-10 md:px-14 lg:px-16">
            <div className="w-fit max-w-[calc(100%-1rem)] rounded-xl border border-white/10 bg-black/30 px-6 py-5 backdrop-blur-md md:px-8 md:py-6">
              <p className="font-syne text-[13px] font-semibold uppercase tracking-[0.14em] text-white/85">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-syne text-[clamp(1.7rem,4.6vw,3rem)] font-semibold leading-[1.1] tracking-tight">
                <span className="block text-gradient-brand">{titleGradient}</span>
                <span className="block text-white">{titleWhite}</span>
              </h1>
              {description && (
                <p className="mx-auto mt-4 max-w-160 text-[15px] leading-[1.6] text-white/85">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
