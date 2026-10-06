import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { BodyText, Container, Eyebrow, Section, SectionHeading } from '@/src/components/ui';
import type { SolutionDedicatedConfig } from '@/src/data/solutions-pages';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';

type SolutionDedicatedSectionsProps = {
  config: SolutionDedicatedConfig;
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
        <ScrollFade className="mx-auto max-w-6xl text-center">
          <Eyebrow centered className="text-text-muted">
            The sequence
          </Eyebrow>
          <SectionHeading className="mt-4 text-white">
            {config.intro.statement}
          </SectionHeading>
          <BodyText className="mt-5">
            {config.intro.body}
          </BodyText>
        </ScrollFade>

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

function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {children}
    </Link>
  );
}

function PrecisionShelf({ config }: { config: SolutionDedicatedConfig }) {
  const funds = config.sections.find((section) => section.id === 'mutual-funds');
  const sip = config.sections.find((section) => section.id === 'sip-lumpsum');
  const pms = config.sections.find((section) => section.id === 'pms');
  const alternatives = config.sections.find((section) => section.id === 'alternatives');
  const review = config.sections.find((section) => section.id === 'monitoring');
  const fundFacts = funds?.points?.slice(1) ?? [];
  const ways = sip?.points?.slice(1) ?? [];

  return (
    <div className="w-full bg-black text-white">
      <section className="border-b border-white/15" aria-labelledby="portfolio-intro-heading">
        <Container className="grid grid-cols-1 items-start gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <ScrollFade className="lg:col-span-6">
            <h2
              id="portfolio-intro-heading"
              className="max-w-[14ch] text-balance font-sans text-[clamp(2.1rem,1.15rem+2.5vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
            >
              {config.intro.statement}
            </h2>
          </ScrollFade>
          <ScrollFade delay={0.08} className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-[40rem] text-base font-light leading-[1.7] text-white/80 sm:text-lg">
              {config.intro.body}
            </p>
            <nav aria-label="On this page" className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6">
              {[
                ['#mutual-funds', 'Mutual funds'],
                ['#sip-lumpsum', 'SIP and lumpsum'],
                ['#pms', 'Portfolio Management Services'],
                ['#alternatives', 'AIFs'],
                ['#monitoring', 'Reviews'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="w-fit text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {label}
                </a>
              ))}
            </nav>
          </ScrollFade>
        </Container>
      </section>

      {funds ? (
        <section id={funds.id} className="scroll-mt-28 border-b border-white/15" aria-labelledby="mutual-funds-heading">
          <Container className="grid grid-cols-1 gap-8 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
            <ScrollFade className="lg:col-span-4">
              <h3
                id="mutual-funds-heading"
                className="max-w-[12ch] font-sans text-[clamp(1.85rem,1rem+2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                {funds.title}
              </h3>
              {funds.points?.[0] ? (
                <p className="mt-5 max-w-[28ch] text-lg font-medium leading-snug text-white">{funds.points[0]}</p>
              ) : null}
              <TextLink to="/solutions/mutual-funds">Open the mutual fund page</TextLink>
            </ScrollFade>
            <ScrollFade delay={0.06} className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-[65ch] text-base font-light leading-[1.7] text-white/80 sm:text-lg">{funds.body}</p>
              {fundFacts.length > 0 ? (
                <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3 border-t border-white/15 pt-6 sm:grid-cols-2">
                  {fundFacts.map((fact) => (
                    <li key={fact} className="text-base font-medium text-white">
                      {fact}
                    </li>
                  ))}
                </ul>
              ) : null}
            </ScrollFade>
          </Container>
        </section>
      ) : null}

      {sip ? (
        <section id={sip.id} className="scroll-mt-28 border-b border-white/15" aria-labelledby="sip-heading">
          <Container className="py-16 md:py-24">
            <ScrollFade className="max-w-3xl">
              <h3
                id="sip-heading"
                className="font-sans text-[clamp(1.85rem,1rem+2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                {sip.title}
              </h3>
              {sip.points?.[0] ? (
                <p className="mt-4 text-lg font-medium text-white">{sip.points[0]}</p>
              ) : null}
              <p className="mt-5 max-w-[65ch] text-base font-light leading-[1.7] text-white/80 sm:text-lg">{sip.body}</p>
            </ScrollFade>
            {ways.length > 0 ? (
              <ol className="mt-12 grid grid-cols-1 border-t border-white/15 md:grid-cols-3">
                {ways.map((way, index) => (
                  <li
                    key={way}
                    className={cn(
                      'py-6 md:px-8 md:py-8',
                      index > 0 && 'border-t border-white/15 md:border-t-0 md:border-l',
                      index === 0 && 'md:pl-0',
                    )}
                  >
                    <p className="text-xl font-medium tracking-[-0.02em] text-white">{way}</p>
                  </li>
                ))}
              </ol>
            ) : null}
            <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-10">
              <TextLink to="/calculators/sip">SIP calculator</TextLink>
              <TextLink to="/calculators/lumpsum">Lumpsum calculator</TextLink>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-white/15">
        <Container className="grid grid-cols-1 lg:grid-cols-2">
          {pms ? (
            <article id={pms.id} className="scroll-mt-28 border-b border-white/15 py-16 md:py-24 lg:border-b-0 lg:border-r lg:pr-14" aria-labelledby="pms-heading">
              <ScrollFade>
                <h3
                  id="pms-heading"
                  className="max-w-[16ch] font-sans text-[clamp(1.75rem,1rem+1.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
                >
                  {pms.title}
                </h3>
                <p className="mt-4 text-lg font-medium text-white">Generally ₹50 lakh</p>
                <p className="mt-5 max-w-[58ch] text-base font-light leading-[1.7] text-white/80 sm:text-lg">{pms.body}</p>
                <ul className="mt-8 flex flex-col gap-2">
                  {(pms.points?.slice(1, 4) ?? []).map((item) => (
                    <li key={item} className="text-base font-medium text-white">
                      {item}
                    </li>
                  ))}
                </ul>
                <TextLink to="/solutions/pms">Open the PMS page</TextLink>
              </ScrollFade>
            </article>
          ) : null}
          {alternatives ? (
            <article id={alternatives.id} className="scroll-mt-28 py-16 md:py-24 lg:pl-14" aria-labelledby="aif-heading">
              <ScrollFade delay={0.06}>
                <h3
                  id="aif-heading"
                  className="max-w-[16ch] font-sans text-[clamp(1.75rem,1rem+1.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
                >
                  {alternatives.title}
                </h3>
                <p className="mt-4 text-lg font-medium text-white">Generally ₹1 crore</p>
                <p className="mt-5 max-w-[58ch] text-base font-light leading-[1.7] text-white/80 sm:text-lg">{alternatives.body}</p>
                <ul className="mt-8 flex flex-col gap-2">
                  {(alternatives.points?.slice(1) ?? []).map((item) => (
                    <li key={item} className="text-base font-medium text-white">
                      {item}
                    </li>
                  ))}
                </ul>
                <TextLink to="/solutions/aif">Open the AIF page</TextLink>
              </ScrollFade>
            </article>
          ) : null}
        </Container>
      </section>

      {review ? (
        <section id={review.id} className="scroll-mt-28 border-b border-white/15" aria-labelledby="review-heading">
          <Container className="grid grid-cols-1 gap-8 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
            <ScrollFade className="lg:col-span-5">
              <h3
                id="review-heading"
                className="font-sans text-[clamp(1.85rem,1rem+2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                {review.title}
              </h3>
              {review.points?.[0] ? (
                <p className="mt-4 max-w-[24ch] text-lg font-medium leading-snug text-white">{review.points[0]}</p>
              ) : null}
            </ScrollFade>
            <ScrollFade delay={0.06} className="lg:col-span-6 lg:col-start-7">
              <p className="max-w-[65ch] text-base font-light leading-[1.7] text-white/80 sm:text-lg">{review.body}</p>
              <ul className="mt-8 flex flex-col gap-3">
                {(review.points?.slice(1) ?? []).map((item) => (
                  <li key={item} className="text-base font-medium text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollFade>
          </Container>
        </section>
      ) : null}
    </div>
  );
}

function StructureBands({ config }: { config: SolutionDedicatedConfig }) {
  return (
    <div>
      <Section pad="md" className="border-b border-white/10">
        <Container>
          <ScrollFade className="max-w-3xl">
            <Eyebrow>The layers</Eyebrow>
            <SectionHeading className="mt-4 text-white">
              {config.intro.statement}
            </SectionHeading>
            <BodyText className="mt-5 max-w-2xl">
              {config.intro.body}
            </BodyText>
          </ScrollFade>
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
            <ScrollFade>
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
            </ScrollFade>
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
        <ScrollFade className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <SectionHeading className="max-w-xl text-white lg:col-span-7">
            {config.intro.statement}
          </SectionHeading>
          <BodyText className="max-w-md lg:col-span-5">
            {config.intro.body}
          </BodyText>
        </ScrollFade>
      </Container>

      <div className="border-t border-white/10">
        {config.sections[0] ? (
          <Container>
            <article
              id={config.sections[0].id}
              className="scroll-mt-28"
            >
            <ScrollFade className="grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:items-end lg:py-20">
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
            </ScrollFade>
            </article>

            <div className="grid grid-cols-1 border-t border-white/10 lg:grid-cols-3">
          {config.sections.slice(1).map((section, index) => {
            const facts = section.points?.slice(1) ?? [];
            return (
              <article
                key={section.id}
                id={section.id}
                className={cn(
                  'scroll-mt-28',
                  index < 2 && 'border-b border-white/10 lg:border-b-0 lg:border-r lg:pr-10',
                  index > 0 && 'lg:pl-10',
                )}
              >
                <ScrollFade className="py-12 lg:py-16">
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
                </ScrollFade>
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
