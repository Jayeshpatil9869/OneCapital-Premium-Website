import { useEffect } from 'react';
import { AboutHero } from '@/src/components/sections/about/AboutHero';
import { AboutStorySection } from '@/src/components/sections/about/AboutStorySection';
import { AboutMissionVision } from '@/src/components/sections/about/AboutMissionVision';
import { AboutCoreValues } from '@/src/components/sections/about/AboutCoreValues';
import { ABOUT_PAGE } from '@/src/data/about';

export default function About() {
  useEffect(() => {
    document.title = ABOUT_PAGE.documentTitle;
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-black">
      <AboutHero />
      <AboutStorySection />
      <AboutMissionVision />
      <AboutCoreValues />
    </div>
  );
}
