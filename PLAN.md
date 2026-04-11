# Project Plan — Tullio Philippe

## Site Goal
High-end cinematic portfolio for Tullio Philippe, film director. Recreate and improve upon https://nocoment1r.wixsite.com/tullio-philippe. Design reference: https://www.secretlevel.co

---

## 🟢 V1 LIVE — https://philippetullio.com

---

## Pages

| Page | Route | Status |
|---|---|---|
| Home | `/` | ✅ Live |
| Project | `/work/[slug]` | ✅ Live |
| About | `/about` | ✅ Live |
| Gallery | `/gallery` | ✅ Live |
| So Productions | `/soproductions` | ✅ Live — `soproductions.fr` redirects via `proxy.ts` |
| Contact | `/contact` | ✅ Live |

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

## 🟡 Post-Launch — Remaining Items

### Content still needed from client
| Item | Status | Notes |
|---|---|---|
| So Productions bio + image | ⬜ needs client | `/soproductions` page |

### Ongoing / Nice to have
- [x] Submit sitemap to Google Search Console
- [x] Fix www → non-www redirect in Vercel domain settings (GSC redirect error)
- [x] Performance audit (lazy loading, bundle size)
- [x] Mobile video uploads to Cloudinary `featured/mobile-video/`
- [x] Full QA pass once all client content is in

---

## So Productions — Full Plan

**Brand:** Sans Oreilles Production (SO Productions)
**Domain:** `soproductions.fr` → same Vercel project as `philippetullio.com`
**Route:** `/soproductions`
**Language:** FR/EN (next-intl, same as main site)

---

### Domain Setup (do when ready)
1. **OVH DNS** — add A record `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`, TTL 300
2. **Vercel** — Settings → Domains → add `soproductions.fr` + `www.soproductions.fr`
3. **Middleware** — extend `middleware.ts` to detect `host === 'soproductions.fr'` and `NextResponse.rewrite` to `/soproductions`

### Page Status ✅
- `components/soproductions/data.js` — ✅ created (placeholders, fill content when ready)
- `app/[locale]/soproductions/page.tsx` — ✅ live
- `components/soproductions/SoProductionContent.jsx` — ✅
- `components/soproductions/sections/HeroSection.jsx` — ✅
- `components/soproductions/sections/BioSection.jsx` — ✅
- `components/soproductions/sections/CtaSection.jsx` — ✅
- `translations/fr.json` + `en.json` — ✅ `soProduction` namespace added

### Still needed
- [ ] Real bio text FR + EN → update `translations/fr.json` + `en.json`
- [ ] Visual → upload to Cloudinary under `so-production/hero/`, wire via `cldImage()` in `page.tsx`
- [ ] Real email → update `data.js`
- [ ] Domain wiring (OVH + Vercel + middleware)

---

### Files to Create

| File | Purpose |
|---|---|
| `components/soproductions/data.js` | Company data (name, tagline, bio, image, cta) |
| `app/[locale]/soproductions/page.tsx` | Server component — passes data to client |
| `components/soproductions/SoProductionContent.jsx` | Client orchestrator |
| `components/soproductions/sections/HeroSection.jsx` | Name + tagline left, square image right (`lg:grid-cols-[3fr_2fr]`) |
| `components/soproductions/sections/BioSection.jsx` | Bio paragraph, full width |
| `components/soproductions/sections/CtaSection.jsx` | Email + PillCta → `/` (philippetullio.com) |

### Translations
Add `"soProduction"` namespace to `translations/fr.json` + `translations/en.json`

### Data structure (`data.js`)
```js
export const soProduction = {
  name: { fr: 'Sans Oreilles\nProduction', en: 'Sans Oreilles\nProduction' },
  tagline: { fr: 'Une maison de production cinématographique', en: 'A cinematic production company' },
  bio: { fr: '[À remplir]', en: '[To fill]' },
  email: 'contact@so-production.com', // placeholder
  image: null, // Cloudinary public ID — to be uploaded
  cta: { fr: 'Voir le travail du réalisateur', en: "See the director's work" },
  ctaHref: '/',
};
```

### Design
- Full `100svh` hero — `#131313` bg, same cinematic aesthetic
- Grid: `lg:grid-cols-[3fr_2fr]` (text left, square image right)
- Typography: Alfa Slab One display, Inter body, Space Grotesk meta
- Accent `#B8FF00` on overline
- Staggered Framer Motion fade-in (same as About sections)
- Shares existing `<Nav />` and Cloudinary setup

### Content still needed from client
- [ ] Bio text FR + EN
- [ ] Company tagline (confirm or replace placeholder)
- [ ] Contact email
- [ ] Visual/image → upload to Cloudinary under `so-production/hero/`

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
