import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Crown,
  FileCheck2,
  Layers,
  Scale,
  Sparkles,
} from 'lucide-react';
import { BodyText, Button, Container, DisplayHeading } from '@/src/components/ui';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { SolutionsBreadcrumb } from '@/src/components/sections/solutions/shared/SolutionsBreadcrumb';
import { COMPANY } from '@/src/data/company';
import {
  getProductById,
} from '@/src/data/products';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildServiceJsonLd } from '@/src/lib/seo';

/* ─── COMPARISON MATRIX ATTRIBUTES ─── */
const MATRIX_ATTRIBUTES = [
  {
    parameter: 'Minimum Investment',
    pms: 'Generally ₹50 lakh, with specified regulatory exceptions.',
    aif: 'Generally ₹1 crore, with specified regulatory exceptions.',
    highlight: true,
  },
  {
    parameter: 'Ownership Structure',
    pms: "Securities are generally held directly in the client's name.",
    aif: 'Investors own fund units rather than underlying assets directly.',
    highlight: false,
  },
  {
    parameter: 'Investment Assets',
    pms: 'Securities selected within the agreed client investment mandate.',
    aif: 'Assets and strategies depend on the fund category and mandate.',
    highlight: false,
  },
  {
    parameter: 'Customization',
    pms: 'May allow individual mandates, preferences and agreed restrictions.',
    aif: 'Investors generally follow a common strategy and fund mandate.',
    highlight: false,
  },
  {
    parameter: 'Liquidity & Exit',
    pms: 'Withdrawals depend on portfolio assets and contractual terms.',
    aif: 'Liquidity depends on the scheme, tenure and redemption terms.',
    highlight: true,
  },
  {
    parameter: 'Tax Treatment',
    pms: 'Tax treatment generally depends on investor-level transactions.',
    aif: 'Tax treatment varies across AIF categories and income types.',
    highlight: false,
  },
  {
    parameter: 'Transparency',
    pms: 'Client-specific holdings, transactions and performance reporting.',
    aif: 'Fund-level disclosures, valuations and investor reporting.',
    highlight: false,
  },
];

/* ─── HNI ALLOCATION BLUEPRINTS ─── */
const WEALTH_BRACKETS = [
  {
    id: 'bracket-1',
    label: '₹50 Lakhs – ₹1 Crore',
    title: 'Building Your Base',
    summary:
      'An investment amount alone does not determine suitability.',
    allocations: [
      { name: 'Core Investment Portfolio', share: '60%' },
      { name: 'PMS Strategy Exposure', share: '30%' },
      { name: 'Liquidity & Contingency', share: '10%' },
    ],
    thesis:
      'An investment amount alone does not determine suitability. Consider existing assets, emergency reserves, concentration, investment costs and your capacity to withstand losses before allocating to PMS.',
  },
  {
    id: 'bracket-2',
    label: '₹1 Crore – ₹5 Crore',
    title: 'Broadening The Mix',
    summary:
      'PMS and AIFs involve different risks, costs, investment structures and liquidity terms.',
    allocations: [
      { name: 'Diversified Core Holdings', share: '45%' },
      { name: 'PMS Investment Strategies', share: '35%' },
      { name: 'AIF Strategy Allocation', share: '20%' },
    ],
    thesis:
      'PMS and AIFs involve different risks, costs, investment structures and liquidity terms. Exposure should be considered only after reviewing your wider portfolio and the terms of each product.',
  },
  {
    id: 'bracket-3',
    label: 'Above ₹5 Crore',
    title: 'A Wider Perspective',
    summary:
      'A larger portfolio may allow access to different investment structures, but does not remove market or liquidity risk.',
    allocations: [
      { name: 'Core Portfolio Holdings', share: '35%' },
      { name: 'PMS Managed Portfolios', share: '25%' },
      { name: 'Alternative Fund Exposure', share: '20%' },
      { name: 'Liquidity & Future Commitments', share: '20%' },
    ],
    thesis:
      'A larger portfolio may allow access to different investment structures, but does not remove market or liquidity risk. Allocation decisions should reflect suitability, diversification and future cash needs.',
  },
];

