import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Eyebrow, SectionHeading, Section } from '@/src/components/ui';
import { getSiblingPillars, getPillarPageHref } from '@/src/data/solutions-pillars';

type SolutionRelatedNavProps = {
  currentPillarId: string;
};

export function SolutionRelatedNav({ currentPillarId }: SolutionRelatedNavProps) {
  const siblings = getSiblingPillars(currentPillarId);

  return (
    <Section pad="md" tone="panel" className="border-t border-white/10">
      <Container>
        <RevealOnScroll className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Eyebrow>Continue exploring</Eyebrow>
            <SectionHeading className="text-white">Related disciplines</SectionHeading>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {siblings.map((sibling) => (
              <Link
                key={sibling.id}
                to={getPillarPageHref(sibling.id)}
                className="group flex flex-col gap-3 border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/25 hover:bg-white/[0.04]"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                  {sibling.index}
                </span>
                <span className="font-sans text-lg font-medium tracking-tight text-white">{sibling.title}</span>
                <span className="font-sans text-sm font-light leading-relaxed text-white/55">{sibling.summary}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-mono uppercase tracking-widest text-white/45 transition-colors group-hover:text-white">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
