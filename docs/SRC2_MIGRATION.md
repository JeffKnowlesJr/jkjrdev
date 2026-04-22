# src2 Migration

## What was src2?

**src2** was a standalone static HTML site for **Jeffs Link LLC** — a multi-page marketing site (homepage, services, work, about, contact) built with:

- Plain HTML pages (Tailwind CDN)
- Custom CSS in `assets/css/styles.css` and Tailwind in `src/input.css`
- Vanilla JavaScript for nav and animations
- Design tokens: midnight/electric/volt palette, Outfit + DM Sans + JetBrains Mono

## What was extracted

- **Design tokens:** Color palette (midnight, deep, slate, electric, volt, mint, coral, etc.) added to the main app’s [tailwind.config.js](../tailwind.config.js) so they can be used in the Next.js app. See [DESIGN_TOKENS.md](DESIGN_TOKENS.md).
- **Documentation:** This migration note and the design tokens doc. No HTML or JS from src2 was migrated into the Next app.

## Where src2 lives now

The full static site (HTML, CSS, JS, assets) was used as a local reference for the Jeffs Link brand palette and layout during migration. The main site (Next.js) remains the primary app; project and blog data come from `content/` as described in [DATA_FLOW.md](DATA_FLOW.md).
