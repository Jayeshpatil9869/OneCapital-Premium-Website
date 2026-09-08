import { Button } from '@/src/components/ui';
import { cn } from '@/src/lib/utils';

interface EditorialStatementCTAProps {
  line1?: string;
  line2?: string;
  line3Prefix?: string;
  line3Outlined?: string;
  line3Suffix?: string;
  italicQuote?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

export function EditorialStatementCTA({
  line1 = 'Ready to start',
  line2 = 'your next',
  line3Prefix = '',
  line3Outlined = 'journey',
  line3Suffix = '?',
  italicQuote = 'Schedule a consultation with one of our expert advisors and discover how OneCapital can transform your financial future.',
  buttonText = 'Book Consultation',
  buttonLink = '/contact',
  className = '',
}: EditorialStatementCTAProps) {
  return (
    <section
      className={cn(
        'light-section relative flex w-full items-center justify-center overflow-x-hidden bg-white py-16 md:py-24',
        className,
      )}
    >
      <div className="relative mx-auto max-w-5xl px-[var(--page-gutter)] text-center">
        <h2 className="mb-6 text-[clamp(2.5rem,1.2rem+5vw,4.75rem)] font-sans font-bold leading-[0.98] tracking-tight text-black uppercase">
          <span className="block">{line1}</span>
          {line2 ? <span className="block">{line2}</span> : null}
          <span className="block">
            {line3Prefix ? `${line3Prefix} ` : null}
            <span
              className="inline-block text-transparent [-webkit-text-stroke:1px_#000] md:[-webkit-text-stroke:2px_#000]"
              style={{ paintOrder: 'stroke fill' }}
            >
              {line3Outlined}
            </span>
            {line3Suffix ? <span className="text-black">{line3Suffix}</span> : null}
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl font-sans text-base font-normal leading-relaxed tracking-normal text-neutral-600 md:text-lg">
          {italicQuote}
        </p>

        {buttonText ? (
          <div className="mt-10 flex justify-center">
            <Button
              to={buttonLink}
              variant="primary"
              size="md"
              arrow="up-right"
              className="bg-black text-white hover:bg-neutral-900"
            >
              {buttonText}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
