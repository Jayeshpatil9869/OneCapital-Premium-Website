# One Capital — UI/UX Competitive Audit

**Inspired by:** ET Money (primary) + Dezerv, MProfit, PMS Bazaar, Wealth4U / Midas  
**Date:** 30 Oct 2026  
**Scope:** Competitive research only. Implementation mapping → [`design-system.md`](./design-system.md).  
**Brand note:** This product is **One Capital** (premium dark-first). Principles from ET Money; not a pixel clone and not a white retail retheme.

---

## Executive Summary

ET Money wins on **clarity and trust**, not flash: white canvas, breathing space, one dominant action green, content-first sections. Each block has a job: prove credibility → show breadth → show how to start → social proof.

For One Capital, copy **principles**, not pixels:

| Principle | Keep | Do not copy |
| --- | --- | --- |
| Restraint | 1 primary action color + semantics + neutrals | Rainbow accents, purple SaaS defaults |
| Type | Geometric/humanist sans for UI; calm hierarchy | Inter-as-default if brand already has a stack |
| Space | Clear section jobs, generous vertical rhythm | Dense marketplace clutter |
| Trust | SEBI / process / proof strips | Fake stats, cloned ET Money copy/art |

Dezerv / MProfit / PMS Bazaar / Wealth4U inform **HNI positioning**, reporting language, and what to avoid (noise, competing CTAs, dated RIA layouts).

**Canonical product direction (locked):** dark canvas (`#000`), brand green `#168653`, gold accent `#c9a86a`, scoped light sections via `.light-section`. See `src/styles/tokens/_colors.scss`.

---

## 1. ET Money — Deep Dive (Primary Reference)

**URL:** https://www.etmoney.com/

### 1.1 Color

- Token-driven: `--primary-green` ≈ `#00D09C` / `#02B589` for CTAs, links, hollow borders.
- Ink headings (`--black90`), body `#666`, pure white canvas, alternate `#F7F8FA`.
- Usage ~90% white / 6% ink / 4% green.
- Patterns: solid green CTA; hollow pill secondary; text+CSS-arrow tertiary.

**A11y note:** `#00D09C` on white fails AA for small text — use darker green for text links; bright green only on filled buttons with white type.

### 1.2 Typography

- Proxima Nova (regular / semibold / bold).
- Rough scale: H1 ~42–48 / 52; H2 ~32–36 / 40; H3 ~22–24; body 15–16 / 24; meta 14 / 20.
- High line-height (~1.5) for FAQs and long copy.

### 1.3 Layout & flow

- Container ~1140–1280px; section py ~80px desktop / ~48px mobile; hero taller.
- Homepage jobs: nav → trust strip → hero → product grid → how-it-works steps → learn → testimonials → FAQ → footer.
- Gaps: cards 24–32px; title→body 16px; body→CTA 24px.

### 1.4 Components

- Buttons: solid (small radius), hollow pill (`radius30`), text+arrow.
- Cards: white, 12–16px radius, 1px light border, soft shadow, 24px pad.
- Icons: thin line, ~32px; numbered step circles.
- Motion: subtle fade-up ~200ms; no parallax theater.

### 1.5 UX writing

- Second person, low jargon, repeated low-friction CTA, trust (SEBI, ratings, paperless).

---

## 2. Dezerv.in

**URL:** https://www.dezerv.in/ — HNI / PMS, premium.

- Dark navy hero + gold CTA; Inter + Poppins; large display type.
- Storytelling + **VS traditional** split; heavy team / founder social proof; large section padding.
- **Borrow:** VS pattern, team credibility, dark flagship blocks for PMS/AIF.  
- **Avoid:** Making the whole retail surface dark-only without clear jobs (One Capital already owns dark — use it with ET Money clarity).

---

## 3. MProfit.in

**URL:** https://mprofit.in/ — portfolio reporting SaaS / family office.

- Orange primary, white UI, screenshot-led features, big stat strips.
- **Borrow:** metric blocks, “unbiased lens” / reporting language, real product shots.  
- **Avoid:** orange retail CTA language on One Capital brand.

---

## 4. PMSBazaar.com

**URL:** https://pmsbazaar.com/ — PMS/AIF marketplace.

- Navy header, dense grids, performance tabs, logo walls.
- **Borrow:** comparison tables (cleaned).  
- **Avoid:** competing CTAs, logo clutter, weak hierarchy.

---

## 5. Wealth4U.in / Midas Wealth

**URL:** https://wealth4u.in/ — local RIA, legacy trust.

- Gold + navy, founder quote, long history.
- **Borrow:** About-page legacy / personal trust.  
- **Avoid:** dated full-bleed overlay hero patterns without modern spacing.

---

## 6. Comparative Matrix

| Parameter | ET Money | Dezerv | MProfit | PMS Bazaar | Wealth4U |
| --- | --- | --- | --- | --- | --- |
| Primary | Green `#00D09C` | Navy + gold | Orange | Navy + blue | Gold + navy |
| Font | Proxima Nova | Inter + Poppins | Inter / Open Sans | Inter / Poppins | Traditional sans |
| Heading | 32–42 semi | 44–56 bold | 28–32 bold | 24–28 bold | ~24 |
| Body | 15–16 / 24 | 16 Inter | ~15 | ~14 | ~14 |
| Radius | 5px + 30px pill | 12–16 cards | 6–8 | ~8 | ~4 |
| Layout | Clear section jobs | Full-bleed alt | Image/text alt | Dense grid | Single col |
| Best for | Retail onboarding | HNI conversion | FO reporting | Discovery | Local RIA |

---

## 7. Borrow Mix for One Capital

| Source | Weight | Take |
| --- | --- | --- |
| ET Money | ~70% | Restraint, section jobs, FAQ focus, trust strip, CTA clarity |
| Dezerv | ~20% | VS comparison, team proof, premium PMS moments |
| MProfit | ~5% | Stats presentation, screenshots |
| PMS Bazaar | ~3% | Data tables — simplified |
| Wealth4U | ~2% | Legacy / local trust on About |

---

## 8. Explicit non-goals

- Do **not** replace One Capital dark canvas with ET Money white global theme.
- Do **not** adopt `#00D09C` as brand primary (conflicts with `#168653` + gold system; weak text contrast).
- Do **not** copy ET Money / Dezerv logos, illustrations, or verbatim marketing copy.
- Do **not** ship Inter/Roboto/Arial as a “reset” if the shipped stack already defines brand voice.

---

## Related

- Adapted tokens, components, checklist → [`design-system.md`](./design-system.md)
- Route clone specs → [`page-specs/00-INDEX.md`](./page-specs/00-INDEX.md)
- Live tokens → `src/styles/tokens/_colors.scss`, `src/styles/theme-bridge.css`
