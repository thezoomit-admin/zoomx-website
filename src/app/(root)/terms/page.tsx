import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/pages/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — ZOOMX",
  description:
    "The terms that govern your use of the ZOOMX website and the services we deliver — scope, ownership, payments, and the responsibilities we share with every client.",
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance Of Terms",
    paragraphs: [
      "By accessing or using the ZOOMX website, our editing pipeline, or any service we deliver, you agree to be bound by these Terms & Conditions and our Privacy Policy.",
      "If you do not agree, please stop using the site and reach out to us — we are happy to clarify anything before you commit.",
    ],
  },
  {
    heading: "Scope Of Services",
    paragraphs: [
      "ZOOMX provides video editing, motion design, storyboard, audio post, and adjacent creative services. Each engagement is defined by the brief, deliverables, and cadence agreed upon in writing before work begins.",
    ],
    bullets: [
      "Deliverables are scoped per project — anything outside the brief is treated as a change request.",
      "We commit to platform-spec exports for every deliverable (codec, aspect ratio, loudness).",
      "Senior editors handle every project — no juniors learning on your timeline.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "All final deliverables become your property once the invoice for that engagement is paid in full.",
      "Source files (project files, plates, working comps) remain ours by default. We are happy to license or transfer them for a separate fee — just ask.",
      "We may use anonymized portions of work in our portfolio and case studies unless you specifically request that we do not.",
    ],
  },
  {
    heading: "Payments & Invoicing",
    paragraphs: [
      "Monthly retainers are billed in advance on a recurring schedule agreed at kick-off. One-off projects are invoiced 50% upfront and 50% on delivery.",
      "Invoices are due within 7 days of issue. Late payments may pause active work until the balance is cleared.",
    ],
  },
  {
    heading: "Revisions",
    paragraphs: [
      "Every project includes two rounds of revisions. Additional rounds are billed at our standard hourly rate.",
      "Feedback should be consolidated and captured directly on Frame.io with timestamps to keep the loop tight and unambiguous.",
    ],
  },
  {
    heading: "Confidentiality",
    paragraphs: [
      "Every editor, motion designer, and reviewer on your project signs an NDA before a single frame arrives. Your raw footage, brand assets, and unreleased work are treated as financial-grade data.",
    ],
  },
  {
    heading: "Limitation Of Liability",
    paragraphs: [
      "ZOOMX is not liable for indirect, incidental, or consequential damages arising from the use of our services or website. Our maximum liability for any single engagement is capped at the fees you paid us in the preceding three months.",
    ],
  },
  {
    heading: "Changes To These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Material changes will be flagged at the top of this page and emailed to active clients at least 14 days before they take effect.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      titleGradient="Terms &"
      titleWhite="Conditions"
      intro="The ground rules for working with ZOOMX — what we promise to deliver, what we ask of you, and how we handle the in-between."
      lastUpdated="June 2026"
      sections={sections}
    />
  );
}
