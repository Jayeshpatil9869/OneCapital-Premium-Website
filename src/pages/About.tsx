import { AboutHero } from '@/src/components/sections/about/AboutHero';
import { AboutStorySection } from '@/src/components/sections/about/AboutStorySection';
import { AboutMissionVision } from '@/src/components/sections/about/AboutMissionVision';
import { AboutCoreValues } from '@/src/components/sections/about/AboutCoreValues';
import { ABOUT_PAGE } from '@/src/data/about';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildOrganizationJsonLd } from '@/src/lib/seo';

export default function About() {
  usePageSeo({
    title: ABOUT_PAGE.seo.title,
    description: ABOUT_PAGE.seo.description,
    path: '/about',
    keywords: [...ABOUT_PAGE.seo.keywords],
    image: ABOUT_PAGE.story.imageSrc,
    type: 'website',
    jsonLd: buildOrganizationJsonLd(),
  });

  return (
    <div className="w-full flex flex-col items-center bg-black">
      <AboutHero />
      <AboutStorySection />
      <AboutMissionVision />
      <AboutCoreValues />
    </div>
  );
}
