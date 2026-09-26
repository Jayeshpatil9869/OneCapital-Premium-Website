export type SolutionService = {
  id: string;
  title: string;
  tagline: string;
  description: string;
};

export type SolutionPillar = {
  id: string;
  index: string;
  title: string;
  summary: string;
  services: SolutionService[];
};

/**
 * Our Products pillars — aligned with About / 1capital.in offerings:
 * mutual funds, portfolio management, wealth planning, tax strategy,
 * AIFs, startup equity, and structured real-estate products.
 * No invented returns, AUM, or unconfirmed SEBI license numbers.
 */
export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    id: 'capital-strategy',
    index: '01',
    title: 'Capital Strategy',
    summary:
      'Clarify goals, risk capacity, and liquidity needs — then design how capital should be allocated across mutual funds, debt, equity, and alternatives before a single rupee is deployed.',
    services: [
      {
        id: 'asset-allocation',
        title: 'Asset Allocation Framework',
        tagline: 'Equity, debt, hybrids, and alternatives in deliberate proportion.',
        description:
          'We map how your capital should sit across equity and debt mutual funds, fixed income, cash buffers, and — where suitable — AIFs, startup equity, and structured real-estate exposures. The mix reflects your goals, time horizon, and ability to withstand market cycles — not a one-size model.',
      },
      {
        id: 'investment-advisory',
        title: 'Investment Advisory',
        tagline: 'Research-led counsel across products and strategies.',
        description:
          'Independent, research-informed guidance across mutual fund categories, portfolio management options, and thoughtfully screened alternatives. Recommendations are framed around fit for your mandate — not product push.',
      },
      {
        id: 'investment-policy',
        title: 'Goals & Investment Policy',
        tagline: 'A written reference for every allocation decision.',
        description:
          'We translate life goals — retirement, education, business liquidity, family milestones — into a clear investment policy: return expectations, risk budget, liquidity calendar, and constraints. That policy becomes the filter for every subsequent product and portfolio choice.',
      },
      {
        id: 'portfolio-construction',
        title: 'Portfolio Construction Blueprint',
        tagline: 'Each holding earns a defined role.',
        description:
          'Before implementation, we define the role of each sleeve — growth, income, stability, satellite opportunity — and how instruments work together. Diversification, correlation, tax character, and liquidity are considered before capital moves.',
      },
    ],
  },
  {
    id: 'portfolio-management',
    index: '02',
    title: 'Portfolio Management',
    summary:
      'Build, monitor, and rebalance portfolios through mutual funds, portfolio management services, and carefully selected alternatives — with ongoing stewardship across market cycles.',
    services: [
      {
        id: 'investment-portfolio-management',
        title: 'Managed Investment Portfolios',
        tagline: 'Goal-aligned portfolios, actively stewarded.',
        description:
          'We design and oversee portfolios around your objectives, cash-flow needs, and risk profile. Core building blocks typically include equity, debt, and hybrid mutual funds, with portfolio management services and alternatives introduced where your ticket size, sophistication, and mandate justify them.',
      },
      {
        id: 'fixed-income-management',
        title: 'Debt & Income Positioning',
        tagline: 'Stability and cash flow, engineered with intent.',
        description:
          'Debt mutual funds, bonds, and income-oriented sleeves are structured for duration, credit quality, liquidity, and tax character — supporting near-term needs without abandoning long-term compounding.',
      },
      {
        id: 'alternative-investments',
        title: 'Alternatives & Private Markets',
        tagline: 'AIFs, startup equity, and structured real estate — when appropriate.',
        description:
          'For suitable investors, we evaluate Alternative Investment Funds (AIFs), startup equity, and structured real-estate products alongside public-market holdings. Selection focuses on manager quality, structure, liquidity lock-ups, and alignment with your overall risk budget.',
      },
      {
        id: 'specialized-mandates',
        title: 'Specialized & Concentrated Mandates',
        tagline: 'When wealth is already complex.',
        description:
          'Business equity, ESOPs, concentrated stock, or family holdings rarely fit a standard model. We design strategies around what you already own — diversification paths, liquidity events, and complementary mutual-fund or PMS sleeves — rather than forcing a template.',
      },
      {
        id: 'portfolio-monitoring-rebalancing',
        title: 'Monitoring & Rebalancing',
        tagline: 'Drift is managed; intent is preserved.',
        description:
          'We review exposures, category drift, fund/manager changes, and life-event shifts on a defined cadence. Rebalancing and product switches are recommended when the portfolio no longer matches the agreed architecture — not when markets simply move.',
      },
    ],
  },
  {
    id: 'risk-wealth-architecture',
    index: '03',
    title: 'Risk & Wealth Architecture',
    summary:
      'Protect compounding with risk profiling, liquidity design, tax-aware investing, and long-term wealth planning — so growth is supported by structure, not hope.',
    services: [
      {
        id: 'risk-management',
        title: 'Risk Profiling & Management',
        tagline: 'Know what can impair capital — before markets do.',
        description:
          'Beyond market volatility, we assess concentration, liquidity gaps, credit and duration risk, currency exposure where relevant, and business-linked wealth. The goal is to surface vulnerabilities early and size positions accordingly.',
      },
      {
        id: 'portfolio-stress-testing',
        title: 'Scenario & Stress Awareness',
        tagline: 'Test the plan against drawdowns and rate shocks.',
        description:
          'Portfolios are reviewed against plausible stress paths — equity corrections, rate moves, credit events — so you understand how goals and cash needs hold up, and where buffers or hedges may be warranted.',
      },
      {
        id: 'cash-liquidity-management',
        title: 'Cash & Liquidity Design',
        tagline: 'Liquidity as a planned asset, not an afterthought.',
        description:
          'We structure emergency reserves, near-term goal buckets, and opportunity cash so spending and commitments are funded without forced selling of long-term holdings at the wrong time.',
      },
      {
        id: 'tax-aware-investing',
        title: 'Tax Strategy & Tax-Aware Investing',
        tagline: 'What you retain matters as much as what you earn.',
        description:
          'Asset location, holding periods, mutual-fund tax character, capital-gains timing, and coordination with your CA form part of the advisory conversation. We aim to improve after-tax outcomes without letting tax alone dictate strategy.',
      },
      {
        id: 'estate-wealth-transfer',
        title: 'Wealth Planning & Transfer',
        tagline: 'Structure wealth for the next chapter and the next generation.',
        description:
          'Long-term wealth planning covers succession conversations, nomination hygiene, gifting where appropriate, and how investment accounts sit within family structures — so capital and intent transfer with fewer surprises.',
      },
      {
        id: 'family-balance-sheet',
        title: 'Family & Business Balance Sheet',
        tagline: 'Your demat account is only one slice of wealth.',
        description:
          'We look across financial assets, operating businesses, real estate, liabilities, and guarantees to understand true concentration — then design portfolios that complement, rather than double, those exposures.',
      },
    ],
  },
  {
    id: 'intelligence-oversight',
    index: '04',
    title: 'Intelligence & Oversight',
    summary:
      'Fund and manager diligence, clear consolidated reporting, and disciplined deployment — transparent advisory so you always know what you own and why.',
    services: [
      {
        id: 'manager-due-diligence',
        title: 'Fund & Manager Diligence',
        tagline: 'Access is not the same as selection.',
        description:
          'Mutual funds, PMS strategies, and AIF managers are evaluated on process, people, portfolio construction, risk controls, costs, and alignment — so recommendations rest on diligence, not brand familiarity alone.',
      },
      {
        id: 'performance-reporting',
        title: 'Performance & Attribution Reporting',
        tagline: 'Clarity on what drove results.',
        description:
          'Periodic reporting covers portfolio performance, contribution by sleeve or category, and material changes in holdings — so reviews stay factual and forward-looking rather than narrative-only.',
      },
      {
        id: 'consolidated-wealth-reporting',
        title: 'Consolidated Wealth View',
        tagline: 'One coherent picture across accounts and products.',
        description:
          'Where holdings span multiple folios, brokers, or product types, we work toward a consolidated view of allocation, risk, and progress against goals — reducing blind spots that fragment decision-making.',
      },
      {
        id: 'capital-deployment',
        title: 'Disciplined Capital Deployment',
        tagline: 'Ready liquidity when opportunity or need appears.',
        description:
          'We define how idle cash and new inflows enter the market — staggered SIPs, lumpsum pacing, or opportunistic deployment — so you act with a framework when valuations, life events, or dislocations demand a decision.',
      },
    ],
  },
];

