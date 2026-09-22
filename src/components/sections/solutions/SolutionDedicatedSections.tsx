import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { BodyText, Container, Label, Section, SectionHeading } from '@/src/components/ui';
import type { SolutionDedicatedConfig } from '@/src/data/solutions-pages';
import { PORTFOLIO_MANAGEMENT_FOOTNOTE } from '@/src/data/solutions-pillars';
import { cn } from '@/src/lib/utils';
import { SolutionVisualization } from './visualizations/SolutionVisualization';

type SolutionDedicatedSectionsProps = {
  config: SolutionDedicatedConfig;
};

const THEME_FLOW_STEPS: Record<SolutionDedicatedConfig['theme'], string[]> = {
  direction: ['Capital', 'Allocation', 'Opportunity', 'Growth'],
  precision: ['Portfolio', 'Allocation', 'Monitoring', 'Rebalance'],
  structure: ['Growth', 'Liquidity', 'Protection', 'Legacy'],
  intelligence: ['Data', 'Research', 'Insight', 'Oversight', 'Decision'],
};

export function SolutionDedicatedSections({ config }: SolutionDedicatedSectionsProps) {
  const showFootnote = config.pillarId === 'portfolio-management';
  const flowSteps = THEME_FLOW_STEPS[config.theme];

  return (
    <>
      <Section tone="dark" pad="lg" className="border-y border-white/10">
        <Container narrow className="text-center">
          <RevealOnScroll>
            <h2 className="text-balance font-sans text-[clamp(1.65rem,0.9rem+2vw,2.75rem)] font-semibold tracking-tight leading-[1.18] text-white">
              {config.intro.statement}
            </h2>
            <BodyText className="mx-auto mt-6 max-w-2xl font-sans font-light text-white/60">{config.intro.body}</BodyText>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section
        pad="md"
        className={cn(
          config.theme === 'precision' && 'solutions-dark-panel border-y border-white/10',
        )}
      >
        <Container>
          <RevealOnScroll className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Label className="text-white/45">
                Visual framework
              </Label>
              <SectionHeading
                className={cn('mt-3', config.theme === 'precision' ? 'text-white' : 'text-white')}
              >
                {config.theme === 'direction' && 'The path from intent to allocation'}
                {config.theme === 'precision' && 'Balance across the mandate'}
                {config.theme === 'structure' && 'Relationships that protect compounding'}
                {config.theme === 'intelligence' && 'From data to disciplined decision'}
              </SectionHeading>
            </div>
            <div className="lg:col-span-7">
              <SolutionVisualization kind={config.visual} steps={flowSteps} />
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section pad="none" className="pb-[var(--space-section-sm)]">
        <Container>
          <div className="flex flex-col gap-0">
            {config.sections.map((section, index) => {
              const reversed = index % 2 === 1;
              return (
                <RevealOnScroll key={section.id}>
                  <article
                    id={section.id}
                    className={cn(
                      'grid scroll-mt-28 grid-cols-1 items-start gap-8 border-t border-white/10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-16',
                      config.theme === 'structure' && index === 1 && 'bg-white/[0.015] px-0',
                    )}
                  >
                    <div
                      className={cn(
                        'flex flex-col gap-4 lg:col-span-5',
                        reversed && 'lg:order-2',
                        index === 0 && 'lg:sticky lg:top-28',
                      )}
                    >
                      <span className="font-mono text-xs text-white/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <SectionHeading className="text-white">{section.title}</SectionHeading>
                      {section.points?.[0] ? (
                        <p className="text-lg font-medium text-white/75">{section.points[0]}</p>
                      ) : null}
                    </div>
                    <div className={cn('lg:col-span-7', reversed && 'lg:order-1')}>
                      <BodyText className="text-base md:text-lg">{section.body}</BodyText>
                      {section.points && section.points.length > 1 ? (
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {section.points.slice(1).map((point) => (
                            <li
                              key={point}
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                </RevealOnScroll>
              );
            })}
          </div>

          {showFootnote ? (
            <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-white/50">
              {PORTFOLIO_MANAGEMENT_FOOTNOTE}
            </p>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
