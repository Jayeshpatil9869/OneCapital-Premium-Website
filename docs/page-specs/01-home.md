# Home Page Specification

**Route:** `/`  
**Component:** `src/pages/Home.tsx`  
**Last updated:** Based on current codebase

---

## Section Order (Top → Bottom)

1. **HeroEditorial** (cinematic variant) — Full-bleed hero with background image, cinematic zoom, metrics
2. **SolutionsOverviewSection** — Sticky card stack with 3 pillars (Capital Strategy, Portfolio Management, Wealth Management)
3. **TestimonialsSection** — Auto-rotating client testimonials with scroll-driven light background transition
4. **FAQSection** — Category-filtered accordion FAQ
5. **OfficesPresenceSection** — India dot map + presence stats
6. **AppShowcaseSection** — Mobile app mockup with CTA

Each section wrapped in `<ScrollFade>` (RevealOnScroll wrapper) for entrance animation.

---

## 1. HeroEditorial (Cinematic Variant)

**Path:** `src/components/sections/hero/HeroEditorial.tsx`  
**Variant:** `cinematic`  
**Purpose:** Full-viewport hero with background image, slow cinematic zoom, metrics bar

### DOM Structure

```html
<section class="relative flex min-h-[100svh] w-full flex-col justify-center items-center overflow-hidden bg-black pt-[max(6rem,env(safe-area-inset-top))] pb-10 sm:pb-12 lg:pb-14">
  <!-- Background image with cinematic zoom -->
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <img ref={imgRef} src="/images/hero-wealth.jpg" alt="" class="h-full w-full object-cover object-center will-change-transform transform-gpu" />
    <div class="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_36%,rgba(0,0,0,0.52)_58%,rgba(0,0,0,0.88)_80%,#000000_100%)]" />
  </div>
  
  <Container class="relative z-10 flex flex-col items-center px-6 md:px-8">
    <div class="flex w-full max-w-5xl flex-col items-center text-center">
      <!-- Eyebrow -->
      <RevealOnScroll trigger="load" direction="up" distance={24} delay={0.16} duration={1} ease="power3.out">
        <Eyebrow centered class="mb-6 sm:mb-7 lg:mb-8 text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/70 [&>span:first-child]:w-8 sm:[&>span:first-child]:w-10 [&>span:first-child]:bg-white/35 [&>span:last-child]:w-8 sm:[&>span:last-child]:w-10 [&>span:last-child]:bg-white/35">
          EXPERT FINANCIAL GUIDANCE
        </Eyebrow>
      </RevealOnScroll>
      
      <!-- Heading -->
      <RevealOnScroll trigger="load" direction="up" distance={36} duration={1.15} delay={0.32} ease="power3.out">
        <DisplayHeading class="mb-4 sm:mb-5 lg:mb-6 text-center text-white font-medium tracking-tight leading-[1.1] text-balance text-2xl sm:text-4xl md:text-[2.65rem] lg:text-[2.85rem] xl:text-[3.25rem] 2xl:text-[3.75rem] max-w-4xl mx-auto">
          <span class="block">Wealth Isn't Built By Chance.</span>
          <span class="block mt-1 sm:mt-1.5 text-white/95">It's Built By Strategy.</span>
        </DisplayHeading>
      </RevealOnScroll>
      
      <!-- Description -->
      <RevealOnScroll trigger="load" direction="up" distance={24} delay={0.5} duration={1} ease="power3.out">
        <BodyText class="mx-auto mb-0 max-w-[38rem] text-center text-sm sm:text-base lg:text-[1.05rem] text-[#B3B3B3] leading-relaxed font-light">
          Research first. Strategy next. Investment last.
        </BodyText>
      </RevealOnScroll>
    </div>
  </Container>
  
  <!-- Metrics -->
  <div class="relative z-10 w-full mt-10 sm:mt-13 lg:mt-16">
    <RevealOnScroll trigger="load" delay={0.65} duration={0.9}>
      <div class="mx-auto w-[70%] max-w-4xl border-t border-white/20 mb-7 sm:mb-8 lg:mb-9" />
    </RevealOnScroll>
    <RevealOnScroll trigger="load" delay={0.72} duration={1.1}>
      <Container class="px-6 md:px-8 max-w-[1000px]">
        <HeroMetrics metrics={METRICS} />
      </Container>
    </RevealOnScroll>
  </div>
</section>
```

### Background Image Animation (GSAP)

**Cinematic zoom-in:**

