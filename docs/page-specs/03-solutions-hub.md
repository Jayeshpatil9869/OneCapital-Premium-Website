# Solutions Hub Page Specification

**Route:** `/solutions`  
**Page File:** `src/pages/Solutions.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Page Composition (Ordered)

The `/solutions` route renders a single mega-component: **SolutionsCatalogue**, which internally composes all sections.

**Main Component:** `SolutionsCatalogue` from `src/components/sections/solutions/SolutionsCatalogue.tsx`

Internal section sequence (from SolutionsCatalogue):
1. **Hero Section** — Products headline + product index nav
2. **What We Offer** — Research statement + product groups (OfferGroup components with GSAP pin)
3. **Investment Advisory** — Statement + body
4. **Solution Pillars** (Mandate components × 3) — Wealth Management, Portfolio Management, Capital Strategy (alternating bg)
5. **Trust Band** — Headline + numbered points + CTA

---

## Section Details

### 1. Hero Section
**Internal Section:** First `<section>` in SolutionsCatalogue  
**Surface:** Black with white/15 border-bottom  
**Motion Wrapper:** RevealOnScroll (trigger="load", staggered)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `border-b border-white/15 pt-[max(7.5rem,env(safe-area-inset-top))]` | Top padding 120px minimum | Safe-area aware |
| Container | `max-w-[1400px] px-6 pb-14 sm:px-8 lg:px-12 lg:pb-20` | Max 1400px, padding 24px→32px→48px, bottom 56px→80px | Responsive padding |
| Eyebrow | `font-mono text-[11px] uppercase tracking-[0.22em] text-[#757575]` | 11px text, 0.22em tracking | "Products" label |
| Heading (H1) | `mt-6 max-w-[12ch] text-[2.75rem] sm:text-6xl lg:text-[4.5rem]` | Margin-top 24px, max 12 characters, 44px→60px→72px | Semibold, leading-[0.98], tracking-[-0.04em] |
| Heading Line 2 | `mt-1 block text-white/40` | Margin-top 4px | Faded second line |
| Content Grid | `mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12` | Margin-top 40px, gap 40px→48px | 2-col on desktop (5 + 7) |
| Description (left) | `max-w-md text-base lg:text-lg lg:col-span-5` | Max 448px, 16px→18px | Font-light, leading-relaxed, text-[#B3B3B3] |
| Nav (right) | `lg:col-span-7 lg:col-start-6` | — | Ordered list of top-level products |
| Nav List | `divide-y divide-white/15 border-y border-white/15` | — | Vertical dividers + top/bottom borders |
| Nav Link | `flex items-baseline justify-between gap-6 py-3.5` | Padding 14px vertical, gap 24px | Text-white/60 hover:text-white; hover translate-x -12px on pointer:fine |
| Link Number | `font-mono text-[11px] tracking-[0.16em]` | 11px text | Zero-padded 2-digit index |
| Link Label | `text-sm sm:text-base` | 14px→16px | Product navLabel |

**Copy Source:** `SOLUTIONS_HUB.hero` from `src/data/solutions-pages`  
**Nav Data:** `getTopLevelProducts()` from `src/data/products`  
**Clone Notes:** RevealOnScroll wraps heading + nav grid (delays 0s, 0.12s). Nav links slide left on hover ([@media(hover:hover) and (pointer:fine)]). Links route to `product.path`.

---

### 2. What We Offer Section
**Internal Section:** `#what-we-offer`  
**Surface:** Black with white/10 border-bottom  
**Motion Wrapper:** ScrollFade per OfferGroup

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `border-b border-white/10 bg-black` | — | Scroll anchor `scroll-mt-28` (112px) |
| Container | `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24` | Max 1400px, padding 24px→32px→48px, vertical 64px→80px→96px | Standard container |
| Header Eyebrow | `font-mono text-xs uppercase tracking-[0.2em] text-[#757575]` | 12px text, 0.2em tracking | "What we offer" label |
| Heading (H2) | `mt-4 max-w-3xl text-[clamp(1.5rem,1rem+2vw,3rem)]` | Margin-top 16px, max 768px, 24px→48px fluid | Font-medium, leading-tight, tracking-tight |
| Description | `mt-5 max-w-2xl text-lg md:text-xl` | Margin-top 20px, max 672px, 18px→20px | Font-light, leading-relaxed, text-[#B3B3B3] |
| **OfferGroup Container** | `mt-16` | Margin-top 64px | Renders each PRODUCT_GROUPS item |

**Copy Source:** Static strings in component ("Six products. One research view.", etc.)  
**Data:** `PRODUCT_GROUPS` from `src/data/products`  
**Clone Notes:** OfferGroup is a sub-component with GSAP ScrollTrigger pin on desktop (≥1024px). Title pins while list scrolls past. Each group is a grid with 4-col title (pinned) + 8-col list.

#### OfferGroup Layout

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Group Wrapper | `grid gap-8 lg:grid-cols-12 lg:gap-16 border-t border-white/15 py-10 lg:py-12` | Gap 32px→64px, padding 40px→48px | 12-col grid on desktop |
| Title (pinned) | `lg:col-span-4 lg:self-start` | — | Text-2xl lg:text-3xl, font-medium, tracking-tight |
| List | `border-t border-white/15 lg:col-span-8` | — | Unordered list of products |
| **Product Item** | `border-b border-white/15` | — | ScrollFade with delay index*0.06s |
| Product Link | `grid gap-2 sm:grid-cols-12 sm:gap-6 py-7 sm:py-8` | Padding 28px→32px, gap 8px→24px | Hover text-white/80 transition-colors |
| Product Title | `text-lg sm:text-xl sm:col-span-4` | 18px→20px, 4 cols | Font-medium, tracking-tight, text-white |
| Product Audience | `text-sm sm:text-base sm:col-span-5` | 14px→16px, 5 cols | Font-light, leading-relaxed, text-white/60 |
| Product Eligibility | `font-mono text-[11px] uppercase tracking-[0.14em] sm:col-span-3` | 11px, 3 cols | Text-white/45 |
| **Child Products** | `mb-6 border-t border-white/10` | Margin-bottom 24px | Nested unordered list if children exist |
| Child Link | `block py-3 pl-4 sm:pl-6 text-sm sm:text-base` | Padding 12px vertical, left 16px→24px, 14px→16px | Text-white/70 hover:text-white |

**GSAP Pin Logic (desktop ≥1024px):**
- Trigger: titleRef element
- Start: `top ${navPinOffset()}px` (navbar bottom + 20px)
- End: `+=${list.offsetHeight - title.offsetHeight}` (list height minus title height)
- Pin: titleRef (fixed pinType)
- Pin Spacing: false
- Invalidate on Refresh: true

**Clone Notes:** Title is ref={titleRef}, list is ref={listRef}. GSAP matchMedia only activates on ≥1024px. Children are displayed if `getProductChildren(product.id).length > 0`. Children can be links or plain spans (check child.path).

---

### 3. Investment Advisory Section
**Internal Section:** Unnamed section between "What We Offer" and "Pillars"  
**Surface:** `bg-[#1D1D1D]` with white/10 border-bottom  
**Motion Wrapper:** RevealOnScroll

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `bg-[#1D1D1D] border-b border-white/10` | — | Light tone |
| Container | `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28` | Padding 24px→32px→48px, vertical 64px→80px→112px | Standard container |
| Grid | `grid items-start gap-8 lg:grid-cols-12 lg:gap-16` | Gap 32px→64px | 2-col on desktop (7 + 4) |
| Eyebrow | `font-mono text-[11px] uppercase tracking-[0.22em] text-[#757575] lg:col-span-7` | 11px text | "Investment Advisory" label |
| Statement | `mt-4 text-2xl sm:text-3xl lg:text-[2.35rem] lg:col-span-7` | Margin-top 16px, 24px→30px→37.6px | Font-medium, leading-[1.25], tracking-[-0.03em], text-balance, text-white |
| Body | `max-w-md text-base lg:text-lg lg:col-span-4 lg:col-start-9` | Max 448px, 16px→18px | Font-light, leading-relaxed, text-[#B3B3B3] |

**Copy Source:** `SOLUTIONS_HUB.intro` from `src/data/solutions-pages`  
**Clone Notes:** RevealOnScroll wrapper. Eyebrow + statement in left 7 cols, body in right 4 cols starting at col 9 (grid math: 7+1+4=12, but col-start-9 creates a 1-col gap).

---

### 4. Solution Pillars (Mandate Components)
**Internal Sections:** Three `<Mandate>` components, one per SOLUTION_PILLARS item  
**Surfaces:** Alternating `bg-black` (dark) / `bg-[#1D1D1D]` (light) tones  
**Motion Wrapper:** ScrollFade per service item, GSAP pin on aside

**Pillars Rendered:**
1. Wealth Management (tone: dark)
2. Portfolio Management (tone: light)
3. Capital Strategy (tone: dark)

#### Mandate Layout

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `scroll-mt-28 border-b border-white/10` | Scroll margin-top 112px | ID = `pillar.id`; aria-labelledby |
| Container | `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24` | Padding 24px→32px→48px, vertical 64px→80px→96px | Standard container |
| Grid | `grid gap-10 lg:grid-cols-12 lg:gap-16` | Gap 40px→64px | 2-col on desktop (4 + 8) |
| **Aside (pinned)** | `lg:col-span-4 lg:self-start` | — | Pinned on desktop; ref={asideRef} |
| Index Label | `font-mono text-[11px] tracking-[0.2em] text-[#757575]` | 11px text | Pillar index (e.g., "01 / 03") |
| Heading (H2) | `mt-3 text-3xl sm:text-4xl` | Margin-top 12px, 30px→36px | Font-semibold, leading-[1.08], tracking-[-0.03em], text-white |
| Summary | `mt-4 max-w-sm text-base` | Margin-top 16px, max 384px, 16px | Leading-relaxed, text-[#B3B3B3] |
| View Link | `mt-6 inline-flex font-mono text-[11px] uppercase tracking-[0.16em]` | Margin-top 24px, 11px | Text-white underline-offset-4 hover:underline |
| **Services List** | `border-t border-white/10 lg:col-span-8` | — | Unordered list; ref={listRef} |
| Service Item | `border-b border-white/10 py-7 sm:py-8` | Padding 28px→32px | ScrollFade delay min(index*0.05, 0.2) |
| Service Grid | `grid gap-2 sm:grid-cols-12 sm:gap-6` | Gap 8px→24px | Title (5 cols) + description (7 cols) |
| Service Title (H3) | `text-lg sm:text-xl sm:col-span-5` | 18px→20px | Font-medium, tracking-tight, text-white |
| Service Tagline | `text-white font-medium mb-1 block` | Bottom margin 4px | Nested in description paragraph |
| Service Description | `text-sm sm:text-base sm:col-span-7` | 14px→16px | Leading-relaxed, text-[#B3B3B3] |

**Copy Source:** `SOLUTION_PILLARS` from `src/data/solutions-pillars`  
**Clone Notes:** Aside pins on desktop (≥1024px) using same GSAP logic as OfferGroup (start `top ${navPinOffset()}px`, end `+=${list.offsetHeight - aside.offsetHeight}`). Tone alternates per index: even=dark (bg-black), odd=light (bg-[#1D1D1D]). Portfolio Management pillar shows footnote below list if `pillar.id === 'portfolio-management'` (text-sm text-[#757575]).

---

### 5. Trust Band Section
**Internal Section:** Final section in SolutionsCatalogue  
**Surface:** `bg-[#1D1D1D]` with white/10 border-top  
**Motion Wrapper:** ScrollFade

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `bg-[#1D1D1D] border-t border-white/10` | — | Light tone |
| Container | `max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24` | Padding 24px→32px→48px, vertical 64px→80px→96px | Standard container |
| Grid | `grid gap-10 lg:grid-cols-12 lg:gap-16` | Gap 40px→64px | 2-col on desktop (5 + 6) |
| Eyebrow | `font-mono text-[11px] uppercase tracking-[0.22em] text-[#757575] lg:col-span-5` | 11px text | "Why choose us" or similar |
| Headline (H2) | `mt-4 max-w-[16ch] text-3xl sm:text-4xl lg:col-span-5` | Margin-top 16px, max 16 characters, 30px→36px | Font-semibold, leading-[1.1], tracking-[-0.03em], text-white |
| CTA Button | `mt-8` | Margin-top 32px | Button variant="primary" size="sm" to="/contact" |
| Points List (ol) | `border-t border-white/10 lg:col-span-6 lg:col-start-7` | — | Ordered list of trust points |
| Point Item | `grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-5` | Cols 48px + 1fr, gap 16px, padding 20px | Text-base sm:text-lg |
| Point Number | `font-mono text-[11px] tracking-[0.14em] text-white/40` | 11px text | Zero-padded 2-digit index |
| Point Text | Leading-relaxed, text-[#B3B3B3] | — | Simple string |

**Copy Source:** `SOLUTIONS_HUB.trust` from `src/data/solutions-pages`  
**Clone Notes:** Button is `<Button>` ui component (variant/size props). Points are numbered (ol, not ul). Grid is 2-col on desktop (5+6 leaving 1-col gap, or 5 left + 7 right with col-start-7).

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top; `navPinOffset()` util queries `[data-site-nav]` bottom for pin calculations.
- **Footer:** Appended after all sections; not controlled by Solutions.tsx.
- **Global Wrapper:** Page wrapper is `<div className="w-full bg-black text-white">` from SolutionsCatalogue top-level.
- **SEO:** usePageSeo with buildServiceJsonLd + ItemList jsonLd for products and solution overviews.

---

## Typography Scale

| Element | Mobile | Small | Medium | Large | Notes |
|---------|--------|-------|--------|-------|-------|
| Hero H1 | 44px | 60px | — | 72px | text-[2.75rem] sm:text-6xl lg:text-[4.5rem] |
| Hero Description | 16px | — | — | 18px | text-base lg:text-lg |
| What We Offer Heading | 24px→48px fluid | — | — | — | clamp(1.5rem, 1rem+2vw, 3rem) |
| Advisory Statement | 24px | 30px | — | 37.6px | text-2xl sm:text-3xl lg:text-[2.35rem] |
| Mandate Heading | 30px | 36px | — | — | text-3xl sm:text-4xl |
| Service Title | 18px | 20px | — | — | text-lg sm:text-xl |
| Trust Headline | 30px | 36px | — | — | text-3xl sm:text-4xl |

---

## Motion Details

| Component | Trigger | Distance | Duration | Delay | Notes |
|-----------|---------|----------|----------|-------|-------|
| Hero Eyebrow | load | 24px up | 1s | 0s | RevealOnScroll |
| Hero Heading | load | 24px up | 1s | 0s | RevealOnScroll |
| Hero Nav Grid | load | 18px up | 0.9s | 0.12s | RevealOnScroll |
| Offer Groups | scroll | default | default | index*0.06s stagger | ScrollFade per product |
| Advisory Block | scroll | default | default | 0s | RevealOnScroll |
| Mandate Aside | scroll (pinned on desktop) | — | — | — | GSAP ScrollTrigger pin |
| Mandate Services | scroll | default | default | min(index*0.05, 0.2) | ScrollFade per service |
| Trust Band | scroll | default | default | 0s | ScrollFade |

**GSAP Pin Logic:** Two pin contexts — OfferGroup titles and Mandate asides. Both use `matchMedia('(min-width: 1024px)')` to activate desktop-only. Pin start = navbar bottom + 20px. Pin end = list height - pinned element height. No pin spacing (overlaps). Fixed pin type (CSS position:fixed).

---

## Clone Checklist

- [ ] All copy from `SOLUTIONS_HUB`, `PRODUCT_GROUPS`, `SOLUTION_PILLARS` data (no hard-coded strings)
- [ ] Hero nav links route to `product.path`, not `#` anchors
- [ ] OfferGroup title pins on scroll (desktop only)
- [ ] OfferGroup list shows nested children if `getProductChildren().length > 0`
- [ ] Mandate asides pin on scroll (desktop only)
- [ ] Tone alternates between pillars: dark (black) / light (#1D1D1D)
- [ ] Portfolio Management pillar shows footnote: `PORTFOLIO_MANAGEMENT_FOOTNOTE`
- [ ] Trust band CTA button routes to `/contact`
- [ ] All sections use border-white/10 or border-white/15 as specified
- [ ] GSAP cleanup on unmount/resize (ctx.revert())
- [ ] Prefer `prefersReducedMotion()` check before GSAP animations
- [ ] SEO includes buildServiceJsonLd + ItemList with products and solution overviews
- [ ] All containers max-w-[1400px] (consistent across sections)
