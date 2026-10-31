import { HeroEditorial } from '@/src/components/sections/hero/HeroEditorial';
import { AppShowcaseSection } from '@/src/components/sections/app-download/AppShowcaseSection';
import { SolutionsOverviewSection } from '@/src/components/sections/solutions/SolutionsOverviewSection';
import { TestimonialsSection } from '@/src/components/sections/testimonials/TestimonialsSection';
import { OfficesPresenceSection } from '@/src/components/sections/offices/OfficesPresenceSection';
import { FAQSection } from '@/src/components/sections/faq/FAQSection';
import { HomeServicesExploreSection } from '@/src/components/sections/home/HomeServicesExploreSection';
import { HomePlanningSeoSection } from '@/src/components/sections/home/HomePlanningSeoSection';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { Button } from '@/src/components/ui';
import { getAllFAQQuestions } from '@/src/data/home-faq';
import { HOME_SEO } from '@/src/data/home-seo';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLocalBusinessJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from '@/src/lib/seo';

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
  const faqEntities = getAllFAQQuestions().map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  usePageSeo({
    title: HOME_SEO.title,
    description: HOME_SEO.description,
    path: '/',
    keywords: [...HOME_SEO.keywords],
    image: '/images/hero-wealth.jpg',
    type: 'website',
    jsonLd: [
      buildOrganizationJsonLd(),
      buildLocalBusinessJsonLd(),
      buildWebSiteJsonLd(),
      buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }]),
      buildFaqJsonLd(faqEntities),
    ],
  });

  return (
    <div className="w-full flex flex-col items-center">
      <HeroEditorial
        variant="cinematic"
        backgroundImage="/images/hero-wealth.jpg"
        eyebrow="WEALTH MANAGEMENT · PUNE"
        title={HOME_SEO.h1}
        titleClassName="text-[1.25rem] sm:text-3xl md:text-[2.35rem] lg:text-[2.65rem] xl:text-[3rem] 2xl:text-[3.35rem] leading-[1.15] sm:leading-[1.12] font-medium tracking-tight"
        description={COMPANY_HERO_SUPPORT}
        metrics={METRICS}
        mobileDeviceImage="/images/one-capital-mobile-app-mockup.png"
        mobileDeviceAlt="One Capital app on a phone"
        actions={
          <>
            <Button to="/contact" variant="primary" size="md" arrow="up-right">
              {HOME_SEO.cta}
            </Button>
            <Button to="/solutions" variant="outline" size="md" arrow="right">
              Explore services
            </Button>
          </>
        }
      />

      <ScrollFade className="w-full">
        <SolutionsOverviewSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <HomeServicesExploreSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <HomePlanningSeoSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <TestimonialsSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <OfficesPresenceSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <FAQSection />
      </ScrollFade>

      <ScrollFade className="w-full">
        <AppShowcaseSection />
      </ScrollFade>
    </div>
  );
}

const COMPANY_HERO_SUPPORT =
  'Personalised financial planning and investment solutions for your goals — research first, strategy next, investment last.';
