import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { ScrollColorText } from '@/src/components/motion/ScrollColorText';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { BodyText, Button, Container, DisplayHeading, SectionHeading } from '@/src/components/ui';
import {
  getProductChildren,
  getRelatedProducts,
  type ProductOffer,
  type StrategyDiagram,
} from '@/src/data/products';
import { getPillarById, getPillarPageHref } from '@/src/data/solutions-pillars';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';
import { SolutionsBreadcrumb } from './shared/SolutionsBreadcrumb';

gsap.registerPlugin(useGSAP);

type ProductOfferPageProps = {
  product: ProductOffer;
};

export function ProductOfferPage({ product }: ProductOfferPageProps) {
  const journey = getPillarById(product.journeyId);
  const related = getRelatedProducts(product.id);
  const children = getProductChildren(product.id);

  return (
    <div className="flex w-full flex-col bg-black text-white">
      <section className="border-b border-white/15 pt-[max(7.5rem,env(safe-area-inset-top))]">
        <Container className="mx-auto w-full max-w-[1400px] px-6 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <ScrollFade>
            <SolutionsBreadcrumb current={product.title} />
            <DisplayHeading className="mt-6 max-w-[16ch] text-white sm:mt-8">
              {product.title}
            </DisplayHeading>
            <BodyText className="mt-8 max-w-[40rem] text-base text-[#B3B3B3] md:text-lg lg:text-xl">
              {product.opening}
            </BodyText>
            <div className="mt-8 sm:mt-10">
              <Button to="/contact" variant="primary" size="md" arrow="right">
                Discuss this product
              </Button>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {product.diagram ? <StrategyDiagramView diagram={product.diagram} /> : null}

      <ScrollFade as="section" className="border-b border-white/15">
        <Container className="mx-auto max-w-[1400px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <dl className="grid gap-10 md:grid-cols-3 md:gap-12">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#757575]">
                Who it is for
              </dt>
              <dd className="mt-4 font-sans text-base font-light leading-relaxed text-[#B3B3B3]">
                {product.audience}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#757575]">
                Eligibility
              </dt>
              <dd className="mt-4 font-sans text-base font-light leading-relaxed text-[#B3B3B3]">
                {product.eligibility}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#757575]">
                How the work is done
              </dt>
              <dd className="mt-4 font-sans text-base font-light leading-relaxed text-white">
                {journey ? (
                  <Link
                    to={getPillarPageHref(journey.id)}
                    className="underline-offset-4 hover:underline"
                  >
                    {journey.title}
                  </Link>
                ) : null}
              </dd>
            </div>
          </dl>
        </Container>
      </ScrollFade>

      <ScrollFade as="section" className="border-b border-white/15">
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#757575] lg:col-span-4">
              Key features
            </p>
            <ol className="border-t border-white/15 lg:col-span-8">
              {product.features.map((feature, index) => (
                <li
                  key={feature}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/15 py-5 font-sans text-base leading-relaxed text-white sm:text-lg"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-white/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </ScrollFade>

      <section className="border-b border-white/15">
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            What makes One Capital different
          </p>
          <ScrollColorText text={product.difference} className="mt-4" />
        </Container>
      </section>

      {children.length > 0 ? (
        <ScrollFade as="section" className="border-b border-white/15">
          <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              Inside {product.navLabel}
            </p>
            <ul className="mt-8 border-t border-white/15">
              {children.map((child) => (
                <li key={child.path} className="border-b border-white/15">
                  <Link
                    to={child.path}
                    className="block py-5 font-sans text-lg font-medium tracking-tight text-white transition-colors hover:text-white/80 sm:text-xl"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </ScrollFade>
      ) : null}

      <ScrollFade as="section">
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <SectionHeading className="max-w-xl text-white">Other products</SectionHeading>
          <ul className="mt-10 border-t border-white/15">
            {related.map((item) => (
              <RelatedProductRow key={item.id} item={item} />
            ))}
          </ul>
          {product.note ? (
            <p className="mt-12 max-w-3xl font-sans text-sm leading-relaxed text-white/60">
              {product.note}
            </p>
          ) : null}
          <div className="mt-8">
            <Button to="/contact" variant="primary" size="md" arrow="right">
              Discuss this product
            </Button>
          </div>
        </Container>
      </ScrollFade>
    </div>
  );
}

function diagramHeading(kind: StrategyDiagram['kind']): string {
  switch (kind) {
    case 'stack':
      return 'The income path';
    case 'flow':
      return 'The hedge path';
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function stepMark(kind: StrategyDiagram['kind'], index: number): string | null {
  if (kind === 'stack' && index === 1) return '+';
  if (kind === 'stack' && index === 2) return '=';
  if (kind === 'flow' && index > 0) return '→';
  return null;
}

function StrategyDiagramView({ diagram }: { diagram: StrategyDiagram }) {
  return (
    <ScrollFade as="section" className="border-b border-white/15">
      <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
          {diagramHeading(diagram.kind)}
        </p>
        <ol className="mt-8 grid gap-px bg-white/15 md:grid-cols-3">
          {diagram.steps.map((step, index) => {
            const mark = stepMark(diagram.kind, index);
            return (
              <li key={step.title} className="bg-[#1D1D1D] px-6 py-8 sm:px-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-white/40">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {mark ? (
                    <span className="font-mono text-sm text-white/70" aria-hidden>
                      {mark}
                    </span>
                  ) : null}
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                  {step.kicker}
                </p>
                <p className="mt-3 max-w-[18rem] font-sans text-xl font-medium tracking-tight text-white">
                  {step.title}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </ScrollFade>
  );
}

function RelatedProductRow({ item }: { item: ProductOffer }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const link = linkRef.current;
      const cover = coverRef.current;
      if (!link || !cover || !contextSafe) return;

      gsap.set(cover, { yPercent: -100 });
      if (prefersReducedMotion()) return;

      const slide = contextSafe((yPercent: number) => {
        gsap.to(cover, { yPercent, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      });
      const enter = () => slide(0);
      const leave = () => slide(-100);

      link.addEventListener('mouseenter', enter);
      link.addEventListener('mouseleave', leave);
      link.addEventListener('focus', enter);
      link.addEventListener('blur', leave);
      return () => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
        link.removeEventListener('focus', enter);
        link.removeEventListener('blur', leave);
      };
    },
    { scope: linkRef },
  );

  return (
    <li className="border-b border-white/15">
      <Link
        ref={linkRef}
        to={item.path}
        className="relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        <RelatedProductCopy item={item} tone="rest" />
        <div ref={coverRef} className="absolute inset-0 bg-white" aria-hidden="true">
          <RelatedProductCopy item={item} tone="cover" />
        </div>
      </Link>
    </li>
  );
}

function RelatedProductCopy({ item, tone }: { item: ProductOffer; tone: 'rest' | 'cover' }) {
  const cover = tone === 'cover';

  return (
    <div className={cn('grid gap-2 py-6 sm:grid-cols-12 sm:gap-6 sm:py-7', cover && 'h-full bg-white')}>
      <span
        className={cn(
          'font-sans text-lg font-medium tracking-tight sm:col-span-4 sm:text-xl',
          cover ? 'text-black' : 'text-white',
        )}
      >
        {item.title}
      </span>
      <span
        className={cn(
          'font-sans text-base font-light leading-relaxed sm:col-span-8',
          cover ? 'text-black/70' : 'text-[#B3B3B3]',
        )}
      >
        {item.opening}
      </span>
    </div>
  );
}
