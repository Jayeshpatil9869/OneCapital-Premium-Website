# Production launch checklist

Domain: `https://1capital.in`  
Stack: Vite + React SPA on Vercel.

## Before deploy

- [ ] `npm run lint` passes
- [ ] `npm run build` passes; preview with `npm run preview`
- [ ] Mobile touch scroll works after preloader
- [ ] Contact form still submits (client-side success state)
- [ ] Footer risk factors + AMFI/APMI lines match approved facts in `src/data/company.ts`
- [ ] No invented performance / AUM / testimonial claims
- [ ] Root is clean; clutter lives under `All MD File/` (do not delete)

## Crawl / social

- [ ] `https://1capital.in/robots.txt` reachable
- [ ] `https://1capital.in/sitemap.xml` reachable; submit in Search Console
- [ ] OG share preview uses `/og-default.jpg` or page-specific image
- [ ] `/design-system` is `noindex` and disallowed in robots

## After go-live

- [ ] Search Console property + sitemap
- [ ] Spot-check 404 branded page
- [ ] Confirm HTTPS and www/apex preference (single canonical host)

Human review of public copy is mandatory. SEO does not guarantee rankings or traffic.
