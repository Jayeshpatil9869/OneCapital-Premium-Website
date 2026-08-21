import { useRef } from 'react';
import { BarChart3, Globe, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { Button, Card, Container, Section, SectionHeading, BodyText } from '@/src/components/ui';
import { HeroEditorial } from '@/src/components/sections/hero/HeroEditorial';
import { MetricStrip } from '@/src/components/sections/cta/MetricStrip';
import { CtaBand } from '@/src/components/sections/cta/CtaBand';
import { BentoGrid, BentoItem } from '@/src/components/sections/bento/BentoGrid';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { gsap, prefersReducedMotion, ScrollTrigger } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

const METRICS = [
  { label: 'Founded', value: '2010', suffix: '' },
  { label: 'Client Retention', value: '98', suffix: '%' },
  { label: 'Advisory Team', value: '25', suffix: '+' },
  { label: 'Market Experience', value: '15', suffix: ' Yrs' },
];

const SOLUTIONS = [
  {
    title: 'Elite PMS',
    desc: 'Custom mandates with direct ownership, strategic overlays, and complete transparency.',
    icon: Activity,
  },
  {
    title: 'Mutual Fund 360',
    desc: 'Goal-based allocations managed with rigorous fund-selection philosophy.',
    icon: BarChart3,
  },
  {
    title: 'Alternative Assets',
    desc: 'Access to carefully vetted pre-IPO, private debt, and real estate opportunities.',
    icon: Shield,
  },
  {
    title: 'Wealth Planning',
    desc: 'Financial architectures encompassing retirement, tax, and legacy planning.',
    icon: Globe,
  },
];

const STAGES = ['Discover', 'Diagnose', 'Design', 'Implement', 'Monitor', 'Evolve'];

function viewportHeight() {
  return `${window.innerHeight}px`;
}

export default function Home() {
  const sceneRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const imageWrap = imageWrapRef.current;
      const pin = pinRef.current;
      if (!imageWrap || !pin) return;

      if (prefersReducedMotion()) {
        gsap.set(imageWrap, { width: '100%', height: '40vh' });
        return;
      }

      const mm = gsap.matchMedia();

      // Desktop / tablet+: full expand → pin → overlay
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          imageWrap,
          { width: '60%', height: '60vh' },
          {
            width: '100%',
            height: () => viewportHeight(),
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: imageWrap,
              start: 'top 80%',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
            },
          }
        );

        ScrollTrigger.create({
          trigger: pin,
          start: 'top top',
          end: () => `+=${window.innerHeight * 0.3}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        });
      });

      // Mobile: static full-width image — no pin (avoids 100vh / address-bar jank)
      mm.add('(max-width: 767px)', () => {
        gsap.set(imageWrap, { width: '100%', height: '40vh' });
      });

      const img = imageWrap.querySelector('img');
      if (img && !img.complete) {
        img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
      }

      return () => mm.revert();
    },
    { scope: sceneRef }
  );

  return (
    <div className="w-full flex flex-col items-center">
      <HeroEditorial
        className="min-h-0 pb-8 lg:pb-12"
        eyebrow="A Vision Beyond Numbers"
        title={
          <>
            <span className="block">Institutional</span>
            <span className="block text-white/70">Wealth Command.</span>
          </>
        }
        description="OneCapital is a sophisticated wealth-management partner helping select clients understand, build, manage and preserve wealth over the long term."
        actions={
          <>
            <Button to="/contact" variant="outline" arrow="right">
              Start Your Legacy
            </Button>
            <Button to="/solutions" variant="text" arrow="up-right">
              Explore Solutions
            </Button>
          </>
        }
      />

      <MetricStrip metrics={METRICS} />

      <section ref={sceneRef} className="w-full">
        <div ref={pinRef} className="relative z-0 w-full">
          <div
            ref={imageWrapRef}
            className="relative mx-auto h-[40vh] w-full overflow-hidden md:h-[60vh] md:w-[60%]"
          >
            <img
              src="/images/hero-wealth.jpg"
              alt="Institutional wealth and city skyline"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <Section tone="light" pad="md" className="z-10">
          <RevealOnScroll>
            <Container className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
              <div className="w-full md:w-1/3 flex flex-col gap-6">
                <SectionHeading className="text-black">
                  Wealth is more than capital. It is continuity.
                </SectionHeading>
                <Button
                  to="/about"
                  variant="text"
                  arrow="right"
                  className="text-black hover:text-black/60 w-fit"
                >
                  Our Story
                </Button>
              </div>
              <div className="w-full md:w-2/3 flex flex-col gap-6 text-lg md:text-xl text-black leading-relaxed font-light text-balance">
                <p>
                  At OneCapital, we view wealth management through an institutional lens. We bring
                  the discipline, research, and precision of large-scale asset management to the
                  private portfolios of individuals, families, and organizations.
                </p>
                <p>
                  Our approach goes beyond generic allocations. We build tailored financial
                  architectures designed to withstand market cycles, optimize tax efficiency, and
                  transfer value across generations.
                </p>
              </div>
            </Container>
          </RevealOnScroll>
        </Section>
      </section>

      <Section tone="panel" pad="lg">
        <Container>
          <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <SectionHeading className="text-4xl md:text-5xl lg:text-6xl leading-none">
              A single unified <br />
              <span className="text-white/40">view of your wealth.</span>
            </SectionHeading>
            <Button to="/solutions" variant="pill" size="sm" arrow="up-right">
              View All Solutions
            </Button>
          </RevealOnScroll>

          <RevealOnScroll>
            <BentoGrid>
              <BentoItem size="lg">
                <Link
                  to="/solutions"
                  className="group block glass-panel p-10 lg:p-16 rounded-3xl relative overflow-hidden flex flex-col justify-end min-h-[40vh] oc-moving-border"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
                    <Globe className="w-24 h-24 stroke-[0.5]" />
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <div className="w-12 h-px bg-white mb-8 transition-all duration-500 group-hover:w-24" />
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                      Wealth Management
                    </h3>
                    <BodyText className="mb-8 text-lg">
                      Comprehensive advisory covering asset allocation, portfolio strategy, and
                      continuous risk monitoring tailored to your specific mandate.
                    </BodyText>
                    <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-white">
                      Explore Offering
                    </div>
                  </div>
                </Link>
              </BentoItem>

              {SOLUTIONS.map((sol) => (
                <BentoItem key={sol.title}>
                  <Link to="/solutions" className="block h-full group">
                    <Card variant="feature" className="h-full oc-moving-border">
                      <Card.Media>
                        <sol.icon
                          className="w-8 h-8 group-hover:text-white transition-colors duration-500"
                          strokeWidth={1}
                        />
                      </Card.Media>
                      <Card.Title as="h3" className="text-2xl">
                        {sol.title}
                      </Card.Title>
                      <Card.Description>{sol.desc}</Card.Description>
                      <Card.Meta className="group-hover:text-white transition-colors">
                        Details
                      </Card.Meta>
                    </Card>
                  </Link>
                </BentoItem>
              ))}
            </BentoGrid>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section tone="light" pad="md">
        <RevealOnScroll>
          <Container className="flex flex-col items-center text-center">
            <SectionHeading className="mb-5 text-black">
              Discipline over <span className="text-black">emotion.</span>
            </SectionHeading>
            <p className="text-lg text-black max-w-2xl mb-10 text-balance">
              We operate on a stringent 6-stage framework that removes emotional bias and ensures
              your portfolio remains aligned with your long-term objectives through every market
              cycle.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 max-w-full">
              {STAGES.map((stage, i) => (
                <div key={stage} className="flex items-center gap-2 sm:gap-4">
                  <div className="glass-panel-light px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm tracking-wide flex items-center gap-2 sm:gap-3 text-black">
                    <span className="text-black/30 font-mono text-xs">0{i + 1}</span>
                    {stage}
                  </div>
                  {i !== STAGES.length - 1 && (
                    <div className="hidden md:block w-8 h-px bg-black/20 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <Button
              to="/approach"
              variant="text"
              arrow="right"
              className="text-black hover:text-black/60"
            >
              View Detailed Methodology
            </Button>
          </Container>
        </RevealOnScroll>
      </Section>

      <CtaBand
        title="Start Your Legacy."
        description="Request an advisory consultation to discuss your portfolio, goals, and how OneCapital can serve as your dedicated wealth partner."
        action={
          <Button to="/contact" variant="primary" size="lg" arrow="right">
            Request a Consultation
          </Button>
        }
      />
    </div>
  );
}
