import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { HOME_SOLUTIONS, type HomeSolution } from '@/src/data/home-solutions';
import { cn } from '@/src/lib/utils';

function SolutionLabel({ index, category }: Pick<HomeSolution, 'index' | 'category'>) {
  return (
    <p className="text-xs font-mono uppercase tracking-widest text-white/40">
      {index} · {category}
    </p>
  );
}

function SolutionHighlights({ highlights }: Pick<HomeSolution, 'highlights'>) {
  return (
    <ul className="flex flex-wrap gap-2 mt-6">
      {highlights.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function SolutionCard({ solution }: { solution: HomeSolution }) {
  return (
    <Link
      to={solution.href}
      className={cn(
        'group flex h-full flex-col justify-between glass-panel rounded-3xl p-8 md:p-10',
        'oc-card-hover-glow transition-colors duration-500 hover:border-white/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      )}
    >
      <div>
        <SolutionLabel index={solution.index} category={solution.category} />
        <h3 className="mt-4 text-2xl font-medium tracking-tight text-white">{solution.title}</h3>
        <p className="mt-3 text-base text-text-muted leading-relaxed">{solution.subtitle}</p>
        <SolutionHighlights highlights={solution.highlights} />
      </div>
      <span className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-white/50 group-hover:text-white transition-colors duration-500">
        Learn more
        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function SolutionsOverviewSection() {
  return (
    <Section tone="panel" pad="lg" aria-labelledby="solutions-overview-heading">
      <Container>
        <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 md:mb-20">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Eyebrow>Our Solutions</Eyebrow>
            <SectionHeading id="solutions-overview-heading">
              One connected view of your wealth.
            </SectionHeading>
            <BodyText className="text-base md:text-lg max-w-2xl">
              Advisory, portfolio mandates, fund selection, and planning — structured as one
              integrated offering so every decision serves your long-term mandate.
            </BodyText>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end lg:items-end">
            <Button to="/solutions" variant="pill" size="sm" arrow="up-right" className="w-fit">
              View all solutions
            </Button>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {HOME_SOLUTIONS.map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
