# One Capital — Design System (ET Money Principles, Dark-First)

**Date:** 30 Oct 2026  
**Companion:** [`UI-UX-AUDIT.md`](./UI-UX-AUDIT.md)  
**Stack truth:** Sass tokens (`src/styles/tokens/`) + Tailwind v4 `@theme` bridge + existing React/GSAP components.  
**Rule:** Copy ET Money **clarity**; keep One Capital **premium dark identity**.

---

## 1. Philosophy

Calm, confident, restrained wealth UI.

- Every section has **one job** (credibility → product → how to start → proof).
- One primary action color + semantics + neutrals — no rainbow.
- Dark canvas by default; **scoped light islands** for dense content (`.light-section`).
- Motion supports hierarchy (GSAP); no decorative noise.

**Not:** white retail clone of ET Money. **Not:** generic purple SaaS.

---

## 2. Color tokens (shipped — do not re-mint)

Canonical runtime: `--oc-color-*` from `src/styles/tokens/_colors.scss` via `_themes.scss`. Legacy `--color-*` aliases remain; accent aliases → gold.

### 2.1 Dark foundation

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `--oc-color-canvas` | `#000000` |
| Surface | `--oc-color-surface` | `#1d1d1d` |
| Elevated | `--oc-color-surface-elevated` | `#262626` |
| Text | `--oc-color-text-main` | `#ffffff` |
| Secondary | `--oc-color-text-secondary` | `#b3b3b3` |
| Muted | `--oc-color-text-muted` | `#858585` |
| Border | `--oc-color-border` | `rgba(255,255,255,0.1)` |

### 2.2 Brand & finance

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Brand green | `--oc-color-brand` | `#168653` | Primary filled CTAs, positive |
| Brand hover / active | `--oc-color-brand-hover` / `active` | `#117448` / `#0d603b` | States |
| Brand soft | `--oc-color-brand-soft` | `#eaf5ee` | Light-section chips only |
| Gold | `--oc-color-gold` | `#c9a86a` | Premium accent (legacy accent) |
| Negative | `--oc-color-negative` | `#d64545` | Loss / error |
| Link | `--oc-color-link` | `#1677c8` | Inline links (AA-safer than mint on white) |

### 2.3 Light section scope (ET Money “white card” moments)

`$oc-light-colors` / `.light-section`: canvas `#f6f7f8`, surface `#fff`, ink `#171717`. Use for FAQ blocks, tables, product comparison — not whole-site flip.

### 2.4 ET Money mapping (reference only)

| ET Money | One Capital |
| --- | --- |
| `--primary-green` `#00D09C` | `--oc-color-brand` `#168653` (CTA fill) |
| White canvas | Dark canvas + `.light-section` islands |
| Hollow green pill | Outline / secondary button on brand or gold |
| `#666` body | `--oc-color-text-secondary` / muted (dark) or light-section text |

**Rejected:** global `#00D09C` primary (contrast + brand collision).

---

## 3. Typography

Prefer the **shipped site fonts** (do not silently switch to Inter). ET Money Proxima Nova lessons:

| Step | Role | Guidance |
| --- | --- | --- |
| Display | Hero brand / one line | Expressive; brand name stays hero-level |
| H1 | Page title | ~40–48px, semibold, slight negative tracking |
| H2 | Section | ~32–36px |
| H3 | Card / component | ~18–24px |
| Body | Default | 15–16px / ~24px line-height |
| Meta | Captions | 12–14px |

Humanist geometric sans for UI; avoid Inter/Roboto/Arial resets unless product brief pins them.

---

## 4. Spacing & grid

| Token idea | Desktop | Mobile |
| --- | --- | --- |
| Container | max ~1240–1280px | full + `--page-gutter` |
| Section py | ~80–96px | ~48–56px |
| Card pad | 24px (32px premium) | 20–24px |
| Card / grid gap | 24–32px | 16–24px |
| Title → body | 12–16px | same |
| Body → CTA | 24px | 20px |

Align Sass breakpoints with Tailwind screens (`src/styles/abstracts/_breakpoints.scss`).

---

## 5. Radius & elevation

| Use | Token / target |
| --- | --- |
| Dense control | ~5–8px (`--radius-sm` / md) |
| Cards | 12–16px |
| Pill secondary | ~30px (ET Money hollow) — use sparingly on dark |
| Shadows | Soft only; prefer border + surface lift on dark |

