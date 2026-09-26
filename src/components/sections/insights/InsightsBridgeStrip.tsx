import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { BodyText, Container, Section } from '@/src/components/ui';
import { INSIGHTS_PAGE } from '@/src/data/insights';

export function InsightsBridgeStrip() {
  return (
    <Section
      pad="md"
      className="border-y border-white/10 bg-white/[0.015] text-white"
      aria-labelledby="insights-bridge-heading"
    >
      <Container>
        <RevealOnScroll className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="insights-bridge-heading"
              className="text-balance font-sans text-[clamp(1.35rem,0.9rem+1.4vw,2rem)] font-semibold leading-snug tracking-tight text-white"
            >
              {INSIGHTS_PAGE.bridge.statement}
            </h2>
            <BodyText className="mt-4 max-w-xl text-base text-white/55">
              Continue into the practice archive, or bring a live question to the advisory desk.
            </BodyText>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-white"
            >
              Open the blog
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-widest text-white transition-colors hover:border-white/40 hover:bg-white/[0.04]"
            >
              Book consultation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
