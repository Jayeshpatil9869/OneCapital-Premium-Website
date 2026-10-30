# OneCapital Premium Website — SCSS Migration Plan

**Status:** Stage B complete (foundation). Next: Stage C (base & shell) after go-ahead.  
**Palette:** Option A retained — dark canvas + gold secondary; **brand green + financial semantics added**.  
**Constraint:** Presentation-only. Preserve routes, calculator math, SEO hooks, Lenis/GSAP behaviour, staged Footer/Calculators work.

---

## 0. Product decision gate (colours)

The external master prompt proposed a **light operational palette** (canvas `#F6F7F8`, brand green `#168653`, dark sidebar).

This repo ships a **dark premium marketing system** (canvas `#000`, surface `#1D1D1D`, primary CTA white/black).

| Option | Meaning |
|---|---|
| **A — Dark canvas + expanded semantics (chosen)** | Keep black canvas; gold demoted to secondary (`--oc-color-gold*`, legacy `--color-accent*` → gold); add brand green + positive/negative/warning/info + link `#1677C8`. Canonical `--oc-color-*`. Soft fills for white-card sections only. |
| **B — Adopt light-green identity** | Full visual redesign; requires separate art-direction + Reticle QA on every route |
| **C — Dual theme** | Dark default + optional `[data-theme=light]`; larger scope (stub only) |

**Authoring:** `src/styles/tokens/_colors.scss` → emit in `_themes.scss` → Tailwind via `theme-bridge.css`. Status helpers: `base/_semantic-colors.scss`.

---

## 1. Goals

1. One central token authoring file (`tokens/_tokens.scss` + focused partials).
2. Emit CSS custom properties for runtime + Tailwind v4 `@theme` bridge so utilities stay in sync.
3. Modular SCSS (`@use` / `@forward` only — no deprecated Sass `@import`).
4. Migrate every route/component consumer off duplicate hex/arbitrary values where tokens apply.
5. Keep Tailwind installed; SCSS owns design system + complex CSS; utilities OK for local layout.
6. Prove success with the central-token acceptance test (§7).

---

## 2. Non-goals

- Rewriting React trees into SCSS selectors for uniformity.
- Removing Tailwind.
- Changing API/backend (N/A) or calculator formulas.
- Implementing a theme toggle UI unless Option C is approved.
- Creating empty dashboard/brokerage page SCSS stubs.
- Mass find-replace of black/white without classification.

---

## 3. Technical strategy — Tailwind v4 + SCSS

### Current

- `@tailwindcss/vite` plugin; CSS-first `@theme` in `tokens.css`.
- Entry: `src/index.css`.

### Target

1. Add `sass` (or `sass-embedded`) as a **devDependency**.
2. Create `src/styles/main.scss` as the **only** stylesheet imported from `src/main.tsx`.
3. From SCSS:
   - Emit `:root` / semantic custom properties (`--oc-*` and/or keep existing `--color-*` names during bridge).
   - Emit or `@include` a Tailwind `@theme { … }` block so `bg-canvas`, `text-text-muted`, etc. keep working.
4. Port existing plain CSS files into SCSS partials (content first, rename later).
5. **Naming bridge plan:**
   - Short term: keep current CSS var names (`--color-canvas`, `--page-gutter`, …) to avoid a big-bang class rename.
   - Document `--oc-*` aliases that map 1:1 for future clarity.
   - Long term (Stage G): collapse aliases once all consumers migrated.

### Specificity policy

| Layer | Owns |
|---|---|
| Tokens | Colours, type scale, space, radius, shadow, motion, z-index, layout dims |
| Base | html/body/#root, focus-visible, media defaults |
| Components SCSS | Buttons flair, glass, calc controls, team cards, preloader |
| Tailwind utilities | One-off flex/grid/spacing in JSX |
| Pages SCSS | Only true page composition leftovers |

Avoid `@apply` sprawl for new code; prefer tokens + small component classes.

