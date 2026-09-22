import { CalendarCheck, ShieldCheck, Users } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Container,
  Section,
  Eyebrow,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { ABOUT_PAGE } from '@/src/data/about';
import { cn } from '@/src/lib/utils';

const VALUE_ICONS = [CalendarCheck, ShieldCheck, Users] as const;

export function AboutCoreValues() {
  const { values } = ABOUT_PAGE;

  return (
    <Section
      pad="none"
      className="pt-[var(--space-section)] pb-16 md:pb-20 text-white"
      aria-labelledby="core-values-heading"
    >
      <Container>
        <RevealOnScroll className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-5 text-center md:mb-20">
          <Eyebrow centered>{values.eyebrow}</Eyebrow>
          <SectionHeading id="core-values-heading" className="text-white">
            {values.heading}
          </SectionHeading>
          <BodyText className="mx-auto max-w-xl text-base md:text-lg">
            {values.subtext}
          </BodyText>
        </RevealOnScroll>

        <RevealOnScroll stagger={0.06} className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {values.items.map((val, index) => {
            const Icon = VALUE_ICONS[index] ?? Users;
            return (
              <article
                key={val.title}
                className={cn(
                  'oc-mobile-glass-card group relative flex flex-col justify-start rounded-3xl p-8 sm:p-10',
                  'glass-panel glass-panel-hover border border-white/10 bg-white/[0.02]',
                  'transition-colors duration-500 hover:border-white/20',
                )}
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 transition-colors duration-500 group-hover:border-white/25">
                  <Icon className="h-6 w-6 text-white" aria-hidden />
                </div>

                <h3 className="mb-4 text-2xl font-medium leading-snug tracking-tight text-white">
                  {val.title}
                </h3>

                <BodyText className="text-base md:text-lg">{val.description}</BodyText>
              </article>
            );
          })}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
