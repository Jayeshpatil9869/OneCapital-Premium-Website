# 13 — Product Pages (ProductPage + ProductOfferPage)

## Overview

Unified product offering template used for equity strategies, passive income, hedging, and investment advisory. `ProductPage.tsx` is a thin wrapper that fetches config and delegates to `ProductOfferPage.tsx`.

---

## Routes

| Path | Product ID |
|------|------------|
| `/solutions/equity` | `equity` |
| `/solutions/equity-baskets` | `equity-baskets` |
| `/solutions/options-baskets` | `options-baskets` |
| `/solutions/passive-income-strategy` | `passive-income-strategy` |
| `/solutions/nifty-50-hedging` | `nifty-50-hedging` |
| `/solutions/investment-advisory` | `investment-advisory` |

---

## Source Files

**Wrapper**  
- `src/pages/solutions/ProductPage.tsx` (L1–33)

**Template**  
- `src/components/sections/solutions/ProductOfferPage.tsx` (L1–305)

**Supporting**  
- `src/data/products.ts` (product config, relations, children)
- `src/components/sections/solutions/shared/SolutionsBreadcrumb.tsx`

---

## ProductPage Wrapper (L1–33)

### Structure

```tsx
export default function ProductPage({ productId }: ProductPageProps) {
  const product = getProductById(productId);
  usePageSeo({ ... });
  if (!product) return <Navigate to="/solutions" replace />;
  return <ProductOfferPage product={product} />;
}
```

### SEO (L14–30)

- `usePageSeo` hook
- `buildServiceJsonLd` with product name, description, path
- Falls back to generic strings if product missing

### Usage in App.tsx

```tsx
<Route path="solutions/equity" element={<ProductPage productId="equity" />} />
```

---

## ProductOfferPage Template (L1–305)

### Full Section Map

```tsx
<div className="flex w-full flex-col bg-black text-white">
  {/* 1. Hero Section */}
  {/* 2. Strategy Diagram (optional) */}
  {/* 3. Metadata Row (audience, eligibility, journey link) */}
  {/* 4. Key Features */}
  {/* 5. What Makes One Capital Different */}
  {/* 6. Inside [Product] (children nav, optional) */}
  {/* 7. Other Products (related products nav) */}
</div>
```

---

## 1. Hero Section (L31–48)

### Layout

- **Border**: `border-b border-white/15`
- **Padding top**: `pt-[max(7.5rem,env(safe-area-inset-top))]`
- **Padding bottom**: `pb-14 lg:pb-20`
- **Container**: `max-w-[1400px] px-6 sm:px-8 lg:px-12`

### Components

**Breadcrumb** (L35)
- `<SolutionsBreadcrumb current={product.headline ?? product.title} />`

**DisplayHeading** (L36–38)
- `max-w-[16ch] text-white`
- Displays `product.headline` or falls back to `product.title`

**BodyText** (L39–41)
- `max-w-[40rem] text-base md:text-lg lg:text-xl text-[#B3B3B3]`
- Displays `product.opening`

**CTA** (L42–46)
- Primary button: "Discuss this product" → `/contact`

---

## 2. Strategy Diagram (L50–230)

### Condition

Only renders if `product.diagram` exists.

### Layout (L199–229)

- **Section**: `border-b border-white/15`
- **Container**: `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24`

### Diagram Heading (L176–188)

```ts
function diagramHeading(kind: 'stack' | 'flow'): string {
  switch (kind) {
    case 'stack': return 'The income path';
    case 'flow': return 'The hedge path';
  }
}
```

### Step Markers (L190–196)

```ts
function stepMark(kind, index): string | null {
  if (kind === 'stack' && index === 1) return '+';
  if (kind === 'stack' && index === 2) return '=';
  if (kind === 'flow' && index > 0) return '→';
  return null;
}
```

### Diagram Grid (L204–227)

