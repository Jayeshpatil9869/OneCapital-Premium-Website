export type Testimonial = {
  id: string;
  quote: string;
  /** Display name (placeholder first name until real client attribution is approved). */
  client: string;
  role: string;
  category: string;
  /** Optional photo URL; when omitted, UI shows initials in a circular avatar. */
  avatarSrc?: string;
};

/** Cropped Unsplash portraits (free license) — Indian professionals for placeholder avatars. */
const AVATARS = {
  rahul:
    'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=crop&w=160&h=160&q=80&crop=faces',
  meera:
    'https://images.unsplash.com/photo-1607189200597-4d0923ef98c6?auto=format&fit=crop&w=160&h=160&q=80&crop=faces',
  arjun:
    'https://images.unsplash.com/photo-1659353220482-554773c2f7fa?auto=format&fit=crop&w=160&h=160&q=80&crop=faces',
  kavya:
    'https://images.unsplash.com/photo-1587538018365-2a1f8b544c08?auto=format&fit=crop&w=160&h=160&q=80&crop=faces',
} as const;

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: 'private-client',
    quote:
      'The right advisor does not simply manage wealth. They understand why it matters — and stay disciplined when markets test conviction.',
    client: 'Rahul Sharma',
    role: 'Business Owner',
    category: 'Private Client',
    avatarSrc: AVATARS.rahul,
  },
  {
    id: 'hni-client',
    quote:
      'What distinguishes the relationship is clarity. Strategy, reporting, and communication are structured enough to trust, yet personal enough to feel considered.',
    client: 'Meera Iyer',
    role: 'Senior Executive',
    category: 'Executive',
    avatarSrc: AVATARS.meera,
  },
  {
    id: 'entrepreneur',
    quote:
      'We needed an advisory partner who could coordinate complexity — liquidity events, tax awareness, and long-term planning — without losing sight of the mandate.',
    client: 'Arjun Patel',
    role: 'Founder',
    category: 'Entrepreneur',
    avatarSrc: AVATARS.arjun,
  },
  {
    id: 'family-office',
    quote:
      'Continuity was the priority. The framework, review cadence, and transparency gave our family confidence that decisions were deliberate, not reactive.',
    client: 'Kavya Reddy',
    role: 'Next Generation',
    category: 'Family Office',
    avatarSrc: AVATARS.kavya,
  },
];
