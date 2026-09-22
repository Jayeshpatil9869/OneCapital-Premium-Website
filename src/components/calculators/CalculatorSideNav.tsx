import { Link } from 'react-router-dom';
import { CALCULATOR_CARDS, type CalculatorSlug } from '@/src/data/calculators';
import { cn } from '@/src/lib/utils';

type CalculatorSideNavProps = {
  active: CalculatorSlug;
  className?: string;
};

export function CalculatorSideNav({ active, className }: CalculatorSideNavProps) {
  return (
    <nav
      aria-label="Other calculators"
      className={cn(
        'rounded-3xl border border-white/12 bg-white/[0.02] p-4 sm:p-5',
        className,
      )}
    >
      <p className="mb-4 px-2 text-xs font-mono uppercase tracking-[0.2em] text-white/45">
        Calculators
      </p>
      <ul className="flex flex-col gap-1">
        {CALCULATOR_CARDS.map((card) => {
          const Icon = card.icon;
          const isActive = card.slug === active;
          return (
            <li key={card.slug}>
              <Link
                to={card.path}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-colors',
                  isActive
                    ? 'bg-white text-black'
                    : 'text-white/70 hover:bg-white/[0.06] hover:text-white',
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                <span className="font-medium">{card.shortTitle}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
