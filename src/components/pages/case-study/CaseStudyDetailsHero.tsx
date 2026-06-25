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
        <div className="relative aspect-21/9 overflow-hidden rounded-2xl border border-white/10 bg-[#090909] shadow-[0_30px_90px_-30px_rgba(124,73,157,0.55)]">
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

          {/* Dark + brand-purple wash to make the content panel pop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-5 bg-linear-to-br from-black/55 via-black/20 to-[#5c2e9d]/35"
          />

          {/* Decorative purple glow blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 z-5 h-72 w-72 rounded-full bg-[#5c2e9d]/35 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-24 z-5 h-72 w-72 rounded-full bg-[#a888c8]/25 blur-[120px]"
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center sm:px-10 md:px-14 lg:px-16">
            <div className="relative w-fit max-w-[calc(100%-1rem)] overflow-hidden rounded-2xl border border-[#a888c8]/25 bg-linear-to-br from-[#5c2e9d]/35 via-black/40 to-[#7c499d]/30 px-6 py-5 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(92,46,157,0.6)] md:px-9 md:py-7">
              {/* Subtle inner highlight stroke */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-px rounded-[calc(1rem-1px)] ring-1 ring-inset ring-white/5"
              />

              <p className="font-syne text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d6c4ee]">
                {eyebrow}
              </p>
              <h1 className="mt-3 font-syne text-[clamp(1.9rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
                <span className="block text-gradient-brand">{titleGradient}</span>
                <span className="block text-white">{titleWhite}</span>
              </h1>
              {description && (
                <p className="mx-auto mt-4 max-w-160 text-[15px] leading-[1.65] text-white/85">
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
