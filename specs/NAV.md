# Nav Spec — Tullio Philippe

## Status
✅ Design confirmed. Ready to build.

---

## Desktop Layout
```
[TULLIO PHILIPPE]     [ABOUT · GALLERY · CONTACT]     [FR / EN]
     top-left              pill, left of center       pill, top-right
```
- Logo top-left — "TULLIO" bold stacked, Alfa Slab One
- Nav links in a pill container — all caps, Space Grotesk, subtle glassmorphism
- FR/EN toggle top-right — pill button, same style as nav pill

## Mobile Layout
```
[TULLIO PHILIPPE]                              [MENU ≡]
     top-left                                  pill, top-right
```
- Logo top-left
- `MENU` + hamburger icon in pill top-right
- Tapping opens full mobile menu (slide-in or full-screen overlay — TBD)

---

## Behaviour
- Fixed top, always visible
- Renders immediately on page load (before content reveal animation)
- No background on mount — becomes glassmorphism once user scrolls (or always on)

## Overlay
The full-screen media (video/image) always has a dark overlay so Nav and hero text remain readable regardless of content brightness:
- `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)`
- Top fade covers the Nav area
- Bottom fade covers the hero text area
- Never a flat black — keeps the cinematic feel

## Design Tokens
- Glassmorphism: `surface-highest` (#333333) at 70% opacity, `backdrop-blur-[32px]`
- No 1px borders — ghost border: `outline-variant` at 15% opacity
- Font: Space Grotesk (`--font-meta`), all caps, tracking-widest
- Pills: `rounded-full`, padding `px-5 py-2`

---

## Components
- `<Nav />` — wraps desktop + mobile, handles scroll state
- `<DesktopNav />` — logo + links pill + lang toggle
- `<MobileNav />` — logo + MENU pill
- `<MobileMenu />` — full overlay menu (opens on MENU click)
- `<LangToggle />` — FR/EN switcher wired to next-intl

---

## TODO
- [ ] Build `<DesktopNav />`
- [ ] Build `<MobileNav />`
- [ ] Build `<MobileMenu />` — confirm overlay style
- [ ] Build `<LangToggle />` wired to next-intl
- [ ] Wire all into `<Nav />`
- [ ] Add to `app/[locale]/layout.tsx`
