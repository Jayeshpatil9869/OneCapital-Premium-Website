import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';
import type { InsightArticle } from '@/src/data/insights';
import { gsap, prefersReducedMotion } from '@/src/lib/motion';
import { cn } from '@/src/lib/utils';

type BlogArchiveListProps = {
  articles: InsightArticle[];
};

export function BlogArchiveList({ articles }: BlogArchiveListProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const previewSrcRef = useRef(articles[0]?.image ?? '');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState(articles[0]?.image ?? '');
  const leadId = articles[0]?.id ?? '';
  const leadImage = articles[0]?.image ?? '';

  useEffect(() => {
    previewSrcRef.current = leadImage;
    setActiveId(null);
    setPreviewSrc(leadImage);
  }, [leadId, leadImage]);

  const swapPreview = (article: InsightArticle | undefined, nextId: string | null) => {
    if (!article) return;
    const reduced =
      prefersReducedMotion() || window.matchMedia('(max-width: 1023px)').matches;
    const image = imageRef.current;
    if (reduced || article.image === previewSrcRef.current) {
      if (image) {
        gsap.killTweensOf(image);
        gsap.set(image, { opacity: 1, x: 0 });
      }
      previewSrcRef.current = article.image;
      setPreviewSrc(article.image);
      setActiveId(nextId);
      return;
    }

    setActiveId(nextId);
    if (!image) {
      previewSrcRef.current = article.image;
      setPreviewSrc(article.image);
      return;
    }

    const nextSrc = article.image;
    gsap.killTweensOf(image);
    gsap.to(image, {
      opacity: 0,
      x: 12,
      duration: 0.22,
      ease: 'power2.inOut',
      overwrite: true,
      onComplete: () => {
        if (previewSrcRef.current === nextSrc) return;
        previewSrcRef.current = nextSrc;
        setPreviewSrc(nextSrc);
        requestAnimationFrame(() => {
          if (!imageRef.current) return;
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: 12 },
            { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' },
          );
        });
      },
    });
  };

  const showPreview = (article: InsightArticle) => {
    swapPreview(article, article.id);
  };

  const restoreLead = () => {
    swapPreview(articles[0], null);
  };

  const restoreLeadOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    restoreLead();
  };

  return (
    <Section
      pad="none"
      className="bg-black pb-[var(--space-section)] text-white"
      aria-labelledby="blog-archive-heading"
    >
      <div className="w-full">
      <Container className="relative">
        <h2 id="blog-archive-heading" className="sr-only">
          Blog archive
        </h2>

        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-8 z-10 hidden w-[min(28vw,22rem)] overflow-hidden rounded-2xl border border-white/10 lg:block"
        >
          {previewSrc ? (
            <img
              ref={imageRef}
              src={previewSrc}
              alt=""
              className="aspect-[4/5] h-full w-full object-cover"
            />
          ) : null}
        </div>

        {articles.length === 0 ? (
          <p className="border-t border-white/10 py-12 text-sm text-white/50">
            No notes in this category yet.
          </p>
        ) : (
          <RevealOnScroll
            stagger={0.05}
            className="flex flex-col lg:max-w-[62%]"
          >
            <div onMouseLeave={restoreLead} onBlur={restoreLeadOnBlur}>
            {articles.map((article) => (
              <Link
                key={article.id}
                to={article.href}
                onMouseEnter={() => showPreview(article)}
                onFocus={() => showPreview(article)}
                className={cn(
                  'group grid grid-cols-1 gap-3 border-t border-white/10 py-7 transition-colors duration-300 sm:grid-cols-12 sm:items-center sm:gap-6 sm:py-8',
                  activeId === article.id && 'bg-white/[0.02]',
                )}
              >
                <div className="flex flex-wrap items-center gap-3 sm:col-span-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                    {article.category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="max-w-[28ch] font-sans text-xl font-medium leading-snug tracking-[-0.03em] text-white transition-transform duration-300 group-hover:translate-x-1 sm:col-span-7 sm:text-2xl">
                  {article.title}
                </h3>

                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-white/40 transition-colors group-hover:text-white sm:col-span-2 sm:justify-end">
                  Discuss
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
            </div>
          </RevealOnScroll>
        )}
      </Container>
      </div>
    </Section>
  );
}
