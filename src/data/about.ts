import { COMPANY } from '@/src/data/company';

/** About page copy — LinkedIn + 1capital.in brand voice; no invented regs/performance. */
export const ABOUT_PAGE = {
  documentTitle: `About Us | ${COMPANY.brandName}`,

  hero: {
    line1: `About ${COMPANY.brandName},`,
    line2: 'genesis & purpose.',
    meta: [
      'GENESIS • PURPOSE /',
      'PRECISION ADVISORY • WEALTH',
      'STEWARDSHIP — INSTITUTIONAL',
    ] as const,
    description:
      'Redefining wealth management with the precision of experts and the passion of partners. We help individuals and family enterprises protect, structure, and compound enduring capital with institutional clarity.',
  },

  story: {
    eyebrow: 'Our Story • Genesis',
    headingLine1: 'Disciplined Wealth,',
    headingLine2: 'Built in Pune',
    lead: `${COMPANY.legalName} is a ${COMPANY.hqCity}-based financial services firm founded in ${COMPANY.foundedYear}. We help individuals and businesses grow wealth through strategic, disciplined investment advisory, portfolio management, and long-term wealth planning tailored to each client's goals.`,
    imageAlt: `${COMPANY.brandName} advisory workspace — ${COMPANY.hqCity} headquarters`,
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
    approach:
      'Our approach combines market insight, risk management, and personalized strategy — spanning mutual funds, portfolio management services, wealth planning, tax strategy, and thoughtfully evaluated alternative allocations such as AIFs, startup equity, and structured real-estate products.',
    bridge:
      `Through ${COMPANY.domain}, we bridge financial aspirations and outcomes with transparent advisory — helping clients build, preserve, and compound wealth with clarity across market cycles.`,
    presence: `From our ${COMPANY.hqCity} headquarters and regional offices in Mumbai, Kolhapur, and Nashik, we bring local access and a consistent advisory cadence across Maharashtra.`,
  },

  missionVision: {
    heading: 'Our Mission & Vision',
    mission: {
      title: 'Our Mission',
      body: `Help individuals and businesses grow wealth through transparent, customized investment advisory, portfolio management, and long-term wealth planning — tailored to each client's goals.`,
    },
    vision: {
      title: 'Our Vision',
      body: `To be a trusted Maharashtra-based advisory partner, rooted in ${COMPANY.hqCity} — delivering research-informed wealth solutions and enduring client relationships through clarity, integrity, and a client-first approach.`,
    },
  },

  values: {
    eyebrow: 'Core Values',
    heading: 'Our Core Values',
    subtext:
      'The principles that guide every decision we make and every relationship we build.',
    items: [
      {
        title: 'Long-Term Planning',
        description:
          'Durable wealth is built with patience, discipline, and deliberate allocation — we focus on long-term planning rather than short-term speculation.',
      },
      {
        title: 'Integrity & Transparency',
        description:
          'Clear reasoning, open communication, and alignment with client interests across advisory conversations, portfolio decisions, and reporting.',
      },
      {
        title: 'Client-Centric Solutions',
        description:
          'Every mandate is different. We personalize investment advisory, portfolio management, and wealth planning around individual goals, risk profiles, and life stages.',
      },
    ],
  },
} as const;
