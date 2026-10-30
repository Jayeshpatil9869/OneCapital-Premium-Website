import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';
import {
  gsap,
  prefersReducedMotion,
  PRELOADER_DONE_EVENT,
  ScrollTrigger,
} from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

const INITIAL_PATH = 'M0,1005S175,995,500,995s500,5,500,5V0H0Z';
const CURVE_PATH = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
const FLAT_PATH = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';

/** Hard unlock failsafe if GSAP/timeline never completes */
const PRELOADER_SAFETY_MS = 6_000;

type PreloaderProps = {
  enabled?: boolean;
};

function lockPageScroll() {
  document.documentElement.classList.add('oc-preloader-lock', 'oc-shell-intro');
}

function unlockPageScroll() {
  document.documentElement.classList.remove('oc-preloader-lock');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

/**
 * Keep the loader DOM node mounted after GSAP owns it.
 * Returning null after transforms races ReactLenis → removeChild NotFoundError.
 */
export function Preloader({ enabled = true }: PreloaderProps) {
  const { pathname } = useLocation();

  const [running, setRunning] = useState(() => {
    if (enabled && typeof document !== 'undefined') {
      lockPageScroll();
    }
    return enabled;
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishedRef = useRef(false);
  const handedOffRef = useRef(false);
  const pathnameAtStartRef = useRef(pathname);

  const forceHandoff = () => {
    if (handedOffRef.current) return;
    handedOffRef.current = true;

    document.documentElement.classList.add('oc-shell-reveal');
    document.documentElement.classList.remove('oc-shell-intro');
    unlockPageScroll();
    window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));

    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const dismiss = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    forceHandoff();

    const root = rootRef.current;
    const path = pathRef.current;
    const heading = headingRef.current;
    const headingWrap = headingWrapRef.current;
    if (root) gsap.killTweensOf(root);
    if (path) gsap.killTweensOf(path);
    if (heading) gsap.killTweensOf(heading);
    if (headingWrap) gsap.killTweensOf(headingWrap);
    if (root) {
      gsap.set(root, {
        autoAlpha: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
      });
    }

    setRunning(false);
    document.documentElement.classList.remove('oc-shell-intro');
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  // SPA nav mid-intro: clean up immediately
  useLayoutEffect(() => {
    if (!running || finishedRef.current) return;
    if (pathname === pathnameAtStartRef.current) return;

    timelineRef.current?.kill();
    timelineRef.current = null;
    dismiss();
  }, [pathname, running]);

  useLayoutEffect(() => {
    if (!running) return;
    lockPageScroll();
    return () => {
      unlockPageScroll();
    };
  }, [running]);

  // Failsafe
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      dismiss();
    }, PRELOADER_SAFETY_MS);
    return () => window.clearTimeout(timer);
  }, [running]);

  useGSAP(
    () => {
      if (!enabled || finishedRef.current) return;

      const root = rootRef.current;
      const path = pathRef.current;
      const headingWrap = headingWrapRef.current;
      const heading = headingRef.current;
      if (!root || !path || !heading || !headingWrap) return;

      document.documentElement.classList.add('oc-shell-intro');

      const handoff = () => {
        if (handedOffRef.current) return;
        handedOffRef.current = true;

        document.documentElement.classList.add('oc-shell-reveal');
        document.documentElement.classList.remove('oc-shell-intro');
        unlockPageScroll();
        window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
      };

      const teardown = () => {
        dismiss();
      };

      if (prefersReducedMotion()) {
        handoff();
        teardown();
        return;
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.fromTo(
        heading,
        {
          y: 70,
          opacity: 0,
          skewY: 4,
        },
        {
          delay: 0.25,
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
      )
        .to(heading, {
          delay: 0.4,
          y: -70,
          opacity: 0,
          skewY: -4,
          duration: 0.55,
          ease: 'power3.in',
        })
        .set(headingWrap, { display: 'none' })
        .to(path, {
          duration: 0.75,
          attr: { d: CURVE_PATH },
          ease: 'power2.in',
          onStart: () => {
            handoff();
          },
        })
        .to(path, {
          duration: 0.75,
          attr: { d: FLAT_PATH },
          ease: 'power2.out',
        })
        .to(root, {
          yPercent: -100,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: teardown,
        });

      return () => {
        tl.kill();
        if (timelineRef.current === tl) timelineRef.current = null;
      };
    },
    { dependencies: [enabled], scope: rootRef },
  );

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className="loader-wrap fixed inset-0 z-[var(--z-preloader,9999)] h-screen w-full flex items-center justify-center overflow-hidden bg-transparent pointer-events-auto"
      role="status"
      aria-live="polite"
      aria-busy={running}
      aria-hidden={!running}
      aria-label="ONE CAPITAL"
      // Keep fiber mounted — only hide after GSAP exit (see dismiss).
      inert={running ? undefined : true}
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          fill="#000000"
          d={INITIAL_PATH}
        />
      </svg>

      <div
        ref={headingWrapRef}
        className="loader-wrap-heading relative z-20 pointer-events-none px-4"
      >
        <span className="block overflow-hidden py-3">
          <h1
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-[0.25em] sm:tracking-[0.32em] uppercase text-white font-sans text-center"
          >
            ONE CAPITAL
          </h1>
        </span>
      </div>
    </div>
  );
}
