import type { LucideIcon } from 'lucide-react';
import { Building2, Mail, Phone } from 'lucide-react';
import { SOLUTION_PILLARS } from '@/src/data/solutions-pillars';

export type ContactDetail = {
  id: string;
  label: string;
  icon: LucideIcon;
  lines: string[];
  href?: string;
};

export const CONTACT_PAGE_COPY = {
  headline: 'Start Your',
  headlineAccent: 'Legacy.',
  subtext:
    'Initiate a conversation with our advisory team to discuss your portfolio, goals, and wealth architecture.',
  formTitle: 'Request a Consultation',
  confidentialityNote: 'All communications are strictly confidential.',
  successTitle: 'Request received',
  successMessage:
    'Thank you. Our advisory team will review your brief and respond within one business day.',
  submitAnotherLabel: 'Submit another request',
  submitLabel: 'Submit Request',
} as const;

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    id: 'headquarters',
    label: 'Headquarters',
    icon: Building2,
    lines: [
      'OneCapital Financial Center',
      'Financial District',
      'Pune, Maharashtra, India',
    ],
  },
  {
    id: 'email',
    label: 'Direct Inquiry',
    icon: Mail,
    lines: ['onecapital0404@gmail.com'],
    href: 'mailto:onecapital0404@gmail.com',
  },
  {
    id: 'phone',
    label: 'Private Desk',
    icon: Phone,
    lines: ['+91 22 0000 0000'],
    href: 'tel:+912200000000',
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
  fullName: 'John Doe',
  email: 'john@company.com',
  phone: '+91 98765 43210',
  interest: 'Select an interest',
  message:
    'Briefly describe your current portfolio structure or advisory needs...',
} as const;
