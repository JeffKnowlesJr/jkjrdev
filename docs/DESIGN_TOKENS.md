# Design Tokens

Colors, typography, and spacing used across the site. Defined in [tailwind.config.js](../tailwind.config.js) and [src/app/globals.css](../src/app/globals.css).

## Colors

| Token    | Hex       | Usage                   |
|----------|-----------|-------------------------|
| midnight | `#0a0e1a` | Darkest background      |
| deep     | `#111827` | Alternating sections    |
| slate    | `#1e293b` | Cards, inputs           |
| steel    | `#334155` | Borders, muted elements |
| mist     | `#94a3b8` | Secondary text          |
| cloud    | `#e2e8f0` | Primary text, headings  |
| electric | `#06b6d4` | Primary accent (links, buttons, tags) |
| volt     | `#22d3ee` | Hover accent, code      |
| mint     | `#10b981` | Success, positive tags  |
| coral    | `#f43f5e` | Warning, emphasis       |
| amber    | `#f59e0b` | Highlight               |

Tailwind classes: `bg-midnight`, `text-electric`, `border-volt`, etc.

### Gradients

| CSS variable       | Value                                          | Usage               |
|---------------------|-------------------------------------------------|---------------------|
| `--gradient-primary` | `linear-gradient(135deg, electric, volt)`       | Primary buttons     |
| `--gradient-accent`  | `linear-gradient(135deg, electric, mint)`       | Accent elements     |
| `--gradient-text`    | `linear-gradient(90deg, electric, mint)`        | `.gradient-text`    |

## Typography

| Role    | Font            | Tailwind class   |
|---------|-----------------|------------------|
| Display | Outfit          | `font-display`   |
| Body    | DM Sans         | `font-body`      |
| Mono    | JetBrains Mono  | `font-mono`      |

Loaded via `next/font/google` in the root layout.

## Spacing (CSS custom properties)

`--space-xs` (0.25rem) through `--space-4xl` (6rem). Used in component classes like `.section` (padding: `--space-4xl`) and `.btn` (padding: `--space-md --space-xl`).

## Border Radii

`--radius-sm` (0.375rem) through `--radius-full` (9999px). Cards use `--radius-2xl` (1.5rem); buttons use `--radius-lg` (0.75rem); tags use `--radius-full`.

## Shadows

| Token        | Value                                     | Usage            |
|--------------|-------------------------------------------|------------------|
| `--shadow-glow` | `0 0 30px rgba(6, 182, 212, 0.3)`      | Hover glow on buttons |

## Animations (Tailwind)

| Class           | Duration | Effect                           |
|-----------------|----------|----------------------------------|
| `animate-float` | 6s       | Vertical float for hero elements |
| `animate-glow`  | 2s       | Pulsing box-shadow glow          |
| `animate-fade-in` | 0.6s  | Fade in with upward translate    |
| `animate-slide-up` | 0.5s | Slide up with opacity            |

Delay utilities: `delay-100` through `delay-500`.
