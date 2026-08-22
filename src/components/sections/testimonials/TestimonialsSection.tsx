import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { Container, Eyebrow, SectionHeading, BodyText } from '@/src/components/ui';
import { HOME_TESTIMONIALS } from '@/src/data/home-testimonials';
import { cn } from '@/src/lib/utils';
import { gsap, motionTokens, prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

const TESTIMONIAL_TRANSITION = {
  exit: { duration: 0.55, y: -18 },
  enter: { duration: 0.95, y: 24 },
} as const;

/** Read time + exit/enter — keeps autoplay from feeling rushed */
const AUTO_ADVANCE_MS = 5200;

const TONE_VARS = {
  dark: {
    '--testimonial-control-border': 'rgba(255, 255, 255, 0.15)',
    '--testimonial-control-text': 'rgba(255, 255, 255, 0.5)',
    '--testimonial-control-hover-border': 'rgba(255, 255, 255, 0.4)',
    '--testimonial-control-hover-text': 'rgba(255, 255, 255, 1)',
    '--testimonial-active-bg': '#ffffff',
    '--testimonial-active-text': '#000000',
    '--testimonial-active-border': '#ffffff',
  },
  light: {
    '--testimonial-control-border': 'rgba(0, 0, 0, 0.15)',
    '--testimonial-control-text': 'rgba(0, 0, 0, 0.5)',
    '--testimonial-control-hover-border': 'rgba(0, 0, 0, 0.4)',
    '--testimonial-control-hover-text': 'rgba(0, 0, 0, 1)',
    '--testimonial-active-bg': '#000000',
    '--testimonial-active-text': '#ffffff',
    '--testimonial-active-border': '#000000',
  },
} as const;

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteContentRef = useRef<HTMLDivElement>(null);
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
        overwrite: 'auto',
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
        ease: 'power2.inOut',
        overwrite: 'auto',
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

      const primaryText = content.querySelectorAll<HTMLElement>('[data-tone="primary"]');
      const mutedText = content.querySelectorAll<HTMLElement>('[data-tone="muted"]');

      const applyLightSection = (isLight: boolean) => {
        section.classList.toggle('light-section', isLight);
        section.style.borderColor = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
      };

      if (prefersReducedMotion()) {
        applyLightSection(true);
        gsap.set(section, { backgroundColor: '#ffffff', ...TONE_VARS.light });
        gsap.set(primaryText, { color: '#000000' });
        gsap.set(mutedText, { color: 'rgba(0, 0, 0, 0.55)' });
        return;
      }

      gsap.set(section, { backgroundColor: '#000000', ...TONE_VARS.dark });
      gsap.set(primaryText, { color: '#ffffff' });
      gsap.set(mutedText, { color: 'rgba(255, 255, 255, 0.55)' });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) => applyLightSection(self.progress >= 0.85),
            onLeave: () => applyLightSection(true),
            onEnterBack: (self) => applyLightSection(self.progress >= 0.85),
          },
        })
        .to(section, { backgroundColor: '#ffffff', ease: 'none', ...TONE_VARS.light }, 0)
        .to(primaryText, { color: '#000000', ease: 'none' }, 0)
        .to(mutedText, { color: 'rgba(0, 0, 0, 0.55)', ease: 'none' }, 0);
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
      className="relative w-full border-y border-white/10 py-16 overflow-hidden"
      aria-labelledby="client-perspectives-heading"
    >
      <Container>
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start lg:items-center"
        >
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Eyebrow
              data-tone="muted"
              className="text-inherit [&_span:last-child]:text-inherit [&_span:first-child]:bg-current/30"
            >
              Client Perspectives
            </Eyebrow>
            <SectionHeading id="client-perspectives-heading" data-tone="primary">
              Trusted for the long term.
            </SectionHeading>
            <BodyText data-tone="muted" className="text-base md:text-lg max-w-md !text-inherit">
              Wealth management is ultimately about confidence — in the decisions, the discipline,
              and the people guiding them.
            </BodyText>
          </div>

          <div
            className="lg:col-span-8 flex flex-col gap-8 min-w-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsPaused(false);
              }
            }}
          >
            <div
              className="bg-black border border-white/10 rounded-3xl oc-card-hover-glow p-8 md:p-10 lg:p-12 flex flex-col justify-center gap-8 transition-colors duration-500 hover:border-white/20"
              aria-live="polite"
              aria-atomic="true"
            >
              <div ref={quoteContentRef} className="reveal-ready flex flex-col gap-8">
                <blockquote className="min-w-0">
                  <p className="text-xl md:text-2xl lg:text-[1.75rem] leading-snug tracking-tight text-white font-light text-balance">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-widest font-mono text-white/40 mb-2">
                      Client Perspective
                    </p>
                    <p className="text-lg font-medium text-white">{active.client}</p>
                    <p className="text-sm text-text-muted mt-1">{active.role}</p>
                  </div>
                  <p className="font-mono text-sm text-white/35 tabular-nums">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {HOME_TESTIMONIALS.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`View testimonial ${index + 1}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    onClick={() => goTo(index)}
                    className={cn(
                      'min-h-11 min-w-11 rounded-full border text-xs font-mono transition-colors duration-500',
                      index === activeIndex
                        ? 'bg-[var(--testimonial-active-bg)] text-[var(--testimonial-active-text)] border-[color:var(--testimonial-active-border)]'
                        : 'border-[color:var(--testimonial-control-border)] text-[color:var(--testimonial-control-text)] hover:border-[color:var(--testimonial-control-hover-border)] hover:text-[color:var(--testimonial-control-hover-text)]',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(activeIndex - 1)}
                  className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full border border-[color:var(--testimonial-control-border)] text-[color:var(--testimonial-control-text)] hover:border-[color:var(--testimonial-control-hover-border)] hover:text-[color:var(--testimonial-control-hover-text)] transition-colors duration-500"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => goTo(activeIndex + 1)}
                  className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full border border-[color:var(--testimonial-control-border)] text-[color:var(--testimonial-control-text)] hover:border-[color:var(--testimonial-control-hover-border)] hover:text-[color:var(--testimonial-control-hover-text)] transition-colors duration-500"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
