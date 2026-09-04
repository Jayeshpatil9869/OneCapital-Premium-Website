import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Button,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { HOME_PILLAR_PREVIEWS, type HomePillarPreview } from '@/src/data/solutions-pillars';
import { cn } from '@/src/lib/utils';
import { prefersReducedMotion } from '@/src/lib/motion';

function PillarHighlights({ highlights }: Pick<HomePillarPreview, 'highlights'>) {
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

function PillarCard({ pillar }: { pillar: HomePillarPreview }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !lineRef.current) return;
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !lineRef.current) return;
    gsap.to(lineRef.current, {
      scaleX: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });
  };

  return (
    <Link
      to={pillar.href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className={cn(
        'group flex h-full flex-col justify-between glass-panel rounded-3xl p-8 md:p-10',
        'oc-card-hover-glow transition-colors duration-500 hover:border-white/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      )}
    >
      <div>
        <h3 className="text-2xl font-medium tracking-tight text-white">{pillar.title}</h3>
        <p className="mt-3 text-base text-text-muted leading-relaxed">{pillar.summary}</p>
        <PillarHighlights highlights={pillar.highlights} />
      </div>
      <div className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-white/50 group-hover:text-white transition-colors duration-500">
        <span className="relative inline-block pb-1">
          Explore pillar
          <span
            ref={lineRef}
            className="absolute bottom-0 left-0 h-[2px] w-full bg-white origin-left scale-x-0"
            aria-hidden
          />
        </span>
        <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
      </div>
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
              Capital stewardship, structured in four disciplines.
            </SectionHeading>
            <BodyText className="text-base md:text-lg max-w-2xl">
              Strategy, portfolio management, risk architecture, and oversight — integrated as one
              mandate so every decision serves long-term capital preservation and deliberate growth.
            </BodyText>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end lg:items-end">
            <Button to="/solutions" variant="pill" size="sm" arrow="up-right" className="w-fit">
              View all solutions
            </Button>
          </div>
        </RevealOnScroll>

        <RevealOnScroll stagger={0.06} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {HOME_PILLAR_PREVIEWS.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
