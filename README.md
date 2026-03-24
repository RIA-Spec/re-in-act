# Re in Act Documentation Site

This repository hosts the Re in Act documentation and specification website.

Re in Act (Reasoning in Action) is an open specification for AI agent to offload dynamic reasoning into the action phase through an Action Execution Runtime (AER).

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
