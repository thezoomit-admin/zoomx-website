"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Review", href: "/#reviews" },
  { label: "Work", href: "/#work" },
  { label: "Case Study", href: "/case-study" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isRaised, setIsRaised] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Navbar starts raised (top-6) while near the page top, and slides up to
    // top-0 once the user has scrolled past the threshold. No scroll-direction
    // tracking — it doesn't pop back down mid-page when scrolling up.
    const scrollThreshold = 80;

    const onScroll = () => {
      const y = window.scrollY;
      setIsRaised(y <= scrollThreshold);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed left-1/2 z-9999 flex app-container -translate-x-1/2 flex-col items-stretch transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
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
              <Image
                src="/dark logo.png"
                alt="logo"
                width={120}
                height={36}
                priority
                className="h-9 w-auto"
              />
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

            <Button
              href="/#book-a-call"
              variant="brand"
              size="cta"
              className="hidden md:inline-flex"
            >
              Book A Call
              <ArrowUpRight />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="text-white hover:bg-white/5 md:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
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
                    <Button
                      href="/#book-a-call"
                      onClick={() => setOpen(false)}
                      variant="brand"
                      size="cta"
                      className="mt-2 w-full justify-center"
                    >
                      Book A Call
                      <ArrowUpRight />
                    </Button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll progress bar — fills 0 → 100% as the page scrolls */}
          <div
            aria-hidden
            className="relative h-0.5 w-full overflow-hidden bg-white/5"
          >
            <div
              className="h-full origin-left bg-linear-to-r from-[#5c2e9d] via-[#a888c8] to-[#7c499d] shadow-[0_0_10px_rgba(168,136,200,0.6)]"
              style={{
                transform: `scaleX(${scrollProgress})`,
                transition: "transform 80ms linear",
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
