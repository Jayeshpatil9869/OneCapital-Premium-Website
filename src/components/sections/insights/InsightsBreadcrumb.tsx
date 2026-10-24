import { Link } from 'react-router-dom';

type InsightsCrumb = {
  label: string;
  to: string;
};

type InsightsBreadcrumbProps = {
  current: string;
  crumbs?: InsightsCrumb[];
};

export function InsightsBreadcrumb({ current, crumbs = [] }: InsightsBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white/45"
    >
      <Link to="/insights" className="transition-colors hover:text-white">
        Insights
      </Link>
      {crumbs.map((crumb) => (
        <span key={crumb.to} className="contents">
          <span aria-hidden>/</span>
          <Link to={crumb.to} className="transition-colors hover:text-white">
            {crumb.label}
          </Link>
        </span>
      ))}
      <span aria-hidden>/</span>
      <span className="text-white/75">{current}</span>
    </nav>
  );
}
