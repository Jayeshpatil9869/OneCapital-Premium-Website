# 15 — Design System Page

## Overview

Internal component laboratory and documentation hub. Showcases motion primitives, UI components, effects, and the full component registry. Not intended for public production.

---

## Route

- **Path**: `/design-system`
- **Component**: `src/pages/DesignSystem.tsx`

---

## Source Files

- `src/pages/DesignSystem.tsx` (L1–314)
- `src/lib/component-registry.ts` (component catalog)
- `src/lib/motion.ts` (motion tokens)
- All showcased components imported from `src/components/*`

---

## Page Structure (Full Section Map)

```tsx
<div className="w-full pb-24">
  {/* 1. Hero Section */}
  {/* 2. Motion Tokens */}
  {/* 3. Buttons */}
  {/* 4. Cards & Spotlight */}
  {/* 5. Reveal on Scroll */}
  {/* 6. Metric Strip */}
  {/* 7. Marquee */}
  {/* 8. Accordion / FAQ */}
  {/* 9. Mini Hero Demo (HeroEditorial) */}
  {/* 10. CTA Band */}
  {/* 11. Component Registry */}
</div>
```

---

## 1. Hero Section (L38–64)

### Layout

- **Section**: `border-b border-white/10 overflow-hidden`
- **Container**: `relative z-10 pt-16`

### Background (L39)

- `<GridBackground />` (effect component)

### Components (L41–63)

**Eyebrow** (L41)
- "Internal · Design System"

**DisplayHeading** (L42–44)
- `ONE CAPITAL` + gray span: "component lab."

**BodyText** (L45–50)
- Max-w-2xl description
- Mentions: React, Tailwind, GSAP, Lenis

**Button Row** (L51–62)
- "Back to site" → `/` (secondary, arrow right)
- "Jump to registry" (ghost, scroll to `#registry`)

---

## 2. Motion Tokens (L67–91)

### Layout

- **Section**: `pad="md"`
- **Container**: standard

### Components

**SectionHeading** (L69)
- "Motion tokens"

**Grid** (L70)
- `grid grid-cols-1 md:grid-cols-3 gap-6`

### 3 Surface Cards (L71–89)

**Duration** (L71–76)
- `<Surface className="p-6">`
- Label: "Duration"
- Pre: `JSON.stringify(motionTokens.duration, null, 2)`

**Ease** (L77–82)
- Label: "Ease"
- Pre: `JSON.stringify(motionTokens.ease, null, 2)`

**Stagger** (L83–88)
- Label: "Stagger"
- Pre: `JSON.stringify(motionTokens.stagger, null, 2)`

**Styling**:
- Font: mono, text-sm
- Text: white/70
- Whitespace: pre-wrap

---

## 3. Buttons (L95–122)

### Layout

- **Section**: `tone="panel"` (dark gray surface)
- **Container**: standard

### Components

**SectionHeading** (L97)
- "Buttons"

**BodyText** (L98–102)
- Max-w-2xl, text-text-muted
- Explains shaped variants, flair on hover
- Notes `text` variant is plain inline link

**Button Showcase** (L103–121)
- `flex flex-wrap gap-4 items-center`

**7 Variants**:
1. `primary` — arrow right
2. `secondary` — arrow up-right
3. `magnetic` — arrow right
4. `outline`
5. `pill` (size sm)
6. `glow`
7. `text` — arrow up-right

---

## 4. Cards & Spotlight (L126–155)

### Layout

- **Section**: `pad="md"`
- **Container**: standard

### Components

**SectionHeading** (L128)
- "Cards & spotlight"

**BentoGrid** (L129)
- `columns={3}`

### 3 BentoItems (L130–153)

#### 1. Spotlight Card (L130–137)

- `size="lg"` (larger grid cell)
- `<Card variant="spotlight" className="h-full min-h-[240px] p-10">`
- Eyebrow: "Spotlight"
- Title: "Pointer-lit glass"
- Description: Move across surface, illumination follows

#### 2. Feature Card (L139–145)

- Standard size
- `<Card variant="feature">`
- Title: "Feature"
- Description: Composable slots for marketing blocks
- Meta: "Variant · feature"

#### 3. Magnetic Card (L146–152)

- Wrapped in `<Magnetic>` component
- `<Card variant="bento">`
- Title: "Magnetic card"
- Description: Subtle pull toward cursor on fine pointers

---

## 5. Reveal on Scroll (L159–167)

### Layout

- **Section**: `tone="light"` (white background)
- **Container**: standard

### Components

**RevealOnScroll** wrapper (L160–166):
- SectionHeading: "Reveal on scroll" (text-black)
- Paragraph: "Shared GSAP/ScrollTrigger primitive — respects prefers-reduced-motion."

---

## 6. Metric Strip (L169–178)

### Component

`<MetricStrip metrics={...} />` (L169–177)

**4 Metrics**:
1. Components: `String(componentRegistry.length)`
2. Categories: `String(categories.length)`
3. Motion engine: "GSAP"
4. Scroll: "Lenis"

---

## 7. Marquee (L180–194)

### Layout

- **Section**: `border-y border-white/10 overflow-hidden`

### Component

