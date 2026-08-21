import { Link } from 'react-router-dom';
import {
  Accordion,
  BodyText,
  Button,
  Card,
  Container,
  DisplayHeading,
  Eyebrow,
  Label,
  Section,
  SectionHeading,
  Stack,
  Surface,
} from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Magnetic } from '@/src/components/motion/Magnetic';
import { InfiniteMarquee } from '@/src/components/motion/InfiniteMarquee';
import { Spotlight } from '@/src/components/effects/Spotlight';
import { GridBackground, Noise } from '@/src/components/effects/Atmosphere';
import { BentoGrid, BentoItem } from '@/src/components/sections/bento/BentoGrid';
import { MetricStrip } from '@/src/components/sections/cta/MetricStrip';
import { CtaBand } from '@/src/components/sections/cta/CtaBand';
import { HeroEditorial } from '@/src/components/sections/hero/HeroEditorial';
import {
  componentRegistry,
  componentRegistryByCategory,
} from '@/src/lib/component-registry';
import { motionTokens } from '@/src/lib/motion';

const categories = Object.keys(componentRegistryByCategory) as Array<
  keyof typeof componentRegistryByCategory
>;

export default function DesignSystem() {
  return (
    <div className="w-full pb-24">
      <Section pad="lg" className="border-b border-white/10 overflow-hidden">
        <GridBackground />
        <Container className="relative z-10 pt-16">
          <Eyebrow className="mb-6">Internal · Design System</Eyebrow>
          <DisplayHeading className="mb-6 max-w-4xl">
            OneCapital <span className="text-white/40">component lab.</span>
          </DisplayHeading>
          <BodyText className="max-w-2xl mb-10">
            Motion-aware primitives for building premium pages without copying
            demos. Built on React, Tailwind, GSAP, and Lenis — same brand language
            as the marketing site.
          </BodyText>
          <div className="flex flex-wrap gap-4">
            <Button to="/" variant="secondary" arrow="right">
              Back to site
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                document.getElementById('registry')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Jump to registry
            </Button>
          </div>
        </Container>
      </Section>

      {/* Tokens */}
      <Section pad="md">
        <Container>
          <SectionHeading className="mb-8">Motion tokens</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-sm">
            <Surface className="p-6">
              <Label className="mb-4 block">Duration</Label>
              <pre className="text-white/70 whitespace-pre-wrap">
                {JSON.stringify(motionTokens.duration, null, 2)}
              </pre>
            </Surface>
            <Surface className="p-6">
              <Label className="mb-4 block">Ease</Label>
              <pre className="text-white/70 whitespace-pre-wrap">
                {JSON.stringify(motionTokens.ease, null, 2)}
              </pre>
            </Surface>
            <Surface className="p-6">
              <Label className="mb-4 block">Stagger</Label>
              <pre className="text-white/70 whitespace-pre-wrap">
                {JSON.stringify(motionTokens.stagger, null, 2)}
              </pre>
            </Surface>
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section pad="md" tone="panel">
        <Container>
          <SectionHeading className="mb-8">Buttons</SectionHeading>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" arrow="right">
              Primary
            </Button>
            <Button variant="secondary" arrow="up-right">
              Secondary
            </Button>
            <Button variant="magnetic" arrow="right">
              Magnetic
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="pill" size="sm">
              Pill
            </Button>
            <Button variant="glow">Glow</Button>
            <Button variant="text" arrow="up-right">
              Text link
            </Button>
          </div>
        </Container>
      </Section>

      {/* Cards + Spotlight */}
      <Section pad="md">
        <Container>
          <SectionHeading className="mb-8">Cards & spotlight</SectionHeading>
          <BentoGrid columns={3}>
            <BentoItem size="lg">
              <Card variant="spotlight" className="h-full min-h-[240px] p-10">
                <Card.Eyebrow>Spotlight</Card.Eyebrow>
                <Card.Title>Pointer-lit glass</Card.Title>
                <Card.Description>
                  Move across this surface — illumination follows without a continuous RAF loop.
                </Card.Description>
              </Card>
            </BentoItem>
            <BentoItem>
              <Card variant="feature" className="h-full">
                <Card.Title as="h3">Feature</Card.Title>
                <Card.Description>Composable slots for marketing blocks.</Card.Description>
                <Card.Meta>Variant · feature</Card.Meta>
              </Card>
            </BentoItem>
            <BentoItem>
              <Magnetic>
                <Card variant="bento" className="h-full">
                  <Card.Title as="h3">Magnetic card</Card.Title>
                  <Card.Description>Subtle pull toward the cursor on fine pointers.</Card.Description>
                </Card>
              </Magnetic>
            </BentoItem>
          </BentoGrid>
        </Container>
      </Section>

      {/* Reveal */}
      <Section pad="md" tone="light">
        <Container>
          <RevealOnScroll>
            <SectionHeading className="mb-4 text-black">Reveal on scroll</SectionHeading>
            <p className="text-black/60 max-w-xl text-lg">
              Shared GSAP/ScrollTrigger primitive — respects prefers-reduced-motion.
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      <MetricStrip
        metrics={[
          { label: 'Components', value: String(componentRegistry.length), suffix: '' },
          { label: 'Categories', value: String(categories.length), suffix: '' },
          { label: 'Motion engine', value: 'GSAP', suffix: '' },
          { label: 'Scroll', value: 'Lenis', suffix: '' },
        ]}
      />

      {/* Marquee */}
      <Section pad="sm" className="border-y border-white/10 overflow-hidden">
        <InfiniteMarquee speed="slow" className="py-6">
          {['Wealth', 'Continuity', 'Discipline', 'Mandate', 'Legacy', 'Precision'].map(
            (word) => (
              <span
                key={word}
                className="text-2xl md:text-4xl font-medium tracking-tight text-white/30 uppercase"
              >
                {word}
                <span className="mx-8 text-white/10">—</span>
              </span>
            )
          )}
        </InfiniteMarquee>
      </Section>

      {/* Accordion */}
      <Section pad="md">
        <Container narrow>
          <SectionHeading className="mb-8">Accordion / FAQ</SectionHeading>
          <Accordion
            items={[
              {
                title: 'Why GSAP instead of Framer Motion?',
                content:
                  'This site already runs Lenis + ScrollTrigger. Centralizing on GSAP avoids dual animation runtimes and keeps scroll choreography coherent.',
              },
              {
                title: 'How do I add a new component?',
                content:
                  'Build under components/ui|motion|effects|sections, document usage, and register it in lib/component-registry.ts.',
              },
              {
                title: 'Is /design-system public?',
                content:
                  'It is a development lab route. Gate or remove it in production if you prefer a closed catalog.',
              },
            ]}
          />
        </Container>
      </Section>

      {/* Mini hero demo */}
      <HeroEditorial
        className="min-h-[70vh] border-t border-white/10"
        eyebrow="Hero · Editorial"
        title={
          <>
            Compose pages
            <span className="block text-white/50">from the system.</span>
          </>
        }
        description="HeroEditorial wires eyebrow, display type, body, CTAs, and an optional visual with load-timed reveals."
        actions={
          <>
            <Button to="/contact" variant="primary" arrow="right">
              Primary CTA
            </Button>
            <Button to="/solutions" variant="text" arrow="up-right">
              Secondary
            </Button>
          </>
        }
        visual={
          <Spotlight className="rounded-t-3xl">
            <Surface className="rounded-t-3xl border-b-0 p-10 min-h-[28vh] relative overflow-hidden">
              <Noise />
              <Label>Visual plane · WebGL-ready slot</Label>
              <p className="mt-4 text-2xl font-medium tracking-tight max-w-md">
                Drop media, charts, or a future shader surface here.
              </p>
            </Surface>
          </Spotlight>
        }
      />

      <CtaBand
        title="Start composing."
        description="Use the registry below as the source of truth for AI agents and humans."
        action={
          <Button
            variant="primary"
            arrow="right"
            onClick={() =>
              document.getElementById('registry')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Open registry
          </Button>
        }
      />

      {/* Registry */}
      <Section pad="md" id="registry" className="border-t border-white/10">
        <Container>
          <SectionHeading className="mb-4">Component registry</SectionHeading>
          <BodyText className="mb-12 max-w-2xl">
            {componentRegistry.length} registered building blocks across {categories.length}{' '}
            categories.
          </BodyText>
          <Stack gap="xl">
            {categories.map((cat) => (
              <div key={cat}>
                <Label className="mb-6 block capitalize">{cat}</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {componentRegistryByCategory[cat].map((entry) => (
                    <Surface key={entry.name} className="p-6 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-medium tracking-tight">{entry.name}</h3>
                        <span className="text-[10px] uppercase tracking-widest font-mono text-white/40 shrink-0">
                          {entry.performance}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {entry.description}
                      </p>
                      <code className="text-xs font-mono text-white/50 break-all">
                        {entry.usage}
                      </code>
                      <p className="text-xs text-white/30 font-mono">{entry.path}</p>
                      <p className="text-xs text-text-muted">{entry.a11y}</p>
                    </Surface>
                  ))}
                </div>
              </div>
            ))}
          </Stack>
          <p className="mt-16 text-sm text-text-muted">
            Lab only —{' '}
            <Link to="/" className="underline underline-offset-4 hover:text-white">
              return home
            </Link>
            .
          </p>
        </Container>
      </Section>
    </div>
  );
}
