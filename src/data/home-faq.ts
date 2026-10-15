export type FAQQuestion = {
  id: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  title: string;
  questions: FAQQuestion[];
};

export const FAQ_ALL_ID = 'all';

export const HOME_FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'products-minimums',
    title: 'Products & Minimums',
    questions: [
      {
        id: 'faq-minimums',
        question: 'What are the minimum ticket sizes for Mutual Funds, PMS, and AIFs?',
        answer:
          'Mutual Fund advisory starts from ₹10,000/month (SIP) or ₹1 Lakh lumpsum. Discretionary Equity PMS requires ₹50 Lakhs, and Category II/III Alternative Investment Funds (AIF) require ₹1 Crore, strictly as mandated by SEBI guidelines.',
      },
      {
        id: 'faq-custody',
        question: 'Where is my money held? Can One Capital withdraw my funds?',
        answer:
          'Never. Your securities and cash are held directly in your own Demat and bank account with SEBI-registered institutional custodians (such as ICICI and HDFC). One Capital operates strictly under power-of-attorney to manage trades on your behalf.',
      },
      {
        id: 'faq-transfer',
        question: 'Can I transfer my existing mutual funds and stocks without selling them?',
        answer:
          'Yes. We perform a zero-downtime portfolio transition. We map your existing holdings, eliminate duplicate or underperforming funds, and rebalance your portfolio without triggering unnecessary short-term capital gains tax.',
      },
      {
        id: 'faq-hedging',
        question: 'How does One Capital protect capital during market crashes?',
        answer:
          'We use quantitative index options baskets and dynamic asset allocation to hedge equity downside during volatile quarters, ensuring drawdowns are buffered without liquidating long-term compounding compounders.',
      },
    ],
  },
  {
    id: 'advisory-fees',
    title: 'Advisory & Fees',
    questions: [
      {
        id: 'faq-bank-vs-onecapital',
        question: 'How is One Capital different from my bank relationship manager?',
        answer:
          'Bank relationship managers operate under aggressive monthly sales quotas, frequently pushing high-commission insurance policies and NFOs. One Capital is an independent, fiduciary advisory firm with zero product sales quotas.',
      },
      {
        id: 'faq-fee-model',
        question: 'How are advisory and management fees structured?',
        answer:
          'We believe in absolute fee transparency. Our management fees are clearly documented upfront as a straightforward percentage of Assets Under Management (AUM), with zero hidden distribution kickbacks.',
      },
      {
        id: 'faq-tax-harvesting',
        question: 'Do you provide tax-loss harvesting and capital gains reporting?',
        answer:
          'Yes. We actively identify tax-loss harvesting opportunities throughout the financial year and provide 1-click consolidated capital gains statements formatted for easy ITR filing.',
      },
    ],
  },
  {
    id: 'process-review',
    title: 'Process & Reviews',
    questions: [
      {
        id: 'faq-onboarding-steps',
        question: 'What does the onboarding process look like?',
        answer:
          'We conduct a comprehensive diagnostic of your existing assets, build your customized asset allocation model, execute paperless KYC, and establish your dedicated portfolio review schedule within 3 to 5 business days.',
      },
      {
        id: 'faq-review-cadence',
        question: 'How often will I receive portfolio reviews and updates?',
        answer:
          'You receive real-time visibility via our mobile app, formal quarterly performance reports comparing your portfolio against the Nifty 50 benchmark, and direct one-on-one access to your portfolio manager whenever decisions arise.',
      },
      {
        id: 'faq-founder-family',
        question: 'Do you support multi-generational family wealth and business founders?',
        answer:
          'Yes. We regularly assist startup founders post-liquidity events and family business owners with liquidity planning, estate continuity, and multi-entity wealth management across our Pune, Mumbai, Kolhapur, and Nashik offices.',
      },
    ],
  },
];

export function getAllFAQQuestions(): FAQQuestion[] {
  return HOME_FAQ_CATEGORIES.flatMap((category) => category.questions);
}

export function getFAQQuestionsForCategory(categoryId: string): FAQQuestion[] {
  if (categoryId === FAQ_ALL_ID) {
    return getAllFAQQuestions();
  }
  const category = HOME_FAQ_CATEGORIES.find((item) => item.id === categoryId);
  return category?.questions ?? [];
}

export function getCategoryTitle(categoryId: string): string {
  if (categoryId === FAQ_ALL_ID) {
    return 'All';
  }
  return HOME_FAQ_CATEGORIES.find((item) => item.id === categoryId)?.title ?? '';
}
