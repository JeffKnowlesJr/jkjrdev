# Architecture

High-level structure of the Next.js app: routes, components, and where they get data.

## Stack

- **Framework:** Next.js 15 (App Router), static export (`output: 'export'`)
- **Hosting:** Cloudflare Pages
- **Content:** Markdown in `content/projects/` and `content/blog/` loaded via `@/utils/content-loader`. See [DATA_FLOW.md](DATA_FLOW.md).

## Routes and layouts

| Route | Layout / wrapper | Data source |
|-------|------------------|-------------|
| `/` | Root layout (Header, Footer) | Blog + projects via content-loader |
| `/blog` | Blog layout (Sidebar) | `getContentList<BlogPost>('blog')` |
| `/blog/[slug]` | BlogLayout | `getContentBySlug<BlogPost>('blog', slug)` |
| `/blog/search` | BlogLayout + BlogSearchClient | content-loader |
| `/projects` | ProjectsLayout (ProjectSidebar) | `getContentList<Project>('projects')` |
| `/projects/[slug]` | (inline) | `getContentBySlug<Project>('projects', slug)` |
| `/contact` | Root layout | ContactForm → form endpoint |
| `/admin`, `/admin/login` | AdminLayout | — |

## Components

### Layouts and structure

- **Root layout** ([src/app/layout.tsx](../src/app/layout.tsx)): Header, Footer. Dark-only theme; no theme provider.
- **Blog layout** ([src/app/blog/layout.tsx](../src/app/blog/layout.tsx)): Sidebar with recent posts from content-loader.
- **BlogLayout** ([src/components/blog/BlogLayout.tsx](../src/components/blog/BlogLayout.tsx)): Wraps blog index, [slug], and search.
- **ProjectsLayout** ([src/components/projects/ProjectsLayout.tsx](../src/components/projects/ProjectsLayout.tsx)): Two-column layout with **ProjectSidebar** in the aside.

### Backgrounds

Modular background components in `src/components/backgrounds/`. Each can be dropped into any `<section>` as a layer behind content (which uses `relative z-10`).

- **NodeMeshBackground** — Interactive canvas animation: floating nodes with connecting lines, mouse-reactive. Used on the homepage hero.
- **GradientOrbsBackground** — Configurable blurred orbs for ambient color. Used on hero and blog sections.
- **GridPatternBackground** — Subtle SVG cross-hatch grid. Used on services and CTA sections.
- **RadialGlowBackground** — Centered radial glow. Used on the CTA section.

See [UI_DESIGN.md](UI_DESIGN.md) for the rationale behind each section's background choice.

### Page-specific components

- **Blog:** BlogCard, BlogPost, BlogSidebar, BlogSearchClient, BlogSearchResults, BlogPagination, BlogHeader.
- **Projects:** ProjectCard, ProjectList, ProjectSidebar, ProjectsFilterableGrid, ExternalLink, SocialShare.

### Shared / common

- **Header, Footer:** Fixed top nav with logo; footer with logo and links.
- **ContactForm:** Submits to `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`.
- **common/:** SimpleCard, SectionHeader, ErrorBoundary, Card, CopyButton.
- **ui/:** SimpleButton, SimpleBadge.

### Data flow

- **Projects:** `getContentList<Project>('projects')` and `getContentBySlug<Project>('projects', slug)`. Used by homepage (featured), projects index (with client-side filtering via `ProjectsFilterableGrid`), project detail, ProjectSidebar, and sitemap.
- **Blog:** `getContentList` / `getContentBySlug` for `'blog'`. Used by blog layout, blog index, blog [slug], blog search, and sitemap.

## File map (key files)

| Purpose | Path |
|--------|------|
| Blog + project content loading | [src/utils/content-loader.ts](../src/utils/content-loader.ts) |
| Modular backgrounds | [src/components/backgrounds/](../src/components/backgrounds/) |
| Data flow doc | [docs/DATA_FLOW.md](DATA_FLOW.md) |
| Design tokens | [docs/DESIGN_TOKENS.md](DESIGN_TOKENS.md) |
| UI design system | [docs/UI_DESIGN.md](UI_DESIGN.md) |
