"use client";

import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function BlogLeadForm() {
  const [values, setValues] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.phone.trim()) errs.phone = "Phone is required";
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = "Enter a valid email";
    if (!values.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    console.log("BlogLeadForm submitted:", values);
    setSubmitted(true);
    setValues({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="sticky top-16 rounded-lg border border-white/10 bg-gradient-to-br from-[#181929] to-[#0a0a0a] p-5 shadow-2xl relative overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 top-0 h-48 w-48 -translate-y-1/3 translate-x-1/3 rounded-full bg-[#7c499d] opacity-20 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-32 w-32 translate-y-1/3 -translate-x-1/3 rounded-full bg-[#5c2e9d] opacity-15 blur-[60px] pointer-events-none" />

      {/* Title */}
      <div className="mb-5 relative z-10">
        <h4 className="font-syne text-[18px] font-bold text-white">Quick Contact</h4>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 relative z-10">

        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="font-syne text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            Full Name <span className="text-[#a888c8]">*</span>
          </label>
          <input
            type="text"
            value={values.name}
            onChange={setField("name")}
            placeholder="Enter your name"
            className={`w-full rounded-[6px] border bg-white/[0.04] px-3 py-1.5 text-[13px] text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:outline-none transition-all ${errors.name ? "border-red-400/60" : "border-white/10 focus:border-[#7c499d]/60"}`}
          />
          {errors.name && <p className="text-[11px] text-red-400 mt-0.5">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="font-syne text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            Work Email <span className="text-white/30">(optional)</span>
          </label>
          <input
            type="email"
            value={values.email}
            onChange={setField("email")}
            placeholder="Enter your email"
            className={`w-full rounded-[6px] border bg-white/[0.04] px-3 py-1.5 text-[13px] text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:outline-none transition-all ${errors.email ? "border-red-400/60" : "border-white/10 focus:border-[#7c499d]/60"}`}
          />
          {errors.email && <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="font-syne text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            Phone <span className="text-[#a888c8]">*</span>
          </label>
          <input
            type="tel"
            value={values.phone}
            onChange={setField("phone")}
            placeholder="Enter your phone"
            className={`w-full rounded-[6px] border bg-white/[0.04] px-3 py-1.5 text-[13px] text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:outline-none transition-all ${errors.phone ? "border-red-400/60" : "border-white/10 focus:border-[#7c499d]/60"}`}
          />
          {errors.phone && <p className="text-[11px] text-red-400 mt-0.5">{errors.phone}</p>}
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="font-syne text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
            Message <span className="text-[#a888c8]">*</span>
          </label>
          <textarea
            rows={3}
            value={values.message}
            onChange={setField("message")}
            placeholder="Tell us about your project..."
            className={`w-full rounded-[6px] border bg-white/[0.04] px-3 py-1.5 text-[13px] text-white placeholder:text-white/30 focus:bg-white/[0.07] focus:outline-none resize-none transition-all ${errors.message ? "border-red-400/60" : "border-white/10 focus:border-[#7c499d]/60"}`}
          />
          {errors.message && <p className="text-[11px] text-red-400 mt-0.5">{errors.message}</p>}
        </div>

        {/* Submit */}
        <Button type="submit" variant="brand" size="cta" className="mt-1 w-full">
          {submitted ? (
            <>
              Submitted
              <Check />
            </>
          ) : (
            <>
              Get Started
              <ArrowRight />
            </>
          )}
        </Button>

        <p className="text-center text-[11px] text-white/30 mt-1">
          We&apos;ll never share your information.
        </p>
      </form>
    </div>
  );
}