1. **Initial state:** `opacity: 0, scale: 1.0`
2. **Fade in:** `opacity: 1` (duration: 1.8s, ease: power2.out) — starts after preloader done
3. **Zoom in:** `scale: 1.08` (duration: 14s, ease: power1.out) — slow continuous zoom

### Gradient Overlay

```css
background: linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.72) 0%,
  rgba(0, 0, 0, 0.42) 36%,
  rgba(0, 0, 0, 0.52) 58%,
  rgba(0, 0, 0, 0.88) 80%,
  #000000 100%
);
```

### Metrics Component

**Path:** `src/components/sections/hero/HeroEditorial.tsx` (HeroMetrics function)

**Layout:** Grid with 3 columns (1 row)

```html
<div class="grid gap-y-8 gap-x-4 justify-items-center text-center sm:gap-8 md:gap-14 max-w-[1050px] mx-auto grid-cols-3">
  <div class="flex flex-col items-center min-w-0">
    <span class="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-sans font-medium tracking-tight text-white leading-none">
      <span data-count="3000">0</span>+
    </span>
    <span class="text-[11px] sm:text-xs lg:text-sm font-sans font-normal text-white/70 text-center max-w-[18ch] sm:max-w-[20ch] leading-snug mt-2 sm:mt-2.5">
      Clients Serviced
    </span>
  </div>
  <!-- Repeat for "8+ Specialized Products" and "33+ Years Industry Experience" -->
</div>
```

**Counter animation (GSAP):**

- From: `0`
- To: `target` value (e.g., 3000)
- Duration: `motionTokens.duration.cinematic` (approx 2.5s)
- Ease: `motionTokens.ease.expo` (expo.out)
- Delay: `0.72 + index * motionTokens.stagger.normal` (stagger: approx 0.1s)
- Display: `toLocaleString('en-IN')` (Indian number format)

### Typography (px)

- Eyebrow: 11px (sm: 12px), uppercase, `tracking-[0.22em]`
- Heading: 24px (sm: 36px, md: 42.4px, lg: 45.6px, xl: 52px, 2xl: 60px)
- Description: 14px (sm: 16px, lg: 16.8px)
- Metric value: 24px (sm: 30px, md: 36px, lg: 42.4px)
- Metric label: 11px (sm: 12px, lg: 14px)

### Spacing (px)

- Top padding: max(96px, safe-area)
- Bottom padding: 40px (sm: 48px, lg: 56px)
- Horizontal: 24px (md: 32px)
- Eyebrow bottom: 24px (sm: 28px, lg: 32px)
- Heading bottom: 16px (sm: 20px, lg: 24px)
- Metrics top: 40px (sm: 52px, lg: 64px)
- Divider bottom: 28px (sm: 32px, lg: 36px)
- Metric gap: 32px (sm: 32px, md: 56px) horizontal, 32px vertical
- Metric label top: 8px (sm: 10px)

### Colors

- Background: `#000000` (with gradient overlay)
- Eyebrow: `text-white/70`, lines: `bg-white/35`
- Heading: `text-white`, second line: `text-white/95`
- Description: `#B3B3B3`
- Metric value: `text-white`
- Metric label: `text-white/70`
- Divider: `border-white/20`

### Data Source

```typescript
const METRICS = [
  { value: '3000', suffix: '+', label: 'Clients Serviced' },
  { value: '8', suffix: '+', label: 'Specialized Products' },
  { value: '33', suffix: '+', label: 'Years Industry Experience' },
];
```

---

## 2. SolutionsOverviewSection

**Path:** `src/components/sections/solutions/SolutionsOverviewSection.tsx`  
**Purpose:** Sticky card stack (desktop lg+) with 3 pillar cards, char-by-char heading reveal

### DOM Structure

```html
<section class="relative flex w-full flex-col items-center border-y border-white/10 bg-black pb-0 pt-20 md:pb-0 md:pt-32 text-white">
  <!-- Header -->
  <div ref={headerRef} class="mx-auto mb-8 w-full max-w-5xl px-4 text-center sm:mb-14 sm:px-6 lg:px-8">
    <Eyebrow centered class="mb-4 text-white/60 sm:mb-6">Who We Are</Eyebrow>
    <h2 class="select-none text-[2.2rem] font-medium leading-[1.1] tracking-tight text-white/20 sm:text-[3.25rem] lg:text-[4rem]">
      <span class="sr-only">Wealth Is More Than Capital. It's A Legacy In The Making.</span>
      <span aria-hidden="true" class="block">
        <SplitChars text="Wealth Is More Than Capital." attr="data-char-h" />
      </span>
      <span aria-hidden="true" class="mt-1 block sm:mt-2">
        <SplitChars text="It's A Legacy In The Making." attr="data-char-h" />
      </span>
    </h2>
  </div>
  
  <!-- Card container (sticky stack on lg+, static flow on mobile) -->
  <div ref={containerRef} class="relative w-full [pb-[23vh] | flex flex-col gap-6 pb-16 sm:gap-8]">
    <!-- 3 pillar cards here -->
  </div>
</section>
```