export const PORTFOLIO_MANAGEMENT_FOOTNOTE =
  'Portfolio implementation uses regulated market products such as mutual funds, Portfolio Management Services (PMS), and Alternative Investment Funds (AIFs) where appropriate and suitable. OneCapital is an AMFI-registered Mutual Fund Distributor and holds APMI registration; product availability depends on eligibility, ticket size, and suitability.';

export function getPillarById(id: string): SolutionPillar | undefined {
  return SOLUTION_PILLARS.find((pillar) => pillar.id === id);
}

export function getAllServices(): SolutionService[] {
  return SOLUTION_PILLARS.flatMap((pillar) => pillar.services);
}

/** Anchor link on the main /solutions overview page */
export function getPillarAnchorHref(pillarId: string): string {
  return `/solutions#${pillarId}`;
}

/** Dedicated deep-dive page route */
export function getPillarPageHref(pillarId: string): string {
  return `/solutions/${pillarId}`;
}

/** @deprecated Use getPillarAnchorHref or getPillarPageHref */
export function getPillarHref(pillarId: string): string {
  return getPillarPageHref(pillarId);
}

export function getSiblingPillars(pillarId: string): SolutionPillar[] {
  return SOLUTION_PILLARS.filter((pillar) => pillar.id !== pillarId);
}

export type HomePillarPreview = {
  id: string;
  index: string;
  title: string;
  summary: string;
  highlights: string[];
  href: string;
};

export const HOME_PILLAR_PREVIEWS: HomePillarPreview[] = SOLUTION_PILLARS.map((pillar) => ({
  id: pillar.id,
  index: pillar.index,
  title: pillar.title,
  summary: pillar.summary,
  highlights: pillar.services.slice(0, 4).map((service) => service.title),
  href: getPillarPageHref(pillar.id),
}));
