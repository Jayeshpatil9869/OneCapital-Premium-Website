# One Capital

The public website for One Capital, a Pune wealth firm. It is the place a family, a founder, or a first-time investor lands before a conversation: what the firm does, which products exist, and what those products can and cannot promise.

The line the site is built around is simple. Research first. Strategy next. Investment last.

This repository is the website only. It is not a trading terminal, a client portal, or a place where anyone’s money is held.

## What a visitor can do

- Read the firm’s story, approach, and team.
- Walk through capital strategy, portfolio management, and wealth management.
- Open a product page for mutual funds, PMS and AIF, direct equity, equity baskets, options baskets, passive income, Nifty hedging, or investment advisory.
- Use the SIP, lumpsum, step-up SIP, SWP, and goal calculators as illustrations.
- Read insights and contact the firm.

Copy lives in `src/data` and the page components under `src/pages`. Change the words there. Do not invent a return, a client result, or a registration the firm does not hold.

## Run it locally

You need Node.js.

```bash
npm install
npm run dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm run preview
```

`lint` is a TypeScript check. `build` writes the static site to `dist/`.

```bash
npm run sitemap
```

Regenerates `public/sitemap.xml` (also runs automatically before `npm run build`).

## Production launch (Vercel)

1. Connect this repo to Vercel (Framework: Vite, output `dist/`, build `npm run build`).
2. Confirm production domain is `https://1capital.in` (matches `COMPANY.websiteUrl`, `robots.txt`, and `sitemap.xml`).
3. After first deploy, in [Google Search Console](https://search.google.com/search-console) submit `https://1capital.in/sitemap.xml`.
4. Spot-check: `/`, `/contact`, `/blog`, a calculator, and a deliberate 404.
5. Human-review all public copy before calling the site live — especially returns, testimonials, and registrations.

Launch artifacts already in `public/`:

| File | Role |
| --- | --- |
| `robots.txt` | Crawl rules + sitemap pointer; `/design-system` disallowed |
| `sitemap.xml` | Canonical indexable routes + blog posts |
| `og-default.jpg` | Default Open Graph / Twitter image |
| `site.webmanifest` | PWA-lite install metadata |

Security response headers (nosniff, frame deny, referrer, permissions) ship via `vercel.json`. SPA deep links rewrite to `index.html`; static files in `public/` are served as-is.

**Do not push until the owner has reviewed.** Deploy only after a local `npm run build` + `npm run preview` check.

## Repo hygiene

| Path | Role |
| --- | --- |
| `src/`, `public/`, `docs/` | Product code and official specs |
| `All MD File/` | Archived audits, loose assets, scratch — **not deleted**, not required at runtime |
| `.env.example` | Documented optional `VITE_*` vars (no secrets) |

## How the project is put together

Vite, React, and TypeScript. Pages are routed with React Router. Visual styling is Tailwind. Motion is GSAP, with Lenis used only where the page is meant to scroll like an editorial piece.

| Path | What it holds |
| --- | --- |
| `src/pages` | One file per route |
| `src/components` | Shared layout, sections, and UI |
| `src/data` | Page copy, products, company facts, calculators |
| `src/styles` | Tokens and effects |
| `public` | Images and icons the site serves as-is |

`/design-system` is an internal workshop for components. It is not a public product page.

## Safety

This is a marketing site about other people’s money. Treat the repository that way.

**No secrets in git.** Do not commit `.env` files, API keys, passwords, tokens, or client exports. `.env*` is ignored. If a secret ever lands in a commit, rotate it. Do not “fix” it by deleting the file in a later commit and leaving the old history in place.

**No client files.** Voice notes, private briefs, and personal documents do not belong in this repo. Product copy that is approved for the public site does.

**No invented trust.** Do not add performance figures, assets under management, testimonials, team credentials, or license numbers unless they come from an approved source already used on the site. A calculator result is arithmetic at a rate the visitor chose. It is not a forecast and not a past return.

**Say the risk in the same place as the product.** Mutual funds, PMS, AIF, equity, and derivatives can fall in value. Options and hedges can cost money or lose more than the amount first posted. Income is not assured. Where the firm distributes regular mutual fund plans, the page should keep saying so. Direct plans cost less and are bought from the fund house.

**Forms stay modest.** The contact form collects what a person chooses to send so the firm can reply. Do not add hidden fields, tracking that is not disclosed, or a place to upload identity documents.

**Dependencies.** Install from the lockfile. Do not paste unknown scripts into the project to “speed up” a page.

Before a release, read the changed sentences the way a client would. If a line could be heard as a promise of profit, rewrite it until it is only a description of the work.
