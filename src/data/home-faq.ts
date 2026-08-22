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
    id: 'wealth-management',
    title: 'Wealth Management',
    questions: [
      {
        id: 'wm-includes',
        question: "What does One Capital's wealth management service include?",
        answer:
          'Our wealth management combines portfolio strategy, financial planning context, risk awareness, and ongoing advisory review. The scope is shaped around your objectives, liquidity needs, and long-term priorities — not a generic allocation template.',
      },
      {
        id: 'wm-strategy',
        question: 'How is my wealth strategy developed?',
        answer:
          'We begin with a structured discovery of your financial architecture, risk profile, and goals. From there we design a tailored mandate with clear allocation principles, review cadence, and decision frameworks aligned to your circumstances.',
      },
      {
        id: 'wm-review',
        question: 'How often is my portfolio reviewed?',
        answer:
          'Review frequency follows your mandate and market context. We maintain regular oversight and scheduled reviews, with additional engagement when material changes in markets, regulation, or your personal situation warrant it.',
      },
      {
        id: 'wm-risk',
        question: 'How does One Capital approach risk management?',
        answer:
          'Risk is treated as a structural consideration — not a afterthought. We evaluate concentration, liquidity, correlation, and downside scenarios as part of ongoing portfolio oversight and strategic adjustments.',
      },
    ],
  },
  {
    id: 'investing',
    title: 'Investing',
    questions: [
      {
        id: 'inv-evaluate',
        question: 'How are investment opportunities evaluated?',
        answer:
          'Opportunities pass through a disciplined evaluation process: research, fit within mandate, risk contribution, liquidity profile, and alignment with long-term objectives. We prioritize quality of process over short-term narratives.',
      },
      {
        id: 'inv-construct',
        question: 'How do you construct portfolios?',
        answer:
          'Portfolios are built around strategic asset allocation, diversification principles, and the specific constraints of each client mandate. Implementation is deliberate — balancing growth, preservation, and tax-aware positioning where relevant.',
      },
      {
        id: 'inv-balance',
        question: 'How do you balance growth and preservation?',
        answer:
          'The balance is defined by your objectives and risk tolerance, not market headlines. We articulate trade-offs clearly and adjust positioning as circumstances evolve — always within the framework agreed at the outset.',
      },
      {
        id: 'inv-diversify',
        question: 'How does diversification influence your approach?',
        answer:
          'Diversification is a core risk-management tool across asset classes, geographies, and instruments where appropriate. It supports resilience through cycles rather than concentrating exposure in a single thesis.',
      },
    ],
  },
  {
    id: 'process',
    title: 'Process',
    questions: [
      {
        id: 'proc-consult',
        question: 'What happens during the initial consultation?',
        answer:
          'The first conversation focuses on understanding your financial picture, priorities, and expectations for advisory support. It is exploratory — designed to determine fit and outline how a structured engagement could begin.',
      },
      {
        id: 'proc-onboard',
        question: 'How does the onboarding process work?',
        answer:
          'Onboarding follows our structured framework: discover, diagnose, design, and implement. We document objectives, establish reporting rhythms, and transition holdings methodically where tax and timing considerations apply.',
      },
      {
        id: 'proc-communicate',
        question: 'How frequently will I communicate with my advisor?',
        answer:
          'Communication cadence is agreed during onboarding — typically through scheduled reviews supplemented by direct access when material decisions or market developments require discussion.',
      },
      {
        id: 'proc-evolve',
        question: 'Can my strategy evolve as my circumstances change?',
        answer:
          'Yes. Wealth is dynamic. We revisit mandate assumptions, liquidity needs, and family priorities as life events, business transitions, or market shifts occur — adjusting strategy within a disciplined framework.',
      },
    ],
  },
  {
    id: 'clients',
    title: 'Clients',
    questions: [
      {
        id: 'cli-who',
        question: "Who is One Capital's wealth management service designed for?",
        answer:
          'We work with select individuals, families, and organizations who value institutional discipline, transparency, and a long-term advisory relationship — typically those with complex or growing financial architectures.',
      },
      {
        id: 'cli-entrepreneurs',
        question: 'Do you work with entrepreneurs and business owners?',
        answer:
          'Yes. Many of our clients are founders and business owners navigating liquidity events, concentrated positions, and succession planning alongside personal wealth objectives.',
      },
      {
        id: 'cli-advisors',
        question: 'Can you coordinate with my existing professional advisors?',
        answer:
          'We regularly collaborate with tax advisors, legal counsel, and other specialists. Coordination helps ensure strategy, structure, and execution remain aligned across your professional ecosystem.',
      },
      {
        id: 'cli-when',
        question: 'When should I consider professional wealth management?',
        answer:
          'Consider it when complexity increases — through business success, inheritance, liquidity events, or multi-generational planning — and when you want structured oversight rather than ad hoc decision-making.',
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
