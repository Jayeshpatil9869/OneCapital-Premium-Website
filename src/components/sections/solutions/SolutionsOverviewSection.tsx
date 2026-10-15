import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { Button } from '@/src/components/ui';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { cn } from '@/src/lib/utils';

// 3 Advisory Pillars
const PILLAR_CARDS = [
  {
    id: 'capital-strategy',
    href: '/solutions/capital-strategy',
    title: 'Strategic Asset Allocation: Risk & Capital Blueprint',
    description:
      'Before picking a single fund, we map your capital across equities, debt, and liquid reserves. A disciplined mandate built to compound steadily while eliminating emotional portfolio churn.',
    buttonText: 'Explore Strategic Allocation',
    image: '/images/solutions/capital-strategy-illustration.jpg',
    imageAlt: 'Strategic Asset Allocation: Risk & Capital Blueprint Illustration',
  },
  {
    id: 'portfolio-management',
    href: '/solutions/portfolio-management',
    title: 'Discretionary Portfolio Management: PMS & AIFs',
    description:
      'Direct equity portfolios of 18–25 high-conviction businesses held in your Demat, combined with curated pre-IPO and long-short AIFs. Complete transparency, active alpha, and quarterly rebalancing.',
    buttonText: 'Explore PMS & Alternative Funds',
    image: '/images/solutions/portfolio-management-illustration.jpg',
    imageAlt: 'Portfolio Management: Mutual Funds, PMS & AIFs Illustration',
  },
  {
    id: 'wealth-management',
    href: '/solutions/wealth-management',
    title: 'Total Wealth Governance: Tax, Liquidity & Succession',
    description:
      'Systematic tax-loss harvesting, emergency liquidity reserves, and multi-generational family estate structures ensure market volatility and lifecycle shifts never disrupt your legacy.',
    buttonText: 'Explore Wealth Governance',
    image: '/images/solutions/wealth-management-illustration.jpg',
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

export function SolutionsOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      aria-labelledby="solutions-overview-heading"
      className="relative flex w-full flex-col items-center bg-black pt-20 pb-0 md:pt-32 md:pb-0 text-white border-y border-white/10"
    >
      {/* ─── SECTION HEADER ─── */}
      <ScrollFade className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-14">
        <h2
          id="solutions-overview-heading"
          className="text-[2.2rem] sm:text-[3.25rem] lg:text-[4rem] font-medium tracking-tight leading-[1.1] text-white"
        >
          <span className="block">Stop Collecting Random Funds.</span>
          <span className="block">Start Building Real Wealth.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto">
          Most portfolios hold 20+ duplicate schemes with zero unified strategy. We bring asset allocation, direct equity, and downside protection under one disciplined plan.
        </p>
      </ScrollFade>

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
