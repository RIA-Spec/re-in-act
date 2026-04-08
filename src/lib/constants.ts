/* ────────────────────────────────────────────
   Site-wide constants — single source of truth
   ──────────────────────────────────────────── */

/** Site display name — used in metadata, header, hero, etc. */
export const SITE_NAME = "Re in Act";

/** Site description for <meta> and hero subtitle */
export const SITE_DESCRIPTION =
  "An open specification for AI agents that keeps reason in action through reason-able action spaces, local judgments, and deterministic control flow.";

/** The biological metaphor for the hero section */
export const SITE_METAPHOR =
  "Your AI agent is like a cerebellum: top-level reasoning defines the action workspace, while action handles local adjustment. Re in Act shifts from outer-loop micromanagement to reason in action.";

/** GitHub repository URL */
export const GITHUB_URL = "https://github.com/RIA-Spec/re-in-act";

/** Primary navigation tabs — label → first page in that section */
export const NAV_TABS = [
  { label: "Documentation", href: "/docs/getting-started/try" },
  { label: "Specification", href: "/specification/draft/index" },
  { label: "Proposals", href: "/proposals/index" },
  { label: "Community", href: "/community/contributing" },
] as const;

/** Route prefixes per tab — used for active-tab detection */
export const TAB_PREFIXES: Record<string, string> = {
  Documentation: "/docs",
  Specification: "/specification",
  Proposals: "/proposals",
  Community: "/community",
};
