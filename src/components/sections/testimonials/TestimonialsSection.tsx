import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useGSAP } from "@gsap/react";

import {
  Container,
  Eyebrow,
  SectionHeading,
} from "@/src/components/ui";

import { HOME_TESTIMONIALS } from "@/src/data/home-testimonials";

import { cn } from "@/src/lib/utils";

import { gsap, motionTokens, prefersReducedMotion } from "@/src/lib/motion";

gsap.registerPlugin(useGSAP);

const TESTIMONIAL_TRANSITION = {
  exit: { duration: 0.55, y: -18 },

  enter: { duration: 0.95, y: 24 },
} as const;

/** Time each testimonial stays visible before auto-advance */
const AUTO_ADVANCE_MS = 2000;

/** Minimum horizontal travel (px) to count as a swipe */
const SWIPE_THRESHOLD_PX = 50;

function clientInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const quoteContentRef = useRef<HTMLDivElement>(null);

  const swipeStartRef = useRef<{
    x: number;
    y: number;
    pointerId: number;
  } | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const isAnimatingRef = useRef(false);

  const total = HOME_TESTIMONIALS.length;

  const active = HOME_TESTIMONIALS[activeIndex];

  const runEnter = useCallback((onDone?: () => void) => {
    const content = quoteContentRef.current;

    if (!content) return;

    gsap.fromTo(
      content,

      { opacity: 0, y: TESTIMONIAL_TRANSITION.enter.y },

      {
        opacity: 1,

        y: 0,

        duration: TESTIMONIAL_TRANSITION.enter.duration,

        ease: motionTokens.ease.cinematic,

        overwrite: "auto",

        onComplete: onDone,
      },
    );
  }, []);

  const advanceTo = useCallback(
    (index: number) => {
      const nextIndex = ((index % total) + total) % total;

      if (nextIndex === activeIndex || isAnimatingRef.current) return;

      const content = quoteContentRef.current;

      if (!content || prefersReducedMotion()) {
        setActiveIndex(nextIndex);

        return;
      }

      isAnimatingRef.current = true;

      gsap.to(content, {
        opacity: 0,

        y: TESTIMONIAL_TRANSITION.exit.y,

        duration: TESTIMONIAL_TRANSITION.exit.duration,

        ease: "power2.inOut",

        overwrite: "auto",

        onComplete: () => {
          setActiveIndex(nextIndex);

          requestAnimationFrame(() => {
            runEnter(() => {
              isAnimatingRef.current = false;
            });
          });
        },
      });
    },

    [activeIndex, runEnter, total],
  );

  const goTo = (index: number) => {
    advanceTo(index);
  };

  const onSwipePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      pointerId: event.pointerId,
    };
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      setIsPaused(true);
    }
  };

  const endSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    swipeStartRef.current = null;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (absX >= SWIPE_THRESHOLD_PX && absX > absY) {
      if (deltaX < 0) {
        goTo(activeIndex + 1);
      } else {
        goTo(activeIndex - 1);
      }
    }

    if (event.pointerType === "touch" || event.pointerType === "pen") {
      setIsPaused(false);
    }
  };

  const onSwipePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;
    swipeStartRef.current = null;
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      setIsPaused(false);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion() || isPaused || total <= 1) return;

    const timer = window.setInterval(() => {
      advanceTo(activeIndex + 1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [activeIndex, advanceTo, isPaused, total]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      const applyLightSection = (isLight: boolean) => {
        section.classList.toggle("light-section", isLight);
        section.style.borderColor = isLight
          ? "rgba(0, 0, 0, 0.1)"
          : "rgba(255, 255, 255, 0.1)";
      };

      const applyStaticLight = () => {
        applyLightSection(true);
        gsap.set(section, { backgroundColor: "#ffffff" });
      };

      if (prefersReducedMotion()) {
        applyStaticLight();
        return;
      }

      const mm = gsap.matchMedia();

      // Mobile: static final light look — no scroll-scrubbed bg
      mm.add("(max-width: 767px)", () => {
        applyStaticLight();
      });

      // Desktop / tablet+: scrub background only — text stays black via CSS
      mm.add("(min-width: 768px)", () => {
        gsap.set(section, { backgroundColor: "#000000" });

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => applyLightSection(self.progress >= 0.85),
            onLeave: () => applyLightSection(true),
            onEnterBack: (self) => applyLightSection(self.progress >= 0.85),
          },
        }).to(section, { backgroundColor: "#ffffff", ease: "none" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      runEnter();
    },

    { scope: quoteContentRef, dependencies: [runEnter] },
  );

  return (
    <section
      ref={sectionRef}
      data-testimonials-section
      className="relative w-full border-y border-white/10 py-16 md:py-24 overflow-hidden group"
      aria-labelledby="client-perspectives-heading"
    >
      <Container>
        <div
          ref={contentRef}
          className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:items-center lg:gap-10 xl:max-w-[70.4rem]"
        >
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Eyebrow
              className="text-white/55 group-[.light-section]:text-black/55 [&_span:last-child]:text-white/55 group-[.light-section]:[&_span:last-child]:text-black/55 [&_span:first-child]:bg-white/30 group-[.light-section]:[&_span:first-child]:bg-black/30"
            >
              Client Perspectives
            </Eyebrow>

            <SectionHeading
              id="client-perspectives-heading"
              className="max-w-[12ch] text-[clamp(1.35rem,1rem+1.2vw,2rem)] text-white group-[.light-section]:text-black"
            >
              Trusted for the long term.
            </SectionHeading>

            <p className="oc-text-smooth max-w-sm text-balance text-sm font-light leading-relaxed text-white/70 md:text-base group-[.light-section]:text-black/70">
              Capital stewardship is ultimately about confidence — in the
              decisions, the discipline, and the people guiding them.
            </p>
          </div>

          <div
            className="min-w-0 lg:col-span-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setIsPaused(false);
              }
            }}
          >
            <div
              className="oc-card-hover-glow flex min-h-[20rem] touch-pan-y select-none flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-black p-5 transition-colors duration-500 hover:border-white/20 sm:min-h-[18rem] sm:p-6 md:min-h-[17rem] md:p-7"
              aria-live="polite"
              aria-atomic="true"
              onPointerDown={onSwipePointerDown}
              onPointerUp={endSwipe}
              onPointerCancel={onSwipePointerCancel}
            >
              <div
                ref={quoteContentRef}
                className="reveal-ready flex flex-1 flex-col justify-between gap-5"
              >
                <blockquote className="grid min-w-0">
                  {HOME_TESTIMONIALS.map((item) => (
                    <p
                      key={item.id}
                      className={cn(
                        "col-start-1 row-start-1 text-balance text-base font-light leading-snug tracking-tight text-white md:text-lg lg:text-xl",
                        item.id === active.id ? "visible" : "invisible",
                      )}
                    >
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  ))}
                </blockquote>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-2.5">
                    {active.avatarSrc ? (
                      <img
                        src={active.avatarSrc}
                        alt=""
                        width={32}
                        height={32}
                        loading="lazy"
                        decoding="async"
                        className="h-8 w-8 shrink-0 rounded-full border border-white/15 object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 font-mono text-xs font-medium text-white"
                      >
                        {clientInitials(active.client)}
                      </span>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {active.client}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-text-muted">
                        {active.role}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex shrink-0 items-center justify-end gap-2"
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      aria-label="Previous testimonial"
                      onClick={() => goTo(activeIndex - 1)}
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                    </button>

                    <button
                      type="button"
                      aria-label="Next testimonial"
                      onClick={() => goTo(activeIndex + 1)}
                      className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
