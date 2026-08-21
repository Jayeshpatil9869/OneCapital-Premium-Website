import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-element').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          y: 30,
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
      <section className="w-full max-w-5xl mx-auto px-6 mb-24 text-center flex flex-col items-center">
        <h1 className="reveal-element text-[clamp(2.25rem,1.2rem+4.5vw,4.5rem)] font-medium tracking-tight leading-tight break-words mb-8">
          Clarity in <span className="text-white/40">complexity.</span>
        </h1>
        <p className="reveal-element text-xl text-text-muted max-w-2xl text-balance">
          Perspectives from OneCapital on markets, allocation, and the architecture of enduring wealth.
        </p>
      </section>

      <section className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((item) => (
          <article
            key={item.title}
            className="reveal-element group glass-panel p-8 md:p-10 rounded-3xl flex flex-col"
          >
            <span className="text-xs uppercase tracking-widest text-text-muted font-mono mb-6">
              {item.category}
            </span>
            <h2 className="text-2xl font-medium tracking-tight mb-4 group-hover:text-white/90 transition-colors">
              {item.title}
            </h2>
            <p className="text-text-muted text-balance flex-grow mb-8">{item.excerpt}</p>
            <Link
              to="/contact"
              className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors flex items-center gap-2 w-fit"
            >
              Discuss with an advisor
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
