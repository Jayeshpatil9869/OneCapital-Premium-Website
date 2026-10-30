# 12 — PMS & AIF Page

## Overview

Institutional-grade comparison and guidance page for Portfolio Management Services (PMS) and Alternative Investment Funds (AIF). Features regulatory minimums, side-by-side comparison matrix, wealth bracket allocations, governance pillars, and FAQ accordion.

---

## Route

- **Path**: `/solutions/pms-aif`
- **Component**: `src/pages/solutions/PmsAifPage.tsx`
- **Redirects**:
  - `/solutions/pms` → `/solutions/pms-aif`
  - `/solutions/aif` → `/solutions/pms-aif`

---

## Source Files

- `src/pages/solutions/PmsAifPage.tsx` (L1–728)
- `src/components/sections/solutions/shared/SolutionsBreadcrumb.tsx`
- `src/components/ui/*`
- `src/data/company.ts` (APMI registration number)

---

## Page Structure (Full Section Map)

```tsx
<div className="flex w-full flex-col bg-black text-white selection:bg-white selection:text-black">
  {/* 1. Hero Section */}
  {/* 2. The Core Decision — PMS vs AIF at a Glance */}
  {/* 3. The Institutional Comparison Matrix */}
  {/* 4. HNI Wealth Allocation Blueprint by Bracket */}
  {/* 5. Governance, Custody & Regulatory Net */}
  {/* 6. Institutional FAQs (Accordion) */}
</div>
```

---

## 1. Hero Section (L182–295)

### Layout

- **Container**: `max-w-[1400px] px-6 sm:px-8 lg:px-12`
- **Padding**: `pt-[max(7.5rem,env(safe-area-inset-top))] pb-16 sm:pb-20 lg:pb-28`
- **Border**: `border-b border-white/10`
- **Overflow**: `overflow-hidden` (for background glow)

### Background Effect (L185–189)

```tsx
<div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-radial from-white/[0.07] to-transparent blur-3xl" />
```

### Breadcrumb + Back (L192–201)

- `SolutionsBreadcrumb current="PMS & AIF"`
- Back pill: same monochrome design as MutualFunds page

### Hero Grid (L204–294)

**Grid**: `grid gap-12 lg:grid-cols-12 lg:gap-16 items-center`

#### Left Column (lg:col-span-7) — L206–228

**Badge** (L208–211)
- `inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1 text-xs font-mono uppercase tracking-[0.2em]`
- Sparkles icon + "Private Investing"

**DisplayHeading** (L213–215)
- "Beyond Conventional Investing"
- `text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.06]`

**BodyText** (L217–219)
- `max-w-[42rem] text-base md:text-lg lg:text-xl font-light text-white/80`

**CTA Row** (L221–227)
- "Book Private Consultation" (primary)
- "Compare PMS vs. AIF" (secondary, anchor link)

#### Right Column (lg:col-span-5) — L231–292

**Luminous Spotlight Card** (L232–291)
- `rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 sm:p-9`
- Shadow: `shadow-[0_20px_50px_rgba(0,0,0,0.5)]`
- Hover: `hover:scale-[1.01]`

**Badge Row** (L235–241)
- "SEBI Regulatory Mandates" (mono, gray)
- APRN: `{COMPANY.apmiRegistrationNo}` (pill, right)

**3 Metric Rows** (L244–284)
1. **₹50 Lakhs** — PMS Investment (Minimum)
2. **₹1 Crore** — AIF Investment (Minimum)
3. **100% Direct** — PMS Ownership (Direct Hold)

Each:
- `rounded-2xl bg-[#262626] p-4 border border-white/10`
- Large mono value (2xl/3xl, extrabold)
- Small mono label (xs, tracking, gray)
- Pill tag (right side)

**Disclaimer** (L288–290)
- `text-xs text-[#757575] leading-relaxed`

---

## 2. PMS vs AIF at a Glance (L299–438)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1400px]`

### Header (L301–311)

- Centered, `max-w-3xl`
- Eyebrow: "Investment Pathways"
- Heading: "Two Distinct Approaches"
- Body: Brief positioning

### Card Grid (L315–437)

**Grid**: `grid grid-cols-1 gap-8 lg:grid-cols-2`

#### PMS Card (L317–373)

**Structure** (L318–322)
- `rounded-3xl border border-white/10 bg-[#1D1D1D] p-8 sm:p-10`
- Hover: `hover:border-white/20 hover:bg-[#262626] hover:-translate-y-1`

**Header** (L320–335)
- Crown icon in `rounded-2xl bg-[#262626] border border-white/10`
- Title: "PMS" (2xl/3xl)
- Subtitle: "Portfolio Management Services" (mono, xs, gray)
- Pill: "MIN. ₹50 LAKHS" (right side)

