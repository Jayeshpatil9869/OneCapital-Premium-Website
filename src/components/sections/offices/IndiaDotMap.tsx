import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import type { OfficeLocation } from '@/src/data/office-locations';

import { cn } from '@/src/lib/utils';

type IndiaDotMapProps = {
  offices: OfficeLocation[];
  className?: string;
};

type TooltipConfig = {
  className: string;
  /** From sm up, sit to the right of the marker. Mobile always sits above. */
  smSide: boolean;
  fromVars: gsap.TweenVars;
  toVars: gsap.TweenVars;
};

/** West-coast markers center the card off the left edge of the phone. */
const MOBILE_TOOLTIP_NUDGE = '5rem';
const MOBILE_MAP_QUERY = '(max-width: 639px)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
/** Long enough to read the quote, then the active dot steps south. */
const CYCLE_MS = 4500;

type CycleMode = 'pin' | 'release' | 'jump';

function isFinePointer() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function tooltipShift(smSide: boolean) {
  const mobile = window.matchMedia(MOBILE_MAP_QUERY).matches;
  return {
    x: mobile ? MOBILE_TOOLTIP_NUDGE : 0,
    xPercent: !mobile && smSide ? 0 : -50,
  };
}

/** North to south: Nashik, Mumbai, Pune, Kolhapur. */
function northToSouth(offices: OfficeLocation[]) {
  return [...offices].sort((a, b) => a.mapY - b.mapY || a.mapX - b.mapX);
}

const ABOVE_MARKER =
  'pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-[min(17rem,calc(100vw-3rem))] max-w-[calc(100vw-2rem)] max-sm:translate-x-[calc(-50%+5rem)] sm:-translate-x-1/2';

const ABOVE_THEN_SIDE =
  'pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-[min(17rem,calc(100vw-3rem))] max-w-[calc(100vw-2rem)] max-sm:translate-x-[calc(-50%+5rem)] sm:bottom-auto sm:left-full sm:top-0 sm:mb-0 sm:ml-3 sm:translate-x-0';

const TOOLTIP_MOTION = {
  fromVars: { opacity: 0, y: 18, scale: 0.94 },
  toVars: { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
} as const;

const TOOLTIP_CONFIGS: Record<string, TooltipConfig> = {
  mumbai: { className: ABOVE_MARKER, smSide: false, ...TOOLTIP_MOTION },
  pune: { className: ABOVE_THEN_SIDE, smSide: true, ...TOOLTIP_MOTION },
  kolhapur: { className: ABOVE_THEN_SIDE, smSide: true, ...TOOLTIP_MOTION },
  nashik: { className: ABOVE_MARKER, smSide: false, ...TOOLTIP_MOTION },
};

function OfficeMarkerItem({
  office,
  isHovered,
  onHover,
  onLeave,
  onSelect,
}: {
  office: OfficeLocation;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const pointerFocus = useRef(false);

  const config = TOOLTIP_CONFIGS[office.id] ?? {
    className: ABOVE_MARKER,
    smSide: false,
    fromVars: { opacity: 0, y: 14, scale: 0.94 },
    toVars: { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
  };

  useEffect(() => {
    const query = window.matchMedia(MOBILE_MAP_QUERY);
    const apply = () => {
      if (!isHovered || !tooltipRef.current) return;
      gsap.set(tooltipRef.current, tooltipShift(config.smSide));
    };
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [isHovered, config.smSide]);

  useGSAP(
    () => {
      const { x, xPercent } = tooltipShift(config.smSide);

      if (isHovered) {
        if (tooltipRef.current) {
          gsap.killTweensOf(tooltipRef.current);
          gsap.fromTo(
            tooltipRef.current,
            { ...config.fromVars, x, xPercent },
            { ...config.toVars, x, xPercent },
          );
        }
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            scale: 1.15,
            duration: 0.25,
            ease: 'power2.out',
          });
        }
        if (ringRef.current) {
          gsap.fromTo(
            ringRef.current,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            },
          );
        }
      } else {
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          });
        }
        if (ringRef.current) {
          gsap.to(ringRef.current, {
            scale: 0.6,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
          });
        }
      }
    },
    { dependencies: [isHovered], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200',
        isHovered ? 'z-40' : 'z-10',
      )}
      style={{ left: `${office.mapX}%`, top: `${office.mapY}%` }}
    >
      {isHovered && (
        <div
          ref={tooltipRef}
          id={`${office.id}-tooltip`}
          className={config.className}
          role="tooltip"
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/85 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl backdrop-saturate-150">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <p className="text-xs md:text-sm leading-relaxed text-white/80 italic font-light">
              &ldquo;{office.quote}&rdquo;
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-0.5">
              <p className="text-sm font-medium text-white tracking-tight">
                {office.headline}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs font-medium text-white/50">
                  {office.city}, {office.region}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={`${office.city} office`}
        aria-describedby={isHovered ? `${office.id}-tooltip` : undefined}
        className="relative flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black group"
        onPointerDown={() => {
          pointerFocus.current = true;
        }}
        onMouseEnter={() => {
          if (!isFinePointer()) return;
          onHover();
        }}
        onMouseLeave={() => {
          if (!isFinePointer()) return;
          onLeave();
        }}
        onFocus={() => {
          if (pointerFocus.current || !isFinePointer()) return;
          onHover();
        }}
        onBlur={() => {
          pointerFocus.current = false;
          if (!isFinePointer()) return;
          onLeave();
        }}
        onClick={(e) => {
          if (isFinePointer()) return;
          e.stopPropagation();
          onSelect();
        }}
      >
        {/* Concentric outer ring (Image 2 hover state) */}
        <span
          ref={ringRef}
          className="absolute inline-flex h-9 w-9 rounded-full border border-white/80 pointer-events-none opacity-0 scale-75"
          aria-hidden
        />

        {/* Solid filled central dot (Image 1 normal state) */}
        <span
          ref={dotRef}
          className="relative inline-flex h-3.5 w-3.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          aria-hidden
        />
      </button>
    </div>
  );
}

