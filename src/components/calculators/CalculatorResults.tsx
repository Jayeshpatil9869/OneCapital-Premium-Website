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
  theme?: 'dark' | 'light';
};

export function CalculatorResults({
  title = 'Summary',
  rows,
  className,
  theme = 'light',
}: CalculatorResultsProps) {
  const isLight = theme === 'light';

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <p
        className={cn(
          'text-xs font-mono uppercase tracking-[0.2em]',
          isLight ? 'text-zinc-500 font-medium' : 'text-white/45',
        )}
      >
        {title}
      </p>
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
              'rounded-2xl border px-4 py-4 sm:px-5 sm:py-5 transition-colors',
              isLight
                ? cn(
                    'border-zinc-200/90 bg-zinc-50/70 shadow-sm',
                    row.emphasize && 'border-zinc-300 bg-zinc-100/90',
                  )
                : cn(
                    'border-white/12 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent',
                    row.emphasize && 'border-white/20 from-white/[0.12]',
                  ),
            )}
          >
            <p className={cn('text-xs font-medium', isLight ? 'text-zinc-500' : 'text-white/50')}>
              {row.label}
            </p>
            <p
              className={cn(
                'mt-2 font-medium tabular-nums tracking-tight',
                isLight
                  ? cn(
                      row.emphasize
                        ? 'text-xl text-zinc-950 font-bold sm:text-2xl'
                        : 'text-lg text-zinc-800 font-semibold sm:text-xl',
                      row.tone === 'muted' && 'text-zinc-600',
                      row.tone === 'accent' && 'text-zinc-950 font-bold',
                    )
                  : cn(
                      row.emphasize
                        ? 'text-xl text-white sm:text-2xl'
                        : 'text-lg text-white/90 sm:text-xl',
                      row.tone === 'muted' && 'text-white/70',
                      row.tone === 'accent' && 'text-white',
                    ),
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
