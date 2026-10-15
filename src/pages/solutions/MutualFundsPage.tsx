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
    title: 'No "Top Performers" Gimmicks',
    description:
      'Carefully selected mutual funds based on forward-looking market analysis, not just past performance.',
  },
  {
    icon: Compass,
    title: 'Market Scenario & Sector Outlook',
    description:
      'Direct align with benchmark to recommend potential market shifts based on market conditions.',
  },
  {
    icon: Percent,
    title: 'Interest Rate & Inflation Analysis',
    description:
      'Determine macroeconomic indicators such as interest rates and inflation to make informed asset allocation choices.',
  },
  {
    icon: BarChart3,
    title: 'Evidence-Based Strategy',
    description:
      'Research-driven recommendations backed by thorough market analysis and historical data.',
  },
  {
    icon: UserCheck,
    title: 'Fund Manager Strategy',
    description:
      'Deep dive into fund manager philosophy and performance consistency over varying market cycles.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-Grade Security',
    description:
      'Secure and compliant platform with 100% digital, paperless process for your convenience.',
  },
];

// Exact Approach steps from the blueprint
const APPROACH_STEPS = [
  {
    number: '01',
    title: 'Forward-looking Strategy',
    description: 'We construct portfolios based on future prospects, not backward-looking performance.',
  },
  {
    number: '02',
    title: 'Strategic Rebalancing',
    description: 'Periodic adjustments to asset allocation to maintain optimal portfolio balance.',
  },
  {
    number: '03',
    title: 'Goal-Based Planning',
    description: 'Customized strategies for SIPs, lump-sum investments, and tactical entries.',
  },
  {
    number: '04',
    title: 'Continuous Monitoring',
    description: 'Regular reviews to optimize fund performance based on market trends.',
  },
  {
    number: '05',
    title: 'Risk Management',
    description: 'Constant evaluation of risk-adjusted returns across all strategies.',
  },
];

// Investment categories from the blueprint
const CATEGORIES = [
  {
    name: 'Equity Funds',
    description: 'Focused on stock market investments for growth potential',
    tag: 'Wealth Creation',
  },
  {
    name: 'Debt Funds',
    description: 'Primarily invest in fixed income and debt-instruments',
    tag: 'Capital Stability',
  },
  {
    name: 'Hybrid Funds',
    description: 'Balanced mix of equity and debt for moderate growth',
    tag: 'Balanced Growth',
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
                Build wealth systematically with professionally managed investment portfolios across equity, debt, and hybrid categories.
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
                  What are Mutual Funds?
                </h2>
                <p className="mt-6 font-sans text-base sm:text-lg font-normal leading-relaxed text-[#B3B3B3]">
                  Mutual funds pool money from multiple investors to invest in a diversified portfolio of stocks, bonds, or other securities. They are managed by professional fund managers, offering an easy way to invest in financial markets without needing large capital or expertise.
                </p>

                <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#262626] text-white border border-white/10">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm font-normal text-[#B3B3B3]">
                      <strong className="font-semibold text-white">Systematic Compounding:</strong> Small disciplined contributions grow exponentially through automated monthly SIPs.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#262626] text-white border border-white/10">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm font-normal text-[#B3B3B3]">
                      <strong className="font-semibold text-white">Strict Regulatory Oversight:</strong> Governed by SEBI and monitored with transparent daily NAV valuations.
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
                    Interactive Planning Tools
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                    Mutual Fund Calculators
                  </h2>
                  <p className="mt-4 font-sans text-base font-normal text-[#B3B3B3] leading-relaxed">
                    Model wealth accumulation, estimate SIP compounding, plan goal milestones, and calculate lumpsum returns with institutional precision.
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
                The One Capital Difference
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                Why Choose One Capital for Mutual Funds?
              </h2>
              <p className="mt-4 font-sans text-base font-normal leading-relaxed text-[#B3B3B3]">
                We look past transient top-performer rankings. Our proprietary fund research architecture prioritizes macroeconomic fundamentals, risk-adjusted alpha, and lasting consistency.
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
                  Institutional Methodology
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  Our Approach to Fund Selection
                </h2>
                <p className="mt-4 font-sans text-base font-normal text-[#B3B3B3]">
                  A disciplined five-stage evaluation system built to protect downside risk and optimize forward returns.
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
