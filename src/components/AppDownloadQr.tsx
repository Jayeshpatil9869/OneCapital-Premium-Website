import qrCodeUrl from '@/qr-code.svg';
import { cn } from '@/src/lib/utils';

type AppDownloadQrProps = {
  className?: string;
  size?: 'sm' | 'md';
  ariaLabel?: string;
};

const sizeMap = {
  sm: 'h-16 w-16',
  md: 'h-[4.5rem] w-[4.5rem]',
} as const;

/** Official One Capital app QR (`qr-code.svg`), inverted for the dark UI. */
export function AppDownloadQr({
  className,
  size = 'md',
  ariaLabel = 'Scan to download the One Capital app',
}: AppDownloadQrProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg border border-white/10 bg-black p-1',
        className,
      )}
    >
      <img
        src={qrCodeUrl}
        alt=""
        width={size === 'sm' ? 64 : 72}
        height={size === 'sm' ? 64 : 72}
        className={cn('block rounded-md object-contain invert', sizeMap[size])}
        decoding="async"
        aria-hidden
      />
    </div>
  );
}
