import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Button, Container } from '@/src/components/ui';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { PRODUCT_GROUPS, getProductsInGroup } from '@/src/data/products';
import { SOLUTIONS_HUB } from '@/src/data/solutions-pages';
import {
  PORTFOLIO_MANAGEMENT_FOOTNOTE,
  SOLUTION_PILLARS,
  getPillarPageHref,
  type SolutionPillar,
} from '@/src/data/solutions-pillars';
import { cn } from '@/src/lib/utils';

gsap.registerPlugin(useGSAP);

const ink = {
  dark: 'bg-black text-white',
  light: 'light-section bg-white text-black',
} as const;

export function SolutionsCatalogue() {
  const { hero, intro, trust } = SOLUTIONS_HUB;
  const [activeId, setActiveId] = useState(SOLUTION_PILLARS[0]?.id ?? '');

  useEffect(() => {
    const sections = SOLUTION_PILLARS.map((pillar) =>
      document.getElementById(pillar.id),
    ).filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-30% 0px -45% 0px', threshold: [0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-black text-white">
      <section className="border-b border-white/15 pt-[max(7.5rem,env(safe-area-inset-top))]">
        <Container className="mx-auto max-w-[1400px] px-6 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <RevealOnScroll trigger="load" direction="up" distance={24} duration={1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              Products
            </p>
            <h1 className="mt-6 max-w-[12ch] font-sans text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.5rem]">
              {hero.line1}
              <span className="mt-1 block text-white/40">{hero.line2}</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={18}
            delay={0.12}
            duration={0.9}
            className="mt-10 grid gap-10 border-t border-white/15 pt-8 lg:grid-cols-12 lg:gap-12"
          >
            <p className="max-w-md font-sans text-base font-light leading-relaxed text-white/75 lg:col-span-5 lg:text-lg">
              {hero.description}
            </p>
            <nav aria-label="Product index" className="lg:col-span-7 lg:col-start-6">
              <ol className="divide-y divide-white/15 border-y border-white/15">
                {SOLUTION_PILLARS.map((pillar) => (
                  <li key={pillar.id}>
                    <a
                      href={`#${pillar.id}`}
                      aria-label={`${pillar.title}, ${pillar.services.length} services`}
                      className={cn(
                        'flex items-baseline justify-between gap-6 py-3.5 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base',
                        activeId === pillar.id ? 'text-white' : 'text-white/60 hover:text-white',
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] tracking-[0.16em]">{pillar.index}</span>
                        <span>{pillar.title}</span>
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.14em]">
                        {String(pillar.services.length).padStart(2, '0')}
                        <span className="sr-only"> services</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </RevealOnScroll>
        </Container>
      </section>

      <section className={cn(ink.light, 'border-b border-black/10')}>
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <RevealOnScroll className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
            <p className="font-sans text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-balance sm:text-3xl lg:col-span-7 lg:text-[2.35rem]">
              {intro.statement}
            </p>
            <p className="max-w-md font-sans text-base font-light leading-relaxed text-black/65 lg:col-span-4 lg:col-start-9 lg:text-lg">
              {intro.body}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {SOLUTION_PILLARS.map((pillar, index) => (
        <Mandate
          key={pillar.id}
          pillar={pillar}
          tone={index % 2 === 0 ? 'dark' : 'light'}
        />
      ))}

      <section id="what-we-offer" className="scroll-mt-28 border-b border-white/10 bg-black text-white">
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">What we offer</p>
          <h2 className="mt-4 max-w-3xl font-sans text-[clamp(1.5rem,1rem+2vw,3rem)] font-medium leading-tight tracking-tight">
            Nine products. One research view.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-text-muted md:text-xl">
            Mutual funds, PMS, AIFs, equity, baskets, broking, and investment advisory. Research comes first. The product is chosen after the strategy.
          </p>
          <div className="mt-16">
            {PRODUCT_GROUPS.map((group) => (
              <div
                key={group.id}
                className="grid gap-8 border-t border-white/15 py-10 lg:grid-cols-12 lg:gap-16 lg:py-12"
              >
                <h3 className="font-sans text-2xl font-medium tracking-tight text-white lg:col-span-4 lg:text-3xl">
                  {group.title}
                </h3>
                <ul className="border-t border-white/15 lg:col-span-8">
                  {getProductsInGroup(group.id).map((product) => (
                    <li key={product.id} className="border-b border-white/15">
                      <Link
                        to={product.path}
                        className="grid gap-2 py-7 transition-colors hover:text-white/80 sm:grid-cols-12 sm:gap-6 sm:py-8"
                      >
                        <span className="font-sans text-lg font-medium tracking-tight text-white sm:col-span-4 sm:text-xl">
                          {product.title}
                        </span>
                        <span className="font-sans text-sm font-light leading-relaxed text-white/60 sm:col-span-5 sm:text-base">
                          {product.audience}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 sm:col-span-3">
                          {product.eligibility}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={cn(ink.light, 'border-t border-black/10')}>
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/60">
                {trust.eyebrow}
              </p>
              <h2 className="mt-4 max-w-[16ch] font-sans text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
                {trust.headline}
              </h2>
              <Button
                to="/contact"
                variant="outline"
                size="sm"
                className="mt-8 rounded-none normal-case tracking-normal font-sans text-sm font-medium text-black"
              >
                Discuss a mandate
              </Button>
            </div>
            <ol className="border-t border-black/15 lg:col-span-6 lg:col-start-7">
              {trust.points.map((point, index) => (
                <li
                  key={point}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-black/15 py-5 font-sans text-base leading-relaxed text-black/80 sm:text-lg"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-black/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    </div>
  );
}

function Mandate({
  pillar,
  tone,
}: {
  pillar: SolutionPillar;
  tone: keyof typeof ink;
}) {
  const light = tone === 'light';
  const rootRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const aside = asideRef.current;
        const list = listRef.current;
        if (!aside || !list) return;

        const pinOffset = () => {
          const bar = document.querySelector<HTMLElement>('[data-site-nav]');
          const bottom = bar?.getBoundingClientRect().bottom ?? 96;
          return Math.ceil(bottom + 20);
        };

        ScrollTrigger.create({
          trigger: aside,
          start: () => `top ${pinOffset()}px`,
          end: () => `+=${Math.max(0, list.offsetHeight - aside.offsetHeight)}`,
          pin: aside,
          pinSpacing: false,
          pinType: 'fixed',
          invalidateOnRefresh: true,
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id={pillar.id}
      className={cn(ink[tone], 'scroll-mt-28 border-b border-current/10')}
      aria-labelledby={`${pillar.id}-heading`}
    >
      <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div ref={asideRef} className="lg:col-span-4 lg:self-start">
            <p className={cn('font-mono text-[11px] tracking-[0.2em]', light ? 'text-black/55' : 'text-white/60')}>
              {pillar.index}
            </p>
            <h2
              id={`${pillar.id}-heading`}
              className="mt-3 font-sans text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl"
            >
              {pillar.title}
            </h2>
            <p className={cn('mt-4 max-w-sm font-sans text-base leading-relaxed', light ? 'text-black/65' : 'text-white/65')}>
              {pillar.summary}
            </p>
            <Link
              to={getPillarPageHref(pillar.id)}
              className={cn(
                'mt-6 inline-flex font-mono text-[11px] uppercase tracking-[0.16em] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4',
                light ? 'focus-visible:outline-black' : 'focus-visible:outline-white',
              )}
            >
              View {pillar.title}
            </Link>
          </div>

          <div ref={listRef} className="lg:col-span-8">
            <ul className="border-t border-current/15">
              {pillar.services.map((service) => (
                <li key={service.id} className="border-b border-current/15 py-7 sm:py-8">
                  <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
                    <h3 className="font-sans text-lg font-medium tracking-tight sm:col-span-5 sm:text-xl">
                      {service.title}
                    </h3>
                    <p className={cn('font-sans text-sm leading-relaxed sm:col-span-7 sm:text-base', light ? 'text-black/60' : 'text-white/60')}>
                      <span className={cn('mb-1 block', light ? 'text-black' : 'text-white')}>
                        {service.tagline}
                      </span>
                      {service.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {pillar.id === 'portfolio-management' ? (
              <p className={cn('mt-4 font-sans text-sm leading-relaxed', light ? 'text-black/50' : 'text-white/45')}>
                {PORTFOLIO_MANAGEMENT_FOOTNOTE}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
