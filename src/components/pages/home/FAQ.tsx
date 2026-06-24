"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
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
  {
    q: "How long does a typical project take?",
    a: "Most short-form edits ship within 24-48 hours of receiving raw footage. Long-form videos and full launch campaigns run on a weekly cadence aligned with your publishing schedule.",
  },
  {
    q: "How do you handle revisions?",
    a: "Every project includes two rounds of revisions baked into the price. We capture notes directly on Frame.io so feedback is timestamped and unambiguous — no email ping-pong.",
  },
  {
    q: "What does pricing look like?",
    a: "We charge one flat monthly fee tied to a deliverable cadence — no hourly creep, no surprise invoices. You know exactly what next month costs before you commit to it.",
  },
  {
    q: "How do we get started?",
    a: "Book a 30-minute call, share your channel and goals, and we'll send back a sample plan within 24 hours. Once you say yes, your first edit lands in about a week.",
  },
] as const;

const DEFAULT_OPEN = new Set<number>([0]);

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
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border transition-all duration-500",
        isOpen
          ? "border-[#a888c8]/40 bg-[radial-gradient(circle_at_50%_-20%,#5c2e9d33,#0a0a0a_70%)] shadow-[0_18px_60px_-22px_rgba(124,73,157,0.55)]"
          : "border-[#ffffff0f] bg-[#0a0a0a] hover:border-white/20 hover:bg-[#0d0d10]",
      )}
    >
      {isOpen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#a888c8]/60 to-transparent"
        />
      )}

      <Button
        type="button"
        variant="ghost"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex h-auto w-full items-center justify-between gap-4 rounded-none px-5 py-5 text-left hover:bg-transparent sm:px-6 sm:py-6"
      >
        <span
          className={cn(
            "font-syne text-[15px] font-semibold leading-snug transition-colors sm:text-base",
            isOpen ? "text-white" : "text-white/90",
          )}
        >
          {question}
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border p-1 transition-all duration-300",
            isOpen
              ? "border-[#a888c8]/50 bg-[#2a1644] text-white"
              : "border-white/10 bg-[#141414] text-white/80",
          )}
          aria-hidden
        >
          <ChevronDown
            size={18}
            className={cn(
              "transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
        </span>
      </Button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <FaqAnswer answer={answer} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqAnswer({ answer }: { answer: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Compare full content height against the line-clamped height.
    const measure = () => {
      const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight) || 22;
      const maxClampedHeight = lineHeight * 3 + 1; // 3 lines + rounding tolerance
      setNeedsToggle(el.scrollHeight > maxClampedHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [answer]);

  return (
    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
      <p
        ref={ref}
        className={cn(
          "font-syne text-[14px] leading-[1.6] text-[#ffffffb3] sm:text-[15px]",
          !isExpanded && "line-clamp-3",
        )}
      >
        {answer}
      </p>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-2.5 inline-flex items-center font-syne text-[13px] font-semibold text-[#c9b3ec] transition-colors hover:text-white sm:text-[13.5px]"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

function FaqColumn({
  items,
  baseIndex,
  openIndex,
  onToggle,
}: {
  items: readonly (typeof faqs)[number][];
  baseIndex: number;
  openIndex: number | null;
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
            isOpen={openIndex === index}
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

  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    const [first] = DEFAULT_OPEN;
    return first ?? null;
  });

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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

        <div className="mt-12 grid grid-cols-1 items-start gap-4 sm:mt-14 md:grid-cols-2 md:gap-5 md:gap-x-6">
          <FaqColumn items={leftFaqs} baseIndex={0} openIndex={openIndex} onToggle={toggle} />
          <FaqColumn
            items={rightFaqs}
            baseIndex={rightColumnBaseIndex}
            openIndex={openIndex}
            onToggle={toggle}
          />
        </div>
      </div>
    </section>
  );
}
