import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';

export function AboutStorySection() {
  return (
    <Section
      pad="none"
      className="relative w-full border-b border-white/10 py-16 sm:py-20 lg:py-28 bg-black text-white overflow-hidden"
      aria-labelledby="about-architecture-heading"
    >
      <Container className="max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-stretch">
          {/* Left Column: Heading + Core Philosophy (Aligned towards top) */}
          <RevealOnScroll className="lg:col-span-4 flex flex-col justify-start self-start lg:pt-3">
            <span className="text-xs uppercase tracking-[0.22em] font-mono text-zinc-400 mb-3 block">
              Our Story &bull; Genesis
            </span>
            <h2
              id="about-architecture-heading"
              className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] font-semibold tracking-tight text-white leading-[1.15] mb-6 sm:mb-8"
            >
              Disciplined Wealth,<br />
              Built in Pune
            </h2>
            <p className="text-base lg:text-[17px] xl:text-lg text-zinc-400 font-normal leading-relaxed">
              One Capital Investment Private Limited is a Pune-based financial services firm founded in 2025. We help individuals and businesses grow wealth through strategic, disciplined investment advisory, portfolio management, and long-term wealth planning tailored to each client&apos;s goals.
            </p>
          </RevealOnScroll>

          {/* Center Column: Framed Executive Office & Metropolis View */}
          <RevealOnScroll delay={0.1} className="lg:col-span-4 flex justify-center items-center self-center w-full">
            <div className="relative w-full max-w-[420px] aspect-[4/4.7] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-white/15 bg-white/[0.02] shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
              <img
                src="/images/about-story.jpg"
                alt="OneCapital advisory workspace — Pune headquarters"
                className="w-full h-full object-cover object-[center_28%] sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px] ring-1 ring-inset ring-white/10" />
            </div>
          </RevealOnScroll>

          {/* Right Column: Services & approach */}
          <RevealOnScroll delay={0.18} className="lg:col-span-4 flex flex-col justify-end self-end lg:pb-3 space-y-6 sm:space-y-8">
            <p className="text-base lg:text-[17px] xl:text-lg text-zinc-400 font-normal leading-relaxed">
              Our approach combines market insight, risk management, and personalized strategy — spanning mutual funds, portfolio management services, wealth planning, tax strategy, and access to alternative allocations such as AIFs, startup equity, and structured real-estate products.
            </p>
            <p className="text-base lg:text-[17px] xl:text-lg text-zinc-400 font-normal leading-relaxed">
              Through 1capital.in, we bridge financial aspirations and outcomes with transparent advisory — helping clients build, preserve, and compound wealth with clarity across market cycles.
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}

