import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Container,
  Section,
  Eyebrow,
  DisplayHeading,
  BodyText,
  ButtonFlair,
} from '@/src/components/ui';
import {
  CALCULATOR_CARDS,
  CALCULATOR_DISCLAIMER,
  CALCULATOR_HUB,
  type CalculatorCard,
} from '@/src/data/calculators';
import { COMPANY } from '@/src/data/company';
import { cn } from '@/src/lib/utils';

/**
 * Bento (lg 3-col):
 * [ SIP tall ] [ Lumpsum wide -------- ]
 * [ SIP tall ] [ Step Up ] [ SWP      ]
 * [ Goal Planning full width --------- ]
 */
const BENTO_LAYOUT: Record<
  CalculatorCard['slug'],
  { className: string; featured?: boolean }
> = {
  sip: {
    className: 'min-h-[16rem] lg:row-span-2 lg:min-h-full',
    featured: true,
  },
  lumpsum: {
    className: 'min-h-[11rem] lg:col-span-2',
  },
  'step-up-sip': {
    className: 'min-h-[11rem]',
  },
  swp: {
    className: 'min-h-[11rem]',
  },
  'goal-planning': {
    className: 'min-h-[10.5rem] lg:col-span-3',
  },
};

const CARD_ORDER: CalculatorCard['slug'][] = [
  'sip',
  'lumpsum',
  'step-up-sip',
  'swp',
  'goal-planning',
];

export default function Calculators() {
  useEffect(() => {
    document.title = `Calculators | ${COMPANY.brandName}`;
  }, []);

  const ordered = CARD_ORDER.map(
    (slug) => CALCULATOR_CARDS.find((c) => c.slug === slug)!,
  );

  return (
    <div className="flex w-full flex-col items-center">
      <Section pad="none" className="relative overflow-hidden pt-20 pb-6 md:pt-24 md:pb-8">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[min(16rem,40vw)] w-[min(36rem,80vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07)_0%,transparent_70%)] blur-3xl"
          aria-hidden
        />

        <Container className="relative z-10 flex flex-col items-center text-center">
          <RevealOnScroll className="flex max-w-2xl flex-col items-center gap-2">
            <Eyebrow centered>{CALCULATOR_HUB.eyebrow}</Eyebrow>
            <DisplayHeading className="text-white uppercase tracking-tight !text-[clamp(1.75rem,4.5vw,2.75rem)]">
              {CALCULATOR_HUB.title}
            </DisplayHeading>
            <BodyText className="max-w-xl text-xs md:text-sm">
              {CALCULATOR_HUB.subtitle}
            </BodyText>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section pad="none" className="pb-14 md:pb-16">
        <Container>
          <RevealOnScroll
            stagger={0.04}
            className={cn(
              'mx-auto grid max-w-6xl grid-cols-1 gap-3.5',
              'md:grid-cols-2 md:gap-4',
              'lg:grid-cols-3 lg:auto-rows-[minmax(11rem,auto)] lg:gap-4',
            )}
          >
            {ordered.map((card) => (
              <CalculatorBentoCard
                key={card.slug}
                card={card}
                layout={BENTO_LAYOUT[card.slug]}
              />
            ))}
          </RevealOnScroll>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-white/40 md:text-sm">
            {CALCULATOR_DISCLAIMER}
          </p>
        </Container>
      </Section>
    </div>
  );
}

function CalculatorBentoCard({
  card,
  layout,
}: {
  card: CalculatorCard;
  layout: { className: string; featured?: boolean };
}) {
  const Icon = card.icon;

  return (
    <Link
      to={card.path}
      className={cn(
        'oc-mobile-glass-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/12 p-5 text-left sm:rounded-[1.25rem] sm:p-6',
        'bg-gradient-to-br from-white/[0.1] via-white/[0.035] to-[#0a0a0a]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_28px_rgba(0,0,0,0.35)]',
        'backdrop-blur-xl transition-all duration-400',
        'hover:-translate-y-0.5 hover:border-white/28 hover:from-white/[0.14]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        layout.className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-white/[0.05] blur-3xl transition-all duration-500 group-hover:bg-white/[0.08]"
        aria-hidden
      />

      {layout.featured ? <FeaturedChartArt /> : null}

      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-1">
            {layout.featured ? (
              <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/40">
                Featured
              </span>
            ) : null}
            <h2
              className={cn(
                'font-semibold tracking-tight text-white text-balance',
                layout.featured
                  ? 'text-xl leading-snug sm:text-2xl'
                  : 'text-base sm:text-lg',
              )}
            >
              {card.title}
            </h2>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/14 bg-white/[0.06] text-white/85 transition-colors group-hover:border-white/28 group-hover:text-white sm:h-10 sm:w-10">
            <Icon className="h-4 w-4" aria-hidden />
          </div>
        </div>

        <p
          className={cn(
            'leading-relaxed text-white/55 text-pretty',
            layout.featured
              ? 'max-w-sm text-sm'
              : 'text-xs sm:text-sm line-clamp-2',
          )}
        >
          {card.description}
        </p>
      </div>

      <div className="relative z-10 mt-5 flex items-end justify-between gap-3 sm:mt-6">
        <ButtonFlair
          tone="dark"
          className="bg-white px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wide text-black sm:px-4 sm:py-2.5 sm:text-xs"
        >
          Calculate
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </ButtonFlair>
      </div>
    </Link>
  );
}

function FeaturedChartArt() {
  return (
    <svg
      className="pointer-events-none absolute bottom-4 right-3 h-[36%] w-[48%] opacity-[0.16] transition-opacity duration-500 group-hover:opacity-[0.26] lg:bottom-5 lg:right-4"
      viewBox="0 0 240 140"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 118 C 48 110, 62 96, 88 88 C 120 78, 132 70, 158 52 C 184 34, 198 28, 232 16"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M8 128 C 52 122, 70 112, 96 104 C 128 94, 140 90, 168 74 C 196 58, 208 54, 232 42"
        stroke="white"
        strokeWidth="1.5"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />
      <circle cx="232" cy="16" r="3.5" fill="white" />
    </svg>
  );
}
