import { Container, Section } from '@/src/components/ui';
import { ContactFormPanel } from '@/src/components/sections/contact/ContactFormPanel';
import { ContactInfoPanel } from '@/src/components/sections/contact/ContactInfoPanel';
import { CONTACT_PAGE_COPY } from '@/src/data/contact';

export default function Contact() {
  return (
    <Section
      pad="none"
      className="relative min-h-[90svh] overflow-x-clip bg-black pb-[max(4rem,calc(2rem+env(safe-area-inset-bottom)))] pt-[calc(6.5rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-44 md:pb-24 md:pt-48 lg:pb-28 lg:pt-52"
    >
      {/* Black → white ambient glow (replaces green/teal reference gradient) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-8%] h-[min(70vh,42rem)] w-[min(100vw,56rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.05)_35%,rgba(0,0,0,0)_70%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(28rem,55vw)] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04)_0%,transparent_55%)]"
        aria-hidden="true"
      />

      {/* Large watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 top-16 z-0 flex items-center justify-center overflow-hidden select-none sm:top-20 md:top-28"
        aria-hidden="true"
      >
        <span className="max-w-full text-[clamp(3.75rem,18vw,16rem)] font-extrabold uppercase leading-none tracking-[0.05em] text-white/[0.06]">
          {CONTACT_PAGE_COPY.watermark}
        </span>
      </div>

      <Container className="relative z-10 min-w-0">
        {/* Soft atmospheric ambient glow behind the right consultation glass card */}
        <div
          className="pointer-events-none absolute right-0 top-[8%] -z-10 size-[min(31.25rem,85vw)] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_40%,transparent_70%)] blur-[80px] sm:right-[5%]"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="min-w-0">
            <ContactInfoPanel />
          </div>
          <div className="min-w-0">
            <ContactFormPanel />
          </div>
        </div>
      </Container>
    </Section>
  );
}
