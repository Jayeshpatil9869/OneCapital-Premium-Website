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
    heading: 'The plan only works once it is invested, protected, and checked against what you already hold.',
    links: [
      {
        pillarId: 'portfolio-management',
        kicker: 'Invest the allocation',
        line: 'SIPs, mutual fund categories, and a PMS only when the amount and the lock-in fit the goals you just wrote.',
      },
      {
        pillarId: 'risk-wealth-architecture',
        kicker: 'Set the guardrails',
        line: 'Emergency cash, tax holding periods, and nominations belong in the plan before the first instalment goes out.',
      },
      {
        pillarId: 'intelligence-oversight',
        kicker: 'Start from current folios',
        line: 'If money already sits in other apps or with another advisor, review that before adding a new fund.',
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
        pillarId: 'risk-wealth-architecture',
        kicker: 'Before the next lumpsum',
        line: 'Check whether the cash reserve and the tax bill can absorb a large one-time investment.',
      },
      {
        pillarId: 'intelligence-oversight',
        kicker: 'If you already invest elsewhere',
        line: 'Bring those statements. Overlap is the usual reason a new fund should not be added.',
      },
    ],
  },
  'risk-wealth-architecture': {
    eyebrow: 'Once the structure is clear',
    heading: 'Risk, cash, and tax change what you should buy and what you should leave alone.',
    links: [
      {
        pillarId: 'capital-strategy',
        kicker: 'Rewrite the allocation',
        line: 'A lower equity ceiling or a nearer goal date means the original mix has to be redrawn.',
      },
      {
        pillarId: 'portfolio-management',
        kicker: 'Fund the buckets',
        line: 'Liquid funds for the reserve, equity SIPs for the long goals, ELSS only if Section 80C still has room.',
      },
      {
        pillarId: 'intelligence-oversight',
        kicker: 'See if the current portfolio breaks the rules',
        line: 'A review will show concentration, missing nominees, and funds that no longer match the cash dates.',
      },
    ],
  },
  'intelligence-oversight': {
    eyebrow: 'What the review is for',
    heading: 'A keep, switch, or wait list is useful only if it changes the plan or the portfolio.',
    links: [
      {
        pillarId: 'capital-strategy',
        kicker: 'Update the written plan',
        line: 'If a goal date moved or the risk you can live with has changed, the allocation page has to change with it.',
      },
      {
        pillarId: 'portfolio-management',
        kicker: 'Make the switches',
        line: 'The funds that failed the review are replaced here. The ones that passed stay on their SIP.',
      },
      {
        pillarId: 'risk-wealth-architecture',
        kicker: 'Fix what the statements exposed',
        line: 'Missing nominations, a thin cash reserve, or a tax-heavy switch belong in the wealth structure, not in another fund.',
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

function HandoffColumns({ continuation }: { continuation: Continuation }) {
  return (
    <div className="grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
      {continuation.links.map((item) => {
        const pillar = getPillarById(item.pillarId);
        if (!pillar) return null;
        return (
          <Link key={item.pillarId} to={getPillarPageHref(item.pillarId)} className="group block px-0 py-8 md:px-6 md:first:pl-0 md:last:pr-0">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-text-muted">{item.kicker}</p>
            <p className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">{pillar.title}</p>
            <p className="mt-3 text-base font-light leading-relaxed text-text-muted">{item.line}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-text-muted group-hover:text-white">
              Open
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function renderContinuation(pillarId: string, continuation: Continuation): ReactNode {
  switch (pillarId) {
    case 'capital-strategy':
      return <PathSteps continuation={continuation} />;
    case 'portfolio-management':
      return <WideRows continuation={continuation} />;
    case 'risk-wealth-architecture':
      return <FeaturedSplit continuation={continuation} />;
    case 'intelligence-oversight':
      return <HandoffColumns continuation={continuation} />;
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
