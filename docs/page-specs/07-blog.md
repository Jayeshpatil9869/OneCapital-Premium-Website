# Blog & Blog Post Page Specification

**Routes:** `/blog` and `/blog/:slug`  
**Page Files:** `src/pages/Blog.tsx` and `src/pages/BlogPost.tsx`  
**Shell:** Standard Navbar + Footer (shared)

---

## Blog Page (`/blog`)

### Page Composition (Ordered)

1. **BlogMasthead** — Headline + filter tabs
2. **BlogArchiveList** — Filtered article grid (wrapped in ScrollFade)
3. **BlogReadingPath** — Reading path CTA (wrapped in ScrollFade)

---

## Blog Page Section Details

### 1. BlogMasthead
**Component:** `src/components/sections/insights/BlogMasthead.tsx`  
**Surface:** Black background  
**Motion Wrapper:** (Defined in component)

**Props from Page:**
```tsx
<BlogMasthead filter={filter} onFilterChange={setFilter} />
```

**State Management:**
- Page manages filter state: `useState<InsightFilter>('All')`
- Articles filtered via `filterArticles(filter)` from data

**Note:** BlogMasthead component is defined separately. It renders headline + filter tabs (All, PMS, Mutual Funds, etc.). For full clone spec, see BlogMasthead.tsx source. Typical structure:
- Heading + description
- Filter tabs (clickable, updates parent state)
- Active filter has visual indicator

**Clone Notes:** Filter state managed in page, passed to component as props. Filter change updates articles list below.

---

### 2. BlogArchiveList
**Component:** `src/components/sections/insights/BlogArchiveList.tsx`  
**Surface:** (Defined in component; typically article cards grid)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

**Props from Page:**
```tsx
<BlogArchiveList articles={articles} />
```

**Note:** BlogArchiveList component is defined separately. It renders filtered article cards in a grid. For full clone spec, see BlogArchiveList.tsx source. Typical structure:
- Grid of article cards
- Each card: image, title, excerpt, meta (date, category)
- Link to `/blog/:slug`
- Scroll-triggered animations per card

**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Articles array is filtered result from page state. Component-level layout and styling defined in BlogArchiveList.tsx (not in page file).

---

### 3. BlogReadingPath
**Component:** `src/components/sections/insights/BlogReadingPath.tsx`  
**Surface:** (Defined in component; typically CTA section)  
**Motion Wrapper:** ScrollFade (className="w-full" from page)

**Note:** BlogReadingPath component is defined separately. It renders a reading path CTA section. For full clone spec, see BlogReadingPath.tsx source. Typical structure:
- Heading + description
- CTA links to related sections or newsletter
- Scroll-triggered fade-in

**Clone Notes:** Wrapped in ScrollFade with className="w-full" from page. Component-level layout and styling defined in BlogReadingPath.tsx (not in page file).

---

## Blog Page SEO

