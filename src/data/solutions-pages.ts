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
    description: `${COMPANY.brandName} in ${COMPANY.hqCity} explains the work in four pages, then the products: mutual funds, PMS, AIF, equity, baskets, broking, and investment advisory. Research first, then the strategy.`,
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
    statement: 'Four services. One wealth relationship.',
    body: 'Capital Strategy is the financial plan. Portfolio Management is where the money is invested. Risk & Wealth Architecture covers risk, cash, tax, and succession. Intelligence & Oversight is the portfolio review that tells you what to keep and what to change.',
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
    id: 'risk-wealth-architecture',
    visual: 'risk-map',
    headline: 'Risk, cash, tax, and succession.',
    statement:
      'An emergency reserve, a risk profile you can live with, tax-aware holding periods, and nominations that are actually up to date.',
    flowSteps: ['Risk', 'Cash', 'Tax', 'Nominations'],
  },
  {
    id: 'intelligence-oversight',
    visual: 'intelligence-pipeline',
    headline: 'A portfolio review you can use.',
    statement:
      'We look at allocation, fund overlap, costs, and manager changes, then tell you what to keep, what to switch, and what to leave alone.',
    flowSteps: ['Review', 'Diligence', 'Report', 'Decide'],
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
      headline: 'A plan before you invest.',
      subheadline:
        'Goal-based financial planning for retirement, education, a home, and the business. The products come after the plan.',
      imagePosition: 'center 40%',
    },
    intro: {
      statement: 'Tell us what the money has to do. Then we choose how it is invested.',
      body: `Capital Strategy is the planning meeting families and business owners in ${COMPANY.hqCity} and across Maharashtra use before they buy a fund. We write the goals, the monthly surplus, the loans, and the date each goal is due. That page decides the mix of equity, debt, and cash.`,
    },
    theme: 'direction',
    visual: 'capital-flow',
    sections: [
      {
        id: 'strategic-framework',
        title: 'Goals we plan for',
        body: 'Most plans cover the same jobs of money: an emergency reserve, a home, education for children, retirement income, and liquidity for a business. Each goal gets an amount, a date, and a priority. A goal due in three years is not funded the same way as a goal due in twenty.',
        points: [
          'Written goals, with dates and amounts',
          'Retirement',
          'Education',
          'Home',
          'Business liquidity',
        ],
      },
      {
        id: 'who-its-for',
        title: 'Who this is for',
        body: 'Salaried professionals building a first serious portfolio. Founders and CXOs with ESOPs or a coming liquidity event. Family businesses that need personal wealth kept separate from the company. If you already invest but cannot say which fund pays for which goal, start here.',
        points: [
          'A plan for the person, not a model portfolio',
          'Professionals',
          'Business owners',
          'Families',
        ],
      },
      {
        id: 'capital-allocation',
        title: 'Asset allocation',
        body: 'We set a range for equity, debt, hybrid funds, and cash. Long-horizon goals can hold equity through a fall. Money you need within three years stays in debt and liquid funds. Gold and alternatives are added only when they improve the plan, and only in a size you can leave untouched.',
        points: [
          'A mix you can hold in a bad year',
          'Equity for long goals',
          'Debt for near goals',
          'Cash reserve',
        ],
      },
      {
        id: 'opportunity-mapping',
        title: 'Which product fits the goal',
        body: 'A monthly surplus usually starts as a SIP in equity, debt, or hybrid mutual funds. A bonus can be a lumpsum, paced over a few months. ELSS is considered when Section 80C still has room. PMS and AIFs are discussed only after the core plan is funded and you meet the minimum and the lock-in.',
        points: [
          'Category first, scheme second',
          'SIP',
          'Lumpsum',
          'ELSS',
          'PMS and AIF',
        ],
      },
      {
        id: 'decision-framework',
        title: 'How a planning engagement works',
        body: 'We start with a conversation on income, existing folios, loans, and goals. You share statements. We return a written allocation and a short list of product types. Implementation sits on the Portfolio Management page. The plan is revisited once a year, and sooner if you change jobs, sell a business, or a goal date moves.',
        points: [
          'Conversation, written plan, then investing',
          'Discovery',
          'Existing holdings',
          'Written allocation',
          'Annual review',
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
      headline: 'Mutual funds, PMS, and more.',
      subheadline:
        'SIPs, lumpsums, equity and debt funds, and PMS or AIFs when the amount and the lock-in are right for you.',
      imagePosition: 'center',
    },
    intro: {
      statement: 'The plan names the category. This page is where the money is invested.',
      body: 'Portfolio Management puts the Capital Strategy to work. For most families that means mutual funds: equity for long goals, debt for near goals, hybrid where you want both. PMS and alternatives are added only after suitability, minimum investment, and liquidity are clear.',
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
      headline: 'Risk, tax, and what you keep.',
      subheadline:
        'A risk profile, an emergency reserve, tax-aware holding periods, and nominations that match your wishes.',
      imagePosition: 'center 35%',
    },
    intro: {
      statement: 'A good year does not fix a portfolio you cannot hold, or a folio with no nominee.',
      body: 'This is the part of wealth management that sits beside the funds: how much risk you can live with, where the next year’s cash comes from, how tax changes what you keep, and who receives the accounts if you are not here to sign.',
    },
    theme: 'structure',
    visual: 'risk-map',
    sections: [
      {
        id: 'risk-profile',
        title: 'Risk profiling',
        body: 'We separate ability from willingness. Ability is income stability, dependents, EMIs, and how soon you need the money. Willingness is how you actually behave when equity falls. A portfolio that looks right on paper and gets sold in a panic has failed. The profile sets a ceiling on equity, concentration, and alternatives.',
        points: [
          'A risk level you can stay invested through',
          'Income and loans',
          'Time horizon',
          'Behaviour in a fall',
        ],
      },
      {
        id: 'concentration',
        title: 'Concentration',
        body: 'Wealth often piles up in one place: the family company, employer stock, one sector fund, or one AMC. We map that exposure next to the mutual fund portfolio so the investments do not double a risk you already carry. A founder’s personal portfolio should not be a second copy of the business.',
        points: [
          'See the risk you already own',
          'Business equity',
          'Employer stock',
          'Single fund or sector',
        ],
      },
      {
        id: 'liquidity',
        title: 'Emergency fund and liquidity',
        body: 'Spending for the next several months, and a reserve for a medical bill or a slow business quarter, stays in the bank or in liquid and short-duration funds. Equity SIPs continue. They are not redeemed to pay a bill that was predictable. Near-term goals get their own bucket so a market fall does not delay a fee or a down payment.',
        points: [
          'Cash for what is already dated',
          'Emergency reserve',
          'Liquid and short-duration funds',
          'Separate goal buckets',
        ],
      },
      {
        id: 'tax',
        title: 'Tax-aware investing',
        body: 'ELSS can still be useful inside the Section 80C limit, with its three-year lock-in. Equity and debt funds are taxed differently, and the holding period changes the rate. We avoid switches that create tax without improving the portfolio, and we coordinate with your chartered accountant. We do not file returns, and we do not let a tax saving override a bad fit.',
        points: [
          'Keep more of the return, legally',
          'ELSS and Section 80C',
          'Holding period',
          'Coordination with your CA',
        ],
      },
      {
        id: 'legacy',
        title: 'Nominations and succession',
        body: 'We check nominations on mutual fund folios and demat accounts, and we talk through who should receive what. Wills, trusts, and family arrangements are handled with your lawyer. Our role is to make sure the investment accounts are not the gap in an otherwise careful plan.',
        points: [
          'Accounts that can transfer cleanly',
          'Folio nominations',
          'Demat nominations',
          'Coordination with your lawyer',
        ],
      },
    ],
    cta: {
      line1: 'Ready to stress-test',
      line2: 'the plan',
      outlined: 'properly',
      quote:
        'Sit with us on risk, cash needs, tax, and whether your nominations still match the family.',
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
      headline: 'A review of what you already own.',
      subheadline:
        'Allocation, overlap, fund quality, and costs, pulled into one view so the next decision is obvious.',
      imagePosition: 'center',
    },
    intro: {
      statement: 'Most portfolios do not need more products. They need a clear look at the ones already there.',
      body: `Intelligence & Oversight is the portfolio review. We read your folios the way a serious advisor should: against your plan, against overlap, and against whether each fund still deserves its place. You leave with a keep, switch, or wait list. Not a new pitch.`,
    },
    theme: 'intelligence',
    visual: 'intelligence-pipeline',
    sections: [
      {
        id: 'portfolio-review',
        title: 'What a portfolio review covers',
        body: 'We compare your current mix with the allocation in your plan. We count how many equity funds are doing the same job. We check debt funds against the dates you need cash. We note SIPs that have stopped, folios you forgot, and any holding that has become a large share of the total. The output is a short written note, not a hundred-page report.',
        points: [
          'A keep, switch, or wait decision',
          'Allocation versus plan',
          'Fund overlap',
          'Stopped SIPs',
          'Forgotten folios',
        ],
      },
      {
        id: 'fund-diligence',
        title: 'Fund and manager diligence',
        body: 'A familiar brand is not a reason to stay. We look at whether the fund still follows the process you bought, whether the manager has changed, how it behaved in a falling market, and whether the cost is fair for that job. The same questions apply to a PMS strategy or an AIF: people, process, fees, liquidity, and fit with the rest of the portfolio.',
        points: [
          'Process over brand',
          'Manager change',
          'Down-market behaviour',
          'Cost',
          'PMS and AIF fit',
        ],
      },
      {
        id: 'reporting',
        title: 'One view across accounts',
        body: 'Investments often sit in more than one app, a bank, an old advisor, and a demat account. We bring equity, debt, hybrid, PMS, and alternatives into a single allocation so you can see the real risk. Consolidated account statements from the depositories are the starting point. The review meeting is where that statement becomes a decision.',
        points: [
          'Every folio in one conversation',
          'CAS and statements',
          'Equity, debt, alternatives',
          'Multiple apps and advisors',
        ],
      },
      {
        id: 'when-we-act',
        title: 'When we suggest a change',
        body: 'We suggest a switch when the fund has drifted, the manager story has broken, the cost no longer makes sense, or your goal date has moved. We suggest doing nothing when the only news is a bad quarter. New money follows the same rule: fill the underweight part of the plan before adding a new idea.',
        points: [
          'Change for a reason you can repeat',
          'Style drift',
          'Broken process',
          'Goal date moved',
          'Leave a bad quarter alone',
        ],
      },
    ],
    cta: {
      line1: 'Ready for a',
      line2: 'straight review',
      outlined: 'of the portfolio',
      quote:
        'Bring your folios. We will tell you what is working, what overlaps, and what should change.',
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
