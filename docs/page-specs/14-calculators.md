# 14 — Calculators (Hub + Shell Pattern)

## Overview

Two-level calculator system:
1. **Calculators Hub** — Bento grid landing page with 5 calculator cards
2. **CalculatorShell** — Reusable template for individual calculator pages

---

## Routes

| Path | Component |
|------|-----------|
| `/calculators` | `Calculators.tsx` (hub) |
| `/calculators/sip` | `SipCalculatorPage.tsx` |
| `/calculators/lumpsum` | `LumpsumCalculatorPage.tsx` |
| `/calculators/step-up-sip` | `StepUpSipCalculatorPage.tsx` |
| `/calculators/swp` | `SwpCalculatorPage.tsx` |
| `/calculators/goal-planning` | `GoalPlanningCalculatorPage.tsx` |

---

## Source Files

**Hub**  
- `src/pages/Calculators.tsx` (L1–216)

**Shell Template**  
- `src/components/calculators/CalculatorShell.tsx` (L1–183)

**Calculator Pages**  
- `src/pages/calculators/SipCalculatorPage.tsx`
- `src/pages/calculators/LumpsumCalculatorPage.tsx`
- `src/pages/calculators/StepUpSipCalculatorPage.tsx`
- `src/pages/calculators/SwpCalculatorPage.tsx`
- `src/pages/calculators/GoalPlanningCalculatorPage.tsx`

**Supporting Components**  
- `src/components/calculators/CalculatorSideNav.tsx` (nav pills)
- `src/components/calculators/CalculatorModeToggle.tsx` (slider, chart, table modes)
- `src/components/calculators/CalculatorResults.tsx` (metric cards)
- `src/components/calculators/CalculatorSlider.tsx` (input control)
- `src/components/calculators/AllocationDonut.tsx` (breakdown viz)

**Data**  
- `src/data/calculators.ts` (card data, FAQs, info sections, disclaimer)

---

## PART 1: Calculators Hub (L1–216)

### Page Structure

```tsx
<div className="flex w-full flex-col items-center">
  {/* 1. Hero Section */}
  {/* 2. Bento Grid */}
</div>
```

---

### 1. Hero Section (L68–85)

#### Layout

- **Section**: `relative overflow-hidden pt-20 pb-6 md:pt-24 md:pb-8`
- **Background**: Radial gradient glow (L70–73)
  - `absolute left-1/2 top-0 h-[min(16rem,40vw)] w-[min(36rem,80vw)]`
  - `bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07)_0%,transparent_70%)] blur-3xl`
- **Container**: `relative z-10 flex flex-col items-center text-center`

#### Components (L76–83)

**RevealOnScroll** wrapper:
- `max-w-2xl flex flex-col items-center gap-2`

**Eyebrow** (L77)
- `<Eyebrow centered>{CALCULATOR_HUB.eyebrow}</Eyebrow>`

**DisplayHeading** (L78–80)
- `text-white uppercase tracking-tight !text-[clamp(1.75rem,4.5vw,2.75rem)]`
- `{CALCULATOR_HUB.title}`

**BodyText** (L81–83)
- `max-w-xl text-xs md:text-sm`
- `{CALCULATOR_HUB.subtitle}`

#### Data (from `calculators.ts`)

```ts
CALCULATOR_HUB = {
  eyebrow: string;
  title: string;
  subtitle: string;
};
```

---

### 2. Bento Grid (L87–107)

#### Layout

- **Section**: `pb-14 md:pb-16`
- **Container**: standard
- **Grid** (L90–95):
  ```tsx
  className={cn(
    'mx-auto grid max-w-6xl grid-cols-1 gap-3.5',
    'md:grid-cols-2 md:gap-4',
    'lg:grid-cols-3 lg:auto-rows-[minmax(11rem,auto)] lg:gap-4',
  )}
  ```

#### Bento Layout (L26–48)

**Fixed layout per slug**:

```ts
const BENTO_LAYOUT: Record<slug, { className, featured? }> = {
  sip: {
    className: 'min-h-[16rem] lg:row-span-2 lg:min-h-full',
    featured: true,
  },
  lumpsum: {
    className: 'min-h-[11rem] lg:col-span-2',
  },
  'step-up-sip': {
    className: 'min-h-[11rem]',
  },
  swp: {
    className: 'min-h-[11rem]',
  },
  'goal-planning': {
    className: 'min-h-[10.5rem] lg:col-span-3',
  },
};
```

**Visual Structure** (L23–25):
```
[ SIP tall   ] [ Lumpsum wide -------- ]
[ SIP tall   ] [ Step Up ] [ SWP      ]
[ Goal Planning full width ----------- ]
```

#### Card Order (L50–56)

```ts
const CARD_ORDER: CalculatorCard['slug'][] = [
  'sip',
  'lumpsum',
  'step-up-sip',
  'swp',
  'goal-planning',
];
```

---

### CalculatorBentoCard (L111–191)

#### Structure (L121–141)

