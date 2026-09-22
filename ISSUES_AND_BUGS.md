# OneCapital Premium Website - Issues & Bug Analysis

**Date:** September 11, 2026  
**Device Testing:** OnePlus Nord CE3 5G, Laptop

---

## 🔴 CRITICAL ISSUES (Fix Immediately)

### 1. **Form Submission Does Not Send Data**
- **File:** `src/components/sections/contact/ContactFormPanel.tsx`
- **Issue:** Contact form only shows success message locally but doesn't send data to backend
- **Problem:** No API endpoint configured; form uses `reportValidity()` only
- **Impact:** Users can't actually submit contact requests
- **Fix Needed:** 
  - Add form submission handler with API call
  - Create backend endpoint `/api/contact` (or configure email service)
  - Add error handling and retry logic

### 2. **Chat Widget Has No Backend**
- **File:** `src/components/chat/ChatWidget.tsx`
- **Issue:** Chat shows placeholder reply `"Thanks — our team will follow up..."`
- **Problem:** No AI/chatbot integration; all messages are hardcoded
- **Impact:** Chat is non-functional and misleading to users
- **Fix Needed:**
  - Integrate with OpenAI API / custom chatbot
  - Add message persistence (localStorage or database)
  - Implement real message routing to team

### 3. **Missing Environment Variables**
- **File:** `package.json`, `.env.example` (doesn't exist)
- **Issue:** No `.env` template; API endpoints hardcoded or missing
- **Problem:** Can't deploy to production; credentials exposed in code
- **Fix Needed:**
  - Create `.env.example` with required variables
  - Add `dotenv` configuration
  - Document all API endpoints needed

---

## 🟠 HIGH PRIORITY ISSUES

### 4. **Calculator Pages Have No Data Validation** ✅ RESOLVED
- **Status:** Fixed — `CalculatorSlider` clamps number input; all pages pass min/max/step via shared `CALCULATOR_LIMITS` in `src/data/calculators.ts`.

### 5. **No Loading States for Images** ✅ PARTIALLY RESOLVED
- **Status:** Below-fold images now use `loading="lazy"` (About story/philosophy/vision/press, Team gallery, testimonials avatars, app showcase). Hero LCP images stay eager with decorative `alt=""`.

### 6. **Missing Image Alt Text** ✅ PARTIALLY RESOLVED
- **Status:** Content images carry descriptive alts; hero backgrounds remain `alt=""` inside `aria-hidden` (correct decorative pattern). Team cards use `alt={member.name}`.

### 7. **Mobile Menu Can Get Stuck Open** ✅ RESOLVED
- **Status:** Fixed — `matchMedia('(min-width: 1024px)')` force-closes mobile menu and clears accordion on desktop breakpoint; top-level mobile links also call `setMobileMenuOpen(false)`. Overflow lock clears with state.

---

## 🟡 MEDIUM PRIORITY ISSUES

### 8. **No Error Boundaries**
- **Issue:** No error boundary components
- **Problem:** Single error crashes entire app
- **Files Affected:** All pages
- **Fix Needed:** Implement React error boundary wrapper

### 9. **Missing SEO Meta Tags**
- **Issue:** No dynamic meta tags for different pages
- **Problem:** Social sharing shows generic title/description
- **Impact:** Poor social media previews
- **Fix Needed:**
  - Add `react-helmet` or similar
  - Create meta tag templates per page
  - Add Open Graph tags

### 10. **No 404 Page** ✅ RESOLVED
- **Status:** Fixed — `src/pages/NotFound.tsx` wired as `{ path: '*', element: <NotFound /> }` under Layout in `App.tsx`.

### 11. **Calculator Results Not Shareable**
- **Files:** `src/pages/calculators/*.tsx`
- **Issue:** No way to share calculation results
- **Problem:** Users can't share results on social media
- **Fix Needed:** Add "Share" button with result encoding in URL

### 12. **No Analytics Integration**
- **Issue:** No Google Analytics / tracking
- **Problem:** Can't measure user behavior
- **Fix Needed:** Add GA4 or Mixpanel integration

### 13. **Performance: Unused Dependencies**
- **File:** `package.json`
- **Issue:** `motion` package (^12.23.24) is installed but not used
- **Problem:** Adds unnecessary bundle size
- **Fix Needed:** Remove if not used; or use it instead of GSAP where possible

### 14. **Team Member Data Missing** ⏳ WAITING ON APPROVAL
- **Status:** Intentionally using practice-desk labels (Advisory / Portfolio / Wealth) — not invented personal names. Named portrait assets exist under `public/images/team/` but are unused until an approved fact pack is provided.

### 15. **Press/Media Links Not Functional** ✅ RESOLVED (reframed)
- **Status:** Removed fake third-party press claims. Section is now “Perspectives” with working links to Insights / Approach / Solutions, LinkedIn company updates, and `/contact` for media enquiries. Replace with verified clip URLs when available.

---

## 🔵 LOW PRIORITY ISSUES

### 16. **TypeScript Version Mismatch**
- **File:** `package.json`
- **Issue:** `typescript ~5.8.2` (loose version pinning with `~`)
- **Problem:** Minor updates could introduce breaking changes
- **Fix Needed:** Pin exact version or use `^5.8.2`

### 17. **No Rate Limiting on Chat/Contact**
- **Issue:** No protection against bot spam
- **Problem:** Users could spam chat or submit 1000 contact forms
- **Fix Needed:** Add rate limiting middleware

### 18. **Accessibility: Keyboard Navigation**
- **Issue:** Some interactive elements may not be keyboard navigable
- **Problem:** Doesn't meet WCAG 2.1 AA standards
- **Fix Needed:** Audit with keyboard-only navigation

### 19. **Mobile Scroll Performance**
- **Issue:** On slower phones, scroll might be janky despite fixes
- **Problem:** GSAP ticker + ScrollTrigger can be heavy
- **Fix Needed:** Profile on budget Android devices; consider reducing animation complexity on mobile

### 20. **No Offline Support**
- **Issue:** No service worker / offline fallback
- **Problem:** App breaks completely without internet
- **Fix Needed:** Add basic offline page with PWA support

---

## 🟢 CODE QUALITY (Non-Blocking)

### 21. **Unused CSS Classes**
- **Issue:** Some Tailwind classes may not be used
- **Fix Needed:** Run PurgeCSS to confirm and remove unused classes

### 22. **Inconsistent Component Naming**
- **Issue:** Mix of `ExportName.tsx` and `export default` patterns
- **Fix Needed:** Standardize to named exports

### 23. **Magic Numbers in Components**
- **Example:** `min-h-[240px]`, `rounded-3xl`, `duration-500`
- **Fix Needed:** Move to token constants for easier maintenance

### 24. **No Component Documentation**
- **Issue:** No JSDoc or Storybook stories
- **Fix Needed:** Add prop documentation to reusable components

---

## 📊 SUMMARY TABLE

| Priority | Count | Areas                                          |
|----------|-------|------------------------------------------------|
| 🔴 Critical | 3 | Forms, Chat, Environment setup                 |
| 🟠 High | 5 | Validation, Images, Accessibility, Menu       |
| 🟡 Medium | 7 | Error handling, SEO, Analytics, Sharing       |
| 🔵 Low | 5 | Dependencies, Rate limiting, Offline support  |
| 🟢 Code Quality | 4 | Naming, Magic numbers, Docs                    |
| **TOTAL** | **24** | **All severities**                             |

---

## 🚀 IMMEDIATE ACTION ITEMS (Next Sprint)

1. ✅ Connect contact form to backend API
2. ✅ Integrate real chatbot or disable chat widget
3. ✅ Add environment variable configuration
4. ✅ Add input validation to calculator sliders
5. ✅ Add alt text to all images
6. ✅ Create 404 error page
7. ✅ Fix mobile menu state management

---

## 📝 NOTES

- **Scroll Issue (Fixed):** Device-specific scroll blocking was caused by CustomCursor overlay and Lenis `preventDefault` calls. Now disabled on touch devices.
- **Form Data:** Currently doesn't persist anywhere — critical for production.
- **Calculator Logic:** Math functions are correct; missing validation only.
- **Testing:** No automated tests found — add Jest + React Testing Library.

---

**Generated by Code Audit | Recommended Review: Weekly**
