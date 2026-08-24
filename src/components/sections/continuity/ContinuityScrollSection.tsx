import { useRef } from 'react';

import { useGSAP } from '@gsap/react';

import { Button, Container, SectionHeading } from '@/src/components/ui';

import { gsap, prefersReducedMotion } from '@/src/lib/motion';



gsap.registerPlugin(useGSAP);



export function ContinuityScrollSection() {

  const sectionRef = useRef<HTMLElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);



  useGSAP(
    () => {
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      const primaryText = content.querySelectorAll<HTMLElement>('[data-tone="primary"]');
      const mutedText = content.querySelectorAll<HTMLElement>('[data-tone="muted"]');

      const applyLightSection = (isLight: boolean) => {
        section.classList.toggle('light-section', isLight);
        section.style.borderColor = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';
      };

      const applyStaticLight = () => {
        applyLightSection(true);
        gsap.set(section, { backgroundColor: '#ffffff' });
        gsap.set(primaryText, { color: '#000000' });
        gsap.set(mutedText, { color: '#000000' });
      };

      if (prefersReducedMotion()) {
        applyStaticLight();
        return;
      }

      const mm = gsap.matchMedia();

      // Mobile: static final light look — no scroll-scrubbed bg/text
      mm.add('(max-width: 767px)', () => {
        applyStaticLight();
      });

      // Desktop / tablet+: scrub black → white
      mm.add('(min-width: 768px)', () => {
        gsap.set(section, { backgroundColor: '#000000' });
        gsap.set(primaryText, { color: '#ffffff' });
        gsap.set(mutedText, { color: 'rgba(255, 255, 255, 0.55)' });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 25%',
              scrub: 0.7,
              invalidateOnRefresh: true,
              onUpdate: (self) => applyLightSection(self.progress >= 0.5),
              onLeave: () => applyLightSection(true),
              onEnterBack: (self) => applyLightSection(self.progress >= 0.5),
            },
          })
          .to(section, { backgroundColor: '#ffffff', ease: 'none' }, 0)
          .to(primaryText, { color: '#000000', ease: 'none' }, 0)
          .to(mutedText, { color: 'rgba(0, 0, 0, 0.55)', ease: 'none' }, 0);
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );



  return (

    <section

      ref={sectionRef}

      className="relative z-10 w-full border-y border-white/10 py-[var(--space-section-sm)] overflow-hidden"

      aria-labelledby="continuity-heading"

    >

      <Container>

        <div ref={contentRef} className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">

          <div className="w-full md:w-1/3 flex flex-col gap-6">

            <SectionHeading id="continuity-heading" data-tone="primary">

              Wealth is more than capital. It is continuity.

            </SectionHeading>

            <Button

              to="/about"

              variant="text"

              arrow="right"

              className="w-fit hover:opacity-60"

              data-tone="primary"

            >

              Our Story

            </Button>

          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6 text-lg md:text-xl leading-relaxed font-light text-balance">

            <p data-tone="muted">

              At OneCapital, we view wealth management through an institutional lens. We bring the

              discipline, research, and precision of large-scale asset management to the private

              portfolios of individuals, families, and organizations.

            </p>

            <p data-tone="muted">

              Our approach goes beyond generic allocations. We build tailored financial

              architectures designed to withstand market cycles, optimize tax efficiency, and

              transfer value across generations.

            </p>

          </div>

        </div>

      </Container>

    </section>

  );

}


