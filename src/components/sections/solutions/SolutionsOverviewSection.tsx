import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { Button } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(useGSAP);

function SplitChars({
  text,
  attr,
}: {
  text: string;
  attr: 'data-char-h' | 'data-char-p';
}) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <span key={charIndex} {...{ [attr]: '' }}>
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span {...{ [attr]: '' }}>&nbsp;</span>
          )}
        </span>
      ))}
    </>
  );
}

// 3 Advisory Pillars
const PILLAR_CARDS = [
  {
    id: 'capital-strategy',
    href: '/solutions/capital-strategy',
    title: 'Strategic Asset Allocation: Risk & Capital Blueprint',
    description:
      'Before picking a single fund, we map your capital across equities, debt, and liquid reserves. A disciplined mandate built to compound steadily while eliminating emotional portfolio churn.',
    buttonText: 'Explore Strategic Allocation',
    image: '/images/solutions/capital-strategy-illustration.png',
    imageAlt: 'Strategic Asset Allocation: Risk & Capital Blueprint Illustration',
  },
  {
    id: 'portfolio-management',
    href: '/solutions/portfolio-management',
    title: 'Discretionary Portfolio Management: PMS & AIFs',
    description:
      'Direct equity portfolios of 18–25 high-conviction businesses held in your Demat, combined with curated pre-IPO and long-short AIFs. Complete transparency, active alpha, and quarterly rebalancing.',
    buttonText: 'Explore PMS & Alternative Funds',
    image: '/images/solutions/portfolio-management-illustration.png',
    imageAlt: 'Portfolio Management: Mutual Funds, PMS & AIFs Illustration',
  },
  {
    id: 'wealth-management',
    href: '/solutions/wealth-management',
    title: 'Total Wealth Governance: Tax, Liquidity & Succession',
    description:
      'Systematic tax-loss harvesting, emergency liquidity reserves, and multi-generational family estate structures ensure market volatility and lifecycle shifts never disrupt your legacy.',
    buttonText: 'Explore Wealth Governance',
    image: '/images/solutions/wealth-management-illustration.png',
    imageAlt: 'Wealth Management: Liquidity, Tax & Succession Illustration',
  },
];

interface PillarCardData {
  id: string;
  href: string;
  title: string;
  description: string;
  buttonText: string;
  image: string;
  imageAlt: string;
}

interface CardProps {
  card: PillarCardData;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ card, i, progress, range, targetScale }: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  // High-performance GPU transforms derived purely from parent progress (zero layout reflows)
  const rawScale = useTransform(progress, range, [1, targetScale]);
  const rawOverlayOpacity = useTransform(
    progress,
    range,
    [0, i < PILLAR_CARDS.length - 1 ? 0.16 : 0],
  );

  const scale = shouldReduceMotion ? 1 : rawScale;
  const overlayOpacity = shouldReduceMotion ? 0 : rawOverlayOpacity;

  // Stagger top offset so previous cards remain visible as a stacked deck
  const topOffset = `${i * 20}px`;

  return (
    <div
      className="h-screen flex items-center justify-center sticky top-0 pt-12 md:pt-16 px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${topOffset})`,
          transformOrigin: 'top center',
        }}
        className={cn(
          'pointer-events-auto relative flex flex-col w-full max-w-[1380px] min-h-[500px] lg:h-[560px] xl:h-[580px] rounded-[2rem] sm:rounded-[2.5rem] bg-white text-black border border-zinc-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.32)] p-6 sm:p-10 lg:p-14 overflow-hidden justify-center will-change-transform transform-gpu',
        )}
      >
        {/* Subtle dimming overlay as subsequent cards stack over this one */}
        {i < PILLAR_CARDS.length - 1 && (
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] bg-black z-20 will-change-opacity"
          />
        )}

        <div
          className={cn(
            'relative z-10 flex flex-col-reverse items-center justify-between gap-8 lg:gap-14 xl:gap-16 w-full h-full',
            i === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row',
          )}
        >
          {/* Text & Action Column */}
          <div className="flex flex-1 flex-col justify-center w-full lg:w-[48%]">
            <h3 className="text-2xl sm:text-3xl lg:text-[2.75rem] xl:text-[3.15rem] font-semibold tracking-tight leading-[1.14] text-black">
              {card.title}
            </h3>

            <p className="mt-5 text-base sm:text-lg lg:text-xl text-zinc-600 font-light leading-relaxed max-w-xl">
              {card.description}
            </p>

            <div className="mt-8 sm:mt-10">
              <Button
                to={card.href}
                variant="primary"
                size="md"
                arrow="up-right"
                className="bg-black text-white oc-btn-stroke--on-black hover:bg-zinc-800 shadow-md font-medium text-xs tracking-wider"
              >
                <span>{card.buttonText}</span>
              </Button>
            </div>
          </div>

          {/* Graphic / Illustration Column with dedicated GPU layer */}
          <div className="relative shrink-0 w-full lg:w-[48%] h-[280px] sm:h-[360px] lg:h-full min-h-[300px] rounded-2xl lg:rounded-3xl flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
            <img
              src={card.image}
              alt={card.imageAlt}
              loading="eager"
              decoding="async"
              className="h-full w-full max-h-[460px] object-contain object-center transition-transform duration-700 hover:scale-105 transform-gpu drop-shadow-[0_12px_28px_rgba(0,0,0,0.06)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const HEADING_LINE_1 = 'Stop Collecting Random Funds.';