**Link** (L122)
- `to={card.path}`
- `rounded-2xl sm:rounded-[1.25rem] border border-black/10 p-5 sm:p-6`
- `bg-white text-black hover:bg-zinc-50`
- `shadow-[0_12px_40px_rgba(0,0,0,0.35)]`
- Hover: `-translate-y-0.5`, `border-black/20`
- `layout.className` (from BENTO_LAYOUT)

**Top Gradient** (L132–135)
- `absolute inset-x-0 top-0 h-px`
- `bg-gradient-to-r from-transparent via-black/15 to-transparent`

**Glow Effect** (L136–140)
- `absolute -right-8 -top-8 size-28 rounded-full`
- `bg-black/[0.03] blur-3xl`
- Hover: `group-hover:bg-black/[0.05]`

#### Featured Chart Art (L143)

If `layout.featured`:
- `<FeaturedChartArt />` (L194–215)
- SVG: ascending line chart + circle
- `absolute bottom-4 right-3 h-[36%] w-[48%] opacity-[0.16]`
- Hover: `group-hover:opacity-[0.26]`

#### Content (L145–178)

**Top Row** (L146–163)
- Featured tag (if applicable): `text-[9px] font-mono uppercase tracking-[0.18em] text-black/40`
- Title: `text-xl sm:text-2xl` (featured) or `text-base sm:text-lg` (standard)
- Icon: `h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-black/10 bg-zinc-100 text-black/75`
  - Hover: `border-black/20 text-black`

**Description** (L169–177)
- Leading-relaxed, text-pretty
- Featured: `max-w-sm text-sm`
- Standard: `text-xs sm:text-sm line-clamp-2`

#### CTA Button (L180–188)

**ButtonFlair** (L181–186)
- `tone="dark"`, `bg-black px-3.5 py-2 text-[10px] sm:text-xs`
- "Calculate" + ArrowRight icon
- Hover: icon translates 1px right

---

## PART 2: CalculatorShell Template (L1–183)

### Props (L22–38)

```ts
type CalculatorShellProps = {
  slug: CalculatorSlug;
  title: string;
  subtitle: string;
  controls: ReactNode;        // Input sliders/fields
  results: ReactNode;          // Metric cards
  chart?: ReactNode;           // Line/bar chart
  modeToggle?: ReactNode;      // Slider/chart/table tabs
  breakdown?: {                // For donut chart
    invested: number;
    returns: number;
    investedLabel?: string;
    returnsLabel?: string;
  };
  infoSections: CalculatorInfoSection[];
  faqs: CalculatorFaq[];
};
```

---

### Page Structure

```tsx
<div className="flex w-full flex-col items-center">
  {/* 1. Controls + Results Section (Black BG) */}
  {/* 2. Info + FAQ Section (White BG) */}
</div>
```

---

### 1. Controls + Results Section (L54–129)

#### Layout

- **Section**: `bg-black pt-28 md:pt-32 relative`
- **Background Glow** (L56–58):
  - `absolute -right-[8%] top-[12%] h-[min(26rem,48vw)] w-[min(26rem,48vw)]`
  - `bg-[radial-gradient(circle,var(--color-accent-soft)_0%,transparent_70%)] blur-3xl`

#### Header (L60–79)

**Back Link** (L62–67)
- "All calculators" → `/calculators`
- `inline-flex items-center gap-2 text-sm text-white/55 hover:text-white`

**Title Row** (L68–78)
- `flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-12`
- Left: Eyebrow + title + subtitle
  - Title: `font-sans text-[clamp(2.25rem,1.6rem+1.8vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-balance text-white`
  - Subtitle: `max-w-xl text-base font-light text-white/65`
- Right: `<CalculatorSideNav active={slug} />` (nav pills)

#### Grid (L82–126)

**Layout**:
- `grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6 xl:gap-8`

**Left Column (lg:col-span-5 xl:col-span-4)** — L83–102

**Card**:
- `rounded-3xl border border-black/10 bg-white p-6 sm:p-8`
- `shadow-[0_14px_40px_rgba(0,0,0,0.06)]`

**Content**:
- Heading: "Adjust inputs" (xl/2xl, semibold, black)
- `{modeToggle}` (if provided)
- `{controls}` (sliders/inputs)
- CTA: "Talk to an advisor" → `/contact`
  - `w-full !bg-black !text-white hover:!bg-black/90`

**Right Column (lg:col-span-7 xl:col-span-8)** — L104–126

**Card**:
- `rounded-3xl border border-black/10 bg-white p-5 sm:p-7 lg:p-8`
- Top gradient: `absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-muted)] to-transparent`

**Content**:
- `{results}` (metric cards)
- Grid: `grid grid-cols-1 gap-5 xl:grid-cols-12`
  - Chart: full width or `xl:col-span-8` (if breakdown exists)
  - Donut: `xl:col-span-4` (if breakdown provided)

---

### 2. Info + FAQ Section (L131–180)

#### Layout

- **Section**: `border-t border-black/10 bg-white`
- **Container**: `max-w-3xl`

#### Info Sections (L134–153)

**Loop** over `infoSections`:
- Each: `ScrollFade` wrapper
- Title: `text-2xl sm:text-3xl font-medium tracking-tight text-black`
- Paragraphs: `text-base leading-relaxed text-black/60`
- Bullets (if provided): `list-disc space-y-2 pl-5 text-base text-black/60`

