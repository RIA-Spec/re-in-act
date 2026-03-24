import fs from "fs";
import path from "path";

const DOCS_ROOT = path.join(process.cwd(), "docs");

export interface NavPage {
  slug: string;
  title: string;
}

export interface NavGroup {
  group: string;
  pages: NavPage[];
}

export interface NavVersion {
  version: string;
  pages: NavPage[];
}

export interface NavTab {
  tab: string;
  pages?: NavGroup[];
  versions?: NavVersion[];
}

// Raw types from docs.json
type RawPageItem = string | { group: string; pages: string[] };
type RawVersionItem = { version: string; pages: string[] };

interface RawNavTab {
  tab: string;
  pages?: RawPageItem[];
  versions?: RawVersionItem[];
}

interface RawNavConfig {
  name: string;
  navigation: {
    tabs: RawNavTab[];
  };
  redirects: Array<{ from: string; to: string }>;
}

/**
 * Read and parse docs.json navigation config.
 */
function getRawNavConfig(): RawNavConfig {
  const configPath = path.join(DOCS_ROOT, "docs.json");
  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw) as RawNavConfig;
}

/**
 * Get the title for a page slug by reading its frontmatter.
 * Falls back to the slug itself if not found.
 */
function getPageTitle(slug: string): string {
  const candidates = [path.join(DOCS_ROOT, `${slug}.mdx`), path.join(DOCS_ROOT, `${slug}.md`)];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const match = raw.match(/^---\s*\n[\s\S]*?title:\s*["']?(.+?)["']?\s*\n/m);
      if (match) return match[1];
    }
  }

  // Fallback: humanize slug
  const last = slug.split("/").pop() || slug;
  return last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, " ");
}

function resolvePageSlug(slug: string): NavPage {
  return { slug, title: getPageTitle(slug) };
}

/**
 * Resolve page slugs in docs.json to include titles.
 * Handles both flat string arrays and group objects.
 */
export function getResolvedNav(): NavTab[] {
  const config = getRawNavConfig();

  return config.navigation.tabs.map((tab) => {
    const result: NavTab = { tab: tab.tab };

    if (tab.pages) {
      // Separate group objects from flat string slugs
      const groups: NavGroup[] = [];
      const ungrouped: NavPage[] = [];

      for (const item of tab.pages) {
        if (typeof item === "string") {
          ungrouped.push(resolvePageSlug(item));
        } else {
          groups.push({
            group: item.group,
            pages: item.pages.map(resolvePageSlug),
          });
        }
      }

      // If there are ungrouped pages, put them in a "Pages" group
      if (ungrouped.length > 0) {
        groups.push({ group: "Pages", pages: ungrouped });
      }

      result.pages = groups;
    }

    if (tab.versions) {
      result.versions = tab.versions.map((ver) => ({
        version: ver.version,
        pages: ver.pages.map(resolvePageSlug),
      }));
    }

    return result;
  });
}

/**
 * Find which tab a given slug belongs to.
 */
export function findTabForSlug(slug: string): string | null {
  const config = getRawNavConfig();

  for (const tab of config.navigation.tabs) {
    if (tab.pages) {
      for (const item of tab.pages) {
        if (typeof item === "string") {
          if (item === slug) return tab.tab;
        } else {
          if (item.pages.includes(slug)) return tab.tab;
        }
      }
    }
    if (tab.versions) {
      for (const ver of tab.versions) {
        if (ver.pages.includes(slug)) return tab.tab;
      }
    }
  }

  return null;
}