### Heading Char-by-Char Reveal (GSAP)

**Split:** Each character wrapped in `<span data-char-h="">`

**Animation:**

- Initial: `color: rgba(255, 255, 255, 0.22)` (DIM)
- To: `color: #ffffff` (LIT_HEADING)
- Stagger: `0.05` (50ms per char)
- ScrollTrigger: Start `top 75%`, end `bottom 20%`, scrub: `1`

### Card Stack Behavior

**Desktop (lg+, 1024px):**

- **Sticky:** Each card sticks as user scrolls, overlays scale down
- **Position:** `oc-pillar-slot` with `position: sticky`, top offset per index
- **Top offset:** `i * 20px` (0px, 20px, 40px)
- **Scale:** Motion/MotionValue from scroll progress
  - Card 0: range `[0, 0.4]`, scale `1 → 0.9`
  - Card 1: range `[0.35, 0.75]`, scale `1 → 0.95`
  - Card 2: range `[0.7, 1]`, scale `1` (no scale)
- **Overlay:** Dark overlay fades in on cards 0-1 as they're covered (opacity 0 → 0.16)

**Mobile (<lg):**

- **Static:** Cards flow in column, no sticky, `gap-6` (sm: `gap-8`)
- **Scale:** Always `1`
- **Overlay:** Always `0`

### Pillar Card Structure

**Classes:**

```
.oc-pillar-slot — Wrapper (sticky container or static)
.oc-pillar-card — Card (motion.div with scale transform)
.oc-pillar-overlay — Dark overlay (only cards 0-1)
.oc-pillar-grid — 2-column grid (flip on card 1)
.oc-pillar-copy — Left column (text)
.oc-pillar-visual — Right column (WealthCollageVisual)
```

**DOM:**

```html
<div class="oc-pillar-slot [oc-pillar-slot--static]">
  <motion.div style={{ scale, top: topOffset, transformOrigin: 'top center' }} class="oc-pillar-card">
    <motion.div style={{ opacity: overlayOpacity }} class="oc-pillar-overlay" />
    
    <div class="oc-pillar-grid [oc-pillar-grid--flip]">
      <div class="oc-pillar-copy">
        <h3 class="font-sans text-[1.25rem] font-semibold leading-[1.15] tracking-tight text-black sm:text-2xl lg:text-[2.55rem] lg:leading-[1.12] xl:text-[2.95rem]">
          {card.title}
        </h3>
        <p class="mt-2 max-w-xl text-[0.8125rem] font-light leading-snug text-black/60 sm:mt-4 sm:text-base lg:mt-5 lg:text-lg lg:leading-relaxed xl:text-xl">
          {card.description}
        </p>
        <div class="mt-3 sm:mt-6 lg:mt-8">
          <Button to="{card.href}" variant="primary" size="md" arrow="up-right" class="oc-btn-stroke--on-black h-auto w-full max-w-full bg-black text-xs font-medium tracking-wider text-white shadow-md hover:bg-zinc-800 lg:w-auto">
            {card.buttonText}
          </Button>
        </div>
      </div>
      
      <div class="oc-pillar-visual">
        <WealthCollageVisual {...card.collage} />
      </div>
    </div>
  </motion.div>
</div>
```

### Pillar Card Data

**Source:** `PILLAR_CARDS` constant in component

1. **Capital Strategy**
   - Title: "Your Partner in Long-Term Wealth Creation."
   - Href: `/solutions/capital-strategy`
   - Button: "Explore Strategic Allocation"
   - Collage: Net worth ₹45,75,000, Returns 7.82%, advisor image

2. **Portfolio Management**
   - Title: "Discretionary Portfolio Management: PMS & AIFs"
   - Href: `/solutions/portfolio-management`
   - Button: "Explore PMS & Alternative Funds"
   - Collage: Net worth ₹2.1 Cr+, Returns 12.4%, advisor image

