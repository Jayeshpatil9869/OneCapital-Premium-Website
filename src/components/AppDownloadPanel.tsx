import { AppDownloadQr } from '@/src/components/AppDownloadQr';
import { AppDownloadStoreButtons } from '@/src/components/AppDownloadStoreButtons';
import { cn } from '@/src/lib/utils';

type AppDownloadPanelProps = {
  className?: string;
  qrSize?: 'sm' | 'md';
};

export function AppDownloadPanel({ className, qrSize = 'md' }: AppDownloadPanelProps) {
  return (
    <div className={cn('flex items-center gap-3.5', className)}>
      <AppDownloadQr size={qrSize} />

      <div className="flex min-w-0 flex-col gap-2.5">
        <p className="text-xs font-medium leading-tight text-white/90">
          Download One<br />Capital App
        </p>

        <AppDownloadStoreButtons />
      </div>
    </div>
  );
}
