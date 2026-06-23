import NextImage from "next/image";

import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

export function Image({ src, alt, sizes, className }: ImageProps) {
  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "100vw"}
      className={cn("object-cover", className)}
    />
  );
}
