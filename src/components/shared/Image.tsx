import NextImage from "next/image";

import { cn } from "@/lib/utils";

type ImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

export function Image({
  src,
  alt,
  sizes,
  className,
  width,
  height,
  priority,
  loading,
}: ImageProps) {
  if (width && height) {
    return (
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={loading}
        className={className}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "100vw"}
      priority={priority}
      loading={loading}
      className={cn("object-cover", className)}
    />
  );
}
