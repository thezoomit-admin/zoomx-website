"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Simple, flat navbar inspired by the VideoCady reference design.
 * Logo on the left, centered link list, right-side phone-number pill +
 * search icon. Uses the existing site menu items unchanged.
 */

const links = [
  { label: "Review", href: "/#reviews" },
  { label: "Work", href: "/#work" },
  { label: "Case Study", href: "/case-study" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
];

export function Navbar2() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-9999 border-b transition-colors duration-300",
        isScrolled || open
          ? "border-white/10 bg-[#070009]/90 backdrop-blur-md"
          : "border-white/15 bg-transparent",
      )}
    >
      <div className="app-container">
        <nav
          className={cn(
            "relative flex items-center justify-between gap-6 transition-[height] duration-300 ease-out",
            isScrolled ? "h-12 md:h-16" : "h-16 md:h-20",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/dark logo.png"
              alt="logo"
              width={120}
              height={36}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => {
              const isRoute = l.href.startsWith("/") && !l.href.startsWith("/#");
              const className =
                "font-syne text-[14px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:text-white";
              return (
                <li key={l.href}>
                  {isRoute ? (
                    <Link href={l.href} className={className}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className={className}>
                      {l.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              href="/#book-a-call"
              variant="brand"
              size="cta"
              className="hidden md:inline-flex"
            >
              Book A Call
              <ArrowUpRight />
            </Button>

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white transition-colors hover:bg-white/5 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu-2"
            className="relative w-full overflow-hidden lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundColor: "#070009",
              backgroundImage:
                "linear-gradient(180deg, rgba(124, 73, 157, 0.22) 0%, rgba(60, 30, 100, 0.12) 50%, #070009 100%)",
            }}
          >
            <div className="app-container">
              <ul className="relative flex flex-col gap-1 border-t border-white/10 py-4">
                {links.map((l) => {
                  const isRoute =
                    l.href.startsWith("/") && !l.href.startsWith("/#");
                  const className =
                    "block py-2.5 font-syne text-[14px] font-semibold uppercase tracking-[0.08em] text-white hover:text-white";
                  return (
                    <li key={l.href}>
                      {isRoute ? (
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={className}
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className={className}
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  );
                })}
                <li className="mt-3 border-t border-white/10 pt-4">
                  <Button
                    href="/#book-a-call"
                    onClick={() => setOpen(false)}
                    variant="brand"
                    size="cta"
                    className="w-full justify-center"
                  >
                    Book A Call
                    <ArrowUpRight />
                  </Button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
