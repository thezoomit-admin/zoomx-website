"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const links = [
  { label: "Review", href: "#reviews" },
  { label: "Work", href: "#work" },
  { label: "Case Study", href: "/case-study" },
  { label: "Process", href: "#process" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isRaised, setIsRaised] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const scrollThreshold = 10;
    const directionThreshold = 6;

    const onScroll = () => {
      const y = window.scrollY;

      if (y <= scrollThreshold) {
        setIsRaised(true);
      } else if (y > lastScrollY.current + directionThreshold) {
        setIsRaised(false);
      } else if (y < lastScrollY.current - directionThreshold) {
        setIsRaised(true);
      }

      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-1/2 z-9999 flex app-container -translate-x-1/2 flex-col items-stretch transition-[top] duration-300 ease-out motion-reduce:transition-none",
        isRaised ? "top-6" : "top-0",
      )}
    >
      <div className="w-full overflow-hidden rounded-[10px] bg-[linear-gradient(180deg,#7c499d_0%,#7c499d99_38%,#5c2e9d66_72%,#7c499d4d_100%)] p-px">
        <div
          className="rounded-[9px] backdrop-blur-[7px]"
          style={{
            backgroundColor: "#090909",
            backgroundImage:
              "linear-gradient(180deg, rgba(124, 73, 157, 0.18) 0%, rgba(124, 73, 157, 0.1) 42%, #090909 100%)",
          }}
        >
          <nav className="relative z-10 flex w-full items-center justify-between p-2.5 sm:py-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/dark logo.png" alt="logo" className="h-9 w-auto" />
            </Link>

            <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
              {links.map((l) => {
                const isRoute = l.href.startsWith("/");
                const linkClassName =
                  "font-syne text-[14px] font-semibold text-white transition-opacity hover:opacity-80";
                return (
                  <li key={l.href}>
                    {isRoute ? (
                      <Link href={l.href} className={linkClassName}>
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className={linkClassName}>
                        {l.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href="#book-a-call"
              className="hidden items-center gap-2 rounded-md bg-gradient-to-r from-[#5c2e9d] to-[#7c499d] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_24px_-4px_rgba(124,73,157,0.45)] transition-all duration-200 md:inline-flex hover:from-[#4c2583] hover:to-[#6c3e89]"
            >
              Book A Call
            </a>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="text-white md:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="mobile-menu"
                className="overflow-hidden md:hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <ul className="flex flex-col gap-3 border-t border-white/10 px-4 pb-4 pt-3">
                  {links.map((l) => {
                    const isRoute = l.href.startsWith("/");
                    const mobileLinkClassName =
                      "font-syne block py-1 text-sm font-semibold text-white hover:opacity-80";
                    return (
                      <li key={l.href}>
                        {isRoute ? (
                          <Link
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className={mobileLinkClassName}
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className={mobileLinkClassName}
                          >
                            {l.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                  <li>
                    <a
                      href="#book-a-call"
                      onClick={() => setOpen(false)}
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5c2e9d] to-[#7c499d] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_-4px_rgba(124,73,157,0.45)]"
                    >
                      Book A Call <ArrowUpRight className="h-4 w-4 shrink-0" />
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