---

## 4. Proposed token groups (Option A defaults)

Align maps to **current** `tokens.css` (not the light dashboard table), then extend:

| Group | Examples |
|---|---|
| Color | canvas, surface, surface-elevated, text-*, border*, link, accent*, light-section canvas/text |
| Typography | font stacks, display/section/body/meta sizes, weights, tracking, tabular nums |
| Spacing | 4px scale + section/gutter semantic tokens |
| Layout | container-max, page-gutter, nav height, fab offsets |
| Radius | sm/md/lg/xl/pill (map from rem tokens) |
| Shadow | card, raised team card, button glow, calc select |
| Motion | ease-premium/smooth, duration-fast/normal/slow |
| Effects | blur-glass, spotlight-size, noise opacity, mobile glass gradient |
| Z-index | existing scale |
| Breakpoints | 380 / 767 / 1024 / 1280 / 1440 (match real media queries) |
| Component | btn heights, calc thumb size, team card radius |

**Immediate fix in Stage B:** remove or correct `:root { --color-background: #b16c6c }` anomaly — set to canvas black (or delete duplicate if `@theme` suffices).

---

## 5. Folder plan (create as needed)

```text
src/styles/
  main.scss
  abstracts/_breakpoints.scss _mixins.scss _functions.scss _index.scss
  tokens/_colors.scss _typography.scss _spacing.scss _radius.scss
         _shadows.scss _layout.scss _motion.scss _z-index.scss
         _themes.scss _tokens.scss _index.scss
  base/_reset.scss _root.scss _body.scss _typography.scss _accessibility.scss _index.scss
  layout/_app-shell.scss _header.scss _container.scss _index.scss
  components/_buttons.scss _cards.scss _forms.scss _accordion.scss
             _calculators.scss _chat.scss _index.scss
  pages/_team.scss _solutions.scss _insights.scss _index.scss
  effects/_glass.scss _spotlight.scss _gradients.scss _noise.scss _index.scss
  utilities/_light-section.scss _text.scss _index.scss
```

Port mapping:

| Current file | Target |
|---|---|
| `tokens.css` | `tokens/*` |
| `index.css` `@layer base/utilities` + calc blocks | `base/*`, `utilities/*`, `components/_calculators.scss` |
| `motion.css` | `effects` + `components/_buttons` (flair) + preloader partial |
| `effects.css` | `effects/*` |
| `team.css` | `pages/_team.scss` |
| `solutions.css` | `pages/_solutions.scss` |
| `MagicBento.css` | keep colocated **or** fold into effects once stable |

---

## 6. Staged execution

### Stage A — Audit & plan ✅

Deliverables:

- `SCSS_ARCHITECTURE_AUDIT.md`
- `SCSS_ROUTE_INVENTORY.md`
- `SCSS_COMPONENT_INVENTORY.md`
- `SCSS_MIGRATION_PLAN.md` (this file)

### Stage B — SCSS foundation ✅

1. Confirmed git status; left staged Footer/Calculators untouched.
2. Installed `sass` (`^1.107.0`) as devDependency.
3. Added `src/styles/main.scss` + `abstracts/`, `tokens/`, `base/` scaffolds.
4. SCSS maps emit `:root` CSS vars (Option A). `#b16c6c` anomaly removed — `--color-background` = canvas black.
5. Tailwind v4 note: `@theme` inside SCSS is **not** picked up by `@tailwindcss/vite`. Bridge = `src/styles/theme-bridge.css` (`@theme inline` → `var(--*)` from SCSS `:root`).
6. `main.tsx` imports `styles/main.scss` then `index.css`. `index.css` keeps Tailwind + `theme-bridge.css` + legacy motion/effects/team/solutions. Removed `tokens.css` (it shadowed the `tokens/` directory for `@use "tokens"`).
7. Verified: `npm run lint`, `npm run build` (clean, no CSS optimizer empty-selector warning).
8. **No page redesign.**

