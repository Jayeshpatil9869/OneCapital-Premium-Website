import { HOME_RISK_FACTORS } from '@/src/data/home-risk-factors';

export function RiskFactorsStrip() {
  const {
    title,
    disclosure,
    advisoryNote,
    statutoryLine,
    amfiLine,
    apmiLine,
    gstLine,
    cinLine,
    regulatoryNote,
  } = HOME_RISK_FACTORS;

  const registrations = [amfiLine, apmiLine, gstLine, cinLine];

  return (
    <aside
      className="w-full bg-canvas border-t border-white/10 px-[var(--page-gutter)] py-10 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]"
      aria-labelledby="risk-factors-heading"
    >
      <div className="mx-auto w-full max-w-7xl flex flex-col items-stretch gap-6 text-left">
        <h2
          id="risk-factors-heading"
          className="text-sm md:text-base font-medium text-white tracking-tight"
        >
          {title}
        </h2>

        <div className="flex flex-col gap-3">
          <p className="text-xs md:text-[13px] leading-relaxed text-text-muted">
            {disclosure}
          </p>
          <p className="text-xs leading-relaxed text-text-muted">{regulatoryNote}</p>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          <p className="text-xs leading-relaxed text-white/75">{advisoryNote}</p>
          <p className="text-xs md:text-[13px] font-semibold text-white/90">
            &ldquo;{statutoryLine}&rdquo;
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 pt-2">
          {registrations.map((line) => (
            <li
              key={line}
              className="text-[11px] font-mono text-white/55 leading-relaxed"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
