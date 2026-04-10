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

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: Code](https://img.shields.io/badge/Code-MIT-green)](#license)
[![License: Content](https://img.shields.io/badge/Content-CC_BY--NC--SA_4.0-lightgrey)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

[Live Site](https://mounirsamite.com) &#183; [Posts](https://mounirsamite.com/posts) &#183; [Projects](https://mounirsamite.com/projects) &#183; [Notes](https://mounirsamite.com/notes)

</div>

---

## What is this

My personal website and blog. A place for writing about systems, infrastructure, philosophy, and whatever else sticks. 

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Content

All content lives under `src/data/`:

```
src/data/
  blog/          # Markdown blog posts
  notes/         # Markdown notes (quick thoughts, snippets)
  projects.json  # Project showcase entries
```

Each blog post and note uses the same frontmatter schema:

```yaml
---
title: Post Title
author: Mounir Samite
pubDatetime: 2026-03-31T12:00:00Z
featured: false
draft: false
tags: [systems, architecture]
description: A short description.
---
```

Set `draft: true` to hide a post. Set `featured: true` to pin it on the homepage.

## Adding a project to the website

Projects are synced automatically from GitHub. To feature a repo on the site, add a `.blog-meta.json` file to its root:

```json
{
  "tagline": "Short one-liner for the blog card",
  "status": "active",
  "tags": ["agents", "distributed-systems"],
  "cover": "cover.png",
  "order": 1
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tagline` | string | yes | One-line description shown on the project card |
| `status` | string | yes | `active`, `completed`, or `experiment` — controls grouping and card color |
| `tags` | string[] | yes | Tech/topic tags shown as inline labels |
| `cover` | string | no | Filename of a cover image (`.png` or `.gif`) in the repo root. If omitted, the sync script auto-detects `cover.png` or `cover.gif`. |
| `order` | number | no | Sort priority within the status group. Lower = first. Defaults to 99. |

The sync script (`scripts/fetch-projects.js`) runs weekly via GitHub Actions and can also be triggered manually. It scans all public repos for this file, merges the metadata with GitHub API data (stars, language, last commit), and writes `src/data/projects.json`.

**For repos you don't own** (forks, org repos): fork the repo to your account and add `.blog-meta.json` to your fork.

Run it locally:

```bash
# Optional: set token to avoid rate limits
export GITHUB_TOKEN=ghp_...

node scripts/fetch-projects.js
```

## Design

Two themes, one palette philosophy:

| Token | Dark | Light |
|-------|------|-------|
| `--background` | `#0d0d0d` | `#f5f5f0` |
| `--foreground` | `#e0e0e0` | `#1a1a1a` |
| `--accent` | `#c8f04a` | `#4a7a2e` |

Headings are bold, tight-tracked sans-serif. Body text is 15px with generous line-height. Tags and labels use uppercase with wide letter-spacing.

## Project structure

```
src/
  pages/           # File-based routing (posts, notes, projects, tags, about, search)
  layouts/         # Layout shells (Layout, Main, PostDetails, NoteDetails, ProjDetails)
  components/      # Reusable UI (Header, Card, NoteCard, Tag, Pagination, etc.)
  styles/          # global.css (tokens, base), typography.css (prose overrides)
  utils/           # Sorting, filtering, path resolution, OG generation, slugify
  config.ts        # Site-wide settings (SITE constant)
  constants.ts     # Social links, share links
  content.config.ts # Collection schemas (blog, projects, notes)
```

## License

**Code** (source, templates, config) — [MIT](./LICENSE)

**Content** (blog posts, notes, images, written material) — [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

Built on top of the [AstroPaper](https://github.com/satnaing/astro-paper) theme by Sat Naing.

---

<div align="center">
  <sub>Made by <a href="https://github.com/muni106">Mounir Samite</a></sub>
</div>
