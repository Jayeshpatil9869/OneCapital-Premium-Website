import { useEffect } from 'react';
import { SolutionDedicatedSections } from '@/src/components/sections/solutions/SolutionDedicatedSections';
import { SolutionPageHero } from '@/src/components/sections/solutions/SolutionPageHero';
import { SolutionRelatedNav } from '@/src/components/sections/solutions/SolutionRelatedNav';
import type { SolutionDedicatedConfig } from '@/src/data/solutions-pages';

type SolutionDedicatedPageProps = {
  config: SolutionDedicatedConfig;
};

export default function SolutionDedicatedPage({ config }: SolutionDedicatedPageProps) {
  useEffect(() => {
    document.title = config.documentTitle;
  }, [config.documentTitle]);

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <SolutionPageHero config={config} />
      <SolutionDedicatedSections config={config} />
      <SolutionRelatedNav currentPillarId={config.pillarId} />
    </div>
  );
}
