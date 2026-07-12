"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { business } from "@/content/business";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TrustIndicatorIcon } from "@/components/home/TrustIndicatorIcon";
import { getShopStatus } from "@/lib/shopStatus";
import {
  useCoarsePointer,
  useMobilePerfFlags,
  usePrefersReducedMotion,
} from "@/lib/mobilePerformance";
import { cn } from "@/lib/cn";

const { hero } = business;

function HeroInfoCard({ className }: { className?: string }) {
  const status = useMemo(() => getShopStatus(new Date()), []);

  return (
    <aside
      className={cn("shop-status-card relative rounded-2xl p-5", className)}
      aria-label="Shop information"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          Shop Status
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em]",
            status.isOpen
              ? "border-[rgba(110,190,150,0.22)] bg-[rgba(52,120,88,0.16)] text-[#9fd4b8]"
              : "border-[rgba(180,90,100,0.28)] bg-[rgba(100,38,48,0.22)] text-[#d9a8ae]",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              status.isOpen
                ? "bg-[#6db896] shadow-[0_0_8px_rgba(109,184,150,0.45)]"
                : "bg-[#a85c68] shadow-[0_0_8px_rgba(168,92,104,0.4)]",
            )}
            aria-hidden="true"
          />
          {status.isOpen ? "Open Now" : "Closed Now"}
        </div>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-white/50">Today&apos;s Hours</dt>
          <dd className="mt-1 font-medium text-white">{status.hoursText}</dd>
        </div>
        <div>
          <dt className="text-white/50">Address</dt>
          <dd className="mt-1 leading-6 text-white/82">
            {business.addressLine1}
            <br />
            {business.addressLine2}
          </dd>
        </div>
      </dl>

      <ButtonLink
        href={business.phoneHref}
        variant="secondary"
        size="sm"
        className="home-hero-cta-glass mt-5 w-full text-white"
      >
        Call {business.phone}
      </ButtonLink>
    </aside>
  );
}

function ScrollIndicator() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({
          top: window.innerHeight * 0.92,
          behavior: "smooth",
        });
      }}
      className="home-hero-scroll-wrap animate-rise-in group absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex [animation-delay:720ms]"
      aria-label="Scroll to explore the rest of the page"
    >
      <span className="home-hero-scroll-label text-[11px] font-medium uppercase tracking-[0.28em] transition duration-300 group-hover:text-brand/80">
        Scroll to Explore
      </span>
      <span className="flex flex-col items-center gap-1.5" aria-hidden="true">
        <span className="home-hero-scroll-line h-9 w-px" />
        <span className="home-hero-scroll-chevron text-sm leading-none">↓</span>
      </span>
    </button>
  );
}

