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
    <div className="w-full flex flex-col items-center pb-32">
      {/* Hero */}
      <section className="w-full border-b border-white/10 bg-black text-white">
        <div className="w-full max-w-5xl mx-auto px-6 pt-32 pb-24 lg:pb-32">
          <h1 className="reveal-element text-[clamp(2.25rem,1.2rem+4.5vw,4.5rem)] font-medium tracking-tight leading-tight break-words mb-12">
            A Vision <br /><span className="text-white/40">Beyond Numbers.</span>
          </h1>
          <div className="reveal-element w-full h-px bg-white/10 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="reveal-element text-xl md:text-2xl font-light leading-relaxed text-balance text-white">
              We were founded on a singular belief: enduring wealth requires institutional rigor, independent thinking, and bespoke capital stewardship — not conventional advisory templates.
            </p>
            <div className="reveal-element flex flex-col gap-6 text-text-muted text-lg font-light leading-relaxed">
              <p>
                ONE CAPITAL INVESTMENT PRIVATE LIMITED is a Pune-based financial services firm focused on helping individuals and businesses grow their wealth through strategic and disciplined investment solutions. Incorporated in 2025, we specialize in investment advisory, portfolio management, and long-term wealth planning tailored to each client's financial goals.
              </p>
              <p>
                Our approach combines market insights, risk management, and personalized strategies to deliver consistent and transparent financial growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full border-b border-white/10 py-32">
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