export function IndiaDotMap({ offices, className }: IndiaDotMapProps) {
  const cycle = useMemo(() => northToSouth(offices), [offices]);
  const [hoveredId, setHoveredId] = useState<string | null>(() => northToSouth(offices)[0]?.id ?? null);
  const hoveredIdRef = useRef(hoveredId);
  const pickRef = useRef<(id: string, mode: CycleMode) => void>(() => {});
  hoveredIdRef.current = hoveredId;

  useEffect(() => {
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer = 0;
    let paused = false;
    let index = Math.max(
      0,
      cycle.findIndex((office) => office.id === hoveredIdRef.current),
    );

    const clear = () => window.clearInterval(timer);

    const publish = (next: number) => {
      if (cycle.length === 0) return;
      index = (next + cycle.length) % cycle.length;
      setHoveredId(cycle[index].id);
    };

    const startTimer = () => {
      clear();
      if (paused || reduceQuery.matches || cycle.length < 2 || document.hidden) return;
      timer = window.setInterval(() => publish(index + 1), CYCLE_MS);
    };

    const arm = (next: number) => {
      paused = false;
      if (cycle.length === 0) return;
      publish(next);
      startTimer();
    };

    pickRef.current = (id: string, mode: CycleMode) => {
      const found = cycle.findIndex((office) => office.id === id);
      if (mode === 'pin') {
        paused = true;
        clear();
        if (found !== -1) publish(found);
        return;
      }
      if (mode === 'release') {
        paused = false;
        startTimer();
        return;
      }
      arm(found === -1 ? index : found);
    };

    const onReduceOrVisibility = () => {
      if (document.hidden) {
        clear();
        return;
      }
      startTimer();
    };

    arm(index);
    reduceQuery.addEventListener('change', onReduceOrVisibility);
    document.addEventListener('visibilitychange', onReduceOrVisibility);

    return () => {
      clear();
      pickRef.current = () => {};
      reduceQuery.removeEventListener('change', onReduceOrVisibility);
      document.removeEventListener('visibilitychange', onReduceOrVisibility);
    };
  }, [cycle]);

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[36rem] overflow-visible md:max-w-[40rem]',
        className,
      )}
      role="img"
      aria-label="Map of India showing OneCapital office locations"
    >
      <div
        aria-hidden
        className="h-full w-full bg-white [mask-image:url('/images/india-dot-map.png')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url('/images/india-dot-map.png')] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
      />

      {offices.map((office) => (
        <OfficeMarkerItem
          key={office.id}
          office={office}
          isHovered={hoveredId === office.id}
          onHover={() => pickRef.current(office.id, 'pin')}
          onLeave={() => pickRef.current(office.id, 'release')}
          onSelect={() => pickRef.current(office.id, 'jump')}
        />
      ))}
    </div>
  );
}
