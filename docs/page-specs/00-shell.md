# Shell Components Specification

**Source:** Global components present on every page  
**Last updated:** Based on current codebase

---

## Layout.tsx

**Path:** `src/layouts/Layout.tsx`  
**Purpose:** Root application shell with smooth scroll, route management, preloader integration

### DOM Structure

```html
<ReactLenis> <!-- Desktop only: lg+ (1024px), touch devices use native scroll -->
  <LenisScrollSync /> <!-- Syncs GSAP ScrollTrigger with Lenis -->
  <RouteScrollReset /> <!-- Resets scroll on navigation -->
  <Preloader />
  <div class="oc-shell flex flex-col min-h-dvh w-full max-w-full overflow-x-clip bg-canvas [is-home] [is-team]">
    <Navbar />
    <main class="grow min-w-0">
      <Outlet /> <!-- React Router page content -->
    </main>
    <Footer />
    <RiskFactorsStrip />
    <div class="fixed z-[var(--z-toast)] bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] flex flex-col items-end gap-5 pointer-events-none">
      <div class="pointer-events-auto">
        <ChatWidget embedded />
      </div>
      <div class="pointer-events-auto hidden md:block">
        <AppDownloadFloatingWidget embedded />
      </div>
    </div>
  </div>
</ReactLenis>
```

### Classes

- `.oc-shell` — App shell container
- `.is-home` — Modifier when pathname is `/`
- `.is-team` — Modifier when pathname is `/team`
- `.oc-preloader-lock` — Applied to `<html>` during preloader, sets `overflow: hidden`

### Layout

- **Flexbox:** Column direction, `min-h-dvh`
- **Overflow:** `overflow-x-clip` (prevents horizontal scroll)
- **Background:** `bg-canvas` (CSS custom property `--color-canvas`, typically `#000000`)

### Lenis Smooth Scroll

**Enabled only on desktop:**

- Media queries:
  - `(pointer: fine)` — Fine pointer (mouse)
  - `(hover: hover)` — Can hover
  - `(min-width: 1024px)` — Desktop width
  - No touch support (`ontouchstart` not present)
- **Options:**
  - `lerp: 0.14` — Smooth interpolation factor
  - `wheelMultiplier: 0.95` — Scroll speed
  - `smoothWheel: true`
  - `syncTouch: false` — No touch sync
  - `autoRaf: false` — Manual RAF via GSAP ticker
- **Touch devices:** Native browser scroll only

### Scroll Behavior

- **On route change:** Scroll resets to top (immediate, no smooth)
- **Hash links:** Scroll to element with `-100px` offset (smooth)
- **Preloader unlock:** Lenis starts after `PRELOADER_DONE_EVENT`

### z-index Layers

- Floating widgets container: `z-[var(--z-toast)]` = `3000`

---

## Navbar.tsx

**Path:** `src/components/Navbar.tsx`  
**Purpose:** Fixed navigation with pill background on scroll/over-light, desktop mega dropdowns, mobile full-screen menu

### DOM Structure