`<InfiniteMarquee speed="slow" className="py-6">` (L181–192)

**6 Words**: Wealth, Continuity, Discipline, Mandate, Legacy, Precision

Each:
- `text-2xl md:text-4xl font-medium tracking-tight text-white/30 uppercase`
- Separator: `mx-8 text-white/10 —`

---

## 8. Accordion / FAQ (L197–219)

### Layout

- **Section**: `pad="md"`
- **Container**: `narrow`

### Components

**SectionHeading** (L199)
- "Accordion / FAQ"

**Accordion** (L200–217)

**3 Items**:
1. Why GSAP instead of Framer Motion?
2. How do I add a new component?
3. Is /design-system public?

---

## 9. Mini Hero Demo (L222–254)

### Component

`<HeroEditorial>` (L222–253)

**Props**:
- `className="min-h-[70vh] border-t border-white/10"`
- `eyebrow="Hero · Editorial"`
- `title`: "Compose pages" + gray span "from the system."
- `description`: Explains HeroEditorial wires eyebrow, display type, body, CTAs, visual
- `actions`: 2 buttons (primary → `/contact`, text → `/solutions`)
- `visual`: Spotlight + Surface with Noise effect, Label + paragraph (L243–251)

---

## 10. CTA Band (L256–269)

### Component

`<CtaBand>` (L256–268)

**Props**:
- `title="Start composing."`
- `description="Use the registry below as the source of truth for AI agents and humans."`
- `action`: Button → "Open registry" (scrolls to `#registry`)

---

## 11. Component Registry (L272–314)

### Layout

- **Section**: `id="registry"`, `border-t border-white/10`
- **Container**: standard

### Header (L275–280)

**SectionHeading** (L275)
- "Component registry"

**BodyText** (L276–279)
- `{componentRegistry.length} registered building blocks across {categories.length} categories.`

### Registry Loop (L281–305)

**Stack** `gap="xl"` (L281):

**For each category** (L282–304):
- Label: capitalize category name (L283)
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-4` (L284)

**For each entry** (L285–301):
- `<Surface className="p-6 flex flex-col gap-3">`

**Entry Fields**:
1. **Name + Performance** (L287–291)
   - `text-lg font-medium tracking-tight`
   - Performance badge: `text-[10px] uppercase tracking-widest font-mono text-white/40`
2. **Description** (L292–294)
   - `text-sm text-text-muted leading-relaxed`
3. **Usage** (L295–297)
   - Code: `text-xs font-mono text-white/50 break-all`
4. **Path** (L298)
   - `text-xs text-white/30 font-mono`
5. **A11y** (L299)
   - `text-xs text-text-muted`

### Footer (L306–312)

**Paragraph** (L306)
- "Lab only — return home." (link to `/`)

---

## Data Sources

### Motion Tokens (L29)

```ts
import { motionTokens } from '@/src/lib/motion';

motionTokens = {
  duration: { fast, base, slow },
  ease: { power, back, elastic, expo },
  stagger: { tight, base, loose }
};
```

### Component Registry (L26–27)

```ts
import {
  componentRegistry,
  componentRegistryByCategory,
} from '@/src/lib/component-registry';

componentRegistry: Array<{
  name: string;
  category: string;
  description: string;
  usage: string;
  path: string;
  performance: string;
  a11y: string;
}>;

componentRegistryByCategory: Record<category, componentRegistry[]>;
```

**Categories** (L31–33):
```ts
const categories = Object.keys(componentRegistryByCategory) as Array<
  keyof typeof componentRegistryByCategory
>;
```

---

## Clone Checklist

This page is not meant to be cloned — it's a single internal lab. To add a new demo:

1. **Import component**: Add to imports (L1–22)
2. **Create section**: Copy structure from existing sections
3. **Add to registry**: Update `lib/component-registry.ts` if new primitive
4. **Motion tokens**: Update `lib/motion.ts` if new token added
5. **Navigation**: Update jump links if section added

---

## Motion & Interaction

- **RevealOnScroll**: Multiple sections (hero, reveal demo, registry header)
- **Magnetic**: Card hover (subtle pull)
- **Spotlight**: Pointer-lit illumination (no continuous RAF)
- **InfiniteMarquee**: Smooth scroll loop
- **Accordion**: Single-open mode
- **Button flair**: GSAP pointer-tracked stroke on shaped variants

---

## Design System Palette

**Black Theme**:
- Background: `#000000`
- Panel: `#1A1A1A` (tone="panel")
- Text primary: `#FFFFFF`
- Text muted: `white/70`, `white/40`
- Border: `white/10`

**Light Theme** (Reveal section):
- Background: `#FFFFFF`
- Text: `black`

**Surfaces**:
- Default: dark gray
- Code: `font-mono text-white/50`

---

## Dependencies

- React (`useState`, `useEffect` not used here)
- React Router (`Link`)
- Lucide icons (not heavily used, except in demos)
- GSAP + Lenis (via motion primitives)
- Tailwind utility classes
- Custom components: all UI, motion, effects from `src/components/*`

---

**Version**: 2026-10-30  
**Lines**: 314  
**Purpose**: Internal component catalog and motion primitive showcase  
**Public access**: Not recommended (gate or remove in production)
