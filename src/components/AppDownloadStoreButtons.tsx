import { SITE_APP_STORE_LINKS } from '@/src/data/site-social';
import { cn } from '@/src/lib/utils';

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
  const playStore = SITE_APP_STORE_LINKS.find((link) => link.id === 'play-store');

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
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
