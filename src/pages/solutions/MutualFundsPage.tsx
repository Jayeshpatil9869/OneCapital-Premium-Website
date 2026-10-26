import { Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  BarChart3,
  CheckCircle2,
  Compass,
  Percent,
  PieChart,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { MutualFundCalculatorEmbed } from '@/src/components/calculators/MutualFundCalculatorEmbed';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { SolutionsBreadcrumb } from '@/src/components/sections/solutions/shared/SolutionsBreadcrumb';
import { Button, Container, DisplayHeading } from '@/src/components/ui';
import { getProductById } from '@/src/data/products';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildServiceJsonLd } from '@/src/lib/seo';

// Exact Why Choose One Capital pillars from the blueprint - Clean Black & White with thin borders
const WHY_CHOOSE_PILLARS = [
  {
    icon: Ban,
    title: 'Goals Before Products',
    description:
      'We begin with your goals and timeline before discussing any mutual fund scheme.',
  },
  {
    icon: Compass,
    title: 'Risk-Aware Choices',
    description:
      "We consider your risk capacity and comfort alongside each scheme's risk profile.",
  },
  {
    icon: Percent,
    title: 'Research With Context',
    description:
      'We discuss fund objectives, holdings, costs and fit, not recent returns alone.',
  },
  {
    icon: BarChart3,
    title: 'Clear Cost Discussion',
    description:
      'Understand fees, expense ratios and plan options before making a decision.',
  },
  {
    icon: UserCheck,
    title: 'Personal Conversations',
    description:
      'Ask questions, discuss concerns and understand the reasons behind each option.',
  },
  {
    icon: ShieldCheck,
    title: 'Reviews That Matter',
    description:
      'Revisit investments when your goals, circumstances or portfolio needs change.',
  },
];

// Exact Approach steps from the blueprint
const APPROACH_STEPS = [
  {
    number: '01',
    title: 'Know Your Goals',
    description: 'We discuss your needs, priorities and expected timelines.',
  },
  {
    number: '02',
    title: 'Assess Your Risk',
    description: 'We assess suitability, capacity for loss and risk comfort.',
  },
  {
    number: '03',
    title: 'Review Holdings',
    description: 'We examine existing investments and potential overlap.',
  },
  {
    number: '04',
    title: 'Discuss Options',
    description: 'We explain relevant categories, schemes, fees and risks.',
  },
  {
    number: '05',
    title: 'Revisit The Plan',
    description: 'We review changes in your life and investment needs.',
  },
];

// Investment categories from the blueprint
const CATEGORIES = [
  {
    name: 'Equity Funds',
    description: 'Invest in equities; values may fluctuate.',
    tag: 'Growth',
  },
  {
    name: 'Debt Funds',
    description: 'Debt exposure carries credit and rate risks.',
    tag: 'Income',
  },
  {
    name: 'Hybrid Funds',
    description: 'Mix asset classes with varying risk profiles.',
    tag: 'Balanced',
  },
];

