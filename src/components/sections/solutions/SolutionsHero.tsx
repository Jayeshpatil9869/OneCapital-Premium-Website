import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Button, Container } from '@/src/components/ui';
import { SOLUTIONS_HUB } from '@/src/data/solutions-pages';

export function SolutionsHero() {
  const { hero } = SOLUTIONS_HUB;

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src={hero.image}
          alt=""
          className="h-full w-full select-none object-cover object-[center_35%] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.28)_32%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.9)_82%,#000000_100%)]" />
      </div>

      <Container className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 pt-[max(7.5rem,env(safe-area-inset-top))] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="flex max-w-[1100px] flex-col gap-8 sm:gap-10 lg:gap-12">
          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={32}
            duration={1.1}
            delay={0.1}
            ease="power3.out"
          >
            <p className="mb-5 text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
              Our Solutions
            </p>
            <h1 className="font-sans text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[4.2rem] xl:text-[4.2rem]">
              <span className="block">{hero.line1}</span>
              <span className="block text-white/40">{hero.line2}</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={24}
            duration={1}
            delay={0.22}
            ease="power3.out"
          >
            <div className="flex flex-col gap-8 border-t border-white/15 pt-6 sm:pt-8">
              <p className="max-w-[38rem] font-sans text-[15px] font-light leading-[1.65] text-white/75 sm:text-base lg:text-lg">
                {hero.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button to="/solutions#pillars" variant="primary" size="md" arrow="right">
                  Explore disciplines
                </Button>
                <Button to="/contact" variant="pill" size="sm" arrow="up-right">
                  Request session
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
