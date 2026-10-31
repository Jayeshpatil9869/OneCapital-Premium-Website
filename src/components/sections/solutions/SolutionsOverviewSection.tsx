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
import { Button, Eyebrow } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';
import { HOME_SEO } from '@/src/data/home-seo';
import { WealthCollageVisual } from './WealthCollageVisual';

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
      netWorthValue: '₹0.46 Cr',
      netWorthSub: 'Illustrative allocation view',
      returnsValue: '7.82%',
      advisorImage: '/images/clients/client-man-1.png',
      advisorAlt: 'Client portrait',
    },
  },
  {
    id: 'portfolio-management',
    href: '/solutions/portfolio-management',
    title: 'PMS & AIFs, managed for you.',
    description:
      'A focused stock portfolio in your Demat, plus select alternative funds. You see every holding. We review it every quarter.',
    buttonText: 'Explore PMS & AIFs',
    collage: {
      netWorthValue: '₹2.1 Cr+',
      netWorthSub: 'Illustrative PMS sleeve',
      returnsValue: '12.4%',
      advisorImage: '/images/clients/client-man-2.jpg',
      advisorAlt: 'Client portrait',
    },
  },
  {
    id: 'wealth-management',
    href: '/solutions/wealth-management',
    title: 'Tax, cash & the next generation.',
    description:
      'Smarter tax planning, emergency money when you need it, and a clear plan for your family—so market swings do not throw you off course.',
    buttonText: 'Explore wealth planning',
    collage: {
      netWorthValue: 'Family office',
      netWorthSub: 'Liquidity · tax · succession',
      returnsLabel: 'Focus',
      returnsValue: 'On plan',
      returnsTrend: false,
      advisorImage: '/images/clients/client-man-3.png',
      advisorAlt: 'Client portrait',
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
    <div className="oc-pillar-slot">
      <motion.div
        style={{
          scale,
          top: topOffset,
          transformOrigin: 'top center',
        }}
        className="oc-pillar-card"
      >
        {stack && i < PILLAR_CARDS.length - 1 ? (
          <motion.div style={{ opacity: overlayOpacity }} className="oc-pillar-overlay" />
        ) : null}

        <div className={cn('oc-pillar-grid', i === 1 && 'oc-pillar-grid--flip')}>
          <div className="oc-pillar-copy">
            <h3 className="oc-pillar-copy__title font-sans text-[1.0625rem] font-semibold leading-[1.25] tracking-tight text-black text-balance sm:text-[1.25rem] sm:leading-[1.22] md:text-[1.5rem] lg:text-[2.55rem] lg:leading-[1.12] xl:text-[2.95rem]">
              {card.title}
            </h3>

            <p className="oc-pillar-copy__body max-w-xl text-[0.8125rem] font-light leading-[1.55] text-black/60 sm:text-[0.875rem] sm:leading-relaxed md:text-[0.9375rem] lg:mt-5 lg:text-lg lg:leading-relaxed xl:text-xl">
              {card.description}
            </p>

            <div className="oc-pillar-copy__cta lg:mt-8">
              <Button
                to={card.href}
                variant="primary"
                size="md"
                arrow="up-right"
                className="oc-btn-stroke--on-black h-auto w-full max-w-full bg-black px-4 py-3 text-[0.6875rem] font-medium tracking-wider text-white shadow-md hover:bg-zinc-800 sm:text-xs lg:w-auto lg:px-5 lg:py-3.5 [&_.oc-btn-label]:w-full lg:[&_.oc-btn-label]:w-auto [&_.oc-btn-label>span]:min-w-0 [&_.oc-btn-label>span]:whitespace-normal [&_.oc-btn-label>span]:text-balance"
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

const HEADING_LINE_1 = 'Personalised Wealth Management';
const HEADING_LINE_2 = 'Solutions';

export function SolutionsOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  // Sticky stack on every viewport (same laptop behavior on phones).
  const reduceMotion = useReducedMotion();
  const stack = !reduceMotion;

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
        className="mx-auto mb-10 w-full max-w-3xl px-5 text-center sm:mb-12 sm:max-w-4xl sm:px-8 md:mb-14 lg:px-10"
      >
        <Eyebrow centered className="mb-3 text-white/60 sm:mb-5">
          Who We Are
        </Eyebrow>
        <h2
          id="solutions-overview-heading"
          className="select-none text-[1.5rem] font-medium leading-[1.2] tracking-tight text-white/20 sm:text-[1.875rem] sm:leading-[1.18] md:text-[2.125rem] lg:text-[2.5rem] lg:leading-[1.15] xl:text-[2.75rem]"
        >
          <span className="sr-only">{HOME_SEO.h2.personalised}</span>
          <span aria-hidden="true" className="block text-balance">
            <SplitChars text={HEADING_LINE_1} attr="data-char-h" />
          </span>
          <span aria-hidden="true" className="mt-1.5 block text-balance sm:mt-2">
            <SplitChars text={HEADING_LINE_2} attr="data-char-h" />
          </span>
        </h2>
      </div>

      <div
        ref={containerRef}
        className={cn(
          'relative w-full',
          stack ? 'pb-[18vh] sm:pb-[23vh]' : 'flex flex-col gap-6 pb-16 sm:gap-8',
        )}
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
