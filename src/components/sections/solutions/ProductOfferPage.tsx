import { Link } from 'react-router-dom';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { BodyText, Button, Container, DisplayHeading, SectionHeading } from '@/src/components/ui';
import { getRelatedProducts, type ProductOffer } from '@/src/data/products';
import { getPillarById, getPillarPageHref } from '@/src/data/solutions-pillars';
import { SolutionsBreadcrumb } from './shared/SolutionsBreadcrumb';

type ProductOfferPageProps = {
  product: ProductOffer;
};

export function ProductOfferPage({ product }: ProductOfferPageProps) {
  const journey = getPillarById(product.journeyId);
  const related = getRelatedProducts(product.id);

  return (
    <div className="flex w-full flex-col bg-black text-white">
      <section className="border-b border-white/15 pt-[max(7.5rem,env(safe-area-inset-top))]">
        <Container className="mx-auto w-full max-w-[1400px] px-6 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <RevealOnScroll trigger="load" direction="up" distance={24} duration={1} ease="power3.out">
            <SolutionsBreadcrumb current={product.title} />
            <DisplayHeading className="mt-6 max-w-[16ch] text-white sm:mt-8">
              {product.title}
            </DisplayHeading>
            <BodyText className="mt-8 max-w-[40rem] text-base text-white/80 md:text-lg lg:text-xl">
              {product.opening}
            </BodyText>
            <div className="mt-8 sm:mt-10">
              <Button to="/contact" variant="primary" size="md" arrow="right">
                Discuss this product
              </Button>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="border-b border-white/15">
        <Container className="mx-auto max-w-[1400px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <dl className="grid gap-10 md:grid-cols-3 md:gap-12">
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
        </Container>
      </section>

      <section className="border-b border-white/15">
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
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
        </Container>
      </section>

      <section className="border-b border-white/15">
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            What makes One Capital different
          </p>
          <SectionHeading className="mt-4 max-w-4xl text-white">{product.difference}</SectionHeading>
        </Container>
      </section>

      <section>
        <Container className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <SectionHeading className="max-w-xl text-white">Other products</SectionHeading>
          <ul className="mt-10 border-t border-white/15">
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
      </section>
    </div>
  );
}
