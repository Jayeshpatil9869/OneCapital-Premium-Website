import { AppDownloadPanel } from '@/src/components/AppDownloadPanel';
import { cn } from '@/src/lib/utils';

type AppDownloadCardProps = {
  className?: string;
};

export function AppDownloadCard({ className }: AppDownloadCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5',
        'oc-card-hover-glow transition-colors duration-500 hover:border-white/20',
        className,
      )}
    >
      <AppDownloadPanel />
    </div>
  );
}
