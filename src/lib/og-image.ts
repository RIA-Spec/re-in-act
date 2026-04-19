import { OG_IMAGE_ALT, SITE_NAME } from "@/lib/constants";

const WIDTH = 1200;
const HEIGHT = 630;
const TITLE_X = 118;
const RIGHT_EDGE_X = 1042;
const LOGO_SIZE = 112;
const HERO_SUPPORT_LINES = [
  "AI agents with fewer round trips, less context",
  "noise, and stronger deterministic control.",
] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(text: string, maxLineLength: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxLineLength) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function renderTextBlock(
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
  className: string,
) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" class="${className}">${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function renderLogo() {
  return `<g transform="translate(${RIGHT_EDGE_X - LOGO_SIZE} 126)">
    <rect width="${LOGO_SIZE}" height="${LOGO_SIZE}" rx="30" fill="#ECF2FB" />
    <g transform="translate(6 6) scale(0.5)">
      <path
        d="M12,108 Q20,78 28,112 Q36,138 44,96 Q52,70 60,104 Q66,120 72,96 Q78,82 84,98 Q90,106 96,101 Q100,100 100,92 L100,28"
        stroke="#245EDB"
        stroke-width="11"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
      <line x1="100" y1="28" x2="100" y2="172" stroke="#245EDB" stroke-width="11" stroke-linecap="round" />
      <path
        d="M100,100 Q100,100 104,98 Q110,94 116,104 Q124,118 132,92 Q140,70 148,104 Q156,130 164,86 Q172,56 180,100 Q186,126 192,100"
        stroke="#245EDB"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
        opacity="0.28"
      />
    </g>
  </g>`;
}

export function renderOpenGraphSvg() {
  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(SITE_NAME)}</title>
  <desc id="desc">${escapeXml(OG_IMAGE_ALT)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F8FAFC" />
      <stop offset="1" stop-color="#F1F5F9" />
    </linearGradient>
    <radialGradient id="softGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(960 90) rotate(146) scale(360 280)">
      <stop stop-color="#DBEAFE" stop-opacity="0.9" />
      <stop offset="1" stop-color="#DBEAFE" stop-opacity="0" />
    </radialGradient>
    <style>
      .title { font: 700 108px 'IBM Plex Sans', 'Segoe UI', sans-serif; letter-spacing: -0.08em; fill: #0F172A; }
      .support { font: 600 42px 'IBM Plex Sans', 'Segoe UI', sans-serif; fill: #334155; }
      .site-url { font: 500 22px 'JetBrains Mono', 'SFMono-Regular', monospace; letter-spacing: 0.04em; fill: #64748B; }
    </style>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#softGlow)" />

  <rect x="52" y="48" width="1096" height="536" rx="30" fill="#FFFFFF" fill-opacity="0.82" stroke="#D9E3F0" />

  <text x="${TITLE_X}" y="235" class="title">${escapeXml(SITE_NAME)}</text>
  ${renderLogo()}
  ${renderTextBlock([...HERO_SUPPORT_LINES], TITLE_X, 366, 50, "support")}

  <text x="${RIGHT_EDGE_X}" y="532" text-anchor="end" class="site-url">re-in-act.org</text>
</svg>`.trim();
}
