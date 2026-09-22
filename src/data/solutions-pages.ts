import type { SolutionPillar } from './solutions-pillars';
import { getPillarById, SOLUTION_PILLARS } from './solutions-pillars';

export type SolutionVisualKind =
  | 'capital-flow'
  | 'allocation-chart'
  | 'risk-map'
  | 'intelligence-pipeline';

export type SolutionPageSection = {
  id: string;
  title: string;
  body: string;
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

export type SolutionDedicatedConfig = {
  pillarId: string;
  documentTitle: string;
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
  documentTitle: 'Solutions | OneCapital',
  hero: {
    image: '/images/solutions/solutions-hub.jpg',
    line1: 'The steward and architect',
    line2: 'of your capital.',
    description:
      'Discretion, clarity, and research-led thinking — structured for individuals, families, and businesses seeking long-term advisory partnership.',
  },
  intro: {
    statement: 'Capital is not merely managed. It is understood, structured, protected, and continuously informed.',
    body: 'OneCapital’s Solutions ecosystem integrates strategy, portfolio stewardship, risk architecture, and intelligence into one coherent mandate — so every allocation decision serves long-term preservation and deliberate growth.',
  },
  trust: {
    eyebrow: 'Institutional discipline',
    headline: 'Research-led. Relationship-driven. Regulation-aware.',
    points: [
      'Integrated advisory across public and private markets',
      'Disciplined frameworks for allocation, liquidity, and risk',
      'Consolidated reporting and transparent oversight',
      'Long-term partnership with individuals, families, and businesses',
    ],
  },
} as const;

export const SOLUTION_OVERVIEWS: SolutionOverviewConfig[] = [
  {
    id: 'capital-strategy',
    visual: 'capital-flow',
    headline: 'Direction before deployment.',
    statement:
      'Capital Strategy establishes the intellectual framework behind every allocation — objectives, constraints, and deliberate portfolio design.',
    flowSteps: ['Capital', 'Allocation', 'Opportunity', 'Growth'],
  },
  {
    id: 'portfolio-management',
    visual: 'allocation-chart',
    headline: 'Precision in every position.',
    statement:
      'Portfolio Management is active stewardship across public and private markets — constructed, monitored, and rebalanced with intent.',
    flowSteps: ['Portfolio', 'Allocation', 'Monitoring', 'Rebalancing'],
    reversed: true,
  },
  {
    id: 'risk-wealth-architecture',
    visual: 'risk-map',
    headline: 'Structure beneath the portfolio.',
    statement:
      'Risk & Wealth Architecture addresses protection, liquidity design, tax efficiency, and intergenerational transfer — the foundation beneath growth.',
    flowSteps: ['Growth', 'Liquidity', 'Protection', 'Legacy'],
  },
  {
    id: 'intelligence-oversight',
    visual: 'intelligence-pipeline',
    headline: 'Visibility that informs action.',
    statement:
      'Intelligence & Oversight delivers manager diligence, performance transparency, consolidated reporting, and disciplined capital deployment.',
    flowSteps: ['Data', 'Research', 'Insight', 'Oversight', 'Decision'],
    reversed: true,
  },
];

type DedicatedPageInput = Omit<SolutionDedicatedConfig, 'pillarId' | 'documentTitle'>;

function buildDedicated(pillarId: string, config: DedicatedPageInput): SolutionDedicatedConfig {
  const pillar = getPillarById(pillarId);
  if (!pillar) throw new Error(`Unknown pillar: ${pillarId}`);

  return {
    pillarId,
    documentTitle: `${pillar.title} | OneCapital`,
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
    hero: {
      image: '/images/solutions/capital-strategy.jpg',
      headline: 'Strategic decisions before capital moves.',
      subheadline:
        'The intellectual framework behind every allocation — objectives, constraints, and deliberate portfolio design.',
      imagePosition: 'center 40%',
    },
    intro: {
      statement: 'Strategy is the discipline of choosing what not to do.',
      body: 'Before capital is deployed, we establish clarity on objectives, liquidity requirements, risk budget, and investment constraints — creating a reference point for decisions through changing market environments.',
    },
    theme: 'direction',
    visual: 'capital-flow',
    sections: [
      {
        id: 'strategic-framework',
        title: 'Strategic Framework',
        body: 'We align capital decisions with your objectives, time horizon, and constraints — translating intent into an actionable investment policy.',
        points: ['Objectives mapping', 'Constraint analysis', 'Policy documentation'],
      },
      {
        id: 'capital-allocation',
        title: 'Capital Allocation',
        body: 'We determine how capital should be distributed across equities, fixed income, alternatives, cash and other asset classes — balancing opportunity with resilience across market cycles.',
        points: ['Asset class mix', 'Risk budgeting', 'Cycle awareness'],
      },
      {
        id: 'opportunity-mapping',
        title: 'Opportunity Mapping',
        body: 'Independent investment insight across securities, funds, managers and strategies — helping you make deliberate decisions in a complex landscape.',
        points: ['Manager evaluation', 'Strategy selection', 'Access assessment'],
      },
      {
        id: 'decision-framework',
        title: 'Decision Framework',
        body: 'From ideas to a coherent portfolio — every investment is selected for the role it plays within the broader architecture, not in isolation.',
        points: ['Portfolio construction', 'Correlation analysis', 'Liquidity planning'],
      },
    ],
    cta: {
      line1: 'Ready to define',
      line2: 'your capital',
      outlined: 'strategy',
      quote:
        'Speak with our advisory team about establishing the strategic framework that governs every allocation decision.',
    },
  }),
  'portfolio-management': buildDedicated('portfolio-management', {
    hero: {
      image: '/images/solutions/portfolio-management.jpg',
      headline: 'Capital, managed with intent.',
      subheadline:
        'Active stewardship across public and private markets — constructed, monitored, and rebalanced with discipline.',
      imagePosition: 'center',
    },
    intro: {
      statement: 'Every position must earn its place.',
      body: 'We design and manage portfolios around your objectives, liquidity requirements, and long-term vision. Allocation, diversification, and monitoring are integrated — not treated as separate activities.',
    },
    theme: 'precision',
    visual: 'allocation-chart',
    sections: [
      {
        id: 'portfolio-philosophy',
        title: 'Portfolio Philosophy',
        body: 'Portfolios are built around purpose — income, growth, preservation, or a deliberate blend — with every holding assigned a defined role.',
        points: ['Mandate alignment', 'Role-based construction', 'Purposeful diversification'],
      },
      {
        id: 'portfolio-architecture',
        title: 'Portfolio Architecture',
        body: 'We construct portfolios across public and private markets, including fixed income, alternatives, and specialized mandates where appropriate.',
        points: ['Multi-asset construction', 'Fixed-income engineering', 'Alternative access'],
      },
      {
        id: 'performance-intelligence',
        title: 'Performance Intelligence',
        body: 'Continuous monitoring of exposures, valuations, risk and allocation drift — with rebalancing when the portfolio’s intended architecture demands it.',
        points: ['Exposure tracking', 'Drift detection', 'Disciplined rebalancing'],
      },
      {
        id: 'scenario-analysis',
        title: 'Scenario Analysis',
        body: 'Portfolios are evaluated against changing circumstances — market shifts, liquidity needs, and evolving objectives — before adjustments are made.',
        points: ['Stress awareness', 'Liquidity review', 'Mandate recalibration'],
      },
    ],
    cta: {
      line1: 'Ready to steward',
      line2: 'your portfolio',
      outlined: 'mandate',
      quote:
        'Discuss how active portfolio management can align with your liquidity needs, risk appetite, and long-term objectives.',
    },
  }),
  'risk-wealth-architecture': buildDedicated('risk-wealth-architecture', {
    hero: {
      image: '/images/solutions/risk-wealth-architecture.jpg',
      headline: 'Structure that protects compounding.',
      subheadline:
        'Structural protection, liquidity design, tax efficiency, and intergenerational wealth transfer — the architecture beneath the portfolio.',
      imagePosition: 'center 35%',
    },
    intro: {
      statement: 'Protection is the first principle of enduring wealth.',
      body: 'We look beyond volatility to assess concentration, liquidity, credit, duration, currency and structural risks — integrating protection, liquidity, and legacy planning into one coherent architecture.',
    },
    theme: 'structure',
    visual: 'risk-map',
    sections: [
      {
        id: 'wealth-architecture',
        title: 'Wealth Architecture',
        body: 'Your portfolio is only one part of your wealth. We examine the complete family balance sheet — assets, businesses, liabilities, and exposures — to understand true concentration of risk and opportunity.',
        points: ['Balance-sheet view', 'Concentration mapping', 'Structural alignment'],
      },
      {
        id: 'risk-mapping',
        title: 'Risk Mapping',
        body: 'We identify vulnerabilities before they become permanent impairments — assessing concentration, liquidity, credit, duration, and currency risks across holdings.',
        points: ['Multi-factor risk', 'Stress testing', 'Vulnerability identification'],
      },
      {
        id: 'protection-resilience',
        title: 'Protection & Resilience',
        body: 'Portfolios are subjected to scenario analysis — equity drawdowns, rate shocks, currency depreciation and credit stress — to assess resilience before markets test them.',
        points: ['Scenario modelling', 'Downside awareness', 'Resilience planning'],
      },
      {
        id: 'legacy',
        title: 'Legacy & Transfer',
        body: 'We integrate investments with succession, gifting, trusts and intergenerational transfer strategies — preserving not merely wealth, but the structures and principles behind it.',
        points: ['Estate integration', 'Tax-aware structuring', 'Intergenerational planning'],
      },
    ],
    cta: {
      line1: 'Ready to architect',
      line2: 'your wealth',
      outlined: 'structure',
      quote:
        'Explore how risk architecture, liquidity design, and legacy planning can reinforce your long-term capital mandate.',
    },
  }),
  'intelligence-oversight': buildDedicated('intelligence-oversight', {
    hero: {
      image: '/images/solutions/intelligence-oversight.jpg',
      headline: 'Powered by insight. Governed by discipline.',
      subheadline:
        'Manager diligence, performance transparency, consolidated reporting, and disciplined capital deployment.',
      imagePosition: 'center',
    },
    intro: {
      statement: 'Access is not the same as selection.',
      body: 'Rigorous evaluation of managers, clear consolidated reporting, and disciplined deployment frameworks — giving you visibility across your entire financial universe without ambiguity.',
    },
    theme: 'intelligence',
    visual: 'intelligence-pipeline',
    sections: [
      {
        id: 'intelligence-layer',
        title: 'Intelligence Layer',
        body: 'We undertake rigorous evaluation of external managers — examining philosophy, process, people, performance attribution, risk, liquidity, alignment and operational robustness.',
        points: ['Due diligence', 'Manager selection', 'Alignment assessment'],
      },
      {
        id: 'research',
        title: 'Research & Market Intelligence',
        body: 'Research-led insight informs manager selection, allocation decisions, and capital deployment — connecting market intelligence to mandate requirements.',
        points: ['Research integration', 'Market context', 'Opportunity assessment'],
      },
      {
        id: 'reporting',
        title: 'Reporting & Visibility',
        body: 'Clear, consolidated reporting across portfolios, strategies and asset classes — bringing together investments across custodians, accounts and external managers into one integrated view.',
        points: ['Consolidated reporting', 'Performance attribution', 'Exposure visibility'],
      },
      {
        id: 'executive-oversight',
        title: 'Executive Oversight',
        body: 'A disciplined framework for deploying liquidity across market cycles — enabling decisive action when valuations, dislocations or exceptional opportunities create an attractive risk-reward equation.',
        points: ['Capital deployment', 'Cycle discipline', 'Decision governance'],
      },
    ],
    cta: {
      line1: 'Ready for complete',
      line2: 'capital',
      outlined: 'visibility',
      quote:
        'Request a consultation on consolidated reporting, manager diligence, and oversight frameworks for your mandate.',
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