```html
<header data-site-nav class="fixed top-0 inset-x-0 z-[var(--z-nav)] transition-all duration-500 pt-[env(safe-area-inset-top)] [py-6 | py-4]">
  <div class="relative z-[var(--z-modal)] mx-auto w-full px-[clamp(1.5rem,5.5vw,4.5rem)] transition-[max-width] duration-500 [max-w-none | max-w-[calc(100vw-1.25rem)] sm:max-w-[calc(100vw-1.75rem)]]">
    <div class="relative flex items-center justify-between gap-3 transition-all duration-500 xl:gap-4 [px-0 py-2 | px-5 py-3 sm:px-7 sm:py-3.5]">
      <!-- Background pill (visible when scrolled or over light section) -->
      <div data-nav-surface="pill" data-nav-pill-active="[true | undefined]" class="pointer-events-none absolute inset-0 rounded-full border backdrop-blur-xl transition-[opacity,background-color,border-color] duration-300 ease-out [opacity-0 | opacity-100] [border-white/10] [bg-white/[0.02] | bg-black/80 | bg-black/[0.72]]" />
      
      <BrandLogo class="relative z-[1] shrink-0 transition-colors duration-500 [text-text-main | text-white]" />
      
      <!-- Desktop nav -->
      <nav class="relative z-[1] hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-5">
        <!-- Nav links and dropdowns here -->
      </nav>
      
      <!-- Action buttons + mobile toggle -->
      <div class="relative z-[1] flex shrink-0 items-center gap-2 sm:gap-3">
        <Button to="/contact" variant="secondary" size="sm" arrow="up-right" class="hidden whitespace-nowrap px-5 xl:inline-flex text-sm tracking-wider font-medium">
          Book Consultation
        </Button>
        <Button href="https://onecapitalinvestment.investwell.app/app/#/login" variant="outline" size="sm" class="hidden whitespace-nowrap px-5 xl:inline-flex text-sm tracking-wider font-medium [text-white | text-white/80]">
          Login
        </Button>
        <button type="button" class="xl:hidden relative inline-flex items-center justify-center min-h-11 min-w-11 text-white transition-colors hover:text-white/80">
          <Menu | X class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile menu panel (full-screen overlay) -->
  <div id="mobile-nav" role="dialog" aria-modal="true" class="fixed inset-0 z-[var(--z-overlay)] bg-canvas transition-all duration-500 xl:hidden flex flex-col overflow-y-auto overscroll-contain px-[var(--page-gutter)] pt-[calc(env(safe-area-inset-top)+4.25rem)] pb-[max(1.5rem,env(safe-area-inset-bottom))] [opacity-0 pointer-events-none | opacity-100 pointer-events-auto]">
    <!-- Mobile nav content -->
  </div>
</header>
```

### States

1. **Default (not scrolled, not over light):**
   - `py-6` (24px vertical padding)
   - `max-w-none` (full width)
   - `px-0 py-2` (inner: 8px vertical)
   - Pill: `opacity-0`
   - Text: `text-text-main` (white/90 default)

2. **Scrolled (`scrollY > 50px`) or over `.light-section`:**
   - `py-4` (16px vertical padding)
   - `max-w-[calc(100vw-1.25rem)]` on sm, `sm:max-w-[calc(100vw-1.75rem)]`
   - `px-5 py-3 sm:px-7 sm:py-3.5` (inner: 20px/28px horizontal, 12px/14px vertical)
   - Pill: `opacity-100`
   - **Over light:** `border-white/10 bg-black/80 text-white`
   - **Over dark:** `border-white/10 bg-white/[0.02] max-xl:bg-black/[0.72] text-white/90`

### Dropdown Panel (Desktop)

**Surface:** White mega/single dropdown — ET Money–style solid panel on dark nav

```css
background-color: #FFFFFF;
border-color: rgba(0, 0, 0, 0.06);
box-shadow: 0 0 15px rgb(0 0 0 / 25%);
```

**Classes:**

```
rounded-2xl border
[mega] min-w-[40rem] max-w-[min(44rem,calc(100vw-2rem))] px-7 py-8
[single] min-w-[17rem] px-5 py-6
```

**Mega dropdown:** 2-column grid, `gap-x-10`, `max-h-[calc(100vh-8rem)] overflow-y-auto`

**Row item:**

```html
<Link class="group/item flex min-h-11 items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-black/[0.04]">
  <span class="inline-flex size-7 shrink-0 items-center justify-center text-neutral-600 transition-colors group-hover/item:text-neutral-900">
    <Icon class="h-5 w-5" stroke-width="1.75" />
  </span>
  <span class="relative inline-block text-base font-medium tracking-tight transition-colors [text-neutral-800 group-hover/item:text-neutral-900 | text-neutral-900]">
    Name
    <!-- Active underline when pathname matches -->
    <span class="absolute -bottom-1 left-0 h-px w-full bg-neutral-900 opacity-40" />
    <!-- Hover underline -->
    <span class="absolute -bottom-1 left-0 h-px w-0 bg-neutral-900 opacity-0 transition-all duration-300 group-hover/item:w-full group-hover/item:opacity-40" />
  </span>
</Link>
```

### Mobile Menu

**Panel:** Full-screen overlay

- `fixed inset-0`
- `z-[var(--z-overlay)]` = `100`
- `bg-canvas` (black)
- `px-[var(--page-gutter)]`
- `pt-[calc(env(safe-area-inset-top)+4.25rem)]` (68px + safe area)
- `pb-[max(1.5rem,env(safe-area-inset-bottom))]` (24px min)
- Scroll lock: `overflow: hidden` on `<html>` and `<body>` when open

**Typography:** `text-2xl font-medium tracking-tight`

