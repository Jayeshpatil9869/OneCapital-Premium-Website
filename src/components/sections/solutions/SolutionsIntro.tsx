import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import { SOLUTIONS_HUB } from '@/src/data/solutions-pages';

export function SolutionsIntro() {
  const { intro } = SOLUTIONS_HUB;

  return (
    <Section tone="dark" pad="lg" className="border-y border-white/10">
      <Container className="max-w-4xl text-center">
        <RevealOnScroll className="flex flex-col items-center gap-8 md:gap-10">
          <h2 className="max-w-3xl text-balance font-sans text-[clamp(1.85rem,1rem+2.8vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-white">
            {intro.statement}
          </h2>
          <p className="mx-auto max-w-2xl font-sans text-base font-light leading-relaxed text-white/60 md:text-lg">
            {intro.body}
          </p>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
