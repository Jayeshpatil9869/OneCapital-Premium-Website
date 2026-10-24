import { useState } from 'react';
import { BlogArchiveList } from '@/src/components/sections/insights/BlogArchiveList';
import { BlogMasthead } from '@/src/components/sections/insights/BlogMasthead';
import { BlogReadingPath } from '@/src/components/sections/insights/BlogReadingPath';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { COMPANY } from '@/src/data/company';
import {
  BLOG_PAGE,
  filterArticles,
  INSIGHT_ARTICLES,
  type InsightFilter,
} from '@/src/data/insights';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { absoluteUrl } from '@/src/lib/seo';

export default function Blog() {
  const [filter, setFilter] = useState<InsightFilter>('All');
  const articles = filterArticles(filter);

  usePageSeo({
    title: `Guides to PMS, Mutual Funds, and FDs | ${COMPANY.brandName}`,
    description: BLOG_PAGE.hero.description,
    path: '/blog',
    keywords: ['One Capital blog', 'PMS vs mutual fund', 'mutual fund vs FD', 'AIF India'],
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${COMPANY.brandName} Blog`,
      description: BLOG_PAGE.hero.description,
      url: absoluteUrl('/blog'),
      blogPost: INSIGHT_ARTICLES.map((article) => ({
        '@type': 'BlogPosting',
        headline: article.title,
        url: absoluteUrl(article.href),
      })),
    },
  });

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <BlogMasthead filter={filter} onFilterChange={setFilter} />
      <ScrollFade className="w-full">
        <BlogArchiveList articles={articles} />
      </ScrollFade>
      <ScrollFade className="w-full">
        <BlogReadingPath />
      </ScrollFade>
    </div>
  );
}
