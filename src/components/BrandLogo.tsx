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
        width={40}
        height={40}
        className={cn(
          'h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-[0.96] sm:h-11 sm:w-11',
          markClassName
        )}
        decoding="async"
      />
      {showWordmark && (
        <span className="text-[1.2rem] tracking-[0.08em] font-medium leading-none sm:text-[1.25rem]">
          One Capital
        </span>
      )}
    </Link>
  );
}