3. **Wealth Management**
   - Title: "Total Wealth Governance: Tax, Liquidity & Succession"
   - Href: `/solutions/wealth-management`
   - Button: "Explore Wealth Governance"
   - Collage: "Family office", Focus "On plan", advisor image

### Layout (oc-pillar-grid, Sass)

**Desktop (lg+):**

- **Display:** Grid, 2 columns, `grid-template-columns: 1.1fr 1fr`
- **Gap:** `gap: clamp(2rem, 4vw, 4rem)` (32px to 64px)
- **Padding:** `3.5rem` (56px)
- **Background:** `#ffffff`
- **Border-radius:** `1.75rem` (28px)
- **Border:** `1px solid rgba(0, 0, 0, 0.08)`
- **Shadow:** `0 4px 40px rgba(0, 0, 0, 0.08)`

**Flip modifier (card 1):**

- **Columns:** Reversed, visual on left

**Mobile (<lg):**

- **Display:** Flex column
- **Gap:** `1.5rem` (24px)
- **Padding:** `1.5rem` (24px)

### Typography (px)

- Eyebrow: 12px (sm: 14px)
- Heading: 35.2px (sm: 52px, lg: 64px)
- Card title: 20px (sm: 24px, lg: 40.8px, xl: 47.2px)
- Card description: 13px (sm: 16px, lg: 18px, xl: 20px)
- Button: 12px

### Spacing (px)

- Section top: 80px (md: 128px)
- Header bottom: 32px (sm: 56px)
- Eyebrow bottom: 16px (sm: 24px)
- Card title bottom: 8px (sm: 16px, lg: 20px)
- Card button top: 12px (sm: 24px, lg: 32px)
- Container bottom: 92px (23vh on sticky mode)

### Colors

- Background: `#000000`
- Border: `border-white/10`
- Eyebrow: `text-white/60`
- Heading: `text-white/20` (initial), `#ffffff` (revealed)
- Card bg: `#ffffff`
- Card title: `text-black`
- Card description: `text-black/60`
- Card button: `bg-black text-white hover:bg-zinc-800`
- Overlay: `rgba(0, 0, 0, 0.16)` max

---

## 3. TestimonialsSection

**Path:** `src/components/sections/testimonials/TestimonialsSection.tsx`  
**Purpose:** Auto-rotating client testimonials with scroll-driven light background transition

### DOM Structure

```html
<section ref={sectionRef} data-testimonials-section class="relative w-full border-y border-white/10 py-16 md:py-24 overflow-hidden group">
  <Container>
    <div class="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:items-center lg:gap-12 xl:max-w-[72rem]">
      <div class="flex flex-col gap-5 lg:col-span-5">
        <SectionHeading class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-semibold tracking-tight leading-[1.08] text-white group-[.light-section]:text-black">
          Client Perspectives
        </SectionHeading>
      </div>
      
      <div class="min-w-0 lg:col-span-7">
        <div class="oc-card-hover-glow flex min-h-[20rem] touch-pan-y select-none flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-black p-5 transition-colors duration-500 hover:border-white/20 sm:min-h-[18rem] sm:p-6 md:min-h-[17rem] md:p-7">
          <div ref={quoteContentRef} class="reveal-ready flex flex-1 flex-col justify-between gap-5">
            <blockquote class="grid min-w-0">
              <p class="col-start-1 row-start-1 text-balance text-base font-light leading-snug tracking-tight text-white md:text-lg lg:text-xl [visible | invisible]">
                &ldquo;{active.quote}&rdquo;
              </p>
            </blockquote>
            
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex min-w-0 items-center gap-2.5">
                <img src="{active.avatarSrc}" alt="" width="32" height="32" class="h-8 w-8 shrink-0 rounded-full border border-white/15 object-cover" />
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium text-white">{active.client}</p>
                  <p class="mt-0.5 truncate text-xs text-text-muted">{active.role}</p>
                </div>
              </div>
              
              <div class="flex shrink-0 items-center justify-end gap-2">
                <button type="button" aria-label="Previous testimonial" class="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white">
                  <ChevronLeft class="h-4 w-4" />
                </button>
                <button type="button" aria-label="Next testimonial" class="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors duration-500 hover:border-white/40 hover:text-white">
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
</section>
```

### Background Transition (GSAP)

**Mobile (<768px):**

- **Static:** `background-color: #ffffff`, `.light-section` class applied
- **No animation**

**Desktop (768px+):**

