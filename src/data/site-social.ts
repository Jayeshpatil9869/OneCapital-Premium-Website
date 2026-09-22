import { COMPANY } from '@/src/data/company';

export type SocialPlatform = 'linkedin' | 'instagram';

export type SiteSocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

export type AppStorePlatform = 'play-store';

export type SiteAppStoreLink = {
  id: AppStorePlatform;
  label: string;
  href: string;
};

/** Only publish profiles that resolve to OneCapital public pages. */
export const SITE_SOCIAL_LINKS: SiteSocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: COMPANY.linkedinUrl,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: COMPANY.instagramUrl,
  },
];

/**
 * App Store listing omitted until an official Apple URL is confirmed.
 * Play listing uses the package already wired in this project.
 */
export const SITE_APP_STORE_LINKS: SiteAppStoreLink[] = [
  {
    id: 'play-store',
    label: 'Get it on Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.dwt.capital1',
  },
];
