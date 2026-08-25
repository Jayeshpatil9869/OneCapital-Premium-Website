import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/src/lib/utils';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

type LightSweepTextProps = {
  children: string;
  className?: string;
  /** Continuous loop (footer watermark) vs one authored pass. */
  loop?: boolean;
  /** Seconds for one full L→R sweep. */
  duration?: number;
};

/**
 * Soft horizontal light/shadow band across clipped text — GSAP-driven.
 * Lit left → dark trough → recovering right, matching the cinematic sweep.
 */
export function LightSweepText({
  children,
  className,
  loop = true,
  duration = 5.5,
}: LightSweepTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { backgroundPosition: '40% 0%' });
        return;
      }

      gsap.fromTo(
        el,
        { backgroundPosition: '120% 0%' },
        {
          backgroundPosition: '-20% 0%',
          duration,
          ease: loop ? 'none' : 'power2.inOut',
          repeat: loop ? -1 : 0,
          scrollTrigger: loop
            ? {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                toggleActions: 'play pause play pause',
              }
            : undefined,
        },
      );
    },
    { dependencies: [loop, duration], scope: ref },
  );

  return (
    <p ref={ref} className={cn('oc-light-sweep', className)} aria-hidden>
      {children}
    </p>
  );
}
