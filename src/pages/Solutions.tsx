import { useEffect } from 'react';
import { SolutionOverviewBlock } from '@/src/components/sections/solutions/SolutionOverviewBlock';
import { SolutionsExploreStrip } from '@/src/components/sections/solutions/SolutionsExploreStrip';
import { SolutionsHero } from '@/src/components/sections/solutions/SolutionsHero';
import { SolutionsIntro } from '@/src/components/sections/solutions/SolutionsIntro';
import { SolutionsPillarsNav } from '@/src/components/sections/solutions/SolutionsPillarsNav';
import { SolutionsTrustBand } from '@/src/components/sections/solutions/SolutionsTrustBand';
import { SOLUTIONS_HUB, SOLUTION_OVERVIEWS } from '@/src/data/solutions-pages';

export default function Solutions() {
  useEffect(() => {
    document.title = SOLUTIONS_HUB.documentTitle;
  }, []);

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <SolutionsHero />
      <SolutionsIntro />
      <SolutionsPillarsNav />
      {SOLUTION_OVERVIEWS.map((overview) => (
        <SolutionOverviewBlock key={overview.id} config={overview} />
      ))}
      <SolutionsTrustBand />
      <SolutionsExploreStrip />
    </div>
  );
}
