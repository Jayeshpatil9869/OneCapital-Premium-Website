import { useLayoutEffect, useRef } from 'react';
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
import { COMPANY } from '@/src/data/company';

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
              The Framework of <br />
              <span className="text-white/40">Wealth Command.</span>
            </DisplayHeading>
            <BodyText className="max-w-2xl text-base md:text-lg">
              A disciplined, six-stage methodology designed to reduce emotional bias and keep
              portfolio decisions aligned with each client&apos;s goals through changing markets.
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

      {/* Inside OneCapital — Across Maharashtra Section */}
      <Section
        pad="lg"
        tone="panel"
        className="w-full border-t border-white/10 bg-[#050811] text-white"
        aria-labelledby="regional-presence-heading"
      >
        <Container>
          <RevealOnScroll className="mb-14 flex max-w-3xl flex-col gap-5">
            <Eyebrow>Inside OneCapital</Eyebrow>
            <DisplayHeading id="regional-presence-heading" className="text-white">
              Across Maharashtra
            </DisplayHeading>
            <BodyText className="max-w-2xl text-base md:text-lg">
              A glimpse into our work — from the Pune headquarters to regional advisory
              conversations across Mumbai, Kolhapur, and Nashik.
            </BodyText>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/40 hover:bg-[#080e1d] hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Headquarters
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">Pune</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
                  {COMPANY.hqStreet}
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  Central investment advisory desk, quantitative research, and long-term portfolio management command.
                </p>
              </div>
              <div className="mt-8 border-t border-white/10 pt-4 text-xs font-mono text-white/40">
                HQ Desk &bull; Core Advisory
              </div>
            </div>

            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-sky-500/40 hover:bg-[#080e1d] hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-sky-300">
                  Regional Desk
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">Mumbai</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
                  Financial Capital Presence
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  Connecting clients to mutual funds, structured products, and strategic wealth command with local accessibility.
                </p>
              </div>
              <div className="mt-8 border-t border-white/10 pt-4 text-xs font-mono text-white/40">
                Capital Desk &bull; Private Wealth
              </div>
            </div>

            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-amber-500/40 hover:bg-[#080e1d] hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-amber-300">
                  Regional Desk
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">Kolhapur</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
                  Western Maharashtra Hub
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  Partnering with families, business owners, and legacy estates on intergenerational wealth planning.
                </p>
              </div>
              <div className="mt-8 border-t border-white/10 pt-4 text-xs font-mono text-white/40">
                Legacy Desk &bull; Family Estates
              </div>
            </div>

            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all duration-500 hover:border-purple-500/40 hover:bg-[#080e1d] hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  Regional Desk
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">Nashik</h3>
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
                  Northern Maharashtra Hub
                </p>
                <p className="text-sm leading-relaxed text-white/60">
                  Extending disciplined advisory cadence, liquidity planning, and tax-efficient allocation strategies.
                </p>
              </div>
              <div className="mt-8 border-t border-white/10 pt-4 text-xs font-mono text-white/40">
                Advisory Desk &bull; Growth Mandates
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Where Knowledge Meets Practice Section */}
      <Section
        pad="lg"
        tone="dark"
        className="w-full border-t border-white/10 bg-black text-white"
        aria-labelledby="knowledge-practice-heading"
      >
        <Container>
          <RevealOnScroll className="mb-14 flex max-w-3xl flex-col gap-5">
            <Eyebrow>Perspective &amp; Counsel</Eyebrow>
            <DisplayHeading id="knowledge-practice-heading" className="text-white">
              Where Knowledge <br />
              <span className="text-white/40">Meets Practice.</span>
            </DisplayHeading>
            <BodyText className="max-w-2xl text-base md:text-lg">
              Perspectives from experienced professionals across wealth, capital, strategy, and
              risk — translating complex financial thinking into meaningful decisions.
            </BodyText>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/40 hover:bg-[#070d18]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest uppercase text-emerald-400">
                    Pillar 01 &bull; Wealth
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Wealth Architecture &amp; Legacy
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/65">
                  True wealth preservation is not simply benchmark-tracking; it is the deliberate engineering of asset holding structures, tax efficiency, and generational transitions that endure through market shifts.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-xs font-mono text-white/40">
                <span>Intergenerational Governance</span>
                <span>&bull;</span>
                <span>Estate Resilience</span>
              </div>
            </div>

            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl transition-all duration-500 hover:border-sky-500/40 hover:bg-[#070d18]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest uppercase text-sky-400">
                    Pillar 02 &bull; Capital
                  </span>
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Capital Allocation Precision
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/65">
                  Mathematical rigor in sizing entries, managing cash drag, and diversifying across asset classes ensures capital is positioned where risk-adjusted compounding is highest.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-xs font-mono text-white/40">
                <span>Quantitative Asset Allocation</span>
                <span>&bull;</span>
                <span>Liquidity Modeling</span>
              </div>
            </div>

            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl transition-all duration-500 hover:border-amber-500/40 hover:bg-[#070d18]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest uppercase text-amber-400">
                    Pillar 03 &bull; Strategy
                  </span>
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Macroeconomic Resilience
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/65">
                  We formulate investment mandates that are intentionally stress-tested against interest rate pivots, inflation cycles, and structural geopolitical shifts rather than fragile linear assumptions.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-xs font-mono text-white/40">
                <span>Regime Adaptation</span>
                <span>&bull;</span>
                <span>Strategic Rebalancing</span>
              </div>
            </div>

            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl transition-all duration-500 hover:border-rose-500/40 hover:bg-[#070d18]">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                    Pillar 04 &bull; Risk
                  </span>
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Downside Asymmetry &amp; Governance
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-white/65">
                  Protecting against permanent impairment of capital is paramount. Disciplined risk management creates the psychological stability required to compound wealth over decades.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-xs font-mono text-white/40">
                <span>Drawdown Governance</span>
                <span>&bull;</span>
                <span>Tail-Risk Protection</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}


