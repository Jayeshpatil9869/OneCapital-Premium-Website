export type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'facebook';

export type SiteSocialLink = {
  id: SocialPlatform;
  label: string;
  href: string;
};

export type AppStorePlatform = 'app-store' | 'play-store';

export type SiteAppStoreLink = {
  id: AppStorePlatform;
  label: string;
  href: string;
};

/** Update hrefs with OneCapital official profile URLs before production. */
export const SITE_SOCIAL_LINKS: SiteSocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    href: 'https://twitter.com/',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/',
  },
];

/**
 * TODO(prod): replace with OneCapital listing URLs and regenerate
 * `public/images/app-download-qr.png` so the QR matches the same destination.
 */
export const SITE_APP_STORE_LINKS: SiteAppStoreLink[] = [
  {
    id: 'app-store',
    label: 'Download on the App Store',
    href: 'https://apps.apple.com/',
  },
  {
    id: 'play-store',
    label: 'Get it on Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.dwt.capital1',
  },
];
