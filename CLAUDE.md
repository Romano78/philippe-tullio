# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Working Style
- **Never rush from planning to coding.** Use judgement — if the task involves architecture, folder structure, multi-file changes, or anything that requires discussion, that's planning mode. Quick isolated fixes (e.g. swap a class name, fix a typo) can be done directly. When in planning mode: present the full plan, then stop and explicitly ask "Ready to move to the coding step?" — do NOT write a single line of code until the user confirms. If mid-task you realise you're about to write code during a planning discussion, stop and ask first.
- **Never assume. Never fake confidence.** If unsure about something, say so explicitly. "I'm not sure" is always better than a confident wrong answer that wastes time with back-and-forth corrections.
- **Web searches: max 10 sources**, most relevant only. Share the doc link so the user can verify manually — never present search results as ground truth.
- When in doubt about scope or approach, ask — don't assume.

## Agent Role — Orchestrator Only
- **Claude Code does not write code directly.** Its role is to plan, review, and orchestrate.
- All implementation is delegated to subagents (e.g. Senior Developer) via the Agent tool.
- Claude Code's responsibilities: understand the task, form a complete plan, brief the subagent precisely, review the result, and report back to the user.
- Never write or edit files directly — spawn a subagent and hand it a full, unambiguous brief.

## Pre-brief Research (mandatory before every agent brief)
- **Trace every integration to its origin.** If a hook, context, or utility is used, read the file where its value is defined — not just the hook file. Example: `useLenis()` → must read `SmoothScroll.jsx` to know the context value is a ref, not the instance.
- **Verify third-party API/exports exist in the installed version** before including them in a brief. Check `node_modules` or run a quick node command — never assume an icon name or API method exists.
- If uncertain about any value, API shape, or contract: read first, then brief.
- **Next.js 16 uses `proxy.ts` not `middleware.ts`** — always check for `proxy.ts` before writing any proxy/middleware code.
- **Icon and metadata files (`icon.png`, `apple-icon.png`, `opengraph-image.png`, etc.) must live in `app/` root** — never inside a dynamic route segment like `app/[locale]/` or Next.js will fail to prerender them.

## Mistake Protocol (mandatory)
- **When a mistake is made, always update `CLAUDE.md` immediately** to prevent it from recurring. Never rely on session memory — it resets every conversation. If a wrong assumption caused the mistake, add an explicit rule here so the next session doesn't repeat it.
- **Never delete logic to disable a feature.** Always use a prop (e.g. `hideOnScroll={false}`) so the behaviour can be toggled without rewriting. Deleting code is irreversible and loses intent.

## Post-agent Review (mandatory after every agent completes)
- Read all changed files and cross-reference any integrations used against their source files.
- **Run `npm run build`** to catch compile and runtime errors before reporting to the user.
- A review that only checks the diff is not a review — it must verify the assumptions behind the code.

## Project Roadmap
`PLAN.md` at the repo root is the single source of truth for page status, current focus, and next steps. Always read it at the start of a conversation.

---

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
- GSAP + `@gsap/react` — scroll-triggered cinematic animations
- CSS `scroll-snap-type: y mandatory` — native scroll snap (coexists with Lenis — do NOT remove either without understanding the interaction)
- next-intl — FR/EN i18n (locale routing via `app/[locale]/`)
- next-themes — dark/light mode (dark by default)
- shadcn/ui (Radix UI primitives)
- Cloudinary Node SDK — server-side asset fetching (`lib/cloudinary.ts`)
- Custom URL builders — `lib/cloudinary-url.ts` for client-safe CDN URLs
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
- Dark theme by default: `#131313` background, `#f0f0f0` text
- Light theme: `#f5f5f3` background, `#111111` text
- Custom typography: `.h1`–`.h3`, `.text-overline` in `@layer components`
- Three typefaces: **Alfa Slab One** (`--font-display`) for display headings, **Inter** (`--font-sans`) for body, **Space Grotesk** (`--font-meta`) for metadata

### Mixed JS/TS
- `.tsx` — app-level files (`layout.tsx`, `page.tsx`, `lib/utils.ts`, `components/ui/`)
- `.jsx` — all other components
- New page-level files → `.tsx`, new components → `.jsx`

### Component Inventory
Always check these before writing new JSX:

**Shared / primitives**
- `components/LinkCta.jsx` — styled anchor CTA
- `components/PillCta.jsx` — pill-shaped CTA button
- `components/SmoothScroll.jsx` — Lenis wrapper (root level)
- `components/lenis-context.jsx` — `useLenis()` hook
- `components/scroll-progress-button.tsx` — scroll progress indicator

**Nav** (`components/nav/`)
- `index.jsx`, `DesktopNav.jsx`, `MobileNav.jsx`, `MobileMenu.jsx`, `NavLink.jsx`, `NavScroll.jsx`, `LangToggle.jsx`

**Home** (`components/home-swiper/`)
- `index.jsx` — main swiper orchestrator
- `ProjectSection.jsx`, `ProjectContent.jsx`, `ThumbnailStrip.jsx`
- `data.js` — project metadata

**Gallery** — `components/gallery/GalleryGrid.jsx`

