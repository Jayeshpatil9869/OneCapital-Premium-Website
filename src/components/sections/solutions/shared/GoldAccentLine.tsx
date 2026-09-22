import { cn } from '@/src/lib/utils';

type AccentLineProps = {
  className?: string;
};

export function AccentLine({ className }: AccentLineProps) {
  return <span className={cn('solutions-accent-line', className)} aria-hidden />;
}

/** @deprecated Use AccentLine — kept as alias for any straggling imports */
export function GoldAccentLine({ className }: AccentLineProps) {
  return <AccentLine className={className} />;
}
