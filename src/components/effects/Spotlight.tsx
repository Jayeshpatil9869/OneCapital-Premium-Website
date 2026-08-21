import {
  useCallback,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/src/lib/utils';
import { prefersReducedMotion } from '@/src/lib/motion';

const intensityMap = {
  subtle: 0.08,
  medium: 0.14,
  strong: 0.22,
} as const;

type SpotlightProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  intensity?: keyof typeof intensityMap;
  disabled?: boolean;
};

export function Spotlight({
  children,
  className,
  intensity = 'medium',
  disabled = false,
  ...props
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || prefersReducedMotion() || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty('--spot-x', `${x}%`);
      ref.current.style.setProperty('--spot-y', `${y}%`);
      ref.current.style.setProperty('--spot-opacity', String(intensityMap[intensity]));
    },
    [disabled, intensity]
  );

  return (
    <div
      ref={ref}
      className={cn('oc-spotlight-surface', className)}
      onMouseMove={onMove}
      {...props}
    >
      {children}
    </div>
  );
}
