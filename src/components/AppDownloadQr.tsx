import { cn } from '@/src/lib/utils';

type AppDownloadQrProps = {
  className?: string;
  size?: 'sm' | 'md';
  ariaLabel?: string;
};

const sizeMap = {
  sm: { qr: 'h-16 w-16', logo: 'h-4 w-4', pad: 'p-1' },
  md: { qr: 'h-[4.5rem] w-[4.5rem]', logo: 'h-5 w-5', pad: 'p-1.5' },
} as const;

/** Inverted QR with centered brand mark — Dezerv-style app download code. */
export function AppDownloadQr({
  className,
  size = 'md',
  ariaLabel = 'Scan to download the One Capital app',
}: AppDownloadQrProps) {
  const dims = sizeMap[size];

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black',
        dims.pad,
        className,
      )}
    >
      <img
        src="/images/app-download-qr.png"
        alt=""
        width={size === 'sm' ? 64 : 72}
        height={size === 'sm' ? 64 : 72}
        className={cn('block rounded-md object-cover invert', dims.qr)}
        decoding="async"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="rounded-sm bg-black px-1 py-0.5 shadow-sm ring-1 ring-white/10">
          <img
            src="/brand/logo-mark-white.png"
            alt=""
            width={size === 'sm' ? 16 : 20}
            height={size === 'sm' ? 16 : 20}
            className={cn('object-contain', dims.logo)}
            decoding="async"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
