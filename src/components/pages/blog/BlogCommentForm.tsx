"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BlogCommentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Comment submitted");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-8 border-t border-white/10">
      <h3 className="font-syne text-[24px] font-bold text-white mb-6">
        Leave a Comment
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            className="w-full rounded-md border border-white/10 bg-[#0a0a0a] px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:border-[#7c499d] focus:bg-[#121213] focus:outline-none transition-all"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            className="w-full rounded-md border border-white/10 bg-[#0a0a0a] px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:border-[#7c499d] focus:bg-[#121213] focus:outline-none transition-all"
          />
        </div>
        <textarea
          rows={4}
          required
          placeholder="Write your comment here..."
          className="w-full rounded-md border border-white/10 bg-[#0a0a0a] px-4 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:border-[#7c499d] focus:bg-[#121213] focus:outline-none resize-none transition-all"
        ></textarea>
        <Button
          type="submit"
          variant="brand"
          className="self-start h-auto px-8 py-2.5 text-[15px] font-bold"
        >
          {submitted ? "Posted! ✓" : "Post Comment"}
        </Button>
      </form>
    </div>
  );
}
