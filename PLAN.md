# Project Plan — Tullio Philippe

## Site Goal
High-end cinematic portfolio for Tullio Philippe, film director. Recreate and improve upon https://nocoment1r.wixsite.com/tullio-philippe. Design reference: https://www.secretlevel.co

---

## Pages

| Page | Route | Status |
|---|---|---|
| Home | `/` | 🟡 Content |
| Project | `/work/[slug]` | 🟡 Content |
| About | `/about` | 🟡 Content |
| Gallery | `/gallery` | ✅ Done |
| Sans Soleil Production | `/sans-soleil-production` | ⬜ To plan |
| Contact | `/contact` | ✅ Done |

---

## Build Order

### Phase 1 — Foundation ✅
- [x] `<Nav />` — glassmorphism pill, FR/EN toggle
- [x] `<Footer />` — minimal

### Phase 2 — Home ✅
- [x] `<HomeSwiper />` — full-screen sections, GSAP tilt + content reveal
- [x] Lenis smooth scroll + wheel-driven snap (proximity snap on stop, 500ms debounce)
- [x] Thumbnail strip — IntersectionObserver synced
- [x] Cloudinary connected — assets served via Search API + `unstable_cache` (1hr)
- [x] Data architecture — metadata in `data.js`, assets merged in `page.tsx`
- [x] All projects filled with real Cloudinary assets

### Phase 3 — Project Page ✅
- [x] Route `app/[locale]/work/[slug]/page.tsx`
- [x] `<ProjectHero />` — full-bleed, 16/9 hero image from `work/[slug]/work/hero/`
- [x] `<ProjectInfo />` — two-column (info left, preview right), mobile stacked
- [x] `<ProjectPreview />` — autoplay muted teaser, Watch full film overlay → lightbox
- [x] `<ProjectGallery />` — masonry-only (`columns-1 sm:columns-2 lg:columns-3`)
- [x] `<ProjectVideoPlayer />` — Netflix-style lightbox, Escape to close
- [x] `<StormBackground />` — WebGL FBM shader, cursor-reactive, project pages only
- [x] `<ScrollProgressButton />` — scroll progress ring, centered
- [x] `<LinkCta />` + `<PillCta />` — reusable CTAs

### Phase 4 — About ✅
- [x] Sections componentised — `components/about/sections/`
- [x] Section order: Hero → Showreel → Acting → Film School → K-CITIZEN → [Other Work] → ABACO → JESUS IS BACK → [In Development] → JAYA → CRAKO → [Feature Films] → Scripts
- [x] `noPb` prop on sections — prevents double padding before SectionBreaks
- [x] Image sizing: Acting `16/9`, LFA hero `21/9` banner, K-CITIZEN original 3-grid layout
- [x] Project CTAs: K-CITIZEN, ABACO, JESUS IS BACK, JAYA all link to project pages
- [x] Scroll animations — Framer Motion `AnimateIn` / `AnimateHeading` across all sections
- [x] `<ShowreelSection />` — 16/9 preview video with lightbox player

### Phase 5 — Contact ✅
- [x] `<Contact />` reusable component
- [x] `/contact` page

### Phase 6 — i18n + Locale ✅
- [x] FR/EN translations complete
- [x] FR default at `/`, EN at `/en` — handled via `next.config.ts` + `withNextIntl` (no explicit middleware.ts)

### Phase 7 — Gallery ✅
- [x] Route `app/[locale]/gallery/page.tsx`
- [x] `<GalleryGrid />` — Cloudinary `getAllGalleryImages()`, full masonry layout
- [x] `<StormBackground />` + `<Contact />` included

---

## 🟡 Current Focus

### Step 1 — Client Content
Fill in real copy, credits, and links provided by the client.

| Item | Status | Notes |
|---|---|---|
| showreel videoUrl | ⬜ needs client | No YouTube/Vimeo link yet |
| abaco videoUrl | ⬜ needs client | No YouTube/Vimeo link yet |
| Contact email | ⬜ needs client | Currently `rprdigital.dev@gmail.com` (dev placeholder) |
| IMDb link | ⬜ needs client | `href="#"` placeholder |
| LinkedIn link | ⬜ needs client | `href="#"` placeholder |
| Vimeo link | ⬜ needs client | `href="#"` placeholder |
| YouTube link | ⬜ needs client | `href="#"` placeholder |
| Bio text (FR + EN) | ⬜ needs client | |
| Profile photo | ⬜ needs client | |

### Step 2 — Sans Soleil Production page
⬜ **Needs planning session** — more scope than a standard page.
Route: `/sans-soleil-production`
See planning notes below.

### Step 3 — QA
- [ ] Full site QA pass — all pages, all breakpoints
- [ ] Mobile QA — spacing, CTAs, video behaviour
- [ ] Cross-browser check
- [ ] All links and CTAs working
- [ ] FR/EN language switch across all pages

### Step 4 — SEO
- [ ] Metadata + OG tags for all pages
- [ ] Sitemap
- [ ] Lighthouse audit
- [ ] Performance audit (lazy loading, bundle size)

---

## Sans Soleil Production — Planning

> ⚠️ Needs a dedicated planning session before building.

**What we know:**
- Route: `/sans-soleil-production`
- This is Tullio Philippe's production company
- More scope than a standard page — TBD

**Questions to answer before building:**
- What sections does the page need? (about the company, services, roster, contact?)
- Is there a separate visual identity / brand from Tullio's personal site?
- Does it need its own nav or share the site nav?
- Any specific Cloudinary assets needed?
- FR/EN copy — who provides it?

---

## Cloudinary Folder Structure

```
work/
  [slug]/
    featured/
      thumb/    → homepage still / video poster
      video/    → homepage autoplay teaser
    work/
      hero/     → project page full-bleed hero image
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
    video/      → full showreel
    thumb/      → poster image
    previewvid/ → autoplay muted preview
```

---

## Content Status

| Item | Status |
|---|---|
| All projects — Cloudinary assets | ✅ |
| Project copy + credits (FR + EN) | ✅ filled in `data.js` |
| Project videoUrls — k-citizen, jaya, crako, jesus-is-back | ✅ |
| Project videoUrls — showreel, abaco | ⬜ needs client |
| Bio text (FR + EN) | ⬜ needs client |
| Profile photo | ⬜ needs client |
| Contact email / socials | ⬜ needs client (dev placeholders in place) |
| Sans Soleil Production copy | ⬜ needs client |

---

## Tech Decisions

| Decision | Choice | Notes |
|---|---|---|
| Video/Image hosting | Cloudinary | `f_auto,q_auto` CDN, `unstable_cache` 1hr revalidation |
| Scroll | Lenis + wheel-driven snap | `lenis.targetScroll` projected position, 500ms debounce |
| Animations | GSAP + Framer Motion | GSAP for Home/Project; Framer Motion for About section reveals |
| Background FX | WebGL canvas (StormBackground) | FBM shader, cursor-reactive, project pages only |
| Fonts | Alfa Slab One · Inter · Space Grotesk | Display · Body · Meta |
| i18n | next-intl | FR default at `/` (no prefix) / EN at `/en` — via `withNextIntl` in `next.config.ts` |
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
