# OneCapital Premium Website — SCSS Architecture Audit

**Date:** 2026-10-30  
**Scope:** Stage A (audit only) — no application code modified  
**Workspace:** `OneCapital Premium Website`  
**Branch:** `main` @ `8d7894c`  
**Git note:** Pre-existing staged files present — `src/components/Footer.tsx`, `src/pages/Calculators.tsx`. Do not discard or overwrite that work.

---

## 1. Executive verdict

This repository is a **Vite + React 19 + React Router 7 + Tailwind CSS v4** dark-first **marketing / premium wealth** website — not the light dashboard / sidebar app assumed in some external SCSS master prompts.

**Current styling model:** CSS-first Tailwind `@theme` tokens + plain CSS modules (`tokens.css`, `motion.css`, `effects.css`, `team.css`, `solutions.css`) + heavy Tailwind utility classes in TSX + a small shared UI kit under `src/components/ui`.

**Sass:** Not installed as a project dependency. No `.scss` / `.sass` source files exist. `package-lock.json` only references `sass` as an optional peer of a transitive package. Migration Stage B must add `sass` (or `sass-embedded`) and wire it through Vite before any SCSS modules can compile.

**Central control today:** Partial. `src/styles/tokens.css` is the intended single token source, but:

1. Values are duplicated between `@theme` and `:root`.
2. `:root --color-background` is currently `#b16c6c` (anomalous rose) while `@theme --color-canvas` / `--color-background` are `#000000` — **token conflict / likely accidental override**.
3. ~253 hex occurrences and ~174 Tailwind arbitrary hex utilities (`[#…]`) bypass tokens across pages and sections.
4. Light sections, charts, calculators, and GSAP colour tweens hardcode black/white independently.

**Definition of success for this product:** one central token file (SCSS → emitted CSS custom properties + Tailwind `@theme` bridge) must drive dark canvas, surfaces, light-section inverse, gold accent, typography, spacing, radius, motion, and z-index — without flattening unique page compositions or rewriting business/calc logic.

---

## 2. Stack inventory (verified)

| Layer | Actual |
|---|---|
| Package name | `onecapital-premium-website` |
| Bundler | Vite `^6.2.3` |
| UI | React `^19.0.1`, React DOM `^19.0.1` |
| Routing | `react-router-dom` `^7.18.2` (`createBrowserRouter` in `src/App.tsx`) |
| CSS | Tailwind `^4.1.14` via `@tailwindcss/vite` (no `tailwind.config.*`) |
| Sass | **Absent** from `dependencies` / `devDependencies` |
| Motion | GSAP `^3.15.0`, `@gsap/react`, Motion `^12`, Lenis `^1.3.26` (desktop-only smooth scroll) |
| Fonts | `@fontsource/geist-sans`, `@fontsource/geist-mono` + Google Fonts in `index.html` (Geist, Plus Jakarta Sans, Inter, Playfair, Cormorant, Alex Brush, Geist Mono) |
| Utilities | `clsx`, `tailwind-merge` (`cn` in `src/lib/utils`) |
| Scripts | `dev` (Vite :3000), `build`, `preview`, `lint` (`tsc --noEmit`), `clean` |
| App entry | `src/main.tsx` → `./index.css` + `<App />` |
| Layout | `src/layouts/Layout.tsx` — Navbar, Footer, Preloader, Chat, App download FAB, Risk strip |

---

## 3. Stylesheet graph (import order)

```text
src/main.tsx
  └── src/index.css
        ├── @import "tailwindcss"
        ├── ./styles/tokens.css      ← @theme + :root tokens
        ├── ./styles/motion.css      ← preloader, reveals, button flair
        ├── ./styles/effects.css     ← glass, noise, spotlight, grids
        ├── ./styles/team.css        ← team carousel / cards
        └── ./styles/solutions.css   ← solutions accents / viz labels

Also (component-scoped):
  src/components/effects/MagicBento.css  (imported by MagicBento.tsx)
```

**Observation:** There is already a predictable CSS entry (`index.css`). Target SCSS `main.scss` should **replace or become** this orchestrator — not a second parallel entry that doubles CSS output.

---

## 4. Token system as found

### 4.1 `src/styles/tokens.css`

**`@theme` block (Tailwind v4 utilities):**

