import { useRef, useId } from 'react';
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
 * Glitch-free, responsive SVG light sweep across brand text.
 * Uses an SVG gradient animation that starts and ends completely off-canvas,
 * guaranteeing seamless looping without visual jumps or mobile text clipping.
 */
export function LightSweepText({
  children,
  className,
  loop = true,
  duration = 4.5,
}: LightSweepTextProps) {
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const gradientId = `light-sweep-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useGSAP(
    () => {
      const grad = gradientRef.current;
      if (!grad) return;

      if (prefersReducedMotion()) {
        gsap.set(grad, {
          attr: { x1: '0%', x2: '100%' },
        });
        return;
      }

      // Seamless sweep from -120% to 120% (beam completely enters from left and exits to right)
      gsap.fromTo(
        grad,
        {
          attr: { x1: '-120%', x2: '-20%' },
        },
        {
          attr: { x1: '120%', x2: '220%' },
          duration,
          ease: 'power1.inOut',
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? 0.6 : 0,
          scrollTrigger:
            loop && containerRef.current
              ? {
                  trigger: containerRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  toggleActions: 'play pause play pause',
                }
              : undefined,
        }
      );
    },
    { dependencies: [loop, duration], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full flex items-center justify-center overflow-visible select-none pointer-events-none',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 430 58"
        className="w-full h-auto max-w-full block"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            ref={gradientRef}
            id={gradientId}
            x1="-120%"
            y1="0%"
            x2="-20%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
            <stop offset="35%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="65%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.12)" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={`url(#${gradientId})`}
          className="font-black uppercase tracking-tighter"
          style={{
            fontFamily:
              'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '64px',
            fontWeight: 900,
            letterSpacing: '-0.04em',
          }}
        >
          {children}
        </text>
      </svg>
    </div>
  );
}
