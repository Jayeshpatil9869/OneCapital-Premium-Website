import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BodyText, Container, Section } from '@/src/components/ui';
import { RevealOnScroll } from '@/src/components/motion/RevealOnScroll';
import { HOME_SEO, HOME_SERVICE_LINKS } from '@/src/data/home-seo';

/** Homepage H2 + internal links — Basic SEO Audit structure. */
export function HomeServicesExploreSection() {
  return (
    <Section
      pad="none"
      className="border-y border-white/10 bg-black py-16 md:py-24"
      aria-labelledby="home-explore-services-heading"
    >
      <Container>
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <h2
            id="home-explore-services-heading"
            className="text-[clamp(1.5rem,1rem+2vw,2.75rem)] font-semibold tracking-tight text-white leading-tight text-balance"
          >
            {HOME_SEO.h2.exploreServices}
          </h2>
          <BodyText className="mt-5 text-base md:text-lg text-white/65">
            {HOME_SEO.servicesIntro}
          </BodyText>
        </RevealOnScroll>

        <RevealOnScroll
          stagger={0.04}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 md:grid-cols-4"
        >
          {HOME_SERVICE_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="group flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-left text-sm text-white/80 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
            >
              <span className="font-medium tracking-tight">{link.label}</span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-white/35 transition-colors group-hover:text-white/70"
                aria-hidden
              />
            </Link>
          ))}
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
