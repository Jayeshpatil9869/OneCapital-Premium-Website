# 11 — Mutual Funds Page

## Overview

Single dedicated page for mutual fund offerings. Black canvas with white/gray monochrome palette, clean borders, embedded calculator, category breakdown, approach steps, and FAQ accordion.

---

## Route

- **Path**: `/solutions/mutual-funds`
- **Component**: `src/pages/solutions/MutualFundsPage.tsx`
- **Redirect**: `/mutual-funds` → `/solutions/mutual-funds`

---

## Source Files

- `src/pages/solutions/MutualFundsPage.tsx` (L1–386)
- `src/components/calculators/MutualFundCalculatorEmbed.tsx`
- `src/components/sections/solutions/shared/SolutionsBreadcrumb.tsx`
- `src/components/ui/Button.tsx`, `Container.tsx`, `DisplayHeading.tsx`

---

## Page Structure (Full Section Map)

```tsx
<div className="flex w-full flex-col bg-black text-white selection:bg-black selection:text-white">
  {/* 1. Hero Section */}
  {/* 2. What Are Mutual Funds & Categories */}
  {/* 3. Mutual Fund Calculators */}
  {/* 4. Why Choose One Capital? */}
  {/* 5. Our Approach to Fund Selection */}
</div>
```

---

## 1. Hero Section (L136–171)

### Layout

- **Container**: `max-w-[1400px] px-6 sm:px-8 lg:px-12`
- **Padding**: `pt-[max(7.5rem,env(safe-area-inset-top))] pb-16 lg:pb-24`
- **Border**: `border-b border-white/10`

### Components

**Breadcrumb + Back Button (L140–151)**
- `SolutionsBreadcrumb current="Mutual Funds"`
- Back pill: `inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.16em]`
- Hover: `border-white bg-white text-black`

**Hero Content (L153–169)**
- Center-aligned, `max-w-4xl mx-auto`
- `DisplayHeading` — "Mutual Funds" (text-balance, tracking-tight)
- Description: `text-base sm:text-lg md:text-xl font-light text-white/80 max-w-2xl`
- CTA row: `flex flex-wrap items-center justify-center gap-4`
  - Primary: "Schedule Portfolio Review" → `/contact`
  - Secondary: "Explore SIP Calculator" → `#mutual-fund-calculator`

**Surface**  
- Black background
- White text
- Semi-transparent overlays for depth

---

## 2. What Are Mutual Funds & Categories (L176–260)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1400px]`
- **Grid**: `grid gap-12 lg:grid-cols-12 lg:gap-16 items-start`

### Left Column (lg:col-span-6) — L180–209

**Eyebrow** (L182–184)
- `inline-block text-xs font-mono uppercase tracking-[0.22em] font-medium text-[#757575]`
- "Foundational Concept"

**Heading** (L185–187)
- `text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white`
- "Understanding Funds"

**Body** (L188–191)
- `text-base sm:text-lg font-normal leading-relaxed text-[#B3B3B3]`
- Explains pooling, professional management, market-linked returns

**Checkmarks** (L193–208)
- Two items: Pooling, Market Risk
- Icon: `CheckCircle2` in `rounded-full bg-[#262626] border border-white/10`
- Strong labels + gray descriptions

### Right Column (lg:col-span-6) — L213–258

**Card** (L215–225)
- `rounded-3xl border border-white/10 bg-[#1D1D1D] p-6 sm:p-8`
- Shadow: `shadow-[0_4px_24px_rgba(0,0,0,0.5)]`
- Hover: `hover:border-white/20`

**Card Header** (L216–227)
- Icon: `PieChart` in `rounded-xl bg-[#262626] border border-white/10`
- Title: "Investment Categories"
- Meta: "Core Portfolio Pillars" (mono, small, gray)

**Category List** (L229–255)
- 3 categories: Equity Funds, Debt Funds, Hybrid Funds
- Each: `rounded-2xl border border-white/10 bg-[#262626] p-4`
- White accent strip (left edge): `absolute left-0 w-1 rounded-r-full bg-white`
- Tag: `rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono uppercase border border-white/10`
- Hover: `hover:bg-[#2b2b2b] hover:border-white/20`

**Colors**  
- Card BG: `#1D1D1D`
- Row BG: `#262626`
- Text: `#B3B3B3` (descriptions), `#757575` (labels)
- Borders: `white/10` → `white/20` on hover

---

## 3. Mutual Fund Calculators (L264–291)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1400px]`

### Header (L268–287)

**Top Row**
- Flexbox: `flex-col sm:flex-row sm:items-end justify-between gap-6`
- Eyebrow: "Calculator"
- Heading: "Plan Your SIP" (2xl/3xl/4xl)
- Description: Disclaimers about illustrative outcomes

**Link to Calculators**
- `inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white`
- "View all calculators" + ArrowRight icon

### Embed (L289)

- `<MutualFundCalculatorEmbed />`
- Full interactive calculator component (not specified in this page source)

---

## 4. Why Choose One Capital? (L295–333)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1400px]`

### Header (L298–306)

- Centered, `max-w-3xl mx-auto`
- Eyebrow: "Why One Capital"
- Heading: "Guidance Beyond Fund Selection"
- Body: Value proposition

### Pillar Cards (L310–330)

