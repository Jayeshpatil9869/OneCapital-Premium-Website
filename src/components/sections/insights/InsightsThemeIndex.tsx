import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { BodyText, Container, DisplayHeading, Eyebrow, Section } from '@/src/components/ui';
import { INSIGHT_THEMES, type InsightTheme } from '@/src/data/insights';

export function InsightsThemeIndex() {
  const lead = INSIGHT_THEMES[0];

  return (
    <Section
      pad="lg"
      className="border-y border-white/10 bg-black text-white"
      aria-labelledby="insight-theme-index-heading"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <RevealOnScroll className="flex max-w-md flex-col gap-5">
                <Eyebrow>Theme index</Eyebrow>
                <DisplayHeading id="insight-theme-index-heading" className="text-white">
                  Themes we watch with{' '}
                  <span className="text-white/40">clients.</span>
                </DisplayHeading>
                <BodyText className="text-base md:text-lg">
                  {lead?.mandate ??
                    'Editorial themes — not claimed third-party press. Each lane points to deeper reading or the advisory frameworks behind it.'}
                </BodyText>
              </RevealOnScroll>
            </div>
          </div>

          <RevealOnScroll stagger={0.06} className="flex flex-col lg:col-span-8">
            {INSIGHT_THEMES.map((theme) => (
              <ThemeRow key={theme.id} theme={theme} />
            ))}
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}

function ThemeRow({ theme }: { theme: InsightTheme }) {
  return (
    <article className="group grid grid-cols-1 gap-4 border-t border-white/10 py-8 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-6 sm:py-10">
      <div className="flex items-start gap-4 sm:col-span-3">
        <span className="font-mono text-xs text-white/35">{theme.index}</span>
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-gold-warm)]">
            {theme.theme}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            {theme.period}
          </p>
        </div>
      </div>

      <div className="sm:col-span-7">
        <h3 className="max-w-[34ch] text-balance text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
          {theme.headline}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 sm:text-[15px]">
          {theme.mandate}
        </p>
      </div>

      <div className="flex items-end sm:col-span-2 sm:justify-end">
        <Link
          to={theme.href}
          className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-white/50 transition-colors duration-300 group-hover:text-white"
        >
          {theme.cta}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
