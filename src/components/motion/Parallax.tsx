import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/src/lib/utils';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

type ParallaxProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  speed?: number;
  disabled?: boolean;
};

/** Subtle vertical parallax via ScrollTrigger. Mobile: reduced distance. */
export function Parallax({
  children,
  className,
  speed = 0.2,
  disabled = false,
  ...props
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (disabled || !ref.current || prefersReducedMotion()) return;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const y = (isMobile ? speed * 0.4 : speed) * 100;

      gsap.fromTo(
        ref.current,
        { y: -y },
        {
          y,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [speed, disabled] }
  );

  return (
    <div ref={ref} className={cn('will-change-transform', className)} {...props}>
      {children}
    </div>
  );
}