export default function MutualFundsPage() {
  const product = getProductById('mutual-funds');

  usePageSeo({
    title: product?.seoTitle ?? 'Mutual Funds | ONE CAPITAL',
    description:
      product?.seoDescription ??
      'Build wealth systematically with professionally managed investment portfolios across equity, debt, and hybrid categories.',
    path: product?.path ?? '/solutions/mutual-funds',
    keywords: product?.keywords,
    image: '/images/solutions/solutions-hub.jpg',
    type: 'product',
    jsonLd: product
      ? buildServiceJsonLd({
          name: product.title,
          description: product.seoDescription,
          path: product.path,
          serviceType: product.title,
        })
      : undefined,
  });

  if (!product) return <Navigate to="/solutions" replace />;

  return (
    <div className="flex w-full flex-col bg-black text-white selection:bg-black selection:text-white">
      {/* ─── HERO SECTION (One Capital Signature Black Canvas with Clean White/Black Nav Pill) ─── */}
      <header className="relative border-b border-white/10 pt-[max(7.5rem,env(safe-area-inset-top))]">
        <Container className="mx-auto w-full max-w-[1400px] px-6 pb-16 sm:px-8 lg:px-12 lg:pb-24">
          <ScrollFade>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SolutionsBreadcrumb current="Mutual Funds" />
              {/* Dezerv-style clean black & white pill button */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-white/90 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="mt-10 sm:mt-12 text-center max-w-4xl mx-auto">
              <DisplayHeading className="text-white text-balance tracking-tight">
                Mutual Funds
              </DisplayHeading>
              <p className="mt-6 text-base sm:text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
                Explore mutual fund investing with guidance grounded in your goals, risk profile and investment horizon.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button to="/contact" variant="primary" size="md" arrow="right">
                  Schedule Portfolio Review
                </Button>
                <Button to="#mutual-fund-calculator" variant="secondary" size="md">
                  Explore SIP Calculator
                </Button>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </header>

      {/* ─── MAIN DEZERV-INSPIRED LIGHT SECTION (Off-White Backdrop, Pure White Cards, Black Typography, Thin Borders) ─── */}
      <main className="relative w-full bg-black text-white">
        {/* ─── SECTION 1: WHAT ARE MUTUAL FUNDS & INVESTMENT CATEGORIES ─── */}
        <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
          <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
              {/* Left Column: What are Mutual Funds */}
              <ScrollFade className="lg:col-span-6">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
                  Foundational Concept
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  Understanding Funds
                </h2>
                <p className="mt-6 font-sans text-base sm:text-lg font-normal leading-relaxed text-[#B3B3B3]">
                  Mutual funds pool money from investors and invest it in securities according to a defined scheme objective. Professional fund managers make investment decisions within the scheme mandate. Returns are market-linked, and the value of your investment can rise or fall.
                </p>

                <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#262626] text-white border border-white/10">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm font-normal text-[#B3B3B3]">
                      <strong className="font-semibold text-white">Pooling:</strong> Investors participate in a professionally managed pool of assets.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#262626] text-white border border-white/10">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm font-normal text-[#B3B3B3]">
                      <strong className="font-semibold text-white">Market Risk:</strong> Returns are not assured; scheme risks and costs differ.
                    </p>
                  </div>
                </div>
              </ScrollFade>

              {/* Right Column: Investment Categories Card (Pure White Card with Thin Borders) */}
              <ScrollFade className="lg:col-span-6" delay={0.15}>
                <div className="relative rounded-3xl border border-white/10 bg-[#1D1D1D] p-6 text-white sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/20">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#262626] text-white border border-white/10">
                      <PieChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-white">
                        Investment Categories
                      </h3>
                      <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575]">
                        Core Portfolio Pillars
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {CATEGORIES.map((category) => (
                      <div
                        key={category.name}
                        className="group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-[#262626] p-4 transition-all duration-300 hover:bg-[#2b2b2b] hover:border-white/20"
                      >
                        {/* Sleek white accent strip */}
                        <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-white transition-transform duration-300 group-hover:scale-y-110" />

                        <div className="mt-0.5 ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-white border border-white/10">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>

                        <div className="flex-1 pr-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-sans text-base font-semibold text-white">
                              {category.name}
                            </h4>
                            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-[0.12em] text-white/80 border border-white/10">
                              {category.tag}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-normal text-[#B3B3B3] leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            </div>
          </Container>
        </section>

        {/* ─── SECTION 2: MUTUAL FUND CALCULATORS (Replaces Advantages Section) ─── */}
        <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
          <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <ScrollFade>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
                    Calculator
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                    Plan Your SIP
                  </h2>
                  <p className="mt-4 font-sans text-base font-normal text-[#B3B3B3] leading-relaxed">
                    Explore how contribution amounts and time horizons affect illustrative outcomes, not guaranteed returns.
                  </p>
                </div>
                <Link
                  to="/calculators"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white shrink-0"
                >
                  <span>View all calculators</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollFade>

            <MutualFundCalculatorEmbed />
          </Container>
        </section>

        {/* ─── SECTION 3: WHY CHOOSE ONE CAPITAL FOR MUTUAL FUNDS? ─── */}
        <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
          <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <ScrollFade className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
                Why One Capital
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                Guidance Beyond Fund Selection
              </h2>
              <p className="mt-4 font-sans text-base font-normal leading-relaxed text-[#B3B3B3]">
                We start with your needs, explain the trade-offs and help you make informed mutual fund decisions.
              </p>
            </ScrollFade>

            {/* 6 Feature Cards in Clean Monochrome Palette */}
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
              {WHY_CHOOSE_PILLARS.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <ScrollFade key={pillar.title} delay={index * 0.08}>
                    <div className="group relative h-full rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-white sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-white/20 hover:bg-[#262626] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-sans text-lg sm:text-xl font-semibold text-white">
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="mt-5 font-sans text-sm sm:text-base font-normal leading-relaxed text-[#B3B3B3]">
                        {pillar.description}
                      </p>
                    </div>
                  </ScrollFade>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ─── SECTION 4: OUR APPROACH TO FUND SELECTION ─── */}
        <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
          <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            <ScrollFade>
              <div className="max-w-2xl">
                <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
                  Our Approach
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  Your Journey, Step by Step
                </h2>
                <p className="mt-4 font-sans text-base font-normal text-[#B3B3B3]">
                  A clear conversation, a considered plan and ongoing attention to your priorities.
                </p>
              </div>
            </ScrollFade>

            {/* 5 Stacked Cards with Clean Monochrome Accent Line */}
            <div className="mt-12 space-y-4">
              {APPROACH_STEPS.map((step, index) => (
                <ScrollFade key={step.title} delay={index * 0.06}>
                  <div className="group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-[#1D1D1D] p-5 text-white sm:items-center sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-white/20 hover:bg-[#262626] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                    {/* Clean white accent line */}
                    <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-white transition-all duration-300 group-hover:scale-y-105" />

                    <div className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#262626] text-white border border-white/10">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>

                    <div className="flex-1">
                      <p className="font-sans text-base sm:text-lg font-normal text-white">
                        <strong className="font-semibold text-white mr-1.5">
                          {step.title}:
                        </strong>
                        <span className="text-[#B3B3B3]">{step.description}</span>
                      </p>
                    </div>

                    <span className="hidden sm:block font-mono text-xs tracking-[0.2em] text-[#757575] group-hover:text-white transition-colors">
                      STEP {step.number}
                    </span>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </Container>
        </section>

      </main>
    </div>
  );
}
