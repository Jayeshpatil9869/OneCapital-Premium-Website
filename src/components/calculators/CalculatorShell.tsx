import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import {
  Container,
  Section,
  Eyebrow,
  Button,
} from '@/src/components/ui';
import { Accordion } from '@/src/components/ui/overlays/Accordion';
import {
  CALCULATOR_DISCLAIMER,
  type CalculatorFaq,
  type CalculatorInfoSection,
  type CalculatorSlug,
} from '@/src/data/calculators';
import { AllocationDonut } from './AllocationDonut';
import { CalculatorSideNav } from './CalculatorSideNav';
import type { ReactNode } from 'react';

type CalculatorShellProps = {
  slug: CalculatorSlug;
  title: string;
  subtitle: string;
  controls: ReactNode;
  results: ReactNode;
  chart?: ReactNode;
  modeToggle?: ReactNode;
  breakdown?: {
    invested: number;
    returns: number;
    investedLabel?: string;
    returnsLabel?: string;
  };
  infoSections: CalculatorInfoSection[];
  faqs: CalculatorFaq[];
};

export function CalculatorShell({
  slug,
  title,
  subtitle,
  controls,
  results,
  chart,
  modeToggle,
  breakdown,
  infoSections,
  faqs,
}: CalculatorShellProps) {
  return (
    <div className="flex w-full flex-col items-center">
      {/* pad none + explicit pb — avoid large black band under cards (ISSUE-02). */}
      <Section pad="none" className="relative bg-black pt-28 pb-6 md:pt-32 md:pb-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -right-[8%] top-[12%] h-[min(26rem,48vw)] w-[min(26rem,48vw)] rounded-full bg-[radial-gradient(circle,var(--color-accent-soft)_0%,transparent_70%)] blur-3xl" />
        </div>

        <Container className="relative z-10">
          <RevealOnScroll trigger="load" className="relative z-30 mb-8 md:mb-10">
            <Link
              to="/calculators"
              className="inline-flex w-fit items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All calculators
            </Link>
            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="flex min-h-[9.5rem] max-w-2xl flex-col justify-end gap-3">
                <Eyebrow>Calculator</Eyebrow>
                <h1 className="scroll-mt-28 font-sans text-[clamp(2.25rem,1.6rem+1.8vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance text-white">
                  {title}
                </h1>
                <p className="max-w-xl font-sans text-base font-light leading-relaxed text-white/65">
                  {subtitle}
                </p>
              </div>
              <CalculatorSideNav active={slug} className="relative z-30 shrink-0 lg:mb-1" />
            </div>
          </RevealOnScroll>

          {/* disabled: money UI must never sit at opacity 0 over bg-black (ISSUE-03). */}
          <div className="relative z-0 grid scroll-mt-28 grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 xl:gap-8">
            <RevealOnScroll disabled className="lg:col-span-5 xl:col-span-4">
              <div className="flex h-full flex-col gap-7 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-8">
                <div className="flex flex-col gap-4">
                  <h2 className="font-sans text-xl font-semibold tracking-tight text-black sm:text-2xl">
                    Adjust inputs
                  </h2>
                  {modeToggle}
                </div>
                <div className="flex flex-col gap-7">{controls}</div>
                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  arrow="right"
                  className="mt-auto w-full !bg-black !text-white hover:!bg-black/90"
                >
                  Talk to an advisor
                </Button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll disabled className="lg:col-span-7 xl:col-span-8">
              <div className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-black/10 bg-white p-5 shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:p-7 lg:p-8">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent"
                  aria-hidden
                />
                {results}

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                  <div className={breakdown ? 'xl:col-span-8' : 'xl:col-span-12'}>{chart}</div>
                  {breakdown ? (
                    <AllocationDonut
                      theme="light"
                      className="xl:col-span-4"
                      invested={breakdown.invested}
                      returns={breakdown.returns}
                      investedLabel={breakdown.investedLabel}
                      returnsLabel={breakdown.returnsLabel}
                    />
                  ) : null}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section pad="lg" tone="light" className="border-t border-black/10 bg-white">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-12">
            {infoSections.map((section) => (
              <ScrollFade key={section.id} className="w-full">
                <article className="flex flex-col gap-4">
                  <h2 className="text-2xl font-medium tracking-tight text-black sm:text-3xl">
                    {section.title}
                  </h2>
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)} className="text-base leading-relaxed text-black/60">
                      {p}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-5 text-base text-black/60">
                      {section.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </ScrollFade>
            ))}

            {faqs.length > 0 ? (
              <ScrollFade className="w-full">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-medium tracking-tight text-black sm:text-3xl">
                    Frequently asked questions
                  </h2>
                  <Accordion
                    items={faqs.map((faq) => ({
                      id: faq.id,
                      title: faq.question,
                      content: faq.answer,
                    }))}
                  />
                </div>
              </ScrollFade>
            ) : null}

            <ScrollFade className="w-full">
              <p className="rounded-2xl border border-black/10 bg-[#F4F3F0] p-5 text-sm leading-relaxed text-black/55">
                {CALCULATOR_DISCLAIMER}
              </p>
            </ScrollFade>
          </div>
        </Container>
      </Section>
    </div>
  );
}
