import { gsap, prefersReducedMotion, registerGsapPlugins, qs } from "./utils";
import { bindLightSectionBackground } from "./sectionTheme";

/**
 * Philosophy: light-section bg scrub + opposing line drift (desktop only).
 * Below md, lines stay static so copy isn't clipped off-screen.
 */
export function animatePhilosophy(root: HTMLElement): void {
  registerGsapPlugins();
  bindLightSectionBackground(root);

  if (prefersReducedMotion()) return;

  const top = qs(root, '[data-gsap="phil-line-top"]');
  const bot = qs(root, '[data-gsap="phil-line-bot"]');
  if (!top || !bot) return;

  gsap.set([top, bot], { x: 0, force3D: true });

  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 55%",
          end: "bottom 15%",
          scrub: 0.55,
        },
      })
      .fromTo(top, { x: 0 }, { x: "22vw" }, 0)
      .fromTo(bot, { x: 0 }, { x: "-22vw" }, 0);
  });
}
