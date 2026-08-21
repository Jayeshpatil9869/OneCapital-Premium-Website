/**
 * OneCapital Premium Component Stack
 * ====================================
 * Architecture report (Phase 1 audit → implementation)
 *
 * Existing stack preserved
 * - React 19 + Vite 6 + TypeScript + Tailwind 4
 * - react-router-dom (routes unchanged; lab route added)
 * - GSAP + ScrollTrigger + Lenis (Layout) — Framer Motion NOT added
 * - Brand: OLED black canvas, Geist Sans/Mono, glass panels, light-section bands
 *
 * New layers
 * - src/styles/{tokens,motion,effects}.css
 * - src/lib/motion.ts + component-registry.ts
 * - src/components/ui|motion|effects|sections
 * - /design-system lab
 * - Home migrated onto HeroEditorial, MetricStrip, Card, Bento, Button, Reveal, CtaBand
 *
 * Principles
 * - One design language (not a collage of Aceternity demos)
 * - GSAP for scroll/entrance; CSS for marquee/spotlight/borders
 * - prefers-reduced-motion + focus-visible + keyboard CTAs
 * - Progressive migration: other pages still use local GSAP until replaced
 */

export {};
