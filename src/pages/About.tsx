import { useEffect } from 'react';
import { AboutHero } from '@/src/components/sections/about/AboutHero';
import { AboutStorySection } from '@/src/components/sections/about/AboutStorySection';
import { AboutMissionVision } from '@/src/components/sections/about/AboutMissionVision';
import { AboutCoreValues } from '@/src/components/sections/about/AboutCoreValues';

export default function About() {
  useEffect(() => {
    document.title = 'About Us | OneCapital Precision Wealth Management';
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
