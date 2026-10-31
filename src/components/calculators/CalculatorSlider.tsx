import { useState } from 'react';
import { formatInrCompact } from '@/src/lib/format-inr';
import { cn } from '@/src/lib/utils';

type CalculatorSliderProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  onChange: (value: number) => void;
  formatDisplay?: (value: number) => string;
  theme?: 'dark' | 'light';
};

export function CalculatorSlider({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  prefix,
  onChange,
  formatDisplay,
  theme = 'light',
}: CalculatorSliderProps) {
  const isLight = theme === 'light';
  const isRupee = Boolean(prefix?.includes('₹'));
  const [editing, setEditing] = useState(false);

  const display = formatDisplay
    ? formatDisplay(value)
    : isRupee
      ? formatInrCompact(value)
      : `${prefix ?? ''}${value.toLocaleString('en-IN')}${suffix ? ` ${suffix}` : ''}`;

  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-4">
        <label
          htmlFor={id}
          className={cn('text-sm font-medium', isLight ? 'text-zinc-700' : 'text-white/70')}
        >
          {label}
        </label>
        <div
          className={cn(
            'flex min-w-[7.5rem] items-center justify-end rounded-xl border px-3 py-2 transition-colors',
            isLight
              ? 'border-zinc-200 bg-zinc-50 focus-within:border-zinc-400 focus-within:bg-white'
              : 'border-white/15 bg-white/[0.04]',
          )}
        >
          {isRupee && !editing ? (
            <button
              type="button"
              id={`${id}-number`}
              aria-label={label}
              onClick={() => setEditing(true)}
              className={cn(
                'w-full bg-transparent text-right text-sm font-semibold tabular-nums outline-none',
                isLight ? 'text-zinc-900' : 'text-white',
              )}
            >
              {display}
            </button>
          ) : (
            <input
              id={`${id}-number`}
              type="number"
              min={min}
              max={max}
              step={step}
              value={value}
              aria-label={label}
              autoFocus={isRupee && editing}
              onBlur={() => setEditing(false)}
              onChange={(e) => {
                const next = Number(e.target.value);
                if (Number.isNaN(next)) return;
                onChange(clamp(next));
              }}
              className={cn(
                'w-full bg-transparent text-right text-sm font-semibold tabular-nums outline-none',
                isLight ? 'text-zinc-900' : 'text-white',
              )}
            />
          )}
          {suffix ? (
            <span
              className={cn(
                'ml-1 shrink-0 text-xs',
                isLight ? 'text-zinc-500' : 'text-white/45',
              )}
            >
              {suffix}
            </span>
          ) : null}
        </div>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'h-1.5 w-full cursor-pointer appearance-none rounded-full',
          isLight
            ? 'oc-calc-range oc-calc-range--light bg-zinc-200'
            : 'oc-calc-range bg-white/10',
        )}
        style={{
          background: isLight
            ? `linear-gradient(to right, #18181b 0%, #18181b ${pct}%, #e4e4e7 ${pct}%, #e4e4e7 100%)`
            : `linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.85) ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`,
        }}
        aria-valuetext={display}
      />
    </div>
  );
}