export function HomeHero() {
  const coarsePointer = useCoarsePointer();
  const reduceMotion = usePrefersReducedMotion();
  const perfFlags = useMobilePerfFlags();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStageRef = useRef<HTMLDivElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [inViewport, setInViewport] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  const preferPoster =
    coarsePointer || reduceMotion || perfFlags.disableHeroVideo || perfFlags.disableDecorativeMotion;

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  const useVideo = !preferPoster && !videoFailed;
  const showPlaceholder = useVideo && !isVideoReady;
  const showVideo = useVideo && isVideoReady;
  const showFallback = preferPoster || videoFailed;
  const mediaMotionClass = showVideo && !coarsePointer ? "home-hero-media-drift" : "";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useVideo) return;

    if (!inViewport || !pageVisible) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        /* Autoplay blocked — poster layer remains visible. */
      });
    }
  }, [inViewport, pageVisible, useVideo, isVideoReady]);

  useEffect(() => {
    const stage = mediaStageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setPageVisible(document.visibilityState === "visible");
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const bookingHref = business.links.bookingUrl || "/contact";
  const bookingTarget = business.links.bookingUrl ? "_blank" : undefined;

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative z-10 min-h-[100dvh] overflow-x-hidden border-b border-white/10"
    >
      <div
        ref={mediaStageRef}
        className="home-hero-media-stage absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className={cn(
            "home-hero-placeholder absolute inset-0",
            showPlaceholder || showFallback ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />

        {useVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.posterSrc}
            aria-hidden="true"
            onCanPlay={handleVideoReady}
            onLoadedData={handleVideoReady}
            onError={handleVideoError}
            className={cn(
              "home-hero-media home-hero-media-fade absolute inset-0 h-full w-full object-cover object-center",
              mediaMotionClass,
              showVideo ? "opacity-100" : "opacity-0",
            )}
          >
            <source src={hero.videoSrc} type="video/mp4" />
          </video>
        ) : null}

        {showFallback ? (
          <Image
            src={hero.posterSrc}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 100vw"
            className={cn(
              "home-hero-media home-hero-media-fade object-cover object-center",
              mediaMotionClass,
              "opacity-100",
            )}
          />
        ) : null}
      </div>

      <div aria-hidden="true" className="home-hero-scrim absolute inset-0" />
      <div aria-hidden="true" className="home-hero-vignette absolute inset-0" />
      <div aria-hidden="true" className="home-hero-text-scrim absolute inset-0" />

      <Container className="relative flex min-h-[100dvh] flex-col justify-end pb-12 pt-[5.5rem] sm:pb-16 sm:pt-24 lg:justify-center lg:pb-20 lg:pt-[6.75rem]">
        <div className="relative w-full max-w-3xl -translate-y-6 sm:-translate-y-8 lg:max-w-[44rem] lg:-translate-y-14 lg:pl-10 xl:-translate-y-16 xl:pl-16">
          <div
            aria-hidden="true"
            className="home-hero-headline-glow pointer-events-none absolute -left-8 top-0 h-72 w-[min(100%,34rem)] lg:-left-4 lg:top-[-1rem] lg:h-96 lg:w-[42rem] xl:left-0"
          />

          <p className="animate-rise-in relative text-[11px] font-semibold uppercase tracking-[0.26em] text-brand/85 sm:text-xs">
            {hero.eyebrow}
          </p>

          <div
            aria-hidden="true"
            className="home-hero-divider animate-rise-in relative mt-5 h-px w-20 [animation-delay:80ms]"
          />

          <h1
            id="home-hero-heading"
            className="home-hero-headline animate-rise-in relative mt-7 max-w-[14ch] text-[2.65rem] font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:max-w-[15ch] sm:text-5xl sm:leading-[0.95] lg:max-w-[12ch] lg:text-[4.75rem] lg:leading-[0.93] xl:text-[5.75rem] xl:leading-[0.91] [animation-delay:160ms]"
          >
            {hero.headline}
          </h1>

          <p className="home-hero-subhead animate-rise-in relative mt-7 max-w-lg text-base leading-7 text-white/80 sm:max-w-xl sm:text-lg sm:leading-[1.65] [animation-delay:260ms]">
            {hero.subheadline}
          </p>

          <ul
            className="animate-rise-in relative mt-8 flex flex-wrap items-center gap-3 [animation-delay:360ms]"
            aria-label="Customer trust indicators"
          >
            {hero.trustRow.map((item) => (
              <li key={item.label} className="flex">
                <span className="home-hero-trust-item">
                  <TrustIndicatorIcon icon={item.icon} size="sm" />
                  <span className="home-hero-trust-label">{item.label}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="animate-rise-in relative mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center [animation-delay:460ms]">
            <ButtonLink
              href={bookingHref}
              target={bookingTarget}
              variant="ghost"
              size="lg"
              className="home-hero-cta w-full border-0 bg-gradient-to-br from-[#9a6820] via-[#e8cc82] to-[#c89645] text-[15px] font-semibold text-black shadow-none hover:bg-gradient-to-br hover:from-[#a97428] hover:via-[#f0dda8] hover:to-[#d4b36a] sm:min-w-[13rem] sm:w-auto"
            >
              {hero.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={business.phoneHref}
              variant="ghost"
              size="lg"
              className="home-hero-cta-glass w-full text-white sm:w-auto"
            >
              {hero.secondaryCtaLabel}
            </ButtonLink>
            <ButtonLink
              href={business.mapsUrl}
              target="_blank"
              variant="ghost"
              size="lg"
              className="home-hero-cta-outline w-full text-white sm:w-auto"
            >
              {hero.directionsCtaLabel}
            </ButtonLink>
          </div>

          <HeroInfoCard className="animate-rise-in relative mt-6 lg:hidden [animation-delay:560ms]" />

          <HeroInfoCard
            className="animate-rise-in pointer-events-auto absolute z-20 hidden w-[min(100%,19rem)] lg:block lg:left-full lg:ml-6 lg:top-[calc(100%-11rem)] xl:ml-10 xl:top-[calc(100%-11.5rem)] [animation-delay:560ms]"
          />
        </div>
      </Container>

      <ScrollIndicator />
    </section>
  );
}
