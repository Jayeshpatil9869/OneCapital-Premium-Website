import type { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

type ContactSurfaceProps = {
  children: ReactNode;
  className?: string;
};

/** Translucent form shell — IIFL-style glass over photo, OC tokens. */
export function ContactSurface({ children, className }: ContactSurfaceProps) {
  return (
    <div
      className={cn(
        'relative min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl',
        'border border-white/15 bg-black/45 backdrop-blur-xl md:backdrop-blur-2xl',
        'p-5 pt-6 sm:p-7 sm:pt-8 md:p-8 md:pt-9',
        'shadow-[0_24px_64px_-20px_rgba(0,0,0,0.75)]',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
