# SEO & Metadata System

This document describes the SEO and metadata implementation across the JKJR Digital Development website.

## Overview

The site uses Next.js App Router's built-in metadata API to generate page-specific `<meta>` tags, Open Graph images, Twitter cards, and JSON-LD structured data for optimal search engine visibility and social media sharing.

## Metadata Architecture

### Core Utilities

- **`src/utils/metadata.ts`** — Metadata generator functions for each page type
- **`src/utils/schema.ts`** — JSON-LD structured data generators (Organization, Person, WebSite, BlogPosting, CreativeWork)

### Metadata Generators

All generators return Next.js `Metadata` objects with:
- Page title (with template pattern)
- Meta description
- Keywords
- Canonical URL
- Open Graph tags (title, description, image, type)
- Twitter card tags
- Robots directives

#### Available Generators

```typescript
// Base metadata (used in root layout)
generateBaseMetadata(): Metadata

// Page-specific generators
generateBlogIndexMetadata(): Metadata
generateBlogPostMetadata(post: BlogPost): Metadata
generateProjectsIndexMetadata(): Metadata
generateProjectMetadata(project: Project): Metadata
generateContactMetadata(): Metadata
```

### Page Implementation

#### Homepage (`src/app/page.tsx`)

Exports custom metadata object with:
- **Title**: "JKJR Digital Development — Full-Stack Web Developer in Northern Virginia"
- **Description**: Highlights full-stack capabilities, technologies, and years of experience
- **Keywords**: Location-specific terms (Northern Virginia, DC Metro), technology stack
- **OG Image**: Default site logo

#### Blog Pages

**Index** (`src/app/blog/page.tsx`):
- Uses `generateBlogIndexMetadata()`
- Description focuses on topics: React, Next.js, cloud architecture, Obsidian, developer workflows

**Post Detail** (`src/app/blog/[slug]/page.tsx`):
- Uses `generateBlogPostMetadata(post)` with dynamic data from markdown frontmatter
- OG image priority: `ogImage` → `featuredImage` → `image` → default
- Includes BlogPosting JSON-LD schema

**Search** (`src/app/blog/search/page.tsx`):
- Custom metadata emphasizing search functionality

#### Project Pages

**Index** (`src/app/projects/page.tsx`):
- Uses `generateProjectsIndexMetadata()`
- Description highlights variety: SaaS products, Webflow builds, Next.js migrations, WordPress sites

**Project Detail** (`src/app/projects/[slug]/page.tsx`):
- Uses `generateProjectMetadata(project)` with dynamic data from markdown frontmatter
- OG image priority: `featuredImage` → `contentImage` → `thumbnailImage` → default
- Includes CreativeWork JSON-LD schema

#### Contact Page (`src/app/contact/page.tsx`)

- Uses `generateContactMetadata()`
- Emphasizes services: web development, technical consulting, SEO
- Layout removed to avoid metadata conflicts

#### Other Pages

- **Site Map** (`src/app/site-map/page.tsx`): Custom metadata for navigation overview
- **Root Layout** (`src/app/layout.tsx`): Base metadata + Organization/Person/WebSite schemas

## Frontmatter Fields

### Blog Posts

Required fields in `content/blog/*.md`:

```yaml
---
title: string              # Post title (used in <title>)
slug: string               # URL slug
excerpt: string            # Short summary
description: string        # SEO meta description (150-160 chars)
keywords: string[]         # SEO keywords
author: string             # Author name
tags: string[]             # Categories/topics
datePublished: string      # ISO date (YYYY-MM-DD)
dateModified: string       # ISO date (YYYY-MM-DD)
featuredImage: string      # Path to main image
ogImage: string            # Path to Open Graph image (same as featuredImage if not specified)
ogTitle: string            # Custom OG title (optional)
ogDescription: string      # Custom OG description (optional)
twitterCard: string        # 'summary_large_image' or 'summary'
status: 'published'        # Must be 'published' to appear on site
readingTime: number        # Estimated reading time in minutes
---
```

### Projects

Required fields in `content/projects/*.md`:

```yaml
---
title: string              # Project name
slug: string               # URL slug
excerpt: string            # Brief description
description: string        # SEO meta description (150-160 chars)
keywords: string[]         # SEO keywords (technologies, industry, services)
author: string             # Creator name
tags: string[]             # Project categories
techStack: string[]        # Technologies used
featuredImage: string      # Main project image (also used as ogImage)
ogImage: string            # Open Graph image (usually same as featuredImage)
liveUrl: string            # Live demo URL (optional)
githubUrl: string          # GitHub repo URL (optional)
projectType: string        # 'Product' or 'Client Work'
status: 'published'        # Must be 'published' to appear on site
sortOrder: number          # Display order on projects index
---
```

