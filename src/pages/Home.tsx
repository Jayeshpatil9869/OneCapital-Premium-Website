import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BarChart3, Globe, Shield, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// We register ScrollTrigger inside the Layout but safe to register here too.
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-heading', { y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: 'power4.out' }, '-=0.6')
        .from('.hero-desc', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.6')
        .from('.hero-visual', { opacity: 0, scale: 0.95, duration: 1.5, ease: 'power2.out' }, '-=0.8');

      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full flex flex-col items-center">
      
      {/* 01 - HERO */}
      <section className="w-full min-h-[90vh] max-w-7xl mx-auto px-6 pt-24 lg:pt-32 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 w-1/2 h-[80vh] bg-gradient-to-b from-white/[0.03] to-transparent rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl z-10">
          <div className="hero-eyebrow flex items-center gap-3 mb-8">
            <span className="w-8 h-[1px] bg-white/30" />
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-text-muted">A Vision Beyond Numbers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight font-medium mb-8">
            <span className="hero-heading block">Institutional</span>
            <span className="hero-heading block text-white/70">Wealth Command.</span>
          </h1>
          
          <p className="hero-desc text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-12 text-balance">
            OneCapital is a sophisticated wealth-management partner helping select clients understand, build, manage and preserve wealth over the long term.
          </p>
          
          <div className="hero-cta flex flex-wrap items-center gap-6">
            <Link to="/contact" className="glass-panel px-8 py-4 rounded-full text-sm uppercase tracking-wide font-medium hover:bg-white hover:text-black transition-all duration-500 group flex items-center gap-2">
              Start Your Legacy
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/solutions" className="text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
              Explore Solutions
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="hero-visual mt-20 lg:mt-32 w-full h-[40vh] md:h-[60vh] glass-panel rounded-t-3xl border-b-0 relative overflow-hidden flex flex-col">
          <div className="w-full border-b border-white/10 px-6 py-4 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <div className="text-xs font-mono text-white/40 tracking-wider">ONE.CAPITAL // PORTFOLIO INTELLIGENCE</div>
          </div>
          <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-text-muted font-mono">Consolidated AUM</span>
              <span className="text-3xl font-medium tracking-tight">On Request</span>
              <div className="w-full h-[1px] bg-white/10 mt-4" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-text-muted font-mono">YTD Performance</span>
              <span className="text-3xl font-medium tracking-tight text-white/70">+14.2%</span>
              <div className="w-full h-[1px] bg-white/10 mt-4" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-text-muted font-mono">Active Mandates</span>
              <span className="text-3xl font-medium tracking-tight text-white/70">8</span>
              <div className="w-full h-[1px] bg-white/10 mt-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 02 - TRUST METRICS */}
      <section className="reveal-section w-full border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { label: 'Founded', value: '2010', suffix: '' },
            { label: 'Client Retention', value: '98', suffix: '%' },
            { label: 'Advisory Team', value: '25', suffix: '+' },
            { label: 'Market Experience', value: '15', suffix: ' Yrs' },
          ].map((metric, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-3xl md:text-5xl font-medium tracking-tighter">
                {metric.value}<span className="text-white/40 font-light">{metric.suffix}</span>
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted font-mono">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 - ABOUT PREVIEW */}
      <section className="reveal-section w-full max-w-7xl mx-auto px-6 py-32 lg:py-48 flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl tracking-tight font-medium leading-tight">
            Wealth is more than capital. It is continuity.
          </h2>
          <Link to="/about" className="w-fit text-sm uppercase tracking-wide text-white hover:text-white/70 transition-colors flex items-center gap-2 group mt-4">
            Our Story
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-8 text-lg md:text-xl text-text-muted leading-relaxed font-light text-balance">
          <p>
            At OneCapital, we view wealth management through an institutional lens. We bring the discipline, research, and precision of large-scale asset management to the private portfolios of individuals, families, and organizations.
          </p>
          <p>
            Our approach goes beyond generic allocations. We build tailored financial architectures designed to withstand market cycles, optimize tax efficiency, and transfer value across generations.
          </p>
        </div>
      </section>

      {/* 04 - SOLUTIONS OVERVIEW */}
      <section className="w-full bg-white/[0.02] border-y border-white/10">
        <div className="reveal-section max-w-7xl mx-auto px-6 py-32 lg:py-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium leading-none">
              A single unified <br/>
              <span className="text-white/40">view of your wealth.</span>
            </h2>
            <Link to="/solutions" className="glass-panel px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-2 group w-fit">
              View All Solutions
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Solution */}
            <Link to="/solutions" className="md:col-span-2 group glass-panel p-10 lg:p-16 rounded-3xl relative overflow-hidden flex flex-col justify-end min-h-[40vh]">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                <Globe className="w-24 h-24 stroke-[0.5]" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="w-12 h-[1px] bg-white mb-8 transition-all duration-500 group-hover:w-24" />
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Wealth Management</h3>
                <p className="text-text-muted text-lg mb-8">Comprehensive advisory covering asset allocation, portfolio strategy, and continuous risk monitoring tailored to your specific mandate.</p>
                <div className="flex items-center gap-2 text-sm uppercase tracking-wide">
                  Explore Offering <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Secondary Solutions */}
            {[
              { title: 'Elite PMS', desc: 'Custom mandates with direct ownership, strategic overlays, and complete transparency.', icon: Activity, path: '/solutions' },
              { title: 'Mutual Fund 360', desc: 'Goal-based allocations managed with rigorous fund-selection philosophy.', icon: BarChart3, path: '/solutions' },
              { title: 'Alternative Assets', desc: 'Access to carefully vetted pre-IPO, private debt, and real estate opportunities.', icon: Shield, path: '/solutions' },
              { title: 'Wealth Planning', desc: 'Financial architectures encompassing retirement, tax, and legacy planning.', icon: Globe, path: '/solutions' },
            ].map((sol, idx) => (
              <Link key={idx} to={sol.path} className="group glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                <sol.icon className="w-8 h-8 text-white/30 mb-12 group-hover:text-white transition-colors duration-500" strokeWidth={1} />
                <h3 className="text-2xl font-medium tracking-tight mb-3">{sol.title}</h3>
                <p className="text-text-muted text-balance">{sol.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                  Details <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 05 - OUR APPROACH (PREVIEW) */}
      <section className="reveal-section w-full max-w-7xl mx-auto px-6 py-32 lg:py-48 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl tracking-tight font-medium mb-8">Discipline over <span className="text-white/40">emotion.</span></h2>
        <p className="text-lg text-text-muted max-w-2xl mb-16 text-balance">
          We operate on a stringent 6-stage framework that removes emotional bias and ensures your portfolio remains aligned with your long-term objectives through every market cycle.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['Discover', 'Diagnose', 'Design', 'Implement', 'Monitor', 'Evolve'].map((stage, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="glass-panel px-6 py-3 rounded-full text-sm tracking-wide flex items-center gap-3">
                <span className="text-white/30 font-mono text-xs">0{i+1}</span>
                {stage}
              </div>
              {i !== 5 && <div className="hidden md:block w-8 h-[1px] bg-white/20" />}
            </div>
          ))}
        </div>

        <Link to="/approach" className="w-fit text-sm uppercase tracking-wide text-white hover:text-white/70 transition-colors flex items-center gap-2 group">
          View Detailed Methodology
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* 06 - CTA SECTION */}
      <section className="w-full px-6 py-24 mb-12">
        <div className="reveal-section max-w-7xl mx-auto glass-panel p-12 md:p-24 rounded-[2rem] text-center flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.05] to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-6xl tracking-tight font-medium mb-6 relative z-10">Start Your Legacy.</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto mb-12 text-balance relative z-10">
            Request an advisory consultation to discuss your portfolio, goals, and how OneCapital can serve as your dedicated wealth partner.
          </p>
          <Link to="/contact" className="bg-white text-black px-10 py-5 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-all flex items-center gap-3 group relative z-10">
            Request a Consultation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
      
    </div>
  );
}
