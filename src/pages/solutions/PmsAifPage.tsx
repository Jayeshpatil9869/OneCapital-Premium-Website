import { Link, Navigate } from 'react-router-dom';
import { BodyText, Button, Container, DisplayHeading } from '@/src/components/ui';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { SolutionsBreadcrumb } from '@/src/components/sections/solutions/shared/SolutionsBreadcrumb';
import { PmsAifComparisonSection } from '@/src/components/sections/solutions/PmsAifComparisonSection';
import {
  getProductById,
  getRelatedProducts,
  type ProductOffer,
} from '@/src/data/products';
import { getPillarById, getPillarPageHref } from '@/src/data/solutions-pillars';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildServiceJsonLd } from '@/src/lib/seo';

export default function PmsAifPage() {
  const page = getProductById('pms-aif');
  const pms = getProductById('pms');
  const aif = getProductById('aif');

  usePageSeo({
    title: page?.seoTitle ?? 'PMS and AIF',
    description: page?.seoDescription ?? '',
    path: page?.path ?? '/solutions/pms-aif',
    keywords: page?.keywords,
    image: '/images/solutions/solutions-hub.jpg',
    type: 'product',
    jsonLd:
      page && pms && aif
        ? [
            buildServiceJsonLd({
              name: pms.title,
              description: pms.seoDescription,
              path: page.path,
              serviceType: pms.title,
            }),
            buildServiceJsonLd({
              name: aif.title,
              description: aif.seoDescription,
              path: page.path,
              serviceType: aif.title,
            }),
          ]
        : undefined,
  });

  if (!page || !pms || !aif) return <Navigate to="/solutions" replace />;

  const related = getRelatedProducts(page.id);

  return (
    <div className="flex w-full flex-col bg-black text-white">
      <section className="border-b border-white/15 pt-[max(7.5rem,env(safe-area-inset-top))]">
        <Container className="mx-auto w-full max-w-[1400px] px-6 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <ScrollFade>
            <SolutionsBreadcrumb current={page.title} />
            <DisplayHeading className="mt-6 max-w-[16ch] text-white sm:mt-8">
              {page.title}
            </DisplayHeading>
            <BodyText className="mt-8 max-w-[40rem] text-base text-white/80 md:text-lg lg:text-xl">
              {page.opening}
            </BodyText>
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Button to="/contact" variant="primary" size="md" arrow="right">
                Discuss these products
              </Button>
              <Button to="#asset-classes" variant="secondary" size="md">
                Compare Asset Classes
              </Button>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* ─── SECTION 2: OUR PREMIUM ASSET CLASSES (PMS vs AIF Comparison) ─── */}
      <PmsAifComparisonSection />

      <ProductBlock product={pms} anchor="pms" />
      <ProductBlock product={aif} anchor="aif" />

      <ScrollFade as="section">
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            Other products
          </p>
          <ul className="mt-8 border-t border-white/15">
            {related.map((item) => (
              <li key={item.id} className="border-b border-white/15">
                <Link
                  to={item.path}
                  className="grid gap-2 py-6 transition-colors hover:text-white/80 sm:grid-cols-12 sm:gap-6 sm:py-7"
                >
                  <span className="font-sans text-lg font-medium tracking-tight text-white sm:col-span-4 sm:text-xl">
                    {item.title}
                  </span>
                  <span className="font-sans text-base font-light leading-relaxed text-white/60 sm:col-span-8">
                    {item.opening}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button to="/contact" variant="primary" size="md" arrow="right">
              Discuss these products
            </Button>
          </div>
        </Container>
      </ScrollFade>
    </div>
  );
}

function ProductBlock({ product, anchor }: { product: ProductOffer; anchor: string }) {
  const journey = getPillarById(product.journeyId);

  return (
    <section id={anchor} className="scroll-mt-28 border-b border-white/15">
      <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <ScrollFade>
          <h2 className="max-w-[18ch] font-sans text-[clamp(1.75rem,1rem+1.6vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-white">
            {product.title}
          </h2>
          <p className="mt-6 max-w-[42rem] font-sans text-base font-light leading-relaxed text-white/80 md:text-lg">
            {product.opening}
          </p>

          <dl className="mt-12 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-12">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                Who it is for
              </dt>
              <dd className="mt-4 font-sans text-base font-light leading-relaxed text-white/80">
                {product.audience}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                Eligibility
              </dt>
              <dd className="mt-4 font-sans text-base font-light leading-relaxed text-white/80">
                {product.eligibility}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
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

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60 lg:col-span-4">
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

          <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            What makes One Capital different
          </p>
          <p className="mt-4 max-w-[46rem] font-sans text-lg font-light leading-relaxed text-white md:text-xl">
            {product.difference}
          </p>
          {product.note ? (
            <p className="mt-8 max-w-3xl font-sans text-sm leading-relaxed text-white/60">
              {product.note}
            </p>
          ) : null}
        </ScrollFade>
      </Container>
    </section>
  );
}
