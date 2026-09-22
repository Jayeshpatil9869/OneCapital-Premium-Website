import { useEffect } from 'react';
import { TeamHero } from '@/src/components/sections/team/TeamHero';
import { DirectorAboutSection } from '@/src/components/sections/team/DirectorAboutSection';
import { Team } from '@/src/components/Team';
import { TeamGallerySection } from '@/src/components/sections/team/TeamGallerySection';
import { EditorialStatementCTA } from '@/src/components/sections/cta/EditorialStatementCTA';
import { TEAM_PAGE } from '@/src/data/team-page';

export default function TeamPage() {
  const { cta } = TEAM_PAGE;

  useEffect(() => {
    document.title = TEAM_PAGE.documentTitle;
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <TeamHero />
      <DirectorAboutSection />
      <Team />
      <TeamGallerySection />
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
