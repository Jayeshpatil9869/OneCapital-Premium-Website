import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import type { OfficeLocation } from '@/src/data/office-locations';

import { cn } from '@/src/lib/utils';

type IndiaDotMapProps = {
  offices: OfficeLocation[];
  className?: string;
};

const MOBILE_MAP_QUERY = '(max-width: 639px)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
/** Long enough to read the quote, then the active dot steps south. */
const CYCLE_MS = 4500;

type CycleMode = 'pin' | 'release' | 'jump';
type TooltipSide = 'right' | 'left' | 'above';

function isFinePointer() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function isMobileMap() {
  return window.matchMedia(MOBILE_MAP_QUERY).matches;
}

/** North to south: Nashik, Mumbai, Pune, Kolhapur. */
function northToSouth(offices: OfficeLocation[]) {
  return [...offices].sort((a, b) => a.mapY - b.mapY || a.mapX - b.mapX);
}

/**
 * Pick a side relative to the marker so the card stays inside the map box.
 * Absolute positioning only — scrolls with the page (no fixed / portal / parallax).
 */
function pickTooltipSide(
  map: HTMLElement,
  marker: HTMLElement,
  tipW: number,
): TooltipSide {
  if (isMobileMap()) return 'above';

  const mapR = map.getBoundingClientRect();
  const m = marker.getBoundingClientRect();
  const pad = 12;
  const need = tipW + 20;

  const roomRight = mapR.right - m.right - pad;
  const roomLeft = m.left - mapR.left - pad;

  if (roomRight >= need) return 'right';
  if (roomLeft >= need) return 'left';
  return 'above';
}

const SIDE_CLASS: Record<TooltipSide, string> = {
  right:
    'absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 w-[min(16.5rem,calc(100vw-2.5rem))]',
  left:
    'absolute right-full top-1/2 z-50 mr-3 -translate-y-1/2 w-[min(16.5rem,calc(100vw-2.5rem))]',
  above:
    'absolute bottom-full left-1/2 z-50 mb-3 w-[min(16.5rem,calc(100vw-2.5rem))] -translate-x-1/2',
};

/** West-coast MH cities — centered tip clips the left edge on phones. */
const MOBILE_SHIFT_RIGHT_IDS = new Set(['nashik', 'pune', 'kolhapur']);

function mobileAboveClass(officeId: string): string {
  if (MOBILE_SHIFT_RIGHT_IDS.has(officeId)) {
    // Anchor near marker, bias right so the card stays on-screen.
    return 'absolute bottom-full left-0 z-50 mb-3 ml-1 w-[min(16.5rem,calc(100vw-2.75rem))]';
  }
  return SIDE_CLASS.above;
}