### Spacing (px)

- Header vertical: 24px default, 16px scrolled
- Inner horizontal: 0 default, 20px scrolled (sm: 28px)
- Inner vertical: 8px default, 12px scrolled (sm: 14px)
- Nav gap: 12px (2xl: 20px)
- Action gap: 8px (sm: 12px)
- Mobile menu gap: 4px (section items)

### Transitions

- `transition-all duration-500` — Header padding/width
- `transition-colors duration-500` — Text colors
- `transition-[opacity,background-color,border-color] duration-300` — Pill surface

### z-index

- `z-[var(--z-nav)]` = `1000` (header)
- `z-[var(--z-modal)]` = `2000` (inner container)
- `z-[var(--z-overlay)]` = `100` (dropdown, mobile menu)
- `z-[1]` — Relative stacking within header

---

## Footer.tsx

**Path:** `src/components/Footer.tsx`  
**Purpose:** Multi-column footer with brand, strategies, company links, contact CTA

### DOM Structure

```html
<footer class="w-full border-t border-white/10 pt-16 md:pt-20 pb-[max(2.5rem,env(safe-area-inset-bottom))] mt-0 px-[var(--page-gutter)] relative overflow-hidden min-w-0">
  <!-- Decorative large bg text (desktop/tablet) -->
  <div class="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] pointer-events-none whitespace-nowrap tracking-tighter mix-blend-screen z-0">
    One Capital
  </div>
  
  <RevealOnScroll class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-8 md:mb-20 relative z-10">
    <!-- Column 1: Brand -->
    <div class="flex flex-col items-center text-center md:items-start md:text-left gap-6 lg:pr-8">
      <BrandLogo class="text-white w-fit" mark-class-name="h-9 w-9" />
      <p class="text-text-muted text-base leading-relaxed max-w-sm text-balance">{COMPANY.tagline}</p>
      <SocialLinks class="mt-2 justify-center md:justify-start" />
      <AppDownloadCard class="mt-2 hidden w-full max-w-sm md:block" />
    </div>
    
    <!-- Column 2: Strategies (nested product tree) -->
    <div class="flex flex-col items-center text-center md:items-start md:text-left gap-4">
      <h4 class="text-sm uppercase tracking-wider font-mono text-text-muted mb-2">Strategies</h4>
      <!-- Strategies list with nested children, left border on children -->
    </div>
    
    <!-- Column 3: Company -->
    <div class="flex flex-col items-center text-center md:items-start md:text-left gap-4">
      <h4 class="text-sm uppercase tracking-wider font-mono text-text-muted mb-2">Company</h4>
      <!-- About, Approach, Team, Insights, Blog, Contact -->
    </div>
    
    <!-- Column 4: Contact/CTA -->
    <div class="flex flex-col items-center text-center md:items-start md:text-left gap-5">
      <h4 class="text-sm uppercase tracking-wider font-mono text-text-muted">Connect with Us</h4>
      <div class="flex flex-col items-center md:items-start gap-2.5 text-base text-white/70">
        <a href="tel:..." class="tabular-nums hover:text-white transition-colors w-fit">{COMPANY.phone}</a>
        <p class="text-text-muted leading-relaxed">{COMPANY.hqStreet}<br />{COMPANY.hqCity} {COMPANY.hqPostalCode}</p>
        <p class="text-xs font-mono text-white/45 leading-relaxed tracking-wide">
          GSTIN {COMPANY.gstin}<br />CIN {COMPANY.cin}
        </p>
      </div>
      <Button to="/contact" variant="secondary" arrow="up-right" class="w-full max-w-sm rounded-xl justify-between px-6 py-4 min-h-14 [&_.oc-btn-label]:w-full [&_.oc-btn-label]:justify-between">
        Book Consultation
      </Button>
      <AppDownloadCard class="w-full max-w-sm md:hidden" />
    </div>
  </RevealOnScroll>
  
  <!-- Mobile-only brand watermark -->
  <div class="md:hidden relative z-10 w-full flex justify-center items-center py-5 my-2">
    <p class="w-full max-w-md mx-auto px-1 text-center text-3xl font-bold tracking-tighter text-white/15">
      One Capital
    </p>
  </div>
  
  <!-- Bottom Bar -->
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 relative z-10">
    <p class="text-sm text-text-muted font-mono tracking-wide">© {year} {COMPANY.legalName}</p>
    <div class="flex flex-wrap items-center gap-6 justify-center">
      <!-- Privacy Policy, Terms of Service, Regulatory Disclosure, Risk Disclosure -->
    </div>
  </div>
</footer>
```