/* ─── INSTITUTIONAL DUE DILIGENCE FAQS ─── */
const FAQS = [
  {
    q: 'What is the difference between PMS and AIF investments?',
    a: 'PMS is a portfolio management service where securities are generally held directly for the investor under an agreed mandate. An AIF is a pooled investment vehicle in which investors hold units. The two structures differ in ownership, investment strategies, liquidity, reporting and taxation. Both carry investment risks.',
  },
  {
    q: 'What is the minimum investment required for PMS and AIF?',
    a: 'The standard minimum is ₹50 lakh for PMS and ₹1 crore for AIFs. Regulatory exceptions may apply, including for eligible accredited investors and certain other specified cases. Individual managers or schemes may require higher commitments. Eligibility should be confirmed before any investment decision.',
  },
  {
    q: 'Are PMS and AIF investments suitable for every investor?',
    a: 'No. PMS and AIF investments may involve concentrated exposure, market volatility, limited liquidity, higher costs or complex strategies. Suitability depends on your financial circumstances, objectives, investment horizon, risk capacity and understanding of the product. A larger investment amount does not automatically make either suitable.',
  },
  {
    q: 'Can I withdraw my money whenever I need it?',
    a: 'Withdrawal terms depend on the investment structure and governing documents. PMS withdrawals may be subject to the client agreement, asset liquidity and applicable charges. Many AIFs have defined tenures, commitments or restrictions on redemption. Review exit provisions and expected cash requirements before investing.',
  },
  {
    q: 'How does One Capital help me evaluate PMS and AIF options?',
    a: "One Capital's proposed advisory journey begins with understanding your goals, financial position and risk profile. Relevant products can then be discussed in terms of strategy, costs, risks, liquidity and suitability. The exact scope of advice, distribution and ongoing support should be confirmed through the applicable engagement disclosures.",
  },
];

