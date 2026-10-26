import { COMPANY } from './company';
import { SOLUTION_PILLARS, getPillarPageHref } from './solutions-pillars';

export type ProductJourneyId = 'portfolio-management' | 'capital-strategy' | 'wealth-management';

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
  /** Visible product name in menus, breadcrumbs, and related rows. */
  title: string;
  /** Page heading when it is shorter than the product name. */
  headline?: string;
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
    seoTitle: `Mutual Fund Investment & Advisory Services | ${brand}`,
    seoDescription:
      'Explore mutual funds with One Capital. Get personalised guidance on SIPs, equity, debt and hybrid funds, risk suitability and portfolio reviews.',
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
    seoTitle: `PMS & AIF Investment Advisory | ${brand}`,
    seoDescription:
      'Understand PMS and Alternative Investment Funds with One Capital. Explore ownership, minimum investments, risks, liquidity and suitability.',
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
    navLabel: 'Direct Equity',
    title: 'Direct Equity',
    headline: 'Equity',
    seoTitle: `Direct Equity Investment Advisory | ${brand}`,
    seoDescription:
      'Explore direct equity investing with One Capital. Understand business fundamentals, portfolio concentration, valuations and investment risks.',
    keywords: [
      'direct equity investing',
      'equity research',
      'stock research Pune',
      'listed company investing',
      brand,
    ],
    opening:
      'Invest in listed businesses with a considered approach to research, risk and your long-term financial goals',
    audience:
      'For investors who understand equity volatility and can remain invested through market cycles.',
    features: [
      'Business-led research',
      'Risk and fit assessment',
      'Valuation perspective',
      'Portfolio concentration',
      'Transparent discussions',
      'Periodic equity reviews',
    ],
    difference:
      'Investing in businesses starts with understanding them. Explore direct equity with thoughtful guidance, clear risk awareness and decisions shaped around your goals.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    eligibility: 'Risk review first',
    note: 'Equity investments carry market and company-specific risks, including possible loss of capital.',
  },
  {
    id: 'equity-baskets',
    path: '/solutions/equity-baskets',
    navLabel: 'Equity Baskets',
    title: 'Equity Baskets',
    headline: 'Baskets',
    seoTitle: `Equity Baskets & Stock Advisory | ${brand}`,
    seoDescription:
      'Explore equity baskets with One Capital. Discover research-led stock selection, risk assessment, portfolio suitability and personalised investment guidance.',
    keywords: [
      'equity baskets',
      'stock basket strategy',
      'thematic equity portfolio',
      'direct equity basket',
      brand,
    ],
    opening:
      'Explore curated groups of listed stocks with research-led guidance aligned to your goals and risk profiles.',
    audience:
      'For investors comfortable with stock market volatility who want to consider a group of equities as part of a diversified portfolio.',
    features: [
      'Theme-based stock selection',
      'Research-led stock review',
      'Risk and suitability checks',
      'Concentration awareness',
      'Periodic basket assessments',
    ],
    difference:
      'A thoughtful basket begins with a clear purpose. Explore collections of listed companies through research, measured risk assessment and guidance that respects your financial goals.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    parentId: 'equity',
    eligibility: 'Risk review first',
    note: 'Equity baskets carry market and stock-specific risks, including potential loss of capital.',
  },
  {
    id: 'options-baskets',
    path: '/solutions/options-baskets',
    navLabel: 'Options Baskets',
    title: 'Options Baskets',
    headline: 'Options',
    seoTitle: `Options Baskets & Derivatives Advisory | ${brand}`,
    seoDescription:
      'Explore options basket strategies with One Capital. Understand derivatives risks, margin exposure, strategy suitability and investment considerations.',
    keywords: [
      'options baskets',
      'options strategies',
      'derivatives risk',
      'options for experienced investors',
      brand,
    ],
    opening:
      'Explore options baskets with risk-aware guidance, clear strategy terms and suitability checks.',
    audience:
      'For experienced investors aware of derivatives risks, margin calls and the possibility of loss.',
    features: [
      'Strategy risk assessment',
      'Defined payoff analysis',
      'Margin and exposure review',
      'Expiry and liquidity checks',
      'Ongoing position reviews',
    ],
    difference:
      'Understand the strategy before taking a position. Explore options baskets through risk discussions, suitability checks and a disciplined view of potential losses.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    eligibility: 'Risk first',
    note: 'Options carry high risk. Buyers may lose the full premium; certain sellers face losses beyond margin posted. Leverage, volatility and low liquidity may amplify losses.',
  },
  {
    id: 'passive-income-strategy',
    path: '/solutions/passive-income-strategy',
    navLabel: 'Passive Income',
    title: 'Passive Income Strategy',
    headline: 'Passive Income',
    seoTitle: `Passive Income Strategy & Financial Planning | ${brand}`,
    seoDescription:
      'Explore passive income planning with One Capital. Understand investment cash flows, income sources, liquidity needs and associated risks.',
    keywords: [
      'passive income strategy',
      'HNI UHNI income strategy',
      'NIFTY 50 systematic income',
      'derivatives income strategy',
      brand,
    ],
    opening:
      'Plan for potential investment cash flows with thoughtful guidance on income sources, liquidity, risk and your changing financial needs.',
    audience:
      'For investors seeking potential periodic cash flows while recognising income and capital risks.',
    features: [
      'Goal-based cash flow planning',
      'Income source suitability review',
      'Credit and liquidity risk checks',
      'Tax-aware income considerations',
      'Periodic income plan reviews',
    ],
    difference:
      'Plan income around your life, with clear attention to changing needs, investment risks and cash flows.',
    journeyId: 'wealth-management',
    group: 'listed-markets',
    parentId: 'options-baskets',
    eligibility: 'Based on goals, risk profile and cash needs',
    note: 'Investment income is not assured. Payouts and capital values may change; credit, market, liquidity and tax risks vary. Past payouts do not predict future income.',
    diagram: {
      kind: 'stack',
      steps: [
        { kicker: 'GOALS', title: 'Understand Your Income Needs' },
        { kicker: 'BUILD', title: 'Consider Suitable Income Sources' },
        { kicker: 'CHECK', title: 'Review Cash Flows and Risks' },
      ],
    },
  },
  {
    id: 'nifty-50-hedging',
    path: '/solutions/nifty-50-hedging',
    navLabel: 'NIFTY 50 Hedging',
    title: 'NIFTY 50 Hedging Strategy',
    headline: 'NIFTY 50 Hedge Strategy',
    seoTitle: `NIFTY 50 Hedging Strategy | ${brand}`,
    seoDescription:
      'Understand NIFTY 50 hedging with One Capital. Explore index exposure, derivatives risks, hedge costs and suitability with personalised guidance.',
    keywords: [
      'NIFTY 50 hedging strategy',
      'NIFTY 50 futures and options',
      'systematic hedging',
      'index hedge',
      brand,
    ],
    opening:
      'Explore NIFTY 50 hedging to manage equity market exposure, with clear costs, trade-offs and risk-aware guidance.',
    audience:
      'For experienced equity investors evaluating index hedges, costs and residual risks.',
    features: [
      'Assessment of equity and index exposure',
      'Discussion of hedge costs and limitations',
      'Review of margin and liquidity needs',
      'Monitoring of hedge fit and changing risks',
    ],
    difference:
      'A hedge is a risk decision, not a return promise. Understand the costs, limits and trade-offs first.',
    journeyId: 'portfolio-management',
    group: 'listed-markets',
    parentId: 'options-baskets',
    eligibility: 'Subject to risk and derivatives suitability',
    note: 'Derivatives are high risk. Hedges can fail or cost money. Options may expire worthless; futures can trigger margin calls and losses beyond initial funds.',
    diagram: {
      kind: 'flow',
      steps: [
        { kicker: 'CHECK', title: 'Review Your Portfolio Exposure' },
        { kicker: 'MATCH', title: 'Assess Suitable Hedge Instruments' },
        { kicker: 'TRACK', title: 'Monitor Hedge Costs and Effectiveness' },
      ],
    },
  },
  {
    id: 'investment-advisory',
    path: '/solutions/investment-advisory',
    navLabel: 'Investment Advisory',
    title: 'Investment Advisory',
    headline: 'Investment',
    seoTitle: `Investment Advisory Services | ${brand}`,
    seoDescription:
      'Explore personalised investment advisory services with One Capital. Get research-informed guidance on financial goals, risk assessment and portfolio planning.',
    keywords: [
      'investment advisory Pune',
      'financial goal planning',
      'risk profiling',
      'asset allocation advice',
      brand,
    ],
    opening:
      'Personalised investment guidance shaped by your goals, risk profile and the decisions that matter to you.',
    audience:
      'For people seeking considered investment advice aligned with their goals and risks.',
    features: [
      'Goal-led guidance',
      'Research review',
      'Risk assessment',
      'Portfolio reviews',
      'Asset allocation',
      'Clear fee terms',
      'Periodic guidance',
    ],
    difference:
      'Advice built around your life, not market noise. Understand your options, assess the risks and make investment decisions with greater clarity.',
    journeyId: 'capital-strategy',
    group: 'advice',
    eligibility: 'Risk and suitability assessment',
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
