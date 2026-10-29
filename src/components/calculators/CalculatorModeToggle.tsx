import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

type CalculatorModeToggleProps = {
  active: 'monthly' | 'lumpsum';
  className?: string;
};

export function CalculatorModeToggle({ active, className }: CalculatorModeToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex w-full rounded-full border border-black/10 bg-zinc-100 p-1 sm:w-auto',
        className,
      )}
      role="tablist"
      aria-label="Investment type"
    >
      <Link
        to="/calculators/sip"
        role="tab"
        aria-selected={active === 'monthly'}
        className={cn(
          'flex-1 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-colors sm:flex-none',
          active === 'monthly'
            ? 'bg-black text-white shadow-sm'
            : 'text-black/50 hover:text-black',
        )}
      >
        Monthly
      </Link>
      <Link
        to="/calculators/lumpsum"
        role="tab"
        aria-selected={active === 'lumpsum'}
        className={cn(
          'flex-1 rounded-full px-5 py-2.5 text-center text-sm font-medium transition-colors sm:flex-none',
          active === 'lumpsum'
            ? 'bg-black text-white shadow-sm'
            : 'text-black/50 hover:text-black',
        )}
      >
        Lumpsum
      </Link>
    </div>
  );
}
