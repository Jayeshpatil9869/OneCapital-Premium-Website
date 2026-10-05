import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import { SOLUTION_PILLARS, getPillarAnchorHref } from '@/src/data/solutions-pillars';

export function SolutionsPillarsNav() {
  return (
    <Section pad="lg" id="pillars" className="scroll-mt-24">
      <Container>
        <RevealOnScroll className="mb-12 flex flex-col gap-4 md:mb-16 md:max-w-2xl">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
            Our Solutions
          </p>
          <h2 className="font-sans text-[clamp(1.85rem,1rem+2.5vw,3rem)] font-semibold tracking-tight text-white">
            One integrated mandate
          </h2>
          <p className="font-sans text-base font-light leading-relaxed text-white/55 md:text-lg">
            The plan, the investments, the risks around them, and a review of what you already hold.
          </p>
        </RevealOnScroll>

        <div className="flex flex-col border-t border-white/10">
          {SOLUTION_PILLARS.map((pillar) => (
            <RevealOnScroll key={pillar.id}>
              <Link
                to={getPillarAnchorHref(pillar.id)}
                className="group grid grid-cols-1 items-center gap-3 border-b border-white/10 py-7 transition-colors duration-500 hover:bg-white/[0.025] md:grid-cols-12 md:gap-8 md:py-9"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/35 md:col-span-1">
                  {pillar.index}
                </span>
                <span className="font-sans text-xl font-medium tracking-tight text-white transition-colors group-hover:text-white md:col-span-4 md:text-2xl">
                  {pillar.title}
                </span>
                <span className="font-sans text-sm font-light leading-relaxed text-white/50 md:col-span-6 md:text-[15px]">
                  {pillar.summary}
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/35 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white md:col-span-1 md:justify-end">
                  View
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
