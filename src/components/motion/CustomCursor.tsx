import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, .magnetic-target, [data-cursor="hover"]';

/**
 * Only enable custom cursor on true desktop devices.
 * Touch devices always use native cursor to prevent pointer-events blocking.
 */
function canUseCustomCursor(): boolean {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;

  // Never enable on any touch-capable device
  const hasTouch =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

  if (hasTouch) return false;

  // Mobile / narrow screens: always use native cursor
  if (window.matchMedia('(max-width: 1023px)').matches) return false;

  // Only enable on true desktop: fine pointer + hover support
  return (
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(hover: hover)').matches
  );
}

/** Site-wide custom cursor — GSAP quickTo lag. Desktop only. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => {
      const on = canUseCustomCursor();
      setEnabled(on);
      document.documentElement.classList.toggle('has-custom-cursor', on);
    };

    sync();

    const mobileMq = window.matchMedia('(max-width: 1023px)');
    const fineMq = window.matchMedia('(pointer: fine)');
    const hoverMq = window.matchMedia('(hover: hover)');
    const coarseMq = window.matchMedia('(pointer: coarse)');

    mobileMq.addEventListener('change', sync);
    fineMq.addEventListener('change', sync);
    hoverMq.addEventListener('change', sync);
    coarseMq.addEventListener('change', sync);

    return () => {
      mobileMq.removeEventListener('change', sync);
      fineMq.removeEventListener('change', sync);
      hoverMq.removeEventListener('change', sync);
      coarseMq.removeEventListener('change', sync);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  useGSAP(
    () => {
      if (!enabled || !dotRef.current || !ringRef.current) return;

      const dot = dotRef.current;
      const ring = ringRef.current;

      // Hidden until first move so we never flash at (0,0).
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

      const xDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
      const yDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
      const xRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
      const yRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

      let visible = false;
      const reveal = () => {
        if (visible) return;
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, ease: 'power2.out' });
      };

      const onMove = (e: MouseEvent) => {
        xDot(e.clientX);
        yDot(e.clientY);
        xRing(e.clientX);
        yRing(e.clientY);
        reveal();
      };

      const onOver = (e: MouseEvent) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        if (!target.closest(INTERACTIVE)) return;
        gsap.to(ring, {
          scale: 1.35,
          duration: 0.35,
          ease: 'power3.out',
        });
        gsap.to(dot, {
          scale: 0.5,
          duration: 0.35,
          ease: 'power3.out',
        });
      };

      const onOut = (e: MouseEvent) => {
        const target = e.target;
        const related = e.relatedTarget;
        if (!(target instanceof Element)) return;
        if (
          related instanceof Element &&
          related.closest(INTERACTIVE) &&
          target.closest(INTERACTIVE)
        ) {
          return;
        }
        if (!target.closest(INTERACTIVE)) return;
        gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power3.out' });
        gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power3.out' });
      };

      const onEnter = () => {
        if (!visible) return;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, ease: 'power2.out' });
      };

      const onLeave = () => {
        visible = false;
        gsap.to([dot, ring], { opacity: 0, duration: 0.25, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);
      document.documentElement.addEventListener('mouseenter', onEnter);
      document.documentElement.addEventListener('mouseleave', onLeave);

      return () => {
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseover', onOver);
        document.removeEventListener('mouseout', onOut);
        document.documentElement.removeEventListener('mouseenter', onEnter);
        document.documentElement.removeEventListener('mouseleave', onLeave);
      };
    },
    { dependencies: [enabled] }
  );

  if (!enabled) return null;

  return (
    <div className="oc-cursor" aria-hidden>
      <div ref={ringRef} className="oc-cursor__ring" />
      <div ref={dotRef} className="oc-cursor__dot" />
    </div>
  );
}
