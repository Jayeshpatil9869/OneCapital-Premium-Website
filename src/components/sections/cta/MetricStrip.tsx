import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Container, Section } from '@/src/components/ui/primitives/Layout';
import { Label } from '@/src/components/ui/typography/Typography';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { cn } from '@/src/lib/utils';
import { gsap, motionTokens, prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

export type MetricItem = {
  label: string;
  value: string;
  suffix?: string;
};

type MetricStripProps = {
  metrics: MetricItem[];
  className?: string;
};

export function MetricStrip({ metrics, className }: MetricStripProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      const numbers = gridRef.current.querySelectorAll<HTMLElement>('[data-count]');

      if (prefersReducedMotion()) {
        numbers.forEach((el) => {
          el.textContent = el.dataset.count ?? '0';
        });
        return;
      }

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
    },
    { scope: gridRef, dependencies: [metrics] }
  );

  return (
    <Section pad="none" className={cn('bg-white/[0.01]', className)}>
      <RevealOnScroll trigger="load" delay={0.2}>
        <Container
          ref={gridRef}
          className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center text-center"
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center gap-2">
              <span className="text-3xl md:text-5xl font-medium tracking-tighter">
                <span data-count={metric.value}>{metric.value}</span>
                {metric.suffix != null && (
                  <span className="text-white/40 font-light">{metric.suffix}</span>
                )}
              </span>
              <Label>{metric.label}</Label>
            </div>
          ))}
        </Container>
      </RevealOnScroll>
    </Section>
  );
}
