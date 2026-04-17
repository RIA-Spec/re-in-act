import { allDocSlugs, docsBySlug } from "@/lib/docs-index";

export interface DocMeta {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface Doc {
  meta: DocMeta;
  content: string;
  slug: string[];
  headings: Array<{
    level: number;
    id: string;
    text: string;
  }>;
}

/**
 * Get a compiled MDX document by slug.
 * Components are passed in to avoid importing client components in a server module.
 */
export async function getDocBySlug(slug: string[]): Promise<Doc | null> {
  const slugKey = slug.join("/");
  const entry = docsBySlug[slugKey];
  if (!entry) return null;

  return {
    meta: entry.meta as DocMeta,
    content: entry.htmlContent,
    slug,
    headings: entry.headings,
  };
}

/**
 * Get all document slugs for static generation.
 */
export function getAllDocSlugs(): string[][] {
  return allDocSlugs;
}
