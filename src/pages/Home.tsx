import { HeroEditorial } from '@/src/components/sections/hero/HeroEditorial';
import { AppShowcaseSection } from '@/src/components/sections/app-download/AppShowcaseSection';
import { SolutionsOverviewSection } from '@/src/components/sections/solutions/SolutionsOverviewSection';
import { ContinuityScrollSection } from '@/src/components/sections/continuity/ContinuityScrollSection';
import { TestimonialsSection } from '@/src/components/sections/testimonials/TestimonialsSection';
import { OfficesPresenceSection } from '@/src/components/sections/offices/OfficesPresenceSection';
import { FAQSection } from '@/src/components/sections/faq/FAQSection';
import { COMPANY } from '@/src/data/company';

const METRICS = [
  { label: 'Founded', value: String(COMPANY.foundedYear), suffix: '' },
  {
    label: 'Core Mandates',
    value: String(COMPANY.focusAreas.length),
    suffix: '',
  },
  {
    label: 'Service Lines',
    value: String(COMPANY.serviceLines.length),
    suffix: '+',
  },
  {
    label: 'Regional Offices',
    value: String(COMPANY.officeCount),
    suffix: '',
  },
];

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroEditorial
        variant="cinematic"
        backgroundImage="/images/hero-wealth.jpg"
        eyebrow="Expert Financial Guidance"
        title={
          <>
            <span className="block">Empower Your</span>
            <span className="block">Financial Future.</span>
          </>
        }
        description={COMPANY.heroSupport}
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
