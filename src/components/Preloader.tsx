import { useId, useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import {
  gsap,
  prefersReducedMotion,
  PRELOADER_DONE_EVENT,
  ScrollTrigger,
} from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

const COPY = 'Welcome to One Capital';

type PreloaderProps = {
  /** Only run on the home route; SPA navigations back to `/` do not replay. */
  enabled?: boolean;
};

export function Preloader({ enabled = true }: PreloaderProps) {
  const reactId = useId().replace(/:/g, '');
  const maskGradId = `oc-preloader-mask-grad-${reactId}`;
  const maskId = `oc-preloader-mask-${reactId}`;

  const [active, setActive] = useState(() => {
    if (enabled && typeof document !== 'undefined') {
      document.documentElement.classList.add('oc-preloader-lock');
    }
    return enabled;
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const gradRef = useRef<SVGLinearGradientElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const finishedRef = useRef(false);
  const handedOffRef = useRef(false);

  /** Ensure shell is visible + listeners unblocked if we abort mid-intro. */
  const forceHandoff = () => {
    if (handedOffRef.current) return;
    handedOffRef.current = true;

    document.documentElement.classList.remove('oc-preloader-lock');
    window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
    lenisRef.current?.start();

    const shell = document.querySelector<HTMLElement>('.oc-shell');
    if (shell) {
      gsap.killTweensOf(shell);
      gsap.set(shell, { opacity: 1 });
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  // Leaving `/` mid-intro: kill overlay so the next route is not stuck behind it.
  useLayoutEffect(() => {
    if (enabled || !active) return;

    timelineRef.current?.kill();
    timelineRef.current = null;
    const root = rootRef.current;
    if (root) gsap.killTweensOf(root);
    if (gradRef.current) gsap.killTweensOf(gradRef.current);

    forceHandoff();
    finishedRef.current = true;
    setActive(false);
  }, [enabled, active]);

  useLayoutEffect(() => {
    if (!active) return;
    document.documentElement.classList.add('oc-preloader-lock');
    return () => {
      document.documentElement.classList.remove('oc-preloader-lock');
    };
  }, [active]);

  useLayoutEffect(() => {
    if (!active || !lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [active, lenis]);

  useGSAP(
    () => {
      if (!active) return;

      const root = rootRef.current;
      const text = textRef.current;
      const grad = gradRef.current;
      if (!root || !text || !grad) return;

      const shell = document.querySelector<HTMLElement>('.oc-shell');
      if (shell) gsap.set(shell, { opacity: 0 });

      const handoff = () => {
        if (handedOffRef.current) return;
        handedOffRef.current = true;

        document.documentElement.classList.remove('oc-preloader-lock');
        window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
        lenisRef.current?.start();

        // Navbar + page fade in together after welcome (Dezerv-style).
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
      // Mask gradient starts fully left of the type (entire line hidden).
      gsap.set(grad, { attr: { x1: -900, x2: -200 } });

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Soft L→R reveal: white trail + feathered edge, right stays invisible.
      tl.to(grad, {
        attr: { x1: 700, x2: 1400 },
        duration: 3.0,
        ease: 'power2.inOut',
      })
        .add(lockSolidWhite)
        .to({}, { duration: 0.35 })
        // Page + navbar become visible; welcome still covering briefly
        .add(handoff)
        // Welcome fades out as shell (nav + hero) rises in
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
          {/*
            Mask: white = visible, black = hidden.
            Soft feather matches the reference wipe (not a thin spotlight).
          */}
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