**usePageSeo hook:**
```tsx
usePageSeo({
  title: `Guides to PMS, Mutual Funds, and FDs | ${COMPANY.brandName}`,
  description: BLOG_PAGE.hero.description,
  path: '/blog',
  keywords: ['One Capital blog', 'PMS vs mutual fund', 'mutual fund vs FD', 'AIF India'],
  type: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${COMPANY.brandName} Blog`,
    description: BLOG_PAGE.hero.description,
    url: absoluteUrl('/blog'),
    blogPost: INSIGHT_ARTICLES.map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      url: absoluteUrl(article.href),
    })),
  },
})
```

**Clone Notes:** JSON-LD includes Blog schema with blogPost array listing all articles. SEO title includes "Guides to PMS, Mutual Funds, and FDs" for keyword targeting.

---

## BlogPost Page (`/blog/:slug`)

### Page Composition

Single component: **BlogArticle** — Renders full article content

---

## BlogPost Page Section Details

### BlogArticle
**Component:** `src/components/sections/insights/BlogArticle.tsx`  
**Surface:** (Defined in component; typically full-width article layout)  
**Motion Wrapper:** (Defined in component)

**Props from Page:**
```tsx
<BlogArticle post={post} />
```

**Data Source:**
- URL param: `const { slug } = useParams()`
- Post lookup: `getBlogPostBySlug(slug)` from `src/data/blog-posts`
- 404 fallback: `if (!post) return <NotFound />`

**Note:** BlogArticle component is defined separately. It renders full article content: hero, body, meta, related articles, etc. For full clone spec, see BlogArticle.tsx source. Typical structure:
- Article hero (image, headline, meta)
- Article body (rich text, markdown, or components)
- Author info, tags, related articles
- Scroll-triggered animations

**Clone Notes:** Component-level layout and styling defined in BlogArticle.tsx (not in page file). Post data is dynamic from `getBlogPostBySlug(slug)`. If post not found, renders `<NotFound />` component.

---

## BlogPost Page SEO

**usePageSeo hook:**
```tsx
usePageSeo({
  title: post?.seoTitle ?? `Blog | ${COMPANY.brandName}`,
  description: post?.seoDescription ?? 'Notes from the One Capital practice.',
  path: post?.href ?? '/blog',
  keywords: post ? [...post.keywords] : undefined,
  image: post?.image,
  type: 'article',
  jsonLd: post
    ? buildArticleJsonLd({
        headline: post.title,
        description: post.seoDescription,
        path: post.href,
        datePublished: post.published,
        image: post.image,
      })
    : undefined,
})
```

**Clone Notes:** SEO type is 'article' (not 'website'). JSON-LD uses `buildArticleJsonLd` helper for Article schema. SEO fields fallback to generic blog values if post not found. Keywords array comes from post data.

---

## Shared Shell Assumptions

- **Navbar:** Fixed/sticky at top.
- **Footer:** Appended after all sections.
- **Global Wrapper (Blog):** `<div className="flex w-full flex-col items-center bg-black">` — full-width black background with centered flex column.
- **Global Wrapper (BlogPost):** Defined in BlogArticle component (not in page file).
- **ScrollFade Wrapper (Blog):** ScrollFade wraps BlogArchiveList and BlogReadingPath with className="w-full".
- **Filter State (Blog):** Managed in page with useState, not in URL or query params.

---

## Blog Page Data Flow

```
Page useState('All') → filter
     ↓
filterArticles(filter) → articles
     ↓
BlogMasthead (filter, onFilterChange)
BlogArchiveList (articles)
```

**Filter Types (InsightFilter):**
- 'All'
- 'PMS'
- 'Mutual Funds'
- 'AIF'
- Other categories from INSIGHT_THEMES

---

## BlogPost Page Data Flow

```
useParams() → slug
     ↓
getBlogPostBySlug(slug) → post | undefined
     ↓
if (!post) → <NotFound />
if (post) → <BlogArticle post={post} />
```

---

## Clone Checklist (Blog)

- [ ] Filter state managed in page with useState
- [ ] Articles filtered via `filterArticles(filter)` helper
- [ ] BlogMasthead receives filter and onFilterChange props
- [ ] BlogArchiveList receives filtered articles array
- [ ] ScrollFade wrapper requires className="w-full" prop for layout
- [ ] SEO includes Blog JSON-LD with blogPost array
- [ ] SEO keywords target PMS, mutual funds, AIF
- [ ] All copy from BLOG_PAGE data (not hard-coded)

## Clone Checklist (BlogPost)

- [ ] Slug extracted from useParams
- [ ] Post lookup via `getBlogPostBySlug(slug)`
- [ ] 404 fallback if post not found
- [ ] SEO type is 'article' (not 'website')
- [ ] SEO includes Article JSON-LD via `buildArticleJsonLd`
- [ ] SEO keywords from post.keywords array
- [ ] Image from post.image for OG tags
- [ ] Published date from post.published for schema
- [ ] BlogArticle component receives post object as prop
- [ ] NotFound component rendered if slug invalid
