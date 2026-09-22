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
      'Working with One Capital has made investing much easier for me. The team takes the time to understand my financial goals and risk profile before suggesting any investment. Their advice is practical, transparent, and focused on long-term wealth creation. I especially appreciate the regular portfolio reviews and guidance whenever I need to make an important investment decision.',
    client: 'Private Client',
    role: 'Individual Investor',
    category: 'Trusted Advisory',
  },
  {
    id: 'right-products',
    quote:
      'I was looking for professional guidance to build a diversified investment portfolio. One Capital helped me understand different products and their suitability instead of simply recommending investments. Their team explained the risks, expected returns, and investment horizon clearly, which helped me make decisions with confidence. I value their continuous support and personalized approach.',
    client: 'Private Client',
    role: 'Portfolio Client',
    category: 'Right Products & Portfolio',
  },
  {
    id: 'investment-confidence',
    quote:
      'Before working with One Capital, I often found it difficult to decide where and when to invest. Their advisory approach helped me understand my options and make more informed investment decisions. From portfolio planning to selecting suitable investment products, the team has been supportive throughout. Their focus on understanding the client\'s needs rather than just selling a product is what I value most.',
    client: 'Private Client',
    role: 'Individual Investor',
    category: 'Investment Decisions with Confidence',
  },
];
