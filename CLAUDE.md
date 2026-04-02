# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## About This Project
Portfolio site for **Tullio Philippe** — a film director (réalisateur).
High-end, immersive cinematic experience showcasing his work (films, commercials, music videos).

**Sections:** Work, About, Contact
**Languages:** FR (default) + EN
**Deployment:** Vercel
**Reference site to improve upon:** https://nocoment1r.wixsite.com/tullio-philippe

---

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

To add shadcn/ui components:
```bash
npx shadcn@latest add <component-name>
```

---

## Architecture

Single-page portfolio site built with:
- Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- Framer Motion — UI animations
- GSAP — scroll-triggered cinematic animations
- Lenis — smooth scrolling (immersive cinematic feel)
- next-intl — FR/EN i18n (locale routing via `app/[locale]/`)
- next-themes — dark/light mode (dark by default)
- shadcn/ui (Radix UI primitives)
- Cloudinary — image and video hosting/streaming
- split-type — text splitting for animations
- lucide-react — icons

### App structure
```
app/
  [locale]/
    layout.tsx   — root layout with ThemeProvider + NextIntlClientProvider
    page.tsx     — main page (single scroll)
  globals.css    — CSS variables + typography layers
```

### Config
- `config/routes.js` — anchor hrefs single source of truth
- `config/cubic-beziers.js` — shared easing curves
- `config/theme-provider.jsx` — next-themes wrapper
- `i18n/routing.ts` — locale config (fr default, en)
- `i18n/request.ts` — next-intl server config
- `middleware.ts` — next-intl locale routing middleware
- `translations/fr.json` + `translations/en.json` — all copy

### Styling
- Tailwind CSS v4 with CSS variables in `app/globals.css`
- Dark theme by default: `#0a0a0a` background, `#f0f0f0` text
- Light theme: `#f5f5f3` background, `#111111` text
- Custom typography: `.h1`–`.h3`, `.text-overline` in `@layer components`
- Single typeface: **Inter** (`--font-inter`)

### Mixed JS/TS
- `.tsx` — app-level files (`layout.tsx`, `page.tsx`, `lib/utils.ts`, `components/ui/`)
- `.jsx` — all other components
- New page-level files → `.tsx`, new components → `.jsx`

---

## Performance — Video & Image Heavy Site

This is a video-heavy and image-heavy site. Performance is critical.

- **Videos** hosted on Cloudinary (streaming CDN). Never self-host videos.
- **Images** always use `next/image` with proper `sizes` prop and `priority` only for above-the-fold.
- Lazy load everything below the fold.
- No autoplay video on mobile.
- Prefer poster images for video placeholders until user interaction.
- Code split aggressively — keep page bundle lean.

### Cloudinary
- Images: `https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}`
- Videos: `https://res.cloudinary.com/{cloud_name}/video/upload/{transformations}/{public_id}`
- Use `f_auto,q_auto` transformations by default.

---

## "use client" Rules
Push it as deep as possible. Only add `"use client"` when a component needs:
- useState / useEffect
- Event listeners
- Browser APIs
- GSAP / Framer Motion animations (if using hooks)

Everything else stays as a Server Component.

---

## Design Principles — Immersive Cinematic

This is a high-end director portfolio. The design must feel like cinema.

- **Dark-first** — dark backgrounds, light typography
- **Full-screen** — sections take full viewport height
- **Typography-driven** — weight and scale do the work
- **Slow, inevitable animations** — GSAP power2/power3, stagger reveals. Never bouncy or eager.
- **Whitespace is silence** — generous spacing signals confidence
- **No buzzwords, no aggressive CTAs** — the work speaks
- **Video is the hero** — let it breathe

### Easing reference (`config/cubic-beziers.js`)
- `cinematic` — [0.76, 0, 0.24, 1] — slow in, slow out
- `smooth` — [0.43, 0.13, 0.23, 0.96] — elegant ease
- `out` — [0.16, 1, 0.3, 1] — quick settle

---

## Key Libraries

### Lenis — Smooth Scrolling
- Initialize once at root level in `app/[locale]/layout.tsx`
- Always `"use client"` for the Lenis wrapper
- Sync with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- Do NOT use CSS `scroll-behavior: smooth` alongside Lenis

### GSAP
- Use `useGSAP()` hook (from `@gsap/react`) instead of `useEffect`
- Register plugins at top of file: `gsap.registerPlugin(ScrollTrigger)`
- Use `scrollerProxy` for Lenis + ScrollTrigger compatibility
- Scope all selectors to a ref

### next-intl
- All copy lives in `translations/fr.json` and `translations/en.json`
- Server components: `import { getTranslations } from 'next-intl/server'`
- Client components: `import { useTranslations } from 'next-intl'`
