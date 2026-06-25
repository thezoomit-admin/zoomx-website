import type { Metadata } from "next";

import { LegalPage, type LegalSection } from "@/components/pages/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy — ZOOMX",
  description:
    "How ZOOMX handles refunds, cancellations, and project pauses — plain English, no fine-print surprises.",
};

const sections: LegalSection[] = [
  {
    heading: "Our Refund Philosophy",
    paragraphs: [
      "We want every engagement with ZOOMX to feel like a yes — both at the start and at the finish. If the work we ship does not meet the brief, we will keep iterating until it does, or we will refund the portion that did not land.",
      "This page lays out exactly when refunds apply, what is non-refundable, and how to request one.",
    ],
  },
  {
    heading: "Refund Window",
    paragraphs: [
      "Refund requests must be submitted in writing within 14 days of the relevant deliverable being shipped. After this window, the engagement is considered accepted.",
    ],
    bullets: [
      "Monthly retainers — pro-rated refund for unused, unstarted work within the current billing cycle.",
      "One-off projects — partial refund available before the first cut is shared with you.",
      "Discovery calls and sample edits — always free, never charged.",
    ],
  },
  {
    heading: "Non-Refundable Work",
    paragraphs: [
      "Once a deliverable has been accepted in writing, or used publicly (uploaded, published, or distributed), it is no longer refundable. This is in place to protect the time of the senior editors who shipped the project.",
    ],
  },
  {
    heading: "Pausing A Retainer",
    paragraphs: [
      "You can pause an active retainer at any time with 7 days' notice. Paused months are not billed.",
      "Unused capacity from a paused month does not carry over — the retainer represents a reserved slot on our team's calendar.",
    ],
  },
  {
    heading: "Cancellation",
    paragraphs: [
      "Either party can cancel an engagement with 14 days' written notice. Any in-progress work is delivered up to the cancellation date, and any pre-paid balance for unstarted work is refunded.",
    ],
  },
  {
    heading: "How To Request A Refund",
    paragraphs: [
      "Email us with your project name, the invoice number, the deliverable in question, and a short note on what fell short. We aim to respond within one business day and resolve every request within 7 days.",
    ],
  },
  {
    heading: "Disputes",
    paragraphs: [
      "If we cannot resolve a refund request to your satisfaction, we are open to mediation through a neutral third party. We have never had to go this route — and we work hard to keep it that way.",
    ],
  },
];

export default function RefundPage() {
  return (
    <LegalPage
      titleGradient="Refund"
      titleWhite="Policy"
      intro="If something does not land, we make it right — either with another pass or with your money back. Here is exactly how that works."
      lastUpdated="June 2026"
      sections={sections}
      imageSrc="/policy/refundpolicy2.png"
    />
  );
}
