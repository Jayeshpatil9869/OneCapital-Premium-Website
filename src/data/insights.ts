import { COMPANY } from '@/src/data/company';
import { BLOG_POSTS, type BlogCategory } from '@/src/data/blog-posts';

export type InsightCategory = BlogCategory;

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
      'Plain answers to the questions clients actually ask: what a PMS is, how it differs from a mutual fund, and where a fixed deposit still belongs.',
  },
  readingPath: {
    eyebrow: 'Suggested path',
    heading: 'Start with the product, then the comparison.',
    body: 'Read what a PMS and an AIF actually are. Then read whether a PMS belongs beside the mutual funds you already hold.',
    primaryId: 'what-are-aif-and-pms',
    secondaryId: 'is-pms-better-than-mutual-funds',
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

export const INSIGHT_ARTICLES: InsightArticle[] = BLOG_POSTS.map((post) => ({
  id: post.id,
  category: post.category,
  title: post.title,
  excerpt: post.excerpt,
  readTime: post.readTime,
  image: post.image,
  href: post.href,
}));

export function getArticleById(id: string): InsightArticle | undefined {
  return INSIGHT_ARTICLES.find((article) => article.id === id);
}

export function filterArticles(filter: InsightFilter): InsightArticle[] {
  if (filter === 'All') return INSIGHT_ARTICLES;
  return INSIGHT_ARTICLES.filter((article) => article.category === filter);
}
