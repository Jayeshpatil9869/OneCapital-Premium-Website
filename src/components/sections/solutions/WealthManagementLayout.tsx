import { Button, Container } from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { ScrollFade } from '@/src/components/motion/ScrollFade';

const OFFERS = [
  {
    title: 'Risk Review',
    body: 'We begin by understanding your finances, investment experience, ability to bear losses and comfort with risk before we advise.',
  },
  {
    title: 'Exposure',
    body: 'We look at where your wealth is invested and whether too much depends on one company, sector, asset class or source of income.',
  },
  {
    title: 'Liquidity',
    body: 'We consider near-term commitments and access to funds, so your plan accounts for cash needs.',
  },
  {
    title: 'Tax Matters',
    body: 'We consider tax implications and coordinate with your CA where specialist guidance is needed.',
  },
  {
    title: 'Succession',
    body: 'We discuss nominations and continuity, with legal specialists involved when appropriate.',
  },
] as const;

const ADVANTAGES = [
  {
    title: 'Research Led',
    body: 'We examine options, costs and risks before discussing what may suit your needs.',
  },
  {
    title: 'Meet In Person',
    body: 'We make room for face-to-face discussions in Maharashtra when available.',
  },
  {
    title: 'Clear Disclosures',
    body: 'We explain the advisory or distribution role involved before you decide.',
  },
  {
    title: 'Working With CAs',
    body: 'We coordinate with your CA on relevant tax matters, with your consent.',
  },
  {
    title: 'Plan For Transfer',
    body: 'We help you review nominations and records for smoother family transitions.',
  },
  {
    title: 'A Personal Guide',
    body: 'You have a person to speak with as your needs and circumstances evolve.',
  },
] as const;

export function WealthManagementLayout() {
  return (
    <div className="w-full bg-canvas text-text-main">
      <section className="px-6 py-16 sm:px-8 md:py-24 lg:px-12">
        <Container className="max-w-[46rem]">
          <RevealOnScroll>
            <p className="text-center text-base font-light leading-[1.7] text-text-muted md:text-lg">
              Wealth is personal. Your plans may include family security, future milestones and
              financial independence. We bring your priorities together through considered advice,
              clear conversations and regular reviews.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="px-6 pb-8 sm:px-8 lg:px-12" aria-labelledby="wealth-offer-heading">
        <Container>
          <RevealOnScroll className="mb-10 text-center md:mb-14">
            <h2
              id="wealth-offer-heading"
              className="font-sans text-3xl font-medium tracking-tight text-white md:text-4xl"
            >
              What We Consider
            </h2>
          </RevealOnScroll>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
            {OFFERS.map((offer, index) => (
              <ScrollFade
                as="li"
                key={offer.title}
                delay={index * 0.08}
                className={
                  index < 2
                    ? 'rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:col-span-3 md:p-8'
                    : 'rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:col-span-2 md:p-8'
                }
              >
                <h3 className="text-lg font-medium tracking-tight text-white md:text-xl">{offer.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-text-muted md:text-base">
                  {offer.body}
                </p>
              </ScrollFade>
            ))}
          </ul>

          <ScrollFade delay={0.2} className="mt-10 flex justify-center md:mt-14">
            <Button to="/contact" variant="primary" size="md">
              Book a conversation
            </Button>
          </ScrollFade>
        </Container>
      </section>

      <section className="px-6 py-16 sm:px-8 md:py-24 lg:px-12" aria-labelledby="wealth-advantage-heading">
        <Container>
          <RevealOnScroll className="mb-10 text-center md:mb-14">
            <h2
              id="wealth-advantage-heading"
              className="font-sans text-3xl font-medium tracking-tight text-white md:text-4xl"
            >
              How One Capital Works
            </h2>
          </RevealOnScroll>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {ADVANTAGES.map((item, index) => (
              <ScrollFade
                as="li"
                key={item.title}
                delay={index * 0.07}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <h3 className="text-lg font-medium tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-text-muted md:text-base">
                  {item.body}
                </p>
              </ScrollFade>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
