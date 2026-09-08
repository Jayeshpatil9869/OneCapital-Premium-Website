import { CalendarCheck, ShieldCheck, Users } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Container,
  Section,
  Eyebrow,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

const VALUES = [
  {
    title: 'Long-Term Planning',
    description:
      'At OneCapital, we believe true wealth is built and preserved with patience, discipline, and strategic asset allocation. We focus on long-term wealth structuring tailored to institutional standards, not short-term market speculation.',
    icon: CalendarCheck,
  },
  {
    title: 'Integrity & Transparency',
    description:
      'We operate with complete fiduciary ethics, conflict-free governance, and full fee transparency. Every allocation mandate is backed by clear reasoning, open reporting, and pure alignment with our clients’ best interests.',
    icon: ShieldCheck,
  },
  {
    title: 'Client-Centric & Customized Solutions',
    description:
      'Every family office mandate is unique. We provide personalized financial strategies tailored to individual goals, risk profiles, and life stages — ensuring a truly bespoke and relationship-driven advisory experience.',
    icon: Users,
  },
];

export function AboutCoreValues() {
  return (
    <Section
      pad="none"
      className="pt-[var(--space-section)] pb-16 md:pb-20 text-white"
      aria-labelledby="core-values-heading"
    >
      <Container>
        <RevealOnScroll className="mx-auto mb-16 flex max-w-3xl flex-col items-center gap-5 text-center md:mb-20">
          <Eyebrow centered>Core Values</Eyebrow>
          <SectionHeading id="core-values-heading" className="text-white">
            Our Core Values
          </SectionHeading>
          <BodyText className="mx-auto max-w-xl text-base md:text-lg">
            The principles that guide every decision we make and every relationship we build.
          </BodyText>
        </RevealOnScroll>

        <RevealOnScroll stagger={0.06} className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <article
                key={val.title}
                className={cn(
                  'group relative flex flex-col justify-start rounded-3xl p-8 sm:p-10',
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
