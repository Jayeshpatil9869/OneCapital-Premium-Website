import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, TrendingUp } from 'lucide-react';

export function AboutResponsibleVision() {
  return (
    <section id="responsible-vision" className="w-full py-24 lg:py-32 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision & Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-white/60 mb-3 block">
                Responsible Investing
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
                Our responsible vision for a better tomorrow
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-lg text-text-muted font-light leading-relaxed">
              <p>
                As capital allocators, we hold a solemn duty to structure portfolios that transition into sustainable finance. We are committed to integrating <span className="text-white font-medium">Environmental, Social, and Governance (ESG)</span> diligence and stewardship principles into asset allocation decisions.
              </p>
              <p>
                OneCapital aspires to serve as a benchmark for wealth governance in India, championing responsible stewardship, clean energy transition, and expanding the adoption of value-accretive sustainable investing practices for generations to come.
              </p>
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <Leaf className="w-5 h-5 text-white/80 shrink-0" />
                <span className="text-sm font-sans text-white/85">ESG Integration & Governance</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <TrendingUp className="w-5 h-5 text-white/80 shrink-0" />
                <span className="text-sm font-sans text-white/85">Sustainable Compounding</span>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-4">
              <Link
                to="/solutions/wealth-management"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-widest font-mono text-white/80 hover:text-white transition-colors group"
              >
                <span>Explore Sustainable Solutions</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Aerial Nature/Forest Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative group"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 aspect-[4/3] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1400&q=85"
                alt="Aerial Evergreen Forest Stewardship"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Overlay Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-black/50 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono text-white font-semibold mb-0.5">
                    Impact & Stewardship
                  </p>
                  <p className="text-xs text-white/80 font-sans">
                    Nurturing resilient capital for next-gen India.
                  </p>
                </div>
                <ShieldCheck className="w-6 h-6 text-white/80" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