### Layout

- **Grid:** 1 column mobile, 2 on md (768px), 4 on lg (1024px)
- **Gap:** 48px mobile/tablet, 32px desktop
- **Max-width:** `max-w-7xl` (1280px) container
- **Padding:** Top 64px md:80px, bottom max(40px, safe-area), horizontal `var(--page-gutter)`

### Typography (px)

- Watermark: `text-[15vw]` (desktop), `text-3xl` (mobile, 30px)
- Column heading: `text-sm` (14px), uppercase, `tracking-wider`
- Link text: `text-base` (16px), `text-[15px]` (nested)
- Contact: `text-base` (16px), `text-xs` (12px for legal)
- Copyright: `text-sm` (14px), font-mono

### Spacing (px)

- Top: 64px (md: 80px)
- Bottom: max(40px, env(safe-area-inset-bottom))
- Grid gap: 48px (lg: 32px)
- Column gap: 16px (column items), 24px (brand column)
- Bottom bar: 16px gap, 32px padding-top

### Colors

- Border: `border-white/10`
- Watermark: `text-white/[0.02]` (desktop), `text-white/15` (mobile)
- Heading: `text-text-muted` (white/50 approx)
- Link: `text-white/80` hover `text-white`
- Nested: `text-white/60` hover `text-white`
- Contact: `text-white/70`, legal: `text-white/45`
- Bottom bar: `text-text-muted`

---

## Preloader.tsx

**Path:** `src/components/Preloader.tsx`  
**Purpose:** SVG morphing intro animation with heading reveal

### DOM Structure

```html
<div class="loader-wrap fixed inset-0 z-[var(--z-preloader,9999)] h-screen w-full flex items-center justify-center overflow-hidden bg-transparent pointer-events-auto" role="status" aria-live="polite" aria-busy="true" aria-label="ONE CAPITAL">
  <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" class="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
    <path ref={pathRef} fill="#000000" d="{morph path}" />
  </svg>
  
  <div class="loader-wrap-heading relative z-20 pointer-events-none px-4">
    <span class="block overflow-hidden py-3">
      <h1 ref={headingRef} class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-[0.25em] sm:tracking-[0.32em] uppercase text-white font-sans text-center">
        ONE CAPITAL
      </h1>
    </span>
  </div>
</div>
```

### Animation Sequence (GSAP)

1. **Heading reveal:**
   - From: `y: 70, opacity: 0, skewY: 4`
   - To: `y: 0, opacity: 1, skewY: 0` (duration: 0.7s, delay: 0.25s, ease: power3.out)
   - Dwell: 0.4s
   - Exit: `y: -70, opacity: 0, skewY: -4` (duration: 0.55s, ease: power3.in)
   - Set: `display: none` (immediate)

2. **SVG path morph:**
   - Initial: `M0,1005S175,995,500,995s500,5,500,5V0H0Z`
   - Curve: `M0 502S175 272 500 272s500 230 500 230V0H0Z` (duration: 0.75s, ease: power2.in) — **Handoff event fires here**
   - Flat: `M0 2S175 1 500 1s500 1 500 1V0H0Z` (duration: 0.75s, ease: power2.out)
   - Slide out: `yPercent: -100` (duration: 0.4s, ease: power2.inOut)
   - Set: `display: none, z-index: -1` + teardown

3. **Shell fade-in:**
   - When handoff: `.oc-shell` fades from `opacity: 0` to `1` (duration: 0.85s, ease: power2.out)

### Scroll Lock

- **Class:** `.oc-preloader-lock` on `<html>`
- **CSS:** `overflow: hidden` on `<html>` and `<body>`
- **Event:** `PRELOADER_DONE_EVENT` (custom event) dispatched when path reaches curve
- **Failsafe:** Force unlock after 6000ms if animation never completes

### Reduced Motion

If `prefersReducedMotion()`:
- No animation
- Immediate handoff and teardown

---

## ChatWidget.tsx

**Path:** `src/components/chat/ChatWidget.tsx`  
**Purpose:** Floating chat FAB with expandable panel

### DOM Structure

