import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 mb-32">
        <h1 className="reveal-element text-5xl md:text-7xl font-medium tracking-tight leading-tight mb-12">
          A Vision <br /><span className="text-white/40">Beyond Numbers.</span>
        </h1>
        <div className="reveal-element w-full h-px bg-white/10 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <p className="reveal-element text-xl md:text-2xl font-light leading-relaxed text-balance">
            We were founded on a singular belief: true wealth management requires the rigor of institutional investing combined with deeply personalized advisory.
          </p>
          <div className="reveal-element flex flex-col gap-6 text-text-muted text-lg font-light leading-relaxed">
            <p>
              For over a decade, OneCapital has served as a trusted partner to individuals, families, and corporate entities, guiding them through complex financial landscapes.
            </p>
            <p>
              We do not chase fleeting market trends. Our mandate is to build resilient, long-term portfolios that preserve capital and deliver consistent growth across generations.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full bg-white/2 border-y border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="reveal-element text-xs uppercase tracking-widest text-text-muted font-mono mb-16">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Intellectual Rigor', text: 'Every investment decision is backed by deep research, quantitative analysis, and a structured evaluation process.' },
              { title: 'Absolute Alignment', text: 'We sit on the same side of the table as our clients. Our success is fundamentally tied to the long-term compounding of your wealth.' },
              { title: 'Radical Transparency', text: 'Clear reporting, transparent fee structures, and direct communication regarding portfolio risks and strategy adjustments.' }
            ].map((value, i) => (
              <div key={i} className="reveal-element glass-panel p-10 rounded-4xl">
                <div className="text-white/30 font-mono text-xs mb-8">0{i+1}</div>
                <h3 className="text-2xl font-medium tracking-tight mb-4">{value.title}</h3>
                <p className="text-text-muted text-balance">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
