/* ────────────────────────────────────────────
   Site-wide constants — single source of truth
   ──────────────────────────────────────────── */

/** Site display name — used in metadata, header, hero, etc. */
export const SITE_NAME = "Re in Act";

/** SEO subtitle — used in titles and previews. */
export const SITE_TAGLINE = "Open Specification for Reason in Action";

/** Homepage lead copy segments — used in hero and social previews. */
export const SITE_HERO_LEDE_PREFIX = "Re in Act extends ";
export const SITE_HERO_LEDE_HIGHLIGHT = "reason into the action loop";
export const SITE_HERO_LEDE_MIDDLE = ", so AI agents can handle environment disturbances with ";
export const SITE_HERO_LEDE_VALUE =
  "fewer round trips, less context noise, and stronger local control";

/** Homepage lead copy — used in hero and social previews. */
export const SITE_HERO_LEDE = `${SITE_HERO_LEDE_PREFIX}${SITE_HERO_LEDE_HIGHLIGHT}${SITE_HERO_LEDE_MIDDLE}${SITE_HERO_LEDE_VALUE}.`;

/** Core value props surfaced on the homepage and OG image. */
export const SITE_VALUE_PROPS = [
  "Fewer round trips",
  "Less context noise",
  "Stronger local control",
] as const;

/** Default SEO title shown in page titles and previews. */
export const SITE_DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

/** Production site URL — used for canonical and social metadata */
export const SITE_URL = "https://re-in-act.org";

/** Site description for <meta> and hero subtitle */
export const SITE_DESCRIPTION =
  "An open specification that extends reason into the action loop so AI agents can handle environment disturbances with fewer round trips, less context noise, and stronger deterministic control.";

/** Default Open Graph image path */
export const OG_IMAGE_PATH = "/opengraph-image";

/** Default Open Graph image alt text */
export const OG_IMAGE_ALT =
  "Re in Act, an open specification that extends reason into the action loop for AI agents handling environment disturbances with fewer round trips, less context noise, and stronger deterministic control.";

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
