type PageHeroProps = {
  videoSrc: string;
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  description?: string;
};

export function PageHero({
  videoSrc,
  eyebrow,
  titleGradient,
  titleWhite,
  description,
}: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-8 md:pt-32 md:pb-12">
      <div className="app-container">
        <div className="relative aspect-21/9 overflow-hidden rounded-xl md:rounded-xl border border-white/10 bg-[#090909]">
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

          <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-6 text-left sm:px-10 md:px-14 lg:px-16">
            <div className="w-fit max-w-[calc(100%-1rem)] rounded-xl border border-white/10 bg-black/20 px-6 py-5 backdrop-blur-md md:px-8 md:py-6">
              <p className="font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-syne text-[clamp(1.9rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">
                <span className="block text-gradient-brand">{titleGradient}</span>
                <span className="block text-white">{titleWhite}</span>
              </h1>
              {description && (
                <p className="mt-4 max-w-160 text-[15px] leading-[1.6] text-white/90">
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