**Body** (L337–340)
- Description paragraph

**3 Checkmarks** (L342–361)
1. Ownership: Securities in client's own account
2. Investment Style: Mandate-driven
3. Risk & Reporting: Review holdings, costs, performance

Each:
- `rounded-xl bg-[#262626] p-3.5 border border-white/10`
- CheckCircle2 icon
- Strong label + gray description

**Footer Link** (L364–372)
- "Compare PMS in Matrix" + ArrowRight
- Anchor to `#comparison-matrix`

#### AIF Card (L377–435)

**Identical structure**, different data:
- Layers icon
- "AIF" / "Alternative Investment Funds"
- "MIN. ₹1 CRORE"
- 3 checkmarks: Fund Structure, Asset Exposure, Liquidity Terms

---

## 3. Comparison Matrix (L442–509)

### Layout

- **Section**: `scroll-mt-24 border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **ID**: `comparison-matrix`
- **Container**: `max-w-[1400px]`

### Header (L447–455)

- Centered, `max-w-3xl`
- Eyebrow: "Comparison"
- Heading: "Understanding the Differences"

### Matrix Table (L460–503)

**Card** (L460)
- `rounded-3xl border border-white/10 bg-[#1D1D1D]`
- Shadow: `shadow-[0_12px_50px_rgba(0,0,0,0.8)]`

**Header Row** (L462–474)
- `grid grid-cols-1 md:grid-cols-12 bg-[#262626] p-5 sm:p-6`
- Col-span-4: "Feature / Parameter"
- Col-span-4: "Portfolio Management (PMS)" + Crown icon
- Col-span-4: "Alternative Investment Funds (AIF)" + Layers icon

**Data Rows** (L477–501)
- `divide-y divide-white/10`
- Each: `grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6`
- Highlight rows: `bg-[#262626]/30` when `row.highlight`
- Hover: `hover:bg-[#262626]/50`

**7 Attributes** (L25–67):
1. Minimum Investment (highlight)
2. Ownership Structure
3. Investment Assets
4. Customization
5. Liquidity & Exit (highlight)
6. Tax Treatment
7. Transparency

**Disclaimer** (L504–507)
- `text-sm font-light text-[#757575]`

---

## 4. Wealth Allocation Blueprint (L513–602)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1400px]`

### Header (L515–524)

- Centered, `max-w-3xl`
- Eyebrow: "Wealth Brackets"
- Heading: "Investing Across Wealth Levels"
- Body: Suitability positioning

### Bracket Selector (L528–543)

**Tabs** (L529–542)
- `flex flex-wrap items-center justify-center gap-3`
- 3 brackets:
  1. ₹50 Lakhs – ₹1 Crore
  2. ₹1 Crore – ₹5 Crore
  3. Above ₹5 Crore

**Active Tab**
- `bg-white text-black shadow-lg`

**Inactive Tab**
- `bg-white/5 text-white/70 border border-white/15 hover:border-white`

### Active Bracket Card (L547–599)

**Card** (L548)
- `rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 sm:p-10`
- Shadow: `shadow-[0_12px_50px_rgba(0,0,0,0.8)]`

**Header** (L549–561)
- Eyebrow: "Target Wealth Tier"
- Title: `WEALTH_BRACKETS[activeBracket].title`
- Badge: Bracket label (pill, right)

**Content Grid** (L563–598)
- `grid gap-8 md:grid-cols-12 items-center`

#### Left (md:col-span-7) — L565–582

**Allocation Mix** (visual progress bars)
- Label: "Recommended Asset Mix" (mono, xs, gray)
- Each allocation:
  - Name + share % (flex justify-between)
  - Progress bar: `h-3 rounded-full bg-[#262626] border border-white/10`
  - Fill: `bg-white` with `width: item.share`

#### Right (md:col-span-5) — L585–597

**Advisory Rationale** (L586)
- `rounded-2xl bg-[#262626] p-6 border border-white/10`
- Eyebrow: "Strategic Rationale" (mono, xs, gray)
- Thesis: `WEALTH_BRACKETS[activeBracket].thesis`
- CTA: "Request Custom Blueprint" → `/contact`

**Data Source** (L70–115):
- Array of 3 bracket objects: `{ id, label, title, summary, allocations[], thesis }`

---

## 5. Governance (L607–672)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1400px]`

### Header (L609–617)

- Centered, `max-w-3xl`
- Eyebrow: "Governance"
- Heading: "Clarity At Every Step"

### 3-Column Grid (L620–671)

**Grid**: `grid gap-8 sm:grid-cols-3`

**3 Cards**:
1. **Suitability Review** (Scale icon)
2. **Investment Due Diligence** (Building2 icon)
3. **Ongoing Oversight** (FileCheck2 icon)

Each:
- `rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 text-center`
- Hover: `hover:border-white/20`
- Icon: `h-14 w-14 rounded-2xl bg-[#262626] border border-white/10`
- Title: `text-lg font-bold`
- Subtitle: `text-xs font-mono uppercase text-[#757575]`
- Description: `text-sm font-normal text-[#B3B3B3] leading-relaxed`

**Stagger**: `delay={0.08 * index}`

---

## 6. Institutional FAQs (L676–724)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1000px]`

### Header (L678–688)

- Centered, `max-w-2xl`
- Eyebrow: "Questions"
- Heading: "Your Questions"
- Body: Short positioning

### Accordion (L690–721)

**State**: `useState<number | null>(0)` (first item open by default)

**5 FAQs** (L118–140):
1. What is the difference between PMS and AIF investments?
2. What is the minimum investment required?
3. Are PMS and AIF suitable for every investor?
4. Can I withdraw my money whenever I need it?
5. How does One Capital help evaluate options?

**Card Structure** (L696–719)
- `rounded-2xl border border-white/10 bg-[#1D1D1D]`
- Hover: `hover:border-white/20`

**Button** (L698–711)
- `flex w-full items-center justify-between gap-4 p-6`
- Question: `text-base sm:text-lg font-bold text-white`
- Icon: `+` (rotates 45° when open)
- Icon container: `h-8 w-8 rounded-full bg-[#262626] border border-white/10`

**Answer** (L713–717)
- Shows when `isOpen`
- `px-6 pb-6 text-sm sm:text-base text-[#B3B3B3] border-t border-white/10 pt-4`

**Stagger**: `delay={index * 0.05}`

---

## Data Sources

### Constants

**MATRIX_ATTRIBUTES** (L25–67)
- Array of 7 objects: `{ parameter, pms, aif, highlight }`

**WEALTH_BRACKETS** (L70–115)
- Array of 3 objects: `{ id, label, title, summary, allocations[], thesis }`

**FAQS** (L118–140)
- Array of 5 objects: `{ q, a }`

### Product Data (L142–175)

```tsx
const page = getProductById('pms-aif');
const pms = getProductById('pms');
const aif = getProductById('aif');
```

Used for:
- SEO metadata
- Breadcrumb
- JSON-LD (dual service entries)

---

## SEO (L148–175)

### Hook: `usePageSeo`

**Fields**
- `title`: Fallback "PMS & AIF | High-Net-Worth Advisory | ONE CAPITAL"
- `description`: Fallback provided
- `path`: `/solutions/pms-aif`
- `keywords`: From product
- `image`: `/images/solutions/pms-demat-architecture.jpg`
- `type`: `'product'`

### JSON-LD

- Dual `buildServiceJsonLd` array (PMS + AIF)
- Both use same path (parent page)

---

## Clone Checklist

1. **Duplicate file**: Copy `PmsAifPage.tsx` → `NewComparisonPage.tsx`
2. **Update product IDs**: Change IDs in `getProductById()` calls
3. **Replace matrix data**: Swap `MATRIX_ATTRIBUTES` with new comparison parameters
4. **Update bracket logic**: Replace `WEALTH_BRACKETS` with relevant tiers
5. **Revise FAQs**: Update `FAQS` array
6. **Adjust hero spotlight**: Replace 3 metric rows with relevant data points
7. **Icon imports**: Swap icons from `lucide-react` as needed
8. **Governance cards**: Customize 3-pillar structure
9. **Add route**: Insert in `App.tsx` children
10. **SEO**: Update image path, title, description fallbacks

---

## Motion & Interaction

- **ScrollFade**: All sections, staggered reveals
- **Hover transforms**: Cards translate -1px, scale +1% on hero spotlight
- **Border transitions**: `white/10` → `white/20`
- **Tab switcher**: Click to change active bracket (state-driven)
- **Accordion**: Single-open mode, rotate icon 45° on expand
- **Background glow**: Radial gradient blur (static, pointer-events-none)

---

## Design System Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000000` | Page base |
| Card surface | `#1D1D1D` | Primary cards, matrix BG |
| Card row | `#262626` | Nested rows, icon containers, matrix header |
| Text primary | `#FFFFFF` | Headings, strong labels |
| Text secondary | `#B3B3B3` | Body copy, matrix data |
| Text muted | `#757575` | Eyebrows, meta labels, disclaimers |
| Border | `white/10` | Default borders |
| Border hover | `white/20` | Interactive states |
| Shadow heavy | `0_12px_50px_rgba(0,0,0,0.8)` | Matrix, bracket card |

---

**Version**: 2026-10-30  
**Component count**: 1 page, 6 sections, 20+ sub-components  
**Lines**: 728
