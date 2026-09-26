import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import { BLOG_PAGE, type InsightFilter, INSIGHT_CATEGORIES } from '@/src/data/insights';
import { InsightsBreadcrumb } from './InsightsBreadcrumb';
import { cn } from '@/src/lib/utils';

type BlogMastheadProps = {
  filter: InsightFilter;
  onFilterChange: (filter: InsightFilter) => void;
};

export function BlogMasthead({ filter, onFilterChange }: BlogMastheadProps) {
  const { hero } = BLOG_PAGE;

  return (
    <section className="relative w-full overflow-x-hidden bg-black pt-[max(7.5rem,env(safe-area-inset-top))] text-white">
      <Container className="mx-auto w-full max-w-[1400px] px-6 pb-10 sm:px-8 sm:pb-12 lg:px-12 lg:pb-14">
        <RevealOnScroll
          trigger="load"
          direction="up"
          distance={28}
          duration={1}
          delay={0.08}
          ease="power3.out"
        >
          <InsightsBreadcrumb current="Blog" />
          <h1 className="mt-6 max-w-[14ch] font-sans text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:mt-8 sm:text-6xl md:text-7xl lg:text-[4.2rem]">
            <span className="block">{hero.line1}</span>
            <span className="block font-medium text-white/40">{hero.line2}</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll
          trigger="load"
          direction="up"
          distance={20}
          duration={0.95}
          delay={0.2}
          ease="power3.out"
          className="mt-8 sm:mt-10"
        >
          <p className="max-w-[36rem] border-t border-white/15 pt-6 font-sans text-[15px] font-light leading-[1.65] text-white/80 sm:pt-8 sm:text-base lg:text-lg">
            {hero.description}
          </p>

          <div
            role="toolbar"
            aria-label="Filter notes by category"
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 sm:mt-12"
          >
            {INSIGHT_CATEGORIES.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onFilterChange(category)}
                  className={cn(
                    'relative pb-1 text-[11px] font-mono uppercase tracking-[0.16em] transition-colors duration-300',
                    active ? 'text-white' : 'text-white/40 hover:text-white/70',
                  )}
                >
                  {category === 'Behavioral Finance' ? 'Behaviour' : category}
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-px h-px bg-[var(--color-gold-warm)]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
