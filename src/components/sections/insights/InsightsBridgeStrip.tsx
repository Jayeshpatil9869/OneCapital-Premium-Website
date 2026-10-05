import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/src/components/ui';
import { INSIGHTS_PAGE } from '@/src/data/insights';

export function InsightsBridgeStrip() {
  return (
    <section className="w-full border-t border-white/10 bg-black text-white" aria-labelledby="insights-bridge-heading">
      <Container className="flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div className="max-w-3xl">
          <h2
            id="insights-bridge-heading"
            className="text-balance font-sans text-[clamp(1.75rem,1rem+2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-white"
          >
            {INSIGHTS_PAGE.bridge.statement}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Continue into the practice archive, or bring a live question to the advisory desk.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Open the blog
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Book consultation
          </Link>
        </div>
      </Container>
    </section>
  );
}
