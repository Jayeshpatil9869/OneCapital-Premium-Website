import type { ReactNode } from 'react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import type { SolutionDedicatedConfig } from '@/src/data/solutions-pages';
import { PORTFOLIO_MANAGEMENT_FOOTNOTE } from '@/src/data/solutions-pillars';
import { cn } from '@/src/lib/utils';

type SolutionDedicatedSectionsProps = {
  config: SolutionDedicatedConfig;
};

const THEME_FLOW_STEPS: Record<SolutionDedicatedConfig['theme'], string[]> = {
  direction: ['Goals', 'Risk profile', 'Allocation', 'Products'],
  precision: ['Mutual funds', 'SIP', 'PMS', 'Review'],
  structure: ['Risk', 'Cash', 'Tax', 'Nominations'],
  intelligence: ['Review', 'Diligence', 'Report', 'Decide'],
};

function leadSentence(text: string): string {
  const match = text.match(/^.*?[.!](?:\s|$)/);
  return (match?.[0] ?? text).trim();
}

function indexLabel(index: number): string {
  return String(index + 1).padStart(2, '0');
}

function DirectionTimeline({ config }: { config: SolutionDedicatedConfig }) {
  return (
    <Section pad="lg">
      <Container>
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
            The sequence
          </p>
          <h2 className="mt-4 font-sans text-[clamp(1.85rem,1rem+2.2vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-white">
            {config.intro.statement}
          </h2>
          <p className="mt-5 font-sans text-base font-light leading-relaxed text-white/55">
            {config.intro.body}
          </p>
        </RevealOnScroll>

        <ol className="relative mx-auto mt-16 max-w-5xl">
          <div
            className="pointer-events-none absolute bottom-0 left-3 top-0 w-px bg-white/15 md:left-1/2"
            aria-hidden
          />
          {config.sections.map((section, index) => {
            const onRight = index % 2 === 1;
            const facts = section.points?.slice(1) ?? [];
            return (
              <li key={section.id} className="relative grid grid-cols-1 md:grid-cols-2">
                <span className="absolute left-3 top-8 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-white/30 bg-black font-mono text-[10px] text-white/70 md:left-1/2">
                  {indexLabel(index)}
                </span>
                <article
                  id={section.id}
                  className={cn(
                    'scroll-mt-28 py-8 pl-10 md:py-12',
                    onRight ? 'md:col-start-2 md:pl-14 md:pr-0' : 'md:pr-14 md:text-right',
                  )}
                >
                  <h3 className="font-sans text-2xl font-medium tracking-tight text-white">
                    {section.title}
                  </h3>
                  {section.points?.[0] ? (
                    <p className="mt-2 font-sans text-sm font-light text-white/55">{section.points[0]}</p>
                  ) : null}
                  <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/45">
                    {leadSentence(section.body)}
                  </p>
                  {facts.length > 0 ? (
                    <p
                      className={cn(
                        'mt-4 font-sans text-sm font-medium text-white/80',
                        onRight ? '' : 'md:ml-auto',
                      )}
                    >
                      {facts.join(' · ')}
                    </p>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

function PrecisionShelf({ config }: { config: SolutionDedicatedConfig }) {
  const steps = THEME_FLOW_STEPS.precision;

  return (
    <Section pad="lg">
      <Container>
        <RevealOnScroll className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
              The shelf
            </p>
            <h2 className="mt-3 font-sans text-[clamp(1.85rem,1rem+2.2vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-white">
              {config.intro.statement}
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-white/55 lg:text-base">
            {config.intro.body}
          </p>
        </RevealOnScroll>

        <ol className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="bg-black px-4 py-4">
              <span className="font-mono text-[10px] tracking-[0.16em] text-white/35">
                {indexLabel(index)}
              </span>
              <p className="mt-1 font-sans text-sm font-medium text-white">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {config.sections.map((section, index) => {
            const facts = section.points?.slice(1) ?? [];
            const lead = index === 0;
            return (
              <RevealOnScroll key={section.id}>
                <article
                  id={section.id}
                  className={cn(
                    'flex h-full scroll-mt-28 flex-col border border-white/10 bg-white/[0.02] p-6 sm:p-8',
                    lead && 'md:col-span-2 md:grid md:grid-cols-2 md:gap-10',
                  )}
                >
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.18em] text-white/35">
                      {indexLabel(index)}
                    </span>
                    <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-white">
                      {section.title}
                    </h3>
                    {section.points?.[0] ? (
                      <p className="mt-2 font-sans text-sm font-light text-white/55">{section.points[0]}</p>
                    ) : null}
                    <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/45">
                      {leadSentence(section.body)}
                    </p>
                  </div>
                  {facts.length > 0 ? (
                    <ul className={cn('mt-6 flex flex-wrap gap-2', lead && 'md:mt-0 md:content-end')}>
                      {facts.map((fact) => (
                        <li
                          key={fact}
                          className="border border-white/15 px-3 py-2 font-sans text-xs font-medium tracking-tight text-white/75"
                        >
                          {fact}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </RevealOnScroll>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl font-sans text-sm font-light leading-relaxed text-white/45">
          {PORTFOLIO_MANAGEMENT_FOOTNOTE}
        </p>
      </Container>
    </Section>
  );
}

function StructureBands({ config }: { config: SolutionDedicatedConfig }) {
  return (
    <div>
      <Section pad="md" className="border-b border-white/10">
        <Container>
          <RevealOnScroll className="max-w-3xl">
            <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
              The layers
            </p>
            <h2 className="mt-4 font-sans text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-white">
              {config.intro.statement}
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-base font-light leading-relaxed text-white/55">
              {config.intro.body}
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      {config.sections.map((section, index) => {
        const facts = section.points?.slice(1) ?? [];
        return (
          <article
            key={section.id}
            id={section.id}
            className={cn(
              'scroll-mt-28 border-b border-white/10',
              index % 2 === 1 && 'bg-white/[0.03]',
            )}
          >
            <Container className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:items-end lg:py-14">
              <div className="lg:col-span-2">
                <span className="font-sans text-5xl font-semibold leading-none tracking-tight text-white/20 sm:text-6xl">
                  {indexLabel(index)}
                </span>
              </div>
              <div className="lg:col-span-5">
                <h3 className="font-sans text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium tracking-tight text-white">
                  {section.title}
                </h3>
                {section.points?.[0] ? (
                  <p className="mt-2 font-sans text-sm font-light text-white/55">{section.points[0]}</p>
                ) : null}
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/45">
                  {leadSentence(section.body)}
                </p>
              </div>
              <ul className="flex flex-col gap-2 lg:col-span-5">
                {facts.map((fact) => (
                  <li
                    key={fact}
                    className="border border-white/10 bg-black/40 px-4 py-3 font-sans text-sm font-medium text-white/80"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            </Container>
          </article>
        );
      })}
    </div>
  );
}

function IntelligenceReview({ config }: { config: SolutionDedicatedConfig }) {
  return (
    <Section pad="none" className="border-t border-white/10">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <h2 className="max-w-xl font-sans text-[clamp(1.85rem,1rem+2vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-white lg:col-span-7">
            {config.intro.statement}
          </h2>
          <p className="max-w-md font-sans text-base font-light leading-relaxed text-white/55 lg:col-span-5">
            {config.intro.body}
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        {config.sections[0] ? (
          <Container>
            <article
              id={config.sections[0].id}
              className="grid scroll-mt-28 grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:items-end lg:py-20"
            >
              <div className="lg:col-span-5">
                <span className="font-mono text-[11px] tracking-[0.18em] text-white/30">01</span>
                <h3 className="mt-5 max-w-sm font-sans text-[clamp(1.75rem,1rem+1.5vw,2.5rem)] font-medium leading-tight tracking-tight text-white">
                  {config.sections[0].title}
                </h3>
                <p className="mt-4 max-w-md font-sans text-base font-light leading-relaxed text-white/50">
                  {config.sections[0].points?.[0] ?? leadSentence(config.sections[0].body)}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-7">
                {(config.sections[0].points?.slice(1) ?? []).map((fact) => (
                  <li key={fact} className="font-sans text-lg font-medium tracking-tight text-white/80">
                    {fact}
                  </li>
                ))}
              </ul>
            </article>

            <div className="grid grid-cols-1 border-t border-white/10 lg:grid-cols-3">
          {config.sections.slice(1).map((section, index) => {
            const facts = section.points?.slice(1) ?? [];
            return (
              <article
                key={section.id}
                id={section.id}
                className={cn(
                  'scroll-mt-28 py-12 lg:py-16',
                  index < 2 && 'border-b border-white/10 lg:border-b-0 lg:border-r lg:pr-10',
                  index > 0 && 'lg:pl-10',
                )}
              >
                <span className="font-mono text-[11px] tracking-[0.18em] text-white/30">
                  {indexLabel(index + 1)}
                </span>
                <h3 className="mt-5 font-sans text-2xl font-medium leading-tight tracking-tight text-white">
                  {section.title}
                </h3>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/50">
                  {section.points?.[0] ?? leadSentence(section.body)}
                </p>
                {facts.length > 0 ? (
                  <ul className="mt-8 flex flex-col gap-3">
                    {facts.map((fact) => (
                      <li key={fact} className="font-sans text-sm font-medium text-white/75">
                        {fact}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            );
          })}
            </div>
          </Container>
        ) : null}
      </div>
    </Section>
  );
}

function renderTheme(config: SolutionDedicatedConfig): ReactNode {
  switch (config.theme) {
    case 'direction':
      return <DirectionTimeline config={config} />;
    case 'precision':
      return <PrecisionShelf config={config} />;
    case 'structure':
      return <StructureBands config={config} />;
    case 'intelligence':
      return <IntelligenceReview config={config} />;
    default: {
      const unreachable: never = config.theme;
      return unreachable;
    }
  }
}

export function SolutionDedicatedSections({ config }: SolutionDedicatedSectionsProps) {
  return <>{renderTheme(config)}</>;
}
