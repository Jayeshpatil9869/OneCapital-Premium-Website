import type { YearlyPoint } from '@/src/lib/calculator-math';
import { formatInr } from '@/src/lib/format-inr';
import { cn } from '@/src/lib/utils';

type GrowthChartProps = {
  points: YearlyPoint[];
  investedLabel?: string;
  returnsLabel?: string;
  mode?: 'growth' | 'swp' | 'line';
  className?: string;
};

function buildLinePath(
  points: YearlyPoint[],
  key: 'value' | 'invested',
  maxValue: number,
  width: number,
  height: number,
  padX: number,
  padY: number,
): string {
  if (points.length === 0) return '';
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const step = points.length === 1 ? 0 : innerW / (points.length - 1);

  return points
    .map((point, index) => {
      const x = padX + index * step;
      const y = padY + innerH - (point[key] / maxValue) * innerH;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function GrowthChart({
  points,
  investedLabel = 'Invested',
  returnsLabel = 'Est. returns',
  mode = 'line',
  className,
}: GrowthChartProps) {
  if (points.length === 0) {
    return null;
  }

  const maxValue = Math.max(
    ...points.map((p) =>
      mode === 'swp' ? Math.max(p.invested, p.value, p.returns) : p.value,
    ),
    1,
  );

  const chartHeight = 220;
  const gap = 8;
  const barWidth = Math.max(10, Math.min(36, 520 / points.length - gap));

  const lineWidth = Math.max(360, points.length * 48 + 48);
  const lineHeight = 240;
  const padX = 28;
  const padY = 24;
  const valuePath = buildLinePath(points, 'value', maxValue, lineWidth, lineHeight, padX, padY);
  const investedPath = buildLinePath(
    points,
    'invested',
    maxValue,
    lineWidth,
    lineHeight,
    padX,
    padY,
  );

  return (
    <div
      className={cn(
        'rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-8',
        className,
      )}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/45">
          Projection
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-white/55">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-white/35" />
            {investedLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-white" />
            {mode === 'swp' ? returnsLabel : 'Projected value'}
          </span>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        {mode === 'line' ? (
          <svg
            role="img"
            aria-label="Investment growth line chart"
            width={lineWidth}
            height={lineHeight + 28}
            className="mx-auto block"
          >
            {[0.25, 0.5, 0.75, 1].map((tick) => {
              const y = padY + (lineHeight - padY * 2) * (1 - tick);
              return (
                <line
                  key={tick}
                  x1={padX}
                  x2={lineWidth - padX}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={1}
                />
              );
            })}
            <path
              d={investedPath}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d={valuePath}
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {points.map((point, index) => {
              const innerW = lineWidth - padX * 2;
              const step = points.length === 1 ? 0 : innerW / (points.length - 1);
              const x = padX + index * step;
              return (
                <g key={point.year}>
                  <title>
                    {`Year ${point.year}: invested ${formatInr(point.invested)}, value ${formatInr(point.value)}`}
                  </title>
                  <circle
                    cx={x}
                    cy={
                      padY +
                      (lineHeight - padY * 2) -
                      (point.value / maxValue) * (lineHeight - padY * 2)
                    }
                    r={3.5}
                    className="fill-white"
                  />
                  <text
                    x={x}
                    y={lineHeight + 14}
                    textAnchor="middle"
                    className="fill-white/40 text-[10px]"
                  >
                    {point.year}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <svg
            role="img"
            aria-label="Investment growth chart"
            width={Math.max(320, points.length * (barWidth + gap) + 40)}
            height={chartHeight + 40}
            className="mx-auto block"
          >
            {points.map((point, index) => {
              const x = 20 + index * (barWidth + gap);
              if (mode === 'swp') {
                const corpusH = (point.value / maxValue) * chartHeight;
                const withdrawnH = (point.returns / maxValue) * chartHeight;
                return (
                  <g key={point.year}>
                    <title>
                      {`Year ${point.year}: remaining ${formatInr(point.value)}, withdrawn ${formatInr(point.returns)}`}
                    </title>
                    <rect
                      x={x}
                      y={chartHeight - corpusH}
                      width={barWidth}
                      height={Math.max(corpusH, 0)}
                      rx={3}
                      className="fill-white/35"
                    />
                    <rect
                      x={x}
                      y={chartHeight - corpusH - withdrawnH}
                      width={barWidth}
                      height={Math.max(withdrawnH, 0)}
                      rx={3}
                      className="fill-white"
                      opacity={0.85}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight + 18}
                      textAnchor="middle"
                      className="fill-white/40 text-[10px]"
                    >
                      {point.year}
                    </text>
                  </g>
                );
              }

              const investedH = (point.invested / maxValue) * chartHeight;
              const returnsH = (point.returns / maxValue) * chartHeight;

              return (
                <g key={point.year}>
                  <title>
                    {`Year ${point.year}: invested ${formatInr(point.invested)}, value ${formatInr(point.value)}`}
                  </title>
                  <rect
                    x={x}
                    y={chartHeight - investedH}
                    width={barWidth}
                    height={Math.max(investedH, 0)}
                    rx={3}
                    className="fill-white/35"
                  />
                  <rect
                    x={x}
                    y={chartHeight - investedH - returnsH}
                    width={barWidth}
                    height={Math.max(returnsH, 0)}
                    rx={3}
                    className="fill-white"
                    opacity={0.9}
                  />
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 18}
                    textAnchor="middle"
                    className="fill-white/40 text-[10px]"
                  >
                    {point.year}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
