import { formatInr } from '@/src/lib/format-inr';
import { cn } from '@/src/lib/utils';

type AllocationDonutProps = {
  invested: number;
  returns: number;
  investedLabel?: string;
  returnsLabel?: string;
  className?: string;
  theme?: 'dark' | 'light';
};

/** Invested vs gains donut — silver/white brand palette (no teal/gold accents). */
export function AllocationDonut({
  invested,
  returns,
  investedLabel = 'Invested amount',
  returnsLabel = 'Est. gains',
  className,
  theme = 'dark',
}: AllocationDonutProps) {
  const isLight = theme === 'light';
  const safeInvested = Math.max(0, invested);
  const safeReturns = Math.max(0, returns);
  const total = safeInvested + safeReturns;

  if (total <= 0) {
    return null;
  }

  const radius = 54;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;
  const investedPct = safeInvested / total;
  const returnsPct = safeReturns / total;
  const investedLen = circumference * investedPct;
  const returnsLen = circumference * returnsPct;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-5 rounded-3xl border p-6 sm:p-7 transition-colors',
        isLight
          ? 'border-zinc-200/90 bg-zinc-50/70 shadow-sm'
          : 'border-white/12 bg-white/[0.03]',
        className,
      )}
    >
      <p
        className={cn(
          'w-full text-xs font-mono uppercase tracking-[0.2em]',
          isLight ? 'text-zinc-500 font-medium' : 'text-white/45',
        )}
      >
        Breakdown
      </p>

      <div className="relative size-[9.5rem]">
        <svg
          viewBox="0 0 140 140"
          className="size-full -rotate-90"
          role="img"
          aria-label={`${investedLabel} ${formatInr(safeInvested)}, ${returnsLabel} ${formatInr(safeReturns)}`}
        >
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={stroke}
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.35)'}
            strokeWidth={stroke}
            strokeDasharray={`${investedLen} ${circumference - investedLen}`}
            strokeLinecap="butt"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke={isLight ? '#18181b' : 'rgba(255,255,255,0.92)'}
            strokeWidth={stroke}
            strokeDasharray={`${returnsLen} ${circumference - returnsLen}`}
            strokeDashoffset={-investedLen}
            strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span
            className={cn(
              'text-[10px] uppercase tracking-wider',
              isLight ? 'text-zinc-500 font-medium' : 'text-white/40',
            )}
          >
            Total
          </span>
          <span
            className={cn(
              'max-w-[5.5rem] truncate text-sm tabular-nums',
              isLight ? 'font-bold text-zinc-950' : 'font-medium text-white',
            )}
          >
            {formatInr(total)}
          </span>
        </div>
      </div>

      <ul className="flex w-full flex-col gap-2.5 text-sm">
        <li className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'inline-flex items-center gap-2',
              isLight ? 'text-zinc-600' : 'text-white/60',
            )}
          >
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full',
                isLight ? 'bg-zinc-400' : 'bg-white/35',
              )}
              aria-hidden
            />
            {investedLabel}
          </span>
          <span
            className={cn(
              'tabular-nums font-semibold',
              isLight ? 'text-zinc-700' : 'text-white/80',
            )}
          >
            {formatInr(safeInvested)}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'inline-flex items-center gap-2',
              isLight ? 'text-zinc-600' : 'text-white/60',
            )}
          >
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full',
                isLight ? 'bg-zinc-900' : 'bg-white',
              )}
              aria-hidden
            />
            {returnsLabel}
          </span>
          <span
            className={cn(
              'tabular-nums font-bold',
              isLight ? 'text-zinc-950' : 'text-white',
            )}
          >
            {formatInr(safeReturns)}
          </span>
        </li>
      </ul>
    </div>
  );
}
