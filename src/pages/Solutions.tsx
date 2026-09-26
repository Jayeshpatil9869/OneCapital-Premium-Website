import { SolutionOverviewBlock } from '@/src/components/sections/solutions/SolutionOverviewBlock';
import { SolutionsExploreStrip } from '@/src/components/sections/solutions/SolutionsExploreStrip';
import { SolutionsHero } from '@/src/components/sections/solutions/SolutionsHero';
import { SolutionsIntro } from '@/src/components/sections/solutions/SolutionsIntro';
import { SolutionsPillarsNav } from '@/src/components/sections/solutions/SolutionsPillarsNav';
import { SolutionsTrustBand } from '@/src/components/sections/solutions/SolutionsTrustBand';
import { SOLUTIONS_HUB, SOLUTION_OVERVIEWS } from '@/src/data/solutions-pages';
import { COMPANY } from '@/src/data/company';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { absoluteUrl, buildServiceJsonLd } from '@/src/lib/seo';

export default function Solutions() {
  usePageSeo({
    title: SOLUTIONS_HUB.seo.title,
    description: SOLUTIONS_HUB.seo.description,
    path: '/solutions',
    keywords: [...SOLUTIONS_HUB.seo.keywords],
    image: SOLUTIONS_HUB.hero.image,
    type: 'website',
    jsonLd: [
      buildServiceJsonLd({
        name: SOLUTIONS_HUB.seo.title,
        description: SOLUTIONS_HUB.seo.description,
        path: '/solutions',
        serviceType: 'Wealth management and investment advisory products',
      }),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${COMPANY.brandName} Our Products`,
        itemListElement: SOLUTION_OVERVIEWS.map((overview, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: overview.headline,
          url: absoluteUrl(`/solutions/${overview.id}`),
        })),
      },
    ],
  });

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
