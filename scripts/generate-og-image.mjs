import fs from "fs";
import path from "path";
import sharp from "sharp";
import { renderOpenGraphSvg } from "./og-svg.mjs";

const repoRoot = process.cwd();
const outputPath = path.join(repoRoot, "public/opengraph-image.png");

function main() {
  const svg = renderOpenGraphSvg();
  sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath)
    .then(() => console.log(`Generated ${outputPath}`));
}

main();
