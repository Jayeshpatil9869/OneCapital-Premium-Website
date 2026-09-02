import { BodyText, DisplayHeading } from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { CONTACT_DETAILS, CONTACT_PAGE_COPY } from '@/src/data/contact';
import { cn } from '@/src/lib/utils';

export function ContactInfoPanel() {
  return (
    <div className="flex flex-col gap-12 lg:sticky lg:top-32">
      <RevealOnScroll className="flex flex-col gap-6">
        <DisplayHeading>
          {CONTACT_PAGE_COPY.headline}{' '}
          <span className="text-white/40">{CONTACT_PAGE_COPY.headlineAccent}</span>
        </DisplayHeading>
        <BodyText className="max-w-md text-white/70 font-light">
          {CONTACT_PAGE_COPY.subtext}
        </BodyText>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1} className="mt-4 flex flex-col gap-8 border-t border-white/10 pt-10">
        {CONTACT_DETAILS.map((detail) => {
          const Icon = detail.icon;
          const primaryLine = detail.lines[0];
          const secondaryLines = detail.lines.slice(1);

          return (
            <div key={detail.id} className="group flex items-start gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors group-hover:bg-white/10 group-hover:text-white/90">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div className="flex flex-col">
                <span className="mb-1.5 text-[11px] font-mono uppercase tracking-widest text-white/40">
                  {detail.label}
                </span>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className={cn(
                      'text-base font-medium text-white transition-colors hover:text-white/70',
                      detail.id === 'phone' && 'tabular-nums tracking-wide',
                    )}
                  >
                    {primaryLine}
                  </a>
                ) : (
                  <span className="text-base font-medium text-white">{primaryLine}</span>
                )}
                {secondaryLines.map((line) => (
                  <span key={line} className="mt-1 text-sm text-white/60">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </RevealOnScroll>
    </div>
  );
}
