export type Testimonial = {
  id: string;
  quote: string;
  client: string;
  role: string;
  category: string;
};

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: 'private-client',
    quote:
      'The right advisor does not simply manage wealth. They understand why it matters — and stay disciplined when markets test conviction.',
    client: 'Private Client',
    role: 'Business Owner',
    category: 'Private Client',
  },
  {
    id: 'hni-client',
    quote:
      'What distinguishes the relationship is clarity. Strategy, reporting, and communication are structured enough to trust, yet personal enough to feel considered.',
    client: 'HNI Client',
    role: 'Senior Executive',
    category: 'Executive',
  },
  {
    id: 'entrepreneur',
    quote:
      'We needed an advisory partner who could coordinate complexity — liquidity events, tax awareness, and long-term planning — without losing sight of the mandate.',
    client: 'Entrepreneur',
    role: 'Founder',
    category: 'Entrepreneur',
  },
  {
    id: 'family-office',
    quote:
      'Continuity was the priority. The framework, review cadence, and transparency gave our family confidence that decisions were deliberate, not reactive.',
    client: 'Family Office Representative',
    role: 'Next Generation',
    category: 'Family Office',
  },
];
