import { Button, Container } from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { COMPANY } from '@/src/data/company';

const OFFERS = [
  {
    title: 'Risk profiling',
    body: 'Ability is income, loans, and when you need the money. Willingness is how you behave when equity falls. The profile sets a ceiling before a fund is chosen.',
  },
  {
    title: 'Concentration',
    body: 'Employer stock, the family business, one fund house, or one sector should not be copied again inside the portfolio.',
  },
  {
    title: 'Liquidity',
    body: 'The next year’s spending and an emergency reserve stay in the bank or in liquid and short-duration funds. Equity is not asked to pay a dated bill.',
  },
  {
    title: 'Tax-aware investing',
    body: 'ELSS, holding periods, and capital gains are planned with your chartered accountant. A tax saving does not override a bad fit. We do not file returns.',
  },
  {
    title: 'Nominations and succession',
    body: 'We review folio and demat nominations and talk through who should receive what. Wills and trusts stay with your lawyer. We do not draft them.',
  },
] as const;

const ADVANTAGES = [
  {
    title: 'Research before products',
    body: 'Research first. Strategy next. Investment last. The fund list follows the written plan.',
  },
  {
    title: 'Maharashtra, in person',
    body: `${COMPANY.hqCity} headquarters, with offices in Mumbai, Kolhapur, and Nashik.`,
  },
  {
    title: 'Registered distribution',
    body: `Mutual funds are offered as an AMFI-registered distributor, ARN-${COMPANY.amfiArn}.`,
  },
  {
    title: 'Tax, with your CA',
    body: 'Holding periods and switches are discussed with the person who files your return.',
  },
  {
    title: 'Accounts that can transfer',
    body: 'Nominations are checked so the investment accounts are not the gap in a family plan.',
  },
  {
    title: 'One advisory relationship',
    body: 'Capital strategy, the portfolio, and this risk work sit in the same conversation.',
  },
] as const;

export function WealthManagementLayout() {
  return (
    <div className="w-full bg-canvas text-text-main">
      <section className="px-6 py-16 sm:px-8 md:py-24 lg:px-12">
        <Container className="max-w-[46rem]">
          <RevealOnScroll>
            <p className="text-center text-base font-light leading-[1.7] text-text-muted md:text-lg">
              Wealth management here is the structure beside the funds: how much risk you can live
              with, where the next year’s cash comes from, how tax changes what you keep, and who
              receives the accounts if you are not here to sign.
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
              What this covers
            </h2>
          </RevealOnScroll>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
            {OFFERS.map((offer, index) => (
              <li
                key={offer.title}
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
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center md:mt-14">
            <Button to="/contact" variant="primary" size="md">
              Book a conversation
            </Button>
          </div>
        </Container>
      </section>

      <section className="px-6 py-16 sm:px-8 md:py-24 lg:px-12" aria-labelledby="wealth-advantage-heading">
        <Container>
          <RevealOnScroll className="mb-10 text-center md:mb-14">
            <h2
              id="wealth-advantage-heading"
              className="font-sans text-3xl font-medium tracking-tight text-white md:text-4xl"
            >
              How {COMPANY.brandName} works
            </h2>
          </RevealOnScroll>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {ADVANTAGES.map((item) => (
              <li
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <h3 className="text-lg font-medium tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-text-muted md:text-base">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
