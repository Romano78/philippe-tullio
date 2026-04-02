# Design System Document: Cinematic Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Auteur."** This system is not a container for content; it is a cinematic frame. It moves away from the "app-like" density of traditional SaaS platforms toward a high-end editorial experience that prioritizes mood, tension, and the raw power of moving images.

To break the "template" look, we employ **Intentional Asymmetry**. Layouts should avoid perfect 50/50 splits. Use the Spacing Scale (specifically values `16` and `20`) to create vast, breathing voids that force the user’s eye toward the visual content. Typography is treated as a structural element—massive, condensed headings that feel like film titles, contrasted against technical, mono-spaced metadata.

## 2. Colors
The palette is built on a "Total Black" philosophy, where depth is communicated through light and texture rather than color.

*   **Primary (#FFFFFF) & Primary Container (#B8FF00):** Pure white is reserved for high-impact typography. The sharp lime (#B8FF00) is our "Technical Accent"—used sparingly for interaction states or critical callouts to inject a sense of modern, high-tech production.
*   **Neutral Depth:** We utilize the `surface-container` tiers to create a sense of three-dimensional space without using lines.
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Layout boundaries must be defined solely through background shifts. For example, a `surface-container-low` (#1B1B1B) section sits directly against the `background` (#131313). 
*   **The "Glass & Gradient" Rule:** To provide "visual soul," floating elements (like play buttons or navigation overlays) should use `surface-bright` with a 60% opacity and a 20px backdrop-blur. 
*   **Signature Textures:** For primary CTAs, use a subtle linear gradient from `primary_fixed` (#B2F700) to `primary_fixed_dim` (#9CD900) at a 135-degree angle.

## 3. Typography
The typographic system creates a tension between "The Epic" (Aeonik Condensed) and "The Technical" (Aeonik Fono/Space Grotesk).

*   **Display & Headline (Space Grotesk / Aeonik Condensed):** These are your cinematic titles. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) and all-caps for project titles. This conveys authority and scale.
*   **Body (Inter):** High-readability sans-serif for narrative descriptions. Use `body-lg` (1rem) with a generous line-height (1.6) to ensure the text feels premium and unhurried.
*   **Label & Mono (Aeonik Fono / Space Grotesk):** These are for metadata (e.g., "DIRECTOR," "2024," "4K"). They should be significantly smaller (`label-sm`) to act as a texture that complements the larger imagery.

## 4. Elevation & Depth
In a cinematic system, depth is "Atmospheric" rather than "Structural."

*   **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. A project card (`surface-container-lowest`) should sit on top of a `surface-container-low` section to create a soft, natural lift.
*   **Ambient Shadows:** If a floating element requires a shadow, it must be nearly invisible. Use the `on-surface` color at 4% opacity with a 40px blur and 0px offset. This mimics the soft falloff of professional studio lighting.
*   **The "Ghost Border" Fallback:** If a container (like an input field) needs a boundary, use the `outline-variant` token at 15% opacity. High-contrast, 100% opaque borders are forbidden.
*   **Glassmorphism:** Navigation bars and "Menu" triggers must use `surface-container-highest` with a 70% opacity and a heavy backdrop blur (32px) to allow imagery to bleed through the UI, maintaining immersion.

## 5. Components

### Buttons
*   **Primary:** High-impact. Background: `primary_container` (#B2F700), Text: `on_primary_container`. Shape: `xl` (0.75rem) or `full`.
*   **Secondary (Cinematic):** Background: Transparent, Border: "Ghost Border" (outline-variant @ 20%). Text: `primary` (#FFFFFF).
*   **Tertiary:** Text-only with `label-md` styling. All-caps with 0.1em letter spacing.

### Cards & Visual Grids
*   **Constraint:** Forbid the use of divider lines between items.
*   **Separation:** Use the `20` (7rem) spacing token between vertical content blocks.
*   **Interaction:** On hover, a card's image should scale 2% (subtle zoom) while the background shifts from `surface-container-low` to `surface-container-high`.

### Inputs & Interaction
*   **Input Fields:** Minimalist. No background fill. Only a bottom "Ghost Border" using `outline-variant`.
*   **Chips (Control Toggles):** Inspired by the reference image. Use a `full` roundedness. The active state uses `surface-container-highest` with `primary` text. The inactive state is transparent with `secondary` text.

### Navigation (The "Menu" Trigger)
*   The "Menu" button should be a pill-shaped container using `surface-container-highest`. Use the `secondary` token for the icon and `title-sm` for the text.

## 6. Do's and Don'ts

### Do:
*   **Do** prioritize imagery. If a visual is high-quality, let it take up 80-100% of the viewport width.
*   **Do** use extreme typographic scale. A 40px gap between a massive heading and small body text creates editorial tension.
*   **Do** use `surface-container-lowest` (#0E0E0E) for the "Hero" background to make the white text and imagery pop with maximum contrast.

### Don't:
*   **Don't** use standard shadows. If it looks like a typical "web shadow," it's too heavy.
*   **Don't** use 1px solid borders to separate sections. Use white space (`spacing-24`) or background color shifts instead.
*   **Don't** clutter the screen. If a piece of metadata isn't essential to the "vibe," hide it or move it to a smaller `label-sm` tier.
*   **Don't** use pure black (#000000) for every surface. Use the `surface` and `surface-container` tokens to ensure the "blacks" have enough nuance to show depth and layering.