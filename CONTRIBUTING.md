# Contributing to This Repository

This file covers contributions to the `RIA-Spec/re-in-act` repository itself: the documentation site, content source files, and deployment workflow. For participation in the Re in Act specification as a public draft, see [docs/community/contributing.mdx](docs/community/contributing.mdx).

## Scope

This repository contains two related but distinct things:

- The Re in Act specification and supporting documentation content.
- The website and build/deploy machinery that publishes that content at [re-in-act.org](https://re-in-act.org).

If you are proposing changes to the spec, use the community and proposal flow described in [docs/community/contributing.mdx](docs/community/contributing.mdx). If you are changing the site, docs build pipeline, navigation, styling, or deployment setup, use the guidance below.

## Local Development

Install dependencies and start the site locally:

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

## Useful Scripts

| Command              | Purpose                                                    |
| :------------------- | :--------------------------------------------------------- |
| `pnpm dev`           | Start the local development server                         |
| `pnpm docs:generate` | Regenerate the docs index from `docs/**/*.mdx`             |
| `pnpm build`         | Build the production site and OpenNext worker bundle       |
| `pnpm check`         | Run a production build and TypeScript check                |
| `pnpm lint`          | Run oxlint                                                 |
| `pnpm fmt`           | Format files with oxfmt                                    |
| `pnpm fmt:check`     | Check formatting with oxfmt                                |
| `pnpm preview`       | Build and preview the OpenNext output locally              |
| `pnpm deploy`        | Build and deploy the OpenNext output to Cloudflare Workers |

## Project Structure

- Content source files live in `docs/**/*.mdx`.
- Navigation is configured in `docs/docs.json`.
- The catch-all docs route is implemented in `src/app/[...slug]/page.tsx`.
- The generated docs payload is written to `src/generated/docs-index.json` by `scripts/generate-docs-index.mjs`.

## Build and Deploy Notes

- Cloudflare deploys expect the `.open-next` output produced by `pnpm build`.
- The build flow is `next build` followed by `opennextjs-cloudflare build --skipNextBuild`, so the Next app is compiled once and the OpenNext worker bundle is produced without recursive script calls.

## Contribution Expectations

- Keep specification changes and site/infrastructure changes clearly separated when possible.
- Regenerate derived docs output when content or generator behavior changes.
- Run the relevant checks before opening a pull request.