#### FAQs (L155–170)

**Condition**: Only if `faqs.length > 0`

**Structure**:
- Title: "Frequently asked questions"
- `<Accordion items={...} />` (maps FAQ array to accordion items)

#### Disclaimer (L172–178)

**Card**:
- `rounded-2xl border border-black/10 bg-[#F4F3F0] p-5`
- `text-sm leading-relaxed text-black/55`
- `{CALCULATOR_DISCLAIMER}` (from `calculators.ts`)

---

## Data Sources

### calculators.ts

**CALCULATOR_CARDS** (array of 5):
```ts
type CalculatorCard = {
  slug: CalculatorSlug;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
};
```

**CALCULATOR_HUB**:
```ts
{ eyebrow, title, subtitle }
```

**CALCULATOR_DISCLAIMER** (string):
- Standard disclaimer for all calculators

**Per-Calculator Data** (exported from `calculators.ts`):
```ts
type CalculatorInfoSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type CalculatorFaq = {
  id: string;
  question: string;
  answer: string;
};
```

---

## Calculator Page Pattern (Individual Pages)

### Example: SipCalculatorPage.tsx

```tsx
import { CalculatorShell } from '@/src/components/calculators/CalculatorShell';
import { CalculatorResults } from '@/src/components/calculators/CalculatorResults';
import { CalculatorSlider } from '@/src/components/calculators/CalculatorSlider';
import { LineChart } from '@/src/components/charts/LineChart';
import { SIP_INFO_SECTIONS, SIP_FAQS } from '@/src/data/calculators';

export default function SipCalculatorPage() {
  const [amount, setAmount] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  // Calculate values...

  return (
    <CalculatorShell
      slug="sip"
      title="SIP Calculator"
      subtitle="Calculate potential returns from monthly investments"
      controls={
        <>
          <CalculatorSlider label="Monthly SIP" value={amount} onChange={setAmount} />
          <CalculatorSlider label="Investment Period" value={years} onChange={setYears} />
          <CalculatorSlider label="Expected Return" value={rate} onChange={setRate} />
        </>
      }
      results={
        <CalculatorResults
          metrics={[
            { label: 'Total Invested', value: invested, format: 'currency' },
            { label: 'Est. Returns', value: returns, format: 'currency' },
            { label: 'Future Value', value: total, format: 'currency' },
          ]}
        />
      }
      chart={<LineChart data={...} />}
      breakdown={{ invested, returns }}
      infoSections={SIP_INFO_SECTIONS}
      faqs={SIP_FAQS}
    />
  );
}
```

---

## Clone Checklist (New Calculator)

1. **Data**: Add card to `CALCULATOR_CARDS` in `calculators.ts`
2. **Info sections**: Export `NEW_CALC_INFO_SECTIONS` array
3. **FAQs**: Export `NEW_CALC_FAQS` array
4. **Page file**: Create `src/pages/calculators/NewCalcPage.tsx`
5. **State**: Use React `useState` for inputs
6. **Calculations**: Implement logic for results
7. **Controls**: Render `<CalculatorSlider>` or custom inputs
8. **Results**: Render `<CalculatorResults>` with metrics
9. **Chart**: Optional `<LineChart>` or `<BarChart>`
10. **Breakdown**: Optional donut data `{ invested, returns }`
11. **Route**: Add to `App.tsx`:
    ```tsx
    <Route path="calculators/new-calc" element={<NewCalcPage />} />
    ```
12. **Bento layout**: Add to `BENTO_LAYOUT` and `CARD_ORDER` in `Calculators.tsx`

---

## Motion & Interaction

- **RevealOnScroll**: Hub hero, bento grid stagger (0.04s)
- **Card hover**: Translate -0.5px, border darken
- **Icon hover**: Border darken, text darken
- **Button arrow**: Translate 1px right on hover
- **Featured chart**: Opacity fade on hover (0.16 → 0.26)
- **ScrollFade**: Info sections, FAQ block

---

## Design System Palette

### Hub (White Cards on Black)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#FFFFFF` | Card base |
| Text primary | `#000000` | Titles |
| Text secondary | `black/55` | Descriptions |
| Text muted | `black/40` | Featured tag |
| Border | `black/10` | Default |
| Border hover | `black/20` | Interactive |
| Shadow | `0_12px_40px_rgba(0,0,0,0.35)` | Card depth |
| CTA BG | `#000000` | Button |

### Shell (Black Section → White Section)

**Black Section**:
- Background: `#000000`
- Cards: `#FFFFFF`
- Text: `white` (headings), `white/65` (body)

**White Section**:
- Background: `#FFFFFF`
- Text: `black` (headings), `black/60` (body)
- Disclaimer: `#F4F3F0` (BG), `black/55` (text)

---

**Version**: 2026-10-30  
**Hub lines**: 216  
**Shell lines**: 183  
**Total calculators**: 5  
**Bento layout**: 3-column responsive grid (1×5 mobile, 2×3 tablet, 3×3 desktop with row spans)