```html
<div class="[embedded flow | fixed z-[var(--z-toast)] bottom-[...] right-[...]] flex flex-col items-end justify-end gap-3 shrink-0">
  <!-- Panel (expandable) -->
  <div id="{panelId}" role="dialog" aria-modal="false" aria-label="One Capital chat" aria-hidden="{!open}" class="max-h-[min(70vh,32rem)] flex flex-col rounded-2xl overflow-hidden bg-[#0b0c0e]/92 backdrop-blur-2xl border border-white/15 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.9)] transition-all duration-300 [w-[min(22.5rem,calc(100dvw-2rem))] opacity-100 translate-y-0 pointer-events-auto | invisible pointer-events-none h-0 w-0 max-h-0 opacity-0 overflow-hidden border-0]">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 px-4 py-3.5 bg-black/40 border-b border-white/10 shrink-0 backdrop-blur-md">
      <div class="min-w-0">
        <p class="text-sm font-semibold text-white tracking-tight truncate">One Capital</p>
        <p class="text-[11px] font-mono uppercase tracking-widest text-text-muted">Advisory chat</p>
      </div>
      <button type="button" aria-label="Close chat" class="inline-flex items-center justify-center min-h-11 min-w-11 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Message history -->
    <div ref={listRef} class="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3 min-h-[12rem]">
      <div class="[ml-auto | mr-auto] max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed [bg-white text-black font-medium shadow-sm | text-white/95 bg-white/[0.08] border border-white/10 backdrop-blur-md]">
        {message.text}
      </div>
    </div>
    
    <!-- Action Link -->
    <div class="px-4 pb-2 shrink-0">
      <Link to="/contact" class="text-xs text-text-muted hover:text-white underline-offset-4 hover:underline transition-colors">
        Book Consultation
      </Link>
    </div>
    
    <!-- Input area -->
    <form class="flex items-center gap-2 px-3 py-3 bg-black/40 border-t border-white/10 shrink-0 backdrop-blur-md">
      <input type="text" class="min-h-11 flex-1 rounded-xl px-3 text-sm text-white placeholder:text-white/40 bg-white/[0.06] border border-white/12 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30" placeholder="Type a message…" />
      <button type="submit" class="inline-flex items-center justify-center min-h-11 min-w-11 rounded-xl text-white bg-white/[0.08] hover:bg-white/15 border border-white/12 disabled:opacity-40 disabled:pointer-events-none transition-colors">
        <Send class="w-4 h-4" />
      </button>
    </form>
  </div>
  
  <!-- Trigger FAB -->
  <button type="button" aria-label="{open ? 'Close chat' : 'Open chat'}" aria-expanded="{open}" aria-controls="{panelId}" class="inline-flex items-center justify-center min-h-14 min-w-14 rounded-full text-white bg-[#0b0c0e]/92 hover:bg-[#15171c] backdrop-blur-2xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.8)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black">
    <X | ChatbotIcon class="[w-6 h-6 | w-12 h-12]" />
  </button>
</div>
```

### Layout

- **Panel:** Max-width `min(22.5rem, calc(100dvw - 2rem))` = max 360px, min 2rem margin
- **Max-height:** `min(70vh, 32rem)` = max 512px or 70% viewport
- **Message history:** Flex-1, `overflow-y-auto`, `min-h-[12rem]` (192px)

### Spacing (px)

- Gap: 12px
- Panel padding: 16px (messages), 12px (input area)
- Header padding: 16px horizontal, 14px vertical
- Message padding: 14px horizontal, 10px vertical
- FAB: 56px × 56px

### Colors

- Panel bg: `#0b0c0e` @ 92% opacity
- Header bg: `black` @ 40% opacity
- User message: `bg-white text-black`
- Assistant message: `bg-white` @ 8% opacity, `text-white/95`, `border-white/10`
- FAB bg: `#0b0c0e` @ 92%, hover: `#15171c`
- Border: `border-white/15` (panel), `border-white/10` (dividers)

### Transitions

- Panel: `transition-all duration-300` (width, opacity, transform)
- FAB: `transition-all duration-300`
- Buttons: `transition-colors`

---

## AppDownloadFloatingWidget.tsx

**Path:** `src/components/AppDownloadFloatingWidget.tsx`  
**Purpose:** Floating QR code widget with hover scale animation

### DOM Structure

