import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '@/src/data/company';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { prefersReducedMotion } from '@/src/lib/motion';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import {
  Container,
  Section,
  Eyebrow,
  DisplayHeading,
  SectionHeading,
  BodyText,
} from '@/src/components/ui';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'UNDERSTAND',
    desc: 'We first understand the economy and the markets: interest rates, liquidity, market cycles, and the broader trend. History is part of that picture. It is not enough on its own.',
  },
  {
    num: '02',
    title: 'ANALYSE',
    desc: 'We then analyse sectors, companies, earnings, valuations, market trends, and risks. The question is what could drive the result from here, not only what already happened.',
  },
  {
    num: '03',
    title: 'IDENTIFY',
    desc: 'From that research we identify the opportunity: a fund, a business, a theme, or a reason to wait. The solution follows the investor’s requirement.',
  },
  {
    num: '04',
    title: 'BUILD',
    desc: 'We build the investment strategy around that opportunity. Mutual funds, PMS, AIF, equity, equity baskets, and options baskets are how the same research view is put to work.',
  },
  {
    num: '05',
    title: 'MONITOR',
    desc: 'We keep watching the investment thesis after the money is invested. If the original case no longer holds, the holding is revisited. The larger trend and the risks stay in view.',
  },
];

const DIFFERENCES = [
  {
    title: 'We look forward, not just backward',
    body: 'Past performance tells us what happened. The research focuses on what could drive performance from here.',
  },
  {
    title: 'Research before recommendation',
    body: 'We do not start with a product and look for an investor to fit it. Research and the investor’s requirement come first. The appropriate solution follows.',
  },
  {
    title: 'One research engine across products',
    body: 'The same research supports mutual funds, PMS, AIF, equity, equity baskets, and options baskets. An opportunity is looked at across those solutions, not inside one product alone.',
  },
  {
    title: 'Strategy over short-term noise',
    body: 'Markets move every day. The focus is the larger trend, the opportunity underneath it, and the risks, rather than every short-term move.',
  },
  {
    title: 'Risk is part of the research',
    body: 'The question is not only what an investment can make. It is also what can go wrong. Understanding the downside is part of the process.',
  },
];

export default function Approach() {
  usePageSeo({
    title: `Investment Research Approach | ${COMPANY.brandName}`,
    description:
      'OneCapital studies the economy, markets, sectors, and valuations before a recommendation. Research first, then the strategy, then the investment.',
    path: '/approach',
    keywords: [
      'investment research process',
      'wealth management approach Pune',
      'OneCapital advisory process',
    ],
    type: 'website',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect so cleanup runs before Layout's route ScrollTrigger.refresh().
  useLayoutEffect(() => {
    const setup = () => {
      const isDesktop = window.innerWidth >= 1024;
      const ctx = gsap.context(() => {
        const track = scrollWrapperRef.current;
        const pin = containerRef.current;

        if (
          isDesktop &&
          !prefersReducedMotion() &&
          track &&
          pin
        ) {
          const getTravel = () => Math.max(0, track.scrollWidth - pin.clientWidth);

          gsap.to(track, {
            x: () => -getTravel(),
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              pin: true,
              scrub: true,
              snap: 1 / (STEPS.length - 1),
              end: () => `+=${getTravel()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }
      }, containerRef);

      return ctx;
    };

    let ctx = setup();

    const onResize = () => {
      ctx.revert();
      ctx = setup();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full min-w-0">
      <Section pad="lg" className="pt-28 md:pt-32">
        <Container className="flex flex-col items-center text-center">
          <RevealOnScroll
            trigger="load"
            className="flex max-w-3xl flex-col items-center gap-5"
          >
            <Eyebrow centered>Our Approach</Eyebrow>
            <DisplayHeading className="text-white">
              Research. Strategy. <br />
              <span className="text-white/40">Discipline.</span>
            </DisplayHeading>
            <BodyText className="max-w-2xl text-base md:text-lg">
              Research helps us understand the opportunity. Strategy decides how to participate.
              Discipline keeps the focus through different market conditions. Research first.
              Strategy next. Investment last.
            </BodyText>
          </RevealOnScroll>
        </Container>
      </Section>

      <div
        ref={containerRef}
        className="flex w-full min-w-0 items-center overflow-hidden border-y border-white/10 bg-white/[0.02] lg:h-dvh"
      >
        {/*
          Track must not flex-shrink (was collapsing 600% → 100vw, so all 6
          panels looked narrow). Each desktop panel is intentionally wider
          than a sixth of the viewport so horizontal scrub still reveals them.
        */}
        <div
          ref={scrollWrapperRef}
          className="flex w-full flex-col will-change-transform lg:w-max lg:flex-shrink-0 lg:flex-row"
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="approach-step flex h-auto w-full flex-shrink-0 items-center justify-center border-b border-white/5 px-6 py-16 last:border-0 md:px-10 md:py-24 lg:h-[70dvh] lg:w-[68vw] lg:min-w-[32rem] lg:border-r lg:border-b-0 lg:px-16 lg:py-0"
            >
              <div className="flex w-full min-w-0 max-w-2xl flex-col items-center px-1 text-center lg:items-start lg:text-left">
                <div className="pointer-events-none mb-8 text-[clamp(4.5rem,14vw,11rem)] leading-none font-medium tracking-tighter text-white/[0.4] mix-blend-screen">
                  {step.num}
                </div>
                <SectionHeading className="mb-8 text-white uppercase">
                  {step.title}
                </SectionHeading>
                <div className="mb-8 h-px w-12 bg-white/20" aria-hidden />
                <BodyText className="text-base md:text-lg lg:text-xl">{step.desc}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Section pad="lg" className="border-t border-white/10">
        <Container>
          <Eyebrow>How One Capital is different</Eyebrow>
          <SectionHeading className="mt-4 max-w-3xl text-white">
            Research-led investing for what lies ahead.
          </SectionHeading>
          <ol className="mt-12 grid gap-10 md:grid-cols-2">
            {DIFFERENCES.map((item, index) => (
              <li key={item.title} className="border-t border-white/10 pt-6">
                <p className="font-mono text-xs tracking-widest text-text-muted">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">{item.title}</h3>
                <BodyText className="mt-3 text-base md:text-lg">{item.body}</BodyText>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </div>
  );
}


