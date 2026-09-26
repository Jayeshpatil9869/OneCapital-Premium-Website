import { COMPANY } from '@/src/data/company';

/** About page copy — LinkedIn + 1capital.in brand voice; no invented regs/performance. */
export const ABOUT_PAGE = {
  documentTitle: `About Us | ${COMPANY.brandName}`,

  seo: {
    title: `Wealth Management Firm in ${COMPANY.hqCity} | About ${COMPANY.brandName}`,
    description: `${COMPANY.legalName} is a ${COMPANY.hqCity}-based wealth management and investment advisory firm founded in ${COMPANY.foundedYear} — mutual funds, portfolio management, wealth planning, and tax-aware strategy across Maharashtra.`,
    keywords: [
      'wealth management firm Pune',
      'investment advisory Maharashtra',
      'One Capital Investment',
      'portfolio management mutual funds',
      'wealth planning Pune',
      COMPANY.brandName,
    ],
  },

  hero: {
    line1: `About ${COMPANY.brandName},`,
    line2: 'genesis & purpose.',
    meta: [
      'GENESIS • PURPOSE /',
      'PRECISION ADVISORY • WEALTH',
      'STEWARDSHIP — MAHARASHTRA',
    ] as const,
    description: `A ${COMPANY.hqCity}-rooted wealth partner for individuals, families, and businesses — research-led advisory, portfolio stewardship, and long-term planning with clarity and discipline.`,
  },

  story: {
    eyebrow: 'Our Story • Genesis',
    headingLine1: 'Wealth planned around your life.',
    headingLine2: '',
    imageSrc: '/images/about-story.jpg',
    imageAlt: `${COMPANY.brandName} advisory workspace — ${COMPANY.hqCity} headquarters`,
    lead: `Founded in ${COMPANY.foundedYear}, ${COMPANY.legalName} is a ${COMPANY.hqCity}-based wealth management and investment advisory firm. We partner with individuals, families, and businesses to design capital plans around real goals — then implement them with research, suitability, and ongoing stewardship.`,
    approach: `Our work spans capital strategy, portfolio management, risk & wealth architecture, and intelligence & oversight — including mutual funds, Portfolio Management Services (PMS), wealth planning, tax-aware investing, and carefully evaluated alternatives such as AIFs, startup equity, and structured real-estate products when they fit the mandate.`,
    bridge: `From our ${COMPANY.hqCity} headquarters and offices in Mumbai, Kolhapur, and Nashik — and through ${COMPANY.domain} — clients get transparent advisory, consolidated clarity on what they own, and a consistent review cadence across market cycles.`,
    presence: `Local access across Maharashtra. Institutional discipline in every conversation.`,
    /** Single centered paragraph with inline scroll-reveal images. */
    revealParagraph: [
      { type: 'text', value: 'We build' },
      {
        type: 'image',
        src: '/images/about-story.jpg',
        alt: 'OneCapital Pune advisory workspace',
      },
      { type: 'text', value: 'disciplined wealth' },
      {
        type: 'image',
        src: '/images/about-story-advisory.jpg',
        alt: 'Advisory conversation',
      },
      { type: 'text', value: 'through research-led advisory, portfolio management, and' },
      {
        type: 'image',
        src: '/images/about-story-suite.jpg',
        alt: 'Wealth planning suite',
      },
      { type: 'text', value: 'long-term planning — bridging aspirations and outcomes' },
      {
        type: 'image',
        src: '/images/gallery/executive-client-meeting.jpg',
        alt: 'Client advisory session',
      },
      { type: 'text', value: 'across Pune, Mumbai,' },
      {
        type: 'image',
        src: '/images/gallery/wealth-headquarters.jpg',
        alt: 'Maharashtra presence',
      },
      { type: 'text', value: 'Kolhapur & Nashik.' },
    ],
  },

  missionVision: {
    heading: 'Our Mission & Vision',
    mission: {
      title: 'Our Mission',
      body: `Help individuals and businesses grow and protect wealth through transparent investment advisory, portfolio management, and long-term wealth planning — personalized to goals, risk capacity, and life stage.`,
    },
    vision: {
      title: 'Our Vision',
      body: `To be Maharashtra's trusted wealth partner, rooted in ${COMPANY.hqCity} — known for research-informed solutions, clear reporting, and relationships that outlast a single market cycle.`,
    },
  },

  values: {
    eyebrow: 'Core Values',
    heading: 'Our Core Values',
    subtext:
      'The standards behind every recommendation, portfolio review, and client conversation.',
    items: [
      {
        title: 'Long-Term Planning',
        description:
          'We prioritize durable allocation and goal funding over short-term speculation — patience and policy before product.',
      },
      {
        title: 'Integrity & Transparency',
        description:
          'Clear reasoning on risks, costs, and trade-offs. Clients should always know what they own and why they own it.',
      },
      {
        title: 'Client-Centric Solutions',
        description:
          'Every mandate is different. Advisory, mutual funds, PMS pathways, and wealth planning are sized to the person — not a catalog.',
      },
    ],
  },
} as const;
