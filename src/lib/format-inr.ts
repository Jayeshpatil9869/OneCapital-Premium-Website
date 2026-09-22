/** Indian Rupee formatting for calculator UIs. */

export function formatInr(value: number, compact = false): string {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;

  if (compact && safe >= 1_00_00_000) {
    return `₹${(safe / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (compact && safe >= 1_00_000) {
    return `₹${(safe / 1_00_000).toFixed(2)} L`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(safe);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}
