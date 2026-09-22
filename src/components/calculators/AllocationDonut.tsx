import { formatInr } from '@/src/lib/format-inr';
import { cn } from '@/src/lib/utils';

type AllocationDonutProps = {
  invested: number;
  returns: number;
  investedLabel?: string;
  returnsLabel?: string;
  className?: string;
};

/** Invested vs gains donut — silver/white brand palette (no teal/gold accents). */
export function AllocationDonut({
  invested,
  returns,
  investedLabel = 'Invested amount',
  returnsLabel = 'Est. gains',
  className,
}: AllocationDonutProps) {
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
        'flex flex-col items-center gap-5 rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-7',
        className,
      )}
    >
      <p className="w-full text-xs font-mono uppercase tracking-[0.2em] text-white/45">
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
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={stroke}
            strokeDasharray={`${investedLen} ${circumference - investedLen}`}
            strokeLinecap="butt"
          />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth={stroke}
            strokeDasharray={`${returnsLen} ${circumference - returnsLen}`}
            strokeDashoffset={-investedLen}
            strokeLinecap="butt"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider text-white/40">Total</span>
          <span className="max-w-[5.5rem] truncate text-sm font-medium tabular-nums text-white">
            {formatInr(total)}
          </span>
        </div>
      </div>

      <ul className="flex w-full flex-col gap-2.5 text-sm">
        <li className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-white/60">
            <span className="h-2.5 w-2.5 rounded-full bg-white/35" aria-hidden />
            {investedLabel}
          </span>
          <span className="tabular-nums text-white/80">{formatInr(safeInvested)}</span>
        </li>
        <li className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-white/60">
            <span className="h-2.5 w-2.5 rounded-full bg-white" aria-hidden />
            {returnsLabel}
          </span>
          <span className="tabular-nums text-white">{formatInr(safeReturns)}</span>
        </li>
      </ul>
    </div>
  );
}
