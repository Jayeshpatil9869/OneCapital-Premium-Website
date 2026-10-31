import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { HOME_SEO } from '@/src/data/home-seo';
import { OFFICE_LOCATIONS, PRESENCE_STATS } from '@/src/data/office-locations';

import { cn } from '@/src/lib/utils';

import { IndiaDotMap } from './IndiaDotMap';

export function OfficesPresenceSection() {
  return (
    <Section
      pad="none"
      className="pt-10 md:pt-14 pb-[var(--space-section-sm)]"
      aria-labelledby="offices-presence-heading"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <RevealOnScroll className="lg:col-span-6 overflow-visible">
            <div className="oc-map-stage">
              <IndiaDotMap offices={OFFICE_LOCATIONS} />
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-6 flex flex-col gap-10">
            <RevealOnScroll delay={0.08}>
              <div className="flex flex-col gap-5">
                <Eyebrow>Our Presence</Eyebrow>
                <SectionHeading id="offices-presence-heading">
                  {HOME_SEO.h2.approach}
                </SectionHeading>
                <BodyText className="text-base md:text-lg max-w-xl text-text-muted leading-relaxed">
                  {HOME_SEO.approachIntro} Based in Pune, with offices in Mumbai, Nashik, and
                  Kolhapur.
                </BodyText>
                <div className="mt-2 flex flex-wrap gap-3">
                  <Button to="/approach" variant="outline" size="sm" arrow="right">
                    Read our approach
                  </Button>
                  <Button to="/contact" variant="primary" size="sm" arrow="up-right">
                    {HOME_SEO.cta}
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.16}>
              {/* 2×2 on all viewports — same as desktop */}
              <div className="grid grid-cols-2">
                {PRESENCE_STATS.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={cn(
                      'flex flex-col gap-1.5 px-4 py-5 sm:gap-2 sm:px-6 sm:py-7 md:px-8 md:py-8',
                      index < 2 && 'border-b border-white/10',
                      index % 2 === 0 && 'border-r border-white/10',
                    )}
                  >
                    <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-[14rem]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </Section>
  );
}
