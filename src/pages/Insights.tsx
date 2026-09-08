import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Container,
  Section,
  Eyebrow,
  DisplayHeading,
  BodyText,
  Label,
} from '@/src/components/ui';

const insights = [
  {
    category: 'Market Outlook',
    title: 'Navigating multi-asset portfolios in a higher-for-longer world',
    excerpt:
      'How disciplined rebalancing and quality bias can protect real purchasing power when rates stay elevated.',
  },
  {
    category: 'Wealth Planning',
    title: 'Tax-aware architecture for family offices',
    excerpt:
      'Structuring liquidity, estate transfers, and investment vehicles without sacrificing long-term compounding.',
  },
  {
    category: 'Alternatives',
    title: 'Private credit as a portfolio stabilizer',
    excerpt:
      'Where carefully underwritten private debt can complement public fixed income for sophisticated clients.',
  },
  {
    category: 'Behavioral Finance',
    title: 'Removing emotion from drawdown decisions',
    excerpt:
      'A framework for staying invested when volatility spikes—and when to deliberately redeploy cash.',
  },
];

export default function Insights() {
  return (
    <div className="flex w-full flex-col items-center">
      <Section pad="lg" className="pt-28 md:pt-32">
        <Container className="flex flex-col items-center text-center">
          <RevealOnScroll className="flex max-w-3xl flex-col items-center gap-5">
            <Eyebrow centered>Insights</Eyebrow>
            <DisplayHeading className="text-white">
              Clarity in <span className="text-white/40">complexity.</span>
            </DisplayHeading>
            <BodyText className="max-w-2xl text-base md:text-lg">
              Perspectives from OneCapital on markets, allocation, and the architecture of
              enduring wealth.
            </BodyText>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section pad="none" className="pb-[var(--space-section)]">
        <Container>
          <RevealOnScroll
            stagger={0.06}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
          >
            {insights.map((item) => (
              <article
                key={item.title}
                className="group glass-panel glass-panel-hover flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-white/20 md:p-10"
              >
                <Label className="mb-6 text-text-muted">{item.category}</Label>
                <h2 className="mb-4 text-2xl font-medium tracking-tight text-white transition-colors duration-500 group-hover:text-white/90">
                  {item.title}
                </h2>
                <BodyText className="mb-8 flex-grow text-base md:text-lg">
                  {item.excerpt}
                </BodyText>
                <Link
                  to="/contact"
                  className="flex w-fit items-center gap-2 text-xs uppercase tracking-widest text-white/50 transition-colors duration-500 group-hover:text-white"
                >
                  Discuss with an advisor
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </article>
            ))}
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}
