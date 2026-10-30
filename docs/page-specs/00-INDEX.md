# Page Specifications Index

**Source of truth: code.** Regenerate these specs when page/section source changes.

Clone the site from these files + the live components under `src/`. Specs encode layout structure, Tailwind→px, breakpoints, motion, and data sources — not a second design system.

**Related design docs (not clone specs):**

- [`../UI-UX-AUDIT.md`](../UI-UX-AUDIT.md) — ET Money + competitor audit  
- [`../design-system.md`](../design-system.md) — One Capital tokens & checklist (dark-first)

---

## Clone-Spec Format

Each page spec documents:

| Field | Meaning |
|---|---|
| Route | Exact path from `src/App.tsx` |
| Component path | Page + section source files |
| Section order | Visual top→bottom as rendered |
| DOM / classes | Hierarchy with exact class names |
| Layout | Flex/grid |
| Typography | Size / weight / tracking (classes + px) |
| Spacing | Margin / padding / gap (classes + px) |
| Colors | Hex, rgba, tokens, utilities |
| Breakpoints | Responsive shifts |
| Motion | GSAP / ScrollFade / RevealOnScroll |
| Data sources | Copy / config origins |
| Clone checklist | Reproduction steps |

---

## Tailwind → px

`1` unit = `0.25rem` = **4px** (base 16px):

| Unit | px | Unit | px |
|------|-----|------|-----|
| 1 | 4 | 8 | 32 |
| 2 | 8 | 10 | 40 |
| 3 | 12 | 12 | 48 |
| 4 | 16 | 16 | 64 |
| 5 | 20 | 20 | 80 |
| 6 | 24 | 24 | 96 |

Arbitrary values: `text-[2.65rem]` = **42.4px**, `h-[560px]` = **560px**, etc.

---

## Breakpoint Map

### Tailwind (utilities in TSX)

| Token | Min width |
|-------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### Sass (`src/styles/abstracts/_breakpoints.scss`)

| Token | Min width |
|-------|-----------|
| xs | 380px |
| sm | 768px |
| md | 1024px |
| lg | 1280px |
| xl | 1440px |

**Risk:** Sass `lg` ≠ Tailwind `lg`. Prefer the system used in the component under clone.

---

## z-index Scale

| Token | Value |
|-------|-------|
| `--z-base` | 1 |
| `--z-elevated` | 10 |
| `--z-overlay` | 100 |
| `--z-nav` | 1000 |
| `--z-modal` | 2000 |
| `--z-toast` | 3000 |
| `--z-preloader` | 9999 |

---

## Spec Files

| # | File | Covers |
|---|------|--------|
| 00 | [00-shell.md](./00-shell.md) | Layout, Navbar, Footer, Preloader, Chat, App download FAB, RiskFactorsStrip |
| 01 | [01-home.md](./01-home.md) | `/` |
| 02 | [02-about.md](./02-about.md) | `/about` |
| 03 | [03-solutions-hub.md](./03-solutions-hub.md) | `/solutions` |
| 04 | [04-approach.md](./04-approach.md) | `/approach` |
| 05 | [05-team.md](./05-team.md) | `/team` |
| 06 | [06-insights.md](./06-insights.md) | `/insights` |
| 07 | [07-blog.md](./07-blog.md) | `/blog`, `/blog/:slug` |
| 08 | [08-newsletter.md](./08-newsletter.md) | `/newsletter` |
| 09 | [09-contact.md](./09-contact.md) | `/contact` |
| 10 | [10-solution-dedicated.md](./10-solution-dedicated.md) | capital-strategy, portfolio-management, wealth-management |
| 11 | [11-mutual-funds.md](./11-mutual-funds.md) | `/solutions/mutual-funds` |
| 12 | [12-pms-aif.md](./12-pms-aif.md) | `/solutions/pms-aif` |
| 13 | [13-product-offer.md](./13-product-offer.md) | equity, baskets, strategies, advisory |
| 14 | [14-calculators.md](./14-calculators.md) | `/calculators` + all tool pages |
| 15 | [15-design-system.md](./15-design-system.md) | `/design-system` |
| 16 | [16-not-found.md](./16-not-found.md) | `*` 404 |

---

## Route → Spec Map (`src/App.tsx`)

