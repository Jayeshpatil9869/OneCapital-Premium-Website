import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/src/components/ui';
import { INSIGHT_ARTICLES } from '@/src/data/insights';

export function InsightsFeaturedNote() {
  const [featured, ...rest] = INSIGHT_ARTICLES;
  if (!featured) return null;

  return (
    <section className="w-full bg-black text-white" aria-labelledby="featured-note-heading">
      <Link
        to={featured.href}
        className="group relative block w-full min-h-[70svh] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-white"
      >
        <img
          src={featured.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.72)_28%,rgba(0,0,0,0.15)_62%,rgba(0,0,0,0.35)_100%)]" />
        <Container className="relative flex min-h-[70svh] flex-col justify-end pb-12 pt-28 sm:pb-16">
          <p className="text-sm text-white/80">
            {featured.category}
            <span className="mx-2 text-white/40" aria-hidden>
              /
            </span>
            {featured.readTime} read
          </p>
          <h2
            id="featured-note-heading"
            className="mt-4 max-w-[18ch] text-balance font-sans text-[clamp(2rem,1.1rem+2.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
          >
            {featured.title}
          </h2>
          <p className="mt-5 max-w-[36rem] text-base leading-relaxed text-white/85 sm:text-lg">
            {featured.excerpt}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
            Discuss with an advisor
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </Container>
      </Link>

      {rest.length > 0 ? (
        <Container className="border-t border-white/15">
          <h3 className="sr-only">More notes</h3>
          <ul>
            {rest.map((article) => (
              <li key={article.id} className="border-b border-white/15">
                <Link
                  to={article.href}
                  className="group grid grid-cols-1 gap-2 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-7"
                >
                  <span className="text-sm text-white/60 sm:col-span-3">{article.category}</span>
                  <span className="text-lg font-medium leading-snug tracking-tight text-white sm:col-span-7">
                    {article.title}
                  </span>
                  <span className="inline-flex items-center justify-between gap-3 text-sm text-white/60 sm:col-span-2 sm:justify-end">
                    {article.readTime}
                    <ArrowUpRight
                      className="h-4 w-4 text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}
    </section>
  );
}
