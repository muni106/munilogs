import { getCollection } from "astro:content";
import { getPath } from "./getPath";
import { getNotePath } from "./getNotePath";
import getSortedPosts from "./getSortedPosts";
import getSortedNotes from "./getSortedNotes";
import projectsData from "@/data/projects.json";
import manualProjectsData from "@/data/projects.manual.json";

export type VaultSection = "blog" | "notes" | "projects" | "tags" | "home";

export interface VaultNode {
  label: string;
  href: string;
  /** Which colour family the row is painted with. */
  section: VaultSection;
  /** Folder rows render a chip + children; leaf rows render a plain pill. */
  children?: VaultNode[];
  external?: boolean;
}

interface JsonProject {
  name: string;
  url: string;
  featured?: boolean;
  order?: number;
}

/**
 * Builds the sidebar file tree from the content collections.
 *
 * The shape mirrors an Obsidian vault: top-level folders per section, entries
 * beneath them. Content is flat today, but children are rendered recursively so
 * nested folders work without touching the Sidebar component.
 */
export async function getVaultTree(): Promise<VaultNode[]> {
  const [posts, notes] = await Promise.all([
    getCollection("blog"),
    getCollection("notes"),
  ]);

  const postNodes: VaultNode[] = getSortedPosts(posts).map(
    ({ data, id, filePath }) => ({
      label: data.title,
      href: getPath(id, filePath),
      section: "blog",
    }),
  );

  const noteNodes: VaultNode[] = getSortedNotes(notes).map(
    ({ data, id, filePath }) => ({
      label: data.title,
      href: getNotePath(id, filePath),
      section: "notes",
    }),
  );

  // Projects live in JSON rather than a collection, and point at their repos.
  const projectNodes: VaultNode[] = [
    ...(projectsData as JsonProject[]),
    ...(manualProjectsData as JsonProject[]),
  ]
    .filter((p, i, arr) => arr.findIndex((x) => x.name === p.name) === i)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map((p) => ({
      label: p.name,
      href: p.url,
      section: "projects" as const,
      external: true,
    }));

  return [
    { label: "posts", href: "/posts", section: "blog", children: postNodes },
    { label: "notes", href: "/notes", section: "notes", children: noteNodes },
    {
      label: "projects",
      href: "/projects",
      section: "projects",
      children: projectNodes,
    },
    { label: "tags", href: "/tags", section: "tags" },
    { label: "archives", href: "/archives", section: "home" },
    { label: "about", href: "/about", section: "home" },
  ];
}

/** Which section a URL belongs to, for colouring chrome outside the sidebar. */
export function sectionFromPath(pathname: string): VaultSection {
  const first = pathname.split("/").filter(Boolean)[0];
  switch (first) {
    case "posts":
      return "blog";
    case "notes":
      return "notes";
    case "projects":
      return "projects";
    case "tags":
      return "tags";
    default:
      return "home";
  }
}