const HEADING_LINE_2 = 'Start Building Real Wealth.';
const SUBTITLE =
  'Most portfolios hold 20+ duplicate schemes with zero unified strategy. We bring asset allocation, direct equity, and downside protection under one disciplined plan.';

export function SolutionsOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const headingChars = header.querySelectorAll<HTMLElement>('[data-char-h]');
      const bodyChars = header.querySelectorAll<HTMLElement>('[data-char-p]');
      if (!headingChars.length && !bodyChars.length) return;

      const DIM = 'rgba(255, 255, 255, 0.22)';
      const LIT_HEADING = '#ffffff';
      const LIT_BODY = 'rgba(255, 255, 255, 0.85)';

      if (prefersReducedMotion()) {
        gsap.set(headingChars, { color: LIT_HEADING });
        gsap.set(bodyChars, { color: LIT_BODY });
        return;
      }

      gsap.set(headingChars, { color: DIM });
      gsap.set(bodyChars, { color: DIM });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: 'top 75%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      tl.to(headingChars, {
        color: LIT_HEADING,
        ease: 'none',
        stagger: 0.05,
      });

      tl.to(
        bodyChars,
        {
          color: LIT_BODY,
          ease: 'none',
          stagger: 0.02,
        },
        '-=0.15',
      );
    },
    { scope: headerRef },
  );

  return (
    <section
      aria-labelledby="solutions-overview-heading"
      className="relative flex w-full flex-col items-center bg-black pt-20 pb-0 md:pt-32 md:pb-0 text-white border-y border-white/10"
    >
      {/* ─── SECTION HEADER WITH SCROLL COLOR FILL SCRUB ─── */}
      <div
        ref={headerRef}
        className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-14"
      >
        <h2
          id="solutions-overview-heading"
          className="text-[2.2rem] sm:text-[3.25rem] lg:text-[4rem] font-medium tracking-tight leading-[1.1] text-white/20 select-none"
        >
          <span className="sr-only">
            {HEADING_LINE_1} {HEADING_LINE_2}
          </span>
          <span aria-hidden="true" className="block">
            <SplitChars text={HEADING_LINE_1} attr="data-char-h" />
          </span>
          <span aria-hidden="true" className="block mt-1 sm:mt-2">
            <SplitChars text={HEADING_LINE_2} attr="data-char-h" />
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/20 font-light max-w-2xl mx-auto leading-relaxed">
          <span className="sr-only">{SUBTITLE}</span>
          <span aria-hidden="true">
            <SplitChars text={SUBTITLE} attr="data-char-p" />
          </span>
        </p>
      </div>

      {/* ─── STACKED CARDS CONTAINER ─── */}
      <div ref={containerRef} className="relative w-full pb-[23vh]">
        {PILLAR_CARDS.map((card, i) => {
          // Card 0 scales as Card 1 arrives; Card 1 scales as Card 2 arrives; Card 2 stays 1.0
          const targetScale = 1 - (PILLAR_CARDS.length - 1 - i) * 0.05;
          const range: [number, number] =
            i === 0 ? [0, 0.4] : i === 1 ? [0.35, 0.75] : [0.7, 1];

          return (
            <Card
              key={card.id}
              card={card}
              i={i}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
