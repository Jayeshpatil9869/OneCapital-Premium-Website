import { motion } from 'motion/react';

export function AboutPhilosophyStory() {
  return (
    <section id="philosophy" className="w-full py-24 lg:py-32 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Section: Philosophy Header & Statement */}
        <div id="overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-20 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-white/60 mb-3 block">
              Philosophy
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
              Insight with integrity
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 flex items-center"
          >
            <p className="text-xl sm:text-2xl md:text-[1.65rem] font-light italic text-white/90 leading-relaxed pl-6 border-l-2 border-white/40">
              "Trust, integrity, and transparency form the bedrock of our wealth advisory platform and drive us to do the right thing for our clients every day."
            </p>
          </motion.div>
        </div>

        {/* Bottom Section: Skyline Visual + Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-20 items-start">
          {/* Left Column: Sunset Skyline Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 aspect-[4/5] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=85"
                alt="Financial Capital Sunset Skyline"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-black/50 border border-white/10">
                <p className="text-xs uppercase tracking-widest font-mono text-white/80 mb-1">
                  Institutional Roots
                </p>
                <p className="text-sm text-white/90 font-sans">
                  Guiding legacy wealth across India's premier financial corridors.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-white/60 mb-3 block">
                Story
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
                Setting new benchmarks within and beyond wealth management
              </h3>
            </div>

            <div className="space-y-5 text-base sm:text-lg text-text-muted font-light leading-relaxed">
              <p>
                <strong className="text-white font-medium">OneCapital</strong> is an independent Multi-Family Office and bespoke Wealth Advisory Firm. We provide comprehensive stewardship services to prominent business families, tech founders, next-generation entrepreneurs, and institutional entities across India.
              </p>
              <p>
                Built on the fundamentals of <span className="text-white font-medium">trust, alignment, and transparency</span>, OneCapital was established as a pure boutique wealth firm to introduce conflict-free private banking practices and pioneer the concept of client-aligned investment management.
              </p>
              <p>
                Drawing from decades of leadership in <span className="text-white font-medium">institutional capital markets, structured private debt, and global multi-asset strategy</span>, our advisory team recognized the imperative of delivering holistic services to the UHNW community without the product distribution bias common in traditional institutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
