# OneCapital Premium Website

Institutional wealth command site for OneCapital.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Build for production:
   `npm run build`

## Design system / component lab

Internal Awwwards-oriented component stack (GSAP + Lenis + Tailwind):

- Lab UI: [http://localhost:3000/design-system](http://localhost:3000/design-system)
- Registry: `src/lib/component-registry.ts`
- Motion tokens: `src/lib/motion.ts`
- Tokens / effects CSS: `src/styles/`

Compose new sections from `src/components/ui`, `motion`, `effects`, and `sections` rather than one-off markup.
