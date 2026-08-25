import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container, Section } from "@/src/components/ui/primitives/Layout";
import { Label } from "@/src/components/ui/typography/Typography";
import { RevealOnScroll } from "@/src/components/motion/RevealOnScroll";
import { cn } from "@/src/lib/utils";
import {
  gsap,
  motionTokens,
  prefersReducedMotion,
  whenPreloaderDone,
} from "@/src/lib/motion";

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

      const numbers =
        gridRef.current.querySelectorAll<HTMLElement>("[data-count]");

      numbers.forEach((el) => {
        el.textContent = prefersReducedMotion()
          ? (el.dataset.count ?? "0")
          : "0";
      });

      if (prefersReducedMotion()) {
        return whenPreloaderDone(() => {
          numbers.forEach((el) => {
            el.textContent = el.dataset.count ?? "0";
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
              el.textContent = String(Math.round(state.val));
            },
          });
        });
      });
    },
    { scope: gridRef, dependencies: [metrics] },
  );

  return (
    <Section pad="none" className={cn("bg-white/[0.01]", className)}>
      <RevealOnScroll trigger="load" delay={0.2}>
        <Container className="py-10 md:py-16">
          <div
            ref={gridRef}
            className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-12 justify-items-center text-center"
          >
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center gap-1 md:gap-2 min-w-0"
              >
                <span className="text-[1.3rem] sm:text-3xl md:text-5xl font-medium tracking-tighter tabular-nums">
                  <span data-count={metric.value}>0</span>
                  {metric.suffix != null && (
                    <span className="text-white/40 font-light">
                      {metric.suffix}
                    </span>
                  )}
                </span>
                <Label className="text-[10px] sm:text-[11px] md:text-xs leading-tight text-center px-0.5">
                  {metric.label}
                </Label>
              </div>
            ))}
          </div>
        </Container>
      </RevealOnScroll>
    </Section>
  );
}