```html
<div ref={containerRef} class="rounded-2xl border border-white/10 bg-[#0a0a0a] p-2.5 shadow-2xl will-change-transform [embedded | fixed z-[calc(var(--z-toast)-1)] hidden md:block bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))]]" aria-label="Download the One Capital app">
  <AppDownloadPanel qr-size="sm" />
</div>
```

### GSAP Hover Animation

- **Scale:** `1` → `1.3`
- **Origin:** `bottom right`
- **Duration:** `motionTokens.duration.fast` (approx 0.25s)
- **Ease:** `motionTokens.ease.smooth` (power2.out)
- **Paused:** Yes, plays on mouseenter, reverses on mouseleave

### Spacing (px)

- Padding: 10px
- Position: Bottom 20px min, right 16px min (with safe-area)

### Colors

- Background: `#0a0a0a`
- Border: `border-white/10`
- Shadow: `shadow-2xl`

---

## RiskFactorsStrip.tsx

**Path:** `src/components/sections/legal/RiskFactorsStrip.tsx`  
**Purpose:** Legal disclosure footer with risk factors and registration details

### DOM Structure

```html
<aside class="w-full bg-canvas border-t border-white/10 px-[var(--page-gutter)] py-10 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]" aria-labelledby="risk-factors-heading">
  <div class="mx-auto w-full max-w-7xl flex flex-col items-stretch gap-6 text-left">
    <h2 id="risk-factors-heading" class="text-sm md:text-base font-medium text-white tracking-tight">
      {title}
    </h2>
    
    <div class="flex flex-col gap-3">
      <p class="text-xs md:text-[13px] leading-relaxed text-text-muted">{disclosure}</p>
      <p class="text-xs leading-relaxed text-text-muted">{regulatoryNote}</p>
    </div>
    
    <div class="flex flex-col gap-3 pt-6 border-t border-white/10">
      <p class="text-xs leading-relaxed text-white/75">{advisoryNote}</p>
      <p class="text-xs md:text-[13px] font-semibold text-white/90">&ldquo;{statutoryLine}&rdquo;</p>
    </div>
    
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 pt-2">
      <li class="text-[11px] font-mono text-white/55 leading-relaxed">{registrationLine}</li>
    </ul>
  </div>
</aside>
```

### Layout

- **Max-width:** `max-w-7xl` (1280px)
- **Grid:** 1 column mobile, 2 on md (768px) for registration list
- **Gap:** 24px (main sections), 12px (paragraphs), 8px (list items)

### Typography (px)

- Heading: 14px (md: 16px)
- Disclosure: 12px (md: 13px)
- Advisory: 12px
- Statutory: 12px (md: 13px)
- Registration: 11px, font-mono

### Spacing (px)

- Padding: 40px vertical (md: 48px), bottom max(32px, safe-area)
- Gap: 24px (sections), 12px (paragraphs)
- Divider: 24px padding-top

### Colors

- Background: `bg-canvas` (black)
- Border: `border-white/10`
- Heading: `text-white`
- Disclosure: `text-text-muted` (white/50 approx)
- Advisory: `text-white/75`
- Statutory: `text-white/90`
- Registration: `text-white/55`

---

## Data Sources

- **Navbar:** `src/data/products.ts` (getOfferTree), `NAV_ITEMS` constant
- **Footer:** `src/data/company.ts` (COMPANY), `src/data/products.ts` (getOfferTree)
- **RiskFactorsStrip:** `src/data/home-risk-factors.ts` (HOME_RISK_FACTORS)

## Clone Checklist

1. Copy `Layout.tsx`, configure Lenis with exact options
2. Copy `Navbar.tsx`, implement scroll/light detection, pill background transition
3. Copy `Footer.tsx`, implement 4-column grid, nested product tree
4. Copy `Preloader.tsx`, implement SVG path morph timeline with exact timing
5. Copy `ChatWidget.tsx`, implement expandable panel with message list
6. Copy `AppDownloadFloatingWidget.tsx`, implement GSAP hover scale
7. Copy `RiskFactorsStrip.tsx`, grid layout with legal content
8. Verify z-index layers: preloader (9999) > toast (3000) > modal (2000) > nav (1000) > overlay (100)
9. Test scroll lock on mobile menu and preloader
10. Test Lenis smooth scroll on desktop, native scroll on touch devices
11. Test dropdown mega/single panel positioning and hover close delay
12. Test mobile menu accordion expansion with nested links
