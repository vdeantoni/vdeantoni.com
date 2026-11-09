import { readdirSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";

// demos/<post id>/<demo>/index.* becomes public/demos/<post id>/<demo>.js,
// next to the HTML page that loads it.
const entryPoints = readdirSync(import.meta.dirname, { recursive: true })
  .filter((file) => /^[^/]+\/[^/]+\/index\.[jt]sx?$/.test(file))
  .filter((file) => !file.startsWith("node_modules/"))
  .map((file) => ({ in: file, out: path.dirname(file) }));

await build({
  absWorkingDir: import.meta.dirname,
  entryPoints,
  outdir: "../public/demos",
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  loader: { ".js": "jsx" },
  define: { "process.env.NODE_ENV": '"production"' },
  // The sources import React and lodash as their posts do. Redact renders
  // synchronously, so a demo that needs concurrent rendering can't use these.
  alias: {
    react: "@tanstack/redact",
    "react-dom/client": "@tanstack/redact/dom-client",
    "react-dom": "@tanstack/redact/dom",
    lodash: "lodash-es",
  },
  logLevel: "info",
});
