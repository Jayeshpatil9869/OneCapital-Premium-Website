import type { SolutionPillar } from './solutions-pillars';
import { getPillarById, SOLUTION_PILLARS } from './solutions-pillars';
import { COMPANY } from './company';

export type SolutionVisualKind =
  | 'capital-flow'
  | 'allocation-chart'
  | 'risk-map'
  | 'intelligence-pipeline';

export type SolutionPageSection = {
  id: string;
  title: string;
  body: string;
  /** points[0] renders as section tagline; remaining items as capability chips */
  points?: string[];
};

export type SolutionOverviewConfig = {
  id: string;
  visual: SolutionVisualKind;
  headline: string;
  statement: string;
  flowSteps: string[];
  reversed?: boolean;
};

export type SolutionPageSeo = {
  title: string;
  description: string;
  keywords: string[];
  serviceType: string;
};

export type SolutionDedicatedConfig = {
  pillarId: string;
  documentTitle: string;
  seo: SolutionPageSeo;
  hero: {
    image: string;
    headline: string;
    subheadline: string;
    imagePosition?: string;
  };
  intro: {
    statement: string;
    body: string;
  };
  theme: 'direction' | 'precision' | 'structure' | 'intelligence';
  sections: SolutionPageSection[];
  visual: SolutionVisualKind;
  cta: {
    line1: string;
    line2: string;
    outlined: string;
    quote: string;
  };
};

export const SOLUTIONS_HUB = {
  documentTitle: `Our Products | ${COMPANY.brandName}`,
  seo: {
    title: `Our Products — Wealth Advisory & Portfolio Solutions | ${COMPANY.brandName}`,
    description: `${COMPANY.brandName} in ${COMPANY.hqCity} offers capital strategy, portfolio management, risk & wealth architecture, and intelligence & oversight — spanning mutual funds, PMS, wealth planning, tax strategy, and alternatives.`,
    keywords: [
      'wealth management advisory',
      'portfolio management services Pune',
      'mutual funds India',
      'capital strategy investment',
      'risk management wealth planning',
      'AIF mutual funds India',
      'One Capital Investment',
      COMPANY.brandName,
    ],
  },
  hero: {
    image: '/images/solutions/solutions-hub.jpg',
    line1: 'Products built around',
    line2: 'how wealth actually works.',
    description: `From our ${COMPANY.hqCity} base, we help individuals and businesses grow and protect capital through investment advisory, portfolio management, wealth planning, and transparent oversight — across mutual funds, PMS pathways, tax strategy, and carefully evaluated alternatives.`,
  },
  intro: {
    statement: 'Four product pillars. One coherent wealth mandate.',
    body: 'Capital Strategy sets direction. Portfolio Management implements and stewards. Risk & Wealth Architecture protects compounding. Intelligence & Oversight keeps every decision visible and accountable — so advisory stays concrete, not abstract.',
  },
  trust: {
    eyebrow: 'How we work',
    headline: 'Research-led. Client-first. Regulation-aware.',
    points: [
      'Mutual funds via AMFI-registered distribution (ARN-verified)',
      'Portfolio pathways including PMS and AIFs where suitable',
      'Wealth planning and tax strategy integrated with investing',
      `Local presence across ${COMPANY.hqCity}, Mumbai, Kolhapur & Nashik`,
    ],
  },
} as const;

export const SOLUTION_OVERVIEWS: SolutionOverviewConfig[] = [
  {
    id: 'capital-strategy',
    visual: 'capital-flow',
    headline: 'Direction before deployment.',
    statement:
      'Capital Strategy turns goals, risk capacity, and liquidity needs into a clear allocation policy — before mutual funds, PMS, or alternatives are selected.',
    flowSteps: ['Goals', 'Policy', 'Allocation', 'Products'],
  },
  {
    id: 'portfolio-management',
    visual: 'allocation-chart',
    headline: 'Portfolios that earn their keep.',
    statement:
      'Portfolio Management builds and stewards holdings across mutual funds, PMS, and suitable alternatives — monitored and rebalanced as life and markets change.',
    flowSteps: ['Construct', 'Invest', 'Monitor', 'Rebalance'],
    reversed: true,
  },
  {
    id: 'risk-wealth-architecture',
    visual: 'risk-map',
    headline: 'Structure beneath the returns.',
    statement:
      'Risk & Wealth Architecture covers risk profiling, liquidity, tax-aware investing, and long-term wealth planning — the foundation that lets portfolios compound.',
    flowSteps: ['Risk', 'Liquidity', 'Tax', 'Legacy'],
  },
  {
    id: 'intelligence-oversight',
    visual: 'intelligence-pipeline',
    headline: 'Visibility that informs action.',
    statement:
      'Intelligence & Oversight delivers fund diligence, consolidated reporting, and disciplined deployment — transparent advisory across your financial picture.',
    flowSteps: ['Diligence', 'Insight', 'Report', 'Decide'],
    reversed: true,
  },
];

