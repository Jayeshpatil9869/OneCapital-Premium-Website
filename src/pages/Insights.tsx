import { useEffect } from 'react';
import { EditorialStatementCTA } from '@/src/components/sections/cta/EditorialStatementCTA';
import { InsightsBridgeStrip } from '@/src/components/sections/insights/InsightsBridgeStrip';
import { InsightsFeaturedNote } from '@/src/components/sections/insights/InsightsFeaturedNote';
import { InsightsMasthead } from '@/src/components/sections/insights/InsightsMasthead';
import { InsightsThemeIndex } from '@/src/components/sections/insights/InsightsThemeIndex';
import { INSIGHTS_PAGE } from '@/src/data/insights';

export default function Insights() {
  const { cta } = INSIGHTS_PAGE;

  useEffect(() => {
    document.title = INSIGHTS_PAGE.documentTitle;
  }, []);

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <InsightsMasthead />
      <InsightsThemeIndex />
      <InsightsFeaturedNote />
      <InsightsBridgeStrip />
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
    </div>
  );
}
