import { COMPANY } from '@/src/data/company';

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const META_ATTR = 'data-oc-seo';
const LD_ATTR = 'data-oc-jsonld';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"][${META_ATTR}]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(META_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"][${META_ATTR}]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    el.setAttribute(META_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  document.head.querySelectorAll(`script[${LD_ATTR}]`).forEach((node) => node.remove());
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute(LD_ATTR, 'true');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/** Absolute URL helper for OG / canonical (falls back to production domain). */
export function absoluteUrl(path: string): string {
  const base = COMPANY.websiteUrl.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * Sets document title, description, Open Graph, Twitter, canonical, and optional JSON-LD.
 * Call from page useEffect; cleanup via clearPageSeo on unmount when switching routes.
 * Vite SPA adaptation of ACS seo_guidance (next-seo is Next.js-only).
 */
export function setPageSeo(input: PageSeoInput): void {
  const url = absoluteUrl(input.path);
  const image = input.image
    ? input.image.startsWith('http')
      ? input.image
      : absoluteUrl(input.image)
    : absoluteUrl('/og-default.png');
  const ogType = input.type ?? 'website';

  document.title = input.title;

  upsertMeta('name', 'description', input.description);
  if (input.keywords?.length) {
    upsertMeta('name', 'keywords', input.keywords.join(', '));
  }

  upsertMeta('property', 'og:title', input.title);
  upsertMeta('property', 'og:description', input.description);
  upsertMeta('property', 'og:type', ogType === 'product' ? 'website' : ogType);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', image);
  upsertMeta('property', 'og:site_name', COMPANY.brandName);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', input.title);
  upsertMeta('name', 'twitter:description', input.description);
  upsertMeta('name', 'twitter:image', image);

  upsertLink('canonical', url);

  if (input.jsonLd) {
    upsertJsonLd(input.jsonLd);
  }
}

export function clearPageSeo(): void {
  document.head.querySelectorAll(`[${META_ATTR}]`).forEach((node) => node.remove());
  document.head.querySelectorAll(`script[${LD_ATTR}]`).forEach((node) => node.remove());
}

export function buildServiceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: opts.serviceType,
    provider: {
      '@type': 'Organization',
      name: COMPANY.legalName,
      legalName: COMPANY.legalName,
      url: COMPANY.websiteUrl,
      foundingDate: String(COMPANY.foundedYear),
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.hqStreet,
        addressLocality: COMPANY.hqCity,
        addressRegion: COMPANY.hqRegion,
        postalCode: COMPANY.hqPostalCode,
        addressCountry: 'IN',
      },
      sameAs: [COMPANY.linkedinUrl, COMPANY.instagramUrl],
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${COMPANY.hqCity}, ${COMPANY.hqRegion}, India`,
    },
  };
}

export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    url: COMPANY.websiteUrl,
    foundingDate: String(COMPANY.foundedYear),
    description: COMPANY.shortAbout,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.hqStreet,
      addressLocality: COMPANY.hqCity,
      addressRegion: COMPANY.hqRegion,
      postalCode: COMPANY.hqPostalCode,
      addressCountry: 'IN',
    },
    sameAs: [COMPANY.linkedinUrl, COMPANY.instagramUrl],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${COMPANY.hqRegion}, India`,
    },
  };
}
