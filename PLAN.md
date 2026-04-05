# Project Plan — Tullio Philippe

## Site Goal
High-end cinematic portfolio for Tullio Philippe, film director. Recreate and improve upon https://nocoment1r.wixsite.com/tullio-philippe. Design reference: https://www.secretlevel.co

---

## Pages

| Page | Route | Status |
|---|---|---|
| Home | `/` | 🟡 Polish |
| Project | `/work/[slug]` | 🟡 Polish |
| About | `/about` | 🟡 Polish |
| Gallery | `/gallery` | ⬜ Not started |
| Contact | `/contact` | ✅ Done |

---

## Build Order

### Phase 1 — Foundation ✅
- [x] `<Nav />` — glassmorphism pill, FR/EN toggle
- [x] `<Footer />` — minimal

### Phase 2 — Home ✅ (pending content + polish)
- [x] `<HomeSwiper />` — full-screen sections, GSAP tilt + content reveal
- [x] Lenis smooth scroll + wheel-driven snap (proximity snap on stop, 500ms debounce)
- [x] Thumbnail strip — IntersectionObserver synced
- [x] Cloudinary connected — assets served via Search API + `unstable_cache` (1hr)
- [x] Data architecture — metadata in `data.js`, assets merged in `page.tsx`
- [x] Hydration fix — `gsap.set()` inside `useGSAP`, no inline styles
- [ ] Video autoplay disabled on mobile
- [ ] Intro animation (first load slide-up)
- [ ] Fill remaining projects with real Cloudinary data

### Phase 3 — Project Page ✅
- [x] Route `app/[locale]/work/[slug]/page.tsx`
- [x] `<ProjectHero />` — full-bleed, max 65vh, gradient overlay, meta bottom-left (desktop), Watch + Work Together CTAs bottom-right (desktop), mobile: watch left / pill right
- [x] `<ProjectInfo />` — two-column (info left, preview right), mobile stacked; mobile CTAs below preview
- [x] `<ProjectPreview />` — autoplay muted teaser, Watch full film overlay → lightbox
- [x] `<ProjectGallery />` — masonry-only (`columns-1 sm:columns-2 lg:columns-3`), no toggle
- [x] `<ProjectVideoPlayer />` — Netflix-style lightbox, Escape to close
- [x] `<StormBackground />` — WebGL FBM shader, cursor-reactive, project pages only
- [x] `<ScrollProgressButton />` — scroll progress ring, centered
- [x] `<LinkCta />` — reusable nav-style underline link (icon right, accent hover)
- [x] `<PillCta />` — reusable rounded pill button/link, standardised across site
- [x] Spacing fixed: `site-px` / `section-padding` = horizontal only, vertical via Tailwind utilities

### Phase 4 — About ✅ (needs polish)
- [x] `<AboutHero />`
- [x] `<Bio />`
- [x] `<BtsGallery />`

### Phase 5 — Contact ✅
- [x] `<Contact />` reusable component
- [x] `/contact` page

### Phase 6 — Polish & QA 🟡 CURRENT FOCUS
- [ ] Fill remaining projects with real Cloudinary assets + `data.js` metadata
- [ ] GSAP scroll animations across all pages
- [ ] Page transitions
- [ ] Video autoplay disabled on mobile
- [ ] Intro animation (first load)
- [ ] Mobile QA pass (all pages)
- [ ] Performance audit (Cloudinary, lazy loading, bundle)
- [ ] SEO (metadata, OG tags, sitemap)
- [ ] Lighthouse audit
- [x] FR/EN translations complete — nav, project CTAs, credits, gallery labels; lang toggle fixed via next-intl navigation

---

## Next Session — Start Here

### 1. Fill remaining projects
Upload real Cloudinary assets for all non-JAYA slugs + fill `data.js` metadata.
Slugs: `k-citizen`, `jesus-is-back`, `crako`, `abaco`

### 2. Polish — About page
Review current state, identify what needs refinement.

### 3. Polish — Home + Project page
GSAP scroll animations, page transitions, intro animation.

### 4. Mobile QA pass
Go through all pages on mobile: spacing, CTAs, video behaviour, autoplay disabled.

### 5. Performance + SEO
Metadata, OG tags, sitemap, Lighthouse audit.

---

## Project Page Layout (current)

```
┌─────────────────────────────────────────────┐
│  Hero — full-bleed, max 65vh                │
│  meta (desktop BL) | Watch + Work (BR)      │
│  mobile: Watch (left) | Work (right)        │
├─────────────────────────────────────────────┤
│  Left col (58%)      │  Right col (42%)     │
│  meta (mobile only)  │  Autoplay preview    │
│  Title               │  (featured/video)    │
│  Brand               │  Watch full film     │
│  Description         │                      │
│  Credits grid        │                      │
│  ── mobile CTAs below preview ──            │
│  [Work together ↓]  [Watch full film ▶]    │
├─────────────────────────────────────────────┤
│  Gallery — masonry columns                  │
│  "Behind the scenes" heading                │
└─────────────────────────────────────────────┘
```

---

## Global Spacing System (implemented)

```css
/* globals.css — HORIZONTAL ONLY, plain CSS outside layers */
.site-px, .section-padding {
  padding-left: 1rem;        /* < 640px  = 16px  */
}
/* 640px+  → 1.5rem (24px) */
/* 1200px+ → 3rem   (48px) */
/* 1600px+ → 4rem   (64px) */

.site-max { max-width: 1800px; margin: 0 auto; }

/* VERTICAL — always Tailwind utilities directly on the element */
/* Standard section: py-16 md:py-20  (4rem / 5rem) */
/* Custom:  pt-8 md:pt-12 pb-16 md:pb-20 lg:pb-[7.5rem] etc. */
```

**Rule: never try to override `site-px`/`section-padding` vertical with Tailwind — they have no vertical, so there's nothing to conflict.**

---

## Content Status

| Item | Status |
|---|---|
| JAYA — featured thumb | ✅ |
| JAYA — featured video (teaser) | ✅ |
| JAYA — work thumb | ✅ |
| JAYA — work video (full film) | ⬜ upload to `work/jaya/work/video/` |
| JAYA — gallery stills | ⬜ upload to `work/jaya/work/gallery/` |
| Other projects (k-citizen, jesus-is-back, crako, abaco) | ⬜ placeholder data only |
| Bio text (FR + EN) | ⬜ needs client |
| Showreel video | ⬜ needs client |
| Profile photo | ⬜ needs client |
| Contact email / socials | ⬜ needs client |

---

## Cloudinary Folder Structure

```
work/
  [slug]/
    featured/
      thumb/    → homepage still / video poster
      video/    → homepage autoplay teaser + project page preview
    work/
      thumb/    → project page hero image
      video/    → full film — lightbox player
      gallery/  → BTS stills (images, any naming)
about/
  portrait/
  bts/
showreel/
```

---

## Tech Decisions

| Decision | Choice | Notes |
|---|---|---|
| Video/Image hosting | Cloudinary | `f_auto,q_auto` CDN, `unstable_cache` 1hr |
| Scroll | Lenis + wheel-driven snap | `lenis.targetScroll` projected position, 500ms debounce |
| Animations | GSAP + `@gsap/react` | `useGSAP()`, ScrollTrigger |
| Background FX | WebGL canvas (StormBackground) | FBM shader, cursor-reactive, project pages only |
| Fonts | Alfa Slab One · Inter · Space Grotesk | Display · Body · Meta |
| i18n | next-intl | FR default / EN |
| Deployment | Vercel | |
| UI components | shadcn/ui + custom LinkCta/PillCta | |