- Fonts: `--font-sans`, `--font-serif`, `--font-cormorant`, `--font-script`, `--font-mono`
- Colours: canvas/background `#000`, surface/panel `#1D1D1D`, elevated `#262626`, text main/primary white, secondary `#B3B3B3`, muted `#757575`, emphasis rgba whites, border/shadow/glow white/10, link `#0099FF`, accent gold `#C9A86A` (+ muted/soft)
- Radius, container, gutter, section spacing, grid gap, blur, z-index scale

**`:root` block:**

- Duplicates many of the above
- **Critical:** `--color-background: #b16c6c` conflicts with black canvas story
- Adds motion easings/durations and `--spotlight-size`

**Route-scoped CSS variable overrides (min-width 1280px):**

| Class | Where applied | Effect |
|---|---|---|
| `.is-home` | `Layout` → `.oc-shell` | wider `--container-max` |
| `.is-team` | `Layout` → `.oc-shell` | wider `--container-max` |
| `.is-insights` | `Insights.tsx` inner wrapper | wider `--container-max` |

### 4.2 Semantic usage in components

Shared primitives often consume tokens correctly:

- `Container` → `max-w-[var(--container-max)]`, `px-[var(--page-gutter)]`
- `Section` pad → `--space-section` / `--space-section-sm`
- Body/shell → `bg-canvas`, `text-text-main`

But many leaf components still use `bg-[#1D1D1D]`, `text-[#B3B3B3]`, `text-[#757575]`, etc., duplicating token values as literals.

### 4.3 Theme switching

- No `data-theme` light/dark product toggle.
- “Light” is **section-local**: `.light-section` utility in `index.css`, `Section tone="light"`, GSAP `bindLightSectionBackground`, testimonials class toggle.
- Dark glass is the default marketing language; light bands are intentional contrast, not a global theme.

---

## 5. Problem report (styling)

### 5.1 Quantified (src scan, 2026-10-30)

| Signal | Approx. count |
|---|---:|
| Hex colour matches (`#…`) | 253 |
| Tailwind arbitrary hex (`[#…]`) | 174 |
| Inline `style={{…}}` occurrences | 25 |
| Token-ish class usage (`bg-canvas` / `bg-surface` / `text-text-*` / …) | 59 |
| `glass-panel` usages | 15 |
| `light-section` usages | 5 |

### 5.2 Top repeated hex values

| Hex | ~Count | Likely meaning |
|---|---:|---|
| `#b3b3b3` | 53 | text secondary (also `--color-text-secondary`) |
| `#757575` | 45 | text muted |
| `#262626` | 43 | elevated surface |
| `#1d1d1d` | 33 | surface / glass-panel |
| `#ffffff` / `#000000` | 20 / 11 | inverse / canvas (often intentional) |
| `#18181b` | 9 | zinc near-black (calculators / light controls) |
| `#c9a86a` / `#d4bc8e` | low | gold accent (also tokens) |
| `#b16c6c` | 1 | **anomalous `:root` background — investigate/fix first** |

### 5.3 Architectural issues

1. **Dual token emission** (`@theme` vs `:root`) with drift risk.
2. **Hardcoded duplicates of token colours** in TSX (esp. `BodyText`, `Card`, `Section tone="panel"`, About/Insights/Solutions pages).
3. **Worst offenders by hex density:** `PmsAifPage.tsx` (~74), `MutualFundsPage.tsx` (~24), then global CSS files.
4. **Page-local CSS** (`team.css`, `solutions.css`, calculator overrides in `index.css`) not fully tokenized.
5. **Inline styles** for GSAP-driven motion, spotlights, charts, maps — many must remain dynamic; colour *values* should still come from tokens/CSS vars.
6. **Arbitrary Tailwind shadows / spacing** on buttons (`glow` variant) bypass radius/shadow tokens.
7. **No SCSS layer** yet — mixins/breakpoints live as repeated media queries (`max-width: 767px`, `min-width: 1280px`, `1024px` Lenis gate).
8. **Master-prompt palette mismatch:** proposed light canvas `#F6F7F8` + brand green `#168653` + sidebar `#080808` describes a **different product surface**. Applying it blindly would redesign this site. Token migration must **preserve current dark-first identity** unless product explicitly approves a visual reset.

### 5.4 Intentional hardcodes (do not blindly “fix”)

