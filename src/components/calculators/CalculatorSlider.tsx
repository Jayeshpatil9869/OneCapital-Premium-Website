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
}: CalculatorSliderProps) {
  const display = formatDisplay
    ? formatDisplay(value)
    : `${prefix ?? ''}${value.toLocaleString('en-IN')}${suffix ? ` ${suffix}` : ''}`;

  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-sm text-white/70">
          {label}
        </label>
        <div className="flex min-w-[7.5rem] items-center justify-end rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2">
          <input
            id={`${id}-number`}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            aria-label={label}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (Number.isNaN(next)) return;
              onChange(Math.min(max, Math.max(min, next)));
            }}
            className="w-full bg-transparent text-right text-sm font-medium tabular-nums text-white outline-none"
          />
          {suffix ? (
            <span className="ml-1 shrink-0 text-xs text-white/45">{suffix}</span>
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
          'oc-calc-range h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10',
        )}
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.85) ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`,
        }}
        aria-valuetext={display}
      />
    </div>
  );
}
