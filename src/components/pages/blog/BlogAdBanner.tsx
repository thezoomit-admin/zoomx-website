import Link from "next/link";
import { Clapperboard, Film, Headphones, Mic, MonitorPlay, Scissors } from "lucide-react";
import { Image } from "@/components/shared/Image";
import { Button } from "@/components/ui/button";

type BlogAdBannerProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
  variant?: "dark" | "light"; // Keeping for compatibility, though we'll use a specific design here
};

export function BlogAdBanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
  imageSrc,
}: BlogAdBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-[#1a1b26] flex flex-col lg:flex-row items-center justify-between min-h-[220px] shadow-lg group">
      
      {/* Slanted Middle Background */}
      <div className="absolute inset-y-[-20%] left-[55%] lg:left-[45%] right-0 lg:right-[22%] bg-[#dbe1fa] -skew-x-[25deg] z-0 transition-transform duration-700 group-hover:scale-105 origin-center hidden lg:block" />
      {/* Mobile background (no skew) */}
      <div className="absolute inset-0 top-1/2 bg-[#dbe1fa] z-0 lg:hidden" />

      {/* Left Section: Text */}
      <div className="relative z-10 flex flex-col w-full lg:w-[45%] p-8 lg:p-12">
        <h3 className="font-syne text-[26px] font-bold leading-tight text-white md:text-[32px]">
          {title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-white/80 max-w-md">
          {subtitle}
        </p>
      </div>

      {/* Middle Section: Image or Icons */}
      <div className="relative z-10 flex items-center justify-center w-full lg:w-[30%] py-8 lg:py-0 pointer-events-none">
        {imageSrc ? (
          <Image src={imageSrc} alt="" sizes="300px" className="object-contain h-[160px] w-auto drop-shadow-xl" />
        ) : (
          <div className="relative w-48 h-32 flex items-center justify-center">
            {/* Custom Icon Composition mimicking the illustration */}
            <MonitorPlay className="absolute w-24 h-24 text-[#3b82f6] z-20 bg-white rounded-lg shadow-sm" />
            <Clapperboard className="absolute top-0 left-0 w-12 h-12 text-[#1e293b] -rotate-12 z-10" />
            <Headphones className="absolute top-[-10px] right-4 w-10 h-10 text-[#475569] z-10" />
            <Mic className="absolute bottom-4 right-[-10px] w-8 h-8 text-[#64748b] z-30" />
            <Film className="absolute bottom-2 left-[-10px] w-10 h-10 text-[#94a3b8] rotate-12 z-30" />
            <Scissors className="absolute right-6 bottom-[-5px] w-8 h-8 text-[#ef4444] -rotate-45 z-30" />
          </div>
        )}
      </div>

      {/* Right Section: Button */}
      <div className="relative z-10 flex w-full lg:w-[25%] justify-center lg:justify-end p-8 lg:p-12 bg-[#1a1b26] lg:bg-transparent">
        {/* Fill right side on desktop so button sits on dark */}
        <div className="absolute inset-y-[-20%] left-[-20%] right-[-50%] bg-[#1a1b26] -skew-x-[25deg] -z-10 hidden lg:block" />
        
        <Button asChild variant="brand" className="h-auto px-8 py-3.5 text-[15px] font-bold">
          <Link href={buttonHref}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
