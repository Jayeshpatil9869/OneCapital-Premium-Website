# 16 — Not Found (404) Page

## Overview

Minimal 404 error page with centered copy, radial glow background, and two CTAs. Covers all unmatched routes.

---

## Route

- **Path**: `*` (catch-all)
- **Component**: `src/pages/NotFound.tsx`

---

## Source Files

- `src/pages/NotFound.tsx` (L1–50)
- `src/components/ui/*` (Button, Container, Section)
- `src/components/motion/RevealOnScroll.tsx`
- `src/data/company.ts` (COMPANY.brandName)

---

## Page Structure

```tsx
<Section className="relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white">
  {/* Background Glow */}
  {/* Centered Content */}
</Section>
```

---

## Layout (L12–49)

### Section (L12–17)

- **Padding**: `none` (override default)
- **Classes**:
  - `relative flex min-h-[100svh] items-center`
  - `overflow-hidden bg-black text-white`
- **ARIA**: `aria-labelledby="not-found-heading"`

---

### Background Glow (L18–21)

**Div** (L18):
- `pointer-events-none absolute`
- Position: `left-1/2 top-[18%]`
- Size: `h-[min(50vh,28rem)] w-[min(100vw,40rem)]`
- Transform: `-translate-x-1/2`
- Gradient: `bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.03)_40%,transparent_70%)]`
- Blur: `blur-2xl`
- `aria-hidden`

---

### Content Container (L23–48)

**Container** (L23):
- `relative z-10 max-w-[720px]`
- Padding: `py-[max(8rem,env(safe-area-inset-top))] pb-24`

**RevealOnScroll** (L24):
- `trigger="load"` (animates immediately on mount)
- `direction="up"`
- `distance={28}`
- `duration={0.9}`

---

### Copy (L25–35)

**Error Code** (L25–27)
- `p` tag: `font-mono text-xs uppercase tracking-[0.22em] text-white/45`
- "Error 404"

**Heading** (L28–32)
- `h1` tag: `id="not-found-heading"`
- Classes: `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white`
- "This page is not on the map."

**Body** (L33–36)
- `p` tag: `max-w-md text-base sm:text-lg font-light leading-relaxed text-white/65`
- Copy: "The link may be outdated, or the address mistyped. Return home, or reach the {COMPANY.brandName} team directly."

---

### CTAs (L38–46)

**Flex Row** (L38):
- `flex flex-wrap items-center gap-4`

**2 Buttons**:
1. **Primary** (L39–41)
   - "Back to home" → `/`
   - `variant="primary"`, `size="md"`

2. **Ghost** (L42–44)
   - "Contact us" → `/contact`
   - `variant="ghost"`, `size="md"`

---

## SEO (L6–8)

### useEffect

```tsx
useEffect(() => {
  document.title = `Page not found | ${COMPANY.brandName}`;
}, []);
```

**No meta tags** — relies on default layout SEO.

---

## Clone Checklist

This is a terminal error page; rarely needs cloning. To customize:

1. **Copy**: Update heading and body text (L28–36)
2. **Error code**: Change "Error 404" if other HTTP codes needed
3. **CTAs**: Adjust button labels/destinations (L39–44)
4. **Background**: Tweak glow position/size/opacity (L18–21)
5. **Brand**: Ensure `COMPANY.brandName` is imported from `company.ts`

---

## Motion & Interaction

- **RevealOnScroll**: Fade-up on page load (trigger="load")
- **Distance**: 28px travel
- **Duration**: 0.9s
- **No hover effects**: Minimal interactivity (error page)

---

## Design System Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#000000` | Page base |
| Glow center | `white/10` | Radial gradient peak |
| Glow mid | `white/3` | Gradient 40% |
| Text primary | `#FFFFFF` | Heading |
| Text secondary | `white/65` | Body |
| Text muted | `white/45` | Error code |

---

## Accessibility

- **ARIA**: `aria-labelledby` on section points to h1
- **aria-hidden**: Background glow excluded from a11y tree
- **Focus**: Buttons receive default focus styles
- **Screen reader**: Error code + heading + body read in sequence

---

## Responsive

- **Mobile**: `text-4xl` heading, full-width CTAs
- **Tablet**: `text-5xl` heading, inline CTAs
- **Desktop**: `text-6xl` heading, max-w-720px container

---

**Version**: 2026-10-30  
**Lines**: 50  
**Purpose**: Terminal 404 error page for unmatched routes  
**Performance**: Static content, single RevealOnScroll animation
