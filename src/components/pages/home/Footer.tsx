"use client";

import { Image } from "@/components/shared/Image";

const linkColumns = [
  {
    title: "LINK",
    items: [
      { label: "Home", href: "#" },
      { label: "About Us", href: "#about" },
      { label: "Testimonials", href: "#reviews" },
      { label: "Case Study", href: "#case-study" },
      { label: "Contact Us", href: "#book-a-call" },
    ],
  },
  {
    title: "FEATURES",
    items: [
      { label: "Security", href: "#" },
      { label: "Quality", href: "#" },
      { label: "Benefits", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Portfolio", href: "#work" },
    ],
  },
] as const;

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[14px] w-[14px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.766l4.713 6.231 5.51-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[16px] w-[16px]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.546 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.064 2.063 2.063 0 1 1 2.063 2.064Zm1.78 13.019H3.555V9h3.562v11.452ZM22.225 0H1.771C.792 0 0 .775 0 1.729v20.541C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .775 23.2 0 22.222 0h.003Z" />
      </svg>
    ),
  },
] as const;

const linkClassName =
  "font-syne text-[14px] font-medium text-[#ffffffb3] transition-colors hover:text-white";

function TopographyBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0a0410]"
    >
      <Image
        src="/footer/footer3.png"
        alt=""
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,4,16,0.18) 0%, rgba(10,4,16,0) 50%, rgba(10,4,16,0.18) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 28%, rgba(124,73,157,0.4) 0%, rgba(92,46,157,0.25) 32%, rgba(60,30,100,0.12) 60%, rgba(10,4,16,0) 90%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 80% at 50% 50%, rgba(10,4,16,0) 0%, rgba(10,4,16,0) 45%, rgba(10,4,16,0.4) 75%, rgba(10,4,16,0.6) 100%)",
        }}
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/4 bg-[#0a0410] shadow-[inset_0_32px_56px_-24px_rgba(0,0,0,0.95)]">
      <div className="relative isolate overflow-hidden">
        <TopographyBackdrop />
        <div className="relative z-10 app-container pb-14 pt-24 md:pb-20 md:pt-36">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12">
          <div className="flex flex-col gap-5 md:col-span-4">
            <Image
              src="/dark logo.png"
              alt="ZOOMX"
              width={120}
              height={36}
              className="h-9 w-fit object-contain"
            />
            <p className="max-w-[300px] text-[13px] leading-relaxed text-[#ffffff80]">
              Done-For-You organic video content systems that generate leads on autopilot.
            </p>
          </div>

          {linkColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="flex flex-col gap-4 md:col-span-2"
            >
              <h3 className="font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={linkClassName}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-4 md:col-span-4">
            <h3 className="font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-white">
              ADDRESS
            </h3>
            <address className="not-italic text-[14px] leading-relaxed text-[#ffffffb3]">
              116 Village Blvd, Suite 220,
              <br />
              Princeton, NJ 08540
            </address>
            <div className="mt-2 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition-all hover:border-white hover:bg-gradient-to-r hover:from-[#5c2e9d] hover:to-[#7c499d]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        </div>
      </div>

      <div className="bg-[#150826]">
        <div className="flex app-container flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-[13px] text-white">
            &copy; {new Date().getFullYear()} ZOOMX. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-syne text-[14px] font-medium text-white transition-opacity hover:opacity-80"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