**Eyebrow** (L202–204)
- Mono, xs, uppercase, gray
- Diagram heading

**Grid** (L205)
- `grid gap-px bg-white/15 md:grid-cols-3`

**Step Cards** (L206–226)
- Each: `bg-[#1D1D1D] px-6 py-8 sm:px-8`
- Index + mark: mono, xs, white/40
- Kicker: mono, xs, uppercase, white/60
- Title: sans, xl, medium, tracking-tight, white

---

## 3. Metadata Row (L52–87)

### Layout

- **Section**: `border-b border-white/15`
- **Container**: `max-w-[1400px] px-6 py-12 sm:px-8 lg:px-12 lg:py-16`

### Grid (L55)

`grid gap-10 md:grid-cols-3 md:gap-12`

### 3 Columns

**Who it is for** (L56–62)
- DT: "Who it is for" (mono, xs, uppercase, gray)
- DD: `product.audience` (base, light, relaxed, gray)

**Eligibility** (L63–70)
- DT: "Eligibility"
- DD: `product.eligibility`

**How the work is done** (L71–84)
- DT: "How the work is done"
- DD: Journey link if `journey` exists
  - `<Link to={getPillarPageHref(journey.id)}>{journey.title}</Link>`
  - Underline on hover

---

## 4. Key Features (L90–111)

### Layout

- **Section**: `border-b border-white/15`
- **Container**: `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24`

### Grid (L93)

`grid gap-10 lg:grid-cols-12 lg:gap-16`

### Left Column (lg:col-span-4) — L94–96

- Eyebrow: "Key features" (mono, xs, uppercase, gray)

### Right Column (lg:col-span-8) — L97–109

**Ordered List** (L97)
- `border-t border-white/15`

**Each Feature** (L98–107)
- `grid grid-cols-[3rem_1fr] gap-4`
- `border-b border-white/15 py-5`
- Index: mono, xs, `text-white/40`, padStart(2, '0')
- Text: base/lg, light, relaxed, white

---

## 5. What Makes One Capital Different (L113–120)

### Layout

- **Section**: `border-b border-white/15`
- **Container**: `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24`

### Components

**Eyebrow** (L116–118)
- "What makes One Capital different"

**ScrollColorText** (L119)
- `<ScrollColorText text={product.difference} className="mt-4" />`
- Animates color on scroll (custom component)

---

## 6. Inside [Product] (L122–151)

### Condition

Only renders if `children.length > 0`.

**Data source**:
```tsx
const children = getProductChildren(product.id);
```

### Layout

- **Section**: `border-b border-white/15`
- **Container**: `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24`

### Components

**Eyebrow** (L126–131)
- "Inside {product.headline ?? product.navLabel}"
- Special case: `investment-advisory` → "Inside Advisory"

**List** (L132–149)
- `border-t border-white/15`
- Each child:
  - `border-b border-white/15`
  - If `child.path`: `<Link>` (lg/xl, medium, tracking-tight, hover:white/80)
  - Else: `<span>` (same styling, no interaction)

---

## 7. Other Products (L153–172)

### Data

```tsx
const related = getRelatedProducts(product.id);
```

### Layout

- **Container**: `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24`

### Components

**SectionHeading** (L156)
- "Other products"
- `max-w-xl text-white`

**List** (L157–160)
- `border-t border-white/15`
- Each: `<RelatedProductRow key={item.id} item={item} />`

**Note** (L161–165)
- If `product.note` exists: small text, relaxed, white/60

**CTA** (L166–170)
- "Discuss this product" → `/contact`

---

## RelatedProductRow (L234–281)

### GSAP Animation (L237–264)

**Setup**:
- `cover` div (absolute inset-0, white BG) starts at `yPercent: -100`
- On hover/focus: slides down to `yPercent: 0`
- On leave/blur: slides up to `yPercent: -100`
- Duration: 0.6s, ease: power2.out

### Layout (L268–279)