| Route | Page | Spec |
|-------|------|------|
| `/` | `Home.tsx` | [01-home.md](./01-home.md) |
| `/about` | `About.tsx` | [02-about.md](./02-about.md) |
| `/solutions` | `Solutions.tsx` | [03-solutions-hub.md](./03-solutions-hub.md) |
| `/solutions/capital-strategy` | `CapitalStrategyPage.tsx` | [10-solution-dedicated.md](./10-solution-dedicated.md) |
| `/solutions/portfolio-management` | `PortfolioManagementPage.tsx` | [10-solution-dedicated.md](./10-solution-dedicated.md) |
| `/solutions/wealth-management` | `RiskWealthArchitecturePage.tsx` | [10-solution-dedicated.md](./10-solution-dedicated.md) |
| `/solutions/mutual-funds` | `MutualFundsPage.tsx` | [11-mutual-funds.md](./11-mutual-funds.md) |
| `/solutions/pms-aif` | `PmsAifPage.tsx` | [12-pms-aif.md](./12-pms-aif.md) |
| `/solutions/equity` | `ProductPage` `equity` | [13-product-offer.md](./13-product-offer.md) |
| `/solutions/equity-baskets` | `ProductPage` `equity-baskets` | [13-product-offer.md](./13-product-offer.md) |
| `/solutions/options-baskets` | `ProductPage` `options-baskets` | [13-product-offer.md](./13-product-offer.md) |
| `/solutions/passive-income-strategy` | `ProductPage` | [13-product-offer.md](./13-product-offer.md) |
| `/solutions/nifty-50-hedging` | `ProductPage` | [13-product-offer.md](./13-product-offer.md) |
| `/solutions/investment-advisory` | `ProductPage` | [13-product-offer.md](./13-product-offer.md) |
| `/approach` | `Approach.tsx` | [04-approach.md](./04-approach.md) |
| `/team` | `Team.tsx` | [05-team.md](./05-team.md) |
| `/insights` | `Insights.tsx` | [06-insights.md](./06-insights.md) |
| `/blog` | `Blog.tsx` | [07-blog.md](./07-blog.md) |
| `/blog/:slug` | `BlogPost.tsx` | [07-blog.md](./07-blog.md) |
| `/newsletter` | `Newsletter.tsx` | [08-newsletter.md](./08-newsletter.md) |
| `/calculators` | `Calculators.tsx` | [14-calculators.md](./14-calculators.md) |
| `/calculators/sip` | `SipCalculatorPage.tsx` | [14-calculators.md](./14-calculators.md) |
| `/calculators/lumpsum` | `LumpsumCalculatorPage.tsx` | [14-calculators.md](./14-calculators.md) |
| `/calculators/step-up-sip` | `StepUpSipCalculatorPage.tsx` | [14-calculators.md](./14-calculators.md) |
| `/calculators/swp` | `SwpCalculatorPage.tsx` | [14-calculators.md](./14-calculators.md) |
| `/calculators/goal-planning` | `GoalPlanningCalculatorPage.tsx` | [14-calculators.md](./14-calculators.md) |
| `/contact` | `Contact.tsx` | [09-contact.md](./09-contact.md) |
| `/design-system` | `DesignSystem.tsx` | [15-design-system.md](./15-design-system.md) |
| `*` | `NotFound.tsx` | [16-not-found.md](./16-not-found.md) |

### Redirect-only (no unique page spec)

| From | To |
|------|-----|
| `/solutions/risk-wealth-architecture` | `/solutions/wealth-management` |
| `/solutions/intelligence-oversight` | `/solutions/investment-advisory` |
| `/mutual-funds` | `/solutions/mutual-funds` |
| `/solutions/pms`, `/solutions/aif` | `/solutions/pms-aif` |
| `/solutions/equity-broking`, `/solutions/retail-broking` | `/solutions` |
| `/insights/blog` | `/blog` |

---

## Related project docs (not clone specs)

| File | Role |
|------|------|
| `SCSS_ROUTE_INVENTORY.md` | Styling migration ownership by route |
| `SCSS_COMPONENT_INVENTORY.md` | Component style sources |
| `SCSS_ARCHITECTURE_AUDIT.md` | SCSS architecture |
| `SCSS_MIGRATION_PLAN.md` | Migration stages |
| `RESPONSIVENESS_AUDIT_PLAN.md` | Viewport audit / FR fixes |
| `src/ARCHITECTURE.md` | App architecture |

---

## How to clone a page

1. Open the page’s spec + [00-shell.md](./00-shell.md).
2. Recreate section order exactly.
3. Port class names / spacing / type scales from the tables.
4. Wire data files listed under Data sources.
5. Match motion only after layout is solid (GSAP last).
6. Diff against live route in browser at 375 / 768 / 1280 / 1440.
