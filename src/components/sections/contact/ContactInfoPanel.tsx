import { ArrowUpRight, CircleHelp } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { CONTACT_DETAILS, CONTACT_PAGE_COPY } from '@/src/data/contact';
import { cn } from '@/src/lib/utils';

function ContactDetailCard({
  detail,
}: {
  detail: (typeof CONTACT_DETAILS)[number];
}) {
  const Icon = detail.icon;
  const primaryLine = detail.lines[0];
  const secondaryLines = detail.lines.slice(1);

  const isLink = Boolean(detail.href);

  const content = (
    <>
      {/* Specular top rim highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Subtle ambient corner glow on hover */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/[0.03] blur-2xl transition-all duration-300 group-hover:bg-white/[0.09]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-transparent text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:border-white/30 group-hover:from-white/[0.22] group-hover:text-white sm:h-12 sm:w-12">
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <span className="block text-sm font-semibold tracking-tight text-white sm:text-base">
            {detail.label}
          </span>
          <span
            className={cn(
              'mt-0.5 block break-words text-xs font-normal text-white/60 sm:text-sm',
              detail.id === 'phone' && 'tabular-nums',
              detail.id === 'email' && 'break-all',
            )}
          >
            {primaryLine}
          </span>
          {secondaryLines.length > 0 && (
            <span className="mt-0.5 block break-words text-xs leading-relaxed text-white/40">
              {secondaryLines.join(', ')}
            </span>
          )}
        </div>
      </div>

      {isLink && (
        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-full border border-white/12 bg-gradient-to-br from-white/[0.08] to-white/[0.02] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:border-white/30 group-hover:from-white/[0.18] group-hover:text-white">
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
      )}
    </>
  );

  const cardClasses = cn(
    'group relative flex w-full min-h-[3.25rem] items-center justify-between gap-3 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-white/[0.01] px-4 py-4 backdrop-blur-2xl transition-all duration-300 sm:gap-4 sm:px-5 sm:py-[1.125rem]',
    'hover:border-white/25 hover:from-white/[0.12] hover:via-white/[0.06] hover:to-white/[0.02] hover:shadow-[0_16px_36px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
  );

  if (detail.href) {
    return (
      <a href={detail.href} className={cardClasses}>
        {content}
      </a>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}

export function ContactInfoPanel() {
  return (
    <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:sticky lg:top-32 lg:gap-14 xl:gap-16">
      <RevealOnScroll className="flex flex-col gap-4 sm:gap-5 md:gap-6">
        {/* Pill Badge matching reference image */}
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-white/80 shadow-sm backdrop-blur-md">
          <CircleHelp className="h-4 w-4 text-white/70" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/80 sm:text-xs">
            {CONTACT_PAGE_COPY.eyebrow}
          </span>
        </div>

        <h1 className="text-[clamp(2rem,8vw,3.75rem)] font-bold tracking-tight text-white">
          {CONTACT_PAGE_COPY.headline}
        </h1>

        <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          {CONTACT_PAGE_COPY.subtext}
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="flex flex-col gap-3 sm:gap-4 md:gap-5">
        {CONTACT_DETAILS.map((detail) => (
          <ContactDetailCard key={detail.id} detail={detail} />
        ))}
      </RevealOnScroll>
    </div>
  );
}

