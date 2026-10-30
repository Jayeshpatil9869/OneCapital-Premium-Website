# Team Page Specification

**Route:** `/team`  
**Page File:** `src/pages/Team.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Page Composition (Ordered)

1. **TeamHero** — Full viewport hero with background image
2. **DirectorAboutSection** — Editorial large-text story with GSAP scroll-scrub text reveal
3. **Team** — Team member cards (wrapped in ScrollFade)
4. **TeamGallerySection** — Office/culture gallery section (wrapped in ScrollFade)
5. **EditorialStatementCTA** — Call-to-action section (wrapped in ScrollFade)

---

## Section Details

### 1. TeamHero
**Component:** `src/components/sections/team/TeamHero.tsx`  
**Surface:** Black base with background image overlay gradients  
**Motion Wrapper:** RevealOnScroll (trigger="load", staggered reveals)

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Outer Section | `min-h-[100svh] flex flex-col justify-end` | Min-height = viewport | Full-bleed hero; content anchored to bottom |
| Background Image Container | `absolute inset-0` | Full cover | Contains image + gradient overlays |
| Background Image | `object-cover object-[center_40%] lg:object-center` | — | Mobile: center 40% vertical; Desktop: center center |
| Gradient Overlay | `absolute inset-0` | — | Linear gradient: black→transparent→black (0%→22%→50%→88%→100%) with varying opacity |
| Container | Standard Container from ui/ | — | Uses ui/Container default |
| Top Padding | `pt-[max(7.5rem,env(safe-area-inset-top))]` | 120px minimum | Safe-area aware top spacing |
| Bottom Padding | `pb-14 sm:pb-16 lg:pb-20` | 56px→64px→80px | Graduated bottom spacing |
| Content Wrapper | `flex flex-col gap-8 sm:gap-10 lg:gap-12` | Gap 32px→40px→48px | Vertical stacked headline + description |
| Headline (H1) | `text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[4.2rem] xl:text-[4.2rem]` | 40px→60px→84px→67.2px | Bold, tight tracking (-0.03em), leading-[1.02] |
| Headline Line Break | `<br />` between line1 and line2 | — | Two-line heading |
| Description Container | `border-t border-white/15 pt-6 sm:pt-8` | Top border + 24px→32px padding | Divider above text |
| Description | `max-w-[38rem] text-[15px] sm:text-base lg:text-lg` | Max 608px, 15px→16px→18px | Font-light, leading-[1.65], text-white/90 |

**Copy Source:** `TEAM_PAGE.hero` from `src/data/team-page`  
**Image:** `/images/team-hero-bg.jpg` (object-cover, object-[center_40%] on mobile)  
**Clone Notes:** Two RevealOnScroll reveals — headline (delay 0.1s, distance 32px, duration 1.1s), description (delay 0.22s, distance 24px, duration 1s). Gradient uses rgba values for smooth black fade. Background image is decorative (empty alt).

---

### 2. DirectorAboutSection
**Component:** `src/components/sections/team/DirectorAboutSection.tsx`  
**Surface:** Black with white/10 border-top/bottom  
**Motion Wrapper:** GSAP ScrollTrigger scroll-scrub text reveal

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 border-y border-white/10` | Padding 80px→112px→128px | Ref: sectionRef |
| Ambient Glow 1 | `absolute top-1/4 -right-24 h-[500px] w-[500px]` | Top 25%, right -96px, 500×500px | Radial gradient white/[0.04], blur-[120px], -z-10 |
| Ambient Glow 2 | `absolute bottom-10 -left-24 h-[450px] w-[450px]` | Bottom 40px, left -96px, 450×450px | Radial gradient white/[0.03], blur-[110px], -z-10 |
| Container | `max-w-[1340px] px-4 sm:px-6 lg:px-8` | Max 1340px, padding 16px→24px→32px | Slightly wider than hero |
| Grid | `grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20` | Gap 48px→64px→80px | 2-col on desktop |
| **Left Column** (lg:col-span-7) | `flex flex-col` | — | Editorial story with GSAP scrub; ref: textContainerRef |
| Eyebrow Container | `flex items-center gap-3` | Gap 12px | Horizontal line + label + pulse dot |
| Eyebrow Line | `h-px w-8 bg-white/40` | Height 1px, width 32px | aria-hidden decorative |
| Eyebrow Label | `font-mono text-xs uppercase tracking-[0.28em] text-zinc-400` | 12px text, 0.28em tracking | Dynamic from data or "About Me" |
| Pulse Dot Outer | `relative flex h-2 w-2` | 8×8px | Contains animated ping + solid dot |
| Pulse Dot Ping | `absolute h-full w-full animate-ping rounded-full bg-white opacity-60` | — | Animated ping effect |
| Pulse Dot Inner | `relative h-2 w-2 rounded-full bg-white` | 8×8px | Solid white dot |
| Lead Statement (H2) | `mt-8 text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.9rem]` | Margin-top 32px, 24px→30px→36px→42.4px→46.4px | Font-medium, leading-[1.24], tracking-[-0.02em], text-white/20 (scrubbed to white) |
| **Right Column** (lg:col-span-5) | `w-full lg:flex lg:justify-end` | — | Clean portrait image |
| Image Container | `mx-auto max-w-[440px] lg:mx-0 aspect-[4/5] sm:aspect-[4/4.8] rounded-[28px]` | Max 440px, border-radius 28px | Border border-white/10, bg-zinc-950, shadow-2xl |
| Portrait Image | `object-cover` | — | Dynamic object-position from data (default: 'center 18%'); hover scale-[1.02] (700ms ease-out) |

