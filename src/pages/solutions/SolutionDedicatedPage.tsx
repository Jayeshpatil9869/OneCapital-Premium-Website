import { SolutionDedicatedSections } from '@/src/components/sections/solutions/SolutionDedicatedSections';
import { SolutionPageHero } from '@/src/components/sections/solutions/SolutionPageHero';
import { SolutionRelatedNav } from '@/src/components/sections/solutions/SolutionRelatedNav';
import type { SolutionDedicatedConfig } from '@/src/data/solutions-pages';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildServiceJsonLd } from '@/src/lib/seo';
import { getPillarPageHref } from '@/src/data/solutions-pillars';

type SolutionDedicatedPageProps = {
  config: SolutionDedicatedConfig;
};

export default function SolutionDedicatedPage({ config }: SolutionDedicatedPageProps) {
  const path = getPillarPageHref(config.pillarId);

  usePageSeo({
    title: config.seo.title,
    description: config.seo.description,
    path,
    keywords: config.seo.keywords,
    image: config.hero.image,
    type: 'product',
    jsonLd: buildServiceJsonLd({
      name: config.seo.title,
      description: config.seo.description,
      path,
      serviceType: config.seo.serviceType,
    }),
  });

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <SolutionPageHero config={config} />
      <SolutionDedicatedSections config={config} />
      <SolutionRelatedNav currentPillarId={config.pillarId} />
    </div>
  );
}
