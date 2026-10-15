import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/src/lib/utils';

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  margin?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Smooth, production-grade scroll fade reveal for website sections (Apple/Stripe/Dezerv style). */
export function ScrollFade({
  children,
  className,
  delay = 0,
  duration = 0.85,
  distance = 24,
  direction = 'up',
  margin = '-50px',
  as = 'div',
}: ScrollFadeProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];

  const getInitial = () => {
    if (reduce) return false;
    if (direction === 'none') return { opacity: 0 };
    if (direction === 'up') return { opacity: 0, y: distance };
    if (direction === 'down') return { opacity: 0, y: -distance };
    if (direction === 'left') return { opacity: 0, x: distance };
    if (direction === 'right') return { opacity: 0, x: -distance };
    return { opacity: 0, y: distance };
  };

  const getAnimate = () => {
    if (direction === 'none') return { opacity: 1 };
    if (direction === 'left' || direction === 'right') return { opacity: 1, x: 0 };
    return { opacity: 1, y: 0 };
  };

  return (
    <Comp
      className={cn(className)}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: margin as any }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
