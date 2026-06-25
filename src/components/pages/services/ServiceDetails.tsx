"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { dropSlideKit } from "@/lib/animationKits";

type Item = { title: string; description: string };
type Stat = { value: string; label: string };

type ServiceDetailsProps = {
  eyebrow: string;
  titleGradient: string;
  titleWhite: string;
  summary: string;
  image: string;
  items: Item[];
  stats?: Stat[];
};

const kit = dropSlideKit;

export function ServiceDetails({
  eyebrow,
  titleGradient,
  titleWhite,
  summary,
  image,
  items,
  stats = [],
}: ServiceDetailsProps) {
  return (
    <section className="relative overflow-hidden py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(124,73,157,0.18), transparent 50%), radial-gradient(ellipse at 0% 100%, rgba(92,46,157,0.16), transparent 55%)",
        }}
      />

      <div className="app-container">
        <motion.div
          variants={kit.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
          className="grid gap-8 lg:grid-cols-12 lg:gap-12 perspective-[1000px]"
        >
          {/* LEFT — visual */}
          <motion.div
            variants={kit.visual}
            className="relative lg:col-span-5"
          >
            <div className="rounded-xl bg-linear-to-br from-[#7c499d]/60 via-[#a888c8]/30 to-[#5c2e9d]/60 p-[1px]">
              <div className="relative overflow-hidden rounded-xl bg-[#0a0612]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  aria-hidden
                  className="block h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(10,6,18,0) 50%, rgba(10,6,18,0.55) 100%)",
                  }}
                />

                <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Process Snapshot
                  </span>
                </div>
              </div>
            </div>

            {stats.length > 0 && (
              <motion.div
                variants={kit.text}
                className="mt-5 grid grid-cols-3 gap-3"
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl"
                  >
                    <p
                      className="font-syne text-[1.3rem] font-bold leading-none md:text-[1.5rem]"
                      style={{
                        background:
                          "linear-gradient(135deg, #ffffff 0%, #d6c4ee 50%, #a888c8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div variants={kit.text} className="lg:col-span-7">
            <p className="font-syne text-[12px] font-semibold uppercase tracking-[0.2em] text-[#c9b3ec]">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-syne text-[clamp(1.8rem,3.4vw,2.4rem)] font-semibold leading-[1.1] tracking-tight">
              <span className="block text-gradient-brand">{titleGradient}</span>
              <span className="block text-white">{titleWhite}</span>
            </h2>
            <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.75] text-white/65">
              {summary}
            </p>

            <motion.ul
              variants={kit.container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2, margin: "-10% 0px -10% 0px" }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {items.map((item, i) => (
                <motion.li
                  key={item.title}
                  variants={kit.text}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-white/25"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(168,136,200,0.5), transparent 70%)",
                    }}
                  />
                  <div className="relative flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] font-mono text-[10px] font-semibold text-[#c9b3ec]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-syne text-[15px] font-semibold leading-snug text-white md:text-[15.5px]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-[1.6] text-white/60 md:text-[13.5px]">
                        {item.description}
                      </p>
                    </div>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/25 transition-all duration-500 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
