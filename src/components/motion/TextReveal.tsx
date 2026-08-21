import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/src/lib/utils';
import {
  gsap,
  motionTokens,
  prefersReducedMotion,
} from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

type TextRevealProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: 'load' | 'scroll';
  once?: boolean;
  disabled?: boolean;
};

/** Line/block text entrance — keeps SEO-friendly HTML (no character splitting by default). */
export function TextReveal({
  children,
  className,
  as: Comp = 'div',
  delay = 0,
  duration = motionTokens.duration.slow,
  stagger = motionTokens.stagger.normal,
  trigger = 'scroll',
  once = true,
  disabled = false,
  ...props
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (disabled || !ref.current) return;
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { opacity: 1, clearProps: 'transform' });
        return;
      }

      const lines = ref.current.querySelectorAll('[data-reveal-line]');
      const targets = lines.length ? lines : ref.current;

      const vars = {
        y: 28,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: motionTokens.ease.cinematic,
      };

      if (trigger === 'load') {
        gsap.from(targets, vars);
        return;
      }

      gsap.from(targets, {
        ...vars,
        scrollTrigger: {
          trigger: ref.current,
          start: motionTokens.scroll.start,
          once,
        },
      });
    },
    {
      scope: ref,
      dependencies: [delay, duration, stagger, trigger, once, disabled],
    }
  );

  return (
    <Comp ref={ref as never} className={cn(className)} {...props}>
      {children}
    </Comp>
  );
}
