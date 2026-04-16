import fs from "fs";
import path from "path";
import matter from "gray-matter";

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, "docs");
const outputPath = path.join(repoRoot, "src/generated/docs-index.json");

const contentDirs = ["docs", "specification", "extensions", "proposals", "community"];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function collectDocs() {
  const docs = {};
  const allSlugs = [];

  function visit(dir, prefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        visit(fullPath, [...prefix, entry.name]);
        continue;
      }

      if (!entry.name.endsWith(".mdx") && !entry.name.endsWith(".md")) {
        continue;
      }

      const name = entry.name.replace(/\.(mdx|md)$/u, "");
      const slug = name === "index" ? prefix : [...prefix, name];
      const slugKey = slug.join("/");
      const raw = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(raw);

      docs[slugKey] = {
        slug,
        meta: data,
        rawContent: content,
      };
      allSlugs.push(slug);
    }
  }

  for (const dir of contentDirs) {
    const fullPath = path.join(docsRoot, dir);
    if (fs.existsSync(fullPath)) {
      visit(fullPath, [dir]);
    }
  }

  allSlugs.sort((left, right) => left.join("/").localeCompare(right.join("/")));

  return { docs, allSlugs };
}

function main() {
  const navConfig = readJson(path.join(docsRoot, "docs.json"));
  const { docs, allSlugs } = collectDocs();

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    `${JSON.stringify({ navConfig, docs, allSlugs }, null, 2)}\n`,
    "utf-8",
  );

  console.log(`Generated ${outputPath}`);
}

main();
