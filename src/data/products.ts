import { COMPANY } from './company';
import { SOLUTION_PILLARS, getPillarPageHref } from './solutions-pillars';

export type ProductJourneyId = 'portfolio-management' | 'capital-strategy';

export type ProductGroupId = 'portfolios' | 'listed-markets' | 'advice';

export type ProductGroup = {
  id: ProductGroupId;
  title: string;
};

export const PRODUCT_GROUPS: readonly ProductGroup[] = [
  { id: 'portfolios', title: 'Portfolios' },
  { id: 'listed-markets', title: 'Listed markets' },
  { id: 'advice', title: 'Advice' },
];

export type ProductChild = {
  name: string;
  path: string;
};

export type ProductOffer = {
  id: string;
  path: string;
  /** Short label for menus. */
  navLabel: string;
  /** Visible product name and H1. */
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  opening: string;
  audience: string;
  features: string[];
  difference: string;
  journeyId: ProductJourneyId;
  group: ProductGroupId;
  /** When set, this offer is listed under that parent instead of as its own row. */
  parentId?: string;
  /** Copy source only. Omitted from menus, the catalogue, and related links. */
  unlisted?: boolean;
  /** Short eligibility or risk line shared by the hub and the product page. */
  eligibility: string;
  note?: string;
  /** Sequence shown on the product page when the offer needs a picture, not only a list. */
  diagram?: StrategyDiagram;
};

export type StrategyStep = {
  kicker: string;
  title: string;
};

export type StrategyDiagram = {
  kind: 'stack' | 'flow';
  steps: readonly StrategyStep[];
};

const brand = COMPANY.brandName;

