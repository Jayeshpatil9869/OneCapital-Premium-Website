import type { HTMLAttributes } from 'react';
import { cn } from '@/src/lib/utils';

type NoiseProps = HTMLAttributes<HTMLDivElement> & {
  opacity?: number;
};

export function Noise({ className, opacity, style, ...props }: NoiseProps) {
  return (
    <div
      aria-hidden
      className={cn('oc-noise', className)}
      style={{
        ...(opacity != null ? { opacity } : null),
        ...style,
      }}
      {...props}
    />
  );
}

type GridBackgroundProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
};

export function GridBackground({
  className,
  size = 64,
  style,
  ...props
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn('oc-grid-bg', className)}
      style={{
        backgroundSize: `${size}px ${size}px`,
        ...style,
      }}
      {...props}
    />
  );
}

type GlowOrbProps = HTMLAttributes<HTMLDivElement> & {
  position?: 'top-right' | 'top-left' | 'center';
};

export function GlowOrb({
  className,
  position = 'top-right',
  ...props
}: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full blur-[120px] bg-gradient-to-b from-white/[0.03] to-transparent',
        position === 'top-right' && 'top-0 right-0 w-1/2 h-[80vh]',
        position === 'top-left' && 'top-0 left-0 w-1/2 h-[80vh]',
        position === 'center' && 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3',
        className
      )}
      {...props}
    />
  );
}
