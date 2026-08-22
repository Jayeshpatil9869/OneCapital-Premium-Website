export type SocialPlatform = 'linkedin' | 'twitter' | 'instagram' | 'facebook';

export type SiteSocialLink = {
  id: SocialPlatform;
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
