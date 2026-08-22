export type RegistryEntry = {
  name: string;
  category:
    | 'primitives'
    | 'typography'
    | 'buttons'
    | 'cards'
    | 'motion'
    | 'effects'
    | 'sections'
    | 'overlays';
  description: string;
  variants?: string[];
  dependencies: string[];
  usage: string;
  performance: 'light' | 'moderate' | 'heavy';
  a11y: string;
  path: string;
};

export const componentRegistry: RegistryEntry[] = [
  {
    name: 'Container / Section / Stack / Surface',
    category: 'primitives',
    description: 'Layout foundations aligned to max-w-7xl and section rhythm.',
    dependencies: [],
    usage: '<Container><Section tone="light" pad="lg">…</Section></Container>',
    performance: 'light',
    a11y: 'Semantic section; no ARIA required.',
    path: 'components/ui/primitives/Layout.tsx',
  },
  {
    name: 'Eyebrow / DisplayHeading / SectionHeading / BodyText',
    category: 'typography',
    description: 'Brand type scale — Geist Sans display + mono labels.',
    dependencies: [],
    usage: '<Eyebrow>Label</Eyebrow><DisplayHeading>Title</DisplayHeading>',
    performance: 'light',
    a11y: 'Use correct heading levels; as prop available.',
    path: 'components/ui/typography/Typography.tsx',
  },
  {
    name: 'Button',
    category: 'buttons',
    description: 'Unified CTA system with magnetic, pill, glow, and link modes.',
    variants: ['primary', 'secondary', 'ghost', 'outline', 'magnetic', 'text', 'pill', 'glow'],
    dependencies: ['lucide-react'],
    usage: '<Button to="/contact" variant="magnetic" arrow="right">Explore</Button>',
    performance: 'light',
    a11y: 'Focus ring; keyboard operable; magnetic off under reduced-motion.',
    path: 'components/ui/buttons/Button.tsx',
  },
  {
    name: 'Card',
    category: 'cards',
    description: 'Composable card with Media/Eyebrow/Title/Description/Meta/Action slots.',
    variants: ['default', 'glass', 'spotlight', 'feature', 'metric', 'bento'],
    dependencies: ['Spotlight'],
    usage: '<Card variant="spotlight"><Card.Title>…</Card.Title></Card>',
    performance: 'light',
    a11y: 'Prefer links wrapping cards for navigation; focus styles on interactive children.',
    path: 'components/ui/cards/Card.tsx',
  },
  {
    name: 'RevealOnScroll',
    category: 'motion',
    description: 'GSAP + ScrollTrigger reveal with direction, stagger, reduced-motion.',
    dependencies: ['gsap', '@gsap/react'],
    usage: '<RevealOnScroll direction="up" stagger={0.08}>…</RevealOnScroll>',
    performance: 'moderate',
    a11y: 'Skips animation when prefers-reduced-motion.',
    path: 'components/motion/RevealOnScroll.tsx',
  },
  {
    name: 'Magnetic',
    category: 'motion',
    description: 'Pointer-follow pull for interactive surfaces.',
    dependencies: [],
    usage: '<Magnetic strength={0.2}>…</Magnetic>',
    performance: 'light',
    a11y: 'Disabled on coarse pointer and reduced-motion.',
    path: 'components/motion/Magnetic.tsx',
  },
  {
    name: 'Parallax',
    category: 'motion',
    description: 'Scroll-scrubbed vertical parallax.',
    dependencies: ['gsap', '@gsap/react'],
    usage: '<Parallax speed={0.2}>…</Parallax>',
    performance: 'moderate',
    a11y: 'Reduced on mobile; off under reduced-motion.',
    path: 'components/motion/Parallax.tsx',
  },
  {
    name: 'TextReveal',
    category: 'motion',
    description: 'Block/line text entrance without character splitting (SEO-safe).',
    dependencies: ['gsap', '@gsap/react'],
    usage: '<TextReveal trigger="load"><h1>…</h1></TextReveal>',
    performance: 'moderate',
    a11y: 'Keeps semantic HTML; reduced-motion safe.',
    path: 'components/motion/TextReveal.tsx',
  },
  {
    name: 'InfiniteMarquee',
    category: 'motion',
    description: 'CSS-only infinite logo/text strip.',
    dependencies: [],
    usage: '<InfiniteMarquee speed="slow">…</InfiniteMarquee>',
    performance: 'light',
    a11y: 'Duplicate track aria-hidden; pauses on hover; reduced-motion stops.',
    path: 'components/motion/InfiniteMarquee.tsx',
  },
  {
    name: 'Spotlight',
    category: 'effects',
    description: 'Pointer-following radial illumination for premium surfaces.',
    variants: ['subtle', 'medium', 'strong'],
    dependencies: [],
    usage: '<Spotlight intensity="medium">…</Spotlight>',
    performance: 'light',
    a11y: 'Decorative; static fallback under reduced-motion.',
    path: 'components/effects/Spotlight.tsx',
  },
  {
    name: 'Noise / GridBackground / GlowOrb',
    category: 'effects',
    description: 'Atmospheric layers — noise texture, editorial grid, soft glow.',
    dependencies: [],
    usage: '<Noise /><GridBackground /><GlowOrb />',
    performance: 'light',
    a11y: 'aria-hidden decorative layers.',
    path: 'components/effects/Atmosphere.tsx',
  },
  {
    name: 'HeroEditorial',
    category: 'sections',
    description: 'Hero A — large typography, CTA group, optional visual plane.',
    dependencies: ['RevealOnScroll', 'GlowOrb', 'Typography'],
    usage: '<HeroEditorial eyebrow="…" title={…} actions={…} visual={…} />',
    performance: 'moderate',
    a11y: 'Semantic headings; keyboard CTAs.',
    path: 'components/sections/hero/HeroEditorial.tsx',
  },
  {
    name: 'MetricStrip',
    category: 'sections',
    description: 'KPI / trust metrics row.',
    dependencies: ['RevealOnScroll'],
    usage: '<MetricStrip metrics={[…]} />',
    performance: 'light',
    a11y: 'Plain text metrics; no live regions unless counting.',
    path: 'components/sections/cta/MetricStrip.tsx',
  },
  {
    name: 'CtaBand',
    category: 'sections',
    description: 'Panel or minimal CTA block with noise atmosphere.',
    variants: ['panel', 'minimal'],
    dependencies: ['RevealOnScroll', 'Noise'],
    usage: '<CtaBand title="…" action={<Button />} />',
    performance: 'light',
    a11y: 'Action slot must remain focusable.',
    path: 'components/sections/cta/CtaBand.tsx',
  },
  {
    name: 'BentoGrid / BentoItem',
    category: 'sections',
    description: 'Asymmetric editorial grid for feature compositions.',
    variants: ['sm', 'md', 'lg', 'full'],
    dependencies: [],
    usage: '<BentoGrid><BentoItem size="lg">…</BentoItem></BentoGrid>',
    performance: 'light',
    a11y: 'Use semantic children; stack on mobile.',
    path: 'components/sections/bento/BentoGrid.tsx',
  },
  {
    name: 'Accordion',
    category: 'overlays',
    description: 'Accessible FAQ / expandable list.',
    dependencies: [],
    usage: '<Accordion items={[{ title, content }]} />',
    performance: 'light',
    a11y: 'aria-expanded, aria-controls, region roles.',
    path: 'components/ui/overlays/Accordion.tsx',
  },
  {
    name: 'RiskFactorsStrip',
    category: 'sections',
    description: 'Home-only regulatory risk factors sub-footer below global footer.',
    dependencies: [],
    usage: '{pathname === \'/\' && <RiskFactorsStrip />}',
    performance: 'light',
    a11y: 'aside with labelled heading; external links open in new tab.',
    path: 'components/sections/legal/RiskFactorsStrip.tsx',
  },
];

export const componentRegistryByCategory = componentRegistry.reduce(
  (acc, entry) => {
    (acc[entry.category] ??= []).push(entry);
    return acc;
  },
  {} as Record<RegistryEntry['category'], RegistryEntry[]>
);
