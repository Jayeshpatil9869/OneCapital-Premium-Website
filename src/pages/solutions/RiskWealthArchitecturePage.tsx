import { Navigate } from 'react-router-dom';
import { WealthManagementLayout } from '@/src/components/sections/solutions/WealthManagementLayout';
import { SolutionPageHero } from '@/src/components/sections/solutions/SolutionPageHero';
import { SolutionRelatedNav } from '@/src/components/sections/solutions/SolutionRelatedNav';
import { getDedicatedPageConfig, type SolutionDedicatedConfig } from '@/src/data/solutions-pages';
import { getPillarPageHref } from '@/src/data/solutions-pillars';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildServiceJsonLd } from '@/src/lib/seo';

export default function RiskWealthArchitecturePage() {
  const config = getDedicatedPageConfig('wealth-management');
  if (!config) return <Navigate to="/solutions" replace />;
  return <RiskWealthPage config={config} />;
}

function RiskWealthPage({ config }: { config: SolutionDedicatedConfig }) {
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
      <WealthManagementLayout />
      <SolutionRelatedNav currentPillarId={config.pillarId} />
    </div>
  );
}
