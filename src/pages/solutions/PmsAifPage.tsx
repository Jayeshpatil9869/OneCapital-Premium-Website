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
    parameter: 'Statutory Minimum Investment',
    pms: 'INR 50 Lakhs (SEBI mandated)',
    aif: 'INR 1 Crore (SEBI mandated for Cat I & II)',
    highlight: true,
  },
  {
    parameter: 'Ownership & Legal Structure',
    pms: 'Direct beneficial ownership in your individual Demat account',
    aif: 'Pooled investment vehicle via SEBI-registered Trust or LLP',
    highlight: false,
  },
  {
    parameter: 'Underlying Asset Spectrum',
    pms: 'Public listed equities, high-grade debt, and liquid securities',
    aif: 'Pre-IPO companies, Private Credit, Venture Capital, Real Estate & Derivatives',
    highlight: false,
  },
  {
    parameter: 'Portfolio Customization',
    pms: 'High: Bespoke negative screening (e.g., exclude tobacco, defence) & model variations',
    aif: 'Standardized: Uniform fund-level mandate managed across all pooled units',
    highlight: false,
  },
  {
    parameter: 'Liquidity & Lock-in Horizon',
    pms: 'High operational liquidity (T+1/T+2 settlement), no statutory lock-in',
    aif: 'Typically 3–7 years closed-ended (Cat I/II); Periodic redemption windows (Cat III)',
    highlight: true,
  },
  {
    parameter: 'Taxation Mechanism',
    pms: 'Direct capital gains (STCG 20%, LTCG 12.5%) per individual trade on your PAN',
    aif: 'Pass-through for Cat I & II; Fund-level taxation at MMR for Cat III',
    highlight: false,
  },
  {
    parameter: 'Operational Transparency',
    pms: 'Real-time live Demat tracking + monthly statements & manager notes',
    aif: 'Quarterly audited NAV statements, valuation reports & fund commentary',
    highlight: false,
  },
];

/* ─── HNI ALLOCATION BLUEPRINTS ─── */
const WEALTH_BRACKETS = [
  {
    id: 'bracket-1',
    label: 'INR 50L – 1.5 Cr',
    title: 'Focused Public Equity Alpha',
    summary:
      'Ideal for investors outgrowing retail mutual funds who want concentrated equity exposure and direct ownership transparency.',
    allocations: [
      { name: 'Core Focused PMS (15–25 Stocks)', share: '60%' },
      { name: 'High-Grade Debt / Stability Funds', share: '30%' },
      { name: 'Tactical Cash / Liquid Reserve', share: '10%' },
    ],
    thesis:
      'Replaces fragmented mutual funds with a unified portfolio of high-conviction compounders, held directly in your individual Demat account with real-time performance tracking.',
  },
  {
    id: 'bracket-2',
    label: 'INR 1.5 Cr – 5 Cr',
    title: 'Multi-Strategy Growth & Private Yield',
    summary:
      'Designed for established HNIs seeking to diversify public market volatility with high-yielding structured debt.',
    allocations: [
      { name: 'Multi-Cap & Special Situations PMS', share: '45%' },
      { name: 'Category II Structured Private Credit', share: '35%' },
      { name: 'Liquid & Short-Duration Debt', share: '20%' },
    ],
    thesis:
      'Blends public equity upside with senior-secured private credit (targeting 14–18% IRR), insulating the portfolio against extended public market drawdowns.',
  },
  {
    id: 'bracket-3',
    label: 'INR 5 Cr+ (Family Office)',
    title: 'Institutional Private Market Architecture',
    summary:
      'Comprehensive endowment-style structure engineered for generation-level wealth preservation, pre-IPO upside, and tax efficiency.',
    allocations: [
      { name: 'Bespoke High-Conviction PMS', share: '35%' },
      { name: 'Category II Private Equity & Pre-IPO', share: '25%' },
      { name: 'Category III Long-Short Hedge Fund', share: '20%' },
      { name: 'Sovereign Fixed Income / Global Assets', share: '20%' },
    ],
    thesis:
      'Full institutional deployment across public equity, private markets, and market-neutral hedge strategies with customized governance and estate succession guardrails.',
  },
];

