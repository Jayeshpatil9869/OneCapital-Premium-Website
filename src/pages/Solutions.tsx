import {
  PORTFOLIO_MANAGEMENT_FOOTNOTE,
  SOLUTION_PILLARS,
  type SolutionPillar,
  type SolutionService,
} from '@/src/data/solutions-pillars';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Button,
  Container,
  Section,
  Eyebrow,
  DisplayHeading,
  SectionHeading,
  BodyText,
  Label,
} from '@/src/components/ui';

function PillarNav() {
  return (
    <RevealOnScroll>
      <nav
        aria-label="Solution pillars"
        className="mb-14 hidden flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-white/40 lg:mb-16 lg:flex"
      >
        {SOLUTION_PILLARS.map((pillar) => (
          <a
            key={pillar.id}
            href={`#${pillar.id}`}
            className="transition-colors duration-500 hover:text-white"
          >
            {pillar.index} {pillar.title}
          </a>
        ))}
      </nav>
    </RevealOnScroll>
  );
}

function ServiceBlock({ service }: { service: SolutionService }) {
  return (
    <article
      id={service.id}
      className="flex scroll-mt-28 flex-col gap-3 border-t border-white/10 pt-8 first:border-t-0 first:pt-0"
    >
      <h3 className="text-xl font-medium tracking-tight text-white md:text-2xl">
        {service.title}
      </h3>
      <p className="text-lg font-medium text-white/80">{service.tagline}</p>
      <BodyText className="text-base md:text-lg">{service.description}</BodyText>
    </article>
  );
}

function PillarSection({ pillar }: { pillar: SolutionPillar }) {
  const showFootnote = pillar.id === 'portfolio-management';

  return (
    <RevealOnScroll>
      <section
        id={pillar.id}
        aria-labelledby={`pillar-heading-${pillar.id}`}
        className="grid scroll-mt-28 grid-cols-1 items-start gap-12 border-t border-white/10 pt-16 lg:grid-cols-12"
      >
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-5">
          <Label className="text-white/40">
            {pillar.index} // {pillar.id.replace(/-/g, ' ')}
          </Label>
          <SectionHeading id={`pillar-heading-${pillar.id}`} className="text-white">
            {pillar.title}
          </SectionHeading>
          <BodyText className="mt-2 text-base md:text-lg">{pillar.summary}</BodyText>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-7">
          <div className="flex flex-col gap-8">
            {pillar.services.map((service) => (
              <ServiceBlock key={service.id} service={service} />
            ))}
          </div>

          {showFootnote ? (
            <p className="border-t border-white/10 pt-6 text-sm leading-relaxed text-white/50">
              {PORTFOLIO_MANAGEMENT_FOOTNOTE}
            </p>
          ) : null}

          <Button to="/contact" variant="text" arrow="right" className="mt-2 w-fit text-white">
            Request Strategy Session
          </Button>
        </div>
      </section>
    </RevealOnScroll>
  );
}

export default function Solutions() {
  return (
    <div className="flex w-full flex-col items-center">
      <Section pad="lg" className="pt-28 md:pt-32">
        <Container className="flex flex-col items-center text-center">
          <RevealOnScroll className="flex max-w-4xl flex-col items-center gap-5">
            <Eyebrow centered>Our Solutions</Eyebrow>
            <DisplayHeading className="text-white">
              The steward and architect of{' '}
              <span className="text-white/40">your capital.</span>
            </DisplayHeading>
            <BodyText className="max-w-2xl text-base md:text-lg">
              Discretion, sophistication, and institutional-quality thinking — structured
              across four disciplines of capital stewardship for ultra-high-net-worth
              families and principals.
            </BodyText>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section pad="none" className="pb-[var(--space-section)]">
        <Container>
          <PillarNav />
          <div className="flex flex-col gap-24">
            {SOLUTION_PILLARS.map((pillar) => (
              <PillarSection key={pillar.id} pillar={pillar} />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
