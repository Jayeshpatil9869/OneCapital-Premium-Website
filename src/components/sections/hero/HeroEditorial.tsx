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
    value: 400,
    suffix: '+',
    label: 'Cities with customer presence',
  },
  {
    value: 1300,
    suffix: '+',
    label: 'Family offices and UHNI families',
  },
  {
    value: 1500,
    suffix: '+',
    label: 'Brokers and funds integrated',
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
            delay: 0.35 + index * motionTokens.stagger.normal,
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
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-sans font-medium tracking-tight text-white leading-none">
            <span data-count={metric.value}>0</span>
            {metric.suffix != null && metric.suffix}
          </span>
          <span className="text-xs sm:text-sm font-sans font-normal text-white/70 text-center max-w-[18ch] sm:max-w-[20ch] leading-snug mt-3">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Hero — editorial (asymmetric) or cinematic (full-bleed background + stats). */
export function HeroEditorial({
  variant = "editorial",
  eyebrow,
  title,
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
          "relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-black",
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_36%,rgba(0,0,0,0.52)_58%,rgba(0,0,0,0.88)_80%,#000000_100%)]" />
        </div>

        <Container
          className={cn(
            "relative z-10 flex flex-1 flex-col items-center justify-center px-6 md:px-8",
            metrics && metrics.length > 0
              ? "pt-[max(7rem,env(safe-area-inset-top))] pb-10 lg:pt-36"
              : "py-24 lg:py-28",
          )}
        >
          <div className="flex w-full max-w-4xl flex-col items-center text-center">
            {eyebrow && (
              <RevealOnScroll
                trigger="load"
                direction="up"
                distance={24}
                duration={1}
                ease="power3.out"
                className="w-full flex justify-center"
              >
                <Eyebrow
                  centered
                  className="mb-6 md:mb-8 text-white/60 [&>span:first-child]:bg-white/35 [&>span:last-child]:bg-white/35"
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
              delay={0.1}
              ease="power3.out"
              className="w-full flex justify-center"
            >
              <DisplayHeading className="mb-6 text-center text-white">
                {title}
              </DisplayHeading>
            </RevealOnScroll>

            {description && (
              <RevealOnScroll
                trigger="load"
                direction="up"
                distance={24}
                delay={0.24}
                duration={1}
                ease="power3.out"
                className="w-full flex justify-center"
              >
                <BodyText className="mx-auto mb-0 max-w-[40rem] text-center text-base text-white/80 md:text-lg lg:text-xl leading-relaxed">
                  {description}
                </BodyText>
              </RevealOnScroll>
            )}
          </div>
        </Container>

        {metrics && metrics.length > 0 && (
          <div className="relative z-10 w-full mt-6 pb-12 sm:pb-16 lg:pb-20">
            <div
              className="mx-auto w-[75%] max-w-5xl border-t border-white/20 mb-8 sm:mb-10"
              aria-hidden
            />
            <RevealOnScroll trigger="load" delay={0.35}>
              <Container className="px-6 md:px-8 max-w-[1100px]">
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
