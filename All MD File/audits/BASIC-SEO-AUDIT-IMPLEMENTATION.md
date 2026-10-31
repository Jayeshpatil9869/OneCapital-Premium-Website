# Basic SEO Audit — Implementation Status

Source: `All MD File/briefs/Basic SEO Audit.docx`  
Applied: 2026-10-31  
Canonical host in code: **https://1capital.in** (verified in `company.ts` / `.env.example`). Audit PDF listed `onecapital.in` — do **not** switch canonicals unless DNS + redirects are confirmed for that host.

## Applied in codebase

| Audit item | Status |
|------------|--------|
| P0 robots.txt Allow + Sitemap | Done (`public/robots.txt`) |
| P0 XML sitemap | Done (`npm run sitemap` → 31 URLs) |
| P0 index,follow + canonical | Done (`index.html` + `setPageSeo`) |
| P1 homepage title / description | Exact audit copy |
| P1 H1 | Exact: Wealth Management & Financial Services in Pune |
| P1 H2 structure | Mapped to home sections + new services/planning blocks |
| P1 CTA | Book a Financial Consultation |
| P1 internal links | Services grid → solutions / approach / contact / calculators |
| P2 FAQ + Pune content | Existing FAQ + new local copy |
| P2 Organization / LocalBusiness / Breadcrumb / FAQ schema | `src/lib/seo.ts` + home `jsonLd` + static `@graph` in `index.html` |

## Manual (cannot automate in repo)

| Item | Owner |
|------|--------|
| Google Search Console verify + submit sitemap | Marketing / ops |
| Google Business Profile consistency (Pune NAP) | Marketing / ops |
| Confirm whether `onecapital.in` should 301 → `1capital.in` | DevOps / domain owner |

## Files touched

- `index.html`, `public/robots.txt`, `public/sitemap.xml`
- `src/data/home-seo.ts`, `src/lib/seo.ts`, `src/pages/Home.tsx`
- `src/components/sections/home/*`, FAQ / solutions / testimonials / offices / app showcase headings & CTAs