- **ScrollTrigger:** Start `top 85%`, end `top 35%`, scrub: `0.7`
- **Initial:** `background-color: #000000`
- **Final:** `background-color: #ffffff`
- **Light class:** Applied when progress >= 0.85
- **Ease:** `none` (linear scrub)

**Text color:** Always black via CSS `.group-[.light-section]:text-black`

### Testimonial Transition (GSAP)

**Auto-advance:** Every `2000ms` (when not paused)

**Exit animation:**

- `opacity: 0, y: -18px`
- Duration: `0.55s`
- Ease: `power2.inOut`

**Enter animation:**

- From: `opacity: 0, y: 24px`
- To: `opacity: 1, y: 0`
- Duration: `0.95s`
- Ease: `motionTokens.ease.cinematic` (expo.out approx)

**Pause triggers:**

- Mouse enter/leave
- Focus/blur
- Pointer down (touch swipe)

### Swipe Navigation

**Threshold:** 50px horizontal travel

- **Swipe left:** Next testimonial
- **Swipe right:** Previous testimonial

### Layout

- **Grid:** 1 column, 12 columns on lg (1024px)
- **Split:** 5 columns (heading), 7 columns (card) on lg
- **Gap:** 32px (lg: 48px, xl: custom)

### Typography (px)

- Heading: 30px (sm: 36px, md: 48px, lg: 52px, xl: 58.4px)
- Quote: 16px (md: 18px, lg: 20px)
- Client name: 14px
- Client role: 12px

### Spacing (px)

- Section padding: 64px vertical (md: 96px)
- Card padding: 20px (sm: 24px, md: 28px)
- Card gap: 20px
- Card min-height: 320px (sm: 288px, md: 272px)
- Avatar gap: 10px

### Colors

- Background: `#000000` → `#ffffff` (scroll-driven)
- Border: `border-white/10` (section, card)
- Card bg: `bg-black`
- Heading: `text-white` (dark), `text-black` (light)
- Quote: `text-white`
- Client name: `text-white`
- Client role: `text-text-muted` (white/50 approx)
- Nav button: `text-white/50`, border: `border-white/15`, hover: `text-white border-white/40`

### Data Source

`src/data/home-testimonials.ts` (HOME_TESTIMONIALS)

---

## 4. FAQSection

**Path:** `src/components/sections/faq/FAQSection.tsx`  
**Purpose:** Category-filtered accordion FAQ with show more/less

### DOM Structure

```html
<Section pad="none" class="pt-[var(--space-section)] pb-10 md:pb-14">
  <Container>
    <RevealOnScroll class="max-w-3xl mb-12 md:mb-16">
      <SectionHeading class="mb-3 text-[clamp(1.75rem,1.2rem+2.5vw,3.25rem)] font-semibold tracking-tight">
        Questions worth asking.
      </SectionHeading>
      <span class="mb-5 block h-px w-16 bg-white/50" />
      <BodyText class="text-base md:text-lg max-w-2xl">
        Wealth decisions deserve clarity. Explore the questions clients ask before beginning a long-term relationship with One Capital.
      </BodyText>
    </RevealOnScroll>
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
      <!-- Desktop category nav (lg+ only) -->
      <div class="hidden lg:block lg:col-span-4">
        <div class="sticky top-28 z-10">
          <div class="glass-panel rounded-3xl p-3">
            <FAQCategoryNav activeId={activeCategoryId} onSelect={handleCategoryChange} />
          </div>
        </div>
      </div>
      
      <!-- Mobile category select -->
      <div class="lg:hidden">
        <select class="w-full appearance-none glass-panel rounded-2xl px-4 py-3.5 min-h-11 text-sm uppercase tracking-widest font-mono text-white">
          <option value="all">All</option>
          <!-- Categories -->
        </select>
      </div>
      
      <!-- Questions -->
      <RevealOnScroll stagger={0.06} class="lg:col-span-8 flex flex-col gap-3 md:gap-4">
        <FAQAccordionItem ... />
      </RevealOnScroll>
    </div>
    
    <RevealOnScroll class="mt-12 md:mt-16 flex flex-col items-center justify-center gap-5 text-center w-full">
      <p class="mx-auto max-w-[min(36rem,100%)] px-2 text-center text-xs font-mono uppercase tracking-wider text-white/50 text-balance sm:text-sm sm:tracking-widest md:text-base">
        Still have questions? The conversation begins with a consultation.
      </p>
      <Button to="/contact" variant="primary" size="md" arrow="up-right" class="shadow-lg hover:shadow-white/10 transition-all font-medium tracking-wide">
        Book Consultation
      </Button>
    </RevealOnScroll>
  </Container>
</Section>
```

