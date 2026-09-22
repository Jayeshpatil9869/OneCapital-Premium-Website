import { cn } from '@/src/lib/utils';

type CapitalFlowDiagramProps = {
  steps: string[];
  className?: string;
  activeIndex?: number;
};

export function CapitalFlowDiagram({ steps, className, activeIndex }: CapitalFlowDiagramProps) {
  return (
    <div className={cn('flex flex-col gap-0', className)} aria-hidden>
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div
            className={cn(
              'flex min-h-[3.25rem] w-full max-w-[14rem] items-center justify-center border border-white/15 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium tracking-tight text-white transition-colors duration-500',
                activeIndex === index && 'border-white/40 bg-white/[0.06]',
            )}
          >
            {step}
          </div>
          {index < steps.length - 1 ? (
            <div className="flex h-8 flex-col items-center justify-center">
              <span className="h-full w-px bg-gradient-to-b from-white/25 to-white/5" />
              <span className="text-[10px] text-white/40">↓</span>
            </div>
          ) : null}
        </div>
      ))}
      <p className="solutions-viz-label mt-4 text-center">Illustrative flow — not performance data</p>
    </div>
  );
}
