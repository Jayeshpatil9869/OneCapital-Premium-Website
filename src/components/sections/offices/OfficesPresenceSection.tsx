import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
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
            <IndiaDotMap offices={OFFICE_LOCATIONS} />
          </RevealOnScroll>

          <div className="lg:col-span-6 flex flex-col gap-10">
            <RevealOnScroll delay={0.08}>
              <div className="flex flex-col gap-5">
                <Eyebrow>Our Presence</Eyebrow>
                <SectionHeading id="offices-presence-heading">
                  Advisory rooted in Maharashtra.
                </SectionHeading>
                <BodyText className="text-base md:text-lg max-w-xl">
                  OneCapital serves principals and families from four regional offices —
                  combining local access with institutional discipline. Hover a location
                  on the map to explore each office.
                </BodyText>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.16}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {PRESENCE_STATS.map((stat, index) => (
                  <div
                    key={stat.id}
                    className={cn(
                      'flex flex-col gap-2 px-6 py-7 md:px-8 md:py-8',
                      index < 2 && 'border-b border-white/10',
                      index % 2 === 0 && 'border-r border-white/10',
                    )}
                  >
                    <p className="text-3xl md:text-4xl font-medium tracking-tight text-white tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-sm text-text-muted leading-relaxed max-w-[14rem]">
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
