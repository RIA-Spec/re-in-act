import docsIndexJson from "@/generated/docs-index.json";

export interface IndexedDocMeta {
  title?: string;
  description?: string;
  [key: string]: unknown;
}

export interface IndexedDocEntry {
  slug: string[];
  meta: IndexedDocMeta;
  htmlContent: string;
}

export type RawPageItem = string | { group: string; pages: string[] };
export type RawVersionItem = { version: string; pages: string[] };

export interface RawNavTab {
  tab: string;
  pages?: RawPageItem[];
  versions?: RawVersionItem[];
}

export interface RawNavConfig {
  name: string;
  navigation: {
    tabs: RawNavTab[];
  };
  redirects: Array<{ from: string; to: string }>;
}

interface DocsIndex {
  navConfig: RawNavConfig;
  docs: Record<string, IndexedDocEntry>;
  allSlugs: string[][];
}

const docsIndex = docsIndexJson as DocsIndex;

export const docsBySlug = docsIndex.docs;
export const allDocSlugs = docsIndex.allSlugs;
export const navConfig = docsIndex.navConfig;
