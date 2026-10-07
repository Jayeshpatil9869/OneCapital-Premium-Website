import { COMPANY } from './company';

export type ProductJourneyId = 'portfolio-management' | 'capital-strategy';

export type ProductGroupId = 'portfolios' | 'listed-markets' | 'broking' | 'advice';

export type ProductGroup = {
  id: ProductGroupId;
  title: string;
};

export const PRODUCT_GROUPS: readonly ProductGroup[] = [
  { id: 'portfolios', title: 'Portfolios' },
  { id: 'listed-markets', title: 'Listed markets' },
  { id: 'broking', title: 'Broking' },
  { id: 'advice', title: 'Advice' },
];

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
  /** Short eligibility or risk line shared by the hub and the product page. */
  eligibility: string;
  note?: string;
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
    id: 'pms',
    path: '/solutions/pms',
    navLabel: 'PMS',
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
    id: 'equity-broking',
    path: '/solutions/equity-broking',
    navLabel: 'Equity Broking',
    title: 'Equity Broking',
    seoTitle: `Equity Broking | ${brand}`,
    seoDescription: `Access to equity markets for buying and selling securities, with research insights, market updates and portfolio support for retail, active and long-term investors.`,
    keywords: [
      'equity broking',
      'stock market access',
      'equity trading support',
      'research backed broking',
      brand,
    ],
    opening:
      'We provide investors with access to equity markets for buying and selling securities.',
    audience: 'Retail investors, active investors and long-term equity investors.',
    features: [
      'Equity market access',
      'Investment and trading support',
      'Research insights',
      'Market updates',
      'Portfolio support',
    ],
    difference:
      'Our broking offering is supported by our research capabilities, allowing investors to combine market access with informed investment insights.',
    journeyId: 'portfolio-management',
    group: 'broking',
    eligibility: 'Listed-market risk',
    note: 'Broking is offered only within the registrations that actually apply to the account. This page does not state a membership number. Investments in securities markets are subject to market risks.',
  },
  {
    id: 'retail-broking',
    path: '/solutions/retail-broking',
    navLabel: 'Retail Broking',
    title: 'Retail Broking',
    seoTitle: `Retail Broking | ${brand}`,
    seoDescription: `Market access for individual investors, with investment support and research insights behind the decision. For salaried, first-time, active and long-term investors.`,
    keywords: [
      'retail broking',
      'individual investor broking',
      'first time stock investor',
      'retail equity access',
      brand,
    ],
    opening:
      'Retail Broking provides individual investors with access to financial markets along with investment support and research insights.',
    audience:
      'Individual investors, salaried professionals, first-time investors, active investors and long-term equity investors.',
    features: [
      'Access to financial markets',
      'Investment support',
      'Research insights',
    ],
    difference:
      'We aim to provide more than just execution. Our research and market insights help investors understand the opportunity behind an investment decision.',
    journeyId: 'portfolio-management',
    group: 'broking',
    eligibility: 'Listed-market risk',
    note: 'Broking is offered only within the registrations that actually apply to the account. This page does not state a membership number. Investments in securities markets are subject to market risks.',
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
  return PRODUCT_OFFERS.filter((product) => product.group === groupId);
}

export function getRelatedProducts(id: string, count = 3): ProductOffer[] {
  const index = PRODUCT_OFFERS.findIndex((product) => product.id === id);
  if (index < 0) return [];
  const related: ProductOffer[] = [];
  for (let step = 1; related.length < count && step < PRODUCT_OFFERS.length; step += 1) {
    related.push(PRODUCT_OFFERS[(index + step) % PRODUCT_OFFERS.length]);
  }
  return related;
}
