# Insights Page Specification

**Route:** `/insights`  
**Page File:** `src/pages/Insights.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Page Composition (Ordered)

1. **InsightsMasthead** — Headline + description + theme nav
2. **InsightsThemeIndex** — Themed insight cards (wrapped in ScrollFade)
3. **InsightsFeaturedNote** — Featured insight card (wrapped in ScrollFade)
4. **InsightsBridgeStrip** — Bridge CTA strip (wrapped in ScrollFade)
5. **EditorialStatementCTA** — Call-to-action section (wrapped in ScrollFade)

---

## Section Details

### 1. InsightsMasthead
**Component:** `src/components/sections/insights/InsightsMasthead.tsx`  
**Surface:** Black background  
**Motion Wrapper:** RevealOnScroll (trigger="load")

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `w-full bg-black text-white` | — | Full-width black section |
| Container | `pb-16 sm:pb-20 lg:pb-24 pt-[max(8.5rem,env(safe-area-inset-top))]` | Top padding 136px minimum, bottom 64px→80px→96px | Safe-area aware top spacing |
| RevealOnScroll Wrapper | trigger="load" | — | Wraps all content |
| Heading (H1) | `max-w-[12ch] text-[2.5rem] sm:text-6xl lg:text-[4.2rem]` | Max 12 characters, 40px→60px→67.2px | Bold, leading-[1.02], tracking-[-0.03em] |
| Heading Line 1 | `block` | — | "Insights and" or similar |
| Heading Line 2 | `block font-medium text-white/45` | — | "perspective." with reduced opacity |
| Description | `mt-8 max-w-[38rem] text-[15px] sm:text-base lg:text-lg` | Margin-top 32px, max 608px, 15px→16px→18px | Font-light, leading-[1.65], text-white/80 |
| Theme Nav | `mt-12 border-t border-white/15 pt-6` | Margin-top 48px, top border, padding-top 24px | aria-label="Themes on this page" |
| Theme List | `flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-3` | Gap 12px vertical, 40px horizontal (desktop) | Unordered list |
| Theme Link | `text-sm font-medium tracking-tight text-white/70` | 14px text | Underline-offset-4, hover:text-white hover:underline |
| "All notes" Link | `sm:ml-auto` | — | Routes to /blog, positioned at end of list |

**Copy Source:** `INSIGHTS_PAGE.hero` from `src/data/insights`  
**Nav Data:** `INSIGHT_THEMES` array from `src/data/insights`  
**Clone Notes:** Theme nav links are hash anchors (`href={#${theme.id}}`). "All notes" link routes to /blog. RevealOnScroll wraps entire content block (trigger="load"). Heading is two-line with second line faded.

---

### 2. InsightsThemeIndex
**Component:** `src/components/sections/insights/InsightsThemeIndex.tsx`  
**Surface:** (Defined in component; typically themed insight cards)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

**Note:** InsightsThemeIndex component is defined separately. It renders themed insight categories/cards. For full clone spec, see InsightsThemeIndex.tsx source. Typical structure:
- Loop through INSIGHT_THEMES
- Each theme renders a section with heading + grid of insight cards
- Cards link to insight detail pages
- Scroll-triggered animations per card

**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component-level layout and styling defined in InsightsThemeIndex.tsx (not in page file).

---

### 3. InsightsFeaturedNote
**Component:** `src/components/sections/insights/InsightsFeaturedNote.tsx`  
**Surface:** (Defined in component; typically featured card with large layout)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

**Note:** InsightsFeaturedNote component is defined separately. It renders a featured insight card (larger format). For full clone spec, see InsightsFeaturedNote.tsx source. Typical structure:
- Large hero-style card
- Featured insight headline, description, image
- CTA to read full insight
- Scroll-triggered animations

**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component-level layout and styling defined in InsightsFeaturedNote.tsx (not in page file).

---

### 4. InsightsBridgeStrip
**Component:** `src/components/sections/insights/InsightsBridgeStrip.tsx`  
**Surface:** (Defined in component; typically narrow CTA strip)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

**Note:** InsightsBridgeStrip component is defined separately. It renders a narrow CTA strip bridging to another section or CTA. For full clone spec, see InsightsBridgeStrip.tsx source. Typical structure:
- Narrow horizontal section
- Single-line or two-line statement + CTA link
- Scroll-triggered fade-in

**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component-level layout and styling defined in InsightsBridgeStrip.tsx (not in page file).

---

### 5. EditorialStatementCTA
**Component:** `src/components/sections/cta/EditorialStatementCTA.tsx`  
**Surface:** (Defined in component; typically black with centered text)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

| Prop | Value from INSIGHTS_PAGE.cta | Notes |
|------|------------------------------|-------|
| line1 | cta.line1 | First headline line |
| line2 | cta.line2 | Second headline line |
| line3Prefix | "" (empty) | Prefix before outlined text |
| line3Outlined | cta.line3Outlined | Outlined text (stroke effect) |
| line3Suffix | "?" | Suffix after outlined text |
| italicQuote | cta.italicQuote | Italic quote below headline |
| buttonText | cta.buttonText | CTA button label |
| buttonLink | cta.buttonLink | CTA button href |

**Copy Source:** `INSIGHTS_PAGE.cta` from `src/data/insights`  
**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component renders large editorial statement with outlined text effect and button CTA. For full layout spec, see EditorialStatementCTA.tsx source.

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top; height factored into masthead pt-[max(8.5rem,...)].
- **Footer:** Appended after all sections; not controlled by Insights.tsx.
- **Global Wrapper:** Page wrapper is `<div className="is-insights flex w-full flex-col items-center bg-black">` — full-width black background with centered flex column, special class "is-insights".
- **ScrollFade Wrapper:** ScrollFade wraps sections 2, 3, 4, 5 with className="w-full".
- **SEO:** usePageSeo hook with title, description, path, keywords, image, type='website'.

---

## Typography Scale

| Element | Mobile | Small | Medium | Large | Notes |
|---------|--------|-------|--------|-------|-------|
| Masthead H1 | 40px | 60px | — | 67.2px | text-[2.5rem] sm:text-6xl lg:text-[4.2rem] |
| Masthead Description | 15px | 16px | — | 18px | text-[15px] sm:text-base lg:text-lg |
| Theme Link | 14px | — | — | — | text-sm |

---

## Motion Details

| Component | Trigger | Notes |
|-----------|---------|-------|
| Masthead Content | load | RevealOnScroll (trigger="load") |
| InsightsThemeIndex | scroll | ScrollFade (component-level) |
| InsightsFeaturedNote | scroll | ScrollFade (component-level) |
| InsightsBridgeStrip | scroll | ScrollFade (component-level) |
| EditorialStatementCTA | scroll | ScrollFade (component-level) |

All ScrollFade-wrapped sections use default scroll-triggered fade-up. RevealOnScroll in masthead uses trigger="load" for immediate on-mount reveal.

---

## Clone Checklist

- [ ] Masthead heading is two-line with second line faded (text-white/45)
- [ ] Theme nav links are hash anchors (`#theme-id`)
- [ ] "All notes" link routes to /blog, positioned at end (sm:ml-auto)
- [ ] Theme nav has aria-label="Themes on this page"
- [ ] ScrollFade wrapper requires className="w-full" prop for layout
- [ ] All copy from INSIGHTS_PAGE data (not hard-coded)
- [ ] EditorialStatementCTA receives all props from INSIGHTS_PAGE.cta
- [ ] InsightsThemeIndex, InsightsFeaturedNote, InsightsBridgeStrip are separate components (not defined in page)
- [ ] SEO includes keywords: 'investment insights', 'market outlook', 'wealth planning notes', COMPANY.brandName
- [ ] SEO image from INSIGHTS_PAGE.hero.image
- [ ] Page wrapper has special class "is-insights" for scoping (if needed)
- [ ] RevealOnScroll trigger="load" for masthead (not scroll-triggered)
