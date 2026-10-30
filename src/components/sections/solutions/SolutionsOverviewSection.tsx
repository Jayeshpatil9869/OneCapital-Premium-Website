import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { Button, Eyebrow } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';
import { WealthCollageVisual } from './WealthCollageVisual';

gsap.registerPlugin(useGSAP);

/** Sticky stack only at lg+ (1024) — matches Sass + Tailwind. */
function useDesktopCardStack() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return enabled;
}

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

type CollageConfig = {
  netWorthValue: string;
  netWorthSub: string;
  returnsLabel?: string;
  returnsValue: string;
  returnsTrend?: boolean;
  advisorImage: string;
  advisorAlt: string;
};

interface PillarCardData {
  id: string;
  href: string;
  title: string;
  description: string;
  buttonText: string;
  collage: CollageConfig;
}

const PILLAR_CARDS: PillarCardData[] = [
  {
    id: 'capital-strategy',
    href: '/solutions/capital-strategy',
    title: 'Your Partner in Long-Term Wealth Creation.',
    description:
      'Your financial journey deserves a smarter beginning. Invest consistently in mutual funds and give your long-term goals an opportunity to grow.',
    buttonText: 'Explore Strategic Allocation',
    collage: {
      netWorthValue: '₹45,75,000',
      netWorthSub: 'Illustrative allocation view',
      returnsValue: '7.82%',
      advisorImage: '/images/team/prasad-satare.jpg',
      advisorAlt: 'One Capital advisor',
    },
  },
  {
    id: 'portfolio-management',
    href: '/solutions/portfolio-management',
    title: 'Discretionary Portfolio Management: PMS & AIFs',
    description:
      'Direct equity portfolios of 18–25 high-conviction businesses held in your Demat, combined with curated pre-IPO and long-short AIFs. Complete transparency, active alpha, and quarterly rebalancing.',
    buttonText: 'Explore PMS & Alternative Funds',
    collage: {
      netWorthValue: '₹2.1 Cr+',
      netWorthSub: 'Illustrative PMS sleeve',
      returnsValue: '12.4%',
      advisorImage: '/images/team/ramkumar-agrawal.jpg',
      advisorAlt: 'One Capital portfolio advisor',
    },
  },
  {
    id: 'wealth-management',
    href: '/solutions/wealth-management',
    title: 'Total Wealth Governance: Tax, Liquidity & Succession',
    description:
      'Systematic tax-loss harvesting, emergency liquidity reserves, and multi-generational family estate structures ensure market volatility and lifecycle shifts never disrupt your legacy.',
    buttonText: 'Explore Wealth Governance',
    collage: {
      netWorthValue: 'Family office',
      netWorthSub: 'Liquidity · tax · succession',
      returnsLabel: 'Focus',
      returnsValue: 'On plan',
      returnsTrend: false,
      advisorImage: '/images/team/director.jpg',
      advisorAlt: 'One Capital wealth advisor',
    },
  },
];

interface CardProps {
  card: PillarCardData;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  stack: boolean;
}

