import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import { INSIGHTS_PAGE } from '@/src/data/insights';

export function InsightsMasthead() {
  const { hero } = INSIGHTS_PAGE;

  return (
    <section className="relative flex min-h-[70svh] w-full flex-col justify-end overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={hero.image}
          alt=""
          className="h-full w-full select-none object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.55)_40%,rgba(0,0,0,0.88)_78%,#000000_100%)]" />
      </div>

      <Container className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 pt-[max(7.5rem,env(safe-area-inset-top))] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={28}
              duration={1}
              delay={0.08}
              ease="power3.out"
            >
              <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
                Perspectives
              </p>
              <h1 className="max-w-[16ch] font-sans text-[2.35rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[3.75rem]">
                <span className="block">{hero.line1}</span>
                <span className="block font-medium text-white/40">{hero.line2}</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll
              trigger="load"
              direction="up"
              distance={20}
              duration={0.95}
              delay={0.2}
              ease="power3.out"
              className="mt-8 sm:mt-10"
            >
              <div className="grid grid-cols-1 gap-6 border-t border-white/15 pt-6 sm:pt-8 lg:grid-cols-12 lg:gap-8">
                <div className="flex flex-col gap-0.5 text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-white/55 sm:text-xs lg:col-span-4">
                  {hero.meta.map((line) => (
                    <p key={line} className="lg:whitespace-nowrap">
                      {line}
                    </p>
                  ))}
                </div>
                <p className="max-w-[34rem] font-sans text-[15px] font-light leading-[1.65] text-white/80 sm:text-base lg:col-span-8 lg:text-lg">
                  {hero.description}
                </p>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={16}
            duration={0.9}
            delay={0.28}
            ease="power3.out"
            className="hidden lg:col-span-4 lg:block"
          >
            <div className="flex items-stretch gap-5 border-l border-[var(--color-gold-warm)]/50 pl-6">
              <ul className="flex flex-col justify-center gap-4">
                {hero.keywords.map((word) => (
                  <li
                    key={word}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
