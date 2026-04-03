# Home Swiper Spec — Tullio Philippe

## Status
✅ Ready to build.

---

## Overview
The home page is a full-screen infinite vertical scroll through all of Tullio's projects. Each project occupies exactly `100vh`. No snapping, no pinning — pure scroll. A Swiper thumbnail strip on the left (desktop) or bottom (mobile) stays fixed and syncs with scroll position.

---

## Layout

### Full-screen project section
```
┌─────────────────────────────────────────────────────┐
│  [NAV]                                               │
│                                                      │
│  [BACKGROUND IMAGE / VIDEO — full cover]             │
│  [CINEMATIC OVERLAY — gradient top + bottom]         │
│                                                      │
│                                                      │
│                                                      │
│  [Client name — small, Space Grotesk]                │
│  [PROJECT TITLE — massive, Alfa Slab One, all caps]  │
│  [Watch Project →]                                   │
└─────────────────────────────────────────────────────┘
```

### Thumbnail strip (desktop — fixed left)
- Fixed to left side of viewport, vertically centered
- ~80px wide thumbnails
- Swiper in vertical mode
- Active thumbnail: lime `#B8FF00` border
- Inactive: 40% opacity
- Click → scroll to project

### Thumbnail strip (mobile — fixed bottom)
- Fixed to bottom of viewport, horizontally centered
- Swiper in horizontal mode
- Same active/inactive states
- Click → scroll to project

---

## Components
- `<HomeSwiper />` — wrapper, manages active project index state
- `<ProjectSection />` — single full-screen project (background + overlay + text + CTA)
- `<ThumbnailStrip />` — Swiper instance, receives activeIndex + onThumbClick

---

## Scroll Sync
- Each `<ProjectSection />` has an `id` and a ref
- `IntersectionObserver` with `threshold: 0.5` — when a project is 50% in view, it becomes active
- Active index passed to `<ThumbnailStrip />` → Swiper slides to matching thumb
- Clicking a thumb → `scrollIntoView({ behavior: 'smooth' })` on the matching section

---

## Text Animation
- On each project entering the viewport (IntersectionObserver):
  - Client name: fade in + slide up, 300ms delay
  - Project title: fade in + slide up, 450ms delay
  - CTA: fade in + slide up, 600ms delay
- Uses Framer Motion `AnimatePresence` keyed to activeIndex
- Easing: `[0.16, 1, 0.3, 1]` (out — quick settle)

---

## CTA
- Label: "Watch Project →" (or FR: "Voir le projet →")
- Style: pill, ghost border (`rgba(255,255,255,0.2)`), Space Grotesk, all caps, small
- Links to `/work/[slug]`

---

## Data Structure (placeholder)
```js
const projects = [
  {
    id: "project-1",
    slug: "project-1",
    client: "Client Name",
    title: "PROJECT TITLE",
    image: "https://picsum.photos/id/1018/1920/1080",
    thumb: "https://picsum.photos/id/1018/160/90",
  },
  // ...
]
```

---

## Performance
- Only first project image loads with `priority`
- All others lazy loaded
- Videos (when added): Cloudinary streaming, poster image shown until in view
- No autoplay on mobile

---

## Mobile
- Thumbnail strip moves to bottom, horizontal Swiper
- Text size scales down
- CTA remains readable
- Touch scroll drives IntersectionObserver same as desktop

---

## TODO
- [ ] Build `<ProjectSection />`
- [ ] Build `<ThumbnailStrip />` with Swiper
- [ ] Build `<HomeSwiper />` wrapper
- [ ] Wire IntersectionObserver scroll sync
- [ ] Add text animations with Framer Motion
- [ ] Add placeholder project data (5–6 items with Picsum)
- [ ] Test mobile layout
- [ ] Replace placeholder images with Cloudinary assets later
