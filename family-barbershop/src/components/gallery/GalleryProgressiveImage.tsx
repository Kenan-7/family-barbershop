"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type GalleryProgressiveImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
};

export function GalleryProgressiveImage({
  src,
  alt,
  fill = true,
  sizes,
  priority,
  className,
  style,
  draggable,
}: GalleryProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        className={cn(
          "gallery-image-shimmer pointer-events-none absolute inset-0 bg-[#141414] transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "gallery-ken-burns-wrap absolute inset-0",
          loaded ? "opacity-100" : "opacity-0",
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          draggable={draggable}
          onLoad={() => setLoaded(true)}
          className={cn(
            "gallery-card-image object-cover contrast-[1.03] saturate-[1.02]",
            loaded && "gallery-image-loaded",
            className,
          )}
          style={style}
        />
      </div>
    </>
  );
}
