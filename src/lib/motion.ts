import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const motionTokens = {
  duration: {
    instant: 0.15,
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    cinematic: 1.4,
  },
  ease: {
    smooth: 'power2.out',
    premium: 'power3.out',
    expo: 'expo.out',
    cinematic: 'power4.out',
  },
  stagger: {
    tight: 0.04,
    normal: 0.08,
    relaxed: 0.14,
  },
  scroll: {
    start: 'top 85%',
    startEarly: 'top 90%',
  },
} as const;

export type MotionEase = (typeof motionTokens.ease)[keyof typeof motionTokens.ease];
export type MotionDuration = number;

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function directionOffset(direction: RevealDirection, distance = 40) {
  switch (direction) {
    case 'up':
      return { y: distance, x: 0 };
    case 'down':
      return { y: -distance, x: 0 };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    case 'none':
      return { x: 0, y: 0 };
    default: {
      const _exhaustive: never = direction;
      return _exhaustive;
    }
  }
}

export { gsap, ScrollTrigger };
