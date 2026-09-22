import type { LucideIcon } from 'lucide-react';
import {
  TrendingUp,
  Wallet,
  BarChart3,
  Banknote,
  Flag,
} from 'lucide-react';

export type CalculatorSlug =
  | 'sip'
  | 'lumpsum'
  | 'step-up-sip'
  | 'swp'
  | 'goal-planning';

export type CalculatorCard = {
  slug: CalculatorSlug;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  path: string;
};

export const CALCULATOR_CARDS: CalculatorCard[] = [
  {
    slug: 'sip',
    title: 'SIP Calculator',
    shortTitle: 'SIP',
    description:
      'Wonder how much your monthly investments can grow? Calculate your SIP returns and plan your path to wealth.',
    icon: TrendingUp,
    path: '/calculators/sip',
  },
  {
    slug: 'lumpsum',
    title: 'Lumpsum Calculator',
    shortTitle: 'Lumpsum',
    description:
      'Working towards a financial milestone? Explore how a one-time investment can compound over time.',
    icon: Wallet,
    path: '/calculators/lumpsum',
  },
  {
    slug: 'step-up-sip',
    title: 'Step Up SIP Calculator',
    shortTitle: 'Step Up SIP',
    description:
      'Growing income? See how yearly increases in your SIP can strengthen long-term investment outcomes.',
    icon: BarChart3,
    path: '/calculators/step-up-sip',
  },
  {
    slug: 'swp',
    title: 'SWP Calculator',
    shortTitle: 'SWP',
    description:
      'Need regular income from investments? Plan monthly withdrawals and see how your corpus may evolve.',
    icon: Banknote,
    path: '/calculators/swp',
  },
  {
    slug: 'goal-planning',
    title: 'Financial Goal Planning',
    shortTitle: 'Goal Planning',
    description:
      'Have a financial goal in mind? Estimate the SIP or lumpsum needed to work toward that target.',
    icon: Flag,
    path: '/calculators/goal-planning',
  },
];

export const CALCULATOR_DISCLAIMER =
  'These calculators are indicative educational tools only. Actual returns vary with markets, product charges, taxes, and scheme performance. This is not investment advice. Mutual fund investments are subject to market risks — read all scheme-related documents carefully.';

/** Shared min/max/step bounds for calculator inputs (clamped in CalculatorSlider). */
export const CALCULATOR_LIMITS = {
  sip: {
    monthly: { min: 500, max: 200_000, step: 500 },
    rate: { min: 1, max: 30, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
  },
  lumpsum: {
    principal: { min: 1_000, max: 10_000_000, step: 1_000 },
    rate: { min: 1, max: 30, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
  },
  stepUpSip: {
    monthly: { min: 500, max: 200_000, step: 500 },
    rate: { min: 1, max: 30, step: 0.5 },
    stepUp: { min: 0, max: 50, step: 1 },
    years: { min: 1, max: 40, step: 1 },
  },
  swp: {
    corpus: { min: 100_000, max: 50_000_000, step: 50_000 },
    withdrawal: { min: 1_000, max: 500_000, step: 1_000 },
    rate: { min: 1, max: 20, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
  },
  goal: {
    target: { min: 100_000, max: 50_000_000, step: 50_000 },
    rate: { min: 1, max: 30, step: 0.5 },
    years: { min: 1, max: 40, step: 1 },
  },
} as const;

export type CalculatorInfoSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CalculatorFaq = {
  id: string;
  question: string;
  answer: string;
};

export const CALCULATOR_HUB = {
  eyebrow: 'Tools',
  title: 'Calculators',
  subtitle:
    'Plan SIPs, lumpsum investments, withdrawals, and goals with clear, research-friendly estimates — built for OneCapital clients across Maharashtra.',
} as const;

export function getCalculatorCard(slug: string): CalculatorCard | undefined {
  return CALCULATOR_CARDS.find((card) => card.slug === slug);
}
