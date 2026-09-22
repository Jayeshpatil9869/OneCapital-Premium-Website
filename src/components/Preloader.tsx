import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';
import {
  gsap,
  prefersReducedMotion,
  PRELOADER_DONE_EVENT,
  ScrollTrigger,
} from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

const COPY = 'Welcome to One Capital';

/** Hard unlock if GSAP/timeline never completes (throttled mobile WebViews). */
const PRELOADER_SAFETY_MS = 8_000;

type PreloaderProps = {
  /**
   * Run on initial Layout mount (any route / hard refresh).
   * SPA navigations do not replay once the intro has finished.
   */
  enabled?: boolean;
};

/**
 * Unlock page scroll without Lenis.stop().
 * Lenis.stop() calls preventDefault on every touch/wheel — that permanently
 * kills scrolling on some devices if start() never runs cleanly.
 */
function lockPageScroll() {
  document.documentElement.classList.add('oc-preloader-lock');
}

function unlockPageScroll() {
  document.documentElement.classList.remove('oc-preloader-lock');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

export function Preloader({ enabled = true }: PreloaderProps) {
  const reactId = useId().replace(/:/g, '');
  const maskGradId = `oc-preloader-mask-grad-${reactId}`;
  const maskId = `oc-preloader-mask-${reactId}`;
  const { pathname } = useLocation();

  const [active, setActive] = useState(() => {
    if (enabled && typeof document !== 'undefined') {
      lockPageScroll();
    }
    return enabled;
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishedRef = useRef(false);
  const handedOffRef = useRef(false);
  const pathnameAtStartRef = useRef(pathname);

  /** Ensure shell is visible + scroll unblocked if we abort mid-intro. */
  const forceHandoff = () => {
    if (handedOffRef.current) return;
    handedOffRef.current = true;

    unlockPageScroll();
    window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));

    const shell = document.querySelector<HTMLElement>('.oc-shell');
    if (shell) {
      gsap.killTweensOf(shell);
      gsap.set(shell, { opacity: 1 });
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const finish = () => {
    forceHandoff();
    if (finishedRef.current) return;
    finishedRef.current = true;
    setActive(false);
  };

  // SPA nav mid-intro: kill overlay so the next route is not stuck behind it.
  useLayoutEffect(() => {
    if (!active) return;
    if (pathname === pathnameAtStartRef.current) return;

    timelineRef.current?.kill();
    timelineRef.current = null;
    const root = rootRef.current;
    if (root) gsap.killTweensOf(root);
    if (gradRef.current) gsap.killTweensOf(gradRef.current);

    finish();
  }, [pathname, active]);

  useLayoutEffect(() => {
    if (!active) return;
    lockPageScroll();
    return () => {
      unlockPageScroll();
    };
  }, [active]);

  // Failsafe: never leave the site permanently scroll-locked.
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      finish();
    }, PRELOADER_SAFETY_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  useGSAP(
    () => {
      if (!active) return;

      const root = rootRef.current;
      const text = textRef.current;
      const grad = gradRef.current;
      // Missing refs: safety timeout will unlock scroll.
      if (!root || !text || !grad) return;

      const shell = document.querySelector<HTMLElement>('.oc-shell');
      if (shell) gsap.set(shell, { opacity: 0 });

      const handoff = () => {
        if (handedOffRef.current) return;
        handedOffRef.current = true;

        unlockPageScroll();
        window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));

        if (shell) {
          gsap.to(shell, {
            opacity: 1,
            duration: 1.05,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }

        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      const teardown = () => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        setActive(false);
        unlockPageScroll();
        gsap.delayedCall(0.05, () => ScrollTrigger.refresh());
      };

      const lockSolidWhite = () => {
        text.removeAttribute('mask');
        text.setAttribute('fill', '#ffffff');
      };

      if (prefersReducedMotion()) {
        lockSolidWhite();
        const tl = gsap.timeline();
        timelineRef.current = tl;
        tl.to({}, { duration: 0.35 })
          .add(handoff)
          .to(root, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            onStart: () => {
              root.style.pointerEvents = 'none';
            },
            onComplete: teardown,
          });
        return () => {
          tl.kill();
          if (timelineRef.current === tl) timelineRef.current = null;
        };
      }

      gsap.set(root, { opacity: 1 });
      gsap.set(grad, { attr: { x1: -900, x2: -200 } });

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.to(grad, {
        attr: { x1: 700, x2: 1400 },
        duration: 3.0,
        ease: 'power2.inOut',
      })
        .add(lockSolidWhite)
        .to({}, { duration: 0.35 })
        .add(handoff)
        .to(root, {
          opacity: 0,
          duration: 0.85,
          ease: 'power2.inOut',
          onStart: () => {
            root.style.pointerEvents = 'none';
          },
          onComplete: teardown,
        });

      return () => {
        tl.kill();
        if (timelineRef.current === tl) timelineRef.current = null;
        if (handedOffRef.current && !finishedRef.current) {
          finishedRef.current = true;
          setActive(false);
          unlockPageScroll();
        }
      };
    },
    { dependencies: [active], scope: rootRef },
  );

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="oc-preloader"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={COPY}
    >
      <svg
        className="oc-preloader__svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            ref={gradRef}
            id={maskGradId}
            gradientUnits="userSpaceOnUse"
            x1="-900"
            y1="0"
            x2="-200"
            y2="0"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="38%" stopColor="#ffffff" />
            <stop offset="52%" stopColor="#c8c8c8" />
            <stop offset="64%" stopColor="#555555" />
            <stop offset="76%" stopColor="#000000" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1000"
            height="1000"
          >
            <rect x="0" y="0" width="1000" height="1000" fill={`url(#${maskGradId})`} />
          </mask>
        </defs>

        <text
          ref={textRef}
          className="oc-preloader__svg-text"
          x="500"
          y="500"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          mask={`url(#${maskId})`}
        >
          {COPY}
        </text>
      </svg>
    </div>
  );
}
