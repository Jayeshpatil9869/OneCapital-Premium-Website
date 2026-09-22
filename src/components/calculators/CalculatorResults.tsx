import { formatInr } from '@/src/lib/format-inr';
import { cn } from '@/src/lib/utils';

export type ResultRow = {
  id: string;
  label: string;
  value: number;
  emphasize?: boolean;
  tone?: 'default' | 'muted' | 'accent';
};

type CalculatorResultsProps = {
  title?: string;
  rows: ResultRow[];
  className?: string;
};

export function CalculatorResults({
  title = 'Summary',
  rows,
  className,
}: CalculatorResultsProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/45">{title}</p>
      <div
        className={cn(
          'grid gap-3',
          rows.length >= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2',
        )}
      >
        {rows.map((row) => (
          <div
            key={row.id}
            className={cn(
              'rounded-2xl border border-white/12 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent px-4 py-4 sm:px-5 sm:py-5',
              row.emphasize && 'border-white/20 from-white/[0.12]',
            )}
          >
            <p className="text-xs text-white/50">{row.label}</p>
            <p
              className={cn(
                'mt-2 font-medium tabular-nums tracking-tight',
                row.emphasize ? 'text-xl text-white sm:text-2xl' : 'text-lg text-white/90 sm:text-xl',
                row.tone === 'muted' && 'text-white/70',
                row.tone === 'accent' && 'text-white',
              )}
            >
              {formatInr(row.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