const TOOLTIP_MOTION = {
  fromVars: { opacity: 0, y: 10, scale: 0.96 },
  toVars: { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
} as const;

function OfficeMarkerItem({
  office,
  isHovered,
  mapRef,
  onHover,
  onLeave,
  onSelect,
}: {
  office: OfficeLocation;
  isHovered: boolean;
  mapRef: RefObject<HTMLDivElement | null>;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const pointerFocus = useRef(false);
  const [tooltipSide, setTooltipSide] = useState<TooltipSide>('right');

  useLayoutEffect(() => {
    if (!isHovered) return;

    const apply = () => {
      const tip = tooltipRef.current;
      const marker = containerRef.current;
      const map = mapRef.current;
      if (!tip || !marker || !map) return;
      const tipW = tip.offsetWidth || 264;
      setTooltipSide(pickTooltipSide(map, marker, tipW));

      // Mobile: keep tip inside the viewport (west offices bias right).
      if (!isMobileMap()) {
        tip.style.marginLeft = '';
        return;
      }
      tip.style.marginLeft = '';
      const pad = 10;
      const tipR = tip.getBoundingClientRect();
      let shift = 0;
      if (tipR.left < pad) shift = pad - tipR.left;
      else if (tipR.right > window.innerWidth - pad) {
        shift = window.innerWidth - pad - tipR.right;
      }
      if (shift !== 0) tip.style.marginLeft = `${shift}px`;
    };

    apply();
    const raf = requestAnimationFrame(apply);
    window.addEventListener('resize', apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', apply);
      if (tooltipRef.current) tooltipRef.current.style.marginLeft = '';
    };
  }, [isHovered, office.id, mapRef]);

  useGSAP(
    () => {
      if (isHovered) {
        if (tooltipRef.current) {
          gsap.killTweensOf(tooltipRef.current);
          gsap.fromTo(
            tooltipRef.current,
            { ...TOOLTIP_MOTION.fromVars },
            { ...TOOLTIP_MOTION.toVars },
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
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute z-20 hidden items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all duration-300 select-none sm:flex',
          office.id === 'mumbai' || office.id === 'kolhapur'
            ? 'right-full mr-2.5 top-1/2 -translate-y-1/2'
            : 'left-full ml-2.5 top-1/2 -translate-y-1/2',
          isHovered
            ? 'opacity-0 scale-90 pointer-events-none'
            : 'opacity-100 scale-100 bg-[#181818]/90 text-white/85 border border-white/15 backdrop-blur-md shadow-md',
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span>{office.city}</span>
      </span>

      {isHovered && (
        <div
          ref={tooltipRef}
          id={`${office.id}-tooltip`}
          className={cn(
            'pointer-events-none',
            tooltipSide === 'above' && isMobileMap()
              ? mobileAboveClass(office.id)
              : SIDE_CLASS[tooltipSide],
          )}
          role="tooltip"
        >
          {tooltipSide === 'right' && (
            <div
              aria-hidden="true"
              className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 w-3 h-px bg-gradient-to-l from-white/30 via-emerald-400/50 to-transparent"
            />
          )}
          {tooltipSide === 'left' && (
            <div
              aria-hidden="true"
              className="hidden sm:block absolute left-full top-1/2 -translate-y-1/2 w-3 h-px bg-gradient-to-r from-white/30 via-emerald-400/50 to-transparent"
            />
          )}

          <div className="relative overflow-hidden rounded-xl border border-white/20 bg-[#161616]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
              <p className="text-sm font-semibold text-white tracking-tight">
                {office.headline}
              </p>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-neutral-300 font-light">
              {office.quote}
            </p>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <span>
                {office.city}, {office.region}
              </span>
              <span className="text-emerald-400 font-medium shrink-0">Active Office</span>
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
        <span
          ref={ringRef}
          className="absolute inline-flex h-9 w-9 rounded-full border border-white/80 pointer-events-none opacity-0 scale-75"
          aria-hidden
        />
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
  const mapRef = useRef<HTMLDivElement>(null);
  const cycle = useMemo(() => northToSouth(offices), [offices]);
  const [hoveredId, setHoveredId] = useState<string | null>(
    () => northToSouth(offices)[0]?.id ?? null,
  );
  const [mapInView, setMapInView] = useState(true);
  const hoveredIdRef = useRef(hoveredId);
  const mapInViewRef = useRef(true);
  const pickRef = useRef<(id: string, mode: CycleMode) => void>(() => {});
  hoveredIdRef.current = hoveredId;
  mapInViewRef.current = mapInView;

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.12;
        mapInViewRef.current = visible;
        setMapInView(visible);
      },
      { threshold: [0, 0.12, 0.25] },
    );
    io.observe(map);
    return () => io.disconnect();
  }, []);

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
      if (
        paused ||
        !mapInViewRef.current ||
        reduceQuery.matches ||
        cycle.length < 2 ||
        document.hidden
      ) {
        return;
      }
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

  // Pause auto-cycle when map leaves view (no floating card over nav/FAQ).
  useEffect(() => {
    if (!mapInView) return;
    // Restart cycle when map returns
    pickRef.current(hoveredIdRef.current ?? cycle[0]?.id ?? '', 'release');
  }, [mapInView, cycle]);

  return (
    <div
      ref={mapRef}
      data-india-map
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
          mapRef={mapRef}
          isHovered={mapInView && hoveredId === office.id}
          onHover={() => pickRef.current(office.id, 'pin')}
          onLeave={() => pickRef.current(office.id, 'release')}
          onSelect={() => pickRef.current(office.id, 'jump')}
        />
      ))}
    </div>
  );
}
