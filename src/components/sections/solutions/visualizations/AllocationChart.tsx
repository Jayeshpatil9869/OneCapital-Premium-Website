import { cn } from '@/src/lib/utils';

const SAMPLE_ALLOCATION = [
  { label: 'Equities', value: 42, tone: 'bg-white/80' },
  { label: 'Fixed Income', value: 28, tone: 'bg-white/55' },
  { label: 'Alternatives', value: 18, tone: 'bg-white/35' },
  { label: 'Cash & Liquidity', value: 12, tone: 'bg-white/20' },
] as const;

type AllocationChartProps = {
  className?: string;
};

export function AllocationChart({ className }: AllocationChartProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
        {SAMPLE_ALLOCATION.map((item) => (
          <div
            key={item.label}
            className={cn('h-full transition-all duration-700', item.tone)}
            style={{ width: `${item.value}%` }}
          />
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SAMPLE_ALLOCATION.map((item) => (
          <li key={item.label} className="flex flex-col gap-1">
            <span className="text-lg font-medium tabular-nums text-white">{item.value}%</span>
            <span className="text-xs text-white/50">{item.label}</span>
          </li>
        ))}
      </ul>
      <p className="solutions-viz-label">Sample allocation — illustrative only</p>
    </div>
  );
}