export const PRODUCT_OFFERS: ProductOffer[] = [
  {
    id: 'mutual-funds',
    path: '/solutions/mutual-funds',
    navLabel: 'Mutual Funds',
    title: 'Mutual Funds',
    seoTitle: `Mutual Funds | ${brand}`,
    seoDescription: `Mutual fund selection from your goals, risk profile, time horizon, and ${brand}'s research view of the market. SIPs, lump sums, and reviews as conditions change.`,
    keywords: [
      'mutual funds Pune',
      'SIP investment',
      'goal based mutual funds',
      'mutual fund distributor',
      brand,
    ],
    opening:
      'We help investors select mutual funds based on their goals, risk profile, investment horizon and our research view of the market.',
    audience:
      'First-time investors as well as experienced investors looking to build long-term wealth.',
    features: [
      'Research-based fund selection',
      'SIP and lump-sum investments',
      'Diversification across asset classes and categories',
      'Portfolio review and monitoring',
      'Goal-based investing',
      'Regular review based on changing market conditions',
    ],
    difference:
      'We do not select funds only because they have delivered strong past returns. We study the fund, its portfolio, underlying sectors and companies, valuations and the market environment to understand its future potential.',
    journeyId: 'portfolio-management',
    group: 'portfolios',
    eligibility: 'Market risk. Regular plans.',
    note: `Mutual fund investments are subject to market risk. Read all scheme-related documents carefully. ${brand} distributes Regular plans as an AMFI-registered Mutual Fund Distributor (ARN-${COMPANY.amfiArn}). Direct plans have a lower expense ratio and are available from the AMC; we do not earn commission on Direct plans.`,
  },
  {
    id: 'pms-aif',
    path: '/solutions/pms-aif',
    navLabel: 'PMS/AIF',
    title: 'PMS and AIF',
    seoTitle: `Portfolio Management Services and Alternative Investment Funds | ${brand}`,
    seoDescription: `Two separate products. PMS is a more personalised portfolio for larger capital. An AIF is access to strategies beyond traditional mutual funds, for eligible investors.`,
    keywords: [
      'portfolio management services',
      'PMS India',
      'alternative investment funds',
      'AIF India',
      'PMS Pune',
      brand,
    ],
    opening:
      'Portfolio Management Services and Alternative Investment Funds are separate products. PMS is a professionally managed, more personalised portfolio. An AIF is access to professionally managed strategies beyond traditional mutual funds.',
    audience:
      'Investors with larger investible capital. PMS and AIF each have their own eligibility.',
    features: [],
    difference:
      'Each product is considered on its own research view. Eligibility for one does not qualify an investor for the other.',
    journeyId: 'portfolio-management',
    group: 'portfolios',
    eligibility: 'PMS generally ₹50 lakh. AIF generally ₹1 crore.',
  },
  {
    id: 'pms',
    path: '/solutions/pms',
    navLabel: 'PMS',
    unlisted: true,
    title: 'Portfolio Management Services',
    seoTitle: `Portfolio Management Services | ${brand}`,
    seoDescription: `A professionally managed, more personalised portfolio for investors with larger capital. ${brand} builds it from research and a market outlook, not from popular stocks.`,
    keywords: [
      'portfolio management services',
      'PMS India',
      'custom equity portfolio',
      'PMS Pune',
      brand,
    ],
    opening:
      'PMS provides investors with a professionally managed and more personalised investment portfolio.',
    audience:
      'Primarily investors with larger investible capital who want a customised portfolio and active management.',
    features: [
      'Customized portfolios',
      'Research-driven stock selection',
      'Active portfolio management',
      'Portfolio monitoring',
      'Risk management',
      'Regular performance and portfolio reviews',
    ],
    difference:
      'Our portfolios are built around our research and market outlook rather than simply following popular stocks or recent performers.',
    journeyId: 'portfolio-management',
    group: 'portfolios',
    eligibility: 'Generally ₹50 lakh',
    note: `PMS is offered only where you meet the product eligibility, including the SEBI minimum that generally applies (₹50 lakh). ${brand} is an APMI registrant (APRN ${COMPANY.apmiRegistrationNo}). Past performance is not a guide to future returns.`,
  },
  {
    id: 'aif',
    path: '/solutions/aif',
    navLabel: 'AIF',
    unlisted: true,
    title: 'Alternative Investment Funds',
    seoTitle: `Alternative Investment Funds | ${brand}`,
    seoDescription: `Access to professionally managed strategies beyond traditional mutual funds, for eligible investors with higher capital and a longer horizon.`,
    keywords: [
      'alternative investment funds',
      'AIF India',
      'AIF eligibility',
      'alternatives beyond mutual funds',
      brand,
    ],
    opening:
      'AIF solutions provide access to professionally managed investment strategies beyond traditional mutual funds.',
    audience:
      'Primarily sophisticated and eligible investors with higher investible capital and a longer investment horizon.',
    features: [
      'Access to alternative investment strategies',
      'Research-driven investment selection',
      'Professional portfolio management',
      'Diversification beyond traditional investment products',
      'Opportunities based on specific investment themes and strategies',
    ],
    difference:
      'We focus on understanding the investment opportunity, underlying assets, risks and potential future drivers before considering an investment.',
    journeyId: 'portfolio-management',
    group: 'portfolios',
    eligibility: 'Generally ₹1 crore',
    note: 'AIFs are offered only where you meet the product eligibility, including the SEBI minimum that generally applies (₹1 crore for most AIFs). They are a satellite in the plan, not a replacement for the core portfolio. Past performance is not a guide to future returns.',
  },
  {
    id: 'equity',
    path: '/solutions/equity',
    navLabel: 'Equity',
    title: 'Equity Investments',
    seoTitle: `Equity Investments | ${brand}`,
    seoDescription: `Direct equity investing supported by research and market insights. ${brand} looks for businesses and sectors where future growth, earnings and valuations may create an opportunity.`,
    keywords: [
      'direct equity investing',
      'equity research',
      'stock research Pune',
      'listed company investing',
      brand,
    ],
    opening:
      'We provide investors with access to direct equity investing supported by our research and market insights.',
    audience:
      'Investors who want to invest directly in listed companies and are comfortable with equity-market risk.',
    features: [
      'Research-backed stock ideas',
      'Fundamental analysis',
      'Sector analysis',
      'Valuation analysis',
      'Market and economic research',
      'Portfolio monitoring',
    ],
    difference:
      'We do not simply chase stocks that are already popular or have recently gone up. We look for businesses and sectors where future growth, earnings and valuations may create investment opportunities.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    eligibility: 'Listed-market risk',
    note: 'Investments in securities markets are subject to market risks. Read all related documents carefully before investing.',
  },
  {
    id: 'equity-baskets',
    path: '/solutions/equity-baskets',
    navLabel: 'Equity Baskets',
    title: 'Equity Baskets',
    seoTitle: `Equity Baskets | ${brand}`,
    seoDescription: `A group of stocks selected for one investment strategy or theme. Built from a research view, then reviewed to see whether the original thesis still holds.`,
    keywords: [
      'equity baskets',
      'stock basket strategy',
      'thematic equity portfolio',
      'direct equity basket',
      brand,
    ],
    opening:
      'Equity Baskets provide investors with a group of carefully selected stocks based on a particular investment strategy or theme.',
    audience:
      'Investors who want exposure to direct equities but prefer a structured portfolio rather than selecting individual stocks themselves.',
    features: [
      'Multiple stocks in one strategy',
      'Research-based stock selection',
      'Defined investment theme or strategy',
      'Diversification across selected companies',
      'Periodic review and rebalancing where applicable',
    ],
    difference:
      'Our baskets are built around a research view, not simply a collection of stocks that have performed well recently. We identify the underlying theme, select companies that can benefit from it and review whether the original investment thesis remains valid.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    parentId: 'equity',
    eligibility: 'Listed-market risk',
    note: 'Investments in securities markets are subject to market risks. Read all related documents carefully before investing.',
  },
  {
    id: 'options-baskets',
    path: '/solutions/options-baskets',
    navLabel: 'Options Baskets',
    title: 'Options Baskets',
    seoTitle: `Options Baskets | ${brand}`,
    seoDescription: `Structured options strategies for experienced investors, based on a market view and defined risk. ${brand} starts with the strategy and the risk, not with a trading call.`,
    keywords: [
      'options baskets',
      'options strategies',
      'derivatives risk',
      'options for experienced investors',
      brand,
    ],
    opening:
      'Options Baskets are structured strategies using options based on specific market views and defined risk parameters.',
    audience:
      'Experienced investors who understand derivatives and are comfortable with the higher risks associated with options.',
    features: [
      'Research-driven market strategies',
      'Defined strategy and investment approach',
      'Focus on risk management',
      'Strategies based on specific market conditions',
      'Active monitoring',
    ],
    difference:
      'We focus on the strategy and risk first, rather than simply providing options trading calls. Our research considers market direction, volatility, important levels and broader market conditions before developing a strategy.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    eligibility: 'Experienced investors',
    note: 'Options and other derivatives can lose more than a simple stock holding and are not suitable for every investor. This page does not describe a specific exchange membership or a strategy’s past results.',
  },
  {
    id: 'passive-income-strategy',
    path: '/solutions/passive-income-strategy',
    navLabel: 'Passive Income',
    title: 'Passive Income Strategy',
    seoTitle: `Passive Income Strategy | ${brand}`,
    seoDescription: `A NIFTY 50 systematic income strategy for HNI and UHNI investors who want regular cash-flow while keeping long-term equity exposure. ${brand} uses disciplined derivatives strategies, with a focus on capital efficiency, consistency, and downside management.`,
    keywords: [
      'passive income strategy',
      'HNI UHNI income strategy',
      'NIFTY 50 systematic income',
      'derivatives income strategy',
      brand,
    ],
    opening:
      'A NIFTY 50-based systematic income strategy for HNI and UHNI investors seeking regular cash-flow generation while maintaining long-term equity exposure.',
    audience:
      'HNI and UHNI investors who want regular cash-flow without leaving their long-term equity exposure.',
    features: [
      'NIFTY 50 exposure stays invested',
      'Additional income through disciplined derivatives strategies',
      'Capital efficiency',
      'Consistency of the income approach',
      'Downside management written into the strategy',
    ],
    difference:
      'The equity exposure is the core. Derivatives are used to generate additional income, not to replace the long-term holding.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    parentId: 'options-baskets',
    eligibility: 'HNI and UHNI investors who understand derivatives',
    note: 'Options and other derivatives can lose more than a simple stock holding and are not suitable for every investor. This page does not describe a specific exchange membership or a strategy’s past results.',
    diagram: {
      kind: 'stack',
      steps: [
        { kicker: 'Equity', title: 'NIFTY 50 exposure stays invested' },
        { kicker: 'Overlay', title: 'Disciplined derivatives strategies' },
        { kicker: 'Cash-flow', title: 'Income, with downside rules' },
      ],
    },
  },
  {
    id: 'nifty-50-hedging',
    path: '/solutions/nifty-50-hedging',
    navLabel: 'NIFTY 50 Hedging',
    title: 'NIFTY 50 Hedging Strategy',
    seoTitle: `NIFTY 50 Hedging Strategy | ${brand}`,
    seoDescription: `A systematic hedging framework that adjusts NIFTY 50 futures and options exposure when predefined risk and market conditions change. Built for investors who want the hedge written as rules.`,
    keywords: [
      'NIFTY 50 hedging strategy',
      'NIFTY 50 futures and options',
      'systematic hedging',
      'index hedge',
      brand,
    ],
    opening:
      'An adaptive hedging framework that dynamically adjusts NIFTY 50 futures and options exposure according to predefined risk and market conditions.',
    audience:
      'Investors who want a rules-based hedge around NIFTY 50 exposure, using futures and options.',
    features: [
      'NIFTY 50 futures and options',
      'Exposure adjusts when predefined risk conditions change',
      'Exposure adjusts when predefined market conditions change',
      'A systematic framework, not a one-off trade',
    ],
    difference:
      'The hedge is adaptive. Futures and options exposure changes only when the predefined risk and market conditions change.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    parentId: 'options-baskets',
    eligibility: 'Investors who understand NIFTY 50 futures and options',
    note: 'Options and other derivatives can lose more than a simple stock holding and are not suitable for every investor. This page does not describe a specific exchange membership or a strategy’s past results.',
    diagram: {
      kind: 'flow',
      steps: [
        { kicker: 'Condition', title: 'A predefined risk or market condition' },
        { kicker: 'Rule', title: 'The hedging rule for that condition' },
        { kicker: 'Exposure', title: 'NIFTY 50 futures and options are adjusted' },
      ],
    },
  },
  {
    id: 'investment-advisory',
    path: '/solutions/investment-advisory',
    navLabel: 'Investment Advisory',
    title: 'Investment Advisory',
    seoTitle: `Investment Advisory | ${brand}`,
    seoDescription: `An investment strategy built from your goals, risk profile and time horizon. For individuals, families, professionals, business owners and investors who want a structured plan.`,
    keywords: [
      'investment advisory Pune',
      'financial goal planning',
      'risk profiling',
      'asset allocation advice',
      brand,
    ],
    opening:
      'Our advisory service helps investors create an investment strategy based on their financial goals, risk profile and investment horizon.',
    audience:
      'Individuals, families, professionals, business owners and investors looking for a structured investment strategy.',
    features: [
      'Financial goal assessment',
      'Risk profiling',
      'Asset allocation',
      'Investment planning',
      'Product selection',
      'Portfolio review',
      'Market and investment insights',
    ],
    difference:
      'We start with the investor’s objective, not the product. The question is not simply “Which product should you buy?” but “What is the right investment strategy for you?”',
    journeyId: 'capital-strategy',
    group: 'advice',
    eligibility: 'The product comes after the plan.',
  },
];

