import { COMPANY } from './company';

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
 * AIFs, equity, baskets, and broking.
 * No invented returns, AUM, or unconfirmed SEBI license numbers.
 */
export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    id: 'capital-strategy',
    index: '01',
    title: 'Capital Strategy',
    summary:
      'Goal-based financial planning: retirement, education, a home, and business liquidity, written into an asset allocation before any fund is chosen.',
    services: [
      {
        id: 'investment-policy',
        title: 'Goal-based financial planning',
        tagline: 'Retirement, education, home, and business goals on one page.',
        description:
          'We write down what the money is for, when you need it, and how much you can invest each month. That plan is the filter for every mutual fund, PMS, or alternative that follows.',
      },
      {
        id: 'risk-profile',
        title: 'Risk profiling',
        tagline: 'Capacity and comfort, recorded before markets test them.',
        description:
          'Income, dependents, loans, and how you behave in a falling market decide how much equity the plan can hold. The profile is reviewed when your life changes, not only when the index moves.',
      },
      {
        id: 'asset-allocation',
        title: 'Asset allocation',
        tagline: 'Equity, debt, hybrid, and cash in stated ranges.',
        description:
          'Long-term goals sit in equity and hybrid funds. Near-term goals sit in debt and liquid funds. Alternatives are sized only after the core allocation is set.',
      },
      {
        id: 'product-mapping',
        title: 'Product mapping',
        tagline: 'The right product type for each goal.',
        description:
          'SIPs for monthly surplus, lumpsums for bonuses, PMS where the amount and preference fit, and AIFs only for suitable investors. The plan names the category before it names a scheme.',
      },
    ],
  },
  {
    id: 'portfolio-management',
    index: '02',
    title: 'Portfolio Management',
    summary:
      'Mutual funds through SIPs and lumpsums, Portfolio Management Services, and alternatives such as AIFs, with reviews and rebalancing built in.',
    services: [
      {
        id: 'mutual-funds',
        title: 'Mutual funds',
        tagline: 'Equity, debt, hybrid, and index funds matched to the goal.',
        description:
          'Large cap, mid cap, small cap, flexi cap, and ELSS for growth and tax saving. Debt and hybrid funds for stability and medium-term goals. Investments are made in Regular plans through our AMFI registration.',
      },
      {
        id: 'sip-lumpsum',
        title: 'SIP and lumpsum',
        tagline: 'Monthly investing, step-up SIPs, and one-time amounts.',
        description:
          'A SIP builds the habit and averages the entry price. A step-up SIP rises with income. A lumpsum is paced when a bonus, sale, or inheritance should not go in on a single day.',
      },
      {
        id: 'pms',
        title: 'Portfolio Management Services',
        tagline: 'A custom equity or debt portfolio, when the amount fits.',
        description:
          'PMS is a SEBI-regulated portfolio, usually with a minimum of ₹50 lakh, held in your own demat account. We help you compare discretionary, non-discretionary, and advisory mandates and judge whether a PMS belongs beside your mutual funds.',
      },
      {
        id: 'alternatives',
        title: 'AIFs and other alternatives',
        tagline: 'Private markets only after suitability and lock-in are clear.',
        description:
          'Category I, II, and III AIFs are reviewed for manager, structure, and liquidity. They are a satellite, not a substitute for the mutual fund core. Equity, baskets, and broking are separate products.',
      },
    ],
  },
  {
    id: 'risk-wealth-architecture',
    index: '03',
    title: 'Risk & Wealth Architecture',
    summary:
      'Risk profiling, emergency liquidity, tax-aware investing, and nominations so the portfolio can survive a bad year and a family transition.',
    services: [
      {
        id: 'risk-management',
        title: 'Risk and concentration',
        tagline: 'One stock, one fund house, or one business should not be the whole plan.',
        description:
          'We look at how much of your wealth sits in employer stock, the family business, a single fund, or a single sector, and whether a market fall would force you to sell long-term holdings.',
      },
      {
        id: 'cash-liquidity-management',
        title: 'Emergency fund and liquidity',
        tagline: 'Cash for the next year, growth for the years after.',
        description:
          'Near-term spending and an emergency reserve stay in liquid or short-duration funds and bank deposits. Equity is not asked to pay next month’s bills.',
      },
      {
        id: 'tax-aware-investing',
        title: 'Tax-aware investing',
        tagline: 'ELSS, holding periods, and capital gains, planned with your CA.',
        description:
          'We use ELSS where Section 80C still helps, and we time switches with holding-period rules in mind. Tax improves the plan. It does not replace the goal.',
      },
      {
        id: 'estate-wealth-transfer',
        title: 'Nominations and succession',
        tagline: 'Accounts, wills, and family intent, kept current.',
        description:
          'We review nominations on folios and demat accounts and coordinate with your lawyer or CA on wills and succession. We do not draft legal documents.',
      },
    ],
  },
  {
    id: 'intelligence-oversight',
    index: '04',
    title: 'Intelligence & Oversight',
    summary:
      'A portfolio review you can act on: fund quality, overlap, costs, consolidated holdings, and a clear reason to stay or switch.',
    services: [
      {
        id: 'portfolio-review',
        title: 'Portfolio review',
        tagline: 'Allocation, overlap, and risk against the plan you agreed.',
        description:
          'We check whether the portfolio still matches the target mix, whether too many funds do the same job, and whether a recent fall is noise or a broken holding.',
      },
      {
        id: 'manager-due-diligence',
        title: 'Fund and manager diligence',
        tagline: 'Process, people, cost, and behaviour in a down market.',
        description:
          'A fund is kept when the process is intact. A change of manager, a style drift, or a cost that no longer earns its place is a reason to look again.',
      },
      {
        id: 'consolidated-wealth-reporting',
        title: 'Consolidated reporting',
        tagline: 'Folios, brokers, and products in one conversation.',
        description:
          'Holdings spread across apps and advisors are pulled into one allocation view so you can see equity, debt, and alternatives together.',
      },
      {
        id: 'review-cadence',
        title: 'Review cadence',
        tagline: 'A scheduled review, plus a call when life changes.',
        description:
          'We review on a set calendar and when income, a goal date, or a large cash event changes the plan. We do not reshuffle the portfolio after every headline.',
      },
    ],
  },
];

export const PORTFOLIO_MANAGEMENT_FOOTNOTE = `Mutual fund investments are subject to market risk. Read all scheme-related documents carefully. ${COMPANY.brandName} distributes Regular plans of mutual funds as an AMFI-registered Mutual Fund Distributor (ARN-${COMPANY.amfiArn}). Direct plans have a lower expense ratio and are available from the AMC; we do not earn commission on Direct plans. PMS and AIFs are offered only where you meet the product eligibility, including the SEBI minimums that generally apply (₹50 lakh for PMS and ₹1 crore for most AIFs). Past performance is not a guide to future returns.`;

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
