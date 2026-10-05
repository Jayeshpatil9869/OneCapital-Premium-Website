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
    seoDescription: `Research-based mutual fund selection in ${COMPANY.hqCity}: SIPs, lumpsums, and goal-based portfolios. ${brand} studies the fund and the market, not past returns alone.`,
    keywords: [
      'mutual funds Pune',
      'SIP investment',
      'goal based mutual funds',
      'mutual fund distributor',
      brand,
    ],
    opening:
      'We help investors choose mutual funds from their goals, risk profile, time horizon, and our research view of the market.',
    audience:
      'First-time investors, and experienced investors who want to build wealth over years rather than chase last year’s ranking.',
    features: [
      'Research-based fund selection',
      'SIP and lump-sum investments',
      'Diversification across asset classes and categories',
      'Portfolio review and monitoring',
      'Goal-based investing',
      'Reviews when market conditions change',
    ],
    difference:
      'A fund is not chosen because it has already done well. We look at the portfolio, the sectors and companies underneath it, valuations, and the market environment, and ask what that implies from here.',
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
    seoDescription: `PMS for investors with larger capital who want a custom, actively managed portfolio. ${brand} builds it from research and a market view, not from popular stocks.`,
    keywords: [
      'portfolio management services',
      'PMS India',
      'custom equity portfolio',
      'PMS Pune',
      brand,
    ],
    opening:
      'Portfolio Management Services is a professionally managed portfolio, shaped more closely to one investor than a mutual fund can be.',
    audience:
      'Investors with larger investible capital who want a customised portfolio and active management. Under SEBI rules the minimum is generally ₹50 lakh.',
    features: [
      'Customized portfolios',
      'Research-driven stock selection',
      'Active portfolio management',
      'Portfolio monitoring',
      'Risk management',
      'Regular performance and portfolio reviews',
    ],
    difference:
      'The portfolio follows our research and market outlook. It is not a list of stocks that are already popular or that have just run up.',
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
    seoDescription: `AIF access for eligible investors who want strategies beyond mutual funds. ${brand} looks at the opportunity, the assets, and the risks before considering an investment.`,
    keywords: [
      'alternative investment funds',
      'AIF India',
      'AIF eligibility',
      'alternatives beyond mutual funds',
      brand,
    ],
    opening:
      'Alternative Investment Funds give eligible investors access to professionally managed strategies beyond traditional mutual funds.',
    audience:
      'Sophisticated and eligible investors with higher investible capital and a longer horizon. Most AIFs ask for ₹1 crore and lock capital for years.',
    features: [
      'Access to alternative investment strategies',
      'Research-driven selection',
      'Professional portfolio management',
      'Diversification beyond traditional products',
      'Opportunities tied to a specific theme or strategy',
    ],
    difference:
      'We start with the opportunity, the underlying assets, the risks, and what could drive the result. The fund name comes after that work, not before it.',
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
    seoDescription: `Direct equity investing backed by fundamental, sector, and valuation research. ${brand} looks for businesses where future earnings may create an opportunity.`,
    keywords: [
      'direct equity investing',
      'equity research',
      'stock research Pune',
      'listed company investing',
      brand,
    ],
    opening:
      'Direct equity gives investors listed companies, with research and a market view behind the idea rather than a tip.',
    audience:
      'Investors who want to own listed companies directly and are comfortable with equity-market risk.',
    features: [
      'Research-backed stock ideas',
      'Fundamental analysis',
      'Sector analysis',
      'Valuation analysis',
      'Market and economic research',
      'Portfolio monitoring',
    ],
    difference:
      'We do not chase a stock because it is popular or because it has already risen. We look for businesses and sectors where future growth, earnings, and valuations may create an opportunity.',
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
    seoDescription: `A researched group of stocks around one theme or strategy, reviewed as the thesis changes. For investors who want equities without picking every name alone.`,
    keywords: [
      'equity baskets',
      'stock basket strategy',
      'thematic equity portfolio',
      'direct equity basket',
      brand,
    ],
    opening:
      'An equity basket is a group of stocks chosen for one investment strategy or theme, held as a structured portfolio rather than a pile of unrelated names.',
    audience:
      'Investors who want direct equities but prefer a structured portfolio to selecting every stock themselves.',
    features: [
      'Several stocks inside one strategy',
      'Research-based selection',
      'A defined theme or strategy',
      'Diversification across the chosen companies',
      'Periodic review and rebalancing where it applies',
    ],
    difference:
      'The basket starts from a research view, not from stocks that have just performed well. We name the theme, choose companies that can benefit from it, and check whether that thesis still holds.',
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
    seoDescription: `Options strategies for experienced investors, built from a market view and defined risk. ${brand} starts with the strategy and the risk, not with a trading call.`,
    keywords: [
      'options baskets',
      'options strategies',
      'derivatives risk',
      'options for experienced investors',
      brand,
    ],
    opening:
      'Options baskets are structured strategies that use options around a specific market view and a defined set of risks.',
    audience:
      'Experienced investors who understand derivatives and are comfortable with the higher risks that come with options.',
    features: [
      'Research-driven market strategies',
      'A defined strategy and approach',
      'Risk set before the trade',
      'Strategies tied to specific market conditions',
      'Active monitoring',
    ],
    difference:
      'The work starts with the strategy and the risk, not with an options call. Research covers direction, volatility, important levels, and the wider market before a strategy is built.',
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
    seoDescription: `Equity market access for buying and selling securities, with research and portfolio support alongside execution. For retail, active, and long-term investors.`,
    keywords: [
      'equity broking',
      'stock market access',
      'equity trading support',
      'research backed broking',
      brand,
    ],
    opening:
      'Equity broking is access to the market for buying and selling securities, with research and portfolio support sitting next to the order.',
    audience: 'Retail investors, active investors, and long-term equity investors.',
    features: [
      'Equity market access',
      'Investment and trading support',
      'Research insights',
      'Market updates',
      'Portfolio support',
    ],
    difference:
      'Execution is not the whole offer. Research sits beside market access, so an order can be tied to an investment view rather than to the screen alone.',
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
    seoDescription: `Market access for individual investors, with research that explains the opportunity behind a decision. For first-time, salaried, active, and long-term investors.`,
    keywords: [
      'retail broking',
      'individual investor broking',
      'first time stock investor',
      'retail equity access',
      brand,
    ],
    opening:
      'Retail broking is market access for an individual investor, with investment support and research written for that person rather than for a trading desk.',
    audience:
      'Individual investors, salaried professionals, first-time investors, active investors, and long-term equity investors.',
    features: [
      'Market access for an individual account',
      'Support while an investment is being considered',
      'Research that explains the opportunity',
      'A path from a first investment to a longer holding',
    ],
    difference:
      'The aim is more than getting an order done. Research and market context are there so the investor can see the opportunity behind the decision.',
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
    seoDescription: `Investment advice that starts with your goals, risk, and time horizon, then chooses the strategy. For individuals, families, professionals, and business owners in ${COMPANY.hqCity}.`,
    keywords: [
      'investment advisory Pune',
      'financial goal planning',
      'risk profiling',
      'asset allocation advice',
      brand,
    ],
    opening:
      'Advisory builds an investment strategy from your goals, your risk, and how long the money can stay invested. The product is chosen after that, not before.',
    audience:
      'Individuals, families, professionals, business owners, and anyone who wants a structured investment strategy rather than a product list.',
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
      'We start with the investor, not with a product looking for a buyer. The question is what strategy fits you, not which product should be sold.',
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