- Preloader full black (`#000`) and white glyph fills.
- Logo / SVG brand marks.
- Chart series colours and SVG strokes (need semantic chart tokens, not random green).
- Light-section inverse text (black on white).
- Calculator light-mode control chrome (`oc-calc-*` in `index.css`).
- GSAP scrub between `#000000` ↔ `#ffffff` for section atmosphere.

---

## 6. What the master prompt assumed vs reality

| Master prompt assumption | This repo |
|---|---|
| Dashboard shell / sidebar / KPI tables | Marketing site; no app sidebar |
| Routes: brokerage, clients, reports | Routes: about, solutions, team, insights, calculators, contact |
| Light-first operational UI | Dark-first premium editorial UI |
| Brand green primary | White primary CTA + gold tertiary accent |
| Existing SCSS tree | Plain CSS + Tailwind only |
| `src/index.css` + listed style files | **Present and accurate** |

**Implication:** Adapt the proposed SCSS folder plan to **this** component set (Navbar, Footer, Hero, Solutions, Team, Calculators, Blog, Contact). Do not create empty `_dashboard.scss` / `_brokerage.scss` modules.

---

## 7. Files that must change in later stages (preview)

### Foundation

- `package.json` — add Sass
- `vite.config.ts` — ensure `.scss` resolution (Vite native once `sass` installed)
- `src/index.css` / new `src/styles/main.scss` — entry orchestration
- `src/styles/tokens.css` → SCSS token modules emitting CSS vars + `@theme`

### High-churn consumers (migrate early)

- `src/components/ui/**` (Button, Card, Field, Typography, Layout primitives)
- `src/index.css` utilities (glass, light-section, calc controls)
- `src/styles/effects.css`, `motion.css`, `team.css`, `solutions.css`
- `PmsAifPage.tsx`, `MutualFundsPage.tsx`, Solutions catalogue/product offer sections
- About sticky nav / story / mission sections
- Calculator shell / charts / sliders

### Do not touch (presentation-safe boundary)

- `src/lib/calculator-math.ts` and formula logic
- SEO helpers, data content files (copy-only unless class names)
- API / backend (none in this marketing app beyond static content)
- Route paths in `App.tsx` (preserve redirects)

---

## 8. Risk assessment

| Risk | Level | Mitigation |
|---|---|---|
| Accidental light/green redesign | High | Gate palette decision; default migrate **current** dark tokens first |
| Tailwind v4 + SCSS dual entry duplication | High | Single stylesheet entry; `@theme` emitted once |
| Breaking GSAP / Lenis / preloader | Medium | Keep motion CSS class names; tokenise colours only |
| Specificity wars (utilities vs SCSS) | Medium | SCSS owns complex components; utilities for local layout |
| Staged Footer/Calculators work lost | Medium | Never reset; migrate around or rebase carefully |
| Large page files with embedded styles | Medium | Page-by-page Stage E with visual checks |

---

## 9. Recommended target architecture (adapted)

```text
src/styles/
  main.scss                 ← sole entry (imported from main.tsx)
  abstracts/                ← mixins, functions, breakpoints
  tokens/                   ← SCSS maps → CSS custom properties + @theme bridge
  base/                     ← reset, body, a11y (from index @layer base)
  layout/                   ← shell, container, section, nav/footer hooks
  components/               ← button, card, form, accordion, calc chrome
  pages/                    ← team, solutions, insights, calculators only as needed
  effects/                  ← glass, noise, spotlight, gradients
  utilities/                ← light-section, text helpers
  responsive/               ← shared breakpoint overrides if needed
```

Create **only** modules with real consumers. Keep Tailwind installed.

---

## 10. Phase 1 status

| Deliverable | Status |
|---|---|
| `SCSS_ARCHITECTURE_AUDIT.md` | This document |
| `SCSS_ROUTE_INVENTORY.md` | Created |
| `SCSS_COMPONENT_INVENTORY.md` | Created |
| `SCSS_MIGRATION_PLAN.md` | Created |

**Stage B (done):** `sass` installed; `src/styles/main.scss` + `abstracts/` + `tokens/` + `base/`; `:root` from SCSS; Tailwind via `theme-bridge.css` (`@theme inline`); `#b16c6c` fixed; `tokens.css` removed (shadowed `tokens/`). Palette Option A.

**Next:** Stage C (base & shell) on go-ahead. Do not migrate pages until then.
