import { COMPANY } from '@/src/data/company';

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
  image: string;
  /** CSS object-position, e.g. "center top" */
  imagePosition?: string;
  profileUrl: string;
  linkedinUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
};

/**
 * Expert team portraits (director has a dedicated About Me section above).
 */
export const teamMembers: TeamMember[] = [
  {
    id: 'advisory-desk',
    name: 'Advisory Desk',
    role: 'Investment Advisory',
    description:
      'Guides clients through investment decisions with clear communication, risk awareness, and practical recommendations aligned to long-term goals.',
    category: 'Advisory',
    image: '/images/team/member-1.png',
    imagePosition: 'center 10%',
    profileUrl: '/contact',
    linkedinUrl: COMPANY.linkedinUrl,
  },
  {
    id: 'portfolio-desk',
    name: 'Portfolio Desk',
    role: 'Portfolio Management',
    description:
      'Constructs and monitors portfolios around client objectives, liquidity needs, and risk appetite — with disciplined oversight across market cycles and clear reporting.',
    category: 'Portfolio',
    image: '/images/team/member-2.png',
    imagePosition: 'center 12%',
    profileUrl: '/contact',
    linkedinUrl: COMPANY.linkedinUrl,
  },
  {
    id: 'wealth-desk',
    name: 'Wealth Planning Desk',
    role: 'Wealth Planning',
    description:
      'Supports individuals and businesses with long-term wealth planning, tax-aware conversations, and risk awareness — coordinated from Pune headquarters with local access in Mumbai, Kolhapur, and Nashik.',
    category: 'Wealth Planning',
    image: '/images/team/member-3.png',
    imagePosition: 'center 18%',
    profileUrl: '/contact',
    linkedinUrl: COMPANY.linkedinUrl,
  },
];

export const TEAM_MEMBERS = teamMembers;

/** Full About Me narrative for the director (approved fact pack). */
export const DIRECTOR_ABOUT = {
  eyebrow: 'About Me',
  image: '/images/team/director.jpg',
  imagePosition: 'center 18%',
  imageAlt: 'OneCapital leadership — advisory desk',
  /** Opening lead — first sentence of the approved bio. */
  lead: 'With over 8 years of experience in the financial services industry, I help clients make informed investment and financial decisions based on their individual goals, risk profile, and long-term objectives.',
  paragraphs: [
    'I am passionate about finance and investments and continuously work to understand market developments, investment opportunities, and evolving financial needs. My approach is centered around understanding each client\'s financial situation and providing practical, well-informed guidance to help them build and manage their wealth.',
    'Over the years, I have had the opportunity to work closely with clients across different financial needs, helping them navigate investment decisions with greater clarity and confidence.',
  ],
  closing:
    'My goal is simple: to help clients make better financial decisions today and build a stronger financial future.',
} as const;
