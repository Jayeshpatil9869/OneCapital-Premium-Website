import type { LucideIcon } from 'lucide-react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY, COMPANY_LOCATION_LINES } from '@/src/data/company';
import { SOLUTION_PILLARS } from '@/src/data/solutions-pillars';

export type ContactDetail = {
  id: string;
  label: string;
  icon: LucideIcon;
  lines: string[];
  href?: string;
};

export const CONTACT_HERO_IMAGE = {
  src: '/images/gallery/executive-client-meeting.jpg',
  alt: 'One Capital advisory conversation in a private meeting suite',
} as const;

export const CONTACT_PAGE_COPY = {
  eyebrow: 'Contact',
  headline: "Let's begin with a conversation",
  subtext:
    'Every capital decision starts with context. We engage through thoughtful dialogue—grounded in your objectives, risk comfort, and long-term alignment.',
  formTitle: 'Request a consultation',
  confidentialityNote: 'All communications are treated with discretion.',
  confidentialityAccent: 'discretion',
  successTitle: 'Request received',
  successMessage:
    'Thank you. Our team will review your note and respond as soon as we can.',
  submitAnotherLabel: 'Submit another request',
  submitLabel: 'Get Started',
} as const;

export const CONTACT_SEO = {
  title: `Contact & Consultation | ${COMPANY.brandName}`,
  description: `Book a wealth management consultation with ${COMPANY.brandName} in ${COMPANY.hqCity}. Reach our team for advisory, mutual funds, PMS, and portfolio conversations.`,
  keywords: [
    'wealth management consultation Pune',
    'One Capital contact',
    'book consultation Maharashtra',
    'PMS AIF advisory Pune',
  ],
} as const;

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    id: 'phone',
    label: 'Call us',
    icon: Phone,
    lines: [COMPANY.phone],
    href: COMPANY.phoneHref,
  },
  {
    id: 'email',
    label: 'Email us',
    icon: Mail,
    lines: [COMPANY.email],
    href: `mailto:${COMPANY.email}`,
  },
  {
    id: 'headquarters',
    label: 'Our location',
    icon: MapPin,
    lines: [...COMPANY_LOCATION_LINES],
  },
];

export type ContactInterestOption = {
  value: string;
  label: string;
};

export const CONTACT_INTEREST_OPTIONS: ContactInterestOption[] = [
  ...SOLUTION_PILLARS.map((pillar) => ({
    value: pillar.id,
    label: pillar.title,
  })),
  { value: 'other', label: 'Other' },
];

export const CONTACT_FORM_PLACEHOLDERS = {
  fullName: 'Your full name',
  email: 'you@company.com',
  phone: COMPANY.phone,
  interest: 'Select an interest',
  message:
    'Briefly describe your advisory needs, portfolio questions, or wealth-planning goals...',
} as const;
