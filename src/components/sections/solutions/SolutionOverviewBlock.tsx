import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import type { SolutionOverviewConfig } from '@/src/data/solutions-pages';
import { getPillarById, getPillarPageHref } from '@/src/data/solutions-pillars';
import { cn } from '@/src/lib/utils';
import { SolutionVisualization } from './visualizations/SolutionVisualization';

type SolutionOverviewBlockProps = {
  config: SolutionOverviewConfig;
};

export function SolutionOverviewBlock({ config }: SolutionOverviewBlockProps) {
  const pillar = getPillarById(config.id);
  if (!pillar) return null;

  return (
    <section
      id={config.id}
      aria-labelledby={`overview-${config.id}`}
      className="scroll-mt-28 border-t border-white/10"
    >
      <Container className="py-[var(--space-section-sm)] lg:py-[var(--space-section)]">
        <div
          className={cn(
            'grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16',
            config.reversed && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <RevealOnScroll className="flex flex-col gap-7 lg:col-span-6">
            <div className="flex flex-col gap-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">
                {pillar.index} — {pillar.title}
              </p>
              <h2
                id={`overview-${config.id}`}
                className="max-w-xl font-sans text-[clamp(1.85rem,1rem+2.4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-white"
              >
                {config.headline}
              </h2>
              <p className="max-w-xl font-sans text-base font-light leading-relaxed text-white/60 md:text-lg">
                {config.statement}
              </p>
            </div>

            <ul className="flex flex-col border-t border-white/10">
              {pillar.services.slice(0, 4).map((service) => (
                <li key={service.id} className="border-b border-white/10 py-4 last:border-b-0">
                  <p className="font-sans text-[15px] font-medium tracking-tight text-white">
                    {service.title}
                  </p>
                  <p className="mt-1 font-sans text-sm font-light text-white/45">{service.tagline}</p>
                </li>
              ))}
            </ul>

            <Link
              to={getPillarPageHref(config.id)}
              className="group mt-2 inline-flex w-fit items-center gap-2 border-b border-white/25 pb-1 text-xs font-mono uppercase tracking-widest text-white/70 transition-colors hover:border-white hover:text-white"
            >
              Explore {pillar.title}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="flex min-h-[280px] flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:min-h-[320px] sm:p-8 lg:p-10">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
                  Framework
                </p>
                <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/55">
                  {config.flowSteps.join(' → ')}
                </p>
              </div>
              <SolutionVisualization kind={config.visual} steps={config.flowSteps} />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
