type ServiceHeroProps = {
  videoSrc: string;
};

export function ServiceHero({ videoSrc }: ServiceHeroProps) {
  return (
    <section className="relative pt-28 pb-8 md:pt-32 md:pb-12">
      <div className="app-container">
        <div className="relative aspect-21/9 overflow-hidden rounded-xl border border-white/10 bg-[#070009] shadow-[0_30px_90px_-30px_rgba(124,73,157,0.55)]">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            controls
            controlsList="nodownload"
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
