import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Shield, BarChart3, Cpu, Briefcase, Globe2, Scale } from 'lucide-react';

interface EdgeFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Sparkles;
}

const TOP_FEATURES: EdgeFeature[] = [
  {
    id: 'hyper-personalisation',
    title: 'Hyper-personalisation',
    subtitle: 'Bespoke Mandates',
    description: 'Bespoke portfolios structured around multi-generational goals, liquidity milestones, and custom family covenants.',
    icon: Sparkles,
  },
  {
    id: '0-conflict',
    title: '0% Conflict',
    subtitle: 'Pure Fiduciary Model',
    description: 'Zero commissions, zero distribution bias. We operate exclusively on a transparent advisory fee aligned with your growth.',
    icon: Shield,
  },
  {
    id: 'data-driven',
    title: 'Data Driven',
    subtitle: 'Quantitative Intelligence',
    description: 'Proprietary risk factor modeling, stress-testing across historical regimes, and systematic portfolio rebalancing.',
    icon: BarChart3,
  },
  {
    id: 'technology-led',
    title: 'Technology Led',
    subtitle: 'Institutional Stack',
    description: 'Real-time consolidated net worth visibility, automated scenario analysis, and encrypted institutional vault.',
    icon: Cpu,
  },
];

const BOTTOM_FEATURES: EdgeFeature[] = [
  {
    id: 'domain-expertise',
    title: 'Domain Expertise',
    subtitle: 'Tier-1 Pedigree',
    description: 'Seasoned investment partners with decades of institutional banking and private market leadership.',
    icon: Briefcase,
  },
  {
    id: 'open-architecture',
    title: 'Open Architecture',
    subtitle: 'Unrestricted Access',
    description: 'Unconstrained access to global asset managers, private equity, venture syndicates, and direct deals.',
    icon: Globe2,
  },
  {
    id: 'strictly-allocators',
    title: 'Strictly Allocators',
    subtitle: 'Capital Stewardship',
    description: 'Disciplined allocation framework balancing asymmetric capital compounding with downside preservation.',
    icon: Scale,
  },
];

export function AboutOurEdge() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section
      id="our-edge"
      className="w-full py-28 lg:py-36 relative overflow-hidden bg-black text-white border-y border-white/10"
    >
      {/* Background ambient lighting in pure monochrome */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Split Header + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title and Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 flex flex-col justify-start lg:sticky lg:top-36"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-white/60 mb-4 block">
              What Sets Us Apart
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-medium tracking-tight text-white leading-[1.15] mb-6">
              Our edge that adds to your wealth
            </h2>
            <p className="text-base sm:text-lg text-text-muted font-light leading-relaxed mb-8">
              Our advice is driven by absolute integrity. We are motivated exclusively by our clients' enduring financial prosperity.
            </p>
            <div className="hidden lg:flex items-center gap-3 text-xs uppercase tracking-widest font-mono text-white/40">
              <span className="w-6 h-px bg-white/40" />
              <span>Institutional Excellence</span>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Feature Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TOP_FEATURES.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredCard === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[200px] cursor-pointer overflow-hidden ${
                    isHovered
                      ? 'bg-white/[0.08] border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.08)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 transition-colors">
                      <Icon className="w-5 h-5 text-white/90" />
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/50 mt-1">
                      {item.subtitle}
                    </p>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-sm text-white/80 font-light mt-3 leading-relaxed border-t border-white/10 pt-3"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom 3-Card Row */}
        <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {BOTTOM_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredCard === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isHovered
                    ? 'bg-white/[0.08] border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.06)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono tracking-widest text-white/60">
                    0{idx + 5}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <div>
                  <h4 className="text-xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1 mb-2">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
