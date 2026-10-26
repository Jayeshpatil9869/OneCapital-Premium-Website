import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { Container, Eyebrow, Section, SectionHeading } from '@/src/components/ui';
import { getPillarById, getPillarPageHref } from '@/src/data/solutions-pillars';

type SolutionRelatedNavProps = {
  currentPillarId: string;
};

type NextLink = {
  pillarId: string;
  kicker: string;
  line: string;
};

type Continuation = {
  eyebrow: string;
  heading: string;
  links: NextLink[];
};

const CONTINUATIONS: Record<string, Continuation> = {
  'capital-strategy': {
    eyebrow: 'After the plan is written',
    heading: 'Your financial priorities deserve more than a standard approach. Explore what comes next.',
    links: [
      {
        pillarId: 'portfolio-management',
        kicker: 'Explore services',
        line: 'Review your investments, understand portfolio risks and explore advice aligned with your goals.',
      },
      {
        pillarId: 'wealth-management',
        kicker: 'Explore services',
        line: 'Connect investment advice with your family goals, financial commitments and future plans.',
      },
    ],
  },
  'portfolio-management': {
    eyebrow: 'Around the portfolio',
    heading: 'A fund list is not the whole relationship. These are the conversations that sit next to it.',
    links: [
      {
        pillarId: 'capital-strategy',
        kicker: 'If the goals are still vague',
        line: 'Go back and write the dates and amounts. Otherwise every SIP is a guess.',
      },
      {
        pillarId: 'wealth-management',
        kicker: 'Before the next lumpsum',
        line: 'Check whether the cash reserve and the tax bill can absorb a large one-time investment.',
      },
    ],
  },
  'wealth-management': {
    eyebrow: 'Once the structure is clear',
    heading: 'Explore the decisions that bring greater clarity to your financial life.',
    links: [
      {
        pillarId: 'capital-strategy',
        kicker: 'Explore strategy',
        line: 'Connect your financial goals, time horizons and appetite for risk through a structured capital strategy.',
      },
      {
        pillarId: 'portfolio-management',
        kicker: 'Explore advisory',
        line: 'Review your holdings, portfolio risks and suitability with informed advice.',
      },
    ],
  },
};

function linksFor(pillarId: string): Continuation | undefined {
  return CONTINUATIONS[pillarId];
}

function PathSteps({ continuation }: { continuation: Continuation }) {
  return (
    <ol className="border-t border-white/15">
      {continuation.links.map((item) => {
        const pillar = getPillarById(item.pillarId);
        if (!pillar) return null;
        return (
          <li key={item.pillarId} className="border-b border-white/15">
            <Link
              to={getPillarPageHref(item.pillarId)}
              className="group grid grid-cols-1 items-start gap-3 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-10"
            >
              <span className="font-sans text-[clamp(1.65rem,1rem+1.4vw,2.35rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-white lg:col-span-5">
                {pillar.title}
              </span>
              <span className="lg:col-span-6">
                <span className="block text-base font-medium text-white">{item.kicker}</span>
                <span className="mt-2 block max-w-[58ch] text-base font-light leading-[1.65] text-white/75">
                  {item.line}
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 text-white transition-transform duration-300 ease-out group-hover:translate-x-1 lg:col-span-1 lg:justify-self-end"
                aria-hidden
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function WideRows({ continuation }: { continuation: Continuation }) {
  return (
    <ul className="border-t border-white/10">
      {continuation.links.map((item) => {
        const pillar = getPillarById(item.pillarId);
        if (!pillar) return null;
        return (
          <li key={item.pillarId}>
            <Link
              to={getPillarPageHref(item.pillarId)}
              className="group grid grid-cols-1 gap-2 border-b border-white/10 py-6 md:grid-cols-12 md:items-center md:gap-6"
            >
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted md:col-span-3">
                {item.kicker}
              </span>
              <span className="text-2xl font-medium tracking-tight text-white md:col-span-3">
                {pillar.title}
              </span>
              <span className="text-base font-light leading-relaxed text-text-muted md:col-span-5">
                {item.line}
              </span>
              <ArrowRight className="hidden h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 md:col-span-1 md:block md:justify-self-end" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function FeaturedSplit({ continuation }: { continuation: Continuation }) {
  const [lead, ...rest] = continuation.links;
  const leadPillar = lead ? getPillarById(lead.pillarId) : undefined;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      {lead && leadPillar ? (
        <Link
          to={getPillarPageHref(lead.pillarId)}
          className="group flex flex-col justify-between border border-white/15 p-8 lg:col-span-3 lg:min-h-[280px]"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted">{lead.kicker}</p>
          <div>
            <p className="text-2xl font-medium tracking-tight text-white sm:text-3xl">{leadPillar.title}</p>
            <p className="mt-3 max-w-md text-base font-light leading-relaxed text-text-muted">{lead.line}</p>
          </div>
        </Link>
      ) : null}
      <div className="flex flex-col gap-4 lg:col-span-2">
        {rest.map((item) => {
          const pillar = getPillarById(item.pillarId);
          if (!pillar) return null;
          return (
            <Link
              key={item.pillarId}
              to={getPillarPageHref(item.pillarId)}
              className="group flex flex-1 flex-col justify-center border border-white/10 bg-white/[0.03] px-6 py-5"
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted">{item.kicker}</p>
              <p className="mt-2 text-2xl font-medium tracking-tight text-white">{pillar.title}</p>
              <p className="mt-2 text-base font-light leading-relaxed text-text-muted">{item.line}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function renderContinuation(pillarId: string, continuation: Continuation): ReactNode {
  switch (pillarId) {
    case 'capital-strategy':
      return <PathSteps continuation={continuation} />;
    case 'portfolio-management':
      return <WideRows continuation={continuation} />;
    case 'wealth-management':
      return <FeaturedSplit continuation={continuation} />;
    default:
      return <WideRows continuation={continuation} />;
  }
}

export function SolutionRelatedNav({ currentPillarId }: SolutionRelatedNavProps) {
  const continuation = linksFor(currentPillarId);
  if (!continuation) return null;

  return (
    <Section pad="lg" className="border-t border-white/10">
      <Container>
        <ScrollFade className={currentPillarId === 'capital-strategy' ? 'mb-12 max-w-4xl md:mb-16' : 'mb-10 max-w-3xl'}>
          {currentPillarId === 'capital-strategy' ? null : <Eyebrow>{continuation.eyebrow}</Eyebrow>}
          <SectionHeading className={currentPillarId === 'capital-strategy' ? 'text-balance text-white' : 'mt-3 text-white'}>
            {continuation.heading}
          </SectionHeading>
        </ScrollFade>
        {renderContinuation(currentPillarId, continuation)}
      </Container>
    </Section>
  );
}
