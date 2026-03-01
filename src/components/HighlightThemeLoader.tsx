"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function HighlightThemeLoader() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === "dark") {
      import("highlight.js/styles/github-dark.css");
    } else {
      import("highlight.js/styles/github.css");
    }
  }, [resolvedTheme]);

  return null;
}
