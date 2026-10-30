# OneCapital Premium Website — Component Inventory (Styling)

**Scope:** Reusable UI + shell + major section systems. Classification is for SCSS migration ownership, not a full React tree dump.

---

## Styling source keys

| Code | Meaning |
|---|---|
| TW | Tailwind utility classes in TSX |
| TOK | Design tokens / CSS vars (`tokens.css`, `@theme`) |
| CSS | Global plain CSS (`index.css`, `effects.css`, `motion.css`, …) |
| LOC | Component-local CSS file |
| INLINE | `style={{…}}` / GSAP-set styles |
| DATA | Colours from data/config (charts, maps) |

---

## 1. Application shell

| Component | Path | Variants / notes | Style sources | Migrate to |
|---|---|---|---|---|
| Layout / AppShell | `src/layouts/Layout.tsx` | Lenis on/off; `.is-home` / `.is-team` | TW, TOK, CSS (preloader lock) | `layout/_app-shell.scss` |
| Navbar | `src/components/Navbar.tsx` | Pill surface, mobile drawer, dropdowns, reveal | TW, CSS (`[data-nav-surface]`), INLINE (1) | `layout/_header.scss` + keep interaction JS |
| Footer | `src/components/Footer.tsx` | Multi-column links (**staged edits — preserve**) | TW, TOK | `layout/_footer.scss` (optional) |
| Preloader | `src/components/Preloader.tsx` | Full-screen brand intro | CSS (`motion.css` `.oc-preloader*`), INLINE | `effects` / `motion` modules |
| BrandLogo | `src/components/BrandLogo.tsx` | Logo mark | TW / SVG | Exception: asset colours |
| RiskFactorsStrip | `sections/legal/RiskFactorsStrip.tsx` | Legal band | TW | components or layout |
| SocialLinks | `SocialLinks.tsx` | Icon row | TW | utilities / components |

---

## 2. Shared UI kit (`src/components/ui`)

| Component | Path | Variants | Style sources | Issues |
|---|---|---|---|---|
| Button / ButtonFlair | `ui/buttons/Button.tsx` | primary, secondary, ghost, outline, magnetic, text, pill, glow; sizes sm/md/lg | TW, CSS (`.oc-btn-*` in motion/effects) | Glow uses arbitrary shadow; primary = white/black not brand green |
| Card | `ui/cards/Card.tsx` | default, glass, spotlight, feature, metric, bento | TW (`bg-[#1D1D1D]`), CSS glass | Hardcoded surface hex |
| Field / Input / Textarea / Select | `ui/form/Field.tsx` | dark default; light overrides via `.oc-calc-select-light` | TW, CSS | Select listbox z-index / colours duplicated |
| Typography | `ui/typography/Typography.tsx` | Eyebrow, Display, Section, Body, Label, Caption | TW clamps; Body uses `text-[#B3B3B3]` | Should use `text-text-secondary` |
| Layout primitives | `ui/primitives/Layout.tsx` | Container, Section (dark/light/panel), Stack, Surface, Divider | TOK + hardcoded panel `#1D1D1D` | Panel tone bypasses token |
| Accordion | `ui/overlays/Accordion.tsx` | Dark + light-section overrides | TW, CSS (`.oc-accordion`) | |
| text-shimmer | `ui/text-shimmer.tsx` | Animated gradient text | TW, INLINE | |

**Barrel:** `src/components/ui/index.ts`

---

## 3. Navigation / wayfinding (non-shell)

| Component | Path | Style notes |
|---|---|---|
| AboutStickyNav / AboutNavTabs | `sections/about/*` | High arbitrary hex (~8 in sticky nav); sticky behaviour |
| SolutionsBreadcrumb | `sections/solutions/shared/` | TW |
| SolutionsPillarsNav / SolutionsExploreStrip / SolutionRelatedNav | solutions sections | TW + solutions.css |
| InsightsBreadcrumb | insights | TW |
| CalculatorSideNav | calculators | TW |

---

## 4. Cards / surfaces / bento

| Component | Path | Variants | Notes |
|---|---|---|---|
| Card (kit) | above | glass default | Primary card system |
| Surface | Layout primitives | plain / glass / elevated | |
| MagicBento / BentoGrid / BentoItem | effects + `sections/bento` | Mobile silver-glass | `MagicBento.css` + `effects.css` `--oc-glass-gradient-mobile` |
| TiltCard | `effects/TiltCard.tsx` | 3D tilt | Multiple INLINE styles |
| AppDownloadCard / Panel / Widget | `AppDownload*` | Floating + section | Some hex |
| TeamCard | `sections/team/TeamCard.tsx` | raised / expanded | `team.css` shadows |

---

## 5. Forms & controls

| Component | Path | Notes |
|---|---|---|
| ContactFormPanel | contact | Uses Field kit |
| CalculatorSlider | calculators | Range thumbs via `.oc-calc-range*` |
| CalculatorModeToggle | calculators | Segmented control pattern |
| SelectField light overrides | `index.css` | Large hardcoded light theme block |

No separate modal/drawer/toast design-system primitives found beyond chat/widget overlays.

---

## 6. Charts & visualizations

