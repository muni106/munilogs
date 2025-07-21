---
author: Mounir Samite
pubDatetime: 2025-07-21T17:16:08Z
modDatetime: 2025-07-21T17:16:08Z
title: Quick reference for md in my blog
featured: true
draft: false
tags:
  - docs
  - reference
  - firstTime
description: This is a fast reference to fastly write my blog posts
---
# table of contents

# what is that table
automatically creates a table of contents of my post

# h1
## h2
### h3

# code 
## code snippet
```js file="src/filename.extension"
let i = 9;
```
## code inline
this is an example of `code inline` ffff

# blocks
## quote block
> this is
> a multiline 
> quote!!!

## this is a table

| Color Property | Definition & Usage                                         |
| -------------- | ---------------------------------------------------------- |
| `--background` | Primary color of the website. Usually the main background. |
| `--foreground` | Secondary color of the website. Usually the text color.    |
| `--accent`     | Accent color of the website. Link color, hover color etc.  |
| `--muted`      | Card and scrollbar background color for hover state etc.   |
| `--border`     | Border color. Especially used in horizontal row (hr)       |

## pointed list
- point1
- point2
- point3

## numbered list
1. uno
2. due
3. tre

## codeblock after review
```astro file=src/layouts/PostDetails.astro
<Layout {...layoutProps}>
    <!-- [!code ++:2] -->
  <main>
    <ShareLinks />

    <!-- [!code --:5] -->
    <script
      src="https://giscus.app/client.js"
      data-repo="[ENTER REPO HERE]"
      data-repo-id="[ENTER REPO ID HERE]"
      data-category="[ENTER CATEGORY NAME HERE]"
      data-category-id="[ENTER CATEGORY ID HERE]"></script>
  </main>
  <Footer />
</Layout>
```

# Semantics
## links
Frontmatter lies at the top of the article and is written in YAML format. Read more about frontmatter and its usage in [astro documentation](https://docs.astro.build/en/guides/markdown-content/).


# images
## figures
<figure>
  <img
    src="https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Free Classic wooden desk with writing materials, vintage clock, and a leather bag. Stock Photo"
  />
    <figcaption class="text-center">
    Photo by <a href="https://www.pexels.com/photo/brown-wooden-desk-159618/">Pixabay</a>
  </figcaption>
</figure>

## basic images with markdown
![An arrow pointing at the website logo](https://res.cloudinary.com/noezectz/v1663911318/astro-paper/AstroPaper-logo-config_goff5l.png)
```md
![An arrow pointing at the website logo](https://res.cloudinary.com/noezectz/v1663911318/astro-paper/AstroPaper-logo-config_goff5l.png)
```
