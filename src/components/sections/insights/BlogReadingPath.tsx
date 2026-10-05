import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { BodyText, Container, Eyebrow, Section } from '@/src/components/ui';
import { BLOG_PAGE, getArticleById } from '@/src/data/insights';

export function BlogReadingPath() {
  const { readingPath } = BLOG_PAGE;
  const primary = getArticleById(readingPath.primaryId);
  const secondary = getArticleById(readingPath.secondaryId);

  if (!primary || !secondary) return null;

  return (
    <Section
      tone="light"
      pad="md"
      className="bg-white text-black"
      aria-labelledby="blog-reading-path-heading"
    >
      <Container>
        <RevealOnScroll className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-black/45">{readingPath.eyebrow}</Eyebrow>
            <h2
              id="blog-reading-path-heading"
              className="mt-4 max-w-[16ch] font-sans text-[clamp(1.75rem,1rem+2vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-black"
            >
              {readingPath.heading}
            </h2>
            <BodyText className="mt-4 max-w-md text-base text-neutral-600 md:text-lg">
              {readingPath.body}
            </BodyText>
          </div>

          <div className="flex flex-col gap-0 border-t border-black/10 lg:col-span-7">
            {[primary, secondary].map((article, index) => (
              <Link
                key={article.id}
                to={article.href}
                className="group flex items-start justify-between gap-6 border-b border-black/10 py-6 transition-colors hover:bg-black/[0.02]"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                    {String(index + 1).padStart(2, '0')} · {article.category}
                  </p>
                  <p className="mt-2 max-w-[28ch] font-sans text-xl font-medium leading-snug tracking-[-0.03em] text-black sm:text-2xl">
                    {article.title}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-black/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
