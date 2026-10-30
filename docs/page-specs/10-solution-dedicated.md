# 10 — Solution Dedicated Pages

## Overview

Template-driven pages for the four solution pillars (CapitalStrategy, PortfolioManagement, RiskWealthArchitecture, InvestmentAdvisory). Each uses `SolutionDedicatedPage.tsx` + `SolutionDedicatedSections.tsx` with theme-based rendering.

---

## Routes

| Path | Component | Config |
|------|-----------|--------|
| `/solutions/capital-strategy` | `CapitalStrategyPage.tsx` | `getDedicatedPageConfig('capital-strategy')` |
| `/solutions/portfolio-management` | `PortfolioManagementPage.tsx` | `getDedicatedPageConfig('portfolio-management')` |
| `/solutions/wealth-management` | `RiskWealthArchitecturePage.tsx` | `getDedicatedPageConfig('risk-wealth-architecture')` |
| `/solutions/investment-advisory` | (future) | `getDedicatedPageConfig('investment-advisory')` |

---

## Source Files

**Template**  
- `src/pages/solutions/SolutionDedicatedPage.tsx`  
- `src/components/sections/solutions/SolutionDedicatedSections.tsx`

**Pillar Pages**  
- `src/pages/solutions/CapitalStrategyPage.tsx`  
- `src/pages/solutions/PortfolioManagementPage.tsx`  
- `src/pages/solutions/RiskWealthArchitecturePage.tsx`

**Config**  
- `src/data/solutions-pages.ts` (exports `getDedicatedPageConfig()`)

**Supporting**  
- `src/components/sections/solutions/SolutionPageHero.tsx`  
- `src/components/sections/solutions/SolutionRelatedNav.tsx`

---

## SolutionDedicatedPage Template (L1–38)

### Structure

```tsx
<div className="flex w-full flex-col items-center bg-black">
  <SolutionPageHero config={config} />
  <SolutionDedicatedSections config={config} />
  <SolutionRelatedNav currentPillarId={config.pillarId} />
</div>
```

### SEO (L15–29)

- Uses `usePageSeo` hook
- `buildServiceJsonLd` for structured data
- Pulls title, description, keywords, hero image, serviceType from config

---

## Theme-Based Rendering

`SolutionDedicatedSections.tsx` switches on `config.theme`:

### 1. **DirectionTimeline** (`theme: 'direction'`)

**Layout (L26–192)**  
- **Container**: `max-w-6xl` centered
- **Intro**: Eyebrow ("The sequence"), `SectionHeading`, `BodyText`
- **Timeline**: `<ol>` with vertical line (SVG animated on scroll via GSAP)
- **Steps**: `<article>` per section, alternating left/right on `md:grid-cols-2`

**Scroll Animation (L27–116)**  
- Line draws from top→bottom via `strokeDashoffset` (ScrollTrigger scrub)
- Markers (`data-step-marker`) paint white when reached
- Articles fade + translate in (desktop: ±36px; mobile: +24px)

**Section Content**  
- Index label (01, 02, ...)
- `section.title` — 3xl/4xl
- `section.points[0]` — lead sentence (lg/xl)
- Lead sentence from `section.body`
- Remaining `points` joined with ` · `

**Classes & Spacing**  
- `py-10 md:py-16` per article
- `pl-12 md:pl-16/pr-16` (alternating sides)
- Timeline line: `absolute left-3 md:left-1/2`

---

### 2. **PrecisionShelf** (`theme: 'precision'`)

**Used by**: PortfolioManagement

**Layout (L208–400)**  

#### Intro Section (L219–252)
- `grid lg:grid-cols-12 gap-10 lg:gap-16`
- Left (col-span-6): `SectionHeading` (2.1–3.6rem fluid)
- Right (col-span-5, col-start-8): body + anchor nav links

**Sections by ID**  

1. **mutual-funds** (L255–283)
   - `grid lg:grid-cols-12 gap-8 lg:gap-16`
   - Left (col-span-4): title (1.85–3rem), lead point, `TextLink`
   - Right (col-span-7, col-start-6): body, fact list (2-col grid)

2. **sip-lumpsum** (L285–320)
   - Max-w-3xl: title, lead, body
   - Ways: 3-col grid, `py-6 md:px-8 md:py-8`
   - Links to SIP/Lumpsum calculators

3. **pms** + **alternatives** (L324–370)
   - Side-by-side `lg:grid-cols-2`
   - PMS: `border-r lg:pr-14`, "₹50 lakh", 3 bullets
   - AIF: `lg:pl-14`, "₹1 crore", bullets
   - Both link to `/solutions/pms-aif#pms` / `#aif`

4. **monitoring** (L373–398)
   - `grid lg:grid-cols-12 gap-8 lg:gap-16`
   - Left (col-span-5): title + lead
   - Right (col-span-6, col-start-7): body + bullet list

**Surface**  
- All on `bg-black text-white`
- Borders: `border-white/15`

---

### 3. **StructureBands** (`theme: 'structure'`)

