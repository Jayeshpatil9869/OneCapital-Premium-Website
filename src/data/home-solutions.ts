export type HomeSolution = {
  id: string;
  index: string;
  category: string;
  title: string;
  subtitle: string;
  highlights: string[];
  href: string;
};

/** All home solutions in one equal card grid (no full-width featured). */
export const HOME_SOLUTIONS: HomeSolution[] = [
  {
    id: 'wealth-management',
    index: '01',
    category: 'Core Advisory',
    title: 'Wealth Management',
    subtitle: 'One connected view of your wealth.',
    highlights: [
      'Goal discovery & portfolio strategy',
      'Continuous risk monitoring',
      'Strategic rebalancing',
    ],
    href: '/solutions#wealth-management',
  },
  {
    id: 'pms',
    index: '02',
    category: 'Portfolio Mandates',
    title: 'Elite PMS',
    subtitle: 'Custom mandates with direct ownership and complete transparency.',
    highlights: ['Direct demat ownership', 'Custom sector overlays', 'Active risk management'],
    href: '/solutions#pms',
  },
  {
    id: 'mutual-funds',
    index: '03',
    category: 'Fund Selection',
    title: 'Mutual Fund 360',
    subtitle: 'Institutional rigor in fund selection and goal-based allocation.',
    highlights: ['Proprietary fund selection', 'Strategic asset allocation', 'Portfolio review'],
    href: '/solutions#mutual-funds',
  },
  {
    id: 'aif',
    index: '04',
    category: 'Private Markets',
    title: 'Alternative Assets',
    subtitle: 'Uncorrelated returns through vetted private market opportunities.',
    highlights: ['Pre-IPO access', 'Private credit & debt', 'Rigorous due diligence'],
    href: '/solutions#aif',
  },
  {
    id: 'wealth-planning',
    index: '05',
    category: 'Financial Architecture',
    title: 'Wealth Planning',
    subtitle: 'A financial plan built around your life, not just your portfolio.',
    highlights: ['Retirement modeling', 'Tax optimization', 'Generational transfer'],
    href: '/solutions#wealth-planning',
  },
  {
    id: 'tax-strategy',
    index: '06',
    category: 'Tax Strategy',
    title: 'Tax Strategy',
    subtitle: 'Structure decisions so after-tax outcomes stay aligned with your mandate.',
    highlights: ['Tax-aware allocation', 'Harvesting & deferral', 'Cross-entity planning'],
    href: '/solutions#tax-strategy',
  },
];

