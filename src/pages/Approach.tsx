import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    title: 'DISCOVER',
    desc: 'We begin by understanding the architecture of your financial life. This involves deep conversations about your liquidity needs, risk tolerance, generational wealth goals, and existing asset structures.',
  },
  {
    num: '02',
    title: 'DIAGNOSE',
    desc: 'Our analytical team dissects your current portfolio. We identify hidden risks, structural inefficiencies, tax leakages, and areas where your capital is underperforming relative to its potential.',
  },
  {
    num: '03',
    title: 'DESIGN',
    desc: 'We engineer a bespoke portfolio architecture. This involves strategic asset allocation, selecting optimal investment vehicles, and establishing a rigorous framework for decision-making.',
  },
  {
    num: '04',
    title: 'IMPLEMENT',
    desc: 'Execution requires precision. We deploy capital methodically, taking advantage of tactical entry points while ensuring tax-efficient transitions from legacy holdings.',
  },
  {
    num: '05',
    title: 'MONITOR',
    desc: 'Markets are dynamic; your strategy must be resilient. We employ continuous risk monitoring, stress-testing your portfolio against macro-economic shifts and black-swan events.',
  },
  {
    num: '06',
    title: 'EVOLVE',
    desc: 'As your life and the markets change, so must your plan. We conduct strategic rebalancing and periodic reviews to ensure your wealth command remains optimally aligned with your legacy.',
  },
];

export default function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setup = () => {
      const isDesktop = window.innerWidth >= 1024;
      const ctx = gsap.context(() => {
        if (
          isDesktop &&
          !prefersReducedMotion() &&
          scrollWrapperRef.current &&
          containerRef.current
        ) {
          const sections = gsap.utils.toArray('.approach-step');

          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: true,
              snap: 1 / (sections.length - 1),
              end: () => '+=' + scrollWrapperRef.current!.offsetWidth,
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
              The Framework of <br />
              <span className="text-white/40">Wealth Command.</span>
            </DisplayHeading>
            <BodyText className="max-w-2xl text-base md:text-lg">
              A disciplined, six-stage methodology designed to remove emotional bias and
              engineer predictable outcomes in an unpredictable market.
            </BodyText>
          </RevealOnScroll>
        </Container>
      </Section>

      <div
        ref={containerRef}
        className="flex w-full min-w-0 items-center overflow-hidden border-y border-white/10 bg-white/[0.02] lg:h-dvh"
      >
        <div
          ref={scrollWrapperRef}
          className="flex w-full flex-col lg:w-[600%] lg:flex-row"
        >
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="approach-step flex h-auto w-full flex-shrink-0 items-center justify-center border-b border-white/5 p-6 py-16 last:border-0 md:py-24 lg:h-[70dvh] lg:w-[16.666666%] lg:border-r lg:border-b-0 lg:py-0"
            >
              <div className="flex w-full min-w-0 max-w-xl flex-col items-center px-1 text-center lg:items-start lg:text-left">
                <div className="pointer-events-none mb-8 text-[clamp(4rem,12vw,12rem)] leading-none font-medium tracking-tighter text-white/[0.03] mix-blend-screen">
                  {step.num}
                </div>
                <SectionHeading className="mb-8 text-white uppercase">
                  {step.title}
                </SectionHeading>
                <div className="mb-8 h-px w-12 bg-white/20" aria-hidden />
                <BodyText className="text-base md:text-lg">{step.desc}</BodyText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