export function getProductById(id: string): ProductOffer | undefined {
  return PRODUCT_OFFERS.find((product) => product.id === id);
}

export function getProductByPath(path: string): ProductOffer | undefined {
  return PRODUCT_OFFERS.find((product) => product.path === path);
}

export function getProductsForJourney(journeyId: ProductJourneyId): ProductOffer[] {
  return PRODUCT_OFFERS.filter((product) => product.journeyId === journeyId);
}

export function getProductsInGroup(groupId: ProductGroupId): ProductOffer[] {
  return PRODUCT_OFFERS.filter(
    (product) => product.group === groupId && !product.parentId && !product.unlisted,
  );
}

export function getTopLevelProducts(): ProductOffer[] {
  return PRODUCT_OFFERS.filter((product) => !product.parentId && !product.unlisted);
}

export function getProductChildren(id: string): ProductChild[] {
  if (id === 'investment-advisory') {
    return SOLUTION_PILLARS.map((pillar) => ({
      name: pillar.title,
      path: getPillarPageHref(pillar.id),
    }));
  }
  return PRODUCT_OFFERS.filter((product) => product.parentId === id && !product.unlisted).map((product) => ({
    name: product.navLabel,
    path: product.path,
  }));
}

export type ProductTreeNode = {
  product: ProductOffer;
  children: ProductChild[];
};

export function getOfferTree(): ProductTreeNode[] {
  return getTopLevelProducts().map((product) => ({
    product,
    children: getProductChildren(product.id),
  }));
}

export function getRelatedProducts(id: string, count = 3): ProductOffer[] {
  const current = PRODUCT_OFFERS.find((product) => product.id === id);
  if (!current) return [];
  const anchorId = current.parentId ?? current.id;
  const tops = getTopLevelProducts();
  const index = tops.findIndex((product) => product.id === anchorId);
  if (index < 0) return [];
  const related: ProductOffer[] = [];
  for (let step = 1; related.length < count && step < tops.length; step += 1) {
    related.push(tops[(index + step) % tops.length]);
  }
  return related;
}
