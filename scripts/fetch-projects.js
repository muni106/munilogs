#!/usr/bin/env node
/* eslint-disable no-console */

// ── Configuration ────────────────────────────────────────────────
const GITHUB_USER = "muni106";
// ─────────────────────────────────────────────────────────────────

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OUTPUT = resolve(process.cwd(), "src/data/projects.json");
const TOKEN = process.env.GITHUB_TOKEN || "";

const apiHeaders = { Accept: "application/vnd.github.v3+json" };
if (TOKEN) apiHeaders.Authorization = `Bearer ${TOKEN}`;

async function ghFetch(url) {
  const res = await fetch(url, { headers: apiHeaders });
  if (!res.ok) return null;
  return res.json();
}

async function rawText(repo, branch, file) {
  const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/${branch}/${file}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.text();
}

async function rawExists(repo, branch, file) {
  const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/${branch}/${file}`;
  const res = await fetch(url, { method: "HEAD" });
  return res.ok ? url : null;
}

async function resolveCover(meta, repoName, branch) {
  if (meta.cover) {
    return `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/${branch}/${meta.cover}`;
  }
  // Auto-detect cover.png or cover.gif
  for (const ext of ["png", "gif"]) {
    const url = await rawExists(repoName, branch, `cover.${ext}`);
    if (url) return url;
  }
  return null;
}

async function fetchAllRepos() {
  const repos = [];
  let page = 1;
  while (true) {
    const batch = await ghFetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&type=public`
    );
    if (!batch || !Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return repos;
}

async function main() {
  const allRepos = await fetchAllRepos();
  console.log(`Scanned ${allRepos.length} public repos`);

  const projects = [];
  let skipped = 0;

  for (const repo of allRepos) {
    if (repo.private) {
      skipped++;
      continue;
    }

    const branch = repo.default_branch || "main";
    const metaText = await rawText(repo.name, branch, ".blog-meta.json");

    if (!metaText) {
      skipped++;
      continue;
    }

    let meta;
    try {
      meta = JSON.parse(metaText);
    } catch {
      console.warn(`  warning: invalid .blog-meta.json in ${repo.name}, skipping`);
      skipped++;
      continue;
    }

    const cover = await resolveCover(meta, repo.name, branch);

    projects.push({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || "",
      tagline: meta.tagline,
      status: meta.status,
      tags: meta.tags || [],
      cover,
      stars: repo.stargazers_count || 0,
      language: repo.language || null,
      lastCommit: repo.pushed_at || null,
      order: meta.order ?? 99,
      featured: meta.featured === true,
    });

    console.log(`  + ${repo.name} [${meta.status}]`);
  }

  // Sort: active → completed → experiment, then order asc, then lastCommit desc
  const statusRank = { active: 0, completed: 1, contribution: 2 };
  projects.sort((a, b) => {
    const sa = statusRank[a.status] ?? 99;
    const sb = statusRank[b.status] ?? 99;
    if (sa !== sb) return sa - sb;
    if (a.order !== b.order) return a.order - b.order;
    return new Date(b.lastCommit).getTime() - new Date(a.lastCommit).getTime();
  });

  writeFileSync(OUTPUT, JSON.stringify(projects, null, 2) + "\n");

  console.log(`\nFeatured: ${projects.length}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Written:  ${OUTPUT}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
