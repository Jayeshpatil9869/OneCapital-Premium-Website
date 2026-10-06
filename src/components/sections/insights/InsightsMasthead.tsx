import { Link } from 'react-router-dom';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import { INSIGHT_THEMES, INSIGHTS_PAGE } from '@/src/data/insights';

export function InsightsMasthead() {
  const { hero } = INSIGHTS_PAGE;

  return (
    <section className="w-full bg-black text-white">
      <Container className="pb-16 pt-[max(8.5rem,env(safe-area-inset-top))] sm:pb-20 lg:pb-24">
        <RevealOnScroll trigger="load">
        <h1 className="max-w-[12ch] font-sans text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.2rem]">
          <span className="block">{hero.line1}</span>
          <span className="block font-medium text-white/45">{hero.line2}</span>
        </h1>
        <p className="mt-8 max-w-[38rem] text-[15px] font-light leading-[1.65] text-white/80 sm:text-base lg:text-lg">
          {hero.description}
        </p>
        <nav aria-label="Themes on this page" className="mt-12 border-t border-white/15 pt-6">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3">
            {INSIGHT_THEMES.map((theme) => (
              <li key={theme.id}>
                <a
                  href={`#${theme.id}`}
                  className="text-sm font-medium tracking-tight text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {theme.theme}
                </a>
              </li>
            ))}
            <li className="sm:ml-auto">
              <Link
                to="/blog"
                className="text-sm font-medium tracking-tight text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                All notes
              </Link>
            </li>
          </ul>
        </nav>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
