# OneCapital Premium Website — Route Inventory (Styling)

**Source of truth:** `src/App.tsx`  
**Parent layout:** `src/layouts/Layout.tsx` (Navbar, `<Outlet />`, Footer, Preloader, ChatWidget, AppDownloadFloatingWidget, RiskFactorsStrip)  
**Shell classes:** `.oc-shell` + `.is-home` / `.is-team` (layout); `.is-insights` (Insights page wrapper)

---

## Legend

| Field | Meaning |
|---|---|
| Surface | Dominant visual mode |
| Style sources | CSS files / UI kit / page-local classes |
| Migration priority | P0 shell → P1 shared → P2 high-hex pages → P3 content |

---

## Primary routes

### `/` — Home

| | |
|---|---|
| Page | `src/pages/Home.tsx` |
| Sections | `HeroEditorial`, `AppShowcaseSection`, `SolutionsOverviewSection`, `TestimonialsSection`, `OfficesPresenceSection`, `FAQSection`, `ScrollFade` |
| Surface | Dark canvas; testimonials may toggle `.light-section` |
| Style sources | tokens, effects, motion, UI kit, section components, MagicBento/Atmosphere patterns |
| Responsive | Full-bleed hero; mobile glass card treatment; Lenis desktop-only |
| Notes | Shell gets `.is-home` → container width override ≥1280px |
| Priority | P0 (baseline visual) |

### `/about` — About

| | |
|---|---|
| Page | `src/pages/About.tsx` |
| Sections | `AboutHero`, `AboutStorySection`, `AboutMissionVision`, `AboutCoreValues` (+ unused/related sticky nav modules in tree) |
| Surface | Dark + selective light storytelling |
| Style sources | About section TSX (hardcoded hex clusters), tokens, ScrollFade |
| Related components | `AboutStickyNav`, `AboutNavTabs`, `AboutOurEdge`, `AboutPressMedia`, `AboutPhilosophyStory`, `AboutResponsibleVision`, `AboutInstitutionalEngagement` (present under `sections/about`) |
| Priority | P2 |

### `/solutions` — Solutions hub

| | |
|---|---|
| Page | `src/pages/Solutions.tsx` |
| Sections | Solutions hero/intro/catalogue/pillars/trust patterns via section components |
| Style sources | `solutions.css`, Solutions* components, tokens |
| Priority | P1 |

### `/solutions/capital-strategy`

| | |
|---|---|
| Page | `CapitalStrategyPage.tsx` → dedicated config |
| Pattern | Dedicated solution page (`SolutionDedicatedPage` / shared sections) |
| Priority | P2 |

### `/solutions/portfolio-management`

| | |
|---|---|
| Page | `PortfolioManagementPage.tsx` → `SolutionDedicatedPage` via `getDedicatedPageConfig` |
| Priority | P2 |

### `/solutions/wealth-management`

| | |
|---|---|
| Page | `RiskWealthArchitecturePage.tsx` |
| Alias | `/solutions/risk-wealth-architecture` → Navigate replace |
| Layout | `WealthManagementLayout` + risk viz |
| Priority | P2 |

### `/solutions/mutual-funds`

| | |
|---|---|
| Page | `MutualFundsPage.tsx` |
| Alias | `/mutual-funds` → Navigate |
| Style risk | **High hex / arbitrary density (~24 hex)**; embeds `MutualFundCalculatorEmbed` |
| Priority | **P2 / early Stage E** |

### `/solutions/pms-aif`

| | |
|---|---|
| Page | `PmsAifPage.tsx` |
| Aliases | `/solutions/pms`, `/solutions/aif` → Navigate |
| Style risk | **Highest hex density (~74)**; comparison section; product marketing layout |
| Priority | **P2 / first heavy page migration** |

### Product offer routes (shared `ProductPage`)

| Path | `productId` |
|---|---|
| `/solutions/equity` | `equity` |
| `/solutions/equity-baskets` | `equity-baskets` |
| `/solutions/options-baskets` | `options-baskets` |
| `/solutions/passive-income-strategy` | `passive-income-strategy` |
| `/solutions/nifty-50-hedging` | `nifty-50-hedging` |
| `/solutions/investment-advisory` | `investment-advisory` |

| | |
|---|---|
| Implementation | `ProductPage.tsx` + `ProductOfferPage` section |
| Redirects | `/solutions/intelligence-oversight` → investment-advisory; equity/retail broking → `/solutions` |
| Style sources | `ProductOfferPage.tsx` (~9 hex), shared breadcrumb/gold accent |
| Priority | P2 |

