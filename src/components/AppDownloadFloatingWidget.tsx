import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { AppDownloadPanel } from '@/src/components/AppDownloadPanel';
import { gsap, motionTokens, prefersReducedMotion } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';

export function AppDownloadFloatingWidget({ embedded = false }: { embedded?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el || prefersReducedMotion()) return;

      const hoverTween = gsap.to(el, {
        scale: 1.3,
        transformOrigin: 'bottom right',
        duration: motionTokens.duration.fast,
        ease: motionTokens.ease.smooth,
        paused: true,
      });

      const onEnter = () => hoverTween.play();
      const onLeave = () => hoverTween.reverse();

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);

      return () => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        hoverTween.kill();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'rounded-2xl border border-white/10 bg-[#0a0a0a] p-2.5 shadow-2xl will-change-transform',
        !embedded &&
          'fixed z-[calc(var(--z-toast)-1)] hidden md:block bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]',
      )}
      aria-label="Download the One Capital app"
    >
      <AppDownloadPanel qrSize="sm" />
    </div>
  );
}