### Category Nav (Desktop)

**Layout:** Sticky, `top: 112px` (28rem = 7rem * 4 = 112px)

**Button:**

```html
<button class="w-full flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 min-h-11 text-left transition-colors duration-500 [bg-white text-black border-white | bg-white/[0.02] text-white/70 border-white/10 hover:border-white/25 hover:text-white]">
  <span class="text-xs uppercase tracking-widest font-mono">{title}</span>
  <ChevronRight class="w-4 h-4 shrink-0 [text-black/50 | text-white/30]" />
</button>
```

### Accordion Item

```html
<article class="glass-panel rounded-2xl oc-card-hover-glow transition-colors duration-500 hover:border-white/20">
  <h3>
    <button class="w-full text-left px-5 py-5 md:px-6 md:py-6 flex items-start justify-between gap-6 min-h-11">
      <span class="min-w-0 flex-1">
        <span class="block text-[10px] uppercase tracking-[0.2em] font-mono text-white/40 mb-3">
          01 · {categoryLabel}
        </span>
        <span class="block text-lg md:text-xl font-medium tracking-tight text-white text-balance">
          {item.question}
        </span>
      </span>
      <span class="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/50 transition-transform duration-500 [rotate-180 bg-white text-black border-white | rotate-0]">
        <ChevronDown class="w-4 h-4" />
      </span>
    </button>
  </h3>
  <div class="grid transition-[grid-template-rows] duration-500 ease-out [grid-rows-[1fr] | grid-rows-[0fr]]">
    <div class="overflow-hidden">
      <p class="px-5 md:px-6 pb-5 md:pb-6 text-base text-text-muted leading-relaxed max-w-3xl">
        {item.answer}
      </p>
    </div>
  </div>
</article>
```

### Layout

- **Grid:** 1 column, 12 columns on lg (1024px)
- **Split:** 4 columns (nav), 8 columns (questions) on lg
- **Gap:** 40px (lg: 56px)

### Typography (px)

- Section heading: `clamp(28px, calc(19.2px + 2.5vw), 52px)`
- Body text: 16px (md: 18px)
- Category button: 12px, uppercase
- Question label: 10px, uppercase, `tracking-[0.2em]`
- Question text: 18px (md: 20px)
- Answer: 16px

### Spacing (px)

- Section top: `var(--space-section)` (approx 80px)
- Section bottom: 40px (md: 56px)
- Header bottom: 48px (md: 64px)
- Grid gap: 40px (lg: 56px)
- Category nav padding: 12px (outer), button padding: 16px horizontal, 14px vertical
- Accordion padding: 20px (md: 24px)
- Accordion gap: 12px (md: 16px)
- CTA top: 48px (md: 64px)

### Colors

- `.glass-panel` — `bg-white/[0.02] backdrop-blur-xl border-white/10`
- Category active: `bg-white text-black border-white`
- Category inactive: `bg-white/[0.02] text-white/70 border-white/10`
- Question label: `text-white/40`
- Question text: `text-white`
- Answer: `text-text-muted` (white/50 approx)
- Toggle icon: `text-white/50` (closed), `bg-white text-black border-white` (open)

### Data Source

`src/data/home-faq.ts` (HOME_FAQ_CATEGORIES, FAQ_ALL_ID)

---

## 5. OfficesPresenceSection

**Path:** `src/components/sections/offices/OfficesPresenceSection.tsx`  
**Purpose:** India dot map + presence stats grid

### DOM Structure

```html
<Section pad="none" class="pt-10 md:pt-14 pb-[var(--space-section-sm)]">
  <Container>
    <div class="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
      <RevealOnScroll class="lg:col-span-6 overflow-visible">
        <div class="oc-map-stage">
          <IndiaDotMap offices={OFFICE_LOCATIONS} />
        </div>
      </RevealOnScroll>
      
      <div class="lg:col-span-6 flex flex-col gap-10">
        <RevealOnScroll delay={0.08}>
          <div class="flex flex-col gap-5">
            <Eyebrow>Our Presence</Eyebrow>
            <SectionHeading>
              Advisory Rooted in Maharashtra.
            </SectionHeading>
            <BodyText class="text-base md:text-lg max-w-xl text-text-muted leading-relaxed">
              Headquartered in Pune with regional offices across Mumbai, Nashik, and Kolhapur, One Capital combines local proximity with institutional research to manage and protect wealth across Maharashtra.
            </BodyText>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay={0.16}>
          <div class="grid grid-cols-1 sm:grid-cols-2">
            <div class="flex flex-col gap-2 px-6 py-7 md:px-8 md:py-8 [border-b border-white/10] [sm:border-r sm:border-white/10]">
              <p class="text-3xl md:text-4xl font-medium tracking-tight text-white tabular-nums">
                {stat.value}
              </p>
              <p class="text-sm text-text-muted leading-relaxed max-w-[14rem]">
                {stat.label}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </Container>
</Section>
```

