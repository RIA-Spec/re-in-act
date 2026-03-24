# Plan: Next.js + MDX Spec Docs Site

## Stack

| Layer               | Choice                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Framework           | Next.js 16 (App Router) + Tailwind CSS v4                                                                  |
| Deploy              | Cloudflare Workers via [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare)                   |
| MDX                 | `next-mdx-remote` + `gray-matter`                                                                          |
| Homepage visuals    | `framer-motion` (~30KB), [optional] `@xyflow/react` (~50KB)                                                |
| Icons               | `lucide-react` (tree-shakable, Tailwind-friendly)                                                          |
| Theme               | System-detected light/dark with manual toggle, persisted to `localStorage`                                 |
| Content root        | `docs/` at project root                                                                                    |
| License (code)      | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)                                          |
| License (spec/docs) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (Creative Commons Attribution 4.0 International) |

## Structure

```
repo/
├── docs/                              # MDX content
│   ├── docs.json                      # Nav config (tabs → groups → pages)
│   ├── docs/                          # Tab: Documentation
│   │   ├── getting-started/
│   │   ├── learn/
│   │   └── develop/
│   ├── specification/                 # Tab: Specification
│   │   ├── YYYY-MM-DD/               #   versioned by release date
│   │   └── draft/                     #   next unreleased
│   ├── proposals/                     # Tab: Proposals (NNNN-title.mdx)
│   ├── community/                     # Tab: Community
│   ├── images/
│   ├── logo/
│   └── snippets/                      # [optional] reusable MDX partials
│
├── app/
│   ├── page.tsx                       # Homepage
│   ├── [...slug]/page.tsx             # Catch-all → docs/*.mdx
│   └── layout.tsx                     # Shell: ThemeProvider + tabs + sidebar
├── components/
│   ├── ThemeProvider.tsx               # System/light/dark detection + context
│   ├── ThemeToggle.tsx                 # Cycle button: system → light → dark
│   ├── landing/                       # Homepage components (see § Homepage)
│   ├── Sidebar.tsx
│   └── mdx/
│       ├── MdxComponents.tsx           # <Note>, <Card> (server)
│       └── MdxClientComponents.tsx     # <Tabs>, <Accordion> (client)
├── lib/
│   └── mdx.ts                        # Compile MDX + extract frontmatter
├── next.config.ts                     # Next.js config (from template)
├── open-next.config.ts                # OpenNext Cloudflare adapter config
├── wrangler.jsonc                     # Cloudflare Workers config
└── env.d.ts                           # CloudflareEnv type declarations
```

## Homepage (`/`)

Visual landing page, not a docs page. Top → bottom:

| #   | Section                                                        | Tech                                       | Optional? |
| --- | -------------------------------------------------------------- | ------------------------------------------ | --------- |
| 1   | **Hero** — tagline + CTA                                       | Framer Motion SVG loop                     | no        |
| 2   | **Diagram** — interactive node-edge graph                      | React Flow (custom nodes + animated edges) | yes       |
| 3   | **Scroll Walkthrough** — concept panels animate on scroll      | Framer Motion `whileInView`                | yes       |
| 4   | **Terminal Replay** — typewriter execution trace               | Framer Motion                              | yes       |
| 5   | **Quick Links** — card grid → Docs / Spec / Proposals / GitHub | static                                     | no        |

### Diagram detail

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│  Node A  │─────▶│  Node B  │─────▶│  Node C  │
└──────────┘      └──────────┘      └──────────┘
      ▲                                    │
      └────────────────────────────────────┘

- Hover node → tooltip
- Click node → expand sub-steps
- Edges → flowing dot animation
```

### Hero animation loop

```
[0.0s] Node A glows → particles → [0.6s] Node B → [1.2s] Node C → loop
```

### Landing components

```
components/landing/
├── Hero.tsx              # Tagline + CTA + SVG loop
├── SpecVisual.tsx        # React Flow canvas
│   ├── CustomNode.tsx
│   └── AnimatedEdge.tsx
├── FlowDemo.tsx          # [optional] scroll walkthrough
├── TerminalReplay.tsx    # [optional] typewriter demo
└── QuickLinks.tsx
```

### Dependencies

```json
{ "framer-motion": "^11.x", "@xyflow/react": "^12.x" }
```

## Navigation (`docs.json`)

```json
{
  "name": "Your Spec",
  "navigation": {
    "tabs": [
      {
        "tab": "Documentation",
        "pages": [
          { "group": "Get Started", "pages": ["docs/getting-started/intro"] },
          { "group": "Learn", "pages": ["docs/learn/architecture"] }
        ]
      },
      {
        "tab": "Specification",
        "versions": [
          { "version": "YYYY-MM-DD (latest)", "pages": ["specification/YYYY-MM-DD/index"] },
          { "version": "Draft", "pages": ["specification/draft/index"] }
        ]
      },
      { "tab": "Proposals", "pages": ["proposals/index"] },
      { "tab": "Community", "pages": ["community/contributing", "community/governance"] }
    ]
  },
  "redirects": []
}
```

## Patterns

| Pattern        | Detail                                                    |
| -------------- | --------------------------------------------------------- |
| Navigation     | `docs.json` → tabs → groups → pages, parsed at build time |
| Versioned spec | `specification/YYYY-MM-DD/`, self-contained per version   |
| Draft          | `specification/draft/` = latest WIP                       |
| Proposals      | `proposals/NNNN-title.mdx`, one file each                 |
| Redirects      | `docs.json` redirects → `next.config.mjs`                 |

## Steps

1. Bootstrap the project using the [Cloudflare Next.js starter template](https://github.com/cloudflare/templates/tree/main/next-starter-template) (see its [README](https://github.com/cloudflare/templates/blob/main/next-starter-template/README.md)):
   ```bash
   npm create cloudflare@latest -- --template=cloudflare/templates/next-starter-template
   ```
2. Install dependencies + verify dev server runs (`npm install && npm run dev`)
3. Homepage (`app/page.tsx`) — Hero + Diagram + Quick Links
4. MDX route (`app/[...slug]/page.tsx`) — read `docs/{slug}.mdx`, compile with `next-mdx-remote`
5. Sidebar — parse `docs.json` → tab bar + collapsible tree
6. MDX components — `<Note>`, `<Tabs>`, `<Card>`, `<Accordion>`
7. Deploy to Cloudflare Workers (`npm run build && npm run deploy`)

## Optional

- [ ] Interactive diagram (React Flow, `@xyflow/react`)
- [ ] Scroll walkthrough (Framer Motion `whileInView` panels)
- [ ] Terminal replay (typewriter execution trace)
- [ ] Schema generation (TypeScript → JSON Schema → docs)
- [ ] Static search (`pagefind`)
- [ ] Code highlighting (`rehype-pretty-code` + Shiki)
- [ ] Reusable MDX snippets (`docs/snippets/`)
