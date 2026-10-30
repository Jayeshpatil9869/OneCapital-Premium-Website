import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { CONTACT_DETAILS, CONTACT_PAGE_COPY } from '@/src/data/contact';
import { cn } from '@/src/lib/utils';

function ContactDetailRow({
  detail,
}: {
  detail: (typeof CONTACT_DETAILS)[number];
}) {
  const Icon = detail.icon;
  const primaryLine = detail.lines[0];
  const secondaryLines = detail.lines.slice(1);
  const isLink = Boolean(detail.href);

  const body = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/80 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white">
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          {detail.label}
        </span>
        <span
          className={cn(
            'mt-0.5 block text-sm text-white/85 transition-colors duration-300 group-hover:text-white',
            detail.id === 'phone' && 'tabular-nums',
            detail.id === 'email' && 'break-all',
          )}
        >
          {primaryLine}
        </span>
        {secondaryLines.length > 0 && (
          <span className="mt-0.5 block text-xs leading-relaxed text-white/45">
            {secondaryLines.join(', ')}
          </span>
        )}
      </span>
      {isLink && (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 self-center text-white/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          aria-hidden
        />
      )}
    </>
  );

  const rowClass = cn(
    'group flex w-full items-start gap-3 rounded-xl border border-transparent px-1 py-2 transition-colors duration-300',
    'hover:border-white/10 hover:bg-white/[0.03]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
  );

  if (detail.href) {
    return (
      <a href={detail.href} className={rowClass}>
        {body}
      </a>
    );
  }

  return <div className={rowClass}>{body}</div>;
}

export function ContactInfoPanel() {
  return (
    <div className="flex flex-col gap-10 sm:gap-12 lg:max-w-xl lg:gap-14">
      <RevealOnScroll className="flex flex-col gap-5 sm:gap-6">
        <span
          className="block h-px w-12 bg-gold sm:w-14"
          aria-hidden="true"
        />

        <h1 className="font-sans text-[clamp(2.25rem,6.5vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-white text-balance">
          {CONTACT_PAGE_COPY.headline}
        </h1>

        <p className="max-w-md text-sm leading-relaxed text-white/65 sm:text-base sm:leading-relaxed">
          {CONTACT_PAGE_COPY.subtext}
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="flex flex-col gap-1 border-t border-white/10 pt-6 sm:pt-8">
        {CONTACT_DETAILS.map((detail) => (
          <ContactDetailRow key={detail.id} detail={detail} />
        ))}
      </RevealOnScroll>
    </div>
  );
}
