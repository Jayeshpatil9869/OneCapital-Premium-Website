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

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    id: 'capital-strategy',
    index: '01',
    title: 'Capital Strategy',
    summary:
      'The intellectual framework behind every allocation — objectives, constraints, and deliberate portfolio design.',
    services: [
      {
        id: 'asset-allocation',
        title: 'Asset Allocation',
        tagline: 'The architecture behind enduring wealth.',
        description:
          'We determine how capital should be distributed across equities, fixed income, alternatives, cash and other asset classes, balancing opportunity with resilience across market cycles.',
      },
      {
        id: 'investment-advisory',
        title: 'Investment Advisory',
        tagline: 'Independent thinking. Informed decisions.',
        description:
          'We provide institutional-calibre investment insight across securities, funds, managers and strategies—helping you make deliberate decisions in an increasingly complex investment landscape.',
      },
      {
        id: 'investment-policy',
        title: 'Investment Policy & Wealth Strategy',
        tagline: 'A framework for every capital-allocation decision.',
        description:
          'We establish a clear investment framework around your objectives, return expectations, liquidity needs, risk budget and investment constraints—creating a disciplined reference point for decisions through changing market environments.',
      },
      {
        id: 'portfolio-construction',
        title: 'Portfolio Construction',
        tagline: 'From ideas to a coherent portfolio.',
        description:
          'We select investments not in isolation, but for the role they play within the broader portfolio. Diversification, correlation, liquidity, valuation and downside risk are considered before capital is deployed.',
      },
    ],
  },
  {
    id: 'portfolio-management',
    index: '02',
    title: 'Portfolio Management',
    summary:
      'Active stewardship of capital across public and private markets — constructed, monitored, and rebalanced with intent.',
    services: [
      {
        id: 'investment-portfolio-management',
        title: 'Investment Portfolio Management',
        tagline: 'Capital, managed with intent.',
        description:
          'We design and manage portfolios around your objectives, liquidity requirements, risk appetite and long-term vision—across public and private markets. Every allocation has a purpose, and every position earns its place.',
      },
      {
        id: 'fixed-income-management',
        title: 'Fixed-Income Management',
        tagline: 'Stability engineered, not assumed.',
        description:
          'We manage fixed-income portfolios with deliberate attention to duration, credit quality, yield, maturity and liquidity—building portfolios designed to serve both income requirements and capital-preservation objectives.',
      },
      {
        id: 'alternative-investments',
        title: 'Alternative Investments',
        tagline: 'Access beyond conventional markets.',
        description:
          'For appropriate investors, we evaluate opportunities across private equity, venture capital, private credit, real estate, infrastructure, hedge funds and structured investments—focusing on quality, access, alignment and risk.',
      },
      {
        id: 'specialized-mandates',
        title: 'Specialized Mandates',
        tagline: 'When conventional portfolios are not enough.',
        description:
          'Concentrated equity positions, family-business wealth, employee stock, restricted securities and other complex holdings require bespoke thinking. We design strategies around the realities of your existing wealth rather than forcing it into a standard model.',
      },
      {
        id: 'portfolio-monitoring-rebalancing',
        title: 'Portfolio Monitoring & Rebalancing',
        tagline: 'Wealth requires continuous stewardship.',
        description:
          "Markets move. Circumstances change. Portfolios therefore require active oversight. We monitor exposures, valuations, risk and allocation drift, rebalancing when the portfolio's intended architecture demands it.",
      },
    ],
  },
  {
    id: 'risk-wealth-architecture',
    index: '03',
    title: 'Risk & Wealth Architecture',
    summary:
      'Structural protection, liquidity design, tax efficiency, and intergenerational wealth transfer — the architecture beneath the portfolio.',
    services: [
      {
        id: 'risk-management',
        title: 'Risk Management',
        tagline: 'Protecting capital is the first principle of compounding it.',
        description:
          'We look beyond volatility to assess concentration, liquidity, credit, duration, currency and structural risks—identifying vulnerabilities before they become permanent impairments of capital.',
      },
      {
        id: 'portfolio-stress-testing',
        title: 'Portfolio Stress Testing',
        tagline: 'Understanding what can go wrong before it does.',
        description:
          "We subject portfolios to a range of market scenarios—from equity drawdowns and rate shocks to currency depreciation and credit stress—to identify vulnerabilities and assess the portfolio's resilience.",
      },
      {
        id: 'cash-liquidity-management',
        title: 'Cash & Liquidity Management',
        tagline: 'Liquidity is an asset class—and an option.',
        description:
          'We structure cash reserves and short-term investments around your spending requirements, commitments and opportunities, ensuring liquidity is available when required without unnecessarily compromising returns.',
      },
      {
        id: 'tax-aware-investing',
        title: 'Tax-Aware Investing',
        tagline: 'Returns matter. What you retain matters more.',
        description:
          'Investment decisions are evaluated with tax efficiency in mind. We work to improve after-tax outcomes through thoughtful asset selection, portfolio structuring and coordination with your broader tax strategy.',
      },
      {
        id: 'estate-wealth-transfer',
        title: 'Estate & Wealth Transfer',
        tagline: 'Preserving wealth beyond a single generation.',
        description:
          'We help integrate investments with succession, gifting, trusts and intergenerational wealth-transfer strategies, with the objective of transferring not merely wealth, but the structures and principles behind it.',
      },
      {
        id: 'family-balance-sheet',
        title: 'Family Balance-Sheet Management',
        tagline: 'Your portfolio is only one part of your wealth.',
        description:
          'We look across the complete family balance sheet—financial assets, businesses, real estate, liabilities, guarantees and other exposures—to understand the true concentration of risk and opportunity.',
      },
    ],
  },
  {
    id: 'intelligence-oversight',
    index: '04',
    title: 'Intelligence & Oversight',
    summary:
      'Manager diligence, performance transparency, consolidated reporting, and disciplined capital deployment.',
    services: [
      {
        id: 'manager-due-diligence',
        title: 'Manager Selection & Due Diligence',
        tagline: 'Access is not the same as selection.',
        description:
          'We undertake rigorous evaluation of external managers across public and private markets, examining investment philosophy, process, people, performance attribution, risk, liquidity, alignment and operational robustness.',
      },
      {
        id: 'performance-reporting',
        title: 'Performance Reporting',
        tagline: 'Complete visibility. No ambiguity.',
        description:
          'We provide clear, consolidated reporting across portfolios, strategies and asset classes, giving you a precise view of performance, attribution, exposures and risk.',
      },
      {
        id: 'consolidated-wealth-reporting',
        title: 'Consolidated Wealth Reporting',
        tagline: 'One view of your entire financial universe.',
        description:
          "We bring together investments across custodians, accounts and external managers into a consolidated view—allowing you to understand your family's wealth, exposures and performance as one integrated portfolio.",
      },
      {
        id: 'capital-deployment',
        title: 'Capital Deployment Strategy',
        tagline: 'Keeping capital ready for exceptional opportunities.',
        description:
          'We develop a disciplined framework for deploying liquidity across market cycles, enabling you to act decisively when valuations, dislocations or exceptional opportunities create an attractive risk-reward equation.',
      },
    ],
  },
];

export const PORTFOLIO_MANAGEMENT_FOOTNOTE =
  'Implemented through regulated vehicles including PMS, mutual funds, and AIFs where appropriate.';

export function getPillarById(id: string): SolutionPillar | undefined {
  return SOLUTION_PILLARS.find((pillar) => pillar.id === id);
}

export function getAllServices(): SolutionService[] {
  return SOLUTION_PILLARS.flatMap((pillar) => pillar.services);
}

export function getPillarHref(pillarId: string): string {
  return `/solutions#${pillarId}`;
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
  href: getPillarHref(pillar.id),
}));
