import { SITE_APP_STORE_LINKS } from '@/src/data/site-social';
import { cn } from '@/src/lib/utils';

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.79 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5m13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27m3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31M6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" />
    </svg>
  );
}

const storeButtonClass =
  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-text-muted transition-colors duration-500 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

export function AppDownloadStoreButtons({ className }: { className?: string }) {
  const appStore = SITE_APP_STORE_LINKS.find((link) => link.id === 'app-store');
  const playStore = SITE_APP_STORE_LINKS.find((link) => link.id === 'play-store');

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {appStore ? (
        <a
          href={appStore.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={appStore.label}
          className={storeButtonClass}
        >
          <AppleIcon className="h-4 w-4" />
        </a>
      ) : null}
      {playStore ? (
        <a
          href={playStore.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={playStore.label}
          className={storeButtonClass}
        >
          <PlayStoreIcon className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </div>
  );
}
