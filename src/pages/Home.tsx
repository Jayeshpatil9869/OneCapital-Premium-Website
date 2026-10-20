import { HeroEditorial } from '@/src/components/sections/hero/HeroEditorial';
import { AppShowcaseSection } from '@/src/components/sections/app-download/AppShowcaseSection';
import { SolutionsOverviewSection } from '@/src/components/sections/solutions/SolutionsOverviewSection';
import { TestimonialsSection } from '@/src/components/sections/testimonials/TestimonialsSection';
import { OfficesPresenceSection } from '@/src/components/sections/offices/OfficesPresenceSection';
import { FAQSection } from '@/src/components/sections/faq/FAQSection';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { COMPANY } from '@/src/data/company';

const METRICS = [
  {
    value: '3000',
    suffix: '+',
    label: 'Clients Serviced',
  },
  {
    value: '8',
    suffix: '+',
    label: 'Specialized Products',
  },
  {
    value: '33',
    suffix: '+',
    label: 'Years Industry Experience',
  },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroEditorial
        variant="cinematic"
        backgroundImage="/images/hero-wealth.jpg"
        eyebrow="EXPERT FINANCIAL GUIDANCE"
        title={
          <span className="block max-w-5xl mx-auto">
            <span className="block">Wealth Isn't Built By Chance.</span>
            <span className="block mt-1 sm:mt-2 text-white/95">It's Built By Strategy.</span>
          </span>
        }
        titleClassName="text-3xl sm:text-5xl md:text-6xl lg:text-[3.85rem] xl:text-[4.35rem] leading-[1.08] font-medium tracking-tight"
        description="Research first. Strategy next. Investment last."
        metrics={METRICS}
      />

      <ScrollFade className="w-full">
        <SolutionsOverviewSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <TestimonialsSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <FAQSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <OfficesPresenceSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <AppShowcaseSection />
      </ScrollFade>
    </div>
  );
}