### `/approach`

| | |
|---|---|
| Page | `Approach.tsx` |
| Surface | Editorial; limited hex |
| Priority | P3 |

### `/team`

| | |
|---|---|
| Page | `Team.tsx` |
| Sections | Team hero/gallery/carousel/cards, `DirectorAboutSection` |
| Style sources | **`team.css`**, team animation lib, glass cards |
| Shell | `.is-team` container override |
| Priority | P1 |

### `/insights`

| | |
|---|---|
| Page | `Insights.tsx` |
| Sections | Masthead, featured note, theme index, bridge strip, breadcrumb |
| Wrapper | `.is-insights` (container token override) |
| Priority | P2 |

### `/blog`

| | |
|---|---|
| Page | `Blog.tsx` |
| Sections | `BlogMasthead`, `BlogArchiveList`, `BlogReadingPath` |
| Redirect | `/insights/blog` → `/blog` |
| Priority | P2 |

### `/blog/:slug`

| | |
|---|---|
| Page | `BlogPost.tsx` → `BlogArticle` or `NotFound` |
| Priority | P2 |

### `/newsletter`

| | |
|---|---|
| Page | `Newsletter.tsx` |
| Priority | P3 |

### `/calculators`

| | |
|---|---|
| Page | `Calculators.tsx` (**staged local edits — preserve**) |
| Surface | Index of calculator tools; UI kit cards/buttons |
| Priority | P1 |

### Calculator tools

| Path | Page |
|---|---|
| `/calculators/sip` | `SipCalculatorPage.tsx` |
| `/calculators/lumpsum` | `LumpsumCalculatorPage.tsx` |
| `/calculators/step-up-sip` | `StepUpSipCalculatorPage.tsx` |
| `/calculators/swp` | `SwpCalculatorPage.tsx` |
| `/calculators/goal-planning` | `GoalPlanningCalculatorPage.tsx` |

| | |
|---|---|
| Shared chrome | `CalculatorShell`, `CalculatorSlider`, `CalculatorResults`, `CalculatorModeToggle`, `CalculatorSideNav`, `GrowthChart`, `AllocationDonut` |
| Style sources | `index.css` `.oc-calc-*` overrides; light/dark control variants |
| Business logic | **Do not change** `calculator-math` / limits data |
| Priority | P1 (shared chrome) then P2 (pages) |

### `/contact`

| | |
|---|---|
| Page | `Contact.tsx` |
| Sections | `ContactFormPanel`, `ContactInfoPanel`, `ContactSurface` |
| Style sources | Form Field UI + contact panels (hex in info panel) |
| Priority | P1 |

### `/design-system`

| | |
|---|---|
| Page | `DesignSystem.tsx` |
| Role | Internal component lab / registry showcase |
| Style sources | Entire UI kit + motion/effects demos |
| Priority | P1 (acceptance surface for token proof) |

### `*` — NotFound

| | |
|---|---|
| Page | `NotFound.tsx` |
| Priority | P3 |

---

## Redirect-only paths (no unique styles)

- `/solutions/risk-wealth-architecture` → wealth-management  
- `/solutions/intelligence-oversight` → investment-advisory  
- `/mutual-funds` → `/solutions/mutual-funds`  
- `/solutions/pms`, `/solutions/aif` → pms-aif  
- `/solutions/equity-broking`, `/solutions/retail-broking` → `/solutions`  
- `/insights/blog` → `/blog`

---

## Cross-route styling dependencies

| Concern | Routes affected |
|---|---|
| Navbar / Footer / Preloader | All |
| Container width CSS vars | Home, Team, Insights (overrides) |
| `.light-section` | Home testimonials, selected About/Approach bands, Section tone |
| Solutions viz CSS | Solutions tree |
| Team carousel CSS | `/team` |
| Calculator range/select CSS | Calculators tree + Mutual Funds embed |
| Chat + App download FAB | All (fixed shell) |
| RiskFactorsStrip | All |

---

## Route migration tracking (Stage E checklist)

| Route | Status |
|---|---|
| `/` | Pending |
| `/about` | Pending |
| `/solutions` | Pending |
| `/solutions/*` (all product + dedicated) | Pending |
| `/approach` | Pending |
| `/team` | Pending |
| `/insights` | Pending |
| `/blog`, `/blog/:slug` | Pending |
| `/newsletter` | Pending |
| `/calculators` + tools | Pending |
| `/contact` | Pending |
| `/design-system` | Pending |
| `/` 404 | Pending |

Update this table during Stage E; do not mark complete until token acceptance test passes on that route.
