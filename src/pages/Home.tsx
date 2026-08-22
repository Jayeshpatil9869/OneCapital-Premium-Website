import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Button } from '@/src/components/ui';
import { HeroEditorial } from '@/src/components/sections/hero/HeroEditorial';
import { MetricStrip } from '@/src/components/sections/cta/MetricStrip';
import { CtaBand } from '@/src/components/sections/cta/CtaBand';
import { SolutionsOverviewSection } from '@/src/components/sections/solutions/SolutionsOverviewSection';
import { ContinuityScrollSection } from '@/src/components/sections/continuity/ContinuityScrollSection';
import { TestimonialsSection } from '@/src/components/sections/testimonials/TestimonialsSection';
import { FAQSection } from '@/src/components/sections/faq/FAQSection';
import { gsap, prefersReducedMotion, ScrollTrigger } from '@/src/lib/motion';

gsap.registerPlugin(useGSAP);

const METRICS = [
  { label: 'Founded', value: '2010', suffix: '' },
  { label: 'Client Retention', value: '98', suffix: '%' },
  { label: 'Advisory Team', value: '25', suffix: '+' },
  { label: 'Market Experience', value: '15', suffix: ' Yrs' },
];

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

        <ContinuityScrollSection />
      </section>

      <SolutionsOverviewSection />

      <TestimonialsSection />

      <FAQSection />

      <CtaBand
        title="Start Your Legacy."
        description="Request an advisory consultation to discuss your portfolio, goals, and how OneCapital can serve as your dedicated wealth partner."
        action={
          <Button to="/contact" variant="primary" size="lg" arrow="right" sweep={false}>
            Request a Consultation
          </Button>
        }
      />
    </div>
  );
}
