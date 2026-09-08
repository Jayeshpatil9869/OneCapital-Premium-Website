import { Rocket, Eye } from 'lucide-react';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { Container, Section } from '@/src/components/ui';

export function AboutMissionVision() {
  return (
    <Section
      tone="panel"
      pad="lg"
      className="relative w-full overflow-hidden text-white py-20 md:py-28"
      aria-labelledby="mission-vision-heading"
    >
      <Container className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Centered Section Header with Underline */}
        <RevealOnScroll className="mb-14 md:mb-18 flex flex-col items-center text-center">
          <h2
            id="mission-vision-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white"
          >
            Our Mission &amp; Vision
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-white/90 rounded-full mt-4" aria-hidden="true" />
        </RevealOnScroll>

        {/* 2-Column Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Our Mission */}
          <RevealOnScroll delay={0.05}>
            <div className="group relative flex h-full min-w-0 flex-col justify-start rounded-3xl p-6 sm:p-8 md:p-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-all duration-500 shadow-2xl">
              {/* Header row with icon and title */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 min-w-0">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] border border-white/15 text-white shadow-lg group-hover:scale-105 group-hover:bg-white/15 transition-all duration-300">
                  <Rocket className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white text-balance">
                  Our Mission
                </h3>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-text-muted font-light leading-relaxed text-pretty">
                Our mission is to help families grow their wealth by providing transparent and customized solutions that enable wealth creation, wealth preservation, and seamless wealth transmission across generations.
              </p>
            </div>
          </RevealOnScroll>

          {/* Card 2: Our Vision */}
          <RevealOnScroll delay={0.12}>
            <div className="group relative flex h-full min-w-0 flex-col justify-start rounded-3xl p-6 sm:p-8 md:p-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-all duration-500 shadow-2xl">
              {/* Header row with icon and title */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 min-w-0">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.08] border border-white/15 text-white shadow-lg group-hover:scale-105 group-hover:bg-white/15 transition-all duration-300">
                  <Eye className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-white text-balance">
                  Our Vision
                </h3>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-text-muted font-light leading-relaxed text-pretty">
                To be the most trusted wealth advisory firm by delivering customized, research-based wealth solutions and building enduring relationships through a client-first approach and utmost integrity.
              </p>
            </div>
          </RevealOnScroll>

        </div>

      </Container>
    </Section>
  );
}
