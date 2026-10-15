export type Testimonial = {
  id: string;
  quote: string;
  /** Display name — anonymized until real client attribution is approved. */
  client: string;
  role: string;
  category: string;
  /** Optional photo URL; when omitted, UI shows initials in a circular avatar. */
  avatarSrc?: string;
};

/**
 * Client voice pieces from approved fact pack — no invented names or return claims.
 */
export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: 'trusted-advisory',
    quote:
      'One Capital eliminated 22 overlapping mutual funds from my portfolio and consolidated everything into a focused equity PMS held directly in my Demat. Their quarterly reviews give me complete transparency on performance.',
    client: 'Senior Tech Executive',
    role: 'Pune (HNW Portfolio)',
    category: 'PMS & Asset Consolidation',
  },
  {
    id: 'right-products',
    quote:
      'Unlike traditional banks that pushed high-commission NFOs and insurance, One Capital structured an asset allocation model strictly aligned with my family’s tax bracket and liquidity timeline. Genuine fiduciary advice.',
    client: 'Family Business Owner',
    role: 'Mumbai (Wealth Mandate)',
    category: 'Tax & Asset Allocation',
  },
  {
    id: 'investment-confidence',
    quote:
      'Their curated alternative funds and quantitative options hedging cushioned my portfolio during volatile quarters. It is institutional-grade wealth management with direct access to decision-makers.',
    client: 'Corporate Director',
    role: 'Kolhapur (AIF & Hedging)',
    category: 'Capital Protection',
  },
];