**Grid**: `grid gap-6 sm:grid-cols-2 lg:gap-8`

**6 Cards** (L310–330)  
Data: `WHY_CHOOSE_PILLARS` array (L22–60)

1. Goals Before Products (Ban icon)
2. Risk-Aware Choices (Compass icon)
3. Research With Context (Percent icon)
4. Clear Cost Discussion (BarChart3 icon)
5. Personal Conversations (UserCheck icon)
6. Reviews That Matter (ShieldCheck icon)

**Card Structure**
- `rounded-3xl border border-white/10 bg-[#1D1D1D] p-7 sm:p-8`
- Shadow: `shadow-[0_2px_12px_rgba(0,0,0,0.3)]`
- Hover: `hover:border-white/20 hover:bg-[#262626] hover:-translate-y-1`

**Icon Container**
- `h-12 w-12 rounded-2xl bg-[#262626] border border-white/10`
- Hover: `group-hover:bg-white group-hover:text-black`

**Content**
- Title: `text-lg sm:text-xl font-semibold`
- Description: `text-sm sm:text-base font-normal text-[#B3B3B3]`

**Stagger**: `delay={index * 0.08}` via ScrollFade

---

## 5. Our Approach to Fund Selection (L337–381)

### Layout

- **Section**: `border-b border-white/10 py-16 sm:py-20 lg:py-28`
- **Container**: `max-w-[1400px]`

### Header (L339–349)

- `max-w-2xl`
- Eyebrow: "Our Approach"
- Heading: "Your Journey, Step by Step"
- Body: Conversational positioning

### Step Cards (L354–378)

**Data**: `APPROACH_STEPS` array (L63–88)

1. Know Your Goals
2. Assess Your Risk
3. Review Holdings
4. Discuss Options
5. Revisit The Plan

**Card Structure** (L357–377)
- `rounded-2xl border border-white/10 bg-[#1D1D1D] p-5 sm:p-6`
- Hover: `hover:border-white/20 hover:bg-[#262626]`

**White Accent**
- `absolute left-0 w-1 rounded-r-full bg-white`
- Animates on hover: `group-hover:scale-y-105`

**Icon**
- `CheckCircle2` in `h-8 w-8 rounded-full bg-[#262626] border border-white/10`

**Content**
- Title (strong) + colon + description (gray)
- Step number (right side, hidden on mobile): `font-mono text-xs tracking-[0.2em] text-[#757575]`

**Stagger**: `delay={index * 0.06}` via ScrollFade

---

## Data Sources

### Constants (L22–108)

**WHY_CHOOSE_PILLARS** (L22–60)
- Array of 6 objects: `{ icon, title, description }`

**APPROACH_STEPS** (L63–88)
- Array of 5 objects: `{ number, title, description }`

**CATEGORIES** (L91–108)
- Array of 3 objects: `{ name, description, tag }`

### Product Data (L111–130)

```tsx
const product = getProductById('mutual-funds');
```

Fields used:
- `seoTitle`, `seoDescription`, `path`, `keywords`
- `title`, `opening` (not rendered in visible layout, used for SEO/breadcrumb)

---

## SEO (L113–130)

### Hook: `usePageSeo`

**Fields**
- `title`: `product?.seoTitle ?? 'Mutual Funds | ONE CAPITAL'`
- `description`: Fallback provided
- `path`: `/solutions/mutual-funds`
- `keywords`: From product
- `image`: `/images/solutions/solutions-hub.jpg`
- `type`: `'product'`

### JSON-LD

- `buildServiceJsonLd` if product exists
- `serviceType`: `product.title`

---

## Clone Checklist

1. **Duplicate file**: Copy `MutualFundsPage.tsx` → `NewSolutionPage.tsx`
2. **Update product ID**: Change `getProductById('mutual-funds')` to new ID
3. **Customize constants**: Replace `WHY_CHOOSE_PILLARS`, `APPROACH_STEPS`, `CATEGORIES`
4. **Update hero copy**: DisplayHeading, description, CTA labels
5. **Section reordering**: Rearrange/remove sections as needed
6. **Calculator swap**: Replace `<MutualFundCalculatorEmbed />` or remove entirely
7. **Add route**: Insert in `App.tsx` children
8. **SEO**: Provide fallback strings for title, description
9. **Images**: Update product image path in data source

---

## Motion & Interaction

- **ScrollFade**: All major sections (hero, pillars, approach)
- **Hover transforms**: Cards translate -1px on hover
- **Border transitions**: `white/10` → `white/20` (300ms)
- **Icon color swap**: `bg-[#262626]` → `bg-white`, `text-white` → `text-black`
- **Staggered reveals**: Pillars (0.08s), approach steps (0.06s)

---

## Design System Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000000` | Page base |
| Card surface | `#1D1D1D` | Primary cards |
| Card row | `#262626` | Nested rows, icon containers |
| Text primary | `#FFFFFF` | Headings, strong labels |
| Text secondary | `#B3B3B3` | Body copy |
| Text muted | `#757575` | Eyebrows, meta labels |
| Border | `white/10` | Default borders |
| Border hover | `white/20` | Interactive states |
| Accent strip | `white` | Left-edge highlights |

---

**Version**: 2026-10-30  
**Component count**: 1 page, 5 sections, 14 sub-components  
**Lines**: 386
