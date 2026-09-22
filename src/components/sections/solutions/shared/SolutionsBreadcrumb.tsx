import { Link } from 'react-router-dom';

type SolutionsBreadcrumbProps = {
  current: string;
};

export function SolutionsBreadcrumb({ current }: SolutionsBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em] text-white/45"
    >
      <Link to="/solutions" className="transition-colors hover:text-white">
        Solutions
      </Link>
      <span aria-hidden>/</span>
      <span className="text-white/75">{current}</span>
    </nav>
  );
}
