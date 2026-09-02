import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

function canUseFlair(): boolean {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function getCursorPercent(button: HTMLElement, clientX: number, clientY: number) {
  const { left, top, width, height } = button.getBoundingClientRect();

  const xTransformer = gsap.utils.pipe(
    gsap.utils.mapRange(0, width, 0, 100),
    gsap.utils.clamp(0, 100),
  );

  const yTransformer = gsap.utils.pipe(
    gsap.utils.mapRange(0, height, 0, 100),
    gsap.utils.clamp(0, 100),
  );

  return {
    x: xTransformer(clientX - left),
    y: yTransformer(clientY - top),
  };
}

/** GSAP pointer-tracked radial flair for stroke buttons. */
export function useFlairButton(enabled: boolean) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const flairRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const flair = flairRef.current;
      if (!enabled || !button || !flair || !canUseFlair()) return;

      const xSet = gsap.quickSetter(flair, 'xPercent');
      const ySet = gsap.quickSetter(flair, 'yPercent');

      const onEnter = (e: MouseEvent) => {
        const { x, y } = getCursorPercent(button, e.clientX, e.clientY);
        xSet(x);
        ySet(y);
        gsap.to(flair, { scale: 1, duration: 0.4, ease: 'power2.out' });
      };

      const onLeave = (e: MouseEvent) => {
        const { x, y } = getCursorPercent(button, e.clientX, e.clientY);
        gsap.killTweensOf(flair);
        gsap.to(flair, {
          xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
          yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
          scale: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onMove = (e: MouseEvent) => {
        const { x, y } = getCursorPercent(button, e.clientX, e.clientY);
        gsap.to(flair, {
          xPercent: x,
          yPercent: y,
          duration: 0.4,
          ease: 'power2',
        });
      };

      button.addEventListener('mouseenter', onEnter);
      button.addEventListener('mouseleave', onLeave);
      button.addEventListener('mousemove', onMove);

      return () => {
        button.removeEventListener('mouseenter', onEnter);
        button.removeEventListener('mouseleave', onLeave);
        button.removeEventListener('mousemove', onMove);
        gsap.killTweensOf(flair);
      };
    },
    { dependencies: [enabled] },
  );

  return { buttonRef, flairRef };
}
