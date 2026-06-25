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
      className="fixed inset-x-0 bottom-0 z-[9999] lg:hidden"
      style={{
        background: "rgba(8, 2, 14, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(168, 136, 200, 0.15)",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex items-stretch px-2 py-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="group relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1 transition-all duration-200 active:scale-95"
            >
              {/* Active top indicator */}
              {active && (
                <span
                  aria-hidden
                  className="absolute inset-x-4 top-0 h-[1.5px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(168,136,200,0.9), transparent)",
                  }}
                />
              )}

              {/* Icon */}
              <Icon
                style={{
                  width: 20,
                  height: 20,
                  color: active
                    ? "rgba(210, 180, 255, 1)"
                    : "rgba(255,255,255,0.75)",
                  strokeWidth: active ? 2 : 1.5,
                  transition: "color 0.2s, filter 0.2s",
                  filter: active
                    ? "drop-shadow(0 0 6px rgba(168,136,200,0.6))"
                    : "none",
                }}
              />

              {/* Label */}
              <span
                className="font-syne text-[9px] font-semibold uppercase tracking-widest transition-colors duration-200"
                style={{
                  color: active
                    ? "rgba(210,180,255,1)"
                    : "rgba(255,255,255,0.75)",
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
