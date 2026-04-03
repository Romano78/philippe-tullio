# Project Plan — Tullio Philippe

## Site Goal
High-end cinematic portfolio for Tullio Philippe, film director. Recreate and improve upon https://nocoment1r.wixsite.com/tullio-philippe. Design reference: https://www.secretlevel.co

---

## Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Full-screen project navigator. Pure vertical infinite scroll — each project takes full screen, no snapping. Thumbnail strip (Swiper) synced to scroll position. Desktop: vertical strip left. Mobile: horizontal strip bottom. Home IS the work showcase — no separate /work listing page. |
| Project | `/work/[slug]` | Individual project detail page. Accessed by clicking a project on the home page. Video, stills, metadata (title, role, year, description). |
| About | `/about` | Bio + `<Contact />` component at bottom. |
| Gallery | `/gallery` | BTS gallery — masonry grid, ~60 photos, click to open lightbox. Own page, own nav link. |
| Contact | `/contact` | Standalone contact page (SEO). Uses `<Contact />` component. |

---

## Component Architecture

### Layout / Global
- `<Nav />` — Fixed top, glassmorphism pill, links: Work · About · Contact + FR/EN toggle
- `<Footer />` — Minimal

### Shared / Reusable
- `<Contact />` — Reusable contact section. Used on `/about` and `/contact`.

### Home (`/`)
- `<ProjectNavigator />` — Full-screen infinite scroll. Each project is a full-screen section stacked vertically. No snapping, no transitions — raw cut as you scroll.
- `<ProjectThumbnails />` — Swiper instance synced to scroll. Highlights active project thumbnail as user scrolls. Click thumbnail → scroll jumps to that project. Desktop: vertical left strip. Mobile: horizontal bottom strip.

### Home Intro Animation
- Nav renders immediately on load
- Main content (ProjectNavigator) is hidden below viewport
- First project poster/video loads in background
- Once ready → content slides up into place (GSAP, cinematic ease)
- Black background holds during load — feels intentional, not broken

### Project (`/work/[slug]`)
- `<ProjectHero />` — Full-screen video or still
- `<ProjectInfo />` — Title, role, year, description, metadata
- `<ProjectGallery />` — Stills grid

### About (`/about`)
- `<AboutHero />` — Full-screen intro with portrait
- `<Bio />` — Director bio text
- `<BtsGallery />` — Behind the scenes image gallery
- `<Contact />` — Reusable contact component

### Contact (`/contact`)
- `<Contact />` — Reusable contact component (full page context)

---

## Build Order

### Phase 1 — Foundation
- [ ] `<Nav />` — glassmorphism, FR/EN toggle, mobile menu
- [ ] `<Footer />` — minimal

### Phase 2 — Home
- [ ] `<ProjectNavigator />` — full-screen hero + thumbnail strip
  - Desktop: vertical strip left
  - Mobile: horizontal strip bottom
  - Transitions: GSAP, cinematic easing

### Phase 3 — Project Page
- [ ] `/work/[slug]` route + data structure
- [ ] `<ProjectHero />`
- [ ] `<ProjectInfo />`
- [ ] `<ProjectGallery />`

### Phase 4 — About
- [ ] `<AboutHero />`
- [ ] `<Bio />`
- [ ] `<BtsGallery />`

### Phase 5 — Contact
- [ ] `<Contact />` reusable component
- [ ] `/contact` page

### Phase 6 — Polish
- [ ] Lenis smooth scroll setup
- [ ] GSAP scroll-triggered animations across all pages
- [ ] Page transitions
- [ ] Mobile QA
- [ ] Performance audit (Cloudinary, lazy loading, bundle)
- [ ] SEO (metadata, OG tags, sitemap)
- [ ] FR/EN translations complete

---

## Content (TBD)
All content is placeholder until Tullio provides:
- [ ] Bio text (FR + EN)
- [ ] Project list (title, role, year, description, video, stills)
- [ ] BTS photos
- [ ] Showreel video
- [ ] Profile photo
- [ ] Contact email / social links

---

## Tech Decisions
- **Video/Image hosting:** Cloudinary (`f_auto,q_auto`)
- **Fonts:** Alfa Slab One (display) · Inter (body) · Space Grotesk (metadata)
- **Animations:** GSAP + Framer Motion + Lenis
- **i18n:** next-intl, FR default / EN secondary
- **Deployment:** Vercel
- **Swiper:** Thumbnail strip navigation (synced to scroll via IntersectionObserver)
