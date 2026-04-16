import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { MDXComponents } from "@/lib/mdx-components";
import { allDocSlugs, docsBySlug } from "@/lib/docs-index";

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
 * Get a compiled MDX document by slug.
 * Components are passed in to avoid importing client components in a server module.
 */
export async function getDocBySlug(
  slug: string[],
  components?: MDXComponents,
): Promise<Doc | null> {
  const slugKey = slug.join("/");
  const entry = docsBySlug[slugKey];
  if (!entry) return null;

  const { content } = await compileMDX({
    source: entry.rawContent,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
    components,
  });

  return {
    meta: entry.meta as DocMeta,
    content,
    slug,
  };
}

/**
 * Get all document slugs for static generation.
 */
export function getAllDocSlugs(): string[][] {
  return allDocSlugs;
}
