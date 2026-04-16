import fs from "fs";
import path from "path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const repoRoot = process.cwd();
const docsRoot = path.join(repoRoot, "docs");
const outputPath = path.join(repoRoot, "src/generated/docs-index.json");

const contentDirs = ["docs", "specification", "extensions", "proposals", "community"];

function Note({ children }) {
  return createElement(
    "div",
    {
      className: "not-prose my-4 flex items-center gap-3 rounded-lg border p-4",
      style: {
        borderColor: "color-mix(in srgb, #3b82f6 34%, var(--border))",
        backgroundColor: "color-mix(in srgb, #3b82f6 10%, var(--background))",
        color: "color-mix(in srgb, #60a5fa 58%, var(--foreground))",
      },
    },
    children,
  );
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function collectDocs() {
  const docs = {};
  const allSlugs = [];

  async function visit(dir, prefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await visit(fullPath, [...prefix, entry.name]);
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
      const { content: compiledContent } = await compileMDX({
        source: content,
        components: { Note },
      });
      const docEntry = {
        slug,
        meta: data,
        htmlContent: renderToStaticMarkup(compiledContent),
      };

      docs[slugKey] = docEntry;
      allSlugs.push(slug);
      if (name === "index") {
        const indexSlug = [...slug, "index"];
        docs[indexSlug.join("/")] = docEntry;
        allSlugs.push(indexSlug);
      }
    }
  }

  for (const dir of contentDirs) {
    const fullPath = path.join(docsRoot, dir);
    if (fs.existsSync(fullPath)) {
      await visit(fullPath, [dir]);
    }
  }

  allSlugs.sort((left, right) => left.join("/").localeCompare(right.join("/")));

  return { docs, allSlugs };
}

function main() {
  const navConfig = readJson(path.join(docsRoot, "docs.json"));
  return collectDocs().then(({ docs, allSlugs }) => {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
      outputPath,
      `${JSON.stringify({ navConfig, docs, allSlugs }, null, 2)}\n`,
      "utf-8",
    );

    console.log(`Generated ${outputPath}`);
  });
}

main();
