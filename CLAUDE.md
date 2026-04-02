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

## Design Context

### Users
Film industry clients, production companies, brands, and collaborators evaluating a director. They arrive to be convinced by the work — not sold to. The site's job is **validation through atmosphere**.

### Brand Personality
**The Digital Auteur** — Cinematic · Atmospheric · Uncompromising

### Aesthetic Direction
- **Total Black philosophy** — depth through light and texture, not color
- Background `#131313`, surfaces layered via `#0E0E0E` / `#1B1B1B` / `#2A2A2A`
- **Lime accent** `#B8FF00` used surgically — interaction states only, never dominant
- **Intentional asymmetry** — no 50/50 splits, vast breathing voids
- **Typography as structure** — Alfa Slab One (`--font-display`) for display, Inter (`--font-sans`) for body, Space Grotesk (`--font-meta`) for metadata
- **Glassmorphism** on nav — 70% opacity, 32px backdrop blur
- **No 1px borders ever** — section boundaries via bg color shifts only
- Ghost borders max `outline-variant` at 15% opacity
- Ambient shadows: `on-surface` at 4% opacity, 40px blur, 0px offset

### Design Principles
1. **Imagery first** — visuals take 80–100% viewport width, UI gets out of the way
2. **No lines** — space and background shifts define hierarchy, never borders
3. **Editorial tension** — extreme typographic scale contrast between massive headings and small metadata
4. **Atmospheric depth** — layered surfaces simulate studio lighting falloff
5. **Restraint is power** — lime accent earns impact by being rare; clutter is the enemy of mood

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
