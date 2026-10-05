import { COMPANY } from '@/src/data/company';

/** Team page copy — leadership portraits + gallery. */
export const TEAM_PAGE = {
  documentTitle: `Team | ${COMPANY.brandName}`,

  hero: {
    line1: 'Our team,',
    line2: 'our leadership.',
    description:
      'Meet the people guiding OneCapital’s advisory work — practical guidance, clear communication, and a long-term view of wealth for clients across Maharashtra.',
  },

  desks: {
    eyebrow: 'Leadership',
    heading: 'Meet Our Expert Team',
  },

  gallery: {
    eyebrow: `Inside ${COMPANY.brandName}`,
    heading: 'Across Maharashtra',
    body: `A glimpse into our work — from the ${COMPANY.hqCity} headquarters to regional advisory conversations across Mumbai, Kolhapur, and Nashik.`,
  },

  cta: {
    line1: 'Ready to start',
    line2: 'your next',
    line3Outlined: 'conversation',
    italicQuote: `Schedule a consultation with the ${COMPANY.brandName} team and explore how disciplined advisory can support your financial goals — from our Pune headquarters or any of our Maharashtra offices.`,
    buttonText: 'Book Consultation',
    buttonLink: '/contact',
  },
} as const;
