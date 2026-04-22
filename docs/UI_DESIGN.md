# UI Design System

Visual design reference for the JKJR Digital Development site. Covers the overall philosophy, color theory, section backgrounds, component patterns, and how to extend the system.

## Design Philosophy

The site uses a **dark-only** theme built around a midnight-to-deep-blue palette with cyan/teal accents. The visual language conveys technical depth without overwhelming the content. Key principles:

- **60-30-10 color rule.** The palette is applied so that roughly 60% of the page is the dominant canvas (midnight), 30% is secondary structure (deep, slate for cards and distinct sections), and 10% is accent (electric, mint, volt, amber) reserved for CTAs, tags, and focal points. Varying the accent per section (e.g. mint for projects, volt for blog links) creates rhythm and prevents a single accent from dominating.
- **Section contrast.** Sections use visibly different backgrounds (e.g. `bg-slate/40` for services, `bg-midnight` for projects, `bg-deep` for blog, gradient for CTA) so the page reads as a flowing narrative rather than one flat block.
- **Gradient section transitions.** Classes `.section-fade-from-midnight`, `.section-fade-from-deep`, and `.section-fade-from-slate` add a soft gradient bleed at the top of a section so it fades in from the section above instead of a hard cut.
- **Layered backgrounds.** Each section can have zero or more background layers (grid patterns, gradient orbs, canvas animations) stacked behind content. Content uses `relative z-10` to sit above backgrounds.
- **Glass morphism.** Cards use translucent backgrounds with `backdrop-filter: blur(8px)` and subtle borders. Service cards use hover variants (`.card-hover-electric`, `.card-hover-mint`, `.card-hover-amber`) for a colored top-edge glow on hover.
- **Motion with purpose.** Scroll-reveal animations use the `FadeIn` component (framer-motion `whileInView`). Hero and canvas animations are subtle and pause when the tab is not visible.

## Section Background System

Backgrounds are modular React components in `src/components/backgrounds/`. They are designed to be swapped or combined without touching section content.

### Available backgrounds

| Component | Type | Props | Default use |
|-----------|------|-------|-------------|
| `NodeMeshBackground` | Canvas (client) | `nodeCount`, `speed`, `lineColor`, `nodeColor`, `connectionDistance`, `mouseInteraction` | Homepage hero |
| `GradientOrbsBackground` | CSS | `orbs[]` (color, size, position, blur) | Hero, blog section |
| `GridPatternBackground` | CSS | `opacity` | Services, CTA |
| `RadialGlowBackground` | CSS | `color`, `size`, `position` | CTA section |

### Usage pattern

```tsx
<section className="section bg-deep relative overflow-hidden">
  {/* Background layer(s) - no z-index needed */}
  <GridPatternBackground opacity="opacity-50" />
  <RadialGlowBackground />

  {/* Content - always z-10 */}
  <div className="container-custom relative z-10">
    {/* ... */}
  </div>
</section>
```

### Swapping backgrounds

To replace the hero animation with a static background, swap `<NodeMeshBackground ... />` for `<GridPatternBackground />` (or any other background component in `src/components/backgrounds/`).

## Homepage Section Map (Color Theory)

Each section has an intentional background and **accent signature** so the page follows the 60-30-10 rule and reads as a guided journey:

| Section | Background | Accent signature | Transition | Rationale |
|---------|-----------|------------------|------------|-----------|
| **Hero** | Transparent over midnight + mesh | electric/volt gradient text, social-proof badge | — | Brand statement; electric is the primary accent. |
| **Services** | `bg-slate/40`, border-y steel | electric icons; **amber** underline on "Full-Stack Solutions"; card hover: electric, mint, amber | `section-fade-from-slate` | 30% tier: visibly distinct surface. Warm amber breaks cool monotony; each card has a different hover glow. |
| **Featured Projects** | `bg-midnight` | **mint** tags, mint hover on titles and "See All" button | `section-fade-from-midnight` | Back to darkest canvas; mint signals "work/output" and differentiates from services. |
| **Latest Blog** | `bg-deep` | electric tag; **volt** for "Read More" link and title hover | `section-fade-from-deep` | Slightly brighter cyan (volt) keeps blog connected but distinct. |
| **CTA** | `bg-gradient-to-b from-midnight via-deep to-slate/40` | gradient-text heading, full gradient primary button | `section-fade-from-midnight` | Visual crescendo: richest background on the page; radial glow + grid draw the eye to the single primary CTA. |

## Component Patterns

### Cards (`.card`)

