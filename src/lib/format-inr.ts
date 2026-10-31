/** Indian Rupee formatting for calculator UIs. */

function trimNum(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded)
    ? String(rounded)
    : String(parseFloat(rounded.toFixed(2)));
}

/**
 * Compact Indian units for calculators:
 * thousand → K, lakh → L, crore → Cr  (e.g. ₹10L, ₹2.5Cr, ₹25K)
 */
export function formatInrCompact(value: number): string {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;

  if (safe >= 1_00_00_000) {
    return `₹${trimNum(safe / 1_00_00_000)}Cr`;
  }
  if (safe >= 1_00_000) {
    return `₹${trimNum(safe / 1_00_000)}L`;
  }
  if (safe >= 1_000) {
    return `₹${trimNum(safe / 1_000)}K`;
  }
  return `₹${Math.round(safe).toLocaleString('en-IN')}`;
}

/** @param compact default true — calculators show K / L / Cr instead of full figures */
export function formatInr(value: number, compact = true): string {
  if (compact) return formatInrCompact(value);

  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(safe);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}
