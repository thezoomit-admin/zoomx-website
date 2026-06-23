"use client";

import { Link2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";

export function BlogShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <h4 className="font-syne text-[16px] font-bold text-white whitespace-nowrap">Share:</h4>
      <div className="flex flex-wrap items-center justify-end gap-2.5">
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={34} round />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={34} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={34} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={url} title={title} separator=":: ">
          <WhatsappIcon size={34} round />
        </WhatsappShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon size={34} round />
        </TelegramShareButton>
        <RedditShareButton url={url} title={title}>
          <RedditIcon size={34} round />
        </RedditShareButton>
        <EmailShareButton url={url} subject={title} body="Check out this article:">
          <EmailIcon size={34} round />
        </EmailShareButton>

        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block" />
        <Button
          type="button"
          onClick={handleCopy}
          variant="brandOutline"
          size="sm"
          className="h-8.5 rounded-full px-3 text-[12px]"
        >
          <Link2 />
          Copy
        </Button>
        {copied && (
          <span className="text-[12px] font-medium text-green-400 animate-in fade-in slide-in-from-left-2">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
