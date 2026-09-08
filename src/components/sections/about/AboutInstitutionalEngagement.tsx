import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export function AboutInstitutionalEngagement() {
  return (
    <section className="relative w-full py-24 sm:py-32 lg:py-36 bg-black text-white border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl border border-white/[0.1] bg-white/[0.015] relative overflow-hidden">
          {/* Subtle architectural radial lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/50">
                  04 / CONFIDENTIAL ENGAGEMENT
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-[1.15] mb-4">
                Enduring partnerships begin with <br className="hidden sm:inline" />
                <span className="italic font-light text-white/90">quiet alignment.</span>
              </h2>

              <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl leading-relaxed">
                Whether structuring a family office mandate, transitioning generational assets, or allocating to private market strategies, our partners are available for a confidential discussion.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-white/40 uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
                  Absolute Discretion
                </span>
                <span>·</span>
                <span>Direct Partner Dialogue</span>
                <span>·</span>
                <span>Conflict-Free Structuring</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black text-xs font-mono uppercase tracking-widest font-medium hover:bg-white/90 transition-all duration-300 group"
              >
                <span>Initiate Mandate</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/solutions"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white/[0.15] bg-transparent text-white text-xs font-mono uppercase tracking-widest hover:border-white/40 hover:bg-white/[0.04] transition-all duration-300"
              >
                <span>View Solutions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
