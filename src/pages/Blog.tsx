import { useEffect, useState } from 'react';
import { BlogArchiveList } from '@/src/components/sections/insights/BlogArchiveList';
import { BlogMasthead } from '@/src/components/sections/insights/BlogMasthead';
import { BlogReadingPath } from '@/src/components/sections/insights/BlogReadingPath';
import {
  BLOG_PAGE,
  filterArticles,
  type InsightFilter,
} from '@/src/data/insights';

export default function Blog() {
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
    </div>
  );
}
