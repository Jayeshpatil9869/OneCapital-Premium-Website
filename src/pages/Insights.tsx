import { EditorialStatementCTA } from '@/src/components/sections/cta/EditorialStatementCTA';
import { InsightsBridgeStrip } from '@/src/components/sections/insights/InsightsBridgeStrip';
import { InsightsFeaturedNote } from '@/src/components/sections/insights/InsightsFeaturedNote';
import { InsightsMasthead } from '@/src/components/sections/insights/InsightsMasthead';
import { InsightsThemeIndex } from '@/src/components/sections/insights/InsightsThemeIndex';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { COMPANY } from '@/src/data/company';
import { INSIGHTS_PAGE } from '@/src/data/insights';
import { usePageSeo } from '@/src/hooks/usePageSeo';

export default function Insights() {
  const { cta } = INSIGHTS_PAGE;

  usePageSeo({
    title: INSIGHTS_PAGE.documentTitle,
    description: INSIGHTS_PAGE.hero.description,
    path: '/insights',
    keywords: ['investment insights', 'market outlook', 'wealth planning notes', COMPANY.brandName],
    image: INSIGHTS_PAGE.hero.image,
    type: 'website',
  });

  return (
    <div className="is-insights flex w-full flex-col items-center bg-black">
      <InsightsMasthead />
      <ScrollFade className="w-full">
        <InsightsThemeIndex />
      </ScrollFade>
      <ScrollFade className="w-full">
        <InsightsFeaturedNote />
      </ScrollFade>
      <ScrollFade className="w-full">
        <InsightsBridgeStrip />
      </ScrollFade>
      <ScrollFade className="w-full">
        <EditorialStatementCTA
          line1={cta.line1}
          line2={cta.line2}
          line3Prefix=""
          line3Outlined={cta.line3Outlined}
          line3Suffix="?"
          italicQuote={cta.italicQuote}
          buttonText={cta.buttonText}
          buttonLink={cta.buttonLink}
        />
      </ScrollFade>
    </div>
  );
}
