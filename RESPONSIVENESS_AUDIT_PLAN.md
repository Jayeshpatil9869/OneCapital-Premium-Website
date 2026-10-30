# One Capital — Responsiveness Audit & Fix Plan

**Date:** 2026-10-30  
**Status:** Phases A–E implemented (2026-10-30)  
**Scope:** Site-wide, with priority on **FR** = home Solutions Overview pillar cards (`SolutionsOverviewSection` + `WealthCollageVisual`)  
**Method:** Playwright viewport matrix + layout metrics (overflow-x, clipping, collage size) + code review  
**Constraint:** Prefer **Sass** (`src/styles/**`); plain CSS only when Tailwind/`@theme` bridge cannot express the fix.

---

## 1. Devices & resolutions tested

| Label | Size (CSS px) | Class |
|-------|---------------|--------|
| iPhone SE | 375×667 / 375×812 | Mobile |
| iPhone 14 | 390×844 | Mobile |
| Pixel 7 | 412×915 | Mobile |
| iPhone Pro Max | 430×932 | Mobile |
| iPad portrait | 768×1024 | Tablet |
| Mid tablet | 820×1180 | Tablet gap zone |
| iPad landscape | 1024×768 | Tablet / small laptop |
| Laptop common | 1280×800, 1366×768 | Laptop (short height) |
| Laptop / desktop | 1440×900 | Laptop |
| Full HD | 1920×1080 | Desktop |
| QHD / TV | 2560×1440 | Large / TV |

**Breakpoint map in repo today**

| Source | Values |
|--------|--------|
| Sass [`_breakpoints.scss`](src/styles/abstracts/_breakpoints.scss) | xs 380 · sm 768 · md 1024 · lg 1280 · xl 1440 |
| Tailwind defaults (utilities in TSX) | sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 |

**Risk:** Sass and Tailwind do not agree. FR cards use Tailwind `lg:` (=1024), not Sass `lg` (=1280). Fix plan must pick one story and stick to it.

---

## 2. Executive verdict

| Area | Mobile | Tablet | Laptop | TV / 2560 |
|------|--------|--------|--------|-----------|
| Document horizontal scroll | Pass (overflow-x ≈ 0) | Pass | Pass | Pass |
| **FR pillar collage** | Partial — works but cramped | Weak — tall column, fold issues | **Break risk** — fixed 560px card + short viewport | OK visually, content capped at 1380 |
| FAQ footer line | **Fail** — text overflows | Borderline | Pass | Pass |
| Chat widget (closed) | False-positive offscreen DOM | Same | Same | Same |
| Cinematic hero | Mostly OK | OK | OK | OK (does not fluid-scale) |

**Nothing is “completely fine” on all devices.** Highest-impact breaks: **FR sticky cards + collage height chain**, **FAQ nowrap line on mobile**, **tablet 768–1023 single-column sticky stack**.

---

## 3. Findings by severity

### P0 — Must fix first (FR + clear overflow)

#### P0.1 FR pillar: fixed desktop card height + `overflow: hidden`

**Where:** [`SolutionsOverviewSection.tsx`](src/components/sections/solutions/SolutionsOverviewSection.tsx)  
**Classes:** sticky `h-dvh` / `lg:h-screen` wrapper; card `lg:h-[560px] lg:max-h-[560px] xl:h-[580px]` + `overflow-hidden`.

**Observed**

- At **1366×768** (very common laptop), card is locked to **580px** while chrome + nav eat vertical space.
- Longer titles (cards 2–3) consume more vertical room in the text column; collage uses `lg:h-full` inside a flex row — height chain is fragile; automated passes sometimes measured **collage height 0** when sticky cards were mid-stack.
- `overflow-hidden` clips anything that exceeds the fixed box (no graceful grow).

**Impact:** Collage/CTA/copy can feel cut off or empty on short laptops; stacking scroll feels broken.

#### P0.2 FR collage: absolute float layout not viewport-aware

**Where:** [`WealthCollageVisual.tsx`](src/components/sections/solutions/WealthCollageVisual.tsx)  
**Pattern:** Absolute `%` positions for net-worth / returns / advisor; mobile collage box fixed `h-[220px]` / `sm:h-[280px]`.

**Observed**

