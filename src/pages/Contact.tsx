import { Container, Section } from '@/src/components/ui';
import { ContactFormPanel } from '@/src/components/sections/contact/ContactFormPanel';
import { ContactInfoPanel } from '@/src/components/sections/contact/ContactInfoPanel';
import { ScrollFade } from '@/src/components/motion/ScrollFade';
import { CONTACT_HERO_IMAGE, CONTACT_SEO } from '@/src/data/contact';
import { usePageSeo } from '@/src/hooks/usePageSeo';
import { buildOrganizationJsonLd } from '@/src/lib/seo';

export default function Contact() {
  usePageSeo({
    title: CONTACT_SEO.title,
    description: CONTACT_SEO.description,
    path: '/contact',
    keywords: [...CONTACT_SEO.keywords],
    image: CONTACT_HERO_IMAGE.src,
    type: 'website',
    jsonLd: buildOrganizationJsonLd(),
  });

  return (
    <Section
      pad="none"
      className="relative min-h-[100svh] overflow-x-clip bg-black pb-[max(3.5rem,calc(1.5rem+env(safe-area-inset-bottom)))] pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-36 md:pb-20 md:pt-40 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-24 lg:pt-36"
    >
      {/* Full-bleed atmospheric plate */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={CONTACT_HERO_IMAGE.src}
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_30%] grayscale-[0.35] contrast-[1.05]"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      <span className="sr-only">{CONTACT_HERO_IMAGE.alt}</span>

      <Container className="relative z-10 min-w-0 w-full">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <ScrollFade delay={0.05} className="min-w-0">
            <ContactInfoPanel />
          </ScrollFade>
          <ScrollFade delay={0.12} className="min-w-0">
            <ContactFormPanel />
          </ScrollFade>
        </div>
      </Container>
    </Section>
  );
}
