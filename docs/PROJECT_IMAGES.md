# Adding Images to Projects

This doc describes where to put project images and which frontmatter fields to use. The content loader passes all frontmatter through, so no loader changes are needed when you add or change image fields.

## Where images go

- **Directory:** `public/images/projects/{slug}/`
- **Example:** For project slug `nrvpc`, use `public/images/projects/nrvpc/`.

Place cover images, thumbnails, and gallery assets in that folder. Reference them in frontmatter by public URL path (e.g. `/images/projects/nrvpc/cover.jpg`).

## Frontmatter fields

| Field | Purpose |
|-------|--------|
| `featuredImage` | Single hero/cover image shown on project cards and the detail page header. Recommended path: `/images/projects/{slug}/cover.jpg` |
| `thumbnailImage` | Optional smaller version for cards when you want a different crop than the featured image. |
| `contentImage` | Optional additional image for use in the project body or layout. |

## Image gallery

For multiple images (screenshots, mockups, etc.), add a `gallery` array in frontmatter. Each item can have `src` and `alt`:

```yaml
gallery:
  - src: '/images/projects/nrvpc/screenshot-1.jpg'
    alt: 'NRVPC homepage'
  - src: '/images/projects/nrvpc/screenshot-2.jpg'
    alt: 'Services page'
```

The existing content loader passes all frontmatter through, so `gallery` is available in components. The project detail page can be updated later to render this array (e.g. in a lightbox or grid).

## Recommended sizes and formats

- **Cover / featured:** 1200×630 (OG-friendly). Use for `featuredImage` and optionally social previews.
- **Gallery images:** Max width ~1600px is usually enough for in-page display.
- **Formats:** JPG or WebP preferred for photos; PNG when you need transparency.