- Mobile: collage **220×~294** — floats stack tightly; advisor + chat pill can crowd.
- Tablet column: collage **280** tall under long copy → card height **~900–1100px** inside sticky `h-dvh` → user must scroll inside a sticky scene (confusing).

#### P0.3 FAQ consultation line overflows mobile

**Where:** [`FAQSection.tsx`](src/components/sections/faq/FAQSection.tsx) (~L287–291)

```tsx
style={{ whiteSpace: 'nowrap' }}
className="... whitespace-nowrap ... max-w-none"
```

**Observed:** On **375px**, element width **~515px**, `left: -77` → horizontal bleed (page scrollWidth may still clip via `overflow-x: hidden`, but content is cut off / ugly).

---

### P1 — High (tablet / shell / consistency)

#### P1.1 Tablet gap (768–1023)

- Still `flex-direction: column` (Tailwind `lg` starts at 1024).
- Sticky full-viewport white cards + tall content = poor FR experience on iPad portrait.
- Need either earlier 2-column (`md:`) or non-sticky simplified layout below `lg`.

#### P1.2 Sticky stack on mobile

- Each card is `sticky` + `h-dvh` + `h-full` white panel.
- Works for the scroll story, but leaves little margin; collage pinned to bottom with fixed height can push description into a tight middle band.

#### P1.3 Sass vs Tailwind breakpoint mismatch

- Stage B Sass map unused by most TSX utilities.
- Future Sass responsive modules will disagree with `sm/md/lg` in components unless aligned.

#### P1.4 Chat / floating widgets

- Closed chat panel nodes sit off-canvas (expected). Exclude from overflow “bugs,” but ensure open state fits `100dvw` / safe-area on mobile.

---

### P2 — Polish (large screens & secondary routes)

#### P2.1 TV / 2560

- FR card `max-w-[1380px]` stays centered; large empty margins.
- Optional: slightly larger type/padding via Sass `xl` / `2xl` fluid scales — not a break.

#### P2.2 Other routes (not fully matrix-tested this pass)

From inventory / code patterns (follow-up test pass):

| Suspect | Why |
|---------|-----|
| Navbar mega menu `min-w-[40rem]` | Desktop only, but verify near 1280 |
| Team / Insights `--container-max` overrides | `100vw - 12rem/15rem` can feel tight at 1280 |
| Offices / MagicBento / App showcase | Absolute/marquee patterns |
| Calculators light cards | Dense forms on 375 |
| Solution dedicated timelines | Absolute spine at `left-3` |

---

## 4. What already looks healthy

- No systemic **document-level** horizontal scrollbar across the matrix (body `overflow-x` containment works).
- FR **column → row** switch at Tailwind `lg` (1024) is correct in principle.
- Credentials block already removed; titles use simple `font-sans`.
- Brand collage content (green / returns / advisor) renders when height chain is intact.
- Cinematic home hero centering + metrics generally OK on phone and desktop.

---

## 5. Fix plan (phased — Sass first)

### Phase A — FR pillar (do first)

**Goal:** Pillar cards readable and collage always non-zero height from 375 → 2560, including **1366×768**.

1. **Replace fixed desktop heights with fluid rules** (prefer Sass partial e.g. `src/styles/components/_solutions-overview.scss`):
   - Mobile/tablet: auto height card (min-height, not forced `h-full` of `100dvh` if content needs more — or drop sticky below `md`).
   - Desktop: `min-height` + `max-height: min(580px, calc(100svh - 6rem))` instead of hard `560px` only.
   - Remove reliance on brittle `lg:h-full` for collage; use `aspect-ratio` or `minmax` grid.

2. **Layout model**
   - Prefer CSS Grid for the card interior:  
     `grid-template-columns: 1fr; grid-template-rows: auto minmax(200px, 1fr)` → at `md`/`lg`: `1fr 1.1fr`.
   - Collage always in a grid area with explicit `minmax(200px, 1fr)`.

3. **Sticky behavior**
   - Keep scroll-stack on `lg+` only.
   - Below `lg`: static stack (no sticky / no scale) — fewer mobile FR bugs.

4. **WealthCollageVisual**
   - Add Sass modifiers: `.oc-wealth-collage` + `--oc-collage-pad` / scale floats with container queries (`@container`) if supported; else Sass breakpoints.
   - On short collage heights, shrink type and avatar via container queries or `.oc-wealth-collage--compact`.

