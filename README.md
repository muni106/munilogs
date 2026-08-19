<div align="center">

```
                        _ _
  _ __ ___  _   _ _ __ (_) | ___   __ _ ___
 | '_ ` _ \| | | | '_ \| | |/ _ \ / _` / __|
 | | | | | | |_| | | | | | | (_) | (_| \__ \
 |_| |_| |_|\__,_|_| |_|_|_|\___/ \__, |___/
                                   |___/
```

**A personal chronicle of exploration, ideas, and continuous growth.**

[Live site](https://mounirsamite.pages.dev) &#183; [Posts](https://mounirsamite.pages.dev/posts) &#183; [Notes](https://mounirsamite.pages.dev/notes) &#183; [Projects](https://mounirsamite.pages.dev/projects)

</div>

---

My personal website and blog, built with Astro 5, Tailwind 4 and TypeScript, with Pagefind for search. Deployed to Cloudflare Pages by GitHub Actions on every push to `main`.

## Development

```bash
npm install
npm run dev      # dev server on :4321
npm run build    # astro check + build + pagefind index
npm run preview  # serve the production build
npm run lint     # eslint
npm run format   # prettier
```

## Content

```
src/data/
  blog/                  # posts
  notes/                 # shorter notes
  projects.json          # synced from GitHub (generated)
  projects.manual.json   # hand-written project entries
```

Posts and notes are Markdown with the same frontmatter:

```yaml
---
title: Post Title
pubDatetime: 2026-03-31T12:00:00Z
description: A short description.
tags: [systems, architecture]
featured: false
draft: false
---
```

`draft: true` hides it, `featured: true` pins it on the homepage. Optional: `author`, `modDatetime`, `ogImage`, `canonicalURL`, `timezone`.

## Projects

Projects come from two places. Manual entries live in `src/data/projects.manual.json`. Repos are picked up automatically by `scripts/fetch-projects.js` (run in CI by `.github/workflows/sync-projects.yml`), which scans public repos for a `.blog-meta.json` in their root and writes `src/data/projects.json`:

```json
{
  "tagline": "Short one-liner for the project card",
  "status": "active",
  "tags": ["agents", "distributed-systems"],
  "cover": "cover.png",
  "order": 1
}
```

`tagline`, `status` (`active` | `completed` | `experiment`) and `tags` are required; `cover` (auto-detects `cover.png` / `cover.gif`) and `order` (lower first, default 99) are optional. For repos you don't own, add the file to your fork.

Run it locally with `GITHUB_TOKEN=ghp_... node scripts/fetch-projects.js`.

## Structure

```
src/
  pages/            # routes: posts, notes, projects, tags, archives, about, search
  layouts/          # page shells
  components/       # UI
  styles/           # global.css (tokens), typography.css
  utils/            # sorting, filtering, OG images, slugs
  config.ts         # SITE settings
  constants.ts      # social + share links
  content.config.ts # collection schemas
```

Built on top of the [AstroPaper](https://github.com/satnaing/astro-paper) theme by Sat Naing.

<div align="center">
  <sub>Made by <a href="https://github.com/muni106">Mounir Samite</a></sub>
</div>
