# Project Plan — Tullio Philippe

## Site Goal
High-end cinematic portfolio for Tullio Philippe, film director. Recreate and improve upon https://nocoment1r.wixsite.com/tullio-philippe. Design reference: https://www.secretlevel.co

---

## Pages

| Page | Route | Status |
|---|---|---|
| Home | `/` | 🟡 In progress |
| Project | `/work/[slug]` | 🟡 In progress |
| About | `/about` | ⬜ Not started |
| Gallery | `/gallery` | ⬜ Not started |
| Contact | `/contact` | ⬜ Not started |

---

## Build Order

### Phase 1 — Foundation
- [x] `<Nav />` — glassmorphism pill, FR/EN toggle
- [ ] `<Footer />` — minimal

### Phase 2 — Home
- [x] `<HomeSwiper />` — full-screen sections, GSAP tilt + content reveal
- [x] Lenis smooth scroll + wheel-driven snap
- [x] Thumbnail strip — IntersectionObserver synced
- [x] Cloudinary connected — JAYA loading from Cloudinary
- [x] Data architecture — metadata in `data.js`, assets merged in `page.tsx`
- [x] Hydration fix — `gsap.set()` inside `useGSAP`, no inline styles
- [ ] Video autoplay disabled on mobile
- [ ] Intro animation (first load slide-up)
- [ ] Fill remaining projects with real data

### Phase 3 — Project Page
- [x] Route `app/[locale]/work/[slug]/page.tsx`
- [x] Server component fetches Cloudinary assets, passes to client
- [x] `<ProjectHero />` — full-bleed 16:9 static image (work thumb), max 75vh
- [x] `<ProjectInfo />` — title, description, credits
- [x] `<ProjectGallery />` — grid/carousel toggle, empty state with movie pun
- [x] `<ProjectVideoPlayer />` — Netflix-style lightbox, Escape to close
- [x] `<StormBackground />` — WebGL FBM shader, cursor-reactive, project pages only
- [x] `<ScrollProgressButton />` — scroll progress ring, centered
- [ ] **NEXT: Refactor project page** (see below)

### Phase 3 Refactor — Project Page (next up)
- [ ] Global spacing classes in `globals.css` (`.section-padding`, `.section-gap`)
- [ ] Delete `ProjectCard.jsx`
- [ ] `ProjectInfo.jsx` → two-column layout: info left + preview right (desktop), stacked on mobile
- [ ] `ProjectPreview.jsx` (new) — autoplay muted `featured.video`, "Watch full film" button overlay → lightbox
- [ ] `ProjectHero.jsx` — remove margin hack, full bleed edge to edge
- [ ] `ProjectPageClient.tsx` — simplify, remove card logic
- [ ] All sections use `section-padding` class

### Phase 4 — About
- [ ] `<AboutHero />`
- [ ] `<Bio />`
- [ ] `<BtsGallery />`

### Phase 5 — Contact
- [ ] `<Contact />` reusable component
- [ ] `/contact` page

### Phase 6 — Polish
- [ ] GSAP scroll animations across all pages
- [ ] Page transitions
- [ ] Mobile QA
- [ ] Performance audit (Cloudinary, lazy loading, bundle)
- [ ] SEO (metadata, OG tags, sitemap)
- [ ] FR/EN translations complete
- [ ] Lighthouse audit

---

## Project Page Layout (post-refactor)

```
┌─────────────────────────────────────────┐
│  Hero — full-bleed 16:9 work/thumb      │
├─────────────────────────────────────────┤
│  Left col (60%)    │  Right col (40%)   │
│  Label + Title     │  Autoplay preview  │
│  Description       │  (featured/video)  │
│  Credits grid      │  Watch full film ↗ │
├─────────────────────────────────────────┤
│  Gallery — Behind the scenes            │
│  Grid / Carousel toggle                 │
└─────────────────────────────────────────┘
Mobile: all stacked, single column
```

Full film (lightbox) only shown when `work/video` exists on Cloudinary.

---

## Content Status

| Item | Status |
|---|---|
| JAYA — featured thumb | ✅ |
| JAYA — featured video (teaser) | ✅ |
| JAYA — work thumb | ✅ |
| JAYA — work video (full film) | ⬜ upload to `work/jaya/work/video/` |
| JAYA — gallery stills | ⬜ upload to `work/jaya/work/gallery/` (01_*, 02_*…) |
| Other projects | ⬜ placeholder data only |
| Bio text (FR + EN) | ⬜ |
| Showreel video | ⬜ |
| Profile photo | ⬜ |
| Contact email / socials | ⬜ |

---

## Cloudinary Folder Structure

```
work/
  [slug]/
    featured/
      thumb/    → homepage still / video poster (image)
      video/    → homepage autoplay teaser + project page preview (video)
    work/
      thumb/    → project page hero image (image)
      video/    → full film — lightbox player (video)
      gallery/  → BTS stills, named 01_*, 02_*, 03_* (images)
about/
  portrait/
  bts/
showreel/
```

### Data flow
1. `lib/cloudinary.ts` (server-only) — Cloudinary Search API
2. `lib/cloudinary-url.ts` (client-safe) — CDN URL builders
3. `app/[locale]/page.tsx` — home, fetches all slugs, merges with `data.js`
4. `app/[locale]/work/[slug]/page.tsx` — project, fetches single slug
5. Metadata (title, brand, year, category, description, credits) in `data.js`

---

## Global Spacing (to implement)

```css
/* globals.css */
.section-padding { @apply px-8 md:px-32 py-16 md:py-20; }
.section-gap     { @apply mb-16 md:mb-20; }
```

All project page sections use `.section-padding`. Change once → applies everywhere.

---

## Tech Decisions

| Decision | Choice | Notes |
|---|---|---|
| Video/Image hosting | Cloudinary | `f_auto,q_auto` CDN |
| Scroll | Lenis + wheel-driven snap | `lenis.scrollTo()`, IntersectionObserver |
| Animations | GSAP + `@gsap/react` | `useGSAP()`, ScrollTrigger |
| Background FX | WebGL canvas (StormBackground) | FBM shader, cursor-reactive, project pages only |
| Fonts | Alfa Slab One · Inter · Space Grotesk | Display · Body · Meta |
| i18n | next-intl | FR default / EN |
| Deployment | Vercel | |
| UI components | shadcn/ui | |