### Stats Grid

**Layout:**

- 1 column mobile, 2 columns on sm (640px)
- 4 stats total (2 rows × 2 columns on sm)
- Border-bottom on top 2 stats
- Border-right on left stats (sm only)

**Stats:**

- Value: 30px (md: 36px), tabular-nums
- Label: 14px

### Layout

- **Grid:** 1 column, 12 columns on lg (1024px)
- **Split:** 6 columns (map), 6 columns (content) on lg
- **Gap:** 56px (lg: 64px)

### Typography (px)

- Eyebrow: 12px
- Heading: (default SectionHeading, approx 36px-48px)
- Body: 16px (md: 18px)
- Stat value: 30px (md: 36px)
- Stat label: 14px

### Spacing (px)

- Section top: 40px (md: 56px)
- Section bottom: `var(--space-section-sm)` (approx 64px)
- Grid gap: 56px (lg: 64px)
- Content gap: 40px (sections), 20px (within section)
- Stat padding: 24px horizontal, 28px vertical (md: 32px horizontal, 32px vertical)

### Colors

- Border: `border-white/10`
- Eyebrow: (default)
- Heading: `text-white`
- Body: `text-text-muted`
- Stat value: `text-white`
- Stat label: `text-text-muted`

### Data Source

`src/data/office-locations.ts` (OFFICE_LOCATIONS, PRESENCE_STATS)

---

## 6. AppShowcaseSection

**Path:** `src/components/sections/app-download/AppShowcaseSection.tsx`  
**Purpose:** Mobile app mockup with download CTA

### DOM Structure

```html
<section class="w-full px-[var(--page-gutter)] py-10 sm:py-16 md:py-20">
  <RevealOnScroll>
    <Container>
      <Surface variant="plain" class="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.25rem] border border-white/10 bg-[#121212] p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 text-white shadow-[0_24px_70px_rgba(0,0,0,0.5)]">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        
        <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8 lg:gap-14 xl:gap-16 items-center">
          <!-- Left Column -->
          <div class="md:col-span-7 flex flex-col items-start text-left justify-center">
            <h2 class="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-white leading-[1.18] sm:leading-[1.15]">
              Your wealth, managed with purpose.
            </h2>
            <p class="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-base lg:text-lg text-white/70 leading-relaxed font-light max-w-xl">
              A thoughtful approach to your investments, helping you understand your portfolio, track your returns, and stay focused on your financial goals.
            </p>
            <div class="mt-7 sm:mt-8 md:mt-10 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Button to="/contact" variant="primary" size="lg" arrow="up-right" class="w-full sm:w-auto justify-center bg-white text-black font-semibold uppercase tracking-wider px-6 sm:px-7 hover:bg-white/90 text-xs sm:text-sm">
                Book a Consultation
              </Button>
              <div class="flex items-center gap-3 pl-1 sm:pl-4 sm:border-l sm:border-white/10 pt-1 sm:pt-0">
                <AppDownloadStoreButtons tone="dark" />
              </div>
            </div>
          </div>
          
          <!-- Right Column -->
          <div class="md:col-span-5 flex justify-center items-center w-full pt-4 md:pt-0">
            <div class="relative mx-auto flex items-center justify-center">
              <div class="pointer-events-none absolute -inset-6 rounded-full bg-white/[0.04] blur-2xl sm:blur-3xl" />
              <img src="/images/one-capital-mobile-app-mockup.png" alt="One Capital Mobile App Mockup" width="520" height="1005" loading="lazy" decoding="async" class="relative z-10 w-auto max-w-[175px] xs:max-w-[195px] sm:max-w-[215px] md:max-w-[220px] lg:max-w-[245px] xl:max-w-[260px] max-h-[360px] xs:max-h-[390px] sm:max-h-[420px] lg:max-h-[460px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.02]" />
            </div>
          </div>
        </div>
      </Surface>
    </Container>
  </RevealOnScroll>
</section>
```

### Layout