See `src/styles/tokens/_radius.scss`.

---

## 6. Components (map to existing UI)

Build on `src/components/ui` — do not invent a parallel button library.

| Pattern (ET Money) | One Capital |
| --- | --- |
| Solid green CTA | `Button` primary / brand fill |
| Hollow pill | Outline / secondary; brand or white stroke on dark |
| Text + arrow | Ghost / text button + existing arrow props |
| Card | Surface elevated + border; light-section cards when content-heavy |
| FAQ accordion | Existing FAQ; focus → brand/link, not mint-on-white |
| Trust strip | Compact SEBI / process line under nav or above hero |
| Stat block | Metric strip (MProfit-style numbers, OC type) |
| VS comparison | Dezerv-style; light or dual-column on dark |

**Icons:** Lucide (already), ~1.5 stroke feel, muted default, brand/gold active.

---

## 7. Page templates (structure, not redesign)

### 7.1 Homepage section jobs

1. Nav — logo, products, Login + primary CTA  
2. Trust strip — SEBI / secure / experience (low emphasis)  
3. Hero — one H1, one support line, ≤2 CTAs, one visual  
4. Product / solutions grid — icon, 18px title, 14px desc, text CTA  
5. How it works — 4–5 numbered steps  
6. Differentiation — optional VS (Traditional vs One Capital)  
7. Proof — stats + testimonials  
8. FAQ  
9. Footer + disclaimer  

Honor existing home composition and dark hero; tighten jobs where sections compete.

### 7.2 Product / PMS pages

Breadcrumb → hero + key stats → why → steps → FAQ. Tables: PMS Bazaar richness, ET Money spacing.

### 7.3 About

Wealth4U legacy trust + Dezerv team proof; modern spacing.

---

## 8. Accessibility & motion

- Brand green on dark for fills; text links use `--oc-color-link` or brand-hover — not mint on white.
- Body line-height ≥ 1.5 for long copy.
- Focus rings: existing focus tokens; visible on dark and light sections.
- Motion: GSAP; respect `prefers-reduced-motion` (see Preloader / motion helpers).
- `font-display: swap` on webfonts.

---

## 9. Implementation checklist

Phased against current repo. Check items as done; do not open a parallel token file.

### A — Foundations (mostly done)

- [x] Dark-first `--oc-color-*` + light-section map  
- [x] Theme bridge for Tailwind utilities  
- [x] Brand green + gold + financial semantics  
- [ ] Document focus / link states on `/design-system` page  
- [x] Audit CTA contrast (brand fill + white label) — primary/glow → `--oc-color-brand`

### B — Components

- [x] Button matrix: solid brand primary/glow; chrome outline; text → brand  
- [ ] Card variants: dark surface vs `.light-section`  
- [x] FAQ focus color → brand ring + open chevron brand  
- [ ] Trust strip primitive (reusable)  
- [ ] Stat / metric block consistency  

### C — Homepage / templates

- [ ] Section-job audit vs §7.1 (merge or cut competing blocks)  
- [ ] Product grid: one CTA style per card  
- [ ] Optional VS block (Dezerv pattern, OC voice)  
- [ ] Steps: numbered circles using brand — not decorative pills cluster  

### D — Content & SEO

- [ ] Own voice: open, transparent, capital growth — no ET Money clone copy  
- [ ] FAQ JSON-LD where page qualifies (`seo_guidance` / next-seo skill if App Router pages added)  
- [ ] People-first product copy; no fabricated AUM/ratings  

### E — Do not

- [ ] Global white theme  
- [ ] `#00D09C` as primary  
- [ ] New font stack without brand decision  
- [ ] Second button/card system beside `src/components/ui`  

---

## 10. Optional follow-ups (ask before building)

1. Tailwind `@theme` sync pass only for any missing semantic utilities  
2. Figma token export from shipped CSS (not from ET Money hexes)  
3. Homepage section-job refactor against §7.1  
4. Trust strip + VS comparison components  

---

## Related code

| Path | Role |
| --- | --- |
| `src/styles/tokens/_colors.scss` | Color SoT |
| `src/styles/theme-bridge.css` | Tailwind bridge |
| `src/styles/base/_semantic-colors.scss` | `.oc-text` / light helpers |
| `src/components/ui` | Buttons / primitives |
| `docs/page-specs/15-design-system.md` | `/design-system` lab page map |
| `docs/page-specs/01-home.md` | Home structure |
