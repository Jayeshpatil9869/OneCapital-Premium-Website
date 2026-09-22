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

export const CONTACT_PAGE_COPY = {
  eyebrow: 'Contact',
  watermark: 'CONTACT',
  headline: 'Get in touch',
  subtext:
    'Questions about advisory, mutual funds, or portfolio management? Start a conversation with the OneCapital team in Pune.',
  formTitle: 'Request a Consultation',
  confidentialityNote: 'All communications are treated with discretion.',
  successTitle: 'Request received',
  successMessage:
    'Thank you. Our team will review your note and respond as soon as we can.',
  submitAnotherLabel: 'Submit another request',
  submitLabel: 'Submit Request',
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
