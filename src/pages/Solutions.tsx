import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Solutions() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-element').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      id: 'wealth-management',
      title: 'Wealth Management',
      subtitle: 'One connected view of your wealth.',
      description: 'Our core advisory offering. We take a holistic approach to your financial life, integrating asset allocation, risk management, and continuous monitoring to build a resilient portfolio architecture.',
      features: ['Goal Discovery & Financial Diagnosis', 'Custom Portfolio Strategy', 'Continuous Risk Monitoring', 'Strategic Rebalancing', 'Legacy Considerations']
    },
    {
      id: 'wealth-planning',
      title: 'Wealth Planning',
      subtitle: 'A financial plan built around your life.',
      description: 'Wealth requires structure. We map out cash-flow requirements, retirement horizons, education funding, and estate planning to ensure your capital serves your life objectives.',
      features: ['Retirement Modeling', 'Cash-flow Analysis', 'Tax Optimization Strategies', 'Generational Wealth Transfer']
    },
    {
      id: 'pms',
      title: 'Portfolio Management Services (PMS)',
      subtitle: 'Elite, customized investment mandates.',
      description: 'For investors seeking direct ownership of securities with professional management. We construct bespoke portfolios with active sector overlays, micro-allocation controls, and complete transparency.',
      features: ['Direct Demat Ownership', 'Custom Sector Overlays', 'Active Risk Management', 'Transparent Cost Structure']
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Fund 360',
      subtitle: 'Institutional rigor in fund selection.',
      description: 'We navigate the vast mutual fund universe using a proprietary evaluation framework, selecting funds that demonstrate consistent alpha generation, robust downside protection, and disciplined style adherence.',
      features: ['Proprietary Fund Selection', 'Strategic Asset Allocation', 'Tactical Market Entries', 'Continuous Portfolio Review']
    },
    {
      id: 'aif',
      title: 'Alternative Investment Funds (AIF)',
      subtitle: 'Uncorrelated returns for sophisticated portfolios.',
      description: 'Access exclusive private markets, real estate, and private debt opportunities designed to provide portfolio diversification and enhanced yield outside of traditional public markets.',
      features: ['Pre-IPO Opportunities', 'Private Credit & Debt', 'Rigorous Due Diligence', 'Illiquidity Premium Harvesting']
    }
  ];

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-32">
      {/* Hero */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-32 text-center flex flex-col items-center">
        <h1 className="reveal-element text-[clamp(2.25rem,1.2rem+4.5vw,4.5rem)] font-medium tracking-tight leading-tight break-words mb-8">
          Architectural <span className="text-white/40">Precision.</span>
        </h1>
        <p className="reveal-element text-xl text-text-muted max-w-2xl text-balance">
          Our suite of sophisticated wealth solutions is designed to address the complex requirements of high-net-worth individuals and corporate entities.
        </p>
      </section>

      {/* Solutions List */}
      <section className="w-full max-w-6xl mx-auto px-6 flex flex-col gap-24">
        {solutions.map((sol, index) => (
          <div key={sol.id} className="reveal-element grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16">
            <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28">
              <span className="text-xs font-mono text-white/40 tracking-widest uppercase">0{index + 1} // {sol.id.replace('-', ' ')}</span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{sol.title}</h2>
              <h3 className="text-xl text-white/70 font-light mt-2">{sol.subtitle}</h3>
            </div>
            
            <div className="lg:col-span-7 flex flex-col gap-10">
              <p className="text-lg text-text-muted leading-relaxed">{sol.description}</p>
              
              <div className="flex flex-col gap-4">
                <h4 className="text-xs uppercase tracking-widest text-text-muted font-mono">Key Capabilities</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sol.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/contact" className="w-fit text-sm uppercase tracking-wide text-white hover:text-white/70 transition-colors flex items-center gap-2 group mt-4">
                Request Strategy Session
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
