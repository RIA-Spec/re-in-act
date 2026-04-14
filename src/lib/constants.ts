/* ────────────────────────────────────────────
   Site-wide constants — single source of truth
   ──────────────────────────────────────────── */

/** Site display name — used in metadata, header, hero, etc. */
export const SITE_NAME = "Re in Act";

/** Production site URL — used for canonical and social metadata */
export const SITE_URL = "https://re-in-act.org";

/** Site description for <meta> and hero subtitle */
export const SITE_DESCRIPTION =
  "An open specification for how AI agents do work, keeping reason in action through reason-able action spaces, local judgment, and deterministic control flow.";

/** Default Open Graph image path */
export const OG_IMAGE_PATH = "/opengraph-image";

/** Default Open Graph image alt text */
export const OG_IMAGE_ALT =
  "Re in Act, an open specification for how AI agents do work with reason kept close to action.";

/** The biological metaphor for the hero section */
export const SITE_METAPHOR =
  "Your AI agent is like a cerebellum: top-level reasoning defines the action workspace, while action handles local adjustment. Re in Act shifts from outer-loop micromanagement to reason in action.";

/** GitHub repository URL */
export const GITHUB_URL = "https://github.com/RIA-Spec/re-in-act";

/** Primary navigation tabs — label → first page in that section */
export const NAV_TABS = [
  { label: "Documentation", href: "/docs/getting-started/intro" },
  { label: "Specification", href: "/specification/draft/index" },
  { label: "Extensions", href: "/extensions/overview" },
  { label: "Proposals", href: "/proposals/index" },
  { label: "Community", href: "/community/contributing" },
] as const;

/** Route prefixes per tab — used for active-tab detection */
export const TAB_PREFIXES: Record<string, string> = {
  Documentation: "/docs",
  Specification: "/specification",
  Extensions: "/extensions",
  Proposals: "/proposals",
  Community: "/community",
};
