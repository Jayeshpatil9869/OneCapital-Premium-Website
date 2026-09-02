import { HeroEditorial } from '@/src/components/sections/hero/HeroEditorial';
import { AppShowcaseSection } from '@/src/components/sections/app-download/AppShowcaseSection';
import { SolutionsOverviewSection } from '@/src/components/sections/solutions/SolutionsOverviewSection';
import { ContinuityScrollSection } from '@/src/components/sections/continuity/ContinuityScrollSection';
import { TestimonialsSection } from '@/src/components/sections/testimonials/TestimonialsSection';
import { OfficesPresenceSection } from '@/src/components/sections/offices/OfficesPresenceSection';
import { FAQSection } from '@/src/components/sections/faq/FAQSection';

const METRICS = [
  { label: 'Founded', value: '2010', suffix: '' },
  { label: 'Client Retention', value: '98', suffix: '%' },
  { label: 'Advisory Team', value: '25', suffix: '+' },
  { label: 'Market Experience', value: '15', suffix: ' Yrs' },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroEditorial
        variant="cinematic"
        backgroundImage="/images/hero-wealth.jpg"
        eyebrow="A Vision Beyond Numbers"
        title={
          <>
            <span className="block">Institutional</span>
            <span className="block">Wealth Command.</span>
          </>
        }
        description="OneCapital stewards capital for select principals and families — with discretion, institutional discipline, and bespoke advisory across wealth and asset management."
        metrics={METRICS}
      />

      <section className="w-full">
        <ContinuityScrollSection />
      </section>

      <SolutionsOverviewSection />

      <TestimonialsSection />

      <FAQSection />

      <OfficesPresenceSection />

      <AppShowcaseSection />
    </div>
  );
}
