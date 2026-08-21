import {
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/src/lib/utils';
import { prefersReducedMotion } from '@/src/lib/motion';

type MagneticProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  strength?: number;
  disabled?: boolean;
};

/** Pointer-follow pull for interactive surfaces. Disabled on reduced-motion / touch. */
export function Magnetic({
  children,
  className,
  strength = 0.2,
  disabled = false,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion() || !ref.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <div
      ref={ref}
      className={cn('magnetic-target will-change-transform', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </div>
  );
}
