import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/pages/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — ZOOMX",
  description:
    "How ZOOMX collects, uses, and protects your data — including raw footage, brand assets, contact details, and analytics.",
};

const sections: LegalSection[] = [
  {
    heading: "What We Collect",
    paragraphs: [
      "We collect only what we need to deliver the work you hired us for and to keep the site running. Nothing more.",
    ],
    bullets: [
      "Contact details — name, email, phone, and company info you submit through forms.",
      "Project assets — raw footage, brand kits, scripts, and reference material you upload for editing.",
      "Usage analytics — anonymized page views, referrers, and device info to understand how the site performs.",
      "Communication history — emails, Slack threads, and call notes tied to your active engagement.",
    ],
  },
  {
    heading: "How We Use Your Data",
    paragraphs: [
      "Your data is used only to fulfill the engagement, communicate about active work, and improve the site. We never sell or rent your information.",
    ],
    bullets: [
      "Deliver the editing, motion, audio, and storyboard services you commissioned.",
      "Send invoices, project updates, and time-sensitive notices.",
      "Improve our website and content via aggregated analytics.",
      "Comply with legal, tax, and audit obligations.",
    ],
  },
  {
    heading: "How We Protect Assets",
    paragraphs: [
      "Raw footage and brand assets are treated as financial-grade data. They sit behind signed NDAs, encrypted transit, and role-based access controls.",
    ],
    bullets: [
      "AES-256 encryption at rest for all project files.",
      "TLS 1.3 with rotated tokens for every transfer.",
      "Triple-redundant backups across three regions, retained for 12 months minimum.",
      "Every collaborator signs an NDA before a single asset moves.",
    ],
  },
  {
    heading: "Third-Party Tools",
    paragraphs: [
      "We use a small set of trusted vendors to run the business. Each handles data under their own privacy commitments, listed below.",
    ],
    bullets: [
      "Frame.io — review and feedback collaboration.",
      "Stripe — billing and payment processing.",
      "Slack and Google Workspace — team communication.",
      "Cal.com / Calendly — booking discovery calls.",
      "Vercel — website hosting and edge delivery.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We use a minimal set of essential cookies to keep the site working and a privacy-friendly analytics cookie to measure traffic. We do not use advertising or tracking cookies.",
    ],
  },
  {
    heading: "Your Rights",
    paragraphs: [
      "You can request a copy of the data we hold on you, ask us to correct it, or ask us to delete it at any time. We will action verified requests within 30 days.",
    ],
  },
  {
    heading: "Data Retention",
    paragraphs: [
      "Active project data is retained for the duration of the engagement plus 12 months. After that, we delete project files unless you ask us to hold them longer.",
      "Invoicing and tax records are retained for the period required by law (typically 7 years).",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "Our services are intended for businesses and adult creators. We do not knowingly collect data from anyone under 16. If you believe a minor has submitted data, contact us and we will remove it.",
    ],
  },
  {
    heading: "Changes To This Policy",
    paragraphs: [
      "We may revise this policy as our tooling or obligations change. Material updates will be highlighted at the top of this page and notified by email to active clients.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      titleGradient="Privacy"
      titleWhite="Policy"
      intro="What data we collect, how we use it, and how we keep your raw footage, brand assets, and contact details safe — written in plain English, not legalese."
      lastUpdated="June 2026"
      sections={sections}
      imageSrc="/policy/privicypolicy2.png"
    />
  );
}
