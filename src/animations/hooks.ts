import { useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "./utils";

type SetupFn = (root: HTMLElement) => void;

/**
 * Runs a GSAP setup inside gsap.context scoped to `rootRef`.
 * Cleans up on unmount. Skips when prefers-reduced-motion is on
 * unless `force` is true.
 */
export function useGsap(
  rootRef: RefObject<HTMLElement | null>,
  setup: SetupFn,
  deps: DependencyList = [],
  options?: { force?: boolean }
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useLayoutEffect(() => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion() && !options?.force) {
      gsap.set(root.querySelectorAll("[data-gsap]"), {
        clearProps: "all",
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      setupRef.current(root);
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
