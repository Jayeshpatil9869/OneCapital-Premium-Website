# About Page Specification

**Route:** `/about`  
**Page File:** `src/pages/About.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Page Composition (Ordered)

1. **AboutHero** — Full viewport hero with background image
2. **AboutStorySection** — Three-column grid story layout (wrapped in ScrollFade)
3. **AboutMissionVision** — Two-card mission/vision section (wrapped in ScrollFade)
4. **AboutCoreValues** — Three-column values grid (wrapped in ScrollFade)

---

## Section Details

### 1. AboutHero
**Component:** `src/components/sections/about/AboutHero.tsx`  
**Surface:** Black base with background image overlay gradients  
**Motion Wrapper:** RevealOnScroll (trigger="load", staggered reveals)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Outer Section | `min-h-[100svh] flex flex-col justify-end` | Min-height = viewport | Full-bleed hero; content anchored to bottom |
| Background Image Container | `absolute inset-0` | Full cover | Contains image + gradient overlays |
| Gradient Overlay | `absolute inset-0` | — | Linear gradient: black→transparent→black (0%→28%→58%→82%→100%) with varying opacity |
| Container | `max-w-[1400px] px-6 sm:px-8 lg:px-12` | Max 1400px, padding 24px→32px→48px | Responsive horizontal padding |
| Top Padding | `pt-[max(7.5rem,env(safe-area-inset-top))]` | 120px minimum | Safe-area aware top spacing |
| Bottom Padding | `pb-14 sm:pb-16 lg:pb-20` | 56px→64px→80px | Graduated bottom spacing |
| Content Wrapper | `flex flex-col gap-8 sm:gap-10 lg:gap-12` | Gap 32px→40px→48px | Vertical stacked headline + description |
| Headline (H1) | `text-[2.5rem] sm:text-6xl lg:text-[4.2rem]` | 40px→60px→67.2px | Bold, tight tracking (-0.03em), leading-[1.02] |
| Description Container | `border-t border-white/15 pt-6 sm:pt-8` | Top border + 24px→32px padding | Divider above text |
| Description | `max-w-[36rem] text-[15px] sm:text-base lg:text-lg` | Max 576px, 15px→16px→18px | Light font-weight, leading-[1.65], text-white/85 |

**Copy Source:** `ABOUT_PAGE.hero` from `src/data/about`  
**Image:** `/images/about-hero-bg.jpg` (object-cover, object-center)  
**Clone Notes:** Two RevealOnScroll reveals — headline (delay 0.1s, distance 32px), description (delay 0.22s, distance 24px). Gradient uses rgba values for smooth black fade. Background image is decorative (empty alt).

---

### 2. AboutStorySection
**Component:** `src/components/sections/about/AboutStorySection.tsx`  
**Surface:** Black with white/10 border-bottom  
**Motion Wrapper:** Section-level RevealOnScroll elements (staggered delays 0, 0.1, 0.18s)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `py-16 sm:py-20 lg:py-28 border-b border-white/10` | Padding 64px→80px→112px | Vertical rhythm + bottom border |
| Container | `max-w-[1380px] px-6 sm:px-8 lg:px-12` | Max 1380px, padding 24px→32px→48px | Slightly wider than hero container |
| Grid | `grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12` | Gap 40px→32px→48px | Single-col mobile; 12-col desktop |
| **Left Column** (lg:col-span-4) | `flex flex-col lg:pt-3` | Desktop top-padding 12px | Eyebrow + heading + lead paragraph |
| Eyebrow | `text-xs tracking-[0.22em] mb-3` | 12px text, 0.22em tracking, 12px bottom margin | Uppercase mono, text-zinc-400 |
| Heading | `text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px]` | 30px→36px→40px→46px | Semibold, tracking-tight, leading-[1.15] |
| Lead Paragraph | `text-base lg:text-[17px] xl:text-lg` | 16px→17px→18px | Text-[#B3B3B3], leading-relaxed |
| **Center Column** (lg:col-span-4) | `flex justify-center items-center self-center` | — | Image container |
| Image Card | `max-w-[420px] aspect-[4/4.7] rounded-[24px] sm:rounded-[28px]` | Max 420px, border-radius 24px→28px | Border border-white/15, bg-[#1D1D1D] |
| Image | `object-cover object-[center_28%] sm:object-center` | — | Object-position shifts on mobile; hover scale 1.05 (700ms ease-out) |
| **Right Column** (lg:col-span-4) | `flex flex-col justify-end self-end lg:pb-3` | Desktop bottom-padding 12px | Two paragraphs + inline link |
| Paragraphs | `text-base lg:text-[17px] xl:text-lg` | 16px→17px→18px | Space-y-6 sm:space-y-8 (24px→32px); link to /solutions underlined on hover |

**Copy Source:** `ABOUT_PAGE.story` from `src/data/about`  
**Image:** Dynamic from story.imageSrc (lazy load, decoding async)  
**Clone Notes:** Three-column layout collapses to single-col mobile. Image is centered vertically on desktop with rounded-3xl card. Inner ring-inset ring-white/10 on image card. Link to /solutions is inline within paragraph (white underline-offset-4 hover:underline).

---

### 3. AboutMissionVision
**Component:** `src/components/sections/about/AboutMissionVision.tsx`  
**Surface:** Black with white/10 border-bottom  
**Motion Wrapper:** RevealOnScroll per card (delays 0.05s, 0.12s)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `py-20 md:py-28 border-b border-white/10` | Padding 80px→112px | Vertical rhythm + bottom border |
| Container | `max-w-6xl px-6 sm:px-8` | Max 1152px, padding 24px→32px | Centered, narrower than story section |
| Heading Block | `mb-14 md:mb-18 flex flex-col items-center text-center` | Bottom margin 56px→72px | Heading + decorative divider |
| Heading (H2) | `text-3xl sm:text-4xl md:text-5xl` | 30px→36px→48px | Font-serif, semibold, tracking-tight |
| Decorative Bar | `w-16 sm:w-20 h-1 bg-white/90 rounded-full mt-4` | Width 64px→80px, height 4px, top margin 16px | Centered accent below heading |
| Grid | `grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8` | Gap 24px→32px | Two equal cards |
| **Each Card** | `rounded-3xl p-6 sm:p-8 md:p-12` | Padding 24px→32px→48px | Class: `oc-mobile-glass-card`; bg-[#1D1D1D], border border-white/10 |
| Card Hover | `hover:border-white/20 hover:bg-[#262626]` | — | 500ms transition-all |
| Icon Container | `h-12 w-12 sm:h-14 sm:w-14 rounded-2xl` | 48px→56px, border-radius 16px | Border border-white/15, bg-white/[0.08]; hover scale-105 |
| Card Title (H3) | `text-2xl sm:text-3xl` | 24px→30px | Font-serif, semibold, tracking-tight, text-balance |
| Card Body | `text-base sm:text-lg` | 16px→18px | Text-[#B3B3B3], font-light, leading-relaxed, text-pretty |

**Copy Source:** `ABOUT_PAGE.missionVision` from `src/data/about`  
**Icons:** Rocket (Mission), Eye (Vision) from lucide-react  
**Clone Notes:** Two cards in equal grid. Icons are white on bg-white/[0.08] with hover scale. Cards have glass-panel styling (backdrop-blur-xl, shadow-2xl). Group hover effects on icon and border. Full min-h preserved for equal heights.

---

### 4. AboutCoreValues
**Component:** `src/components/sections/about/AboutCoreValues.tsx`  
**Surface:** Black (no explicit background class; inherits from page wrapper)  
**Motion Wrapper:** RevealOnScroll (header block), RevealOnScroll with stagger 0.06s (cards)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `pt-[var(--space-section)] pb-16 md:pb-20` | Top padding from CSS var, bottom 64px→80px | No explicit background; uses page black |
| Container | Default Container | — | Uses ui/Container default max-width |
| Header Block | `mx-auto mb-16 md:mb-20 max-w-3xl flex flex-col items-center gap-5 text-center` | Max 768px, bottom margin 64px→80px, gap 20px | Centered column |
| Eyebrow | Component `<Eyebrow centered>` | — | Defined in ui/; centered variant |
| SectionHeading (H2) | Component `<SectionHeading>` with `text-white` | — | Defined in ui/; white override |
| Subtext | Component `<BodyText>` with `mx-auto max-w-xl text-base md:text-lg` | Max 576px, 16px→18px | BodyText from ui/ |
| Grid | `grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6` | Gap 16px→24px | Three equal columns on desktop |
| **Each Card** (article) | `rounded-3xl p-8 sm:p-10` | Padding 32px→40px | Class: `oc-mobile-glass-card glass-panel glass-panel-hover` |
| Card Surface | `bg-[#1D1D1D] hover:bg-[#262626] border border-white/10 hover:border-white/20` | — | 500ms transition-colors |
| Icon Container | `h-14 w-14 rounded-2xl` | 56px, border-radius 16px | Border border-white/15, bg-white/5; hover border-white/25 (500ms) |
| Card Title (H3) | `text-2xl` | 24px | Font-medium, leading-snug, tracking-tight, text-white |
| Card Body | Component `<BodyText>` with `text-base md:text-lg` | 16px→18px | BodyText from ui/ |

**Copy Source:** `ABOUT_PAGE.values` from `src/data/about`  
**Icons:** CalendarCheck, ShieldCheck, Users from lucide-react (mapped to array index)  
**Clone Notes:** Three cards in grid. Each card uses `oc-mobile-glass-card` class + `glass-panel` + `glass-panel-hover` utilities. Icons are 6×6 with white text on bg-white/5. Stagger animation 0.06s between cards. Cards use `<article>` semantic tag.

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top with `data-site-nav` attribute; height factored into hero padding (pt-[max(7.5rem,...)]).
- **Footer:** Appended after all sections; not explicitly controlled by About.tsx.
- **Global Wrapper:** Page wrapper is `<div className="w-full flex flex-col items-center bg-black">` — full-width black background with centered flex column.
- **ScrollFade Wrapper:** Outer `ScrollFade` wraps each section after the hero; default fade-up animation on scroll into view.
- **SEO:** usePageSeo hook with title, description, path, keywords, image, type='website', jsonLd (buildOrganizationJsonLd()).

---

## Typography Scale

| Element | Mobile | Small | Medium | Large | Notes |
|---------|--------|-------|--------|-------|-------|
| Hero H1 | 40px | 60px | — | 67.2px | text-[2.5rem] sm:text-6xl lg:text-[4.2rem] |
| Hero Description | 15px | 16px | — | 18px | text-[15px] sm:text-base lg:text-lg |
| Story Heading | 30px | 36px | 40px | 46px | text-3xl sm:text-4xl lg:text-[40px] xl:text-[46px] |
| Story Body | 16px | — | 17px | 18px | text-base lg:text-[17px] xl:text-lg |
| Mission/Vision Heading | 30px | 36px | 48px | — | text-3xl sm:text-4xl md:text-5xl |
| Mission/Vision Title | 24px | 30px | — | — | text-2xl sm:text-3xl |
| Mission/Vision Body | 16px | 18px | — | — | text-base sm:text-lg |
| Values Title | 24px | — | — | — | text-2xl |
| Values Body | 16px | — | 18px | — | text-base md:text-lg |

---

## Motion Details

| Component | Trigger | Direction | Distance | Duration | Delay | Ease |
|-----------|---------|-----------|----------|----------|-------|------|
| Hero H1 | load | up | 32px | 1.1s | 0.1s | power3.out |
| Hero Description | load | up | 24px | 1s | 0.22s | power3.out |
| Story Left | scroll | default | default | default | 0s | default |
| Story Center | scroll | default | default | default | 0.1s | default |
| Story Right | scroll | default | default | default | 0.18s | default |
| Mission/Vision Heading | scroll | default | default | default | 0s | default |
| Mission Card | scroll | default | default | default | 0.05s | default |
| Vision Card | scroll | default | default | default | 0.12s | default |
| Values Header | scroll | default | default | default | 0s | default |
| Values Cards | scroll (stagger) | default | default | default | 0.06s stagger | default |

All ScrollFade-wrapped sections use default scroll-triggered fade-up unless specified. RevealOnScroll uses GSAP with specified params.

---

## Clone Checklist

- [ ] Implement full-height hero with layered gradients
- [ ] Use dynamic ABOUT_PAGE data (not hard-coded copy)
- [ ] Respect safe-area-inset-top for iOS notch
- [ ] Image object-position shifts between mobile/desktop (story section)
- [ ] Icons imported from lucide-react and mapped correctly
- [ ] All cards use `oc-mobile-glass-card` class (defined elsewhere; assume global utility)
- [ ] Glass-panel and glass-panel-hover utilities applied (assume global)
- [ ] Link to /solutions in story section is inline, underlined on hover
- [ ] Heading decorative bar (mission/vision) is purely decorative (aria-hidden)
- [ ] Cards use semantic tags: `<article>` for values, `<div>` for mission/vision
- [ ] All copy comes from `src/data/about` via ABOUT_PAGE constant
- [ ] ScrollFade wrapper requires `className="w-full"` prop for layout
