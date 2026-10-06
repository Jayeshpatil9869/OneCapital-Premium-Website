import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Button, Container, SectionHeading } from '@/src/components/ui';

export function ContinuityScrollSection() {
  return (
    <section
      className="relative z-10 w-full bg-black border-b border-white/10 py-[var(--space-section-sm)] overflow-hidden"
      aria-labelledby="continuity-heading"
    >
      <Container>
        <RevealOnScroll className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <SectionHeading
              id="continuity-heading"
              className="text-white"
            >
              Wealth is more than capital. It is continuity.
            </SectionHeading>

            <Button
              to="/about"
              variant="text"
              arrow="right"
              className="w-fit text-white hover:opacity-60"
            >
              Our Story
            </Button>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6 text-lg md:text-xl leading-relaxed font-light text-balance text-white/55">
            <p>
              ONE CAPITAL INVESTMENT PRIVATE LIMITED is a Pune-based firm focused on helping
              individuals and businesses grow wealth through strategic investment advisory,
              portfolio management, and long-term wealth planning.
            </p>

            <p>
              Our approach combines market insight, risk management, and personalized strategy —
              spanning mutual funds, portfolio mandates, wealth planning, tax awareness, and
              thoughtfully evaluated alternative allocations where appropriate.
            </p>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
