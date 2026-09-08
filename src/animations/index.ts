/** Minimal barrel — team section only. Merge into your existing animations/index if you already have one. */
export {
  registerGsapPlugins,
  prefersReducedMotion,
  gsap,
  ScrollTrigger,
  Flip,
  EASE,
  DURATION,
} from "./utils";
export { useGsap } from "./hooks";
export { bindLightSectionBackground } from "./sectionTheme";
export { animatePhilosophy } from "./philosophy";
export {
  animateTeamSection,
  collectTeamCardEls,
  setTeamCardState,
  expandTeamCard,
  collapseTeamCard,
} from "./team";
export type { TeamCardEls } from "./team";
