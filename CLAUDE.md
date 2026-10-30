# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and shadcn/ui. Content is file-based (JSON + Markdown in `/data`). Deployed on Vercel with Sentry error tracking.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server on port 1234
pnpm build            # Production build (turbopack)
pnpm start            # Serve the production build on port 3000
pnpm lint             # ESLint (next/core-web-vitals)
pnpm exec tsc --noEmit # Type check (no `typecheck` script; lint does not type check)
```

No test runner and no CI are configured. Visual regression testing used to run through Lost Pixel, but that product was sunset (the team joined Figma, the repo is archived, and its hosted API no longer serves a valid certificate), so the workflow, `lostpixel.config.ts` and the dependency were removed. There is currently nothing guarding against visual regressions — verify UI changes by eye against `pnpm dev`.

## Architecture

### Content System

`src/data.ts` is the only content reader — plain `fs.readFile` + `JSON.parse` at request/build time, server-side only. All types (`Post`, `Project`, `ResumeEntry`) live there too.

Cross-file invariants that are easy to break:

- **Adding a post touches two files**: an entry in `data/posts.json` and `data/posts/<id>.md`. The `id` must equal the markdown filename, and `link` must be `/posts/<id>` — `generateStaticParams()` keys off `id` while `sitemap.ts` emits `link`, so a mismatch produces a page with no sitemap entry (or vice versa).
- **`data/resume.json` must stay newest-first**, both in the top-level array and in each company's `items` array. `Timeline` derives a span from `items.at(-1).start` (earliest) and `items.at(0).end` (latest), and `resume/page.tsx` does the same for durations. Oldest-first data renders a negative/garbage span with no error.
- `ResumeEntry` is a discriminated union on `type` (`"company" | "school" | "certification"`); both the resume page and `Timeline` branch on it, so a new entry kind needs changes in three places.

### Markdown Rendering

Posts render through `src/utils/markdown.ts` (`remark` → `remark-gfm` → `remark-toc` → `remark-rehype` → `rehype-slug` → `rehype-highlight` → `rehype-add-classes` → custom `rehypeCodeBlocks` → `rehype-stringify`) and are injected with `dangerouslySetInnerHTML` in `src/app/posts/[id]/page.tsx`. Frontmatter is parsed by `gray-matter` and discarded.

Two separate styling layers apply to the same HTML: `rehype-add-classes` in `markdown.ts` and arbitrary child selectors (`[&>h1]:…`) on the wrapper in `posts/[id]/page.tsx`. Editing post typography usually means editing both, and the page-level classes only match _direct_ children.

There is no MDX path: `@next/mdx` and the `@mdx-js/*` packages were removed once it was clear nothing rendered through them, so `/data` markdown only ever travels the pipeline above. `pageExtensions` is left at its default.

Syntax-highlighting themes are swapped at runtime by `HighlightThemeLoader`, which dynamically imports `highlight.js/styles/github{,-dark}.css` based on `resolvedTheme`.

### Styling & Theming

- `src/styles/globals.css` is the single source of truth: Tailwind 4 CSS-first config with `@theme inline`, brand + shadcn CSS variables in OKLCH, `@utility` blocks, and base element styles (`h1`–`h6` are globally styled — headings usually need no classes).
- **Dark mode**: `next-themes` with `attribute="data-color-scheme"` and `defaultTheme="dark"`. `dark:` works only because of `@custom-variant dark (&:is([data-color-scheme="dark"] *))` at the top of `globals.css`.
- Custom utilities: `actionable`, `heading`, `absolute-center`, `no-scrollbar` (`@utility`); `section-grid`, `nav-glass` (`@layer components`).
- Additional `@custom-variant` helpers for Radix state attributes: `data-open`, `data-closed`, `data-checked`, `data-unchecked`, `data-selected`, `data-disabled`, `data-active`, `data-horizontal`, `data-vertical`.
- **Typography**: Sora (display/body) + JetBrains Mono (code), loaded via Google Fonts `<link>` in `layout.tsx`. `next/font/google` is NOT used — incompatible with the turbopack build in Next.js 16.
- shadcn/ui: "new-york" style, zinc base, Lucide icons; config in `components.json`, primitives in `src/components/ui/`.

### Components & Routing

- Server components by default; `"use client"` only where interaction demands it. Blog posts are statically generated via `generateStaticParams()`.
- **Navigation**: floating pill nav (desktop, `.nav-glass`) in `Header`, Sheet drawer in `MobileNav`. Both consume the shared `navLinks` array in `src/lib/nav.ts` — add routes there, not in the components.
- **Dynamic imports**: `ColorSchemeToggle` (in both `Header` and `MobileNav`) and `NavLinks` are `next/dynamic` for code splitting.
- **Face tracking**: `Me` → `FaceTracker` → `useGazeTracking` → (`useAnimationSequencer`, `useInactivityTimers`), with grid math in `src/utils/faceAnimations.ts`. An 11×11 sprite sheet of 512px tiles (`public/faces/gaze_grid.webp`) is positioned by `background-position`; grid coords run −15…15 in steps of `STEP = 3`. Calibrated at 512×480, so `Me` renders a fixed 512×480 inner box and CSS-`scale()`s it to fit responsive containers — changing container sizes means updating those scale factors.
- Path alias `@/*` → `src/*`. `cn()` (`src/lib/utils.ts`) composes classNames via `clsx` + `tailwind-merge`.

### Build & Deploy

- Vercel overrides install/build to run through corepack (`vercel.json`); `packageManager` is pinned to `pnpm@11.9.0`, which is the single source of truth for the pnpm version. Vercel is the only automation left — there are no GitHub Actions workflows.
- `pnpm-workspace.yaml` carries security `overrides` and an `allowBuilds` allowlist — a new dependency with install scripts must be added to `allowBuilds` or its build is silently skipped.
- **pnpm 11 rejects any lockfile entry published less than 24 hours ago** (`minimumReleaseAge`, a built-in default set nowhere in the repo). `pnpm run` re-checks before every script, so `pnpm build` and `pnpm dev` fail too, not just Vercel's `--frozen-lockfile` install (`ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`, ~20s into the deploy).
- **Dependabot security PRs** (enabled in repo settings; there is no `dependabot.yml`, and its `cooldown` doesn't apply to security updates anyway) regenerate the lockfile and routinely lock hours-old transitive packages. Either redeploy once the newest entry is a day old, or rebuild the change on main's lockfile: `git checkout origin/main -- pnpm-lock.yaml && pnpm install`, which resolves only the bumped package within the policy. Merging any Dependabot PR makes Dependabot rebase the others, which can reset the clock.
- **Bumping one transitive package**: `pnpm update <pkg>` also re-resolves everything between it and the root, which can pull in unrelated upgrades and new peer warnings. To move only that package, add a temporary override (e.g. `nanoid@3: ^3.3.18`), `pnpm install`, remove the override, `pnpm install` again; the lockfile keeps the bumped version. Keep a permanent override only when a dependent's range excludes the fix.
- `webpack` is an auto-installed peer of `@sentry/webpack-plugin`, and neither overrides nor `pnpm update` move it, so its advisories stay open. The affected features are unused because builds run through turbopack.
- ESLint 10 makes pnpm warn about unmet `eslint` peers for `eslint-plugin-import`, `eslint-plugin-jsx-a11y` and `eslint-plugin-react`. That's expected: those plugins ship inside `eslint-config-next`, which supports ESLint 10 from 16.4.0 (see `node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md`). Don't downgrade over it.
- Do **not** set `turbopack.root` in `next.config.ts` — both `import.meta.dirname` and `process.cwd()` trigger `Can't resolve 'tailwindcss'` from the parent dir during `next dev`. It is tempting because Next logs an "inferred workspace root" warning at startup; that warning is benign (a stray lockfile above the repo plus `pnpm-workspace.yaml`) and is accepted as-is.

### Monitoring

- Sentry: server/edge in `instrumentation.ts`, client in `instrumentation-client.ts`, `global-error.jsx` captures render crashes. `tunnelRoute: "/monitoring"`, sample rates 0.1 prod / 1.0 dev. The client config **drops all events in development** unless `SENTRY_FORCE_DEV` is set.
- Vercel Analytics, Speed Insights, and Google Analytics all mount in the root layout.

## Conventions

- Format with default Prettier rules
- Minimize `useEffect`; derive state where possible
- Use `cn()` for combining Tailwind classes
- Use `formatDate()` / `formatTimeDifference()` from `src/utils/date.ts` (not inline `Intl.DateTimeFormat`)
- Remote images allowed only from `res.cloudinary.com` and `miro.medium.com` (`next.config.ts`)
- Use `color-mix()` with CSS variables for theme-adaptive transparency instead of hardcoded oklch values

## Known Warts

Pre-existing; worth fixing if you are already in the file.

- `src/utils/markdown.ts` hardcodes `bg-stone-100 dark:bg-stone-900` for code blocks instead of theme variables.
- `prose-editorial` is applied in `posts/[id]/page.tsx` but defined nowhere.
- `useGazeTracking` mirrors state into refs with two `useEffect`s; the throttle also mixes `performance.now()` bookkeeping into the same hook.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