- **Grid:** 1 column, 12 columns on md (768px)
- **Split:** 7 columns (text), 5 columns (image) on md
- **Gap:** 32px (sm: 40px, md: 32px, lg: 56px, xl: 64px)

### Typography (px)

- Heading: 24px (sm: 30px, md: 30px, lg: 36px, xl: 48px)
- Body: 14px (sm: 16px, md: 16px, lg: 18px)
- Button: 12px (sm: 14px), uppercase

### Spacing (px)

- Section padding: 40px vertical (sm: 64px, md: 80px)
- Card border-radius: 24px (sm: 32px, md: 36px)
- Card padding: 24px (sm: 40px, md: 48px, lg: 56px, xl: 64px)
- Heading bottom: 14px (sm: 16px)
- Button top: 28px (sm: 32px, md: 40px)
- Button gap: 14px (sm: 16px)

### Colors

- Card bg: `#121212`
- Border: `border-white/10`
- Top sheen: `bg-gradient-to-r from-transparent via-white/15 to-transparent`
- Heading: `text-white`
- Body: `text-white/70`
- Button: `bg-white text-black hover:bg-white/90`
- Shadow: `shadow-[0_24px_70px_rgba(0,0,0,0.5)]`
- Image glow: `bg-white/[0.04] blur-2xl`
- Image shadow: `drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]`

---

## Data Sources

- **Hero:** `METRICS` constant in `Home.tsx`
- **Solutions:** `PILLAR_CARDS` constant in `SolutionsOverviewSection.tsx`
- **Testimonials:** `src/data/home-testimonials.ts` (HOME_TESTIMONIALS)
- **FAQ:** `src/data/home-faq.ts` (HOME_FAQ_CATEGORIES, getFAQQuestionsForCategory)
- **Offices:** `src/data/office-locations.ts` (OFFICE_LOCATIONS, PRESENCE_STATS)
- **App Showcase:** Hardcoded copy in component

---

## Clone Checklist

1. **Hero:**
   - Implement cinematic background zoom (1.0 → 1.08 over 14s)
   - Implement gradient overlay with exact stops
   - RevealOnScroll for eyebrow, heading, description (exact delays)
   - GSAP counter animation for metrics (expo.out, stagger)

2. **Solutions:**
   - Desktop sticky card stack with scroll-driven scale + overlay
   - Mobile static flow with gap
   - GSAP char-by-char heading reveal (scrub with ScrollTrigger)
   - WealthCollageVisual component integration
   - Flip grid on card 1

3. **Testimonials:**
   - GSAP scroll-driven background color transition (black → white)
   - GSAP testimonial transition (exit down, enter up)
   - Auto-advance timer (2s) with pause on hover/focus/touch
   - Swipe navigation (50px threshold)
   - Avatar or initials fallback

4. **FAQ:**
   - Desktop sticky category nav
   - Mobile select dropdown
   - Accordion grid animation (grid-rows-[0fr] → grid-rows-[1fr])
   - Show more/less logic (first 4 questions when "All" selected)
   - RevealOnScroll with stagger (0.06s)

5. **Offices:**
   - IndiaDotMap component with office locations
   - 2×2 stats grid with borders (top 2, left column)
   - RevealOnScroll delay per section

6. **App Showcase:**
   - Surface with rounded corners (1.5rem → 2.25rem)
   - Top sheen gradient line
   - 7/5 grid split on md+
   - Image with glow backdrop and drop shadow
   - Hover scale (1.02) on image

7. **ScrollFade wrapper:**
   - Each section wrapped in `<ScrollFade>` for entrance animation
   - RevealOnScroll component with direction, distance, duration, ease props

8. **Verify responsive breakpoints:**
   - sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
   - Tailwind spacing: 1=4px scale
   - Test sticky behavior on lg+ only (SolutionsOverviewSection)
   - Test scroll background transition on md+ only (TestimonialsSection)

9. **GSAP integration:**
   - Register useGSAP plugin
   - whenPreloaderDone() wrapper for load animations
   - prefersReducedMotion() checks
   - ScrollTrigger for scrub animations

10. **Motion tokens:**
    - `motionTokens.duration.cinematic` (approx 2.5s)
    - `motionTokens.duration.fast` (approx 0.25s)
    - `motionTokens.ease.cinematic` (expo.out approx)
    - `motionTokens.ease.smooth` (power2.out)
    - `motionTokens.ease.expo` (expo.out)
    - `motionTokens.stagger.normal` (approx 0.1s)