/* ─── INSTITUTIONAL DUE DILIGENCE FAQS ─── */
const FAQS = [
  {
    q: 'Can I fund my PMS by transferring existing shares from my Demat account?',
    a: 'Yes. SEBI regulations permit investors to fund a PMS using either cash (NEFT/RTGS) or an existing portfolio of listed stocks, provided the total valuation meets the statutory ₹50 Lakh threshold. Upon transfer, the portfolio manager systematically restructures the holdings according to the chosen strategy to eliminate lag and capital drag.',
  },
  {
    q: 'How does taxation work for PMS vs. AIF in India?',
    a: 'In a PMS, all securities are held directly in your personal Demat account. Every buy/sell triggers capital gains (STCG at 20%, LTCG at 12.5%) directly under your PAN. In contrast, Category I & II AIFs enjoy pass-through status (income is taxed in the investor\'s hands with original tax character). Category III AIFs are taxed at the fund level at the Maximum Marginal Rate (MMR), meaning distributions arrive post-tax.',
  },
  {
    q: 'What is the practical difference between Discretionary and Non-Discretionary PMS?',
    a: 'In Discretionary PMS, the portfolio manager executes portfolio rebalancing and trade allocations independently based on the formal agreement. In Non-Discretionary PMS, the manager provides research and recommendations, but cannot execute trades without explicit client sign-off for each order. Over 95% of HNIs choose Discretionary for disciplined, rapid execution without operational bottlenecks.',
  },
  {
    q: 'How do fee structures work (Management Fees vs. Performance Hurdle Rates)?',
    a: 'PMS typically offers two options: a fixed management fee (1.25%–2% p.a.) or a hybrid performance fee (e.g., 1% fixed + 15%–20% of profit above a hurdle rate like 10%–12% with a high-water mark provision). AIFs generally charge a 1.5%–2% management fee plus 15%–20% carry above an 8%–10% hurdle rate.',
  },
  {
    q: 'What are the lock-in periods for Category II and Category III AIFs?',
    a: 'Category I and II AIFs are closed-ended with statutory tenures of 3 to 7 years to allow underlying private companies and real estate/debt assets to mature. Category III AIFs can be open-ended or closed-ended, often offering periodic quarterly or semi-annual redemption windows after an initial lock-in period (typically 1 year).',
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
      'SEBI-regulated Portfolio Management Services (INR 50L min) and Alternative Investment Funds (INR 1Cr min) for High-Net-Worth Individuals, Family Offices, and institutions.',
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
                  <span>High-Net-Worth Advisory</span>
                </div>

                <DisplayHeading className="mt-5 text-white tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.06]">
                  Beyond Mutual Funds: PMS & AIF
                </DisplayHeading>

                <BodyText className="mt-6 max-w-[42rem] text-base font-light leading-relaxed text-white/80 md:text-lg lg:text-xl">
                  When investible capital crosses ₹50 Lakhs, broad retail mutual funds create diworsification—diluting high-conviction ideas across 80+ stocks. Discover how One Capital structures focused public equity and private market alternatives.
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
                          PMS Minimum Ticket
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/10">
                        Public Equity
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#262626] p-4 border border-white/10">
                      <div>
                        <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                          ₹1 Crore
                        </div>
                        <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575] mt-0.5">
                          AIF Minimum Ticket
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/10">
                        Private Markets
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#262626] p-4 border border-white/10">
                      <div>
                        <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                          100% Direct
                        </div>
                        <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#757575] mt-0.5">
                          Demat Account Ownership
                        </div>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 border border-white/10">
                        Zero Pooling
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 text-xs text-[#757575] leading-relaxed font-sans">
                    All assets held directly via independent tier-1 institutional custodians (ICICI, HDFC, Orbis). One Capital never holds client funds.
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
              Strategic Asset Allocation
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Two Distinct Institutional Pathways
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Choose the right structure based on your liquidity appetite, target asset classes, and desire for direct Demat ownership.
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
                    A separately managed account where shares are bought directly in your personal Demat account. Designed for investors seeking concentrated public equity alpha (15–25 stocks) without fund co-mingling.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Direct Demat Ownership:</strong> Stocks held in your name; corporate actions and dividends credited to your bank account.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">High Liquidity (T+1 / T+2):</strong> No statutory lock-in; redeemable capital based on settlement cycles.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Bespoke Overlays:</strong> Ability to exclude specific companies or sectors (e.g. ESG, negative list).
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
                    A pooled private investment trust designed for sophisticated capital. Grants exclusive access to private equity, pre-IPO deals, high-yielding private credit, and long-short hedge strategies.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Private Market Access:</strong> Unlisted growth equity, pre-IPO unicorns, and structured debt yielding 14%–18%.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">Market-Neutral Hedging:</strong> Category III funds employ derivative strategies to protect capital during market crashes.
                      </span>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-[#262626] p-3.5 border border-white/10">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-[#B3B3B3]">
                        <strong className="text-white">3 to 7 Years Lock-in:</strong> Patient institutional capital insulated from retail redemption pressures.
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
              Institutional Due Diligence
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              PMS vs. AIF Decision Matrix
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Compare structural, operational, taxation, and regulatory differences side-by-side.
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
          </ScrollFade>
        </Container>
      </section>

      {/* ─── 4. SECTION 4: HNI WEALTH ALLOCATION BLUEPRINT BY BRACKET ─── */}
      <section className="relative border-b border-white/10 py-16 sm:py-20 lg:py-28">
        <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
          <ScrollFade className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]">
              Capital Sizing Architecture
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Which Vehicle Fits Your Wealth Bracket?
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Explore how institutional portfolios scale allocation across PMS, structured debt, and private equity as investible surplus expands.
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
              Institutional Safeguards
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Custody & Governance Architecture
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Substantial capital requires tier-1 institutional custody, audited disclosures, and strict SEBI fiduciary oversight.
            </p>
          </ScrollFade>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <ScrollFade delay={0.08}>
              <div className="rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-white/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                  <Scale className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  APMI & SEBI Registration
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#757575]">
                  APMI Reg: {COMPANY.apmiRegistrationNo}
                </p>
                <p className="mt-4 text-sm font-normal text-[#B3B3B3] leading-relaxed">
                  Compliant with SEBI (Portfolio Managers) Regulations, 2020 and SEBI (Alternative Investment Funds) Regulations, 2012.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.16}>
              <div className="rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-white/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                  <Building2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Tier-1 Custodial Separation
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#757575]">
                  ICICI • HDFC • Orbis
                </p>
                <p className="mt-4 text-sm font-normal text-[#B3B3B3] leading-relaxed">
                  One Capital never handles or pools client cash or securities. All assets sit in institutional demat vaults under independent custody.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.24}>
              <div className="rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-white/20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#262626] text-white border border-white/10">
                  <FileCheck2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">
                  Audited TWRR Reporting
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#757575]">
                  Time-Weighted Rate of Return
                </p>
                <p className="mt-4 text-sm font-normal text-[#B3B3B3] leading-relaxed">
                  SEBI-mandated monthly factsheets, annual audited tax packs, and performance metrics calculated without ambiguous claims.
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
              Investor Due Diligence
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
              Frequently Answered Questions
            </h2>
            <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-[#B3B3B3]">
              Practical answers on regulatory minimums, Demat share transfers, fee structures, and taxation.
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
