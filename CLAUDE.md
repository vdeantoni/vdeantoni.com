# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog site built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and shadcn/ui. Content is file-based (JSON + Markdown in `/data`). Deployed on Vercel with Sentry error tracking.

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Dev server on port 1234
pnpm build            # Production build
pnpm lint             # ESLint (next/core-web-vitals)
```

No test runner is configured. Visual regression testing (Lost Pixel) runs in CI only via GitHub Actions.

## Architecture

### Content System
- Post/project metadata lives in `data/posts.json` and `data/projects.json`
- Post markdown content in `data/posts/*.md`
- Resume data in `data/resume.json`
- Data loading functions in `src/data.ts` read these files server-side
- Markdown pipeline (`src/utils/markdown.ts`): remark → rehype with GFM, TOC, slug, and syntax highlighting plugins

### Key Patterns
- **App Router**: Pages in `src/app/`, server components by default. Blog posts use `generateStaticParams()` for static generation
- **Dark Mode**: Implemented via `next-themes` using `data-color-scheme` attribute on `<html>`, persisted to localStorage
- **shadcn/ui**: "new-york" style, zinc base color, Lucide icons. Config in `components.json`. UI primitives in `src/components/ui/`
- **CSS Variables**: OKLCH color space in `src/styles/globals.css` with custom `@theme` block for Tailwind 4. Custom utilities: `section-grid`, `actionable`, `heading`, `absolute-center`
- **Dynamic Imports**: `ColorSchemeToggle` and `NavLinks` are dynamically imported for code splitting
- **Path Alias**: `@/*` maps to `src/*`
- **`cn()` utility**: In `src/lib/utils.ts`, combines `clsx` + `tailwind-merge` for className composition

### Monitoring
- Sentry: server instrumentation in `instrumentation.ts`, client in `instrumentation-client.ts`. Dynamic sample rates (0.1 prod, 1.0 dev)
- Vercel Analytics, Speed Insights, and Google Analytics

## Conventions

- Format with default Prettier rules
- Minimize `useEffect`; derive state where possible
- Use `cn()` for combining Tailwind classes
- Remote images allowed from Cloudinary and Medium domains (configured in `next.config.ts`)
