"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

type HeroShowcaseProps = {
  images: ReadonlyArray<{
    src: string;
    alt: string;
  }>;
  hoursText: string;
  addressLine1: string;
  addressLine2: string;
  mapsUrl: string;
};

export function HeroShowcase({
  images,
  hoursText,
  addressLine1,
  addressLine2,
  mapsUrl,
}: HeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <Card className="animate-float-gentle overflow-hidden lg:scale-[1.03]">
      <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className={cn(
              "absolute inset-0 object-cover transition duration-700",
              index === activeIndex ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 sm:p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.20em] text-white/80">
            Inside the shop
          </div>
          <div className="mt-2 flex items-center gap-2">
            {images.map((image, index) => (
              <button
                key={`${image.src}-dot`}
                type="button"
                aria-label={`Show photo ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === activeIndex ? "w-7 bg-brand" : "w-2 bg-white/55 hover:bg-white/85",
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white">Today’s hours</div>
          <div className="text-sm text-white/70">{hoursText}</div>
        </div>
        <div className="text-sm text-white/70">
          <span className="font-medium text-white/90">Location:</span> {addressLine1}, {addressLine2}
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            className="text-sm font-semibold text-brand hover:text-brand/90"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Directions
          </a>
          <span className="text-white/30">•</span>
          <Link className="text-sm font-semibold text-white/80 hover:text-white" href="/services">
            View services
          </Link>
          <span className="text-white/30">•</span>
          <Link className="text-sm font-semibold text-white/80 hover:text-white" href="/reviews">
            See reviews
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
