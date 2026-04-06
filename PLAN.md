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

### Phase 2 — Home ✅ (polish remaining)
- [x] `<HomeSwiper />` — full-screen sections, GSAP tilt + content reveal
- [x] Lenis smooth scroll + wheel-driven snap (proximity snap on stop, 500ms debounce)
- [x] Thumbnail strip — IntersectionObserver synced
- [x] Cloudinary connected — assets served via Search API + in-memory cache + `unstable_cache` (1hr)
- [x] Data architecture — metadata in `data.js`, assets merged in `page.tsx`
- [x] Hydration fix — `gsap.set()` inside `useGSAP`, no inline styles
- [x] All projects filled with real Cloudinary assets
- [ ] Video autoplay disabled on mobile
- [ ] Intro animation (first load slide-up)

### Phase 3 — Project Page ✅ (polish remaining)
- [x] Route `app/[locale]/work/[slug]/page.tsx`
- [x] `<ProjectHero />` — full-bleed, 16/9 hero image from `work/[slug]/work/hero/`
- [x] `<ProjectInfo />` — two-column (info left, preview right), mobile stacked
- [x] `<ProjectPreview />` — autoplay muted teaser, Watch full film overlay → lightbox
- [x] `<ProjectGallery />` — masonry-only (`columns-1 sm:columns-2 lg:columns-3`)
- [x] `<ProjectVideoPlayer />` — Netflix-style lightbox, Escape to close
- [x] `<StormBackground />` — WebGL FBM shader, cursor-reactive, project pages only
- [x] `<ScrollProgressButton />` — scroll progress ring, centered
- [x] `<LinkCta />` + `<PillCta />` — reusable CTAs

### Phase 4 — About ✅ (polish remaining)
- [x] Sections componentised — `components/about/sections/`
- [x] Section order: Hero → Acting → Film School → K-CITIZEN → ABACO → JESUS IS BACK → In Development → Scripts
- [x] `noPb` prop on sections — prevents double padding before SectionBreaks
- [x] Image sizing: Acting `16/9`, LFA hero `21/9` banner, K-CITIZEN original 3-grid layout
- [x] Project CTAs: K-CITIZEN, ABACO, JESUS IS BACK, JAYA all link to project pages

### Phase 5 — Contact ✅
- [x] `<Contact />` reusable component
- [x] `/contact` page

### Phase 6 — Polish & QA 🟡 CURRENT FOCUS
- [ ] GSAP scroll animations across all pages
- [ ] Page transitions
- [ ] Video autoplay disabled on mobile
- [ ] Intro animation (first load)
- [ ] Mobile QA pass (all pages)
- [ ] Performance audit (Cloudinary, lazy loading, bundle)
- [ ] SEO (metadata, OG tags, sitemap)
- [ ] Lighthouse audit
- [x] FR/EN translations complete

---

## Next Session — Start Here

### 1. Mobile QA pass
Go through all pages on mobile: spacing, CTAs, video behaviour, autoplay disabled.

### 2. GSAP scroll animations
Scroll-triggered reveals across Home, About, Project pages.

### 3. Page transitions
Between routes — cinematic fade or slide.

### 4. Intro animation
First-load slide-up on Home.

### 5. Performance + SEO
Metadata, OG tags, sitemap, Lighthouse audit.

---

## Cloudinary Folder Structure

```
work/
  [slug]/
    featured/
      thumb/    → homepage still / video poster
      video/    → homepage autoplay teaser
    work/
      hero/     → project page full-bleed hero image (NEW)
      thumb/    → video poster / fallback
      previewvid/ → autoplay muted preview on project page
      video/    → full film — lightbox player
      gallery/  → BTS stills (images, any naming)
about/
  portrait/
  acting/
  lfa/hero/
  lfa/logo/
  kcitizen/
  scarface/
  jaya/
  crako/
  offside/
  abaco/
  jesus-is-back/
showreel/
```

---

## Content Status

| Item | Status |
|---|---|
| All projects — Cloudinary assets | ✅ |
| Bio text (FR + EN) | ⬜ needs client |
| Showreel video | ⬜ needs client |
| Profile photo | ⬜ needs client |
| Contact email / socials | ⬜ needs client |

---

## Tech Decisions

| Decision | Choice | Notes |
|---|---|---|
| Video/Image hosting | Cloudinary | `f_auto,q_auto` CDN, in-memory Map + `unstable_cache` 1hr |
| Scroll | Lenis + wheel-driven snap | `lenis.targetScroll` projected position, 500ms debounce |
| Animations | GSAP + `@gsap/react` | `useGSAP()`, ScrollTrigger |
| Background FX | WebGL canvas (StormBackground) | FBM shader, cursor-reactive, project pages only |
| Fonts | Alfa Slab One · Inter · Space Grotesk | Display · Body · Meta |
| i18n | next-intl | FR default / EN |
| Deployment | Vercel | |
| UI components | shadcn/ui + custom LinkCta/PillCta | |

---

## Global Spacing System

```css
/* globals.css — HORIZONTAL ONLY */
.site-px, .section-padding { padding-left: 1rem; }
/* 640px+ → 1.5rem | 1200px+ → 3rem | 1600px+ → 4rem */
.site-max { max-width: 1800px; margin: 0 auto; }
/* VERTICAL — Tailwind utilities only, standard: py-16 md:py-20 */
```

**`noPb` prop pattern** — sections before a `SectionBreak` pass `noPb` to remove bottom padding. `SectionBreak` owns the gap via `pt-14 md:pt-24`.
