/**
 * Verified public company facts for OneCapital.
 * Sources: office plaque (GST / CIN / registered address), LinkedIn
 * (onecapital-investment), 1capital.in brand voice, and compliance-confirmed
 * AMFI / APMI registration credentials.
 * Do not invent phone, street address, team names, or retention/performance
 * claims without an approved fact pack.
 */
export const COMPANY = {
  brandName: 'OneCapital',
  /** Full legal form (CIN PTC = Private Limited). */
  legalName: 'ONE CAPITAL INVESTMENT PRIVATE LIMITED',
  /** As printed on the registered-office plaque. */
  legalNameShort: 'ONE CAPITAL INVESTMENT PVT. LTD.',
  domain: '1capital.in',
  foundedYear: 2025,
  hqCity: 'Pune',
  hqRegion: 'Maharashtra',
  hqCountry: 'India',
  hqPostalCode: '411014',
  /** Client-provided display HQ address. */
  hqStreet: 'World Trade Centre, Tower 1, West Kharadi',
  /** Registered-office plaque line (kept for compliance reference). */
  hqRegisteredStreet: 'Retail Shop No. 3, Tower A, WTC, Kharadi',
  /** E.164-friendly display phone (India). */
  phone: '+91 84848 95622',
  /** E.164 for tel: links. */
  phoneHref: 'tel:+918484895622',
  /** Regional offices (Pune HQ + Mumbai, Kolhapur, Nashik). */
  officeCount: 4,
  email: 'onecapital0404@gmail.com',
  /** Live-site footer positioning — aspirational brand voice, not a performance claim. */
  tagline:
    'Redefining wealth management through precision advisory and institutional-grade technology.',
  /** LinkedIn company about — shortened for UI. */
  shortAbout:
    'A Pune-based financial services firm helping individuals and businesses grow wealth through strategic investment advisory, portfolio management, and long-term wealth planning.',
  /** Live-site hero support line — product focus without invented returns. */
  heroSupport:
    'Mutual funds, portfolios, equity, and investment advisory — research first, then the strategy, then the investment.',
  focusAreas: [
    'Investment advisory',
    'Portfolio management',
    'Long-term wealth planning',
  ] as const,
  serviceLines: [
    'Mutual funds',
    'Wealth planning',
    'Alternative assets',
    'Tax strategy',
    'Portfolio management',
  ] as const,
  websiteUrl: 'https://1capital.in/',
  linkedinUrl: 'https://www.linkedin.com/company/onecapital-investment/',
  instagramUrl: 'https://www.instagram.com/onecapitalpms/',

  /** GSTIN (Maharashtra) — from registered-office plaque. */
  gstin: '27AAECO6770E1ZB',
  /** Corporate Identification Number — from registered-office plaque. */
  cin: 'U64990PN2025PTC240251',

  /** AMFI Registered Mutual Fund Distributor */
  amfiArn: '330868',
  amfiValidity: '09/06/2028',

  /** APMI registration */
  apmiRegistrationNo: 'APRN07406',
  apmiValidity: '17/09/2028',
} as const;

export const COMPANY_LOCATION_LINES = [
  COMPANY.hqStreet,
  `${COMPANY.hqCity} ${COMPANY.hqPostalCode}`,
  `${COMPANY.hqRegion}, ${COMPANY.hqCountry}`,
] as const;
