import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { BodyText, Container, Eyebrow, Section, SectionHeading } from '@/src/components/ui';
import type { SolutionDedicatedConfig } from '@/src/data/solutions-pages';
import { PORTFOLIO_MANAGEMENT_FOOTNOTE } from '@/src/data/solutions-pillars';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
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
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      const line = lineRef.current;
      if (!list || !line || prefersReducedMotion()) return;

      const fitLine = () => {
        const height = list.offsetHeight || 1;
        line.setAttribute('y2', String(height));
        return height;
      };

      fitLine();
      gsap.set(line, {
        strokeDasharray: () => fitLine(),
        strokeDashoffset: () => fitLine(),
      });

      const articles = gsap.utils.toArray<HTMLElement>(list.querySelectorAll('article'));
      const markers = gsap.utils.toArray<HTMLElement>(list.querySelectorAll('[data-step-marker]'));

      const paintMarkers = () => {
        const height = Number(line.getAttribute('y2')) || list.offsetHeight || 1;
        const offset = Number.parseFloat(getComputedStyle(line).strokeDashoffset);
        const drawn = Number.isFinite(offset) ? height - offset : 0;
        const listTop = list.getBoundingClientRect().top;

        markers.forEach((marker) => {
          const rect = marker.getBoundingClientRect();
          const center = rect.top - listTop + rect.height / 2;
          const reached = drawn >= center - 1;
          marker.classList.toggle('bg-white', reached);
          marker.classList.toggle('text-black', reached);
          marker.classList.toggle('border-white', reached);
          marker.classList.toggle('bg-black', !reached);
          marker.classList.toggle('text-text-muted', !reached);
          marker.classList.toggle('border-white/30', !reached);
        });
      };

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        onUpdate: paintMarkers,
        scrollTrigger: {
          trigger: list,
          start: 'top 72%',
          end: 'bottom 62%',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });
      paintMarkers();

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        articles.forEach((article, index) => {
          gsap.from(article, {
            autoAlpha: 0,
            x: index % 2 === 0 ? -36 : 36,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: article,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });
      mm.add('(max-width: 767px)', () => {
        articles.forEach((article) => {
          gsap.from(article, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: article,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      });

      ScrollTrigger.addEventListener('refreshInit', fitLine);
      return () => ScrollTrigger.removeEventListener('refreshInit', fitLine);
    },
    { scope: listRef },
  );

  return (
    <Section pad="lg">
      <Container>
        <RevealOnScroll className="mx-auto max-w-6xl text-center">
          <Eyebrow centered className="text-text-muted">
            The sequence
          </Eyebrow>
          <SectionHeading className="mt-4 text-white">
            {config.intro.statement}
          </SectionHeading>
          <BodyText className="mt-5">
            {config.intro.body}
          </BodyText>
        </RevealOnScroll>

        <ol ref={listRef} className="relative mx-auto mt-20 w-full">
          <div
            className="pointer-events-none absolute bottom-0 left-3 top-0 w-px bg-white/15 md:left-1/2"
            aria-hidden
          />
          <svg
            className="pointer-events-none absolute bottom-0 left-3 top-0 h-full w-px overflow-visible md:left-1/2"
            aria-hidden
          >
            <line
              ref={lineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {config.sections.map((section, index) => {
            const onRight = index % 2 === 1;
            const facts = section.points?.slice(1) ?? [];
            return (
              <li key={section.id} className="relative grid grid-cols-1 md:grid-cols-2">
                <span
                  data-step-marker
                  className="absolute left-3 top-10 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-white/30 bg-black font-mono text-[11px] text-text-muted transition-colors duration-200 md:left-1/2"
                >
                  {indexLabel(index)}
                </span>
                <article
                  id={section.id}
                  className={cn(
                    'scroll-mt-28 py-10 pl-12 md:py-16',
                    onRight ? 'md:col-start-2 md:pl-16 md:pr-2' : 'md:pr-16 md:pl-2 md:text-right',
                  )}
                >
                  <h3 className="text-balance text-3xl font-medium tracking-tight text-white md:text-4xl">
                    {section.title}
                  </h3>
                  {section.points?.[0] ? (
                    <p className="mt-3 text-lg font-light text-white/75 md:text-xl">{section.points[0]}</p>
                  ) : null}
                  <p className="mt-4 text-pretty text-lg font-light leading-relaxed text-white/60 md:text-xl">
                    {leadSentence(section.body)}
                  </p>
                  {facts.length > 0 ? (
                    <p className="mt-5 text-pretty text-lg font-medium text-white md:text-xl">
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
            <Eyebrow>The shelf</Eyebrow>
            <SectionHeading className="mt-3 text-white">
              {config.intro.statement}
            </SectionHeading>
          </div>
          <BodyText className="max-w-md">
            {config.intro.body}
          </BodyText>
        </RevealOnScroll>

        <ol className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="bg-black px-4 py-4">
              <span className="font-mono text-xs tracking-widest text-text-muted">
                {indexLabel(index)}
              </span>
              <p className="mt-1 text-base font-medium text-white">{step}</p>
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
                    <span className="font-mono text-xs tracking-widest text-text-muted">
                      {indexLabel(index)}
                    </span>
                    <h3 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                      {section.title}
                    </h3>
                    {section.points?.[0] ? (
                      <p className="mt-2 text-base font-light text-text-muted">{section.points[0]}</p>
                    ) : null}
                    <p className="mt-3 text-base font-light leading-relaxed text-text-muted">
                      {leadSentence(section.body)}
                    </p>
                  </div>
                  {facts.length > 0 ? (
                    <ul className={cn('mt-6 flex flex-wrap gap-2', lead && 'md:mt-0 md:content-end')}>
                      {facts.map((fact) => (
                        <li
                          key={fact}
                          className="border border-white/10 px-3 py-2 text-sm font-medium tracking-tight text-white"
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

        <BodyText className="mt-8 max-w-3xl text-base md:text-lg">
          {PORTFOLIO_MANAGEMENT_FOOTNOTE}
        </BodyText>
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
            <Eyebrow>The layers</Eyebrow>
            <SectionHeading className="mt-4 text-white">
              {config.intro.statement}
            </SectionHeading>
            <BodyText className="mt-5 max-w-2xl">
              {config.intro.body}
            </BodyText>
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
                <span className="text-5xl font-medium leading-none tracking-tight text-text-muted sm:text-6xl">
                  {indexLabel(index)}
                </span>
              </div>
              <div className="lg:col-span-5">
                <h3 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  {section.title}
                </h3>
                {section.points?.[0] ? (
                  <p className="mt-2 text-base font-light text-text-muted">{section.points[0]}</p>
                ) : null}
                <p className="mt-3 text-base font-light leading-relaxed text-text-muted">
                  {leadSentence(section.body)}
                </p>
              </div>
              <ul className="flex flex-col gap-2 lg:col-span-5">
                {facts.map((fact) => (
                  <li
                    key={fact}
                    className="border border-white/10 bg-black/40 px-4 py-3 text-base font-medium text-white"
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
          <SectionHeading className="max-w-xl text-white lg:col-span-7">
            {config.intro.statement}
          </SectionHeading>
          <BodyText className="max-w-md lg:col-span-5">
            {config.intro.body}
          </BodyText>
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
                <span className="font-mono text-xs tracking-widest text-text-muted">01</span>
                <h3 className="mt-5 max-w-sm text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">
                  {config.sections[0].title}
                </h3>
                <p className="mt-4 max-w-md text-base font-light leading-relaxed text-text-muted md:text-lg">
                  {config.sections[0].points?.[0] ?? leadSentence(config.sections[0].body)}
                </p>
              </div>
              <ul className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-7">
                {(config.sections[0].points?.slice(1) ?? []).map((fact) => (
                  <li key={fact} className="text-lg font-medium tracking-tight text-white">
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
                <span className="font-mono text-xs tracking-widest text-text-muted">
                  {indexLabel(index + 1)}
                </span>
                <h3 className="mt-5 text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl">
                  {section.title}
                </h3>
                <p className="mt-3 text-base font-light leading-relaxed text-text-muted">
                  {section.points?.[0] ?? leadSentence(section.body)}
                </p>
                {facts.length > 0 ? (
                  <ul className="mt-8 flex flex-col gap-3">
                    {facts.map((fact) => (
                      <li key={fact} className="text-base font-medium text-white">
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