**Project page** (`components/project/`)
- `ProjectHero.jsx`, `ProjectGallery.jsx`, `ProjectInfo.jsx`, `ProjectPreview.jsx`, `ProjectVideoPlayer.jsx`, `StormBackground.jsx`

**About** (`components/about/`)
- `AboutContent.jsx` — about page orchestrator
- `AnimateIn.jsx` — scroll-triggered entrance animation primitive
- `primitives.jsx` — shared layout primitives for about sections
- Sections: `HeroSection`, `ShowreelSection`, `FilmSchoolSection`, `ActingSection`, `ScriptsSection`, `AbacoSection`, `CrakoSection`, `JayaSection`, `JesusIsBackSection`, `KCitizenSection`

**Contact** — `components/contact/index.jsx`

---

## Fragile Areas — Do Not Touch Without Care

- **`components/home-swiper/`** — complex scroll + snap interaction, touch carefully
- **Lenis + CSS scroll-snap coexistence** — the scroll setup is delicate; do not modify `SmoothScroll.jsx`, `globals.css` scroll rules, or HomeSwiper scroll logic without fully understanding how they interact
- If a change touches either of these areas, flag it explicitly before proceeding

---

## Performance — Video & Image Heavy Site

This is a video-heavy and image-heavy site. Performance is critical.

- **Videos** hosted on Cloudinary (streaming CDN). Never self-host videos.
- **Images** always use `next/image`. Use `fill` with a `relative` positioned wrapper for Cloudinary images. Add `priority` only for above-the-fold images.
- Lazy load everything below the fold.
- No autoplay video on mobile.
- Prefer poster images for video placeholders until user interaction.
- Code split aggressively — keep page bundle lean.

### Cloudinary
- **Never build Cloudinary URLs manually in components.** Always use the helpers from `lib/cloudinary-url.ts`:
  - `cldImage(publicId)` — images (`f_auto,q_auto` by default)
  - `cldVideo(publicId)` — videos (`f_auto,q_auto` by default)
  - `cldVideoPoster(publicId)` — video poster frames (jpg, first frame)
- `lib/cloudinary.ts` is `server-only` — never import it in client components
- Asset fetching happens server-side; by the time a URL reaches a component it's already a plain CDN string
- **Never use a raw `<img>` tag.** All images use `next/image` with the Cloudinary URL as `src`
- Add custom transformations as the second argument: `cldImage(id, "w_800,f_auto,q_auto")`

---

## Coding Conventions

### No hardcoded values
- **Easings** — always use `ease` from `config/cubic-beziers.js`. Never write raw cubic-bezier arrays in components
- **Routes / hrefs** — always use `routes` from `config/routes.js`. Never hardcode `/about`, `/contact`, etc.
- **Project data** — comes from `components/home-swiper/data.js`. Never duplicate or inline project metadata
- **Copy / text** — always comes from `translations/fr.json` + `translations/en.json` via next-intl. Never hardcode user-facing strings
- **If unsure of a value** (animation duration, breakpoint, color, etc.) — ask, don't guess

### Component extraction rule
- Extract into a component when something is reused across more than one place
- Follow the About sections pattern: each distinct section is its own component in a `sections/` subfolder
- Shared layout primitives (wrappers, grids, spacers) go in `primitives.jsx` for that domain
- Don't inline JSX that belongs in a dedicated component

### Values from props/data, not hardcoded in JSX
- Component behaviour (animation params, labels, hrefs) should flow in via props or be read from data files
- If a value is hardcoded in JSX and could vary per instance, it should be a prop

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
- Initialized once at root level via `components/SmoothScroll.jsx`, wrapped in `app/[locale]/layout.tsx`
- Exposes lenis instance via `useLenis()` from `components/lenis-context.jsx`
- Synced with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`
- GSAP ticker drives Lenis via `gsap.ticker.add()` — ticker callback stored in a ref for proper cleanup
- Do NOT use CSS `scroll-behavior: smooth` alongside Lenis
- Coexists with CSS `scroll-snap-type: y mandatory` — do not remove either

### GSAP
- Use `useGSAP()` hook (from `@gsap/react`) instead of `useEffect`
- Register plugins at top of file: `gsap.registerPlugin(ScrollTrigger)`
- Lenis + ScrollTrigger sync is handled via `gsap.ticker` in `SmoothScroll.jsx` — do not add `scrollerProxy`
- Scope all selectors to a ref

### next-intl
- All copy lives in `translations/fr.json` and `translations/en.json`
- Server components: `import { getTranslations } from 'next-intl/server'`
- Client components: `import { useTranslations } from 'next-intl'`
- The codebase currently uses `next/link` directly in some components (`ProjectSection.jsx`, `DesktopNav.jsx`) — this works but does not handle locale prefixing automatically
- `localePrefix: "as-needed"` is set in `i18n/routing.ts` — meaning the locale prefix is only added for non-default locales (EN), French gets no prefix
- **Never hardcode locale prefixes** (`/${locale}/`, `/fr/`, `/en/`) in hrefs — with `as-needed`, this can produce wrong URLs for the default locale
- `components/about/sections/KCitizenSection.jsx` uses `href={\`/${locale}/work/k-citizen\`}` — tested and works correctly with `as-needed`
- Anchor hrefs within the page use `config/routes.js` as the single source of truth
- If unsure about routing, ask — do not guess
