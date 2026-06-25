"use client";

import {
  BookOpen,
  Briefcase,
  Home,
  Mail,
  Star,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const items: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Cases", href: "/case-study", icon: Briefcase },
  { label: "Work", href: "/portfolio", icon: Star },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: Mail },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-9999 lg:hidden"
    >
      {/* Soft fade under the bar so the page content blends into it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-full h-6 bg-linear-to-t from-[#070009]/85 to-transparent"
      />

      <div className="px-3 pb-3 pt-1 sm:px-4">
        <div
          className="relative rounded-2xl p-px shadow-[0_18px_40px_-8px_rgba(124,73,157,0.55)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,73,157,0.85), rgba(168,136,200,0.45), rgba(92,46,157,0.85))",
          }}
        >
          <ul
            className="grid grid-cols-5 items-stretch gap-1 rounded-[15px] px-2 py-2 backdrop-blur-xl"
            style={{
              backgroundColor: "#0a0410",
              backgroundImage:
                "linear-gradient(180deg, rgba(124, 73, 157, 0.18) 0%, rgba(60, 30, 100, 0.08) 55%, #0a0410 100%)",
            }}
          >
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 transition-colors duration-300"
                  >
                    {/* Active pill */}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(124,73,157,0.55) 0%, rgba(92,46,157,0.35) 100%)",
                          boxShadow:
                            "0 6px 22px -6px rgba(168,136,200,0.65), inset 0 0 0 1px rgba(168,136,200,0.35)",
                        }}
                      />
                    )}

                    <span
                      className={`relative flex h-7 w-7 items-center justify-center rounded-lg transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : "text-white/65 group-hover:text-white"
                      }`}
                    >
                      <Icon
                        className="h-[18px] w-[18px]"
                        strokeWidth={active ? 2.2 : 1.8}
                      />
                    </span>
                    <span
                      className={`relative font-syne text-[10.5px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : "text-white/55 group-hover:text-white/85"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
