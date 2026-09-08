import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';

export function TeamHero() {
  return (
    <section className="relative w-full min-h-[85svh] lg:min-h-[92svh] flex flex-col justify-end overflow-hidden bg-black text-white">
      {/* Background Image & Cinematic Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src="/images/team-hero-bg.jpg"
          alt="OneCapital corporate office interior"
          className="h-full w-full object-cover object-[center_35%] lg:object-center select-none"
        />
        {/* Cinematic dark gradient matching the reference */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.25)_35%,rgba(0,0,0,0.60)_65%,rgba(0,0,0,0.92)_88%,#000000_100%)]" />
      </div>

      <Container className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-8 lg:px-12 pt-[max(7.5rem,env(safe-area-inset-top))] pb-14 sm:pb-16 lg:pb-20">
        <div className="flex flex-col gap-8 sm:gap-12 max-w-5xl">
          {/* Main 2-Line Left-Aligned Headline */}
          <RevealOnScroll trigger="load" direction="up" distance={32} duration={1.1} delay={0.1} ease="power3.out">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[80px] font-bold tracking-tight leading-[1.05] text-white">
              <span>Our team,</span>
              <br />
              <span className="text-white/45 font-medium">our leadership.</span>
            </h1>
          </RevealOnScroll>

          {/* Bottom Two-Column Split Layout */}
          <RevealOnScroll trigger="load" direction="up" distance={24} duration={1} delay={0.22} ease="power3.out">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pt-6 sm:pt-8 border-t border-white/10 items-start">
              {/* Left Column: Metadata Specs */}
              <div className="lg:col-span-4 flex flex-col gap-1 font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white/45">
                <p>DISCIPLINE /</p>
                <p>PORTFOLIO ARCHITECTS &bull; ADVISORY</p>
                <p>STEWARDSHIP &mdash; LONG TERM</p>
              </div>

              {/* Right Column: Paragraph */}
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed max-w-2xl">
                  Meet the leaders and portfolio architects steering generational wealth with unwavering discipline, discretion, and institutional trust. A collective of seasoned investment advisors built for deliberate capital compounding.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
