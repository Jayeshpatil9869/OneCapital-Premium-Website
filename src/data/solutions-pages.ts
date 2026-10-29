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
    description: `${COMPANY.brandName} in ${COMPANY.hqCity} offers mutual funds, PMS, AIF, equity, options baskets, and investment advisory. Capital strategy, portfolio management, and wealth management sit inside advisory. Research first, then the strategy.`,
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
    line1: 'Planning, portfolios,',
    line2: 'and a clear review.',
    description: `From ${COMPANY.hqCity}, we help individuals, families, and business owners plan goals, invest through mutual funds, PMS, and suitable alternatives, and review the portfolio with tax, liquidity, and nominations in view.`,
  },
  intro: {
    statement: 'Three services. One wealth relationship.',
    body: 'Capital Strategy is the financial plan. Portfolio Management is where the money is invested. Wealth Management covers risk, cash, tax, and succession.',
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
    headline: 'A financial plan before a product list.',
    statement:
      'Retirement, education, a home, or business liquidity is written down first. Asset allocation and product choice follow that plan.',
    flowSteps: ['Goals', 'Risk profile', 'Allocation', 'Products'],
  },
  {
    id: 'portfolio-management',
    visual: 'allocation-chart',
    headline: 'Mutual funds, PMS, and alternatives.',
    statement:
      'SIPs and lumpsums in equity, debt, and hybrid funds, with PMS and AIFs added only when the amount, lock-in, and risk fit.',
    flowSteps: ['Mutual funds', 'SIP', 'PMS', 'Review'],
    reversed: true,
  },
  {
    id: 'wealth-management',
    visual: 'risk-map',
    headline: 'Risk, cash, tax, and succession.',
    statement:
      'An emergency reserve, a risk profile you can live with, tax-aware holding periods, and nominations that are actually up to date.',
    flowSteps: ['Risk', 'Cash', 'Tax', 'Nominations'],
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
      title: `Capital Strategy & Investment Planning | ${COMPANY.brandName}`,
      description:
        'Build a personalised investment strategy with One Capital. Explore goal-based financial planning, asset allocation and investment advisory guidance.',
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
      headline: 'A Clear Strategy for Every Stage of Wealth',
      subheadline:
        'Turn important life goals into an investment plan shaped by your priorities, time horizon and ability to take risk, with guidance.',
      imagePosition: 'center 40%',
    },
    intro: {
      statement: 'A financial plan that begins with your life, not the market',
      body: 'At One Capital, we start by listening. We help connect your goals, current finances and risk profile to a practical investment strategy you can understand and revisit.',
    },
    theme: 'direction',
    visual: 'capital-flow',
    sections: [
      {
        id: 'strategic-framework',
        title: 'Start With Your Goals',
        body: 'We map your priorities and time horizons so each goal has a clear place in your wider investment plan.',
        points: [
          'The milestones that matter most to your family',
          'Education',
          'Retirement',
          'Home purchase',
          'Family security',
        ],
      },
      {
        id: 'who-its-for',
        title: 'Built Around You',
        body: 'Whether building wealth or planning its use, our advice reflects your circumstances and capacity for risk.',
        points: [
          'Your circumstances shape every recommendation',
          'Professionals',
          'Business owners',
          'Families',
        ],
      },
      {
        id: 'capital-allocation',
        title: 'Asset Allocation',
        body: 'We consider how assets work together in a mix suited to your goals, liquidity needs and risk profile.',
        points: [
          'Finding the right balance for your needs',
          'Equity',
          'Fixed income',
          'Cash reserves',
        ],
      },
      {
        id: 'opportunity-mapping',
        title: 'Choosing Suitable Products',
        body: 'We consider suitability, costs and risks before discussing how an investment may fit your strategy.',
        points: [
          'Each investment should serve a clear purpose',
          'Funds',
          'Bonds',
          'ETFs',
          'REITs',
        ],
      },
      {
        id: 'decision-framework',
        title: 'From Plan to Progress',
        body: 'We begin with a discussion, assess your needs, share recommendations and revisit the plan as life changes.',
        points: [
          'A clear process, with room to adapt',
          'Discover',
          'Assess',
          'Advise',
          'Review',
        ],
      },
    ],
    cta: {
      line1: 'Ready to write',
      line2: 'the plan',
      outlined: 'first',
      quote:
        'Book a consultation to map your goals, surplus, and risk before the next investment is made.',
    },
  }),

  'portfolio-management': buildDedicated('portfolio-management', {
    seo: {
      title: `Portfolio Management Advisory Services | ${COMPANY.brandName}`,
      description:
        'Explore personalised portfolio advisory services at One Capital. Get guidance on investment allocation, risk suitability and portfolio reviews.',
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
      headline: 'Your Portfolio. Your Goals. Our Perspective.',
      subheadline:
        'Invest with greater clarity through personalised portfolio advice that considers your goals, risk comfort and changing priorities.',
      imagePosition: 'center',
    },
    intro: {
      statement: 'Thoughtful Advice for Every Investment Decision',
      body: 'A well considered portfolio starts with understanding you. At One Capital, we review your investments, assess suitability and offer clear, research-informed guidance to help you make decisions with confidence.',
    },
    theme: 'precision',
    visual: 'allocation-chart',
    sections: [
      {
        id: 'mutual-funds',
        title: 'Mutual funds',
        body: 'We use SEBI-defined categories so each fund has a job. Equity: large cap, mid cap, small cap, flexi cap, and ELSS for investors who still use Section 80C. Debt: liquid, short duration, and other debt funds matched to the date you need the money. Hybrid funds, including balanced advantage, sit between the two. An index fund is used when a low-cost core is the better fit. Investments are in Regular plans through our AMFI registration.',
        points: [
          'A category for every time horizon',
          'Large, mid, small, flexi cap',
          'ELSS',
          'Debt and liquid',
          'Hybrid and index',
        ],
      },
      {
        id: 'sip-lumpsum',
        title: 'SIP, step-up SIP, and lumpsum',
        body: 'A SIP invests a fixed amount every month and is the default for salary and business drawings. A step-up SIP increases that amount as income rises. A lumpsum, from a bonus, property sale, or inheritance, is usually staggered so one market day does not decide the whole entry. Scheme minimums apply and vary by fund.',
        points: [
          'Monthly habit, plus room for a one-time amount',
          'SIP',
          'Step-up SIP',
          'Staggered lumpsum',
        ],
      },
      {
        id: 'pms',
        title: 'Portfolio Management Services',
        body: 'A PMS is a professionally managed portfolio of stocks or debt, held in your own demat account. Under SEBI rules the minimum is generally ₹50 lakh. Discretionary PMS lets the manager decide trades. Non-discretionary PMS executes what you approve. Advisory PMS only recommends. Compared with a mutual fund, a PMS is more concentrated and more personal. We help you read the strategy, the fee, and whether it belongs next to the funds you already hold.',
        points: [
          'Custom portfolios for larger amounts',
          'Discretionary',
          'Non-discretionary',
          'Advisory',
          'Minimum generally ₹50 lakh',
        ],
      },
      {
        id: 'alternatives',
        title: 'AIFs and other alternatives',
        body: 'Alternative Investment Funds are private pooled vehicles. Category I and II are often private equity, venture, or private credit. Category III can use listed equities and more active strategies. Most AIFs ask for ₹1 crore and lock capital for years. The full product page covers eligibility, what we look at, and why an AIF stays a small part of the plan.',
        points: [
          'Private markets, sized with care',
          'AIF Category I, II, III',
          'Eligibility and lock-in',
          'A satellite, not the core',
        ],
      },
      {
        id: 'monitoring',
        title: 'Reviews and rebalancing',
        body: 'Markets move the mix away from the plan. A fund can change its manager. A goal can arrive early. We review allocation, overlap, and progress, and we rebalance when the gap is meaningful. We do not switch funds because last quarter was noisy.',
        points: [
          'Stay with the plan, correct the drift',
          'Allocation drift',
          'Manager changes',
          'Goal dates',
        ],
      },
    ],
    cta: {
      line1: 'Ready to build',
      line2: 'the portfolio',
      outlined: 'properly',
      quote:
        'Talk to us about mutual funds, a SIP, or whether PMS and alternatives belong in your plan.',
    },
  }),

  'wealth-management': buildDedicated('wealth-management', {
    seo: {
      title: `Wealth Management & Financial Advisory | ${COMPANY.brandName}`,
      description:
        'Explore personalised wealth management guidance at One Capital, covering risk assessment, investment suitability, liquidity and family wealth planning.',
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
      headline: 'Wealth With Purpose. Advice With Perspective.',
      subheadline:
        'Thoughtful wealth guidance shaped by your family, financial priorities and risk profile, with personal attention at every step.',
      imagePosition: 'center 35%',
    },
    intro: {
      statement: 'Wealth is personal.',
      body: 'Wealth is personal. Your plans may include family security, future milestones and financial independence. We bring your priorities together through considered advice, clear conversations and regular reviews.',
    },
    theme: 'structure',
    visual: 'risk-map',
    // Visible page body lives in WealthManagementLayout (Word: What We Consider + How One Capital Works).
    sections: [
      {
        id: 'risk-review',
        title: 'Risk Review',
        body: 'We begin by understanding your finances, investment experience, ability to bear losses and comfort with risk before we advise.',
        points: ['What We Consider'],
      },
      {
        id: 'exposure',
        title: 'Exposure',
        body: 'We look at where your wealth is invested and whether too much depends on one company, sector, asset class or source of income.',
        points: ['What We Consider'],
      },
      {
        id: 'liquidity',
        title: 'Liquidity',
        body: 'We consider near-term commitments and access to funds, so your plan accounts for cash needs.',
        points: ['What We Consider'],
      },
      {
        id: 'tax-matters',
        title: 'Tax Matters',
        body: 'We consider tax implications and coordinate with your CA where specialist guidance is needed.',
        points: ['What We Consider'],
      },
      {
        id: 'succession',
        title: 'Succession',
        body: 'We discuss nominations and continuity, with legal specialists involved when appropriate.',
        points: ['What We Consider'],
      },
      {
        id: 'research-led',
        title: 'Research Led',
        body: 'We examine options, costs and risks before discussing what may suit your needs.',
        points: ['How One Capital Works'],
      },
      {
        id: 'meet-in-person',
        title: 'Meet In Person',
        body: 'We make room for face-to-face discussions in Maharashtra when available.',
        points: ['How One Capital Works'],
      },
      {
        id: 'clear-disclosures',
        title: 'Clear Disclosures',
        body: 'We explain the advisory or distribution role involved before you decide.',
        points: ['How One Capital Works'],
      },
      {
        id: 'working-with-cas',
        title: 'Working With CAs',
        body: 'We coordinate with your CA on relevant tax matters, with your consent.',
        points: ['How One Capital Works'],
      },
      {
        id: 'plan-for-transfer',
        title: 'Plan For Transfer',
        body: 'We help you review nominations and records for smoother family transitions.',
        points: ['How One Capital Works'],
      },
      {
        id: 'a-personal-guide',
        title: 'A Personal Guide',
        body: 'You have a person to speak with as your needs and circumstances evolve.',
        points: ['How One Capital Works'],
      },
    ],
    cta: {
      line1: 'Explore the decisions',
      line2: 'that bring greater clarity',
      outlined: 'to your financial life',
      quote: 'Book a conversation to review risk, liquidity, tax matters and succession with clear guidance.',
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
