import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import {
  BLOG_DISCLAIMER,
  getOtherPosts,
  type BlogBlock,
  type BlogPost,
} from '@/src/data/blog-posts';
import { InsightsBreadcrumb } from './InsightsBreadcrumb';

type BlogArticleProps = {
  post: BlogPost;
};

function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ArticleBlock({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case 'p':
      return <p className="mt-5 text-[1.0625rem] leading-[1.75] text-neutral-800">{block.text}</p>;
    case 'h2':
      return (
        <h2 className="mt-12 font-sans text-[1.65rem] font-semibold leading-tight tracking-[-0.03em] text-black">
          {block.text}
        </h2>
      );
    case 'ul':
      return (
        <ul className="mt-5 list-disc space-y-3 pl-5 text-[1.0625rem] leading-[1.7] text-neutral-800 marker:text-neutral-400">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <p className="mt-8 border-l-2 border-[var(--color-gold-warm)] pl-4 text-[15px] leading-relaxed text-neutral-600">
          {block.text}
        </p>
      );
    default: {
      const exhaustive: never = block;
      return exhaustive;
    }
  }
}

export function BlogArticle({ post }: BlogArticleProps) {
  const others = getOtherPosts(post);

  return (
    <article className="bg-black text-white">
      <header className="pt-[max(7.5rem,env(safe-area-inset-top))]">
        <Container className="mx-auto w-full max-w-[1400px] px-6 pb-12 sm:px-8 lg:px-12 lg:pb-16">
          <RevealOnScroll trigger="load" direction="up" distance={24} duration={0.9}>
            <InsightsBreadcrumb
              crumbs={[{ label: 'Blog', to: '/blog' }]}
              current={post.crumb}
            />
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              {post.category}
              <span className="mx-2 text-white/25" aria-hidden>
                /
              </span>
              {formatPostDate(post.published)}
              <span className="mx-2 text-white/25" aria-hidden>
                /
              </span>
              {post.readTime} read
            </p>
            <h1 className="mt-4 max-w-[18ch] font-sans text-[clamp(2.4rem,1.2rem+3.2vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[38rem] border-t border-white/15 pt-6 text-base leading-relaxed text-white/75 sm:text-lg">
              {post.excerpt}
            </p>
          </RevealOnScroll>
        </Container>
      </header>

      <div className="bg-white text-black">
        <Container className="mx-auto w-full max-w-[1400px] px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {post.blocks.map((block) => (
                <ArticleBlock
                  key={block.kind === 'h2' ? block.text : block.kind === 'p' || block.kind === 'note' ? block.text : block.items[0]}
                  block={block}
                />
              ))}

              {post.further.length > 0 ? (
                <div className="mt-10 border-t border-black/10 pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                    On this site
                  </p>
                  <ul className="mt-3 flex flex-col">
                    {post.further.map((link) => (
                      <li key={link.href} className="border-b border-black/10">
                        <Link
                          to={link.href}
                          className="group flex items-center justify-between gap-4 py-3 text-base text-black"
                        >
                          {link.label}
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-black/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <p className="mt-10 border-t border-black/10 pt-6 text-xs leading-relaxed text-neutral-500">
                {BLOG_DISCLAIMER}
              </p>
            </div>

            {others.length > 0 ? (
              <aside
                className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28"
                aria-labelledby="other-notes-heading"
              >
                <h2
                  id="other-notes-heading"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40"
                >
                  Other notes
                </h2>
                <ul className="mt-4 border-t border-black/10">
                  {others.map((item) => (
                    <li key={item.id} className="border-b border-black/10">
                      <Link to={item.href} className="group block py-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                          {item.category}
                          <span className="mx-2 text-black/25" aria-hidden>
                            /
                          </span>
                          {item.readTime}
                        </span>
                        <span className="mt-2 flex items-start justify-between gap-4">
                          <span className="font-sans text-xl font-medium leading-snug tracking-[-0.03em] text-black">
                            {item.title}
                          </span>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-black/35 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </Container>
      </div>
    </article>
  );
}
