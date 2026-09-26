import { useEffect, useState } from 'react';
import { EditorialStatementCTA } from '@/src/components/sections/cta/EditorialStatementCTA';
import { BlogArchiveList } from '@/src/components/sections/insights/BlogArchiveList';
import { BlogMasthead } from '@/src/components/sections/insights/BlogMasthead';
import { BlogReadingPath } from '@/src/components/sections/insights/BlogReadingPath';
import {
  BLOG_PAGE,
  filterArticles,
  type InsightFilter,
} from '@/src/data/insights';

export default function Blog() {
  const { cta } = BLOG_PAGE;
  const [filter, setFilter] = useState<InsightFilter>('All');
  const articles = filterArticles(filter);

  useEffect(() => {
    document.title = BLOG_PAGE.documentTitle;
  }, []);

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <BlogMasthead filter={filter} onFilterChange={setFilter} />
      <BlogArchiveList articles={articles} />
      <BlogReadingPath />
      <EditorialStatementCTA
        line1={cta.line1}
        line2={cta.line2}
        line3Prefix=""
        line3Outlined={cta.line3Outlined}
        line3Suffix="."
        italicQuote={cta.italicQuote}
        buttonText={cta.buttonText}
        buttonLink={cta.buttonLink}
      />
    </div>
  );
}
