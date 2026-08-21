import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/src/lib/motion";

gsap.registerPlugin(ScrollTrigger);

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
          const sections = gsap.utils.toArray(".approach-step");

          gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              scrub: true,
              snap: 1 / (sections.length - 1),
              end: () => "+=" + scrollWrapperRef.current!.offsetWidth,
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

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const steps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "We begin by understanding the architecture of your financial life. This involves deep conversations about your liquidity needs, risk tolerance, generational wealth goals, and existing asset structures.",
    },
    {
      num: "02",
      title: "DIAGNOSE",
      desc: "Our analytical team dissects your current portfolio. We identify hidden risks, structural inefficiencies, tax leakages, and areas where your capital is underperforming relative to its potential.",
    },
    {
      num: "03",
      title: "DESIGN",
      desc: "We engineer a bespoke portfolio architecture. This involves strategic asset allocation, selecting optimal investment vehicles, and establishing a rigorous framework for decision-making.",
    },
    {
      num: "04",
      title: "IMPLEMENT",
      desc: "Execution requires precision. We deploy capital methodically, taking advantage of tactical entry points while ensuring tax-efficient transitions from legacy holdings.",
    },
    {
      num: "05",
      title: "MONITOR",
      desc: "Markets are dynamic; your strategy must be resilient. We employ continuous risk monitoring, stress-testing your portfolio against macro-economic shifts and black-swan events.",
    },
    {
      num: "06",
      title: "EVOLVE",
      desc: "As your life and the markets change, so must your plan. We conduct strategic rebalancing and periodic reviews to ensure your wealth command remains optimally aligned with your legacy.",
    },
  ];

  return (
    <div className="w-full min-w-0">
      <section className="w-full max-w-[var(--container-max)] mx-auto px-[var(--page-gutter)] pt-24 pb-16 md:pb-32 text-center flex flex-col items-center">
        <h1 className="text-[clamp(2.25rem,1.2rem+4.5vw,4.5rem)] font-medium tracking-tight leading-tight mb-8 break-words">
          The Framework of <br />
          <span className="text-white/40">Wealth Command.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl text-balance">
          A disciplined, six-stage methodology designed to remove emotional bias
          and engineer predictable outcomes in an unpredictable market.
        </p>
      </section>

      <div
        ref={containerRef}
        className="w-full min-w-0 overflow-hidden bg-white/[0.01] border-y border-white/10 lg:h-dvh lg:flex lg:items-center"
      >
        <div
          ref={scrollWrapperRef}
          className="flex flex-col lg:flex-row w-full lg:w-[600%]"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="approach-step w-full lg:w-[16.666666%] h-auto lg:h-[70dvh] flex-shrink-0 flex items-center justify-center p-6 py-16 md:py-24 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/5 last:border-0"
            >
              <div className="max-w-xl w-full min-w-0 flex flex-col items-center lg:items-start text-center lg:text-left px-1">
                <div className="text-[clamp(4rem,12vw,12rem)] font-medium text-white/[0.03] leading-none mb-8 tracking-tighter mix-blend-screen pointer-events-none">
                  {step.num}
                </div>
                <h2 className="text-[clamp(1.75rem,1rem+2vw,3rem)] font-medium tracking-tight mb-8 uppercase break-words">
                  {step.title}
                </h2>
                <div className="w-12 h-[1px] bg-white/20 mb-8" />
                <p className="text-base md:text-lg text-text-muted leading-relaxed text-balance">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
