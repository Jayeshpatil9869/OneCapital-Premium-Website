# Contact Page Specification

**Route:** `/contact`  
**Page File:** `src/pages/Contact.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Page Composition

Single section with two-column grid (info panel + form panel).

---

## Section Details

### Contact Section
**Surface:** Black base with radial gradient glows  
**Motion Wrapper:** ScrollFade per panel (delays 0.05s, 0.15s)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | Component `<Section pad="none">` with complex padding/bg classes | — | Outer section container |
| Section Classes | `relative min-h-[90svh] overflow-x-clip bg-black pb-[...] pt-[calc(6.5rem+env(safe-area-inset-top))] sm:pb-20 sm:pt-44 md:pb-24 md:pt-48 lg:pb-28 lg:pt-52` | Min-height 90vh, top 104px+safe-area, bottom 64px→80px→96px→112px | Safe-area aware complex padding |
| **Ambient Glow 1** (top center) | `absolute left-1/2 top-[-8%] h-[min(70vh,42rem)] w-[min(100vw,56rem)] -translate-x-1/2` | Top -8%, height min(70vh, 672px), width min(100vw, 896px), centered | Radial gradient white/14→white/5→transparent (0%→35%→70%), blur-2xl |
| **Ambient Glow 2** (top linear) | `absolute inset-x-0 top-0 h-[min(28rem,55vw)]` | Height min(448px, 55vw) | Linear gradient white/4→transparent (0%→55%), top-to-bottom |
| **Watermark** | `absolute inset-x-0 top-16 sm:top-20 md:top-28 z-0` | Top 64px→80px→112px | Large decorative text |
| Watermark Text | `text-[clamp(3.75rem,18vw,16rem)] font-extrabold uppercase leading-none tracking-[0.05em] text-white/[0.06]` | Fluid 60px→256px, opacity 6% | "CONNECT" or similar; pointer-events-none, select-none |
| Container | `relative z-10` | — | Standard Container from ui/, z-index above background |
| **Ambient Glow 3** (right card glow) | `absolute right-0 sm:right-[5%] top-[8%] -z-10 size-[min(31.25rem,85vw)]` | Right 0→5%, top 8%, size min(500px, 85vw) | Radial gradient white/6→white/2→transparent (0%→40%→70%), blur-[80px] |
| Grid | `grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-16` | Gap 32px→40px→48px→48px→64px | 2-col on desktop |
| **Left Panel** | ScrollFade delay={0.05} className="min-w-0" | — | ContactInfoPanel component |
| **Right Panel** | ScrollFade delay={0.15} className="min-w-0" | — | ContactFormPanel component |

**Copy Source:** `CONTACT_PAGE_COPY` from `src/data/contact`  
**Clone Notes:** Three ambient glow layers (two at top, one behind form card). Watermark is large decorative text (pointer-events-none, aria-hidden). Grid is 1-col mobile, 2-col desktop. Panels are separate components.

---

### ContactInfoPanel
**Component:** `src/components/sections/contact/ContactInfoPanel.tsx`  
**Surface:** Transparent (cards have glass styling)  
**Motion Wrapper:** RevealOnScroll per block (delays 0, 0.1)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Outer Wrapper | `flex flex-col gap-8 sm:gap-10 md:gap-12 lg:sticky lg:top-32 lg:gap-14 xl:gap-16` | Gap 32px→40px→48px→56px→64px | Sticky on desktop (top 128px) |
| **Header Block** | RevealOnScroll className="flex flex-col gap-4 sm:gap-5 md:gap-6" | Gap 16px→20px→24px | Eyebrow + heading + subtext |
| Eyebrow Pill | `inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5` | Padding 14px horizontal, 6px vertical | CircleHelp icon + label |
| Eyebrow Icon | `h-4 w-4 text-white/70` | 16×16px | CircleHelp from lucide-react |
| Eyebrow Label | `font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/80` | 11px→12px | "Get in touch" or similar |
| Heading (H1) | `text-[clamp(2rem,8vw,3.75rem)] font-bold tracking-tight text-white` | Fluid 32px→60px | clamp(2rem, 8vw, 3.75rem) |
| Subtext | `max-w-md text-sm sm:text-base leading-relaxed text-[#B3B3B3]` | Max 448px, 14px→16px | Description text |
| **Detail Cards** | RevealOnScroll delay={0.1} className="flex flex-col gap-3 sm:gap-4 md:gap-5" | Gap 12px→16px→20px | List of ContactDetailCard components |

**Detail Card Layout:**

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Card (link or div) | `group relative flex w-full min-h-[3.25rem] items-center justify-between gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-[#1D1D1D] px-4 py-4 sm:px-5 sm:py-[1.125rem]` | Min-height 52px, border-radius 16px, padding 16px→20px, vertical 16px→18px | Glass card, hover effects |
| Top Rim Highlight | `absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent` | Height 1px | Specular highlight, opacity 60%→100% on hover |
| Ambient Corner Glow | `absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/[0.03] blur-2xl` | Right/top -32px, 112×112px | Hover: bg-white/[0.09] |
| Icon Container | `h-11 w-11 sm:h-12 sm:w-12 rounded-xl border border-white/12 bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-transparent` | 44×44px→48×48px, border-radius 12px | Shadow inset, hover effects |
| Icon | `h-5 w-5` | 20×20px | strokeWidth={1.75} from lucide-react |
| Label | `text-sm sm:text-base font-semibold tracking-tight text-white` | 14px→16px | Detail label (Phone, Email, etc.) |
| Primary Line | `text-xs sm:text-sm text-[#B3B3B3]` | 12px→14px | Main contact info (phone number, email address) |
| Secondary Lines | `text-xs text-[#757575] leading-relaxed` | 12px | Additional info (office hours, address lines) |
| Arrow Icon (if link) | `h-4 w-4` from ArrowUpRight | 16×16px | Translates on hover (0.5px right, -0.5px up) |

**Data Source:** `CONTACT_DETAILS` array from `src/data/contact`  
**Clone Notes:** Each detail is either a link (`<a>`) or div (if no href). Cards have specular top rim highlight and ambient corner glow. Icon container has gradient background. Secondary lines joined with comma separator.

---

### ContactFormPanel
**Component:** `src/components/sections/contact/ContactFormPanel.tsx`  
**Surface:** ContactSurface wrapper (glass card)  
**Motion Wrapper:** RevealOnScroll delay={0.2}

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Outer Wrapper | RevealOnScroll delay={0.2} className="w-full" | — | Wraps ContactSurface |
| ContactSurface | (Defined in ContactSurface.tsx) | — | Glass card wrapper |
| **Success State** | `flex min-h-[min(22rem,70svh)] sm:min-h-[400px] flex-col items-center justify-center gap-5 sm:gap-6 py-12 sm:py-16 text-center` | Min-height 352px or 70vh→400px, padding 48px→64px | role="status" for screen readers |
| Success Icon Container | `h-14 w-14 sm:h-16 sm:w-16 rounded-full border border-white/15 bg-white/[0.05]` | 56×56px→64×64px, border-radius 9999px | CheckCircle2 icon |
| Success Icon | `h-7 w-7 sm:h-8 sm:w-8` | 28×28px→32×32px | strokeWidth={2} |
| Success Heading | Component `<SectionHeading as="h2">` with `mb-3 text-xl sm:text-2xl` | Margin-bottom 12px, 20px→24px | From ui/ |
| Success Message | `mx-auto max-w-sm text-sm leading-relaxed text-white/60` | Max 384px, 14px | Description text |
| Submit Another Button | `mt-2 sm:mt-4 min-h-11 font-mono text-[10px] uppercase tracking-widest` | Margin-top 8px→16px, min-height 44px, 10px | variant="outline" size="sm" |
| **Form State** | `flex flex-col gap-5 sm:gap-6` | Gap 20px→24px | Form fields |
| Form Heading | Component `<SectionHeading as="h2">` with `mb-6 sm:mb-8 text-xl sm:text-2xl md:text-3xl` | Margin-bottom 24px→32px, 20px→24px→30px | From ui/ |
| InputField | Component `<InputField>` | — | Full-width text/email/tel inputs from ui/ |
| Email/Phone Row | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6` | Gap 20px→24px | 2-col on small, 1-col on large (responsive to parent width) |
| SelectField | Component `<SelectField>` | — | Dropdown select from ui/ |
| TextareaField | Component `<TextareaField>` with `rows={4}` | — | Multi-line textarea from ui/ |
| Submit Button | Component `<Button>` with `min-h-12 w-full justify-center py-3.5 sm:py-4 text-base` | Min-height 48px, padding 14px→16px, 16px | variant="primary" size="lg", type="submit" |
| Confidentiality Note | `px-1 text-center font-mono text-[10px] uppercase leading-relaxed tracking-widest text-white/40` | Padding 4px, 10px | Below button |

**State Management:**
- `submitted` state: `useState(false)`

**Form Logic:**
```tsx
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  setSubmitted(true);
};
```

**Copy Source:** `CONTACT_PAGE_COPY`, `CONTACT_FORM_PLACEHOLDERS`, `CONTACT_INTEREST_OPTIONS` from `src/data/contact`  
**Clone Notes:** Form toggles between form view and success view. Form uses HTML5 validation (required fields, email type). No actual submission (just state toggle). Email/phone row stacks on mobile, side-by-side on desktop (but stacks again on large tablet in 2-col layout, then side-by-side on xl). All form components (InputField, SelectField, TextareaField, Button) from ui/. ContactSurface is a separate glass-card wrapper component.

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top; height factored into pt-[calc(6.5rem+...)].
- **Footer:** Appended after section; not controlled by Contact.tsx.
- **Global Wrapper:** Section is self-contained within page file; no explicit page wrapper div.
- **SEO:** Not explicitly set in Contact.tsx (no usePageSeo or useEffect). Likely relies on Layout/App-level default or should be added.

---

## Typography Scale

| Element | Mobile | Small | Medium | Large | Notes |
|---------|--------|-------|--------|-------|-------|
| Watermark | 60px→256px fluid | — | — | — | clamp(3.75rem, 18vw, 16rem) |
| Info Heading | 32px→60px fluid | — | — | — | clamp(2rem, 8vw, 3.75rem) |
| Info Subtext | 14px | 16px | — | — | text-sm sm:text-base |
| Detail Label | 14px | 16px | — | — | text-sm sm:text-base |
| Detail Primary | 12px | 14px | — | — | text-xs sm:text-sm |
| Detail Secondary | 12px | — | — | — | text-xs |
| Form Heading | 20px | 24px | 30px | — | text-xl sm:text-2xl md:text-3xl |
| Form Fields | (from ui/ components) | — | — | — | Defined in InputField, SelectField, TextareaField |
| Submit Button | 16px | — | — | — | text-base |

---

## Motion Details

| Component | Trigger | Delay | Notes |
|-----------|---------|-------|-------|
| Info Panel | scroll | 0.05s | ScrollFade from page |
| Form Panel | scroll | 0.15s | ScrollFade from page |
| Info Header Block | scroll | 0s | RevealOnScroll in component |
| Info Detail Cards | scroll | 0.1s | RevealOnScroll in component |

Panels wrapped in ScrollFade at page level (staggered delays). Within ContactInfoPanel, header and cards have separate RevealOnScroll triggers.

---

## Clone Checklist

- [ ] Three ambient glow layers (two top, one right)
- [ ] Watermark is decorative (pointer-events-none, aria-hidden, select-none)
- [ ] Info panel sticky on desktop (lg:sticky lg:top-32)
- [ ] Detail cards are links if href exists, plain divs otherwise
- [ ] Detail cards have specular top rim highlight (gradient)
- [ ] Detail cards have ambient corner glow (hover effect)
- [ ] Icon containers have gradient background (from-white/12 via-white/5)
- [ ] Arrow icon translates on hover (0.5px right, -0.5px up)
- [ ] Form uses HTML5 validation (required, email type)
- [ ] Form toggles to success state on submit (no API call)
- [ ] Email/phone row is responsive (1-col mobile, 2-col small, 1-col large, 2-col xl)
- [ ] All form components from ui/ (InputField, SelectField, TextareaField, Button)
- [ ] ContactSurface wrapper component for glass card styling
- [ ] Success state has role="status" for screen readers
- [ ] Confidentiality note below submit button (uppercase mono)
- [ ] All copy from CONTACT_PAGE_COPY and CONTACT_FORM_PLACEHOLDERS data
- [ ] Interest options from CONTACT_INTEREST_OPTIONS array
- [ ] Detail secondary lines joined with comma separator
- [ ] Form noValidate attribute (uses custom checkValidity)
