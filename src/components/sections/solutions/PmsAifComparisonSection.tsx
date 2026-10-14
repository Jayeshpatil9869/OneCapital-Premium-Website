import { Crown, Layers, Check, ArrowRight } from 'lucide-react';
import { Container } from '@/src/components/ui';
import { ScrollFade } from '@/src/components/motion/ScrollFade';

const ASSET_CLASSES = [
  {
    id: 'pms',
    title: 'PMS',
    fullName: 'Portfolio Management Services',
    minInvestment: 'MIN. INR 50 LAKHS',
    icon: Crown,
    description:
      'Concentrated stock portfolios managed by dedicated investment teams. Offers direct equity ownership with transaction transparency.',
    features: [
      'Direct ownership of stocks in your personal demat account',
      'Bespoke sector overlays and investment restrictions',
      'Higher transparency on costs, transactions, and holdings',
    ],
    ctaHref: '#pms',
    ctaText: 'Explore PMS Structure',
    featured: false,
  },
  {
    id: 'aif',
    title: 'AIF',
    fullName: 'Alternative Investment Funds',
    minInvestment: 'MIN. INR 1 CRORE',
    icon: Layers,
    description:
      'Pooled investment vehicles across Venture Capital, Private Equity, Structured Debt, and Hedge Fund strategies. Unlocks private market alpha.',
    features: [
      'Access to exclusive pre-IPO startups, private debt, and real estate',
      'Sophisticated derivatives and hedging strategies for Category III',
      'Long-term lock-in options designed for generation-level wealth',
    ],
    ctaHref: '#aif',
    ctaText: 'Explore AIF Categories',
    featured: true,
  },
];

export function PmsAifComparisonSection() {
  return (
    <section id="asset-classes" className="relative scroll-mt-24 border-b border-white/15 py-16 sm:py-20 lg:py-28">
      <Container className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <ScrollFade className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-white/60">
            Our Premium Asset Classes
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            Institutional Investment Channels
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg font-light leading-relaxed text-white/75">
            Compare our two institutional investment channels tailored for serious capital appreciation.
          </p>
        </ScrollFade>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {ASSET_CLASSES.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollFade key={item.id} delay={index * 0.1}>
                <div
                  className={`group relative flex h-full flex-col justify-between rounded-3xl p-7 sm:p-9 lg:p-10 transition-all duration-300 ${
                    item.featured
                      ? 'border border-white/35 bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-white/[0.02] shadow-[0_0_40px_rgba(255,255,255,0.04)] hover:border-white/55 hover:bg-white/[0.05]'
                      : 'border border-white/12 bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:border-white/30 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon + Symbol + Min Investment Badge */}
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${
                            item.featured
                              ? 'border-white/25 bg-white/15 text-white'
                              : 'border-white/15 bg-white/10 text-white'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
                          {item.title}
                        </span>
                      </div>

                      <span
                        className={`rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.14em] font-medium ${
                          item.featured
                            ? 'border border-white/30 bg-white/10 text-white'
                            : 'border border-white/20 bg-white/5 text-white/90'
                        }`}
                      >
                        {item.minInvestment}
                      </span>
                    </div>

                    {/* Full Name & Description */}
                    <h3 className="mt-6 font-sans text-xl font-semibold text-white">
                      {item.fullName}
                    </h3>
                    <p className="mt-2.5 font-sans text-sm sm:text-base font-light leading-relaxed text-white/70">
                      {item.description}
                    </p>

                    {/* Feature Items with Curved Left Bracket Accent */}
                    <div className="mt-8 space-y-3.5">
                      {item.features.map((feat) => (
                        <div
                          key={feat}
                          className="relative flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.025] p-4 pl-5 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
                        >
                          {/* Curved Left Bracket Accent Line */}
                          <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-white transition-all duration-300 group-hover:scale-y-105" />

                          {/* Emerald checkmark badge matching One Capital trust signal pattern */}
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                            <Check className="h-3.5 w-3.5" />
                          </div>

                          <p className="font-sans text-sm font-normal leading-relaxed text-white/90">
                            {feat}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Anchor Link to Product Detail */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <a
                      href={item.ctaHref}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </ScrollFade>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
