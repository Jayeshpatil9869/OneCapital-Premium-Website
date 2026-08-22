import { Facebook, Instagram, Linkedin, Twitter, type LucideIcon } from 'lucide-react';
import { SITE_SOCIAL_LINKS, type SocialPlatform } from '@/src/data/site-social';
import { cn } from '@/src/lib/utils';

const SOCIAL_ICONS: Record<SocialPlatform, LucideIcon> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
};

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {SITE_SOCIAL_LINKS.map((link) => {
        const Icon = SOCIAL_ICONS[link.id];
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full border border-white/10 text-text-muted hover:text-white hover:border-white/30 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Icon className={cn('w-4 h-4', iconClassName)} aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