**Copy Source:** `DIRECTOR_ABOUT` from `src/data/team`  
**Image:** Dynamic from `DIRECTOR_ABOUT.image`, alt from `imageAlt`, position from `imagePosition`  
**GSAP Scroll-Scrub Logic:**
- Target: All `[data-lead-char]` spans (one per character in lead text)
- Initial: `color: rgba(255, 255, 255, 0.22)` (dim)
- Scrubbed: `color: #ffffff` (lit)
- ScrollTrigger: start 'top 75%', end 'bottom 35%', scrub 1, stagger 0.04
- Reduced-motion: Sets all chars to white immediately, no scrub

**Lead Text Structure:**
- Lead paragraph split into words → split into chars
- Each char wrapped in `<span data-lead-char>` with inline-block, transition-colors 75ms
- Words are inline-block with whitespace-nowrap + right margin 0.28em
- SR-only full text for accessibility, aria-hidden on visual spans

**Clone Notes:** Left column is editorial with large font. Right column is clean portrait with rounded corners (no device frame). Ambient glows are decorative gradients (pointer-events-none, aria-hidden). GSAP context scoped to sectionRef. Lead text uses custom ScrubParagraph/ScrubWord components (defined in component file). Eyebrow has animated pulse dot. Portrait has lazy load, decoding async, width 720, height 900 (intrinsic).

---

### 3. Team
**Component:** `src/components/Team.tsx` (imported in page)  
**Surface:** (Defined in Team component; typically cards on black)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

