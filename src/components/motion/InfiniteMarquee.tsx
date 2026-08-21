import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
};

const durationMap = {
  slow: '48s',
  normal: '32s',
  fast: '18s',
} as const;

/** CSS-only infinite marquee — no RAF. Pauses on hover; respects reduced motion via CSS. */
export function InfiniteMarquee({
  children,
  className,
  speed = 'normal',
  pauseOnHover = true,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        pauseOnHover && 'group',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex w-max gap-8 animate-[oc-marquee_var(--marquee-duration)_linear_infinite]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={
          {
            '--marquee-duration': durationMap[speed],
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 gap-8 items-center">{children}</div>
        <div className="flex shrink-0 gap-8 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