**Link** (L269)
- `border-b border-white/15`
- Focus-visible outline: 2px white, offset -2px

**Two Layers**
- Rest state: `<RelatedProductCopy tone="rest" />`
- Cover state: `<RelatedProductCopy tone="cover" />` (absolute, slides)

### RelatedProductCopy (L283–305)

**Grid** (L288)
- `grid gap-2 py-6 sm:grid-cols-12 sm:gap-6 sm:py-7`
- If cover: `h-full bg-white`

**Left (sm:col-span-4)** — L289–295
- `item.title`
- `text-lg sm:text-xl font-medium tracking-tight`
- Rest: white; Cover: black

**Right (sm:col-span-8)** — L296–302
- `item.opening`
- `text-base font-light leading-relaxed`
- Rest: `text-[#B3B3B3]`; Cover: `text-black/70`

---

## Data Sources

### Product Config

```tsx
type ProductOffer = {
  id: string;
  title: string;
  headline?: string;
  navLabel?: string;
  opening: string;
  audience: string;
  eligibility: string;
  journeyId: string;
  features: string[];
  difference: string;
  diagram?: StrategyDiagram;
  note?: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
};

type StrategyDiagram = {
  kind: 'stack' | 'flow';
  steps: Array<{
    kicker: string;
    title: string;
  }>;
};
```

### Functions (from `products.ts`)

- `getProductById(id)` — fetch product config
- `getProductChildren(id)` — sub-offerings
- `getRelatedProducts(id)` — peer products
- `getPillarById(id)` — solution pillar
- `getPillarPageHref(id)` — pillar route

---

## Clone Checklist

1. **New product config**: Add to `src/data/products.ts`
   - Provide all required fields: `id`, `title`, `opening`, `audience`, `eligibility`, `journeyId`, `features`, `difference`, `path`, SEO fields
2. **Route**: Add in `App.tsx`:
   ```tsx
   <Route path="solutions/new-product" element={<ProductPage productId="new-product" />} />
   ```
3. **Related products**: Update relation logic in `getRelatedProducts()`
4. **Children**: If sub-offerings exist, add to `getProductChildren()` logic
5. **Journey link**: Ensure `journeyId` maps to a valid pillar in `solutions-pillars.ts`
6. **Diagram**: Optional; provide `diagram` object with `kind` + `steps` array
7. **Note**: Optional; add `note` string for disclaimers
8. **SEO**: Provide `seoTitle`, `seoDescription`, `keywords`
9. **Images**: Update product images in public assets if needed

---

## Motion & Interaction

- **ScrollFade**: Hero, metadata, features, difference, children, related
- **ScrollColorText**: Animated text color transition on scroll (difference section)
- **RelatedProductRow slide**: White cover slides down on hover/focus (GSAP)
- **PrefersReducedMotion**: GSAP respects `prefersReducedMotion()`

---

## Design System Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000000` | Page base |
| Card surface | `#1D1D1D` | Diagram steps |
| Text primary | `#FFFFFF` | Headings, features |
| Text secondary | `#B3B3B3` | Body copy, metadata |
| Text muted | `#757575` | Eyebrows (via white/60 opacity) |
| Border | `white/15` | Section dividers |
| Hover BG | `white` | Related product cover |

---

## Redirects Table (from App.tsx L40–53)

| Old Path | New Path | Type |
|----------|----------|------|
| `/solutions/equity-broking` | `/solutions` | Navigate replace |
| `/solutions/retail-broking` | `/solutions` | Navigate replace |

(No redirects for product pages; legacy paths are removed)

---

**Version**: 2026-10-30  
**Files**: 2 (ProductPage wrapper + ProductOfferPage template)  
**Lines**: ProductPage 33 + ProductOfferPage 305 = 338 total  
**Products using this template**: 6 (equity, equity-baskets, options-baskets, passive-income-strategy, nifty-50-hedging, investment-advisory)
