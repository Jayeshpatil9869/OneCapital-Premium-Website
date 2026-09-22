import { cn } from '@/src/lib/utils';

type IntelligencePipelineProps = {
  steps: string[];
  className?: string;
  activeIndex?: number;
};

export function IntelligencePipeline({ steps, className, activeIndex }: IntelligencePipelineProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                'rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/65 transition-colors duration-500',
                activeIndex === index && 'border-white/40 text-white',
              )}
            >
              {step}
            </div>
            {index < steps.length - 1 ? (
              <span className="hidden text-white/30 sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="solutions-viz-label mt-5">Intelligence pipeline — illustrative</p>
    </div>
  );
}