## OG Image Fallback Chain

### Blog Posts
1. `post.ogImage` (explicit frontmatter field)
2. `post.featuredImage`
3. `post.image` (legacy field)
4. `DEFAULT_OG_IMAGE` (`/images/og-default.jpg`)

### Projects
1. `project.ogImage` (explicit frontmatter field)
2. `project.featuredImage`
3. `project.contentImage`
4. `project.thumbnailImage`
5. `DEFAULT_OG_IMAGE` (`/images/og-default.jpg`)

## JSON-LD Structured Data

### Site-wide Schemas (in root layout)

- **Organization**: Stable `@id` at `{BASE_URL}/#org`
  - Name, logo, description
  - Links to social profiles (GitHub, LinkedIn)
  - Founder reference to Person schema

- **Person**: Stable `@id` at `{BASE_URL}/#person`
  - Jeff Knowles Jr profile
  - Job title, social profiles
  - Connection to Organization

- **WebSite**: Stable `@id` at `{BASE_URL}/#website`
  - Site description
  - SearchAction for blog search
  - Publisher reference to Organization

### Page-specific Schemas

**Blog Posts** (`BlogPosting`):
- Headline, description, author, publisher
- Publication and modification dates
- Image, URL, keywords
- Part of WebSite entity

**Projects** (`CreativeWork`):
- Name, description, creator, producer
- Publication date, keywords
- Image, URL (live demo if available)
- Part of WebSite entity

**Breadcrumbs** (`BreadcrumbList`):
- Generated for all content pages
- Hierarchical navigation trail
- Improves search result display

## Best Practices

### Writing SEO Metadata

1. **Titles** (50-60 characters):
   - Front-load important keywords
   - Be specific and descriptive
   - Include brand name at the end

2. **Descriptions** (150-160 characters):
   - Summarize page content compellingly
   - Include primary keywords naturally
   - Write for humans, not just search engines
   - Include a call-to-action when appropriate

3. **Keywords**:
   - 5-10 relevant terms per page
   - Include technology names
   - Add location-specific terms for local SEO
   - Don't keyword stuff

4. **OG Images**:
   - Minimum 1200x630px (recommended for social sharing)
   - Always set explicit `ogImage` in frontmatter
   - Use descriptive alt text
   - Ensure images exist in `public/images/`

### Adding New Content

When creating new blog posts or projects:

1. Use scaffolding scripts: `npm run new:blog` or `npm run new:project`
2. Fill in all SEO frontmatter fields
3. Set explicit `ogImage` (same as `featuredImage` for consistency)
4. Write unique, compelling `description` (not just copy of `excerpt`)
5. Choose specific `keywords` relevant to the content
6. Verify metadata in browser dev tools before publishing

## Validation

### Testing Metadata

- **Local development**: Inspect `<head>` in browser dev tools
- **Open Graph**: Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter Cards**: Use [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Structured Data**: Use [Google Rich Results Test](https://search.google.com/test/rich-results)

### Common Issues

- **Missing OG images**: Ensure image paths start with `/` and exist in `public/`
- **Truncated descriptions**: Keep under 160 characters
- **Duplicate metadata**: Check for conflicts between page and layout metadata
- **Invalid JSON-LD**: Validate schema output with Google's tool

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` — Canonical base URL (defaults to `https://www.jkjrdev.com`)
  - Used for absolute URLs in metadata and schemas
  - Should match production domain

## Files Reference

### Metadata System
- `src/utils/metadata.ts` — Generator functions
- `src/utils/schema.ts` — JSON-LD schemas
- `src/utils/content-loader.ts` — Content type definitions

### Pages Using Metadata
- `src/app/page.tsx` — Homepage
- `src/app/layout.tsx` — Root layout with site-wide schemas
- `src/app/blog/page.tsx` — Blog index
- `src/app/blog/[slug]/page.tsx` — Blog posts
- `src/app/blog/search/page.tsx` — Blog search
- `src/app/projects/page.tsx` — Projects index
- `src/app/projects/[slug]/page.tsx` — Project details
- `src/app/contact/page.tsx` — Contact page
- `src/app/site-map/page.tsx` — Site map

## Recent Updates

**February 2026** — SEO metadata enhancement:
- Added homepage-specific metadata (location-based keywords)
- Removed contact layout metadata conflict
- Enhanced descriptions for blog/projects index pages
- Added `description`, `keywords`, and `ogImage` to all project frontmatter
- Set explicit `ogImage` in blog post frontmatter
- Updated blog search and site-map metadata

All pages now have content-specific, SEO-optimized metadata with proper OG image fallback chains.
