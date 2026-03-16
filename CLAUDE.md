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
- **CSS Variables**: OKLCH color space in `src/styles/globals.css` with custom `@theme` block for Tailwind 4. High-contrast B&W palette with electric blue accent. Custom utilities: `section-grid`, `actionable`, `heading`, `absolute-center`, `no-scrollbar`
- **Typography**: Sora (display/body) + JetBrains Mono (code), loaded via Google Fonts `<link>` in layout. `next/font/google` is NOT used due to turbopack build incompatibility in Next.js 16.
- **Navigation**: Floating pill nav (desktop) with frosted glass effect via `.nav-glass` CSS class. Mobile uses Sheet-based drawer (`MobileNav`). Shared nav links array in `src/lib/nav.ts`.
- **Grain Overlay**: Subtle SVG noise texture overlay in root layout for visual depth. Uses tiled `background-repeat` for performance.
- **Face Tracking**: Interactive profile image with gaze-tracking sprite overlay. FaceTracker calibrated at 512×480 coordinate space; Me component uses CSS `scale()` to fit responsive containers.
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
- Use `formatDate()` from `src/utils/date.ts` for date formatting (not inline `Intl.DateTimeFormat`)
- Remote images allowed from Cloudinary and Medium domains (configured in `next.config.ts`)
- Use `color-mix()` with CSS variables for theme-adaptive transparency instead of hardcoded oklch values