### Stage C — Base & shell

1. Body/canvas/focus/Lenis helpers.
2. App shell, Navbar surfaces, Footer, Preloader CSS tokenisation.
3. Container / Section primitives consume only tokens.
4. Verify all routes still render.

### Stage D — Shared components

Order:

1. Typography (replace `#B3B3B3` / `#757575` literals)
2. Button + flair CSS
3. Card + Surface + glass utilities
4. Field / Select + move `.oc-calc-select-light` / range thumbs
5. Accordion + light-section companion rules
6. Calculator shell chrome
7. Chat widget colours

### Stage E — Page-by-page

Follow `SCSS_ROUTE_INVENTORY.md` priorities:

1. `/design-system` (acceptance lab)
2. `/` Home
3. `/contact`, `/calculators` (+ tools)
4. `/team`, `/solutions`
5. Heavy: `/solutions/pms-aif`, `/solutions/mutual-funds`
6. Remaining solutions products + dedicated pages
7. About, Insights, Blog, Approach, Newsletter, 404

Update route checklist after each group. Visual check at 1440 / 1280 / 1024 / 768 / 390 / 360.

### Stage F — Responsive & a11y

- No horizontal overflow regressions.
- Focus rings from tokens.
- `prefers-reduced-motion` paths intact (preloader, spotlight, sectionTheme).
- Contrast on light-section and dark glass.

### Stage G — Remove legacy

Only after consumers migrated:

- Delete obsolete `tokens.css` / duplicate CSS entry leftovers.
- Remove dead selectors and unused aliases.
- Deduplicate `@theme` vs `:root`.

### Stage H — Final regression & docs

1. `npm run lint` + `npm run build` (+ any tests if added).
2. Central-token acceptance test (§7).
3. Write `SCSS_DESIGN_SYSTEM_DOCUMENTATION.md` + `SCSS_MIGRATION_REPORT.md`.
4. ACS `finalize_task` / `update_handoff`.

---

## 7. Central-token acceptance test

After migration (Option A tokens):

1. Change `--color-accent` (or brand action token) temporarily → gold accents / designated brand uses update; revert.
2. Change card radius token → shared Card/glass panels update; revert.
3. Change body/secondary text token → `BodyText` and tokenised copy update; revert.
4. Change `--page-gutter` → Container gutters update site-wide; revert.
5. Document intentional exceptions (SVGs, chart series, GSAP black/white tweens).

**Pass criteria:** changing one central token updates all *intended* consumers without editing each page.

Also re-run on `/design-system` as the lab surface.

---

## 8. Verification commands

```bash
npm run lint
npm run build
npm run dev
```

Optional later: Reticle flows once instrumented; do not claim UI verification without a Reticle verdict if ACS `decide_tools` requires it for owned UI.

Responsive widths: 1440, 1280, 1024, 768, 390, 360.

---

## 9. Risk register & mitigations

| Risk | Mitigation |
|---|---|
| Palette redesign by mistake | Option A default; explicit approval for B/C |
| Double CSS injection | Single entry `main.scss` |
| Breaking Navbar pill / preloader | Preserve selectors; tokenise values only |
| Staged Footer/Calculators conflict | Diff before edit; no git restore |
| Tailwind arbitrary leftovers | Track in migration report; no silent skip |
| Graph MCP stale / wrong repo | Prefer filesystem inventory for this site |

---

## 10. Effort sketch (indicative)

| Stage | Relative effort |
|---|---|
| B Foundation | S |
| C Shell | M |
| D Shared UI | M–L |
| E Pages (esp. PmsAif/MutualFunds) | L |
| F–H QA + docs | M |

---

## 11. Immediate next action

**Stop here until the user confirms:**

1. Stage A docs accepted.  
2. Palette option **A / B / C**.  
3. Permission to start **Stage B** (install Sass + SCSS foundation only).

No application styling migration begins before that confirmation.
