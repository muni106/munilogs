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

My personal website and blog. A place for writing about systems, infrastructure, philosophy, and whatever else sticks. Built with Astro, styled dark-first with a lime-on-black editorial palette, and topped with a JARVIS-inspired about page because why not.

## Stack

| Layer | Tech |
|-------|------|
| Framework | [Astro 5](https://astro.build) with static output |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4, CSS custom properties |
| Typography | Inter Variable (body), JetBrains Mono Variable (code) |
| Search | [Pagefind](https://pagefind.app) — static search index at build time |
| Content | Markdown via Astro Content Collections |

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
