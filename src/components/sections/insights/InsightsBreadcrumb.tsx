import { Link } from 'react-router-dom';

type InsightsBreadcrumbProps = {
  current: string;
};

export function InsightsBreadcrumb({ current }: InsightsBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white/45"
    >
      <Link to="/insights" className="transition-colors hover:text-white">
        Insights
      </Link>
      <span aria-hidden>/</span>
      <span className="text-white/75">{current}</span>
    </nav>
  );
}
