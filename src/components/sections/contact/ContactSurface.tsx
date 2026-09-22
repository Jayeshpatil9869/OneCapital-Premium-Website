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
        'relative min-w-0 overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] md:rounded-[2.25rem]',
        // Premium frosted glass surface with translucent depth and high backdrop blur
        'bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01]',
        'backdrop-blur-2xl backdrop-saturate-[1.8] md:backdrop-blur-3xl',
        'border border-white/15',
        'p-5 pt-7 sm:p-8 sm:pt-10 md:p-10 md:pt-12',
        'shadow-[0_30px_90px_-15px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.25),inset_0_0_30px_rgba(255,255,255,0.02)]',
        'transition-all duration-300',
        className,
      )}
    >
      <Noise opacity={0.02} />

      {/* Internal ambient glowing orbs for specular glass refraction */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.06] blur-[70px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/[0.03] blur-[80px]"
        aria-hidden="true"
      />

      {/* Top rim specular highlight line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        aria-hidden="true"
      />

      {/* Subtle bottom rim edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