**Note:** Team component is defined separately in `src/components/Team.tsx`. It renders team member cards. For full clone spec, see Team.tsx source. Typical structure:
- Grid of TeamCard components
- Each card has image, name, title, bio
- Cards use glass styling (border, bg-[#1D1D1D], hover effects)

**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component-level layout and styling defined in Team.tsx (not in page file).

---

### 4. TeamGallerySection
**Component:** `src/components/sections/team/TeamGallerySection.tsx`  
**Surface:** (Defined in component; typically black with gallery grid)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

**Note:** TeamGallerySection component is defined separately. It renders office/culture gallery images. For full clone spec, see TeamGallerySection.tsx source. Typical structure:
- Grid of images
- Gallery heading + description
- Masonry or grid layout
- Image overlays and hover effects

**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component-level layout and styling defined in TeamGallerySection.tsx (not in page file).

---

### 5. EditorialStatementCTA
**Component:** `src/components/sections/cta/EditorialStatementCTA.tsx`  
**Surface:** (Defined in component; typically black with centered text)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

| Prop | Value from TEAM_PAGE.cta | Notes |
|------|--------------------------|-------|
| line1 | cta.line1 | First headline line |
| line2 | cta.line2 | Second headline line |
| line3Prefix | "" (empty) | Prefix before outlined text |
| line3Outlined | cta.line3Outlined | Outlined text (stroke effect) |
| line3Suffix | "?" | Suffix after outlined text |
| italicQuote | cta.italicQuote | Italic quote below headline |
| buttonText | cta.buttonText | CTA button label |
| buttonLink | cta.buttonLink | CTA button href |

**Copy Source:** `TEAM_PAGE.cta` from `src/data/team-page`  
**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component renders large editorial statement with outlined text effect and button CTA. For full layout spec, see EditorialStatementCTA.tsx source.

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top; height factored into hero pt-[max(7.5rem,...)].
- **Footer:** Appended after all sections; not controlled by TeamPage.tsx.
- **Global Wrapper:** Page wrapper is `<div className="w-full flex flex-col items-center">` — full-width with centered flex column.
- **ScrollFade Wrapper:** ScrollFade wraps sections 3, 4, 5 with className="w-full".
- **SEO:** useEffect sets document.title to `TEAM_PAGE.documentTitle`.

---

## Typography Scale

| Element | Mobile | Small | Medium | Large | X-Large | Notes |
|---------|--------|-------|--------|-------|---------|-------|
| Hero H1 | 40px | 60px | 84px | 67.2px | 67.2px | text-[2.5rem] sm:text-6xl md:text-7xl lg/xl:text-[4.2rem] |
| Hero Description | 15px | 16px | — | 18px | — | text-[15px] sm:text-base lg:text-lg |
| Director Lead | 24px | 30px | 36px | 42.4px | 46.4px | text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[2.9rem] |

---

## Motion Details

| Component | Trigger | Distance | Duration | Delay | Notes |
|-----------|---------|----------|----------|-------|-------|
| Hero H1 | load | 32px up | 1.1s | 0.1s | RevealOnScroll, power3.out |
| Hero Description | load | 24px up | 1s | 0.22s | RevealOnScroll, power3.out |
| Director Lead Chars | scroll | — | — | 0.04s stagger | GSAP scrub color dim→lit; start top 75%, end bottom 35% |
| Team Cards | scroll | default | default | 0s | ScrollFade (component-level) |
| TeamGallery | scroll | default | default | 0s | ScrollFade (component-level) |
| EditorialStatementCTA | scroll | default | default | 0s | ScrollFade (component-level) |

**GSAP Director Lead Scrub:**
- Timeline with ScrollTrigger scrub (smooth scroll-linked)
- Each character transitions from dim (white/22) to lit (white)
- Stagger 0.04s between characters
- Reduced-motion: All chars white immediately, no scrub
- ScrollTrigger start: 'top 75%', end: 'bottom 35%', scrub: 1

---

## Clone Checklist

- [ ] Hero image object-position shifts between mobile/desktop (center 40% → center center)
- [ ] Hero gradient uses rgba values for smooth black fade (5 stops)
- [ ] Director lead text is split into chars with data-lead-char attribute
- [ ] GSAP scrub animates char color from white/22 to white on scroll
- [ ] Pulse dot has animate-ping effect (Tailwind utility)
- [ ] Portrait image has hover scale-[1.02] (700ms ease-out)
- [ ] Ambient glows are pointer-events-none and aria-hidden (decorative)
- [ ] ScrollFade wrapper requires className="w-full" prop for layout
- [ ] All copy from TEAM_PAGE and DIRECTOR_ABOUT data (not hard-coded)
- [ ] EditorialStatementCTA receives all props from TEAM_PAGE.cta
- [ ] Team and TeamGallerySection are separate components (not defined in page)
- [ ] GSAP cleanup on unmount (useLayoutEffect return)
- [ ] Reduced-motion check before GSAP animation
- [ ] SEO sets document.title (useEffect, not usePageSeo in this file)
