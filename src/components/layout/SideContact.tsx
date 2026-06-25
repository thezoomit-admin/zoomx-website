"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

type ContactLink = {
  label: string;
  href: string;
  /** Brand color used for the gradient ring + glow. */
  ring: string;
  glow: string;
  icon: React.ReactNode;
};

const contacts: ContactLink[] = [
  {
    label: "WhatsApp",
    href: "https://wa.me/16095550142",
    ring: "#25D366",
    glow: "rgba(37, 211, 102, 0.85)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: "Messenger",
    href: "https://m.me/",
    ring: "#0084FF",
    glow: "rgba(0, 132, 255, 0.85)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0Zm1.193 14.963-3.056-3.259-5.963 3.259L10.733 8l3.13 3.259L19.752 8l-6.559 6.963Z" />
      </svg>
    ),
  },
  {
    label: "Call",
    href: "tel:+16095550142",
    ring: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.85)",
    icon: <Phone className="h-[18px] w-[18px]" strokeWidth={2.2} />,
  },
];

export function SideContact() {
  // Mount-only fade-in so the bar arrives with a soft entrance
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <aside
      aria-label="Quick contact"
      className="fixed right-3 bottom-24 z-[9998] sm:right-4 lg:bottom-6"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? "translate3d(0, 0, 0)"
          : "translate3d(12px, 0, 0)",
        transition: "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <ul className="flex flex-col gap-1">
        {contacts.map((c, i) => (
          <li
            key={c.label}
            style={{
              transitionDelay: mounted ? `${i * 90}ms` : "0ms",
            }}
          >
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              aria-label={c.label}
              className="group relative m-0.5 inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 ease-out hover:translate-x-0.5 hover:scale-[1.06] hover:border-white/50"
              style={{
                background: "transparent",
                boxShadow: `0 8px 28px -6px ${c.glow}`,
              }}
            >
              {/* Inner colored fill with a gap between border and bg */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0.75 rounded-full"
                style={{ background: c.ring }}
              />

              {/* Icon */}
              <span className="relative z-10 text-white">
                {c.icon}
              </span>

              {/* Pulsing ring on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 0 4px ${c.glow}`,
                  animation: "side-contact-pulse 1.6s ease-out infinite",
                }}
              />

              {/* Tooltip label */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-white/10 bg-[#0a0612]/95 px-2.5 py-1 font-syne text-[11px] font-semibold uppercase tracking-[0.14em] text-white opacity-0 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-block"
                style={{ transform: "translateX(4px)" }}
              >
                {c.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes side-contact-pulse {
          0%   { box-shadow: 0 0 0 0 currentColor; opacity: 0.55; }
          70%  { box-shadow: 0 0 0 10px transparent; opacity: 0;  }
          100% { box-shadow: 0 0 0 0 transparent; opacity: 0;     }
        }
      `}</style>
    </aside>
  );
}
