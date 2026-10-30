# Approach Page Specification

**Route:** `/approach`  
**Page File:** `src/pages/Approach.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Page Composition (Ordered)

1. **Hero Section** — Centered heading + description (RevealOnScroll)
2. **Horizontal Scroll Section** — GSAP horizontal scroll with 5 pinned panels (desktop only)
3. **Differences Section** — Grid of 5 ordered items

---

## Section Details

### 1. Hero Section
**Surface:** Black (no explicit background; inherits from page wrapper)  
**Motion Wrapper:** RevealOnScroll (trigger="load")

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | Component `<Section pad="lg">` with `pt-28 md:pt-32` | Padding-top 112px→128px | Uses ui/Section with "lg" pad variant |
| Container | Component `<Container>` with `flex flex-col items-center text-center` | — | Centered column layout |
| RevealOnScroll Wrapper | `max-w-3xl flex flex-col items-center gap-5` | Max 768px, gap 20px | Centers content with vertical gap |
| Eyebrow | Component `<Eyebrow centered>` | — | "Our Approach" label from ui/ |
| DisplayHeading | Component `<DisplayHeading>` with `text-white` | — | Two-line heading from ui/ |
| Heading Line 2 | `text-white/40` | — | Faded second line: "Discipline." |
| BodyText | Component `<BodyText>` with `max-w-2xl text-base md:text-lg` | Max 672px, 16px→18px | From ui/ |

**Copy Source:** Static strings in component ("Research. Strategy.", "Discipline.", description paragraph)  
**Clone Notes:** RevealOnScroll wraps entire content block (trigger="load", single reveal). Heading is two-line with second line faded. BodyText is centered and constrained to max-w-2xl.

---

### 2. Horizontal Scroll Section (GSAP Pinned)
**Surface:** `bg-[#1D1D1D]` with white/10 border-top/bottom  
**Motion Wrapper:** GSAP ScrollTrigger horizontal scrub (desktop ≥1024px only)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Container (pin target) | `flex w-full items-center overflow-hidden border-y border-white/10 bg-[#1D1D1D] lg:h-dvh` | Height = viewport (desktop only) | Ref: containerRef |
| Track (scroll wrapper) | `flex w-full flex-col lg:w-max lg:flex-shrink-0 lg:flex-row` | Width = max-content (desktop) | Ref: scrollWrapperRef; `will-change-transform` |
| **Each Panel** (5 panels) | `h-auto w-full px-6 py-16 md:px-10 md:py-24 lg:h-[70dvh] lg:w-[68vw] lg:min-w-[32rem] lg:px-16 lg:py-0` | Mobile: full-width, padding 24px→40px, vertical 64px→96px; Desktop: height 70vh, width 68vw, min 512px, padding 64px, no vertical padding | Class: `approach-step`; border-b border-white/5 on mobile (last:border-0), border-r on desktop (lg:border-b-0) |
| Panel Inner | `flex w-full max-w-2xl flex-col items-center px-1 text-center lg:items-start lg:text-left` | Max 672px, padding 4px | Centered on mobile, left-aligned on desktop |
| Number Display | `text-[clamp(4.5rem,14vw,11rem)] leading-none font-medium tracking-tighter text-white/[0.4] mix-blend-screen` | Fluid 72px→176px, opacity 40% | Pointer-events-none; decorative large number |
| Panel Heading | Component `<SectionHeading>` with `mb-8 text-white uppercase` | Margin-bottom 32px | From ui/; uppercase |
| Divider | `h-px w-12 bg-white/20 mb-8` | Height 1px, width 48px, margin-bottom 32px | aria-hidden decorative bar |
| Description | Component `<BodyText>` with `text-base md:text-lg lg:text-xl` | 16px→18px→20px | From ui/ |

**Data Source:** `STEPS` array (5 objects with num, title, desc)  
**GSAP Logic (desktop ≥1024px, non-reduced-motion):**
- Trigger: containerRef (pin target)
- Pin: true (pins container during scroll)
- Scrub: true (smooth scroll-linked animation)
- Snap: `1 / (STEPS.length - 1)` (snaps to each panel; 1/4 for 5 panels)
- End: `+=${track.scrollWidth - pin.clientWidth}` (track scroll distance)
- Animation: `gsap.to(track, { x: () => -getTravel(), ease: 'none' })` (translates track left)
- Invalidate on Refresh: true (recalculates on resize)
- Anticipate Pin: 1 (smoother pinning)

**Clone Notes:** Mobile stacks panels vertically with borders. Desktop pins container at full viewport height and scrolls panels horizontally. Track width is sum of all panel widths (68vw each). Each panel is 68vw to ensure overlap between panels (not exactly 20vw per panel for 5 panels). Horizontal scroll only activates on ≥1024px and `!prefersReducedMotion()`. On resize, GSAP context reverts and re-inits.

---

### 3. Differences Section
**Surface:** Black (inherits from page wrapper) with white/10 border-top  
**Motion Wrapper:** ScrollFade per item (delay index*0.08s)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | Component `<Section pad="lg">` with `border-t border-white/10` | — | Uses ui/Section with "lg" pad variant |
| Container | Component `<Container>` | — | Standard container from ui/ |
| ScrollFade Wrapper (header) | — | — | Wraps Eyebrow + SectionHeading |
| Eyebrow | Component `<Eyebrow>` | — | "How One Capital is different" |
| SectionHeading | Component `<SectionHeading>` with `mt-4 max-w-3xl text-white` | Margin-top 16px, max 768px | From ui/ |
| Ordered List | `mt-12 grid gap-10 md:grid-cols-2` | Margin-top 48px, gap 40px | 2-col grid on medium+ |
| **List Item** | Component `<ScrollFade as="li">` with `border-t border-white/10 pt-6` | Top border, padding-top 24px | Each item wrapped in ScrollFade (delay index*0.08s) |
| Item Number | `font-mono text-xs tracking-widest text-text-muted` | 12px text | Zero-padded 2-digit index (01, 02, etc.) |
| Item Title (H3) | `mt-3 text-2xl font-medium tracking-tight text-white` | Margin-top 12px, 24px | — |
| Item Body | Component `<BodyText>` with `mt-3 text-base md:text-lg` | Margin-top 12px, 16px→18px | From ui/ |

**Data Source:** `DIFFERENCES` array (5 objects with title, body)  
**Clone Notes:** Ordered list (ol, not ul). Each item is a ScrollFade with staggered delay (index * 0.08s). Item number uses `String(index + 1).padStart(2, '0')` for zero-padding. Title is H3. Body is BodyText component.

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top; height factored into hero pt-28 (112px).
- **Footer:** Appended after all sections; not controlled by Approach.tsx.
- **Global Wrapper:** Page wrapper is `<div className="w-full min-w-0">` from Approach.tsx top-level.
- **SEO:** usePageSeo with title, description, path, keywords, type='website' (no jsonLd).
- **GSAP Cleanup:** `useLayoutEffect` returns cleanup that removes ScrollTriggers and reverts context. Resize listener re-inits GSAP on viewport change.

---

## Typography Scale

| Element | Mobile | Small | Medium | Large | Notes |
|---------|--------|-------|--------|-------|-------|
| Hero DisplayHeading | (from ui/) | — | — | — | Defined in ui/DisplayHeading component |
| Hero BodyText | 16px | — | 18px | — | text-base md:text-lg |
| Panel Number | 72px→176px fluid | — | — | — | clamp(4.5rem, 14vw, 11rem) |
| Panel SectionHeading | (from ui/) | — | — | — | Uppercase, defined in ui/SectionHeading |
| Panel BodyText | 16px | — | 18px | 20px | text-base md:text-lg lg:text-xl |
| Differences Title | 24px | — | — | — | text-2xl |
| Differences BodyText | 16px | — | 18px | — | text-base md:text-lg |

---

## Motion Details

| Component | Trigger | Duration | Delay | Notes |
|-----------|---------|----------|-------|-------|
| Hero Block | load | default | 0s | RevealOnScroll (single reveal, all children) |
| Horizontal Panels | scroll | continuous (scrub) | — | GSAP ScrollTrigger pin + x translate; snap to panels |
| Differences Header | scroll | default | 0s | ScrollFade |
| Differences Items | scroll | default | index*0.08s | ScrollFade stagger per item |

**GSAP Horizontal Scroll:**
- Desktop only (≥1024px)
- Reduced-motion: skips GSAP, shows all panels stacked vertically
- Track translates `x: -getTravel()` where getTravel = `Math.max(0, track.scrollWidth - pin.clientWidth)`
- Smooth scrub (scrub: true)
- Snap to each panel (snap: 1/(STEPS.length-1))
- Pins container at viewport height (lg:h-dvh)
- Cleanup on unmount and resize

---

## Clone Checklist

- [ ] Hero uses ui/ components: Section, Container, Eyebrow, DisplayHeading, BodyText
- [ ] Horizontal scroll only activates on desktop ≥1024px and `!prefersReducedMotion()`
- [ ] Track is `will-change-transform` for performance
- [ ] Each panel is 68vw wide (not exact 1/5 of viewport) to create overlap effect
- [ ] Panel inner content centers on mobile, left-aligns on desktop
- [ ] GSAP context reverts on unmount and resize
- [ ] Differences section uses ordered list (ol, not ul)
- [ ] Differences items have ScrollFade with staggered delay (index * 0.08s)
- [ ] Item numbers are zero-padded (01, 02, etc.)
- [ ] All components (Eyebrow, SectionHeading, BodyText) imported from ui/
- [ ] SEO includes keywords array with relevant terms
- [ ] GSAP ScrollTrigger.refresh() called after resize setup
- [ ] Panel numbers are decorative (pointer-events-none, mix-blend-screen)
- [ ] Mobile panels have border-bottom (last:border-0), desktop panels have border-right