| Component | Path | Style notes |
|---|---|---|
| GrowthChart | calculators | Hex in series/axes |
| AllocationDonut | calculators | Hex |
| AllocationChart / CapitalFlowDiagram / IntelligencePipeline / RiskArchitectureMap / SolutionVisualization | solutions/visualizations | INLINE + DATA colours |
| IndiaDotMap | offices | Hex + INLINE |
| MetricStrip | cta | TW |

**Migration rule:** Introduce semantic chart tokens (`--oc-chart-*`); keep data-driven assignment in JS.

---

## 7. Feedback / overlays / chat

| Component | Path | Notes |
|---|---|---|
| ChatWidget | `chat/ChatWidget.tsx` | Hex accents; fixed z via shell |
| Accordion / FAQSection | overlays + faq | |
| CustomCursor | motion | z-cursor token |
| Preloader | shell | |

No dedicated Skeleton / Pagination / Toast kit in this marketing app.

---

## 8. Motion & effects (presentation-critical)

| Component | Path | Style sources |
|---|---|---|
| RevealOnScroll, ScrollFade, TextReveal, Parallax, Magnetic, NavTextSlide, InfiniteMarquee, LightSweepText, ScrollColorText | `components/motion/*` | TW + CSS + GSAP |
| Atmosphere (Noise, GridBackground) | effects | CSS classes `.oc-noise`, `.oc-grid-bg` |
| Spotlight | effects | CSS `.oc-spotlight-surface` |
| sectionTheme `bindLightSectionBackground` | `animations/sectionTheme.ts` | Hardcoded `#ffffff` / `#000000` |

Preserve class contracts when tokenising colours.

---

## 9. Page section systems (by domain)

### About

`AboutHero`, `AboutStorySection`, `AboutMissionVision`, `AboutCoreValues`, `AboutOurEdge`, `AboutPressMedia`, `AboutPhilosophyStory`, `AboutResponsibleVision`, `AboutInstitutionalEngagement`, sticky/nav helpers — **hex clusters in story/mission/sticky**.

### Solutions

`SolutionsHero`, `SolutionsIntro`, `SolutionsCatalogue` (hex), `SolutionsOverviewSection`, `SolutionsTrustBand`, `ProductOfferPage` (hex), `SolutionDedicatedSections`, `SolutionPageHero`, `PmsAifComparisonSection`, `WealthManagementLayout`, `GoldAccentLine`.

### Team

`TeamHero`, `TeamSection`, `TeamGallerySection`, `TeamCarousel`, `TeamCard`, `DirectorAboutSection` + legacy `components/Team.tsx`.

### Insights / Blog

`InsightsMasthead`, `InsightsFeaturedNote`, `InsightsThemeIndex`, `InsightsBridgeStrip`, `BlogMasthead`, `BlogArchiveList`, `BlogArticle`, `BlogReadingPath`.

### Home / CTA / social proof

`HeroEditorial`, `AppShowcaseSection`, `TestimonialsSection`, `OfficesPresenceSection`, `FAQSection`, `CtaBand`, `EditorialStatementCTA`, `ContinuityScrollSection`.

### Contact

`ContactSurface`, `ContactFormPanel`, `ContactInfoPanel` (hex).

---

## 10. Calculators kit

| Component | Role |
|---|---|
| CalculatorShell | Page chrome / layout |
| CalculatorResults | KPI-like result readout |
| CalculatorSlider | Input control |
| CalculatorModeToggle | Mode switch |
| CalculatorSideNav | Tool nav |
| MutualFundCalculatorEmbed | Embedded on Mutual Funds page |
| GrowthChart / AllocationDonut | Visual results |

Styling split: TSX utilities + large `index.css` calculator blocks.

---

## 11. Variant summary — buttons & cards

### Button variants → token mapping (target)

| Variant | Current look | Target token intent |
|---|---|---|
| primary | White fill, black text | `--oc-color-action-primary` (today: inverse white) |
| secondary / glass | Glass panel | surface + border tokens |
| ghost / outline / text | Transparent | text emphasis tokens |
| pill | Glass pill | radius-pill + glass |
| glow | White + soft white glow | shadow-glow token |
| magnetic | Glass + flair | same as secondary + motion |

### Card variants → token mapping (target)

| Variant | Current | Target |
|---|---|---|
| default / glass / feature / bento / spotlight | `#1D1D1D` / glass-panel | `--oc-color-surface` + radius-xl + border |
| metric | transparent | no fill |

---

## 12. Components that should stay exceptions

| Item | Why |
|---|---|
| Brand SVG / favicon colours | Brand asset fidelity |
| Preloader glyph fills | Cinematic black stage |
| GSAP tween endpoints | Need CSS-var-aware tweens later; keep behaviour |
| Third-party Splide / Radix internals | Prefer wrapping tokens, not forking |
| Map/chart categorical palettes | Need named chart tokens, not one brand green |

---

## 13. Migration ownership map (Stage D)

1. **UI kit first** — Typography, Button, Card, Field, Layout primitives  
2. **Shell** — Layout, Navbar, Footer, Preloader CSS  
3. **Effects/motion CSS** — tokenise literals; keep selectors  
4. **Calculators chrome** — move `.oc-calc-*` into `components/_forms` / `_calculators`  
5. **Section systems** — About, Solutions, Team, Insights  
6. **Heavy pages** — PmsAif, MutualFunds  

Track completion in `SCSS_MIGRATION_REPORT.md` (Stage H deliverable; not created in Stage A).
