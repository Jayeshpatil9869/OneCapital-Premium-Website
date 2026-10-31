import { Button, BodyText, Container, Section } from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { HOME_SEO } from '@/src/data/home-seo';

/** Homepage H2 — Financial Planning for Your Future (audit). */
export function HomePlanningSeoSection() {
  return (
    <Section
      pad="none"
      className="bg-black py-16 md:py-20"
      aria-labelledby="home-planning-heading"
    >
      <Container>
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <h2
            id="home-planning-heading"
            className="text-[clamp(1.5rem,1rem+2vw,2.75rem)] font-semibold tracking-tight text-white leading-tight text-balance"
          >
            {HOME_SEO.h2.financialPlanning}
          </h2>
          <BodyText className="mt-5 text-base md:text-lg text-white/65">
            {HOME_SEO.planningIntro}
          </BodyText>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button to="/contact" variant="primary" size="md" arrow="up-right">
              {HOME_SEO.cta}
            </Button>
            <Button to="/calculators" variant="outline" size="md" arrow="right">
              Explore calculators
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
