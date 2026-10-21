import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/src/components/ui/primitives/Layout";
import {
  Eyebrow,
  DisplayHeading,
  BodyText,
  Label,
} from "@/src/components/ui/typography/Typography";
import { GlowOrb } from "@/src/components/effects/Atmosphere";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { cn } from "@/src/lib/utils";
import {
  gsap,
  motionTokens,
  prefersReducedMotion,
  whenPreloaderDone,
} from "@/src/lib/motion";

gsap.registerPlugin(useGSAP);

export type HeroMetric = {
  label: string;
  value: string;
  suffix?: string;
};

type HeroEditorialProps = {
  variant?: "editorial" | "cinematic";
  eyebrow?: string;
  title: ReactNode;
  titleClassName?: string;
  description?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  backgroundImage?: string;
  metrics?: HeroMetric[];
  className?: string;
};

export type HeroMetricCard = {
  value: number;
  suffix?: string;
  label: string;
};

const DEFAULT_METRIC_CARDS: HeroMetricCard[] = [
  {
    value: 3000,
    suffix: '+',
    label: 'Clients Serviced',
  },
  {
    value: 8,
    suffix: '+',
    label: 'Services & Products',
  },
  {
    value: 33,
    suffix: '+',
    label: 'Years Serving',
  },
];

