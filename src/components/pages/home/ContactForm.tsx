"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  AtSign,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  Send,
  Signal,
  Tag,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.literal("").or(z.email("Please enter a valid email address")),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d][\d\s().-]{5,}$/, "Please enter a valid phone number"),
  subject: z.string().trim().max(120, "Subject is too long").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type FieldKey = "name" | "email" | "phone" | "subject" | "message";
type FieldErrors = Partial<Record<FieldKey, string>>;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

type AnimatedFieldProps = {
  id: FieldKey;
  label: string;
  placeholder?: string;
  type?: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  required?: boolean;
  error?: string;
};

function AnimatedField({
  id,
  label,
  placeholder,
  type = "text",
  icon,
  value,
  onChange,
  multiline = false,
  required = false,
  error,
}: AnimatedFieldProps) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  return (
    <motion.div variants={fieldVariants} className="relative">
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 pl-0.5 font-syne text-[12px] font-semibold uppercase tracking-[0.12em]"
      >
        <span
          className={cn(
            "transition-colors",
            hasError
              ? "text-red-300"
              : focused
                ? "text-[#c9b3e6]"
                : "text-[#ffffffcc]",
          )}
        >
          {label}
        </span>
        {required && (
          <span aria-hidden className="text-[#a888c8]">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-md"
          initial={false}
          animate={{
            opacity: focused ? 1 : 0,
            scale: focused ? 1 : 0.985,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(120deg, rgba(92,46,157,0.55), rgba(124,73,157,0.45), rgba(168,136,200,0.45))",
            filter: "blur(14px)",
          }}
        />

        <div
          className={cn(
            "relative rounded-md border bg-white/[0.03] backdrop-blur-sm transition-colors duration-300",
            hasError
              ? "border-red-400/80"
              : focused
                ? "border-[#a888c8]"
                : "border-white/40 hover:border-white/60",
          )}
        >
          <motion.div
            aria-hidden
            initial={false}
            animate={{
              color: focused ? "#c9b3e6" : "#ffffff66",
              scale: focused ? 1.08 : 1,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className={cn(
              "pointer-events-none absolute left-3.5",
              multiline ? "top-3.5" : "top-1/2 -translate-y-1/2",
            )}
          >
            {icon}
          </motion.div>

          {multiline ? (
            <textarea
              id={id}
              value={value}
              placeholder={placeholder}
              required={required}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => onChange(e.target.value)}
              rows={4}
              className="block w-full resize-none rounded-md border-0 bg-transparent py-3 pl-10 pr-3 text-[14px] text-white outline-none placeholder:text-[#ffffff40]"
            />
          ) : (
            <Input
              id={id}
              type={type}
              value={value}
              placeholder={placeholder}
              required={required}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => onChange(e.target.value)}
              className="h-12 rounded-md border-0 bg-transparent pl-10 pr-3 text-[14px] text-white shadow-none placeholder:text-[#ffffff40] focus-visible:ring-0"
            />
          )}

          <motion.div
            aria-hidden
            initial={false}
            animate={{ scaleX: focused ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-3 right-3 h-px origin-left bg-linear-to-r from-[#5c2e9d] via-[#7c499d] to-[#a888c8]"
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {hasError && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className="overflow-hidden pl-1 pt-1.5 text-[11.5px] font-medium text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type FloatBit = {
  Icon: React.ComponentType<{ className?: string }>;
  position: string;
  size: string;
  duration: number;
  delay: number;
  drift: number;
  rotate: number;
  opacity: number;
};

const leftFloatBits: FloatBit[] = [
  { Icon: Mail, position: "top-[12%] left-[8%]", size: "h-6 w-6", duration: 7, delay: 0, drift: -14, rotate: 6, opacity: 0.28 },
  { Icon: AtSign, position: "top-[34%] left-[3%]", size: "h-5 w-5", duration: 9, delay: 0.6, drift: 12, rotate: -8, opacity: 0.22 },
  { Icon: MessageCircle, position: "top-[58%] left-[12%]", size: "h-7 w-7", duration: 8, delay: 1.2, drift: -10, rotate: 4, opacity: 0.24 },
  { Icon: Send, position: "top-[78%] left-[5%]", size: "h-5 w-5", duration: 6.5, delay: 0.3, drift: -16, rotate: 10, opacity: 0.22 },
];

const rightFloatBits: FloatBit[] = [
  { Icon: PhoneCall, position: "top-[14%] right-[7%]", size: "h-6 w-6", duration: 8, delay: 0.4, drift: -12, rotate: -6, opacity: 0.28 },
  { Icon: Signal, position: "top-[36%] right-[3%]", size: "h-5 w-5", duration: 7.5, delay: 1, drift: 14, rotate: 5, opacity: 0.22 },
  { Icon: MessageSquare, position: "top-[60%] right-[11%]", size: "h-6 w-6", duration: 9, delay: 0.2, drift: -10, rotate: -4, opacity: 0.24 },
  { Icon: Mail, position: "top-[80%] right-[4%]", size: "h-5 w-5", duration: 6, delay: 0.8, drift: -16, rotate: -10, opacity: 0.22 },
];

const pulseRingPositions = {
  left: "top-[20%] left-[15%]",
  right: "top-[22%] right-[14%]",
} as const;

const orbPositions = {
  left: "top-[68%] left-[2%]",
  right: "top-[72%] right-[2%]",
} as const;

function FloatingContactDecor({ side }: { side: "left" | "right" }) {
  const bits = side === "left" ? leftFloatBits : rightFloatBits;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 hidden w-[22%] lg:block"
      style={side === "left" ? { left: 0 } : { right: 0 }}
    >
      <motion.div
        className={cn("absolute h-40 w-40 rounded-full", orbPositions[side])}
        style={{
          background:
            "radial-gradient(circle, rgba(124,73,157,0.35), rgba(168,136,200,0) 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={cn("absolute", pulseRingPositions[side])}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-0 top-0 h-12 w-12 rounded-full border border-[#a888c8]/30"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: [0.3, 1.4], opacity: [0.55, 0] }}
            transition={{
              duration: 3.6,
              delay: i * 1.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {bits.map((bit, idx) => {
        const Icon = bit.Icon;
        return (
          <motion.div
            key={idx}
            className={cn("absolute", bit.position)}
            initial={{ y: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: [0, bit.drift, 0],
              rotate: [-bit.rotate, bit.rotate, -bit.rotate],
              opacity: [bit.opacity * 0.6, bit.opacity, bit.opacity * 0.6],
            }}
            transition={{
              duration: bit.duration,
              delay: bit.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              className="relative inline-flex items-center justify-center text-[#c9b3e6]"
              style={{
                filter: "drop-shadow(0 0 12px rgba(168,136,200,0.4))",
              }}
            >
              <Icon className={bit.size} />
            </span>
          </motion.div>
        );
      })}

      <svg
        className={cn(
          "absolute opacity-25",
          side === "left"
            ? "left-[6%] top-[22%]"
            : "right-[6%] top-[24%] -scale-x-100",
        )}
        width="140"
        height="220"
        viewBox="0 0 140 220"
        fill="none"
      >
        <motion.path
          d="M10 10 C 60 60, 30 130, 110 200"
          stroke={`url(#contactGradient-${side})`}
          strokeWidth="1.4"
          strokeDasharray="4 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id={`contactGradient-${side}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5c2e9d" />
            <stop offset="50%" stopColor="#7c499d" />
            <stop offset="100%" stopColor="#a888c8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/",
    path: "M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.766l4.713 6.231 5.51-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163Zm0 1.802c-3.142 0-3.51.012-4.748.068-1.176.054-1.974.297-2.526.825-.552.528-.795 1.326-.849 2.502-.056 1.238-.068 1.606-.068 4.748s.012 3.51.068 4.748c.054 1.176.297 1.974.825 2.526.528.552 1.326.795 2.502.849 1.238.056 1.606.068 4.748.068s3.51-.012 4.748-.068c1.176-.054 1.974-.297 2.526-.825.552-.528.795-1.326.849-2.502.056-1.238.068-1.606.068-4.748s-.012-3.51-.068-4.748c-.054-1.176-.297-1.974-.825-2.526-.528-.552-1.326-.795-2.502-.849C15.51 3.977 15.142 3.965 12 3.965Zm0 3.062a4.973 4.973 0 1 1 0 9.946 4.973 4.973 0 0 1 0-9.946Zm0 1.802a3.171 3.171 0 1 0 0 6.342 3.171 3.171 0 0 0 0-6.342Zm5.146-2.97a1.16 1.16 0 1 1 0 2.322 1.16 1.16 0 0 1 0-2.322Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.064 2.063 2.063 0 1 1 2.063 2.064Zm1.78 13.019H3.555V9h3.562v11.452ZM22.225 0H1.771C.792 0 0 .775 0 1.729v20.541C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .775 23.2 0 22.222 0h.003Z",
  },
] as const;

const contactItems = [
  {
    icon: MapPin,
    label: "Location",
    value: "116 Village Blvd, Suite 220",
    sub: "Princeton, NJ 08540",
    href: "https://maps.google.com/?q=116+Village+Blvd+Princeton+NJ",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@zoomx.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@zoomx.com",
  },
  {
    icon: Phone,
    label: "Mobile",
    value: "+1 (609) 555-0142",
    sub: "Mon — Fri, 9am to 6pm EST",
    href: "tel:+16095550142",
  },
] as const;

function ContactCard() {
  return (
    <motion.div
      variants={fieldVariants}
      className="relative h-full overflow-hidden rounded-lg border border-white/10 bg-[#0a0f1f]/60 p-6 backdrop-blur-sm md:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-60 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,73,157,0.5), rgba(168,136,200,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full opacity-50 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(92,46,157,0.5), rgba(168,136,200,0) 70%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        <p className="font-syne text-[12px] font-semibold uppercase tracking-[0.12em] text-[#a888c8]">
          Contact Info
        </p>
        <h3 className="mt-3 font-syne text-[22px] font-semibold leading-tight text-white md:text-[24px]">
          Reach out anytime
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-[#ffffff99]">
          Prefer email or a quick call? Pick whatever feels easiest — we&apos;re happy
          to chat.
        </p>

        <ul className="mt-8 flex flex-col gap-5">
          {contactItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.15 + idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group/item flex items-start gap-4"
                >
                  <span
                    className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#c9b3e6] transition-all duration-300 group-hover/item:border-[#a888c8]/50 group-hover/item:text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(92,46,157,0.18), rgba(124,73,157,0.08))",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium text-white transition-colors group-hover/item:text-[#c9b3e6]">
                      {item.value}
                    </p>
                    <p className="mt-1 truncate text-[12px] text-[#ffffff66]">
                      {item.sub}
                    </p>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-auto pt-8">
          <div className="h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />

          <div className="mt-6 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            </span>
            <p className="text-[12px] font-medium text-[#ffffffcc]">
              Available now — typically replies in under an hour
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="font-syne text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ffffff80]">
              Follow Us
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-white shadow-[0_8px_32px_-4px_rgba(168,136,200,0.55)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-4px_rgba(168,136,200,0.75)] before:absolute before:inset-px before:rounded-[9px] before:bg-[#272727] before:content-['']"
                  style={{
                    background:
                      "linear-gradient(45deg, #5c2e9d, #7c499d, #a888c8)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative z-10 h-4 w-4"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: FieldKey) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldKey | undefined;
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      console.warn("Contact form validation failed:", fieldErrors);
      return;
    }

    setErrors({});
    console.log("Contact form submitted:", result.data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2600);
    setValues({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#020611] pt-16 pb-20 md:pt-20 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,73,157,0.18) 0%, rgba(2,6,17,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(92,46,157,0.55), rgba(168,136,200,0) 70%)",
        }}
      />

      <FloatingContactDecor side="left" />
      <FloatingContactDecor side="right" />

      <div
        ref={ref}
        className="relative z-10 app-container"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="section-heading mb-12 text-center"
        >
          <p className="font-syne text-[14px] font-semibold uppercase tracking-[0.12em] text-[#a888c8]">
            Get In Touch
          </p>
          <h2 className="mt-4 font-syne text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.15] tracking-tight">
            <span className="text-gradient-brand">Let&apos;s Start</span>{" "}
            <span className="text-white">a Conversation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#ffffffb3]">
            Have a project in mind or just want to say hello? Drop us a line and we&apos;ll
            get back within 24 hours.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid gap-6 lg:grid-cols-5 lg:gap-8"
        >
          <div className="lg:col-span-2">
            <ContactCard />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex h-full flex-col lg:col-span-3"
          >
            <div className="flex flex-col gap-5">
              <AnimatedField
                id="name"
                label="Your Name"
                placeholder="John Doe"
                icon={<User className="h-4 w-4" />}
                value={values.name}
                onChange={setField("name")}
                error={errors.name}
                required
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <AnimatedField
                  id="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  type="email"
                  icon={<Mail className="h-4 w-4" />}
                  value={values.email}
                  onChange={setField("email")}
                  error={errors.email}
                />
                <AnimatedField
                  id="phone"
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  icon={<Phone className="h-4 w-4" />}
                  value={values.phone}
                  onChange={setField("phone")}
                  error={errors.phone}
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <AnimatedField
                id="subject"
                label="Subject"
                placeholder="How can we help?"
                icon={<Tag className="h-4 w-4" />}
                value={values.subject}
                onChange={setField("subject")}
                error={errors.subject}
              />
            </div>

            <div className="mt-5">
              <AnimatedField
                id="message"
                label="Your Message"
                placeholder="Tell us about your project, goals, timeline..."
                icon={<MessageSquare className="h-4 w-4" />}
                value={values.message}
                onChange={setField("message")}
                error={errors.message}
                multiline
                required
              />
            </div>

            <motion.div
              variants={fieldVariants}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
            >
              <p className="text-[13px] text-[#ffffff80]">
                We&apos;ll never share your information.
              </p>
              <Button type="submit" variant="brand" size="cta">
                {submitted ? "Message Sent" : "Send Message"}
                <Send />
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
