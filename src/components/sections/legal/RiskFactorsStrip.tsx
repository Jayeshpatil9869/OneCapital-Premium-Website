import { HOME_RISK_FACTORS } from '@/src/data/home-risk-factors';

export function RiskFactorsStrip() {
  const {
    title,
    disclosure,
    advisoryNote,
    statutoryLine,
    amfiLine,
    sebiLine,
    regulatoryNote,
    odrLink,
  } = HOME_RISK_FACTORS;

  return (
    <aside
      className="w-full bg-canvas border-t border-white/10 px-[var(--page-gutter)] py-10 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]"
      aria-labelledby="risk-factors-heading"
    >
      <div className="mx-auto w-full max-w-[var(--container-max)] flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-4">
          <h2
            id="risk-factors-heading"
            className="text-sm md:text-base font-medium text-white tracking-tight"
          >
            {title}
          </h2>

          <p className="text-xs md:text-[13px] leading-relaxed text-text-muted text-pretty max-w-6xl">
            {disclosure}
          </p>

          <p className="text-xs leading-relaxed text-text-muted text-pretty max-w-6xl">{regulatoryNote}</p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 pt-2 border-t border-white/10">
          <p className="text-xs italic font-medium text-white/75 max-w-5xl text-balance">
            {advisoryNote}
          </p>

          <p className="text-xs md:text-[13px] font-semibold text-white/90 underline underline-offset-4 decoration-white/30 max-w-5xl text-balance">
            &ldquo;{statutoryLine}&rdquo;
          </p>

          <p className="text-[11px] font-mono text-white/50 leading-relaxed max-w-5xl">{amfiLine}</p>

          <p className="text-[11px] font-mono font-medium uppercase tracking-wide text-white/70 leading-relaxed max-w-5xl">
            {sebiLine}
          </p>

          <p className="text-[11px] text-text-muted pt-1">
            Link for ODR Portal —{' '}
            <a
              href={odrLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 underline-offset-4 hover:text-white hover:underline transition-colors duration-300"
            >
              {odrLink.label}
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
