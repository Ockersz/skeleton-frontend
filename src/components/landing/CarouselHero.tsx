// src/components/landing/CarouselHero.tsx
import React from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

type Slide = {
  title: string;
  subtitle: string;
  cta?: { label: string; href: string; external?: boolean };
  imageUrl?: string | null;
};

type CarouselHeroProps = {
  slides: Slide[];
  intervalMs?: number;
};

export default function CarouselHero({
  slides,
  intervalMs = 5000,
}: CarouselHeroProps) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const max = slides.length;

  const go = React.useCallback(
    (dir: number) => setIndex((prev) => (prev + dir + max) % max),
    [max],
  );

  // pause when tab not visible
  React.useEffect(() => {
    const vis = () => setPaused(document.hidden);

    document.addEventListener("visibilitychange", vis);

    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  // autoplay (respects pause & reduced motion)
  React.useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (paused || reduced) return;
    const id = window.setInterval(() => go(1), intervalMs);

    return () => window.clearInterval(id);
  }, [go, intervalMs, paused]);

  // keyboard arrows
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // touch swipe (mobile)
  const touchStartX = React.useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;

    if (dx > threshold) go(-1);
    else if (dx < -threshold) go(1);
    touchStartX.current = null;
  };

  // Active slide background for mobile (single-column)
  const activeBg =
    slides[index]?.imageUrl ??
    "linear-gradient(135deg, hsl(var(--nextui-primary)/0.25), transparent)";

  return (
    <div
      aria-label="Hero content"
      aria-roledescription="carousel"
      className={[
        "relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl",
        "border border-default-200 dark:border-default-100/30",
        "shadow-medium",
        "focus-within:[&]:ring-1 focus-within:[&]:ring-primary/40",
      ].join(" ")}
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge fades so bounds are visible on dark backgrounds */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent opacity-70" />

      {/* HEIGHT wrapper (shared) */}
      <div
        className={[
          "relative w-full",
          "h-[70svh] sm:h-[72svh] md:h-[64vh] lg:h-[66vh]",
          "landscape:h-[80svh] md:landscape:h-[70vh]",
        ].join(" ")}
      >
        {/* MOBILE: single column (no side sections) */}
        <div
          aria-live="polite"
          className="block md:hidden h-full"
          role="group"
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
        >
          {slides.map((s, i) => {
            const active = i === index;

            return (
              <div
                key={i}
                aria-hidden={!active}
                aria-label={`${i + 1} of ${max}`}
                className={[
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  active
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none",
                ].join(" ")}
                role="tabpanel"
              >
                <div
                  className="relative h-full"
                  style={{
                    background: s.imageUrl
                      ? `url('${s.imageUrl}') center / cover no-repeat`
                      : (activeBg as string),
                  }}
                >
                  <div className="absolute inset-0 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/45" />
                  <div className="relative h-full px-4 py-8 flex items-center justify-center">
                    <div className="max-w-xl text-center">
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        {s.title}
                      </h2>
                      <p className="mt-3 text-default-600 text-sm sm:text-base">
                        {s.subtitle}
                      </p>
                      {s.cta && (
                        <div className="mt-5 sm:mt-6">
                          <Button
                            as={Link}
                            color="primary"
                            href={s.cta.href}
                            isExternal={s.cta.external}
                            radius="full"
                            size="md"
                            variant="shadow"
                          >
                            {s.cta.label}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile control bar — off the content, respects safe areas */}
          <div className="absolute bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-[calc(0.75rem+env(safe-area-inset-left))] right-[calc(0.75rem+env(safe-area-inset-right))] flex items-center justify-between rounded-xl bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-default-200 dark:border-default-100/30 px-3 py-2 shadow-small">
            <button
              aria-label="Previous"
              className="px-3 py-1.5 rounded-lg hover:bg-default-100 text-sm"
              onClick={() => go(-1)}
            >
              Prev
            </button>
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => {
                const active = i === index;

                return (
                  <span
                    key={i}
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      active ? "bg-primary" : "bg-default-400",
                    ].join(" ")}
                  />
                );
              })}
            </div>
            <button
              aria-label="Next"
              className="px-3 py-1.5 rounded-lg hover:bg-default-100 text-sm"
              onClick={() => go(1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* DESKTOP: true three-column layout (gutters + content) */}
        <div className="hidden md:grid grid-cols-[96px_1fr_96px] h-full">
          {/* LEFT section (arrow) */}
          <aside
            aria-hidden
            className="h-full w-full flex items-center justify-center"
          >
            <button
              aria-label="Previous slide"
              className="grid place-items-center
                         h-12 w-12 lg:h-14 lg:w-14 rounded-full
                         bg-primary/95 hover:bg-primary text-white
                         border border-primary/60 shadow-xl shadow-primary/30
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary/50"
              onClick={() => go(-1)}
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="28"
                viewBox="0 0 24 24"
                width="28"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.25"
                />
              </svg>
            </button>
          </aside>

          {/* CENTER section (the whole slide content) */}
          <main
            aria-live="polite"
            className="relative h-full"
            role="group"
            onTouchEnd={onTouchEnd}
            onTouchStart={onTouchStart}
          >
            {slides.map((s, i) => {
              const active = i === index;

              return (
                <div
                  key={i}
                  aria-hidden={!active}
                  aria-label={`${i + 1} of ${max}`}
                  className={[
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    active
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none",
                  ].join(" ")}
                  role="tabpanel"
                >
                  {/* two-column split inside center area */}
                  <div className="grid grid-cols-2 w-full h-full">
                    <div className="relative">
                      {s.imageUrl ? (
                        <img
                          alt={s.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          src={s.imageUrl}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent" />
                    </div>
                    <div className="relative px-8 py-10 xl:px-12 xl:py-12 flex items-center bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
                      <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                          {s.title}
                        </h2>
                        <p className="mt-3 text-default-600 text-base md:text-lg">
                          {s.subtitle}
                        </p>
                        {s.cta && (
                          <div className="mt-6">
                            <Button
                              as={Link}
                              color="primary"
                              href={s.cta.href}
                              isExternal={s.cta.external}
                              radius="full"
                              size="md"
                              variant="shadow"
                            >
                              {s.cta.label}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Dots only for desktop, anchored inside center so they don't block gutters */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center px-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-default-200 dark:border-default-100/30">
                {slides.map((_, i) => {
                  const active = i === index;

                  return (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      className={[
                        "h-2.5 rounded-full transition-all",
                        active
                          ? "w-6 bg-primary"
                          : "w-2.5 bg-default-400 hover:bg-default-500",
                      ].join(" ")}
                      onClick={() => setIndex(i)}
                    />
                  );
                })}
              </div>
            </div>
          </main>

          {/* RIGHT section (arrow) */}
          <aside
            aria-hidden
            className="h-full w-full flex items-center justify-center"
          >
            <button
              aria-label="Next slide"
              className="grid place-items-center
                         h-12 w-12 lg:h-14 lg:w-14 rounded-full
                         bg-primary/95 hover:bg-primary text-white
                         border border-primary/60 shadow-xl shadow-primary/30
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary/50"
              onClick={() => go(1)}
            >
              <svg
                aria-hidden="true"
                fill="none"
                height="28"
                viewBox="0 0 24 24"
                width="28"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.25"
                />
              </svg>
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
