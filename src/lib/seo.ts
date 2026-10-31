import { COMPANY } from '@/src/data/company';

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  /** When true, emits robots noindex,nofollow (e.g. /design-system). */
  noIndex?: boolean;
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
    : absoluteUrl('/og-default.jpg');
  const ogType = input.type ?? 'website';

  document.title = input.title;

  upsertMeta('name', 'description', input.description);
  if (input.keywords?.length) {
    upsertMeta('name', 'keywords', input.keywords.join(', '));
  }
  upsertMeta(
    'name',
    'robots',
    input.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  );

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

export function buildArticleJsonLd(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    mainEntityOfPage: absoluteUrl(opts.path),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    author: {
      '@type': 'Organization',
      name: COMPANY.brandName,
      url: COMPANY.websiteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.legalName,
      url: COMPANY.websiteUrl,
    },
  };
}

function companyPostalAddress(): Record<string, unknown> {
  return {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.hqStreet,
    addressLocality: COMPANY.hqCity,
    addressRegion: COMPANY.hqRegion,
    postalCode: COMPANY.hqPostalCode,
    addressCountry: 'IN',
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
    address: companyPostalAddress(),
    sameAs: [COMPANY.linkedinUrl, COMPANY.instagramUrl],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${COMPANY.hqRegion}, India`,
    },
  };
}

/** LocalBusiness for Pune HQ — matches visible NAP on contact / about. */
export function buildLocalBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    additionalType: 'https://schema.org/LocalBusiness',
    name: COMPANY.brandName,
    legalName: COMPANY.legalName,
    url: COMPANY.websiteUrl,
    image: absoluteUrl('/og-default.jpg'),
    description: COMPANY.shortAbout,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: companyPostalAddress(),
    areaServed: [
      { '@type': 'City', name: 'Pune' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Nashik' },
      { '@type': 'City', name: 'Kolhapur' },
      {
        '@type': 'AdministrativeArea',
        name: `${COMPANY.hqRegion}, India`,
      },
    ],
    sameAs: [COMPANY.linkedinUrl, COMPANY.instagramUrl],
    priceRange: '$$',
  };
}

export function buildWebSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.brandName,
    url: COMPANY.websiteUrl,
    description: COMPANY.shortAbout,
    publisher: {
      '@type': 'Organization',
      name: COMPANY.legalName,
      url: COMPANY.websiteUrl,
    },
    inLanguage: 'en-IN',
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
