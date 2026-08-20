import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
};

export default function BrandLogo({
  className,
  markClassName,
  showWordmark = true,
}: BrandLogoProps) {
  return (
    <Link
      to="/"
      aria-label="One Capital home"
      className={cn(
        'group flex items-center gap-2.5 shrink-0 transition-opacity duration-300 hover:opacity-90',
        className
      )}
    >
      <img
        src="/brand/logo-mark-white.png"
        alt=""
        width={36}
        height={36}
        className={cn(
          'h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-[0.96]',
          markClassName
        )}
        decoding="async"
      />
      {showWordmark && (
        <span className="text-[0.95rem] tracking-[0.14em] font-medium uppercase leading-none">
          One Capital
        </span>
      )}
    </Link>
  );
}