**Layout (L404–466)**  

#### Intro (L407–420)
- `Section pad="md"`, `border-b border-white/10`
- Eyebrow "The layers"
- `SectionHeading` + `BodyText`

#### Bands (L421–464)
Each section:
- `border-b border-white/10`
- Alternating `bg-[#1D1D1D]` (odd indices)
- `grid lg:grid-cols-12 gap-6 py-10 lg:py-14`
- Col-span-2: index (5xl/6xl, text-muted)
- Col-span-5: title (2xl/3xl), lead, body sentence
- Col-span-5: fact list (cards with `border border-white/10 bg-black/40`)

---

### 4. **IntelligenceReview** (`theme: 'intelligence'`)

**Layout (L468–550)**  

#### Intro (L471–481)
- `Section pad="none"`, `py-16 sm:py-20 lg:py-24`
- `grid lg:grid-cols-12 gap-8 items-end`
- `SectionHeading` (col-span-7) + `BodyText` (col-span-5)

#### First Section (L484–508)
- `grid lg:grid-cols-12 gap-10 lg:py-20`
- Left (col-span-5): mono step "01", title (2xl/3xl), lead
- Right (col-span-7): fact grid (2-col, lg font)

#### Remaining Sections (L510–546)
- 3-col grid on lg
- Each: mono step, title (2xl/3xl), lead, bullet list
- `border-t border-white/10` (first), `border-r` between cols

---

## Shared Sections

### Intro

All themes read:
- `config.intro.statement` — main heading
- `config.intro.body` — description

### Section Fields

Each `config.sections[]` item:
- `id` — anchor link
- `title` — heading
- `body` — paragraph
- `points[]` — structured data (lead + facts)

---

## Layout Differences: Wealth Management

**Precision theme** assumes PortfolioManagement data:
- mutual-funds, sip-lumpsum, pms, alternatives, monitoring

**Structure theme** (RiskWealthArchitecture):
- Numbered bands, fact cards
- No calculator links, no PMS/AIF cross-links

---

## Config-Driven Content

### Source: `solutions-pages.ts`

```ts
type SolutionDedicatedConfig = {
  pillarId: string;
  theme: 'direction' | 'precision' | 'structure' | 'intelligence';
  seo: { title, description, keywords, serviceType };
  hero: { image };
  intro: { statement, body };
  sections: Array<{
    id: string;
    title: string;
    body: string;
    points?: string[];
  }>;
};
```

**Functions:**
- `getDedicatedPageConfig(pillarId)` — returns config or null
- Configs: `capitalStrategyConfig`, `portfolioManagementConfig`, `riskWealthArchitectureConfig`

---

## Clone Checklist

1. **New pillar**: Add config to `solutions-pages.ts`
2. **Page wrapper**: Create `src/pages/solutions/NewPillarPage.tsx`:
   ```tsx
   import { Navigate } from 'react-router-dom';
   import { getDedicatedPageConfig } from '@/src/data/solutions-pages';
   import SolutionDedicatedPage from './SolutionDedicatedPage';

   export default function NewPillarPage() {
     const config = getDedicatedPageConfig('new-pillar-id');
     if (!config) return <Navigate to="/solutions" replace />;
     return <SolutionDedicatedPage config={config} />;
   }
   ```
3. **Route**: Add to `App.tsx` children array
4. **Theme selection**: Choose `direction` / `precision` / `structure` / `intelligence` based on content structure
5. **Related nav**: Will auto-populate from `getPillarById(config.pillarId)`
6. **SEO**: Provide `seo.title`, `description`, `keywords`, `serviceType`
7. **Images**: Hero image path in `config.hero.image`
8. **Section anchors**: Use hyphenated IDs (e.g., `mutual-funds`, `sip-lumpsum`)

---

## Redirects Table (from App.tsx)

| Old Path | New Path | Status |
|----------|----------|--------|
| `/solutions/risk-wealth-architecture` | `/solutions/wealth-management` | 301 |
| `/solutions/intelligence-oversight` | `/solutions/investment-advisory` | 301 |

---

## Motion Notes

- **Timeline line animation**: GSAP + ScrollTrigger, `strokeDashoffset`, scrub 0.45
- **Marker painting**: JS class toggle on scroll progress
- **Article fade-in**: GSAP stagger, `autoAlpha: 0`, x/y offsets
- **PrefersReducedMotion**: All animations skip when enabled
- **ScrollFade**: Wrapper component for fade-up/scale reveals

---

## Dependencies

- React Router (`Navigate`, `Link`)
- GSAP + `@gsap/react` + ScrollTrigger
- Tailwind utility classes
- Custom components: `ScrollFade`, `BodyText`, `Container`, `Eyebrow`, `Section`, `SectionHeading`
- Data: `solutions-pages.ts`, `solutions-pillars.ts`
- SEO hooks: `usePageSeo`, `buildServiceJsonLd`

---

**Version**: 2026-10-30  
**Last Updated**: Phase E (responsive audit)
