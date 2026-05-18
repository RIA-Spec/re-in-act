const SITE_NAME = "Re in Act";
const OG_IMAGE_ALT =
  "Re in Act, an open specification that extends reason into the action loop for AI agents handling environment disturbances with fewer round trips, less context noise, and stronger deterministic control.";
const HERO_SUPPORT_LINES = [
  "AI agents with fewer round trips, less context",
  "noise, and stronger deterministic control.",
];

function escapeXml(v) {
  return v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderOpenGraphSvg() {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630"><stop stop-color="#F8FAFC"/><stop offset="1" stop-color="#F1F5F9"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="630" fill="#DBEAFE" fill-opacity="0.15"/>
  <rect x="52" y="48" width="1096" height="536" rx="30" fill="#FFFFFF" stroke="#D9E3F0"/>
  <text x="118" y="235" font-family="'IBM Plex Sans','Segoe UI',sans-serif" font-size="108" font-weight="700" letter-spacing="-0.08em" fill="#0F172A">${escapeXml(SITE_NAME)}</text>
  <text x="118" y="366" font-family="'IBM Plex Sans','Segoe UI',sans-serif" font-size="42" font-weight="600" fill="#334155">${escapeXml(HERO_SUPPORT_LINES[0])}</text>
  <text x="118" y="416" font-family="'IBM Plex Sans','Segoe UI',sans-serif" font-size="42" font-weight="600" fill="#334155">${escapeXml(HERO_SUPPORT_LINES[1])}</text>
  <text x="1042" y="532" text-anchor="end" font-family="'JetBrains Mono','SFMono-Regular',monospace" font-size="22" font-weight="500" letter-spacing="0.04em" fill="#64748B">re-in-act.org</text>
  <g transform="translate(930 126)">
    <rect width="112" height="112" rx="30" fill="#ECF2FB"/>
    <g transform="translate(6 6) scale(0.5)">
      <path d="M12,108 Q20,78 28,112 Q36,138 44,96 Q52,70 60,104 Q66,120 72,96 Q78,82 84,98 Q90,106 96,101 Q100,100 100,92 L100,28" stroke="#245EDB" stroke-width="11" fill="none" stroke-linecap="round"/>
      <line x1="100" y1="28" x2="100" y2="172" stroke="#245EDB" stroke-width="11" stroke-linecap="round"/>
      <path d="M100,100 Q100,100 104,98 Q110,94 116,104 Q124,118 132,92 Q140,70 148,104 Q156,130 164,86 Q172,56 180,100 Q186,126 192,100" stroke="#245EDB" stroke-width="5" fill="none" opacity="0.28" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
}
