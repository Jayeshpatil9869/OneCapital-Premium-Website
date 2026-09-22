import { useEffect } from 'react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Button, Container, Section } from '@/src/components/ui';
import { COMPANY } from '@/src/data/company';

export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found | ${COMPANY.brandName}`;
  }, []);

  return (
    <Section
      pad="none"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white"
      aria-labelledby="not-found-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] h-[min(50vh,28rem)] w-[min(100vw,40rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_40%,transparent_70%)] blur-2xl"
        aria-hidden
      />

      <Container className="relative z-10 max-w-[720px] py-[max(8rem,env(safe-area-inset-top))] pb-24">
        <RevealOnScroll trigger="load" direction="up" distance={28} duration={0.9}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-white/45">
            Error 404
          </p>
          <h1
            id="not-found-heading"
            className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            This page is not on the map.
          </h1>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-white/65 sm:text-lg">
            The link may be outdated, or the address mistyped. Return home, or
            reach the {COMPANY.brandName} team directly.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/" variant="primary" size="md">
              Back to home
            </Button>
            <Button to="/contact" variant="ghost" size="md">
              Contact us
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