export default function PmsAifPage() {
  const page = getProductById('pms-aif');
  const pms = getProductById('pms');
  const aif = getProductById('aif');

  const [activeBracket, setActiveBracket] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  usePageSeo({
    title: page?.seoTitle ?? 'PMS & AIF | High-Net-Worth Advisory | ONE CAPITAL',
    description:
      page?.seoDescription ??
      'Understand PMS and Alternative Investment Funds with One Capital. Explore ownership, minimum investments, risks, liquidity and suitability.',
    path: page?.path ?? '/solutions/pms-aif',
    keywords: page?.keywords,
    image: '/images/solutions/pms-demat-architecture.jpg',
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

  return (
    <div className="flex w-full flex-col bg-black text-white selection:bg-white selection:text-black">
      {/* ─── 1. HERO SECTION: PREMIUM BLACK CANVAS + LUMINOUS WHITE VALUE SPOTLIGHT ─── */}
      <header className="relative border-b border-white/10 pt-[max(7.5rem,env(safe-area-inset-top))] pb-16 sm:pb-20 lg:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-radial from-white/[0.07] to-transparent blur-3xl"
          aria-hidden
        />

        <Container className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <ScrollFade>
            {/* Top Bar: Breadcrumb + Back Home */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <SolutionsBreadcrumb current="PMS & AIF" />
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em] text-white/90 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Hero Main Grid: Text Left + Luminous White Spotlight Card Right */}
            <div className="mt-12 sm:mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
              {/* Left Column: Core Positioning */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em] text-white/80">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                  <span>Private Investing</span>
                </div>

                <DisplayHeading className="mt-5 text-white tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.06]">
                  Beyond Conventional Investing
                </DisplayHeading>

                <BodyText className="mt-6 max-w-[42rem] text-base font-light leading-relaxed text-white/80 md:text-lg lg:text-xl">
                  Explore professionally managed portfolios and alternative investments with guidance focused on suitability, transparency, risk and your long-term financial priorities.
                </BodyText>

                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <Button to="/contact" variant="primary" size="md" arrow="right">
                    Book Private Consultation
                  </Button>
                  <Button to="#comparison-matrix" variant="secondary" size="md">
                    Compare PMS vs. AIF
                  </Button>
                </div>
              </div>

              {/* Right Column: Luminous Spotlight Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 sm:p-9 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.01]">
                  {/* Top badge */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#757575]">
                      SEBI Regulatory Mandates
                    </span>
                    <span className="rounded-full bg-[#262626] px-3 py-1 font-mono text-[11px] font-semibold text-white/90 border border-white/10">
                      APRN: {COMPANY.apmiRegistrationNo}
                    </span>
                  </div>

                  {/* 3 Metric Rows */}
                  <div className="mt-6 space-y-5">
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#262626] p-4 border border-white/10">
                      <div>
                        <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                          ₹50 Lakhs
                        </div>
                        <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575] mt-0.5">
                          PMS Investment
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/10">
                        Minimum
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#262626] p-4 border border-white/10">
                      <div>
                        <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                          ₹1 Crore
                        </div>
                        <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575] mt-0.5">
                          AIF Investment
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/10">
                        Minimum
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#262626] p-4 border border-white/10">
                      <div>
                        <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                          100% Direct
                        </div>
                        <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575] mt-0.5">
                          PMS Ownership
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/10">
                        Direct Hold
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-[#757575] leading-relaxed font-sans">
                    Standard minimums have exceptions. Direct ownership applies to PMS, not pooled AIF assets.
                  </p>
                </div>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </header>

      {/* ─── 2. SECTION 2: THE CORE DECISION — PMS VS AIF AT A GLANCE ─── */}
      <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
        <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <ScrollFade className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
              Investment Pathways
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Two Distinct Approaches
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Understand how PMS and AIF structures differ before considering their place in your investment portfolio.
            </p>
          </ScrollFade>

          {/* 2 Charcoal Cards against Deep Black Canvas */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* PMS Card */}
            <ScrollFade delay={0.1}>
              <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-[#1D1D1D] p-8 sm:p-10 text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/20 hover:bg-[#262626] hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                        <Crown className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
                          PMS
                        </span>
                        <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575]">
                          Portfolio Management Services
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-mono font-bold text-white border border-white/10">
                      MIN. ₹50 LAKHS
                    </span>
                  </div>

                  <p className="mt-6 text-base font-normal leading-relaxed text-[#B3B3B3]">
                    PMS offers professionally managed portfolios with securities typically held in your name. Investment decisions follow the agreed mandate, with risks, fees and liquidity to consider.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Ownership:</strong> Securities are generally held in the client&apos;s own account.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Investment Style:</strong> Portfolio decisions follow the agreed investment mandate.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Risk & Reporting:</strong> Review holdings, portfolio concentration, costs and performance.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="#comparison-matrix"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white font-bold transition-opacity hover:opacity-75"
                  >
                    <span>Compare PMS in Matrix</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </ScrollFade>

            {/* AIF Card */}
            <ScrollFade delay={0.2}>
              <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-[#1D1D1D] p-8 sm:p-10 text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-white/20 hover:bg-[#262626] hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                        <Layers className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
                          AIF
                        </span>
                        <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575]">
                          Alternative Investment Funds
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-mono font-bold text-white border border-white/10">
                      MIN. ₹1 CRORE
                    </span>
                  </div>

                  <p className="mt-6 text-base font-normal leading-relaxed text-[#B3B3B3]">
                    AIFs pool investor capital under a defined fund strategy. They may provide exposure to specialised assets, but involve varying liquidity, valuation, concentration and exit risks.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Fund Structure:</strong> Investors hold units in a pooled investment vehicle.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Asset Exposure:</strong> Strategies and permitted investments vary by AIF category.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Liquidity Terms:</strong> Lock-ins, distributions and exits depend on fund documents.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="#comparison-matrix"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white font-bold transition-opacity hover:opacity-75"
                  >
                    <span>Compare AIF in Matrix</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </ScrollFade>
          </div>
        </Container>
      </section>

      {/* ─── 3. SECTION 3: THE INSTITUTIONAL COMPARISON MATRIX ─── */}
      <section
        id="comparison-matrix"
        className="relative scroll-mt-24 border-b border-white/10 py-16 sm:py-20 lg:py-28"
      >
        <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <ScrollFade className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
              Comparison
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Understanding the Differences
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Two investment structures with distinct ownership, flexibility and risks.
            </p>
          </ScrollFade>

          {/* Clean Dark Comparison Table Card */}
          <ScrollFade delay={0.15}>
            <div className="mt-12 sm:mt-16 overflow-hidden rounded-3xl border border-white/10 bg-[#1D1D1D] text-white shadow-[0_12px_50px_rgba(0,0,0,0.8)]">
              {/* Header row */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 bg-[#262626] p-5 sm:p-6 text-sm font-mono uppercase tracking-[0.14em]">
                <div className="md:col-span-4 font-semibold text-[#757575]">
                  Feature / Parameter
                </div>
                <div className="mt-2 md:mt-0 md:col-span-4 font-extrabold text-white flex items-center gap-2">
                  <Crown className="h-4 w-4 text-white" />
                  <span>Portfolio Management (PMS)</span>
                </div>
                <div className="mt-2 md:mt-0 md:col-span-4 font-extrabold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-white" />
                  <span>Alternative Investment Funds (AIF)</span>
                </div>
              </div>

              {/* Data rows */}
              <div className="divide-y divide-white/10">
                {MATRIX_ATTRIBUTES.map((row) => (
                  <div
                    key={row.parameter}
                    className={`grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 transition-colors hover:bg-[#262626]/50 ${
                      row.highlight ? 'bg-[#262626]/30' : ''
                    }`}
                  >
                    <div className="md:col-span-4 font-sans text-sm sm:text-base font-semibold text-white flex items-center">
                      {row.parameter}
                    </div>
                    <div className="mt-2 md:mt-0 md:col-span-4 font-sans text-sm sm:text-base font-normal text-[#B3B3B3] leading-relaxed pr-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#757575] md:hidden block mb-1">
                        PMS:
                      </span>
                      {row.pms}
                    </div>
                    <div className="mt-2 md:mt-0 md:col-span-4 font-sans text-sm sm:text-base font-normal text-[#B3B3B3] leading-relaxed">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#757575] md:hidden block mb-1">
                        AIF:
                      </span>
                      {row.aif}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-6 text-center font-sans text-sm font-light leading-relaxed text-[#757575]">
              Comparison is indicative. Actual features depend on the portfolio manager, AIF category, strategy and contractual documentation.
            </p>
          </ScrollFade>
        </Container>
      </section>

      {/* ─── 4. SECTION 4: HNI WEALTH ALLOCATION BLUEPRINT BY BRACKET ─── */}
      <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
        <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <ScrollFade className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
              Wealth Brackets
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Investing Across Wealth Levels
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Your investment capacity is only one part of the decision. We consider financial goals, existing assets, liquidity, risk tolerance and time horizon before discussing PMS or AIF suitability.
            </p>
          </ScrollFade>

          {/* Bracket Selector Tabs */}
          <ScrollFade delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {WEALTH_BRACKETS.map((bracket, idx) => (
                <button
                  key={bracket.id}
                  type="button"
                  onClick={() => setActiveBracket(idx)}
                  className={`rounded-full px-6 py-3 text-xs sm:text-sm font-mono uppercase tracking-[0.14em] font-bold transition-all duration-300 ${
                    activeBracket === idx
                      ? 'bg-white text-black shadow-lg'
                      : 'bg-white/5 text-white/70 border border-white/15 hover:border-white hover:text-white'
                  }`}
                >
                  {bracket.label}
                </button>
              ))}
            </div>
          </ScrollFade>

          {/* Active Bracket Card */}
          <ScrollFade delay={0.2}>
            <div className="mt-8 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 sm:p-10 text-white shadow-[0_12px_50px_rgba(0,0,0,0.8)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#757575] font-semibold">
                    Target Wealth Tier
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {WEALTH_BRACKETS[activeBracket].title}
                  </h3>
                </div>
                <span className="rounded-full bg-[#262626] px-4 py-1.5 font-mono text-xs font-extrabold text-white border border-white/10">
                  {WEALTH_BRACKETS[activeBracket].label}
                </span>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-12 items-center">
                {/* Visual Allocation Mix */}
                <div className="md:col-span-7 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575] font-semibold mb-2">
                    Recommended Asset Mix
                  </div>
                  {WEALTH_BRACKETS[activeBracket].allocations.map((item) => (
                    <div key={item.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm font-semibold text-white">
                        <span>{item.name}</span>
                        <span className="font-mono text-[#B3B3B3]">{item.share}</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-[#262626] overflow-hidden border border-white/10">
                        <div
                          className="h-full rounded-full bg-white transition-all duration-500"
                          style={{ width: item.share }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Advisory Rationale */}
                <div className="md:col-span-5 rounded-2xl bg-[#262626] p-6 border border-white/10">
                  <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575] font-semibold mb-2">
                    Strategic Rationale
                  </div>
                  <p className="text-sm font-normal text-[#B3B3B3] leading-relaxed">
                    {WEALTH_BRACKETS[activeBracket].thesis}
                  </p>
                  <div className="mt-6">
                    <Button to="/contact" variant="primary" size="sm" arrow="right">
                      Request Custom Blueprint
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* ─── 7. SECTION 7: GOVERNANCE, CUSTODY & REGULATORY NET ─── */}
      <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
        <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <ScrollFade className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
              Governance
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Clarity At Every Step
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Investment decisions deserve proper assessment, clear disclosures and informed conversations.
            </p>
          </ScrollFade>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <ScrollFade delay={0.08}>
              <div className="rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-white/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                  <Scale className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Suitability Review
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#757575]">
                  Understand Your Needs
                </p>
                <p className="mt-4 text-sm font-normal text-[#B3B3B3] leading-relaxed">
                  We assess investment goals, risk capacity, liquidity requirements and experience before discussing potential exposure.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.16}>
              <div className="rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-white/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                  <Building2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Investment Due Diligence
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#757575]">
                  Look Beyond Returns
                </p>
                <p className="mt-4 text-sm font-normal text-[#B3B3B3] leading-relaxed">
                  We consider strategy, manager disclosures, fees, concentration, valuation practices and relevant investment risks.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.24}>
              <div className="rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-white/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                  <FileCheck2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Ongoing Oversight
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#757575]">
                  Stay Informed
                </p>
                <p className="mt-4 text-sm font-normal text-[#B3B3B3] leading-relaxed">
                  We support periodic discussions of portfolio information, material changes and suitability as your needs evolve.
                </p>
              </div>
            </ScrollFade>
          </div>
        </Container>
      </section>

      {/* ─── 8. SECTION 8: INSTITUTIONAL FAQS (ACCORDION) ─── */}
      <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
        <Container className="mx-auto max-w-[1000px] px-6 sm:px-8 lg:px-12">
          <ScrollFade className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
              Questions
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Your Questions
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Understand the essentials before exploring a PMS or AIF investment.
            </p>
          </ScrollFade>

          <div className="mt-12 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <ScrollFade key={faq.q} delay={index * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-[#1D1D1D] text-white shadow-md transition-all duration-200 hover:border-white/20">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:text-white/80"
                      aria-expanded={isOpen}
                    >
                      <span className="font-sans text-base sm:text-lg font-bold text-white">
                        {faq.q}
                      </span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#262626] text-white border border-white/10 font-mono text-lg transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm sm:text-base font-normal text-[#B3B3B3] leading-relaxed border-t border-white/10 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </ScrollFade>
              );
            })}
          </div>
        </Container>
      </section>

    </div>
  );
}
