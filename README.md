# JKJR Digital Development

Portfolio and blog for **Jeff Knowles Jr** — full-stack web developer based in Northern Virginia. Built with Next.js 15, TypeScript, and Tailwind CSS. Statically exported and hosted on Cloudflare Pages.

**Live:** [www.jkjrdev.com](https://www.jkjrdev.com)

## Stack

- **Framework:** Next.js 15 (App Router) with `output: 'export'`
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3 — dark-only theme (Outfit / DM Sans / JetBrains Mono)
- **Content:** Markdown in `content/blog/` and `content/projects/`, loaded at build via `src/utils/content-loader.ts`
- **Hosting:** Cloudflare Pages (static; no server at runtime)
- **CI/CD:** Manual deploy via `npx wrangler pages deploy out`

## Project Structure

```
.
├── content/
│   ├── blog/              # Blog posts (markdown)
│   └── projects/          # Project case studies (markdown)
├── docs/                  # Architecture, data flow, design docs
├── public/                # Static assets (images, logo)
├── scripts/               # Utility scripts (new-blog-post, new-project)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── blog/          # Blog index, [slug], search
│   │   ├── projects/      # Projects index, [slug]
│   │   ├── contact/       # Contact page
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── backgrounds/   # Modular background components
│   │   ├── blog/          # Blog-specific components
│   │   ├── projects/      # Project-specific components
│   │   ├── Header.tsx     # Fixed nav with logo
│   │   └── Footer.tsx     # Footer with logo
│   └── utils/             # Content loader, metadata, schema
└── tailwind.config.js     # Design tokens
```

## Development

```bash
npm install
npm run dev          # Start dev server (Turbopack)
npm run build        # Static export to out/
npm run new:blog     # Scaffold a new blog post
npm run new:project  # Scaffold a new project
```

## Deployment (Cloudflare Pages)

Deploy manually with Wrangler:

```bash
npm run build
npx wrangler login
npx wrangler pages deploy out --project-name=jeff-content
```

**Environment variables (set in Cloudflare Pages dashboard or `.env.local` for local dev):**

- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` — form endpoint (e.g. a Cloudflare Worker or Formspree URL)
- `NEXT_PUBLIC_SITE_URL` — canonical URL (defaults to `https://www.jkjrdev.com`)

### Custom domain (www.jkjrdev.com)

Custom domain `www.jkjrdev.com` is configured in the Cloudflare dashboard under Workers & Pages → Custom domains.

Apex **jkjrdev.com** redirects to **www.jkjrdev.com**.

## Documentation

- [docs/README.md](docs/README.md) — Architecture overview
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Routes, components, data sources
- [docs/DATA_FLOW.md](docs/DATA_FLOW.md) — Content loading data flow
- [docs/SEO_METADATA.md](docs/SEO_METADATA.md) — SEO metadata system and best practices
- [docs/UI_DESIGN.md](docs/UI_DESIGN.md) — Visual system, backgrounds, section design
- [docs/PROJECT_IMAGES.md](docs/PROJECT_IMAGES.md) — Adding images to projects
- [docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md) — Color and typography tokens
