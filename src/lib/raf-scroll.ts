/** Coalesce scroll/resize work to one callback per animation frame. */
export function subscribeRafScroll(
  handler: () => void,
  options?: { resize?: boolean },
): () => void {
  let ticking = false;

  const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      handler();
    });
  };

  handler();
  window.addEventListener("scroll", schedule, { passive: true });
  if (options?.resize !== false) {
    window.addEventListener("resize", schedule);
  }

  return () => {
    window.removeEventListener("scroll", schedule);
    if (options?.resize !== false) {
      window.removeEventListener("resize", schedule);
    }
  };
}
