import { gsap, prefersReducedMotion, registerGsapPlugins } from "./utils";

const LIGHT = "#ffffff";
const DARK = "#000000";

/**
 * ScrollTrigger backgroundColor for this section only (Logos / Philosophy).
 * Page shell and neighboring sections stay black — no global theme flip.
 *
 * Scroll progress through the section:
 *   enter → black to white → hold white → exit → white to black
 */
export function bindLightSectionBackground(section: HTMLElement): void {
  registerGsapPlugins();

  if (prefersReducedMotion()) {
    gsap.set(section, { backgroundColor: LIGHT });
    return;
  }

  gsap.set(section, { backgroundColor: DARK });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 90%",
      end: "bottom 10%",
      scrub: 0.45,
    },
  });

  tl.fromTo(
    section,
    { backgroundColor: DARK },
    { backgroundColor: LIGHT, duration: 0.22, ease: "none" }
  )
    .to(section, { backgroundColor: LIGHT, duration: 0.56, ease: "none" })
    .to(section, { backgroundColor: DARK, duration: 0.22, ease: "none" });
}