type DedicatedPageInput = Omit<SolutionDedicatedConfig, 'pillarId' | 'documentTitle'>;

function buildDedicated(pillarId: string, config: DedicatedPageInput): SolutionDedicatedConfig {
  const pillar = getPillarById(pillarId);
  if (!pillar) throw new Error(`Unknown pillar: ${pillarId}`);

  return {
    pillarId,
    documentTitle: config.seo.title,
    ...config,
    sections:
      config.sections.length > 0
        ? config.sections
        : pillar.services.map((service) => ({
            id: service.id,
            title: service.title,
            body: service.description,
            points: [service.tagline],
          })),
  };
}

export const SOLUTION_DEDICATED_PAGES: Record<string, SolutionDedicatedConfig> = {
  'capital-strategy': buildDedicated('capital-strategy', {
    seo: {
      title: `Capital Strategy & Investment Advisory | ${COMPANY.brandName}`,
      description: `Capital strategy and investment advisory in ${COMPANY.hqCity} — goal mapping, asset allocation, and portfolio design across mutual funds, debt, equity, and alternatives before capital is deployed.`,
      keywords: [
        'capital strategy investment',
        'investment advisory Pune',
        'asset allocation India',
        'wealth management advisory',
        'One Capital Investment',
      ],
      serviceType: 'Investment advisory and capital allocation strategy',
    },
    hero: {
      image: '/images/solutions/capital-strategy.jpg',
      headline: 'Strategy first. Products second.',
      subheadline:
        'Define goals, risk budget, and liquidity — then design how capital should sit across mutual funds, debt, equity, and alternatives.',
      imagePosition: 'center 40%',
    },
    intro: {
      statement: 'Capital moves with clarity when the policy is written first.',
      body: `At ${COMPANY.brandName}, Capital Strategy is the advisory layer that precedes product selection. We align objectives, time horizon, cash needs, and constraints into an investment policy — so every mutual fund, PMS sleeve, or alternative allocation has a defined job.`,
    },
    theme: 'direction',
    visual: 'capital-flow',
    sections: [
      {
        id: 'strategic-framework',
        title: 'Goals & Strategic Framework',
        body: 'We start with what the capital must fund — retirement, education, business liquidity, family milestones — and translate that into measurable objectives, a risk budget, and a decision policy you can revisit each year.',
        points: [
          'A living policy for every rupee you invest',
          'Goal mapping',
          'Risk capacity',
          'Liquidity calendar',
        ],
      },
      {
        id: 'capital-allocation',
        title: 'Asset Allocation Design',
        body: 'We set target ranges across equity, debt, hybrids, cash, and — where suitable — AIFs, startup equity, and structured real-estate exposures. The mix is built for your cycle resilience, not last year’s trend.',
        points: [
          'Allocation that matches life, not fashion',
          'Equity & debt mix',
          'Alternatives sleeve',
          'Cash buffer design',
        ],
      },
      {
        id: 'opportunity-mapping',
        title: 'Opportunity & Product Mapping',
        body: 'Once the framework is set, we map which product types fit each sleeve — mutual fund categories, PMS pathways, or private-market structures — with research-led screening rather than product push.',
        points: [
          'Fit-first product selection',
          'Fund category fit',
          'PMS suitability',
          'AIF screening',
        ],
      },
      {
        id: 'decision-framework',
        title: 'Decision & Construction Framework',
        body: 'Every proposed holding must earn a role: growth, income, stability, or satellite opportunity. Correlation, tax character, and liquidity are checked before capital is committed.',
        points: [
          'Role-based portfolio design',
          'Diversification rules',
          'Tax character check',
          'Liquidity gates',
        ],
      },
    ],
    cta: {
      line1: 'Ready to define',
      line2: 'your capital',
      outlined: 'strategy',
      quote:
        'Book a consultation to establish the investment policy that will govern every allocation decision.',
    },
  }),

  'portfolio-management': buildDedicated('portfolio-management', {
    seo: {
      title: `Portfolio Management Services & Mutual Funds | ${COMPANY.brandName}`,
      description: `Portfolio management in ${COMPANY.hqCity} — mutual funds, PMS pathways, and suitable AIFs with ongoing monitoring and rebalancing. AMFI-registered distribution and disciplined stewardship.`,
      keywords: [
        'portfolio management services Pune',
        'mutual funds India',
        'AIF mutual funds India',
        'portfolio rebalancing',
        'One Capital Investment',
      ],
      serviceType: 'Portfolio management and mutual fund investment services',
    },
    hero: {
      image: '/images/solutions/portfolio-management.jpg',
      headline: 'Portfolios built for your mandate.',
      subheadline:
        'Mutual funds, portfolio management services, and carefully selected alternatives — constructed, monitored, and rebalanced with discipline.',
      imagePosition: 'center',
    },
    intro: {
      statement: 'Every position should serve a goal — not a catalog.',
      body: 'We implement Capital Strategy through regulated products: diversified mutual-fund cores, PMS where ticket size and preference fit, and alternatives such as AIFs, startup equity, or structured real estate when suitability and eligibility allow. Stewardship continues after the first deployment.',
    },
    theme: 'precision',
    visual: 'allocation-chart',
    sections: [
      {
        id: 'portfolio-philosophy',
        title: 'Portfolio Philosophy',
        body: 'Portfolios are purpose-built — growth, income, preservation, or a deliberate blend. We assign each sleeve a role and avoid collecting products that do not improve the whole.',
        points: [
          'Mandate-led, not product-led',
          'Goal alignment',
          'Role-based holdings',
          'Purposeful diversification',
        ],
      },
      {
        id: 'portfolio-architecture',
        title: 'Multi-Asset Architecture',
        body: 'Core architecture typically spans equity, debt, and hybrid mutual funds. For qualifying investors, we layer PMS strategies and alternatives after diligence — always sized to risk budget and liquidity constraints.',
        points: [
          'Public markets first; alternatives by fit',
          'Mutual fund core',
          'PMS pathways',
          'AIF & private markets',
        ],
      },
      {
        id: 'performance-intelligence',
        title: 'Monitoring & Performance Care',
        body: 'We track category drift, fund or manager changes, concentration, and progress against goals. Rebalancing and switches are recommended when the architecture — not short-term noise — demands it.',
        points: [
          'Stewardship on a defined cadence',
          'Exposure tracking',
          'Drift alerts',
          'Disciplined rebalancing',
        ],
      },
      {
        id: 'scenario-analysis',
        title: 'Life & Market Recalibration',
        body: 'Job changes, business exits, inheritance, or large expenses change the mandate. We recalibrate allocations and product mix when your circumstances or market structure shift materially.',
        points: [
          'Plans that update with your life',
          'Liquidity review',
          'Stress awareness',
          'Mandate refresh',
        ],
      },
    ],
    cta: {
      line1: 'Ready to steward',
      line2: 'your portfolio',
      outlined: 'mandate',
      quote:
        'Discuss how mutual funds, PMS, and suitable alternatives can be structured around your liquidity needs and risk appetite.',
    },
  }),

  'risk-wealth-architecture': buildDedicated('risk-wealth-architecture', {
    seo: {
      title: `Risk Management & Wealth Planning | ${COMPANY.brandName}`,
      description: `Risk management and wealth planning in ${COMPANY.hqCity} — risk profiling, liquidity design, tax-aware investing, and long-term wealth transfer architecture beneath your portfolio.`,
      keywords: [
        'risk management wealth planning',
        'tax strategy investing India',
        'wealth planning Pune',
        'liquidity planning',
        'One Capital Investment',
      ],
      serviceType: 'Risk management and wealth planning services',
    },
    hero: {
      image: '/images/solutions/risk-wealth-architecture.jpg',
      headline: 'Protect the engine of compounding.',
      subheadline:
        'Risk profiling, liquidity design, tax strategy, and wealth planning — structure that lets portfolios work through cycles.',
      imagePosition: 'center 35%',
    },
    intro: {
      statement: 'Growth without structure is fragile.',
      body: 'Risk & Wealth Architecture looks past day-to-day volatility to concentration, liquidity gaps, tax drag, and succession readiness. It is the layer that turns a portfolio into a durable wealth plan for individuals, families, and business owners.',
    },
    theme: 'structure',
    visual: 'risk-map',
    sections: [
      {
        id: 'wealth-architecture',
        title: 'Wealth Architecture',
        body: 'We examine the full picture — investments, business equity, real estate, liabilities, and guarantees — so portfolio design complements what you already own instead of amplifying hidden concentration.',
        points: [
          'Balance-sheet thinking, not siloed products',
          'Asset map',
          'Concentration check',
          'Business-linked wealth',
        ],
      },
      {
        id: 'risk-mapping',
        title: 'Risk Mapping',
        body: 'We identify where capital can be impaired — market, credit, duration, liquidity, and currency where relevant — and size exposures so a single shock cannot break long-term goals.',
        points: [
          'Vulnerabilities surfaced early',
          'Multi-factor risk',
          'Stress scenarios',
          'Position sizing',
        ],
      },
      {
        id: 'protection-resilience',
        title: 'Liquidity, Tax & Resilience',
        body: 'Cash buckets fund near-term needs; tax-aware choices improve what you retain; scenario reviews test whether goals survive drawdowns. Protection and growth are designed together.',
        points: [
          'Resilience built into the plan',
          'Emergency & goal cash',
          'Tax-aware investing',
          'Drawdown readiness',
        ],
      },
      {
        id: 'legacy',
        title: 'Legacy & Transfer Planning',
        body: 'Nominations, account structures, gifting conversations, and intergenerational intent are brought into the advisory process — so wealth and wishes transfer with fewer gaps.',
        points: [
          'Wealth that outlasts a single generation',
          'Succession readiness',
          'Nomination hygiene',
          'Family coordination',
        ],
      },
    ],
    cta: {
      line1: 'Ready to architect',
      line2: 'your wealth',
      outlined: 'structure',
      quote:
        'Explore how risk architecture, tax strategy, and wealth planning can reinforce your long-term capital plan.',
    },
  }),

  'intelligence-oversight': buildDedicated('intelligence-oversight', {
    seo: {
      title: `Investment Research, Reporting & Oversight | ${COMPANY.brandName}`,
      description: `Intelligence & oversight from ${COMPANY.brandName} — fund and manager diligence, consolidated reporting, and disciplined capital deployment for transparent wealth advisory.`,
      keywords: [
        'investment research reporting',
        'fund due diligence India',
        'consolidated wealth reporting',
        'transparent investment advisory',
        'One Capital Investment',
      ],
      serviceType: 'Investment research, reporting, and oversight services',
    },
    hero: {
      image: '/images/solutions/intelligence-oversight.jpg',
      headline: 'Insight you can act on.',
      subheadline:
        'Fund diligence, performance clarity, consolidated views, and disciplined deployment — oversight that keeps advisory transparent.',
      imagePosition: 'center',
    },
    intro: {
      statement: 'Clarity is a competitive advantage in wealth.',
      body: `Through ${COMPANY.domain} and our advisory cadence, Intelligence & Oversight gives you visibility into what you own, why you own it, and when capital should move — grounded in diligence and reporting, not slogans.`,
    },
    theme: 'intelligence',
    visual: 'intelligence-pipeline',
    sections: [
      {
        id: 'intelligence-layer',
        title: 'Diligence Layer',
        body: 'Mutual funds, PMS strategies, and AIF managers are assessed on process, people, risk controls, costs, and alignment — so selection is earned, not assumed from brand recognition.',
        points: [
          'Selection over mere access',
          'Manager evaluation',
          'Process & people review',
          'Cost & alignment check',
        ],
      },
      {
        id: 'research',
        title: 'Research & Market Context',
        body: 'Market and category research informs when to stay the course, rebalance, or introduce a new sleeve — connecting macro and product insight to your written mandate.',
        points: [
          'Research tied to your policy',
          'Category insights',
          'Opportunity windows',
          'Mandate filters',
        ],
      },
      {
        id: 'reporting',
        title: 'Reporting & Visibility',
        body: 'Clear reporting covers performance, allocation, and material changes. Where holdings span multiple accounts or product types, we work toward a consolidated picture of progress against goals.',
        points: [
          'One coherent wealth view',
          'Performance attribution',
          'Allocation snapshot',
          'Multi-account clarity',
        ],
      },
      {
        id: 'executive-oversight',
        title: 'Deployment Oversight',
        body: 'New inflows and idle cash follow a deployment framework — SIPs, paced lumpsums, or opportunistic moves — so decisions remain deliberate when markets or life events create urgency.',
        points: [
          'Capital ready, not restless',
          'SIP & lumpsum pacing',
          'Opportunity protocol',
          'Decision checkpoints',
        ],
      },
    ],
    cta: {
      line1: 'Ready for complete',
      line2: 'capital',
      outlined: 'visibility',
      quote:
        'Request a consultation on fund diligence, consolidated reporting, and oversight for your wealth mandate.',
    },
  }),
};

export function getDedicatedPageConfig(pillarId: string): SolutionDedicatedConfig | undefined {
  return SOLUTION_DEDICATED_PAGES[pillarId];
}

export function getOverviewByPillarId(pillarId: string): SolutionOverviewConfig | undefined {
  return SOLUTION_OVERVIEWS.find((item) => item.id === pillarId);
}

export function getPillarFromList(pillarId: string): SolutionPillar | undefined {
  return SOLUTION_PILLARS.find((p) => p.id === pillarId);
}