Glass-style containers. Background: `rgba(30, 41, 59, 0.3)`, blur: `8px`, border: `rgba(51, 65, 85, 0.3)`, radius: `1.5rem`. Optional hover variants for a colored top-edge glow: `.card-hover-electric`, `.card-hover-mint`, `.card-hover-amber` (used on the three service cards).

### Buttons

| Class | Style | Hover |
|-------|-------|-------|
| `.btn-primary` | Gradient fill (electric → volt), midnight text | Glow shadow, scale 1.05 |
| `.btn-secondary` | Transparent, electric border and text | Electric bg tint, solid border |

Sizes: `.btn-sm`, default, `.btn-lg`.

### Tags (`.tag`)

Monospace text in pill-shaped containers. Variants: `.tag-electric`, `.tag-mint`, `.tag-coral`, `.tag-amber`. Each has a 10% opacity background of its accent color.

### Inputs (`.input`)

Translucent slate background, steel border, full-width. Focus: electric border with a subtle glow ring.

## Layout Notes

### Blog layout padding

The blog route layout (`src/app/blog/layout.tsx`) applies `py-8` to the outer two-column wrapper (main content + sidebar). The inner `BlogLayout` component (`src/components/blog/BlogLayout.tsx`) intentionally has **no** `py-8` so padding is not doubled. If you add `py-*` back to `BlogLayout`, the main content column will start lower than the sidebar.

## Page Backgrounds

- **Homepage:** Section-by-section backgrounds (see table above).
- **Blog index / search:** `bg-midnight` base, no additional backgrounds. Content-heavy pages stay clean.
- **Blog article:** `bg-midnight`, prose content has its own rhythm.
- **Projects index:** `bg-midnight`. `ProjectsFilterableGrid` handles visual interest.
- **Project detail:** `bg-midnight`. Hero image fills the top; rest is prose.
- **Contact:** `bg-midnight` with the contact form card as the focal point.

## Extending the System

### Adding a new background

1. Create a component in `src/components/backgrounds/`.
2. Export it from `src/components/backgrounds/index.ts`.
3. Drop it into any `<section>` before the `container-custom` div.

### Scroll reveal (`FadeIn`)

The `FadeIn` component (`src/components/FadeIn.tsx`) uses framer-motion's `whileInView` to fade and slide content up when it enters the viewport. Use it to wrap section content or lists; pass `delay={i * 0.1}` for staggered children.

### Adding a new section to the homepage

Pick a background that creates **perceptible contrast** with the section above (see Section Map). Add the appropriate `section-fade-from-*` class so the new section doesn’t start with a hard cut. Vary the section’s accent (electric, mint, volt, amber) so the 10% accent isn’t all one color:

- **Image-heavy content:** No background or a single subdued orb.
- **Text/card content:** Grid pattern or subtle orbs.
- **CTA / focal point:** Radial glow to draw the eye.

### Color usage guidelines

- **Electric/volt:** Links, primary buttons, interactive highlights. The main accent.
- **Mint:** Success states, positive tags, secondary visual interest.
- **Coral:** Warnings, emphasis. Use sparingly.
- **Amber:** Highlights, browser-chrome dots. Use sparingly.
- **Cloud:** Primary text and headings.
- **Mist:** Secondary/supporting text.
- **Steel:** Borders, muted labels, dividers.

---

## Responsive Spacing Design System

All content pages follow a consistent responsive spacing scale. These values are the source of truth — do not introduce one-off padding values on mobile without a reason.

### Container horizontal padding

All page-level containers use the same three-step scale:

```
px-4 sm:px-6 lg:px-8
```

That is 16px / 24px / 32px at mobile / tablet / desktop — matching the site header exactly (`px-4 sm:px-6 lg:px-8` in `Header.tsx` line 74).

**CSS base:** `.container-custom` in `globals.css` defines `padding: 0 1rem` (16px) as the base. Every page-level container **also** adds the explicit `px-4 sm:px-6 lg:px-8` Tailwind override so Tailwind's responsive utilities win at wider breakpoints. This double-declaration ensures the override system works predictably regardless of CSS specificity order.

### Section vertical padding

```
py-4 md:py-8
```

16px top and bottom on mobile, 32px on desktop. Applied to the outermost section wrapper in blog and project layouts.

### Sidebar gap (when stacked on mobile)

```
gap-6 md:gap-8
```

24px / 32px. Prevents the sidebar from feeling detached on mobile when it stacks below the main content column.

### Card padding rule

The **universal card inner padding standard** is `p-6 sm:p-8` — 24px on mobile, 32px at sm+ (640px). This matches the reference card (Latest Blog Post on the homepage: `p-6 sm:p-8`).

