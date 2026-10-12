import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { SectionHeading } from '@/src/components/ui';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(useGSAP);

const DIM = 'rgba(255, 255, 255, 0.22)';
const LIT = '#ffffff';

type ScrollColorTextProps = {
  text: string;
  className?: string;
};

/**
 * Scroll-scrubbed character color fill.
 * Uses the page scroller (Lenis on desktop). No second scroll library.
 */
export function ScrollColorText({ text, className }: ScrollColorTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const heading = root?.querySelector('h2');
      if (!root || !heading) return;

      const chars = heading.querySelectorAll<HTMLElement>('[data-char]');
      if (!chars.length) return;

      if (prefersReducedMotion()) {
        gsap.set(chars, { color: LIT });
        return;
      }

      gsap.set(chars, { color: DIM });
      gsap.to(chars, {
        color: LIT,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          start: 'top 50%',
          end: 'top -20%',
          scrub: 1,
        },
      });
    },
    { scope: rootRef, dependencies: [text], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef}>
      <SectionHeading className={cn('max-w-4xl whitespace-pre-wrap text-white/20', className)}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {Array.from(text).map((char, index) => (
            <span key={`${index}-${char}`} data-char="">
              {char}
            </span>
          ))}
        </span>
      </SectionHeading>
    </div>
  );
}
