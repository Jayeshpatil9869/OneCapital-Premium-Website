import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  PORTFOLIO_MANAGEMENT_FOOTNOTE,
  SOLUTION_PILLARS,
  type SolutionPillar,
  type SolutionService,
} from '@/src/data/solutions-pillars';

gsap.registerPlugin(ScrollTrigger);

function PillarNav() {
  return (
    <nav
      aria-label="Solution pillars"
      className="reveal-element hidden lg:flex flex-wrap justify-center gap-x-6 gap-y-2 mb-16 text-xs font-mono uppercase tracking-widest text-white/40"
    >
      {SOLUTION_PILLARS.map((pillar) => (
        <a
          key={pillar.id}
          href={`#${pillar.id}`}
          className="hover:text-white transition-colors"
        >
          {pillar.index} {pillar.title}
        </a>
      ))}
    </nav>
  );
}

function ServiceBlock({ service }: { service: SolutionService }) {
  return (
    <article
      id={service.id}
      className="flex flex-col gap-3 border-t border-white/10 pt-8 first:border-t-0 first:pt-0 scroll-mt-28"
    >
      <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
        {service.title}
      </h3>
      <p className="text-lg font-medium text-white/80">{service.tagline}</p>
      <p className="text-base text-text-muted leading-relaxed">{service.description}</p>
    </article>
  );
}

function PillarSection({ pillar }: { pillar: SolutionPillar }) {
  const showFootnote = pillar.id === 'portfolio-management';

  return (
    <section
      id={pillar.id}
      aria-labelledby={`pillar-heading-${pillar.id}`}
      className="reveal-element grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/10 pt-16 scroll-mt-28"
    >
      <div className="lg:col-span-5 flex flex-col gap-4 lg:sticky lg:top-28">
        <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
          {pillar.index} // {pillar.id.replace(/-/g, ' ')}
        </span>
        <h2
          id={`pillar-heading-${pillar.id}`}
          className="text-3xl md:text-4xl font-medium tracking-tight"
        >
          {pillar.title}
        </h2>
        <p className="text-xl text-white/70 font-light mt-2">{pillar.summary}</p>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-10">
        <div className="flex flex-col gap-8">
          {pillar.services.map((service) => (
            <ServiceBlock key={service.id} service={service} />
          ))}
        </div>

        {showFootnote && (
          <p className="text-sm text-white/50 leading-relaxed border-t border-white/10 pt-6">
            {PORTFOLIO_MANAGEMENT_FOOTNOTE}
          </p>
        )}

        <Link
          to="/contact"
          className="w-fit text-sm uppercase tracking-wide text-white hover:text-white/70 transition-colors flex items-center gap-2 group mt-2"
        >
          Request Strategy Session
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

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

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-32">
      <section className="w-full max-w-7xl mx-auto px-6 mb-16 text-center flex flex-col items-center">
        <h1 className="reveal-element text-[clamp(2.25rem,1.2rem+4.5vw,4.5rem)] font-medium tracking-tight leading-tight break-words mb-8">
          The steward and architect of{' '}
          <span className="text-white/40">your capital.</span>
        </h1>
        <p className="reveal-element text-xl text-text-muted max-w-2xl text-balance">
          Discretion, sophistication, and institutional-quality thinking — structured across four
          disciplines of capital stewardship for ultra-high-net-worth families and principals.
        </p>
      </section>

      <div className="w-full max-w-6xl mx-auto px-6">
        <PillarNav />
      </div>

      <section className="w-full max-w-6xl mx-auto px-6 flex flex-col gap-24">
        {SOLUTION_PILLARS.map((pillar) => (
          <PillarSection key={pillar.id} pillar={pillar} />
        ))}
      </section>
    </div>
  );
}
