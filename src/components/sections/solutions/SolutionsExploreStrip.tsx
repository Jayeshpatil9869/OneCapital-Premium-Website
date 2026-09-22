import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import { SOLUTION_PILLARS, getPillarPageHref } from '@/src/data/solutions-pillars';

/** Closing strip — dedicated page routes (not duplicate anchors). */
export function SolutionsExploreStrip() {
  return (
    <Section pad="md" className="border-t border-white/10">
      <Container>
        <RevealOnScroll className="mb-10 flex flex-col gap-3 md:max-w-xl">
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
            Go deeper
          </p>
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Explore each discipline
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SOLUTION_PILLARS.map((pillar) => (
            <Link
              key={pillar.id}
              to={getPillarPageHref(pillar.id)}
              className="oc-mobile-glass-card group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.04] sm:px-6"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                  {pillar.index}
                </span>
                <span className="font-sans text-base font-medium tracking-tight text-white md:text-lg">
                  {pillar.title}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/35 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
