# Responsive QA — Issues + Fix Status

**Date:** 2026-10-31  
**Scope:** Mobile (iPhone 13), tablet (iPad Mini), desktop (1440×900)  
**Method:** Live crawl + post-fix Playwright probes against `http://localhost:3000`.  
**Rule:** Only findings with evidence. Disposable crawl PNGs/scripts removed after verification.

---

## Verification (post-fix) — 2026-10-31

| Issue | Fix | Post-fix result |
|-------|-----|------------------|
| **ISSUE-01** CONTENT_UNDER_NAV | `scroll-padding-top: 92px` + scrolled pill `bg-black/85` + calc `scroll-mt-28` | **PASS** — pill `oklab(0 0 0 / 0.85)`, opacity 1, scroll-pad 92px |
| **ISSUE-02** CALC_BLACK_SECTION_BAND | `CalculatorShell` `pad="none"` + `pb-6 md:pb-8` | **PASS** — `paddingBottom=24px`, card→copy gap ≈45px (was ~73px / pb 80px) |
| **ISSUE-03** CALC_BLACK_SCREEN_INTERMITTENT | `RevealOnScroll` `hasPlayed` latch; calc money cards `disabled` | **PASS** — stuck opacity samples = 0 on SIP/lumpsum scroll sweeps |

All probed routes previously returned **HTTP 200** on mobile, tablet, and desktop.

---

## Original findings (historical)

### P1 — Content scrolls under sticky nav — fixed

- **ISSUE-01 · CONTENT_UNDER_NAV**  
  - Where: `/calculators/sip`, `/calculators/lumpsum`, `/calculators`, `/about`  
  - Cause: Fixed `header[data-site-nav]` without enough scroll-padding; scrolled pill too translucent.  
  - Fix shipped in `src/index.css`, `src/components/Navbar.tsx`.

### P2 — Calculator black band — fixed

- **ISSUE-02 · CALC_BLACK_SECTION_BAND**  
  - Cause: `CalculatorShell` black `Section` used large bottom pad over `bg-black`.  
  - Fix shipped in `src/components/calculators/CalculatorShell.tsx`.

### P3 — Intermittent invisible upper layer — mitigated

- **ISSUE-03 · CALC_BLACK_SCREEN_INTERMITTENT**  
  - User: while scrolling, upper layer invisible / black screen.  
  - Hypothesis: `RevealOnScroll` could stay at opacity 0 if `animate` cleared.  
  - Fix: latch `hasPlayed`; disable reveal on calculator input/results cards.  
  - Automated retests: 0 stuck samples. Manual real-phone scroll still recommended once.

---

## Checked OK (do not invent bugs)

| Check | Result |
|-------|--------|
| HTTP status routes × viewports | 200 |
| Horizontal overflow | No material overflow in deep pass |
| Broken images | None in deep pass |
| Mobile menu open/close scroll restore | OK |
| Compact INR on calculators | Visible (₹25K / ₹58.08L / ₹30L) |
| Playwright “porthole” black outside content | Emulator chrome — not site CSS |

---

## Cleanup

Removed after verification (one-shot audit tooling):

- `All MD File/audits/qa-evidence/` (screenshots + crawl JSON)
- `All MD File/audits/qa-evidence-postfix/`
- `scripts/responsive-qa-*.mjs`

Kept: this status file + production source fixes.

---

## Remaining optional

- [ ] Manual confirm on real phone: `/calculators/sip` scroll top → bottom  

---

*Do not add issues without new live evidence.*
