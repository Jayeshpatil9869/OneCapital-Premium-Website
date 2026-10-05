import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container } from '@/src/components/ui';
import { ABOUT_PAGE } from '@/src/data/about';

export function AboutHero() {
  const { hero } = ABOUT_PAGE;

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <img
          src="/images/about-hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover object-center select-none"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.28)_32%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.88)_82%,#000000_100%)]" />
      </div>

      <Container className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-8 lg:px-12 pt-[max(7.5rem,env(safe-area-inset-top))] pb-14 sm:pb-16 lg:pb-20">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 max-w-[1100px]">
          <RevealOnScroll trigger="load" direction="up" distance={32} duration={1.1} delay={0.1} ease="power3.out">
            <h1 className="font-sans text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[4.2rem] xl:text-[4.2rem]">
              {hero.line1}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll trigger="load" direction="up" distance={24} duration={1} delay={0.22} ease="power3.out">
            <div className="border-t border-white/15 pt-6 sm:pt-8">
              <p className="max-w-[36rem] text-[15px] font-light leading-[1.65] text-white/85 sm:text-base lg:text-lg">
                {hero.description}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
