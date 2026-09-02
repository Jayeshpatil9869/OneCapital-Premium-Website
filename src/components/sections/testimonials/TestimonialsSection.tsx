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
      className="relative w-full border-y border-white/10 py-22 overflow-hidden"
      aria-labelledby="client-perspectives-heading"
    >
      <Container>
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start lg:items-center"
        >
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Eyebrow
              className="text-black/55 [&_span:last-child]:text-black/55 [&_span:first-child]:bg-black/30"
            >
              Client Perspectives
            </Eyebrow>

            <SectionHeading
              id="client-perspectives-heading"
              className="text-black"
            >
              Trusted for the long term.
            </SectionHeading>

            <p className="oc-text-smooth text-base md:text-lg max-w-md leading-relaxed font-light text-balance text-black/70">
              Capital stewardship is ultimately about confidence — in the
              decisions, the discipline, and the people guiding them.
            </p>
          </div>

          <div
            className="lg:col-span-8 min-w-0"
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
              className="bg-black border border-white/10 rounded-3xl oc-card-hover-glow p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8 min-h-[22.5rem] sm:min-h-[20rem] md:min-h-0 transition-colors duration-500 hover:border-white/20 touch-pan-y select-none"
              aria-live="polite"
              aria-atomic="true"
              onPointerDown={onSwipePointerDown}
              onPointerUp={endSwipe}
              onPointerCancel={onSwipePointerCancel}
            >
              <div
                ref={quoteContentRef}
                className="reveal-ready flex flex-col justify-between gap-8 flex-1"
              >
                <blockquote className="grid min-w-0">
                  {HOME_TESTIMONIALS.map((item) => (
                    <p
                      key={item.id}
                      className={cn(
                        "col-start-1 row-start-1 text-xl md:text-2xl lg:text-[1.75rem] leading-snug tracking-tight text-white font-light text-balance",

                        item.id === active.id ? "visible" : "invisible",
                      )}
                    >
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  ))}
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="flex items-center gap-3 min-w-0">
                    {active.avatarSrc ? (
                      <img
                        src={active.avatarSrc}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full object-cover border border-white/15"
                        decoding="async"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 font-mono text-sm font-medium text-white"
                      >
                        {clientInitials(active.client)}
                      </span>
                    )}

                    <div className="min-w-0">
                      <p className="text-lg font-medium text-white truncate">
                        {active.client}
                      </p>

                      <p className="text-sm text-text-muted mt-0.5 truncate">
                        {active.role}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-end gap-2 shrink-0"
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      aria-label="Previous testimonial"
                      onClick={() => goTo(activeIndex - 1)}
                      className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-500"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden />
                    </button>

                    <button
                      type="button"
                      aria-label="Next testimonial"
                      onClick={() => goTo(activeIndex + 1)}
                      className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full border border-white/15 text-white/50 hover:border-white/40 hover:text-white transition-colors duration-500"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden />
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
