# Newsletter Page Specification

**Route:** `/newsletter`  
**Page File:** `src/pages/Newsletter.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Page Composition

Single section rendered directly in page file (not a separate component). All layout and logic inline.

---

## Section Details

### Newsletter Subscription Form Section
**Surface:** Black background  
**Motion Wrapper:** RevealOnScroll (trigger="load")

| Element | Layout Classes | Px Conversion | Notes |
|---------|---------------|---------------|-------|
| Section | `w-full bg-black pt-[max(7.5rem,env(safe-area-inset-top))] pb-[var(--space-section)] text-white` | Top padding 120px minimum, bottom from CSS var | Safe-area aware top spacing |
| Container | `mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12` | Max 1400px, padding 24px→32px→48px | Standard container |
| RevealOnScroll Wrapper | trigger="load" | — | Wraps all content |
| Breadcrumb | Component `<InsightsBreadcrumb current="Newsletter" />` | — | Breadcrumb navigation component |
| Heading (H1) | `mt-6 sm:mt-8 max-w-[14ch] text-[2.5rem] sm:text-6xl` | Margin-top 24px→32px, max 14 characters, 40px→60px | Font-bold, leading-[1.02], tracking-[-0.03em] |
| Heading Line 1 | `block` | — | "Notes, when" or similar |
| Heading Line 2 | `block font-medium text-white/40` | — | "they matter." with reduced opacity |
| Description | `mt-8 max-w-[36rem] border-t border-white/15 pt-6 sm:pt-8 text-[15px] sm:text-base lg:text-lg` | Margin-top 32px, max 576px, top border, padding-top 24px→32px, 15px→16px→18px | Font-light, leading-[1.65], text-white/80 |
| **Success State** | `mt-10 max-w-md text-base text-white` | Margin-top 40px, max 448px, 16px | role="status" for screen readers |
| **Form State** | `mt-10 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-center` | Margin-top 40px, max 512px, gap 12px | Vertical on mobile, horizontal on desktop |
| Email Label | `sr-only` | — | "Email address" for accessibility |
| Email Input | `h-12 w-full rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm placeholder:text-white/35` | Height 48px, full width, border-radius 9999px, padding 20px | Type email, required, autoComplete="email" |
| Submit Button | `h-12 shrink-0 rounded-full bg-white px-6 text-sm font-medium text-black` | Height 48px, no shrink, border-radius 9999px, padding 24px, 14px | Type submit, hover:bg-white/90 transition-colors |
| Error Message | `text-sm text-white/70 sm:basis-full` | 14px, text-white/70 | Shown below button if validation error |

**State Management:**
- `email` state: `useState('')`
- `submitted` state: `useState(false)`
- `error` state: `useState('')`

**Form Logic:**
```tsx
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!email.includes('@') || !email.includes('.')) {
    setError('Enter a valid email address.');
    return;
  }
  setError('');
  setSubmitted(true);
};
```

**Copy Source:** Static strings in component + `COMPANY.brandName` from `src/data/company`  
**Clone Notes:** Form toggles between form view and success view based on `submitted` state. Success message includes submitted email address. Error shown inline below form if validation fails. Simple client-side validation (checks for @ and .). No actual submission/API call (prototype).

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top; height factored into pt-[max(7.5rem,...)].
- **Footer:** Appended after section; not controlled by Newsletter.tsx.
- **Global Wrapper:** Section is self-contained; no explicit page wrapper div.
- **SEO:** useEffect sets `document.title = \`Newsletter | ${COMPANY.brandName}\`` (not usePageSeo hook).

---

## Typography Scale

| Element | Mobile | Small | Medium | Large | Notes |
|---------|--------|-------|--------|-------|-------|
| Heading H1 | 40px | 60px | — | — | text-[2.5rem] sm:text-6xl |
| Description | 15px | 16px | — | 18px | text-[15px] sm:text-base lg:text-lg |
| Form Input | 14px | — | — | — | text-sm |
| Form Button | 14px | — | — | — | text-sm |
| Success Message | 16px | — | — | — | text-base |
| Error Message | 14px | — | — | — | text-sm |

---

## Motion Details

| Component | Trigger | Notes |
|-----------|---------|-------|
| All Content | load | RevealOnScroll (trigger="load") |

RevealOnScroll wraps entire content block (breadcrumb, heading, description, form). Single reveal on page load (not scroll-triggered).

---

## Clone Checklist

- [ ] Heading is two-line with second line faded (text-white/40)
- [ ] Description has top border with padding-top (border-t border-white/15 pt-6 sm:pt-8)
- [ ] Form is vertical on mobile, horizontal on desktop (flex-col sm:flex-row)
- [ ] Email input is rounded-full (pill shape)
- [ ] Submit button is rounded-full (pill shape)
- [ ] Success state shows submitted email in message
- [ ] Error message shows below form if validation fails
- [ ] Simple validation: checks for @ and . in email
- [ ] No actual form submission (no API call, just state toggle)
- [ ] Email input has autoComplete="email" for browser autofill
- [ ] Email input has inputMode="email" for mobile keyboard (not in source but recommended)
- [ ] Label is sr-only for accessibility
- [ ] Success state has role="status" for screen readers
- [ ] SEO uses useEffect to set document.title (not usePageSeo hook)
- [ ] COMPANY.brandName inserted in description copy
- [ ] InsightsBreadcrumb component imported from insights sections
- [ ] RevealOnScroll trigger="load" for immediate on-mount reveal
