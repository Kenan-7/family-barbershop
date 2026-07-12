"use client";

import { reviewItems } from "@/content/reviews";
import { GoogleLogo } from "@/components/reviews/reviews-shared";

const marqueeSnippets = [
  { quote: "Best fade in Roswell.", name: "Matthew G." },
  { quote: "My son loved it.", name: "Alyssa M." },
  { quote: "Highly recommend.", name: "Will L." },
  { quote: "Consistent quality every time.", name: "Andrew H." },
  { quote: "Patient and professional.", name: "Mack W." },
  { quote: "Premium hot towel experience.", name: "Judah D." },
  ...reviewItems.map((r) => ({ quote: r.shortQuote, name: r.name.split(" ")[0] + "." })),
];

function MarqueeSnippet({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="reviews-marquee-snippet mx-5 flex shrink-0 items-center gap-4 sm:mx-6">
      <span className="reviews-stars-shimmer text-sm tracking-[0.1em] text-brand" aria-hidden="true">
        ★★★★★
      </span>
      <p className="whitespace-nowrap text-sm text-white/72">
        &ldquo;{quote}&rdquo;
        <span className="ml-2 text-white/35">— {name}</span>
      </p>
      <GoogleLogo className="h-4 w-4 shrink-0 opacity-70" />
    </div>
  );
}

export function ReviewsMarquee() {
  const items = [...marqueeSnippets, ...marqueeSnippets];

  return (
    <section
      className="reviews-marquee-section relative overflow-hidden bg-[#060606] py-8 sm:py-10"
      aria-label="Customer review highlights"
    >
      <div className="reviews-marquee-fade-left pointer-events-none absolute inset-y-0 left-0 z-[2] w-12 sm:w-20" aria-hidden="true" />
      <div className="reviews-marquee-fade-right pointer-events-none absolute inset-y-0 right-0 z-[2] w-12 sm:w-20" aria-hidden="true" />

      <div className="reviews-marquee">
        <div className="reviews-marquee-track reviews-marquee-track--snippets flex w-max items-center">
          {items.map((item, index) => (
            <MarqueeSnippet key={`${item.quote}-${index}`} quote={item.quote} name={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
