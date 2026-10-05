import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { Container } from '@/src/components/ui';
import { gsap, motionTokens, prefersReducedMotion } from '@/src/lib/motion';
import { INSIGHT_THEMES, type InsightTheme } from '@/src/data/insights';

gsap.registerPlugin(useGSAP);

export function InsightsThemeIndex() {
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list || prefersReducedMotion()) return;

      const rows = list.querySelectorAll<HTMLElement>('[data-theme-row]');
      gsap.fromTo(
        rows,
        { clipPath: 'inset(14% 0% 14% 0%)', autoAlpha: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          autoAlpha: 1,
          duration: motionTokens.duration.slow,
          ease: motionTokens.ease.premium,
          stagger: motionTokens.stagger.relaxed,
          scrollTrigger: {
            trigger: list,
            start: 'top 78%',
          },
        },
      );
    },
    { scope: listRef },
  );

  return (
    <section className="w-full border-t border-white/10 bg-black text-white" aria-labelledby="insight-theme-index-heading">
      <Container className="py-20 md:py-28">
        <div className="max-w-3xl">
          <h2
            id="insight-theme-index-heading"
            className="font-sans text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white"
          >
            Themes we watch with clients.
          </h2>
        </div>

        <ol ref={listRef} className="mt-14 border-t border-white/15">
          {INSIGHT_THEMES.map((theme) => (
            <li key={theme.id}>
              <ThemeRow theme={theme} />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ThemeRow({ theme }: { theme: InsightTheme }) {
  return (
    <article id={theme.id} data-theme-row className="scroll-mt-28 border-b border-white/15">
      <Link
        to={theme.href}
        className="group grid grid-cols-1 items-center gap-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:grid-cols-12 md:gap-8 md:py-10"
      >
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-white">{theme.theme}</p>
          <p className="mt-1 text-sm text-white/55">{theme.period}</p>
        </div>
        <div className="md:col-span-6">
          <h3 className="text-balance text-2xl font-medium leading-snug tracking-[-0.02em] text-white md:text-[1.75rem]">
            {theme.headline}
          </h3>
          <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-white/75 md:text-lg">
            {theme.mandate}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
            {theme.cta}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
        <div className="overflow-hidden md:col-span-4">
          <img
            src={theme.image}
            alt=""
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>
    </article>
  );
}
