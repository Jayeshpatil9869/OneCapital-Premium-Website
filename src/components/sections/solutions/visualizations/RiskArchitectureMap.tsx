import { cn } from '@/src/lib/utils';

const NODES = [
  { id: 'growth', label: 'Growth', x: 50, y: 12 },
  { id: 'liquidity', label: 'Liquidity', x: 18, y: 52 },
  { id: 'protection', label: 'Protection', x: 82, y: 52 },
  { id: 'diversification', label: 'Diversification', x: 32, y: 88 },
  { id: 'legacy', label: 'Legacy', x: 68, y: 88 },
] as const;

type RiskArchitectureMapProps = {
  className?: string;
  highlight?: string;
};

export function RiskArchitectureMap({ className, highlight }: RiskArchitectureMapProps) {
  return (
    <div className={cn('relative aspect-[4/3] w-full max-w-md', className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <line x1="50" y1="18" x2="22" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <line x1="50" y1="18" x2="78" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <line x1="22" y1="52" x2="34" y2="84" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
        <line x1="78" y1="52" x2="66" y2="84" stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" />
        <line x1="34" y1="88" x2="66" y2="88" stroke="rgba(255,255,255,0.1)" strokeWidth="0.4" />
      </svg>
      {NODES.map((node) => (
        <div
          key={node.id}
          className={cn(
            'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/[0.04] px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white/70 backdrop-blur-sm transition-colors duration-500',
            highlight === node.id && 'border-white/40 text-white',
          )}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </div>
      ))}
      <p className="solutions-viz-label absolute -bottom-6 left-0 right-0 text-center">
        Relationship map — illustrative
      </p>
    </div>
  );
}
