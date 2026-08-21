import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leadership = [
  {
    name: 'Advisory Partners',
    role: 'Investment Committee',
    bio: 'Seasoned portfolio strategists with multi-cycle experience across equities, fixed income, and alternatives.',
  },
  {
    name: 'Research Desk',
    role: 'Market Intelligence',
    bio: 'Dedicated analysts evaluating funds, managers, and private opportunities with institutional due diligence.',
  },
  {
    name: 'Client Advisors',
    role: 'Relationship Architecture',
    bio: 'Private bankers and planners who translate complex mandates into clear, long-horizon wealth plans.',
  },
];

export default function Team() {
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
      <section className="w-full max-w-5xl mx-auto px-6 mb-32">
        <h1 className="reveal-element text-[clamp(2.25rem,1.2rem+4.5vw,4.5rem)] font-medium tracking-tight leading-tight break-words mb-12">
          Judgment. <br />
          <span className="text-white/40">Discipline. Trust.</span>
        </h1>
        <div className="reveal-element w-full h-[1px] bg-white/10 mb-12" />
        <p className="reveal-element text-xl md:text-2xl font-light leading-relaxed text-text-muted max-w-3xl text-balance">
          OneCapital is built by practitioners who have managed capital through cycles—not commentators. Our team combines investment research, portfolio construction, and private-client advisory under one roof.
        </p>
      </section>

      <section className="w-full bg-white/[0.02] border-y border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="reveal-element text-xs uppercase tracking-widest text-text-muted font-mono mb-16">
            Leadership Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <div key={member.name} className="reveal-element glass-panel p-10 rounded-[2rem]">
                <div className="text-white/30 font-mono text-xs mb-8">0{i + 1}</div>
                <h3 className="text-2xl font-medium tracking-tight mb-2">{member.name}</h3>
                <p className="text-sm uppercase tracking-widest text-text-muted font-mono mb-6">
                  {member.role}
                </p>
                <p className="text-text-muted text-balance">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 pt-32 flex flex-col items-center text-center">
        <h2 className="reveal-element text-3xl md:text-4xl font-medium tracking-tight mb-6">
          Speak with our advisory desk.
        </h2>
        <p className="reveal-element text-text-muted max-w-xl mb-10 text-balance">
          Schedule a private consultation to meet the team responsible for your mandate.
        </p>
        <Link
          to="/contact"
          className="reveal-element glass-panel px-8 py-4 rounded-full text-sm uppercase tracking-wide font-medium hover:bg-white hover:text-black transition-all duration-500 group flex items-center gap-2"
        >
          Book Consultation
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
