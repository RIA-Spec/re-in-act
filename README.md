# Re in Act

This repository hosts the documentation and specification for **Re in Act** (Reason in Action) — an open specification for AI agents that delegates execution to a **Reason-able Action Space (RAS)**, moving adaptive `reason()` calls inside the action phase instead of the outer loop.

The result: deterministic control flow, fewer round trips, and a clean main context window.

## Tech Stack

- Next.js 16 (App Router)
- MDX content under `docs/`
- `next-mdx-remote` + `gray-matter`
- Tailwind CSS v4
- Cloudflare Workers deployment via OpenNext

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | Purpose                         |
| :------------------ | :------------------------------ |
| `npm run dev`       | Start local dev server          |
| `npm run build`     | Build production site           |
| `npm run check`     | Build + TypeScript check        |
| `npm run lint`      | Run oxlint                      |
| `npm run fmt:check` | Check formatting with oxfmt     |
| `npm run preview`   | Preview OpenNext output locally |
| `npm run deploy`    | Deploy to Cloudflare Workers    |

## Content and Navigation

- Content lives in `docs/**/*.mdx`
- Navigation is configured in `docs/docs.json`
- Routes are resolved by `src/app/[...slug]/page.tsx`

## License

- Code: Apache-2.0 (see `public/LICENSE`)
- Documentation/spec: CC BY 4.0 (see `public/LICENSE-DOCS`)
