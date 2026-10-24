import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import type { InsightArticle } from '@/src/data/insights';

type BlogArchiveListProps = {
  articles: InsightArticle[];
};

export function BlogArchiveList({ articles }: BlogArchiveListProps) {
  return (
    <Section
      pad="none"
      className="bg-black pb-[var(--space-section)] text-white"
      aria-labelledby="blog-archive-heading"
    >
      <Container>
        <h2 id="blog-archive-heading" className="sr-only">
          Blog archive
        </h2>

        {articles.length === 0 ? (
          <p className="border-t border-white/10 py-12 text-sm text-white/50">
            No notes in this category yet.
          </p>
        ) : (
          <RevealOnScroll
            stagger={0.06}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {articles.map((article) => (
              <Link
                key={article.id}
                to={article.href}
                className="group flex h-full flex-col overflow-hidden border border-white/10 bg-[#111] transition-colors duration-300 hover:border-white/25"
              >
                <div className="aspect-[16/9] overflow-hidden bg-[#1D1D1D]">
                  <img
                    src={article.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#757575]">
                    {article.category}
                    <span className="mx-2 text-white/20" aria-hidden>
                      /
                    </span>
                    {article.readTime}
                  </p>
                  <h3 className="mt-3 font-sans text-xl font-medium leading-snug tracking-[-0.03em] text-white">
                    {article.title}
                  </h3>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-white">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </RevealOnScroll>
        )}
      </Container>
    </Section>
  );
}
