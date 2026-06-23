"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Tell me about your agency?",
    a: "At ZOOMX, we help coaches and trainers build their personal brand through high quality video editing and social media marketing.",
  },
  {
    q: "Tell me about your content plan?",
    a: "We analyze your existing content, identify your niche, and offer a comprehensive content plan catering to your personal brand.",
  },
  {
    q: "What services will you provide?",
    a: "We offer YouTube videos, Shorts, Instagram Reels, TikTok and Facebook Reels, promotional videos and more — plus social media marketing services with a proven record.",
  },
  {
    q: "What if I don't get the results?",
    a: "We have replicated our strategies across multiple brands and channels and successfully scaled their businesses. It's very unlikely what worked for everyone else won't work for you.",
  },
  {
    q: "Why wouldn't I hire a freelancer?",
    a: "We have a dedicated team of 30+ editors. Our quality of work will always outperform any sole freelancer working on their own.",
  },
  {
    q: "Tell me about your workflow?",
    a: "We understand your project, your consumer base, and your businesses, and then schedule a discovery call with you to understand your requirements. Afterwards, our team takes care of task management, delegation, editing, and running feedback loops with you to ensure best results.",
  },
] as const;

const DEFAULT_OPEN = new Set<number>();

/** Left column gets the extra item when count is odd (e.g. 9 → 5|4, 8 → 4|4). */
function splitFaqsIntoColumns<T>(items: readonly T[]): [readonly T[], readonly T[]] {
  const splitAt = Math.ceil(items.length / 2);
  return [items.slice(0, splitAt), items.slice(splitAt)];
}

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ffffff0f] bg-[#0a0a0a]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
      >
        <span className="font-syne text-[15px] font-semibold leading-snug text-white sm:text-base">
          {question}
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#141414] p-1",
            isOpen && "bg-[#1a1a1a]",
          )}
          aria-hidden
        >
          <ChevronDown
            size={18}
            className={cn(
              "text-white/80 transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 cursor-pointer font-syne text-[14px] leading-[1.6] text-[#ffffffb3] sm:px-6 sm:pb-6 sm:text-[15px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqColumn({
  items,
  baseIndex,
  openSet,
  onToggle,
}: {
  items: readonly (typeof faqs)[number][];
  baseIndex: number;
  openSet: Set<number>;
  onToggle: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {items.map((item, i) => {
        const index = baseIndex + i;
        return (
          <FaqItem
            key={item.q}
            question={item.q}
            answer={item.a}
            isOpen={openSet.has(index)}
            onToggle={() => onToggle(index)}
          />
        );
      })}
    </div>
  );
}

export function FAQ() {
  const [leftFaqs, rightFaqs] = splitFaqsIntoColumns(faqs);
  const rightColumnBaseIndex = leftFaqs.length;

  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set(DEFAULT_OPEN));

  const toggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section id="faq" className="relative py-8 md:py-10">
      <div className="container mx-auto max-w-[1100px] px-6 md:px-8">
        <div className="section-heading">
          <p className="text-center text-[14px] font-semibold uppercase tracking-[0.12em] font-syne text-white">
            Any Queries You Have
          </p>
          <h2 className="mt-4 text-center font-syne text-[clamp(1.7rem,4.4vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
            <span className="text-gradient-brand ">Questions You May </span>
            <span className="text-white pl-1"> Ask</span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-2 md:gap-5 md:gap-x-6">
          <FaqColumn items={leftFaqs} baseIndex={0} openSet={openSet} onToggle={toggle} />
          <FaqColumn
            items={rightFaqs}
            baseIndex={rightColumnBaseIndex}
            openSet={openSet}
            onToggle={toggle}
          />
        </div>
      </div>
    </section>
  );
}
