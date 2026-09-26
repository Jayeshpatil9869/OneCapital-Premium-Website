import { COMPANY } from '@/src/data/company';

export type InsightCategory =
  | 'Market Outlook'
  | 'Wealth Planning'
  | 'Alternatives'
  | 'Behavioral Finance';

export type InsightArticle = {
  id: string;
  category: InsightCategory;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  href: string;
};

export type InsightTheme = {
  id: string;
  index: string;
  theme: string;
  headline: string;
  period: string;
  mandate: string;
  href: string;
  cta: string;
  image: string;
};

export const INSIGHT_CATEGORIES = [
  'All',
  'Market Outlook',
  'Wealth Planning',
  'Alternatives',
  'Behavioral Finance',
] as const;

export type InsightFilter = (typeof INSIGHT_CATEGORIES)[number];

export const INSIGHTS_PAGE = {
  documentTitle: `Insights | ${COMPANY.brandName}`,
  hero: {
    image: '/images/gallery/research-strategy-desk.jpg',
    line1: 'Clarity in',
    line2: 'complexity.',
    meta: ['RESEARCH /', 'MARKETS • ALLOCATION', 'WEALTH ARCHITECTURE'] as const,
    keywords: ['Allocation', 'Macro', 'Private markets'] as const,
    description: `Perspectives from ${COMPANY.brandName} on markets, allocation, and the architecture of enduring wealth — written for clients who prefer discipline over noise.`,
  },
  bridge: {
    statement:
      'Insight without a mandate is commentary. Insight with a mandate becomes counsel.',
  },
  cta: {
    line1: 'Want to discuss',
    line2: 'an idea',
    line3Outlined: 'with us',
    italicQuote: `Bring a market question, a portfolio concern, or a planning decision — the ${COMPANY.brandName} team will help you pressure-test it with the same discipline we use in advisory work.`,
    buttonText: 'Book Consultation',
    buttonLink: '/contact',
  },
} as const;

export const BLOG_PAGE = {
  documentTitle: `Blog | ${COMPANY.brandName}`,
  hero: {
    line1: 'Notes from',
    line2: 'the practice.',
    description:
      'Short, practical essays on multi-asset portfolios, tax-aware architecture, alternatives, and the behavioural discipline required to stay invested through cycles.',
  },
  readingPath: {
    eyebrow: 'Suggested path',
    heading: 'Start with behaviour, then allocation.',
    body: 'Most clients benefit from reading the drawdown note first — then the multi-asset outlook — before a planning conversation.',
    primaryId: 'drawdown-decisions',
    secondaryId: 'multi-asset-higher-for-longer',
  },
  cta: {
    line1: 'Ready to turn',
    line2: 'insight into',
    line3Outlined: 'action',
    italicQuote:
      'Schedule a consultation and translate these themes into a mandate that fits your liquidity, risk budget, and long-term objectives.',
    buttonText: 'Request Strategy Session',
    buttonLink: '/contact',
  },
} as const;

export const INSIGHT_THEMES: InsightTheme[] = [
  {
    id: 'theme-allocation',
    index: '01',
    theme: 'Allocation',
    headline:
      'How family offices and private clients are reshaping institutional-style allocations in India.',
    period: 'Ongoing theme',
    mandate: 'What we watch when constructing multi-asset mandates.',
    href: '/blog',
    cta: 'Read the notes',
    image: '/images/gallery/investor-conference.jpg',
  },
  {
    id: 'theme-macro',
    index: '02',
    theme: 'Macro',
    headline:
      'Monetary policy, yield moves, and what they imply for portfolio hedges across market cycles.',
    period: 'Research focus',
    mandate: 'Regime awareness before tactical allocation shifts.',
    href: '/approach',
    cta: 'See our approach',
    image: '/images/gallery/research-strategy-desk.jpg',
  },
  {
    id: 'theme-private-markets',
    index: '03',
    theme: 'Private markets',
    headline:
      'Private credit, structured debt, and succession planning for multi-generational wealth.',
    period: 'Advisory lens',
    mandate: 'Access with diligence — not allocation for its own sake.',
    href: '/solutions',
    cta: 'View solutions',
    image: '/images/gallery/client-fireside-forum.jpg',
  },
  {
    id: 'theme-behaviour',
    index: '04',
    theme: 'Behaviour',
    headline:
      'Removing emotion from drawdown decisions so capital can compound through volatility.',
    period: 'Practice discipline',
    mandate: 'Governance frameworks that keep clients invested with intent.',
    href: '/blog',
    cta: 'Open the archive',
    image: '/images/gallery/executive-client-meeting.jpg',
  },
];

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'multi-asset-higher-for-longer',
    category: 'Market Outlook',
    title: 'Navigating multi-asset portfolios in a higher-for-longer world',
    excerpt:
      'How disciplined rebalancing and quality bias can protect real purchasing power when rates stay elevated.',
    readTime: '6 min',
    image: '/images/gallery/quant-analytics-hub.jpg',
    href: '/contact',
  },
  {
    id: 'tax-aware-family-offices',
    category: 'Wealth Planning',
    title: 'Tax-aware architecture for family offices',
    excerpt:
      'Structuring liquidity, estate transfers, and investment vehicles without sacrificing long-term compounding.',
    readTime: '7 min',
    image: '/images/gallery/family-office-advisory.jpg',
    href: '/contact',
  },
  {
    id: 'private-credit-stabilizer',
    category: 'Alternatives',
    title: 'Private credit as a portfolio stabilizer',
    excerpt:
      'Where carefully underwritten private debt can complement public fixed income for sophisticated clients.',
    readTime: '5 min',
    image: '/images/gallery/wealth-headquarters.jpg',
    href: '/contact',
  },
  {
    id: 'drawdown-decisions',
    category: 'Behavioral Finance',
    title: 'Removing emotion from drawdown decisions',
    excerpt:
      'A framework for staying invested when volatility spikes—and when to deliberately redeploy cash.',
    readTime: '5 min',
    image: '/images/gallery/executive-client-meeting.jpg',
    href: '/contact',
  },
];

export function getArticleById(id: string): InsightArticle | undefined {
  return INSIGHT_ARTICLES.find((article) => article.id === id);
}

export function filterArticles(filter: InsightFilter): InsightArticle[] {
  if (filter === 'All') return INSIGHT_ARTICLES;
  return INSIGHT_ARTICLES.filter((article) => article.category === filter);
}
