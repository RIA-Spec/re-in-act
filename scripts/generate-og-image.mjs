import fs from "fs";
import path from "path";
import { Resvg } from "@resvg/resvg-js";
import { renderOpenGraphSvg } from "./og-svg.mjs";

const repoRoot = process.cwd();
const outputPath = path.join(repoRoot, "public/opengraph-image.png");

function main() {
  const svg = renderOpenGraphSvg();
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const png = resvg.render().asPng();
  fs.writeFileSync(outputPath, png);
  console.log(`Generated ${outputPath}`);
}

main();
