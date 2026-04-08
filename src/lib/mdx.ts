import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { MDXComponents } from "mdx/types";

const DOCS_ROOT = path.join(process.cwd(), "docs");

export interface DocMeta {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface Doc {
  meta: DocMeta;
  content: React.ReactElement;
  slug: string[];
}

/**
 * Resolve a slug array to a file path inside docs/.
 * Tries .mdx then .md extensions.
 */
function resolveDocPath(slug: string[]): string | null {
  const joined = slug.join("/");
  const candidates = [
    path.join(DOCS_ROOT, `${joined}.mdx`),
    path.join(DOCS_ROOT, `${joined}.md`),
    path.join(DOCS_ROOT, joined, "index.mdx"),
    path.join(DOCS_ROOT, joined, "index.md"),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

/**
 * Get a compiled MDX document by slug.
 * Components are passed in to avoid importing client components in a server module.
 */
export async function getDocBySlug(
  slug: string[],
  components?: MDXComponents,
): Promise<Doc | null> {
  const filePath = resolveDocPath(slug);
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(raw);

  const { content } = await compileMDX({
    source: rawContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
    components,
  });

  return {
    meta: data as DocMeta,
    content,
    slug,
  };
}

/**
 * Get all document slugs for static generation.
 */
export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];

  function walk(dir: string, prefix: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...prefix, entry.name]);
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        const name = entry.name.replace(/\.(mdx|md)$/, "");
        if (name === "index") {
          slugs.push(prefix);
        } else {
          slugs.push([...prefix, name]);
        }
      }
    }
  }

  // Walk all content dirs (not docs.json, images, logo, snippets)
  const contentDirs = ["docs", "specification", "extensions", "proposals", "community"];
  for (const dir of contentDirs) {
    const fullPath = path.join(DOCS_ROOT, dir);
    if (fs.existsSync(fullPath)) {
      walk(fullPath, [dir]);
    }
  }

  return slugs;
}
