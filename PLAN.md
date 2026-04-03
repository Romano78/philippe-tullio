# Project Plan — Tullio Philippe

## Site Goal
High-end cinematic portfolio for Tullio Philippe, film director. Recreate and improve upon https://nocoment1r.wixsite.com/tullio-philippe. Design reference: https://www.secretlevel.co

---

## Pages

| Page | Route | Status | Description |
|---|---|---|---|
| Home | `/` | 🟡 In progress | Full-screen project navigator. Vertical scroll-snap — each project takes full screen. Thumbnail strip synced to scroll. Desktop: vertical strip left. Mobile: horizontal strip bottom. |
| Project | `/work/[slug]` | ⬜ Not started | Individual project detail page. Video, stills, metadata. |
| About | `/about` | ⬜ Not started | Bio + `<Contact />` component at bottom. |
| Gallery | `/gallery` | ⬜ Not started | BTS gallery — masonry grid, click to open lightbox. |
| Contact | `/contact` | ⬜ Not started | Standalone contact page (SEO). Uses `<Contact />` component. |

---

## Build Order

### Phase 1 — Foundation
- [x] `<Nav />` — glassmorphism pill, FR/EN toggle
- [ ] `<Footer />` — minimal

### Phase 2 — Home
- [x] `<HomeSwiper />` — full-screen scroll-snap sections
  - [x] GSAP cinematic tilt animation (rotation + scale + yPercent scrub)
  - [x] Content reveal animation (title slide-up, meta fade-in)
  - [x] Thumbnail strip (left, synced via IntersectionObserver)
  - [x] CSS `scroll-snap-type: y mandatory` (native, no Lenis)
  - [x] Cloudinary connected — first real project (JAYA) loading from Cloudinary
  - [x] Data architecture: metadata in `data.js`, assets fetched server-side and merged in `page.tsx`
  - [ ] Video autoplay on desktop, disabled on mobile
  - [ ] Intro animation (content slides up on first load)
  - [ ] Fill remaining projects with real data

### Phase 3 — Project Page
- [ ] `/work/[slug]` route
- [ ] `<ProjectHero />` — full-screen 16:9 video or still
- [ ] `<ProjectInfo />` — title, role, year, description, credits
- [ ] `<ProjectGallery />` — stills grid

### Phase 4 — About
- [ ] `<AboutHero />`
- [ ] `<Bio />`
- [ ] `<BtsGallery />`

### Phase 5 — Contact
- [ ] `<Contact />` reusable component
- [ ] `/contact` page

### Phase 6 — Polish
- [ ] GSAP scroll-triggered animations across all pages
- [ ] Page transitions
- [ ] Mobile QA
- [ ] Performance audit (Cloudinary, lazy loading, bundle)
- [ ] SEO (metadata, OG tags, sitemap)
- [ ] FR/EN translations complete

---

## Content Status

| Item | Status |
|---|---|
| JAYA — featured thumb | ✅ on Cloudinary |
| JAYA — featured video | ✅ on Cloudinary |
| JAYA — work thumb | ⬜ |
| JAYA — work video | ⬜ |
| JAYA — gallery stills | ⬜ |
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
      thumb/    → homepage section image / video poster (image)
      video/    → homepage autoplay background video (video)
    work/
      thumb/    → project detail page image / video poster (image)
      video/    → project detail full video with controls (video)
      gallery/  → stills, named 01_*, 02_*, 03_* (images, sorted by name)
about/
  portrait/
  bts/
showreel/
```

### Data flow
1. `lib/cloudinary.ts` (server-only) — fetches asset public IDs via Cloudinary Search API
2. `lib/cloudinary-url.ts` (client-safe) — builds Cloudinary CDN URLs (`f_auto,q_auto`)
3. `app/[locale]/page.tsx` — server component, fetches all project assets, merges with `data.js` metadata
4. Props flow down to `<HomeSwiper>` → `<ProjectSection>`
5. Metadata (title, brand, year, category, slug) stays in `components/home-swiper/data.js`

---

## Asset Conventions

### Aspect Ratios
- **Featured video / work video** → 16:9 (production standard)
- **Featured thumb / work thumb** → 16:9 (still from 16:9 footage)
- **Gallery stills** → variable (BTS, on-set photography)

### On the homepage
- Sections are `100svh` with `object-cover` — 16:9 video/image fills the viewport and crops on tall screens. This is intentional (cinematic crop).
- On the project page (`/work/[slug]`), the hero video should be displayed at native 16:9 ratio (not full-screen cropped) — design TBD.

---

## Tech Decisions

| Decision | Choice | Notes |
|---|---|---|
| Video/Image hosting | Cloudinary | `f_auto,q_auto`, CDN streaming |
| Scroll | CSS `scroll-snap-type: y mandatory` | Lenis removed — conflicts with CSS snap |
| Animations | GSAP + `@gsap/react` | `useGSAP()` hook, ScrollTrigger |
| Fonts | Alfa Slab One · Inter · Space Grotesk | Display · Body · Meta |
| i18n | next-intl | FR default / EN secondary |
| Deployment | Vercel | |
| UI components | shadcn/ui | |