5. **Acceptance (FR)**
   - 375 / 430 / 768 / 1024 / 1366×768 / 1440 / 1920 / 2560: collage **height ≥ 180px**, net-worth + returns + advisor visible, no clipped CTA, no horizontal page scroll.

### Phase B — Known overflow (FAQ + shared text)

1. FAQ line: remove `nowrap` / inline `whiteSpace`; allow wrap; optional `text-balance`; max-width `min(36rem, 100%)`.
2. Grep audit for other `whitespace-nowrap` + long marketing lines; fix same way.
3. Acceptance: 375 — no element with `getBoundingClientRect().width > clientWidth + 8` except intentional marquees inside overflow-hidden parents.

### Phase C — Breakpoint alignment (Sass)

1. Document canonical breakpoints in `_breakpoints.scss` and mirror into Tailwind `@theme` screens in `theme-bridge.css` (or CSS `@custom-media`).
2. Prefer Sass `bp-up('md')` in new component SCSS; reduce one-off Tailwind breakpoint soup in FR section.
3. Decide: **md = 768 tablet**, **lg = 1024 card row**, **xl = 1280 shell** — update Sass map to match Tailwind *or* configure Tailwind screens to match Sass (pick one; recommend **align Sass → Tailwind defaults** for less TSX churn).

### Phase D — Shell & secondary routes (after A–C)

1. Navbar / mega menu at 1280.
2. Team / Insights container overrides.
3. App showcase, offices, calculators, solution timelines — same Playwright matrix.
4. Safe-area for fixed chat + app QR on notched phones.

### Phase E — Regression harness

1. Small Playwright script (or Reticle flows if instrumented) that fails if:
   - `documentElement.scrollWidth > clientWidth + 2`
   - FR collage height `< 180` when card in view
2. Run on PR / before ship.

---

## 6. Implementation order (when approved)

```text
1. Phase A — FR SolutionsOverview + WealthCollage (Sass component partial + TSX class hooks)
2. Phase B — FAQ nowrap + nowrap sweep
3. Phase C — Breakpoint SoT alignment
4. Phase D — Secondary routes matrix + fixes
5. Phase E — Automated checks
```

**Out of scope until approved:** redesign of collage art direction, Lenis behavior changes beyond what’s needed for FR sticky, full Stage C base/shell migration.

---

## 7. File touch list (expected)

| File | Role |
|------|------|
| `src/styles/components/_solutions-overview.scss` (new) | FR card / sticky / grid responsive rules |
| `src/styles/components/_wealth-collage.scss` (new) | Collage compact/float scaling |
| `src/styles/main.scss` / `base` or components index | `@use` new partials |
| `SolutionsOverviewSection.tsx` | Swap utility soup for BEM/Sass hooks; sticky only `lg+` |
| `WealthCollageVisual.tsx` | Root class `oc-wealth-collage`; fewer absolute % hacks |
| `FAQSection.tsx` | Remove nowrap overflow |
| `theme-bridge.css` / `_breakpoints.scss` | Phase C alignment |
| Optional: `scripts/responsive-audit.mjs` | Phase E |

Plain CSS: only if a single-line override in `index.css` is cheaper than a partial — prefer Sass.

---

## 8. Sign-off checklist (after implementation)

- [x] Mobile 375 — FR collage ≥180; FAQ wraps; no H-scroll; sticky=relative  
- [x] Tablet 768 — static stack; collage OK; CTA in card  
- [x] Laptop 1366×768 — sticky; collage ~481px; CTA in card  
- [x] Desktop 1920 — FR row + sticky OK  
- [x] `npm run lint` + `npm run build` OK  
- [x] Script: `npm run audit:responsive` (needs Playwright + `npm run dev`)

### Shipped files (A–E)

- `src/styles/components/_solutions-overview.scss`
- `src/styles/components/_wealth-collage.scss`
- `src/styles/components/_shell-responsive.scss`
- `src/styles/abstracts/_breakpoints.scss` (Tailwind-aligned)
- `src/styles/theme-bridge.css` (`--breakpoint-*`)
- `SolutionsOverviewSection.tsx` / `WealthCollageVisual.tsx`
- `FAQSection.tsx`, `IndiaDotMap.tsx`, `OfficesPresenceSection.tsx`
- `scripts/responsive-audit.mjs`
