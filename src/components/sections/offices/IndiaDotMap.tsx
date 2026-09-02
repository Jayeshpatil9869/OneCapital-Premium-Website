import { useRef, useState } from 'react';
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
  fromVars: gsap.TweenVars;
  toVars: gsap.TweenVars;
};

const TOOLTIP_CONFIGS: Record<string, TooltipConfig> = {
  // Mumbai: positioned ABOVE-LEFT of marker (inside red box)
  mumbai: {
    className:
      'pointer-events-none absolute bottom-full right-[-5rem] mb-3 z-50 w-[min(17rem,calc(100vw-3rem))]',
    fromVars: { opacity: 0, y: 18, scale: 0.94 },
    toVars: { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
  },
  // Pune: positioned to the RIGHT of marker
  pune: {
    className:
      'pointer-events-none absolute left-full top-0 ml-3 z-50 w-[min(17rem,calc(100vw-3rem))]',
    fromVars: { opacity: 0, x: -18, scale: 0.94 },
    toVars: { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
  },
  // Kolhapur: positioned to the RIGHT of marker (inside red box screenshot)
  kolhapur: {
    className:
      'pointer-events-none absolute left-full top-0 ml-3 z-50 w-[min(17rem,calc(100vw-3rem))]',
    fromVars: { opacity: 0, x: -18, scale: 0.94 },
    toVars: { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
  },
  // Nashik: positioned ABOVE marker
  nashik: {
    className:
      'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-[min(17rem,calc(100vw-3rem))]',
    fromVars: { opacity: 0, y: 18, scale: 0.94 },
    toVars: { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
  },
};

function OfficeMarkerItem({
  office,
  isHovered,
  onHover,
  onLeave,
}: {
  office: OfficeLocation;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  const config = TOOLTIP_CONFIGS[office.id] ?? {
    className:
      'pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-[min(17rem,calc(100vw-3rem))]',
    fromVars: { opacity: 0, y: 14, scale: 0.94 },
    toVars: { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
  };

  useGSAP(
    () => {
      if (isHovered) {
        if (tooltipRef.current) {
          gsap.killTweensOf(tooltipRef.current);
          gsap.fromTo(tooltipRef.current, config.fromVars, config.toVars);
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
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
          onHover={() => setHoveredId(office.id)}
          onLeave={() => setHoveredId(null)}
        />
      ))}
    </div>
  );
}
