"use client";

import { Image } from "@/components/shared/Image";

const clients = [
  {
    name: "Anthony's World",
    niche: "Trading Niche",
    views: "5M+ Views",
    subs: "100K+ Subs",
    img: "https://i.pravatar.cc/400?img=60",
  },
  {
    name: "Spencer Pawliw",
    niche: "Ecom Niche",
    views: "1M+ Views",
    subs: "7K+ Subs",
    img: "https://i.pravatar.cc/400?img=14",
  },
  {
    name: "Nathan Nazareth",
    niche: "Dropshipping Niche",
    views: "15M+ Views",
    subs: "500K+ Subs",
    img: "https://i.pravatar.cc/400?img=12",
  },
  {
    name: "Lucy Wang",
    niche: "AWS Niche",
    views: "8M+ Views",
    subs: "100K+ Subs",
    img: "https://i.pravatar.cc/400?img=47",
  },
  {
    name: "Elise Pham",
    niche: "Academics Niche",
    views: "120M+ Views",
    subs: "460K+ Subs",
    img: "https://i.pravatar.cc/400?img=45",
  },
];

function Card({ c }: { c: (typeof clients)[number] }) {
  return (
    <div className="group relative w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur sm:w-[320px]">
      <div className="relative aspect-4/5 overflow-hidden">
        <Image
          src={c.img}
          alt={c.name}
          sizes="(min-width: 640px) 320px, 280px"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/90 to-transparent p-5">
        <h3 className="font-display text-lg font-bold">{c.name}</h3>
        <p className="text-xs text-primary">{c.niche}</p>
        <div className="mt-3 flex gap-3 text-xs">
          <span className="rounded-md bg-primary/15 px-2 py-1 font-medium">{c.views}</span>
          <span className="rounded-md bg-primary/15 px-2 py-1 font-medium">{c.subs}</span>
        </div>
      </div>
    </div>
  );
}

export function Results() {
  const loop = [...clients, ...clients];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-center text-sm uppercase tracking-widest text-primary">feedback</p>
        <h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-5xl">
          How we <span className="text-gradient-brand">Benefit Our Clients</span>
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max gap-5">
            {loop.map((c, i) => (
              <Card key={`${c.name}-${i}`} c={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
