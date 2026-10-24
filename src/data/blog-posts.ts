import { COMPANY } from '@/src/data/company';

export type BlogCategory =
  | 'Market Outlook'
  | 'Wealth Planning'
  | 'Alternatives'
  | 'Behavioral Finance';

export type BlogBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'note'; text: string };

export type BlogLink = {
  href: string;
  label: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  category: BlogCategory;
  title: string;
  /** Short label in the breadcrumb. The page title is the H1. */
  crumb: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  excerpt: string;
  readTime: string;
  published: string;
  image: string;
  href: string;
  related: string[];
  further: BlogLink[];
  blocks: BlogBlock[];
};

export const BLOG_DISCLAIMER = `This note is general education from ${COMPANY.legalName}. It is not investment advice, a research report, or an offer to buy any scheme, PMS, or AIF. Mutual funds, portfolio products, bonds, and deposits can fall in value, and an issuer can fail to pay. The figures in any illustration are arithmetic at a stated rate. They are not a forecast and not the past return of a scheme we recommend. Tax rules, including the rates referred to for FY 2026–27, can change, and surcharge and cess can apply on top. Confirm the current position with a chartered accountant before you act. ${COMPANY.brandName} is an AMFI-registered mutual fund distributor (ARN-${COMPANY.amfiArn}, valid to ${COMPANY.amfiValidity}) and an APMI member (${COMPANY.apmiRegistrationNo}, valid to ${COMPANY.apmiValidity}). On regular mutual fund plans, the distributor is paid by the fund house out of the scheme’s expenses. Direct plans have a lower expense ratio and can be bought from the fund house. We do not earn that commission on direct plans.`;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'what-are-aif-and-pms',
    slug: 'what-are-aif-and-pms',
    category: 'Alternatives',
    title: 'What are AIF and PMS?',
    crumb: 'AIF and PMS',
    seoTitle: 'What Are AIF and PMS? Plain-English Guide | One Capital',
    seoDescription:
      'A PMS holds securities in your own demat account, usually from ₹50 lakh. An AIF is a private pooled fund, usually from ₹1 crore. Here is how they differ.',
    keywords: [
      'what is AIF',
      'what is PMS',
      'PMS vs AIF',
      'alternative investment fund India',
      'portfolio management service minimum',
    ],
    excerpt:
      'A PMS keeps the securities in your demat. An AIF gives you units in a private fund. The minimum, the lock-in, and the tax are not the same.',
    readTime: '3 min',
    published: '2026-10-24',
    image: '/images/blog/aif-pms.jpg',
    href: '/blog/what-are-aif-and-pms',
    related: ['is-pms-better-than-mutual-funds', 'is-mutual-fund-better-than-fd'],
    further: [
      { href: '/solutions/pms-aif', label: 'How we look at PMS and AIF' },
      { href: '/solutions/mutual-funds', label: 'Mutual funds, if the amount is smaller' },
    ],
    blocks: [
      {
        kind: 'p',
        text: 'A PMS and an AIF are both for larger sums. That is the only similarity. A portfolio management service holds the securities in your own demat account. An alternative investment fund pools your money and gives you units in a private fund. If a proposal treats the two names as one product, ask which document you are being asked to sign.',
      },
      { kind: 'h2', text: 'What a PMS is' },
      {
        kind: 'p',
        text: 'A SEBI-registered portfolio manager runs the book against a written mandate. The shares are yours, and you can see them. The manager does not accept less than ₹50 lakh, except for an accredited investor and a co-investment portfolio manager. Most of what is sold as “PMS” is discretionary: the manager trades without calling you each time. You usually pay a fixed fee plus a share of gains above a hurdle. Fifteen to twenty-five stocks will swing harder than a wide mutual fund, and a sale can create tax even in a year you took no cash out.',
      },
      { kind: 'h2', text: 'What an AIF is' },
      {
        kind: 'p',
        text: 'An AIF is a private fund. You commit capital, usually ₹1 crore, and the fund calls it in parts. You own units, not the underlying shares, and you usually cannot leave because you changed your mind. The category on the offer document is the product.',
      },
      {
        kind: 'ul',
        items: [
          'Category I: venture, startups, infrastructure, and social ventures.',
          'Category II: private equity, private credit, and real estate. Often locked for seven years or more.',
          'Category III: long-short and other traded strategies. These can use leverage, and the tax is different. Read that section with a chartered accountant.',
        ],
      },
      {
        kind: 'p',
        text: 'Securities in your name, from ₹50 lakh: that is a PMS. About ₹1 crore locked into units: that is an AIF. A few thousand rupees you can redeem at the day’s value: that is a mutual fund. A PMS or an AIF is a sleeve in a plan, not the money you need in the next few years.',
      },
      {
        kind: 'note',
        text: 'Under ₹50 lakh, the useful conversation is mutual funds. Stretching to meet a minimum leaves you with money you cannot reach.',
      },
    ],
  },
  {
    id: 'is-pms-better-than-mutual-funds',
    slug: 'is-pms-better-than-mutual-funds',
    category: 'Alternatives',
    title: 'Is PMS better than mutual funds?',
    crumb: 'PMS or mutual funds',
    seoTitle: 'Is PMS Better Than Mutual Funds in India? | One Capital',
    seoDescription:
      'PMS is not a better mutual fund. It is a concentrated portfolio in your demat, usually from ₹50 lakh, with its own fees and tax. Here is when it fits.',
    keywords: [
      'PMS vs mutual funds',
      'is PMS better than mutual funds',
      'PMS minimum investment',
      'portfolio management service fees',
    ],
    excerpt:
      'No. A PMS is not a better version of a mutual fund. It is a different tool, and for most people the fund is the one that fits.',
    readTime: '3 min',
    published: '2026-10-24',
    image: '/images/blog/pms-vs-funds.jpg',
    href: '/blog/is-pms-better-than-mutual-funds',
    related: ['what-are-aif-and-pms', 'invest-10000-in-mutual-funds'],
    further: [
      { href: '/solutions/mutual-funds', label: 'Mutual fund selection' },
      { href: '/solutions/pms-aif', label: 'When a PMS is in the conversation' },
    ],
    blocks: [
      {
        kind: 'p',
        text: 'No. A PMS is not a better mutual fund. It is a concentrated portfolio in your demat, usually from ₹50 lakh, and the fee has to be earned before you are ahead. A mutual fund is the better default until the amount is large and the brief is specific.',
      },
      { kind: 'h2', text: 'They do different jobs' },
      {
        kind: 'p',
        text: 'A mutual fund pools many people into one portfolio. You own units, the value is published every business day, and you can start with a few hundred rupees. A PMS is built around one client. The stocks sit in your demat, often fifteen to twenty-five names. When those names fall, your statement falls harder than a broad fund. That concentration is the product, not a flaw in it.',
      },
      { kind: 'h2', text: 'Fees and tax' },
      {
        kind: 'p',
        text: 'A mutual fund charges an expense ratio inside the value. A regular plan costs more than a direct plan because it includes the distributor’s commission. On regular plans bought through us, that commission is how we are paid. We do not earn it on a direct plan from the fund house. A PMS usually adds a fixed fee and a share of gains above a hurdle. The manager has to beat a plain fund by enough to cover that, after tax. Ask for the after-fee record over more than one market, not a twelve-month winner.',
      },
      {
        kind: 'p',
        text: 'In a fund you are taxed when you redeem, or when it pays a dividend. In a PMS the shares are yours, so a sale by the manager can create tax even when you took no cash out. Stay with funds if the amount is under ₹50 lakh, you may need the money inside five years, or you want to add a fixed sum every month. A PMS earns a place only when the slice you can leave untouched meets the minimum and the mandate is actually custom: a sector you will not own, a cap on one stock, a tax rule. If the “custom” book looks like the model shown to every client, you are paying PMS fees for a fund.',
      },
      {
        kind: 'note',
        text: 'An AIF is not the step between a fund and a PMS. It is a pooled private fund, usually from ₹1 crore, and it often locks the money for years.',
      },
    ],
  },
  {
    id: 'is-mutual-fund-better-than-fd',
    slug: 'is-mutual-fund-better-than-fd',
    category: 'Wealth Planning',
    title: 'Is a mutual fund better than an FD?',
    crumb: 'Mutual fund or FD',
    seoTitle: 'Is a Mutual Fund Better Than a Bank FD? | One Capital',
    seoDescription:
      'A mutual fund is not better than a fixed deposit. An FD holds money with a date. A fund is for money that can fall. Horizon and tax decide it.',
    keywords: [
      'mutual fund vs FD',
      'is mutual fund better than FD',
      'fixed deposit or mutual fund',
      'FD tax vs equity mutual fund',
    ],
    excerpt:
      'An FD is for money with a date. A mutual fund is for money that can fall on the way. Using one for the other’s job is how people get hurt.',
    readTime: '3 min',
    published: '2026-10-24',
    image: '/images/blog/fund-vs-fd.jpg',
    href: '/blog/is-mutual-fund-better-than-fd',
    related: ['fd-or-bonds', 'invest-10000-in-mutual-funds'],
    further: [
      { href: '/solutions/mutual-funds', label: 'How we use mutual funds' },
      { href: '/solutions/wealth-management', label: 'Cash, tax, and the rest of the plan' },
    ],
    blocks: [
      {
        kind: 'p',
        text: 'A mutual fund is not better than a fixed deposit. An FD is a rate and a date with a bank, insured by DICGC up to ₹5 lakh per depositor per bank. A mutual fund is a value that moves. The useful question is which rupee you mean.',
      },
      { kind: 'h2', text: 'Use an FD when the date is real' },
      {
        kind: 'p',
        text: 'Fees due this year, a tax payment, a house contribution you have already promised, the cash you would need if a salary stopped. That money wants a value that does not depend on a market close. Interest is taxed every year at your slab, so a person in a higher slab keeps less than the rate on the receipt. A large FD in one bank is also only insured up to the ₹5 lakh cap. Check the current DICGC limit before you rely on it.',
      },
      { kind: 'h2', text: 'Use a fund when you can wait' },
      {
        kind: 'p',
        text: 'Money you will not need for seven years or more can sit in an equity fund, because you have time to recover. In a rough year that fund can be down 20% or more. Anyone who would have to sell then should not have that money in equities. For FY 2026–27, equity-fund gains after twelve months are taxed at 12.5% above ₹1.25 lakh in a year. Gains inside twelve months are taxed at 20%. Debt funds bought on or after 1 April 2023 are taxed at your slab whenever you sell. A debt fund is not a tax trick that beats an FD.',
      },
      {
        kind: 'ul',
        items: [
          'Cash you might need within a year stays in the bank.',
          'A goal two or three years away can use an FD, or a short debt fund if you accept that the value moves.',
          'A goal seven years away is where an equity fund earns a conversation. Do not compare a one-year FD rate with a ten-year equity chart.',
        ],
      },
      {
        kind: 'note',
        text: 'The mistake is using the fund for money that has a date, or using the FD for money that has a decade.',
      },
    ],
  },
  {
    id: 'invest-10000-in-mutual-funds',
    slug: 'invest-10000-in-mutual-funds',
    category: 'Wealth Planning',
    title: 'What if I invest ₹10,000 in mutual funds?',
    crumb: '₹10,000 in funds',
    seoTitle: 'What If I Invest Rs 10,000 in Mutual Funds? | One Capital',
    seoDescription:
      '₹10,000 once will not change a household. ₹10,000 a month might. Here is the arithmetic at 8% and 12%, what tax does to it, and what a bad year looks like.',
    keywords: [
      'invest 10000 in mutual funds',
      '₹10000 SIP',
      'what if I invest 10000 in mutual fund',
      'SIP calculator India',
    ],
    excerpt:
      '₹10,000 once is a start, not a plan. ₹10,000 every month is a different decision. The numbers below are illustrations, not a return you are owed.',
    readTime: '3 min',
    published: '2026-10-24',
    image: '/images/blog/ten-thousand.jpg',
    href: '/blog/invest-10000-in-mutual-funds',
    related: ['is-mutual-fund-better-than-fd', 'is-pms-better-than-mutual-funds'],
    further: [
      { href: '/calculators/sip', label: 'SIP calculator' },
      { href: '/calculators/lumpsum', label: 'Lumpsum calculator' },
    ],
    blocks: [
      {
        kind: 'p',
        text: 'It depends which ₹10,000 you mean. Once is a small lumpsum. Every month is a saving habit. The one-time amount will not change how a household lives. The monthly amount can, if you leave it alone and you can stand a fall.',
      },
      { kind: 'h2', text: '₹10,000 once' },
      {
        kind: 'p',
        text: 'These figures are arithmetic, not a forecast. At 12% a year, ₹10,000 becomes about ₹31,100 in ten years. At 8%, about ₹21,600. A 7% FD, before tax, becomes about ₹19,700. If the fund is down 20% after a year, the ₹10,000 is about ₹8,000. Even the optimistic figure is a first investment, not a corpus.',
      },
      { kind: 'h2', text: '₹10,000 every month' },
      {
        kind: 'p',
        text: '₹10,000 a month is ₹12 lakh of your own money over ten years. Using the monthly SIP formula Indian calculators use, 12% a year grows that to about ₹23.2 lakh, and 8% grows it to about ₹18.4 lakh. A real fund does not grow in a straight line. The result can land above these figures or below the amount you put in. The only number you control on day one is the ₹10,000.',
      },
      {
        kind: 'note',
        text: 'Illustrations at a constant rate. Not the performance of any scheme, and not a forecast.',
      },
      {
        kind: 'p',
        text: 'Costs come off before you see a return. A regular plan pays the distributor out of the fund’s expenses. If you invest through us, that is how a regular plan pays us. A direct plan from the fund house costs less, and we do not earn commission on it. Equity-fund gains after twelve months are taxed at 12.5% above ₹1.25 lakh in a year for FY 2026–27. Inside twelve months the rate is 20%. One broad equity fund is enough for a goal seven years away. Money needed inside three years belongs in a deposit, not an equity fund. ₹10,000 is not a PMS or an AIF.',
      },
    ],
  },
  {
    id: 'fd-or-bonds',
    slug: 'fd-or-bonds',
    category: 'Wealth Planning',
    title: 'Which is better, an FD or bonds?',
    crumb: 'FD or bonds',
    seoTitle: 'FD or Bonds: Which Is Better for You? | One Capital',
    seoDescription:
      'A bank FD is simpler, and insured up to the DICGC cap. A bond pays more only if you accept default risk, or a price fall if you sell it early.',
    keywords: [
      'FD or bonds',
      'fixed deposit vs bonds',
      'which is better FD or bonds',
      'government bonds vs FD India',
    ],
    excerpt:
      'For most families the FD is the cleaner place for cash. A bond is better only when you know who owes you the money, and you can hold it.',
    readTime: '3 min',
    published: '2026-10-24',
    image: '/images/blog/fd-or-bonds.jpg',
    href: '/blog/fd-or-bonds',
    related: ['is-mutual-fund-better-than-fd', 'what-are-aif-and-pms'],
    further: [
      { href: '/solutions/wealth-management', label: 'Liquidity and the cash ladder' },
      { href: '/blog/is-mutual-fund-better-than-fd', label: 'How an FD compares with a mutual fund' },
    ],
    blocks: [
      {
        kind: 'p',
        text: 'For cash you cannot afford to see fall, a bank FD is the cleaner choice. A bond is a loan to a government or a company. The extra interest, when there is any, is payment for a risk the deposit does not carry in the same way. If you cannot name that risk, take the FD.',
      },
      { kind: 'h2', text: 'What you own' },
      {
        kind: 'p',
        text: 'An FD has a rate, a date, and a penalty if you break it. DICGC insures deposits up to ₹5 lakh per depositor per bank. Above that cap you are a creditor of the bank. A government bond is a loan to the sovereign. A company bond is a loan to that company. A 9% company bond, next to a 7% bank FD, is not a gift. The extra two points are the price of the chance the company pays late or not at all.',
      },
      { kind: 'h2', text: 'What changes if you sell' },
      {
        kind: 'p',
        text: 'Hold a bond to maturity and, if the issuer pays, you receive the contracted cash. Sell early and the price moves with interest rates. When yields rise, existing bonds fall, even a government bond. An FD does not show you that loss. You only see a penalty if you break it. A popular government bond is easy to sell. A thin corporate bond may not be. Interest on both an FD and most bonds is taxed at your slab. A debt fund is not the same thing as holding a bond.',
      },
      {
        kind: 'ul',
        items: [
          'Money you might need, inside the insurance cap: a bank FD. Split it across banks once you are above ₹5 lakh.',
          'A known date, and you can hold to maturity: a government bond can fit. You take price risk only if you sell early.',
          'A higher coupon from a company: only with money you can lose, after you know who the issuer is.',
        ],
      },
      {
        kind: 'note',
        text: 'A pitch that shows one interest rate, and no issuer, no maturity, and no mention of selling early, is not a comparison. It is a rate.',
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.related.flatMap((slug) => {
    const match = getBlogPostBySlug(slug);
    return match ? [match] : [];
  });
}

export function getOtherPosts(post: BlogPost): BlogPost[] {
  return BLOG_POSTS.filter((item) => item.id !== post.id);
}