function Card({ card, i, progress, range, targetScale, stack }: CardProps) {
  const shouldReduceMotion = useReducedMotion();

  const rawScale = useTransform(progress, range, [1, targetScale]);
  const rawOverlayOpacity = useTransform(
    progress,
    range,
    [0, i < PILLAR_CARDS.length - 1 ? 0.16 : 0],
  );

  const scale = shouldReduceMotion || !stack ? 1 : rawScale;
  const overlayOpacity = shouldReduceMotion || !stack ? 0 : rawOverlayOpacity;
  const topOffset = stack ? `${i * 20}px` : '0px';

  return (
    <div className={cn('oc-pillar-slot', !stack && 'oc-pillar-slot--static')}>
      <motion.div
        style={{
          scale,
          top: topOffset,
          transformOrigin: 'top center',
        }}
        className="oc-pillar-card"
      >
        {stack && i < PILLAR_CARDS.length - 1 && (
          <motion.div style={{ opacity: overlayOpacity }} className="oc-pillar-overlay" />
        )}

        <div className={cn('oc-pillar-grid', i === 1 && 'oc-pillar-grid--flip')}>
          <div className="oc-pillar-copy">
            <h3 className="font-sans text-[1.25rem] font-semibold leading-[1.15] tracking-tight text-black sm:text-2xl lg:text-[2.55rem] lg:leading-[1.12] xl:text-[2.95rem]">
              {card.title}
            </h3>

            <p className="mt-2 max-w-xl text-[0.8125rem] font-light leading-snug text-black/60 sm:mt-4 sm:text-base lg:mt-5 lg:text-lg lg:leading-relaxed xl:text-xl">
              {card.description}
            </p>

            <div className="mt-3 sm:mt-6 lg:mt-8">
              <Button
                to={card.href}
                variant="primary"
                size="md"
                arrow="up-right"
                className="oc-btn-stroke--on-black h-auto w-full max-w-full bg-black text-xs font-medium tracking-wider text-white shadow-md hover:bg-zinc-800 lg:w-auto [&_.oc-btn-label]:w-full lg:[&_.oc-btn-label]:w-auto [&_.oc-btn-label>span]:min-w-0 [&_.oc-btn-label>span]:whitespace-normal [&_.oc-btn-label>span]:text-balance"
              >
                <span>{card.buttonText}</span>
              </Button>
            </div>
          </div>

          <div className="oc-pillar-visual">
            <WealthCollageVisual
              netWorthValue={card.collage.netWorthValue}
              netWorthSub={card.collage.netWorthSub}
              returnsLabel={card.collage.returnsLabel}
              returnsValue={card.collage.returnsValue}
              returnsTrend={card.collage.returnsTrend}
              advisorImage={card.collage.advisorImage}
              advisorAlt={card.collage.advisorAlt}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const HEADING_LINE_1 = 'Wealth Is More Than Capital.';
const HEADING_LINE_2 = "It's A Legacy In The Making.";

export function SolutionsOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stack = useDesktopCardStack();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;

      const headingChars = header.querySelectorAll<HTMLElement>('[data-char-h]');
      if (!headingChars.length) return;

      const DIM = 'rgba(255, 255, 255, 0.22)';
      const LIT_HEADING = '#ffffff';

      if (prefersReducedMotion()) {
        gsap.set(headingChars, { color: LIT_HEADING });
        return;
      }

      gsap.set(headingChars, { color: DIM });

      gsap.to(headingChars, {
        color: LIT_HEADING,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: {
          trigger: header,
          start: 'top 75%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });
    },
    { scope: headerRef },
  );

  return (
    <section
      aria-labelledby="solutions-overview-heading"
      className="relative flex w-full flex-col items-center border-y border-white/10 bg-black pb-0 pt-20 text-white md:pb-0 md:pt-32"
    >
      <div
        ref={headerRef}
        className="mx-auto mb-8 w-full max-w-5xl px-4 text-center sm:mb-14 sm:px-6 lg:px-8"
      >
        <Eyebrow centered className="mb-4 text-white/60 sm:mb-6">
          Who We Are
        </Eyebrow>
        <h2
          id="solutions-overview-heading"
          className="select-none text-[2.2rem] font-medium leading-[1.1] tracking-tight text-white/20 sm:text-[3.25rem] lg:text-[4rem]"
        >
          <span className="sr-only">
            {HEADING_LINE_1} {HEADING_LINE_2}
          </span>
          <span aria-hidden="true" className="block">
            <SplitChars text={HEADING_LINE_1} attr="data-char-h" />
          </span>
          <span aria-hidden="true" className="mt-1 block sm:mt-2">
            <SplitChars text={HEADING_LINE_2} attr="data-char-h" />
          </span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className={cn('relative w-full', stack ? 'pb-[23vh]' : 'flex flex-col gap-6 pb-16 sm:gap-8')}
      >
        {PILLAR_CARDS.map((card, i) => {
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
              stack={stack}
            />
          );
        })}
      </div>
    </section>
  );
}
