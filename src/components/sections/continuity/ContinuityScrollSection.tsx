import { Button, Container, SectionHeading } from '@/src/components/ui';

export function ContinuityScrollSection() {
  return (
    <section
      className="relative z-10 w-full bg-black border-b border-white/10 py-[var(--space-section-sm)] overflow-hidden"
      aria-labelledby="continuity-heading"
    >
      <Container>
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
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
              At OneCapital, we steward capital through an institutional lens — bringing the
              discipline, research, and precision of large-scale asset management to the private
              mandates of select principals, families, and organizations.
            </p>

            <p>
              Our approach is architectural, not transactional. We design financial structures
              built to withstand market cycles, preserve after-tax outcomes, and transfer not
              merely wealth, but the principles behind it, across generations.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
