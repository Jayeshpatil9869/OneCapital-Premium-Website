import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { BodyText, Container, Label, Section } from '@/src/components/ui';
import { INSIGHT_ARTICLES } from '@/src/data/insights';

export function InsightsFeaturedNote() {
  const article = INSIGHT_ARTICLES[0];
  if (!article) return null;

  return (
    <Section pad="lg" className="bg-black text-white" aria-labelledby="featured-note-heading">
      <Container>
        <RevealOnScroll>
          <p className="mb-8 text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
            Featured note
          </p>
          <article className="grid grid-cols-1 items-center gap-10 border-t border-white/10 pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-14">
            <div className="relative aspect-[16/11] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[22rem]">
              <img
                src={article.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
            </div>

            <div className="flex flex-col gap-5 lg:col-span-5">
              <div className="flex flex-wrap items-center gap-3">
                <Label className="text-text-muted">{article.category}</Label>
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/35">
                  {article.readTime} read
                </span>
              </div>
              <h2
                id="featured-note-heading"
                className="max-w-[22ch] text-balance font-sans text-[clamp(1.65rem,1rem+1.8vw,2.5rem)] font-semibold leading-[1.12] tracking-tight text-white"
              >
                {article.title}
              </h2>
              <BodyText className="max-w-xl text-base md:text-lg">{article.excerpt}</BodyText>
              <Link
                to={article.href}
                className="mt-2 inline-flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-white/55 transition-colors duration-300 hover:text-white"
              >
                Discuss with an advisor
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
