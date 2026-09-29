import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
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
  /** Optional Monthly / Lumpsum switch (SIP & Lumpsum pages). */
  modeToggle?: ReactNode;
  /** Optional invested / returns for donut breakdown. */
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
      <Section pad="lg" className="relative pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -left-[20%] top-[10%] h-[min(42rem,70vw)] w-[min(42rem,70vw)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,transparent_68%)] blur-3xl" />
        </div>

        <Container className="relative z-10">
          <RevealOnScroll className="mb-8 md:mb-10">
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
                <h1 className="font-sans text-[clamp(2.25rem,1.6rem+1.8vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance text-white">
                  {title}
                </h1>
                <p className="max-w-xl font-sans text-base font-light leading-relaxed text-white/65">
                  {subtitle}
                </p>
              </div>
              <CalculatorSideNav active={slug} className="shrink-0 lg:mb-1" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 xl:gap-8">
            {/* Left — inputs (reference control panel) */}
            <RevealOnScroll className="lg:col-span-5 xl:col-span-4">
              <div className="flex h-full flex-col gap-7 rounded-3xl border border-white/12 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-black/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-8">
                <div className="flex flex-col gap-4">
                  <h2 className="font-sans text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    Adjust inputs
                  </h2>
                  {modeToggle}
                </div>
                <div className="flex flex-col gap-7">{controls}</div>
                <Button to="/contact" variant="primary" size="md" arrow="right" className="mt-auto w-full">
                  Talk to an advisor
                </Button>
              </div>
            </RevealOnScroll>

            {/* Right — summary + charts */}
            <RevealOnScroll delay={0.06} className="lg:col-span-7 xl:col-span-8">
              <div className="flex flex-col gap-5 rounded-3xl border border-white/12 bg-white/[0.025] p-5 sm:p-7 lg:p-8">
                {results}

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                  <div className={breakdown ? 'xl:col-span-8' : 'xl:col-span-12'}>{chart}</div>
                  {breakdown ? (
                    <AllocationDonut
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

      <Section pad="lg" tone="panel">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-12">
            {infoSections.map((section) => (
              <article key={section.id} className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="text-base leading-relaxed text-white/60">
                    {p}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="list-disc space-y-2 pl-5 text-base text-white/60">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}

            {faqs.length > 0 ? (
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
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
            ) : null}

            <p className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm leading-relaxed text-white/45">
              {CALCULATOR_DISCLAIMER}
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
