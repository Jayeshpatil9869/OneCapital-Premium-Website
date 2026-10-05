import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Button, Container } from '@/src/components/ui';
import type { SolutionDedicatedConfig } from '@/src/data/solutions-pages';
import { getPillarById } from '@/src/data/solutions-pillars';
import { SolutionsBreadcrumb } from './shared/SolutionsBreadcrumb';

type SolutionPageHeroProps = {
  config: SolutionDedicatedConfig;
};

/**
 * Same page-shell as About / Team / Solutions hub so left edge + bottom
 * band land on the same grid: max-w-[1400px], px-6/8/12, pb-14→20.
 */
export function SolutionPageHero({ config }: SolutionPageHeroProps) {
  const { hero } = config;
  const pillarTitle = getPillarById(config.pillarId)?.title ?? config.pillarId;

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-end overflow-x-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        {hero.image && (
          <img
            src={hero.image}
            alt=""
            className="h-full w-full select-none object-cover"
            style={{ objectPosition: hero.imagePosition ?? 'center' }}
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.28)_32%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.88)_82%,#000000_100%)]" />
      </div>

      <Container className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-14 pt-[max(7.5rem,env(safe-area-inset-top))] sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="flex max-w-[1100px] flex-col">
          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={32}
            duration={1.1}
            delay={0.1}
            ease="power3.out"
          >
            <SolutionsBreadcrumb current={pillarTitle} />
            <h1 className="mt-6 max-w-[1100px] font-sans text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:mt-8 sm:text-6xl md:text-7xl lg:text-[4.2rem] xl:text-[4.2rem]">
              {hero.headline}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll
            trigger="load"
            direction="up"
            distance={24}
            duration={1}
            delay={0.22}
            ease="power3.out"
            className="mt-8 sm:mt-10 lg:mt-12"
          >
            <p className="max-w-[36rem] text-[15px] font-light leading-[1.65] text-white/85 sm:text-base lg:text-lg">
              {hero.subheadline}
            </p> 
            <div className="mt-8 sm:mt-10">
              <Button to="/contact" variant="primary" size="md" arrow="right">
                Request Strategy Session
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
