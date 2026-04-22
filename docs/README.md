# JKJR Portfolio & Blog - Documentation

This project is a **static Next.js site** deployed to **Cloudflare Pages**. Content (blog posts, projects) is stored as markdown in the `content/` directory and baked in at build time.

## Current Architecture

- **Framework**: Next.js 15 (App Router) with static export (`output: 'export'`)
- **Hosting**: Cloudflare Pages (static; no server, no API routes at runtime)
- **Content**: Projects and blog from markdown in `content/projects/` and `content/blog/` via **[@/utils/content-loader](../src/utils/content-loader.ts)**
- **Contact form**: Submits to an external endpoint (e.g. Formspree or Cloudflare Workers), configured by `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`

### Data flow (for architects)

How projects and blog content are loaded and which modules to use:

- **[DATA_FLOW.md](DATA_FLOW.md)** – Canonical data flow: project loader, content-loader, and where each page gets its data

## Documentation Structure

### Deployment and setup

- **Root [README.md](../README.md)** – Project overview, local setup, and **Deploying to Cloudflare Pages**
- **Build**: `npm run build` → output in `out/`
- **Deploy**: `npx wrangler pages deploy out --project-name=YOUR_PROJECT` (after `wrangler login`)

## Quick Navigation

- **Getting started**: [Main README](../README.md)
- **Data flow**: [DATA_FLOW.md](DATA_FLOW.md)
- **Architecture & components**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **SEO & Metadata**: [SEO_METADATA.md](SEO_METADATA.md)
- **Cloudflare deploy**: See "Deployment to Cloudflare Pages" in the main README

## Contributing to Documentation

- Keep the main README and this docs README in sync with the current (Cloudflare static) setup.
- When changing deployment or content flow, update the relevant README sections.
