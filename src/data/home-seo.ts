/**
 * Homepage SEO copy from Basic SEO Audit (Pune / wealth management focus).
 * Visible headings must match this file — do not invent alternate SEO H1/H2.
 */
export const HOME_SEO = {
  title: 'Wealth Management & Financial Services in Pune | One Capital',
  description:
    'Explore wealth management and financial services in Pune with One Capital. Personalised financial planning and investment solutions for your financial goals.',
  h1: 'Wealth Management & Financial Services in Pune',
  keywords: [
    'Wealth Management in Pune',
    'Financial Services in Pune',
    'Wealth Management Company in Pune',
    'Financial Planning in Pune',
    'Investment Advisory Pune',
    'One Capital',
  ] as const,
  h2: {
    personalised: 'Personalised Wealth Management Solutions',
    exploreServices: 'Explore Our Financial Services',
    financialPlanning: 'Financial Planning for Your Future',
    whyChoose: 'Why Choose One Capital?',
    approach: 'Our Approach to Wealth Management',
    faq: 'Frequently Asked Questions',
  } as const,
  cta: 'Book a Financial Consultation',
  /** Short, original Pune-local intro under the services H2 (people-first, no stuffing). */
  servicesIntro:
    'One Capital is a Pune-based wealth advisory firm. We help individuals, families, and business owners with mutual funds, PMS, AIFs, and long-term financial planning — grounded in research and clear communication.',
  planningIntro:
    'Whether you are building an emergency reserve, planning for family goals, or reviewing a larger portfolio, we map liquidity, risk comfort, and tax considerations before recommending a path.',
  whyChooseIntro:
    'Clients work with us for disciplined process, transparent custody in your own accounts, and advisors who stay reachable across Pune, Mumbai, Nashik, and Kolhapur.',
  approachIntro:
    'Our approach is simple: research first, strategy next, investment last. Suitability and review cadence come before product selection.',
} as const;

export const HOME_SERVICE_LINKS = [
  { href: '/solutions/mutual-funds', label: 'Mutual Funds' },
  { href: '/solutions/pms-aif', label: 'PMS & AIF' },
  { href: '/solutions/wealth-management', label: 'Wealth Management' },
  { href: '/solutions/investment-advisory', label: 'Investment Advisory' },
  { href: '/solutions/capital-strategy', label: 'Capital Strategy' },
  { href: '/approach', label: 'Our Approach' },
  { href: '/contact', label: 'Contact' },
  { href: '/calculators', label: 'Calculators' },
] as const;