export function HeroMetricsMatrix({
  cards = DEFAULT_METRIC_CARDS,
}: {
  cards?: HeroMetricCard[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const numberEls =
        containerRef.current.querySelectorAll<HTMLElement>('[data-count]');

      numberEls.forEach((el) => {
        const target = Number(el.dataset.count);
        el.textContent = prefersReducedMotion()
          ? target.toLocaleString('en-IN')
          : '0';
      });

      if (prefersReducedMotion()) return;

      return whenPreloaderDone(() => {
        numberEls.forEach((el, index) => {
          const target = Number(el.dataset.count);
          if (Number.isNaN(target)) return;

          const state = { val: 0 };
          el.textContent = '0';

          gsap.to(state, {
            val: target,
            duration: motionTokens.duration.cinematic,
            ease: motionTokens.ease.expo,
            delay: 0.15 + index * motionTokens.stagger.normal,
            onUpdate: () => {
              el.textContent = Math.round(state.val).toLocaleString('en-IN');
            },
          });
        });
      });
    },
    { scope: containerRef, dependencies: [cards] },
  );

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 lg:gap-8 max-w-[1300px] mx-auto">
        {cards.map((card) => (
          <div
            key={card.label}
            className="group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 lg:p-9 bg-white/[0.07] backdrop-blur-xl sm:backdrop-blur-2xl border border-white/15 text-left transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.12] hover:border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.36),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden"
          >
            {/* Subtle top specular sheen reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div>
              <span className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white block leading-none">
                <span data-count={card.value}>{card.value.toLocaleString('en-IN')}</span>
                {card.suffix}
              </span>
              <p className="font-sans text-sm sm:text-base font-normal text-white/70 leading-snug mt-4 sm:mt-5 max-w-[22ch]">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroMetrics({ metrics }: { metrics: HeroMetric[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const numbers =
        gridRef.current.querySelectorAll<HTMLElement>("[data-count]");

      numbers.forEach((el) => {
        const val = Number(el.dataset.count);
        el.textContent = prefersReducedMotion()
          ? (Number.isNaN(val) ? (el.dataset.count ?? "0") : val.toLocaleString("en-IN"))
          : "0";
      });

      if (prefersReducedMotion()) {
        return whenPreloaderDone(() => {
          numbers.forEach((el) => {
            const val = Number(el.dataset.count);
            el.textContent = Number.isNaN(val) ? (el.dataset.count ?? "0") : val.toLocaleString("en-IN");
          });
        });
      }

      return whenPreloaderDone(() => {
        numbers.forEach((el, index) => {
          const target = Number(el.dataset.count);
          if (Number.isNaN(target)) return;

          const state = { val: 0 };
          el.textContent = "0";

          gsap.to(state, {
            val: target,
            duration: motionTokens.duration.cinematic,
            ease: motionTokens.ease.expo,
            delay: 0.72 + index * motionTokens.stagger.normal,
            onUpdate: () => {
              el.textContent = Math.round(state.val).toLocaleString("en-IN");
            },
          });
        });
      });
    },
    { scope: gridRef, dependencies: [metrics] },
  );

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid gap-y-8 gap-x-4 justify-items-center text-center sm:gap-8 md:gap-14 max-w-[1050px] mx-auto",
        metrics.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4",
      )}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex flex-col items-center min-w-0"
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-sans font-medium tracking-tight text-white leading-none">
            <span data-count={metric.value}>0</span>
            {metric.suffix != null && metric.suffix}
          </span>
          <span className="text-[11px] sm:text-xs lg:text-sm font-sans font-normal text-white/70 text-center max-w-[18ch] sm:max-w-[20ch] leading-snug mt-2 sm:mt-2.5">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Cinematic Hero Background: Fades in and executes a slow, luxurious cinematic zoom-in */
function CinematicHeroBackground({ imageSrc }: { imageSrc: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!imgRef.current) return;
      if (prefersReducedMotion()) {
        gsap.set(imgRef.current, { opacity: 1, scale: 1 });
        return;
      }

      // Initial state: hidden, unscaled
      gsap.set(imgRef.current, { opacity: 0, scale: 1.0 });

      return whenPreloaderDone(() => {
        // Fade in smoothly as page transition finishes
        gsap.to(imgRef.current, {
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
        });

        // Slow, elegant continuous cinematic zoom-in
        gsap.to(imgRef.current, {
          scale: 1.08,
          duration: 14,
          ease: "power1.out",
        });
      });
    },
    { scope: imgRef, dependencies: [imageSrc] },
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <img
        ref={imgRef}
        src={imageSrc}
        alt=""
        className="h-full w-full object-cover object-center will-change-transform transform-gpu"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_36%,rgba(0,0,0,0.52)_58%,rgba(0,0,0,0.88)_80%,#000000_100%)]" />
    </div>
  );
}

/** Hero — editorial (asymmetric) or cinematic (full-bleed background + stats). */
export function HeroEditorial({
  variant = "editorial",
  eyebrow,
  title,
  titleClassName,
  description,
  actions,
  visual,
  backgroundImage,
  metrics,
  className,
}: HeroEditorialProps) {
  if (variant === "cinematic") {
    return (
      <section
        className={cn(
          "relative flex min-h-[100svh] w-full flex-col justify-center items-center overflow-hidden bg-black pt-[max(6rem,env(safe-area-inset-top))] pb-10 sm:pb-12 lg:pb-14",
          className,
        )}
      >
        {backgroundImage ? (
          <CinematicHeroBackground imageSrc={backgroundImage} />
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden />
        )}

        <Container className="relative z-10 flex flex-col items-center px-6 md:px-8">
          <div className="flex w-full max-w-5xl flex-col items-center text-center">
            {eyebrow && (
              <RevealOnScroll
                trigger="load"
                direction="up"
                distance={24}
                delay={0.16}
                duration={1}
                ease="power3.out"
                className="w-full flex justify-center"
              >
                <Eyebrow
                  centered
                  className="mb-6 sm:mb-7 lg:mb-8 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/70 [&>span:first-child]:w-8 sm:[&>span:first-child]:w-10 [&>span:first-child]:bg-white/35 [&>span:last-child]:w-8 sm:[&>span:last-child]:w-10 [&>span:last-child]:bg-white/35"
                >
                  {eyebrow}
                </Eyebrow>
              </RevealOnScroll>
            )}

            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={36}
              duration={1.15}
              delay={0.32}
              ease="power3.out"
              className="w-full flex justify-center"
            >
              <DisplayHeading
                className={cn(
                  "mb-4 sm:mb-5 lg:mb-6 text-center text-white font-medium tracking-tight leading-[1.1] text-balance",
                  "text-2xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] max-w-4xl mx-auto",
                  titleClassName
                )}
              >
                {title}
              </DisplayHeading>
            </RevealOnScroll>

            {description && (
              <RevealOnScroll
                trigger="load"
                direction="up"
                distance={24}
                delay={0.5}
                duration={1}
                ease="power3.out"
                className="w-full flex justify-center"
              >
                <BodyText className="mx-auto mb-0 max-w-[38rem] text-center text-sm sm:text-base lg:text-[1.05rem] text-[#B3B3B3] leading-relaxed font-light">
                  {description}
                </BodyText>
              </RevealOnScroll>
            )}

            {actions && (
              <RevealOnScroll
                trigger="load"
                direction="up"
                distance={20}
                delay={0.6}
                duration={1.1}
                ease="power3.out"
                className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-4"
              >
                {actions}
              </RevealOnScroll>
            )}
          </div>
        </Container>

        {metrics && metrics.length > 0 && (
          <div className="relative z-10 w-full mt-10 sm:mt-13 lg:mt-16">
            <RevealOnScroll trigger="load" delay={0.65} duration={0.9}>
              <div
                className="mx-auto w-[70%] max-w-4xl border-t border-white/20 mb-7 sm:mb-8 lg:mb-9"
                aria-hidden
              />
            </RevealOnScroll>
            <RevealOnScroll trigger="load" delay={0.72} duration={1.1}>
              <Container className="px-6 md:px-8 max-w-[1000px]">
                <HeroMetrics metrics={metrics} />
              </Container>
            </RevealOnScroll>
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      className={cn(
        "w-full min-h-[min(90svh,56rem)] relative flex flex-col justify-center overflow-x-clip pt-[max(6rem,env(safe-area-inset-top))] lg:pt-32",
        className,
      )}
    >
      <GlowOrb className="hidden md:block" />
      <Container className="relative z-10 flex flex-col">
        <div className="max-w-4xl">
          {eyebrow && (
            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={24}
              duration={1}
              ease="power3.out"
            >
              <Eyebrow className="mb-8">{eyebrow}</Eyebrow>
            </RevealOnScroll>
          )}
          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={36}
            duration={1.15}
            delay={0.1}
            ease="power3.out"
          >
            <DisplayHeading className="mb-8">{title}</DisplayHeading>
          </RevealOnScroll>
          {description && (
            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={24}
              delay={0.24}
              duration={1}
              ease="power3.out"
            >
              <BodyText className="max-w-xl mb-12">{description}</BodyText>
            </RevealOnScroll>
          )}
          {actions && (
            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={20}
              delay={0.38}
              duration={0.95}
              ease="power3.out"
            >
              <div className="flex flex-wrap items-center gap-6">{actions}</div>
            </RevealOnScroll>
          )}
        </div>
        {visual && (
          <RevealOnScroll
            trigger="load"
            direction="none"
            delay={0.5}
            duration={1.35}
            ease="power3.out"
            className="mt-20 lg:mt-32 w-full"
          >
            {visual}
          </RevealOnScroll>
        )}
      </Container>
    </section>
  );
}