- **Image cards** (blog cards, project cards, homepage featured projects): use `card p-0 overflow-hidden` on the outer element, then `p-6 sm:p-8` on the inner content div.
- **Non-image cards** (sidebars, service cards): use `card p-6 sm:p-8` directly on the card element.

The `.card` CSS base bakes in `padding: 2rem` (32px). `p-6` overrides to 24px on mobile; `sm:p-8` restores 32px at sm+.

```tsx
// Correct — image card
<article className="card p-0 overflow-hidden">
  <div className="aspect-[16/9] relative overflow-hidden">
    <Image fill ... />
  </div>
  <div className="p-6 sm:p-8 flex-grow flex flex-col">
    ...
  </div>
</article>

// Correct — non-image card (sidebar, service)
<div className="card p-6 sm:p-8">
  ...
</div>

// Wrong — inherits 32px base padding at all sizes
<div className="card">
  ...
</div>

// Wrong — old three-step (deprecated)
<div className="card p-0">
  <div className="p-4 sm:p-6 md:p-8">
    ...
  </div>
</div>
```

### Heading sizes on detail pages

Page-level `h1` elements on blog post and project detail pages scale down on mobile:

```
text-2xl sm:text-3xl md:text-4xl
```

### Back-link bottom margin

```
mb-4 md:mb-8
```

### Header block bottom margin

```
mb-4 md:mb-8
```

### Mobile padding stack (reference)

On a 375px screen, the total horizontal space consumed by layout on a content page is:

| Layer | Value |
|---|---|
| Container `px-4` | 16px per side |
| Card inner `p-6` | 24px per side |
| **Total** | **40px per side, 295px for content** |

Reference card: the Latest Blog Post card on the homepage uses `p-6 sm:p-8` and is the canonical example. Do not introduce additional padding layers between the container and the card inner div.

### Grid image card pattern

When a CSS grid contains cards with `aspect-ratio` image containers and Next.js `Image fill`, the grid cells default to `min-width: auto` and refuse to shrink below the image's intrinsic size. This causes cards to overflow the viewport on mobile.

Always apply these classes together:

```tsx
// Grid wrapper — no change needed
<div className="grid md:grid-cols-2 gap-8 items-stretch">

  // Grid item (e.g. FadeIn wrapper) — must have min-w-0
  <FadeIn className="h-full min-w-0">

    // Card element — must have w-full min-w-0, NOT "block"
    <Link className="card p-0 overflow-hidden w-full min-w-0 h-full flex flex-col">

      // Image container — fixed height on mobile, aspect-ratio at md+
      <div className="relative overflow-hidden h-40 sm:h-48 md:h-auto md:aspect-[16/9]">
        <Image fill ... />
      </div>
    </Link>
  </FadeIn>
</div>
```

The section itself should also use `contain: inline-size` as belt-and-suspenders:

```tsx
<section style={{ overflowX: 'clip', contain: 'inline-size' }}>
```

**Why `min-w-0`?** CSS grid items default to `min-width: auto`, which means they expand to fit their content's intrinsic size. A `fill` image inside an `aspect-ratio` box contributes a fixed intrinsic width at the aspect ratio. Adding `min-w-0` overrides this so the cell can shrink freely to fit the available column width.

**Why fixed height instead of `aspect-ratio` on mobile?** On a single-column mobile layout the card is ~100vw wide. A 16:9 aspect ratio at 400px width creates a 225px tall image, which consumes most of the visible card. A fixed `h-40`/`h-48` cap keeps the image visible but subordinate to the card content.

### Files that implement this system

| File | Role |
|---|---|
| `src/app/blog/layout.tsx` | Blog route layout — container + sidebar |
| `src/components/projects/ProjectsLayout.tsx` | Projects route layout — container + sidebar |
| `src/app/blog/[slug]/page.tsx` | Blog post detail — `card p-0` + inner padding |
| `src/app/projects/[slug]/page.tsx` | Project detail — outer `px-4 sm:px-6 lg:px-8`, `py-4 md:py-8`, `card p-0` + inner padding |
| `src/components/blog/BlogCard.tsx` | Blog card — `card p-0` + `p-6 sm:p-8` |
| `src/components/projects/ProjectCard.tsx` | Project card — `card p-0` + `p-6 sm:p-8` |
| `src/components/Sidebar.tsx` | Blog sidebar cards — `card p-6 sm:p-8` |
| `src/components/projects/ProjectSidebar.tsx` | Project sidebar cards — `card p-6 sm:p-8` |
