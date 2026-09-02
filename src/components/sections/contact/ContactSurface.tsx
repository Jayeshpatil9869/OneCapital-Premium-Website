import type { ReactNode } from 'react';
import { Noise } from '@/src/components/effects/Atmosphere';
import { cn } from '@/src/lib/utils';

type ContactSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function ContactSurface({ children, className }: ContactSurfaceProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem]',
        'border border-white/10 bg-[#080808] p-8 sm:p-10 md:p-12',
        'shadow-[0_20px_60px_rgba(0,0,0,0.8)] md:backdrop-blur-xl',
        className,
      )}
    >
      <Noise />
      <div className="pointer-events-none absolute -right-20 -top-20 hidden h-64 w-64 rounded-full bg-white/[0.03] blur-[100px] md:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
