import { useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(useGSAP);

export type WealthCollageVisualProps = {
  netWorthLabel?: string;
  netWorthValue: string;
  netWorthSub: string;
  returnsLabel?: string;
  returnsValue: string;
  /** Show upward arrow when the figure is a positive return (default true). */
  returnsTrend?: boolean;
  advisorImage: string;
  advisorAlt: string;
  advisorCta?: string;
  advisorHref?: string;
  className?: string;
};

/**
 * Savvy-style right-column collage only (graph + floating cards).
 * Markup/layout in `_wealth-collage.scss`; tokens from `--oc-color-*`.
 */
export function WealthCollageVisual({
  netWorthLabel = 'Portfolio value',
  netWorthValue,
  netWorthSub,
  returnsLabel = 'Returns',
  returnsValue,
  returnsTrend = true,
  advisorImage,
  advisorAlt,
  advisorCta = 'Chat with an advisor',
  advisorHref = '/contact',
  className,
}: WealthCollageVisualProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const gradId = `oc-wealth-area-${useId().replace(/:/g, '')}`;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const floaters = root.querySelectorAll<HTMLElement>('[data-float]');
      floaters.forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -8 : 6,
          duration: 2.8 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.25,
        });
      });

      const line = lineRef.current;
      if (line) {
        const length = line.getTotalLength();
        gsap.fromTo(
          line,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: 'power2.out',
            delay: 0.15,
          },
        );
      }
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={cn('oc-wealth-collage', className)}
      data-oc-wealth-collage
      aria-hidden="true"
    >
      <div className="oc-wealth-collage__plane" />

      {/* Growth chart — adapted from Savvy right-column SVG */}
      <div className="oc-wealth-collage__chart-wrap">
        <svg
          className="oc-wealth-collage__chart"
          viewBox="0 0 800 500"
          preserveAspectRatio="none"
          role="presentation"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EADDCE" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#EADDCE" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M -50 450 L -10 430 L 30 440 L 70 380 L 110 390 L 150 320 L 190 350 L 230 280 L 270 290 L 310 210 L 350 240 L 390 180 L 430 200 L 470 120 L 510 160 L 550 90 L 590 110 L 630 40 L 670 70 L 710 -20 L 750 10 L 850 -50 L 850 550 L -50 550 Z"
            fill={`url(#${gradId})`}
          />
          <path
            ref={lineRef}
            d="M -50 450 L -10 430 L 30 440 L 70 380 L 110 390 L 150 320 L 190 350 L 230 280 L 270 290 L 310 210 L 350 240 L 390 180 L 430 200 L 470 120 L 510 160 L 550 90 L 590 110 L 630 40 L 670 70 L 710 -20 L 750 10 L 850 -50"
            fill="none"
            stroke="#D3C9BA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="oc-wealth-collage__stage">
        <div data-float className="oc-wealth-collage__net">
          <p className="oc-wealth-collage__net-label">{netWorthLabel}</p>
          <p className="oc-wealth-collage__net-value">{netWorthValue}</p>
          <p className="oc-wealth-collage__net-sub">{netWorthSub}</p>
        </div>

        <div data-float className="oc-wealth-collage__returns">
          <p className="oc-wealth-collage__returns-label">{returnsLabel}</p>
          <p className="oc-wealth-collage__returns-value">
            {returnsTrend ? (
              <ArrowUp
                className="oc-wealth-collage__trend-icon"
                strokeWidth={1.75}
                aria-hidden
              />
            ) : null}
            <span>{returnsValue}</span>
          </p>
        </div>

        <Link
          data-float
          to={advisorHref}
          className="oc-wealth-collage__advisor"
          tabIndex={-1}
        >
          <span className="oc-wealth-collage__avatar-wrap">
            <img
              src={advisorImage}
              alt={advisorAlt}
              className="oc-wealth-collage__avatar"
              loading="eager"
              decoding="async"
            />
            <span className="oc-wealth-collage__online" aria-hidden />
          </span>
          <span className="oc-wealth-collage__chat-label">{advisorCta}</span>
          <ArrowUpRight
            className="oc-wealth-collage__chat-icon"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
