import { useEffect } from 'react';
import { TeamHero } from '@/src/components/sections/team/TeamHero';
import { Team } from '@/src/components/Team';
import { TeamGallerySection } from '@/src/components/sections/team/TeamGallerySection';
import { EditorialStatementCTA } from '@/src/components/sections/cta/EditorialStatementCTA';

export default function TeamPage() {
  useEffect(() => {
    document.title = 'Team | OneCapital Precision Wealth Management';
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <TeamHero />
      <Team />
      <TeamGallerySection />
      <EditorialStatementCTA
        line1="Ready to start"
        line2="your next"
        line3Prefix=""
        line3Outlined="journey"
        line3Suffix="?"
        italicQuote="Schedule a consultation with one of our expert advisors and discover how OneCapital can transform your financial future."
        buttonText="Book Consultation"
        buttonLink="/contact"
      />
    </div>
  );
}
