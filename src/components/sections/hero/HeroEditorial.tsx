import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Container } from '@/src/components/ui/primitives/Layout';
import { Eyebrow, DisplayHeading, BodyText, Label } from '@/src/components/ui/typography/Typography';
import { GlowOrb } from '@/src/components/effects/Atmosphere';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { cn } from '@/src/lib/utils';
import {
  gsap,
  motionTokens,
  prefersReducedMotion,
  whenPreloaderDone,
} from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

export type HeroMetric = {
  label: string;
  value: string;
  suffix?: string;
};

type HeroEditorialProps = {
  variant?: 'editorial' | 'cinematic';
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  backgroundImage?: string;
  metrics?: HeroMetric[];
  className?: string;
};

function HeroMetrics({ metrics }: { metrics: HeroMetric[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const numbers = gridRef.current.querySelectorAll<HTMLElement>('[data-count]');

      numbers.forEach((el) => {
        el.textContent = prefersReducedMotion() ? (el.dataset.count ?? '0') : '0';
      });

      if (prefersReducedMotion()) {
        return whenPreloaderDone(() => {
          numbers.forEach((el) => {
            el.textContent = el.dataset.count ?? '0';
          });
        });
      }

      return whenPreloaderDone(() => {
        numbers.forEach((el, index) => {
          const target = Number(el.dataset.count);
          if (Number.isNaN(target)) return;

          const state = { val: 0 };
          el.textContent = '0';

          gsap.to(state, {
            val: target,
            duration: motionTokens.duration.cinematic,
            ease: motionTokens.ease.expo,
            delay: 0.35 + index * motionTokens.stagger.normal,
            onUpdate: () => {
              el.textContent = String(Math.round(state.val));
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
      className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-4 sm:gap-8 md:gap-12 justify-items-center text-center"
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col items-center gap-1.5 md:gap-2 min-w-0">
          <span className="text-[1.75rem] sm:text-3xl md:text-[2.75rem] font-medium tracking-tighter tabular-nums text-white">
            <span data-count={metric.value}>0</span>
            {metric.suffix != null && metric.suffix}
          </span>
          <Label className="text-[10px] sm:text-[11px] md:text-xs leading-tight text-white/50 text-center">
            {metric.label}
          </Label>
        </div>
      ))}
    </div>
  );
}

/** Hero — editorial (asymmetric) or cinematic (full-bleed background + stats). */
export function HeroEditorial({
  variant = 'editorial',
  eyebrow,
  title,
  description,
  actions,
  visual,
  backgroundImage,
  metrics,
  className,
}: HeroEditorialProps) {
  if (variant === 'cinematic') {
    return (
      <section
        className={cn(
          'relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-black',
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

        <Container className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-[max(7rem,env(safe-area-inset-top))] pb-10 text-center md:px-8 lg:pt-36">
          {eyebrow && (
            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={24}
              duration={1}
              ease="power3.out"
            >
              <Eyebrow
                centered
                className="mb-8 text-white/50 [&>span:first-child]:bg-white/35 [&>span:last-child]:bg-white/35"
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
          >
            <DisplayHeading className="mb-8 text-white">{title}</DisplayHeading>
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
              <BodyText className="mx-auto mb-0 max-w-[38rem] text-base text-white/75 md:text-lg lg:text-xl">
                {description}
              </BodyText>
            </RevealOnScroll>
          )}
        </Container>

        {metrics && metrics.length > 0 && (
          <div className="relative z-10">
            <div
              className="mx-auto w-[70%] border-t border-white/20"
              aria-hidden
            />
            <RevealOnScroll trigger="load" delay={0.35}>
              <Container className="px-6 py-8 md:px-8 md:py-10 lg:py-12">
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
        'w-full min-h-[min(90svh,56rem)] relative flex flex-col justify-center overflow-x-clip pt-[max(6rem,env(safe-area-inset-top))] lg:pt-32',
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
